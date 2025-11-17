from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import os
import uuid
from datetime import datetime
import json

from app.database import get_db
from app.models.rental import LandRental, Contact, Location, RentalPhoto, RentalLandStatus
from app.schemas.rental import LandRentalCreate, LandRentalResponse, LandRentalListResponse

router = APIRouter()

# 設定檔案上傳目錄
UPLOAD_DIR = "uploads/rentals"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_upload_file(upload_file: UploadFile) -> str:
    """儲存上傳的檔案並返回路徑"""
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        content = await upload_file.read()
        buffer.write(content)
    
    return file_path

@router.post("/rentals", response_model=LandRentalResponse)
async def create_rental(
    contact_name: str = Form(...),
    contact_phone: str = Form(...),
    contact_email: Optional[str] = Form(None),
    contact_role: str = Form(...),
    title: str = Form(...),
    county: str = Form(...),
    district: str = Form(...),
    address: Optional[str] = Form(None),
    area: str = Form(...),
    rent_amount: str = Form(...),
    zone_type: str = Form(...),
    land_status: str = Form(...),
    cover_photo: Optional[UploadFile] = File(None),
    photos: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db)
):
    """建立新的土地租賃資訊（正規化版本）"""
    
    print("=" * 60)
    print("🔍 收到的表單資料:")
    print(f"contact_name: {contact_name}")
    print(f"title: {title}")
    print("=" * 60)
    
    try:
        # 1. 建立或查找聯絡人
        contact = db.query(Contact).filter(
            Contact.phone == contact_phone,
            Contact.name == contact_name
        ).first()
        
        if not contact:
            contact = Contact(
                name=contact_name,
                phone=contact_phone,
                email=contact_email,
                role=contact_role
            )
            db.add(contact)
            db.flush()
        
        print(f"✅ 聯絡人 ID: {contact.id}")
        
        # 2. 建立或查找地址
        location = db.query(Location).filter(
            Location.county == county,
            Location.district == district,
            Location.address == address
        ).first()
        
        if not location:
            location = Location(
                county=county,
                district=district,
                address=address
            )
            db.add(location)
            db.flush()
        
        print(f"✅ 地址 ID: {location.id}")
        
        # 3. 建立土地租賃記錄
        db_rental = LandRental(
            title=title,
            contact_id=contact.id,
            location_id=location.id,
            area=area,
            rent_amount=rent_amount,
            zone_type=zone_type
        )
        db.add(db_rental)
        db.flush()
        
        print(f"✅ 租賃記錄 ID: {db_rental.id}")
        
        # 4. 處理封面照片
        if cover_photo and cover_photo.filename:
            cover_photo_path = await save_upload_file(cover_photo)
            photo = RentalPhoto(
                rental_id=db_rental.id,
                photo_path=cover_photo_path,
                is_cover=True,
                sort_order=0
            )
            db.add(photo)
            print(f"✅ 封面照片已儲存: {cover_photo_path}")
        
        # 5. 處理多張照片
        if photos:
            for idx, photo_file in enumerate(photos[:6], start=1):
                if photo_file.filename:
                    photo_path = await save_upload_file(photo_file)
                    photo = RentalPhoto(
                        rental_id=db_rental.id,
                        photo_path=photo_path,
                        is_cover=False,
                        sort_order=idx
                    )
                    db.add(photo)
                    print(f"✅ 照片 {idx} 已儲存: {photo_path}")
        
        # 6. 處理土地狀態
        land_status_list = json.loads(land_status) if land_status else []
        for status in land_status_list:
            land_status_obj = RentalLandStatus(
                rental_id=db_rental.id,
                status=status
            )
            db.add(land_status_obj)
        
        print(f"✅ 土地狀態數量: {len(land_status_list)}")
        
        # 提交所有變更
        db.commit()
        db.refresh(db_rental)
        
        print(f"✅ 成功建立租賃資訊，ID: {db_rental.id}")
        print("=" * 60)
        
        return db_rental
        
    except Exception as e:
        print(f"❌ 錯誤: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/rentals", response_model=List[LandRentalListResponse])
def get_all_rentals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """取得所有土地租賃資訊"""
    rentals = db.query(LandRental).offset(skip).limit(limit).all()
    
    # 轉換為列表回應格式
    result = []
    for rental in rentals:
        # 取得封面照片
        cover_photo = db.query(RentalPhoto).filter(
            RentalPhoto.rental_id == rental.id,
            RentalPhoto.is_cover == True
        ).first()
        
        # 取得所有照片
        photos = db.query(RentalPhoto).filter(
            RentalPhoto.rental_id == rental.id,
            RentalPhoto.is_cover == False
        ).order_by(RentalPhoto.sort_order).all()
        
        # 取得土地狀態
        statuses = db.query(RentalLandStatus).filter(
            RentalLandStatus.rental_id == rental.id
        ).all()
        
        result.append(LandRentalListResponse(
            id=rental.id,
            title=rental.title,
            contact_name=rental.contact.name,
            county=rental.location.county,
            district=rental.location.district,
            area=rental.area,
            rent_amount=rental.rent_amount,
            zone_type=rental.zone_type,
            land_status=[s.status for s in statuses],
            cover_photo_path=cover_photo.photo_path if cover_photo else None,
            photos_paths=[p.photo_path for p in photos],
            created_at=rental.created_at
        ))
    
    return result

@router.get("/rentals/{rental_id}", response_model=LandRentalResponse)
def get_rental(rental_id: int, db: Session = Depends(get_db)):
    """取得特定土地租賃資訊"""
    rental = db.query(LandRental).filter(LandRental.id == rental_id).first()
    if rental is None:
        raise HTTPException(status_code=404, detail="找不到此租賃資訊")
    return rental

@router.delete("/rentals/{rental_id}")
def delete_rental(rental_id: int, db: Session = Depends(get_db)):
    """刪除土地租賃資訊"""
    rental = db.query(LandRental).filter(LandRental.id == rental_id).first()
    if rental is None:
        raise HTTPException(status_code=404, detail="找不到此租賃資訊")
    
    db.delete(rental)
    db.commit()
    return {"message": "刪除成功"}