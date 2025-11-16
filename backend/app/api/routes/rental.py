from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import os
import uuid
from datetime import datetime

from app.database import get_db
from app.models.rental import LandRental
from app.schemas.rental import LandRentalCreate, LandRentalResponse

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
    photos: List[UploadFile] = File(default=[]),  # 改這行：加上 default=[]
    db: Session = Depends(get_db)
):
    """建立新的土地租賃資訊"""
    
    print("=" * 60)
    print("🔍 收到的表單資料:")
    print(f"contact_name: {contact_name}")
    print(f"contact_phone: {contact_phone}")
    print(f"contact_email: {contact_email}")
    print(f"contact_role: {contact_role}")
    print(f"title: {title}")
    print(f"county: {county}")
    print(f"district: {district}")
    print(f"address: {address}")
    print(f"area: {area}")
    print(f"rent_amount: {rent_amount}")
    print(f"zone_type: {zone_type}")
    print(f"land_status: {land_status}")
    print(f"cover_photo: {cover_photo}")
    print(f"photos 數量: {len(photos) if photos else 0}")
    print("=" * 60)
    
    try:
        # 處理封面照片
        cover_photo_path = None
        if cover_photo and cover_photo.filename:
            cover_photo_path = await save_upload_file(cover_photo)
            print(f"✅ 封面照片已儲存: {cover_photo_path}")
        
        # 處理多張照片
        photos_paths = []
        if photos:
            for photo in photos[:6]:  # 最多 6 張
                if photo.filename:  # 確保有檔案名稱
                    photo_path = await save_upload_file(photo)
                    photos_paths.append(photo_path)
                    print(f"✅ 照片已儲存: {photo_path}")
        
        print(f"📸 共儲存 {len(photos_paths)} 張照片")
        
        # 解析 land_status
        import json
        land_status_list = json.loads(land_status) if land_status else []
        
        # 建立資料庫記錄
        db_rental = LandRental(
            contact_name=contact_name,
            contact_phone=contact_phone,
            contact_email=contact_email,
            contact_role=contact_role,
            title=title,
            county=county,
            district=district,
            address=address,
            area=area,
            rent_amount=rent_amount,
            zone_type=zone_type,
            land_status=land_status_list,
            cover_photo_path=cover_photo_path,
            photos_paths=photos_paths
        )
        
        db.add(db_rental)
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

@router.get("/rentals", response_model=List[LandRentalResponse])
def get_all_rentals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """取得所有土地租賃資訊"""
    rentals = db.query(LandRental).offset(skip).limit(limit).all()
    return rentals

@router.get("/rentals/{rental_id}", response_model=LandRentalResponse)
def get_rental(rental_id: int, db: Session = Depends(get_db)):
    """取得特定土地租賃資訊"""
    rental = db.query(LandRental).filter(LandRental.id == rental_id).first()
    if rental is None:
        raise HTTPException(status_code=404, detail="找不到此租賃資訊")
    return rental