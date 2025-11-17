"""
資料庫正規化遷移腳本
將舊的 land_rentals 表資料遷移到新的正規化結構
"""
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.models.rental import Contact, Location, LandRental, RentalPhoto, RentalLandStatus
from app.models.base import Base
import json

def migrate_data():
    """執行資料遷移"""
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    try:
        print("開始資料遷移...")
        
        # 查詢舊資料
        old_rentals_query = text("""
            SELECT * FROM land_rentals_old
        """)
        
        old_rentals = db.execute(old_rentals_query).fetchall()
        
        for old_rental in old_rentals:
            # 1. 建立或查找聯絡人
            contact = db.query(Contact).filter(
                Contact.phone == old_rental.contact_phone
            ).first()
            
            if not contact:
                contact = Contact(
                    name=old_rental.contact_name,
                    phone=old_rental.contact_phone,
                    email=old_rental.contact_email,
                    role=old_rental.contact_role
                )
                db.add(contact)
                db.flush()
            
            # 2. 建立或查找地址
            location = db.query(Location).filter(
                Location.county == old_rental.county,
                Location.district == old_rental.district,
                Location.address == old_rental.address
            ).first()
            
            if not location:
                location = Location(
                    county=old_rental.county,
                    district=old_rental.district,
                    address=old_rental.address
                )
                db.add(location)
                db.flush()
            
            # 3. 建立新的租賃記錄
            new_rental = LandRental(
                title=old_rental.title,
                contact_id=contact.id,
                location_id=location.id,
                area=old_rental.area,
                rent_amount=old_rental.rent_amount,
                zone_type=old_rental.zone_type,
                created_at=old_rental.created_at,
                updated_at=old_rental.updated_at
            )
            db.add(new_rental)
            db.flush()
            
            # 4. 遷移封面照片
            if old_rental.cover_photo_path:
                cover_photo = RentalPhoto(
                    rental_id=new_rental.id,
                    photo_path=old_rental.cover_photo_path,
                    is_cover=True,
                    sort_order=0
                )
                db.add(cover_photo)
            
            # 5. 遷移其他照片
            if old_rental.photos_paths:
                photos_list = json.loads(old_rental.photos_paths) if isinstance(old_rental.photos_paths, str) else old_rental.photos_paths
                for idx, photo_path in enumerate(photos_list, start=1):
                    photo = RentalPhoto(
                        rental_id=new_rental.id,
                        photo_path=photo_path,
                        is_cover=False,
                        sort_order=idx
                    )
                    db.add(photo)
            
            # 6. 遷移土地狀態
            if old_rental.land_status:
                status_list = json.loads(old_rental.land_status) if isinstance(old_rental.land_status, str) else old_rental.land_status
                for status in status_list:
                    land_status = RentalLandStatus(
                        rental_id=new_rental.id,
                        status=status
                    )
                    db.add(land_status)
            
            print(f"✅ 已遷移租賃記錄 ID: {old_rental.id} -> {new_rental.id}")
        
        db.commit()
        print("✅ 資料遷移完成！")
        
    except Exception as e:
        print(f"❌ 遷移錯誤: {e}")
        db.rollback()
        raise
    finally:
        db.close()

def backup_old_table():
    """備份舊資料表"""
    engine = create_engine(settings.DATABASE_URL)
    
    with engine.connect() as conn:
        # 重命名舊表
        conn.execute(text("ALTER TABLE land_rentals RENAME TO land_rentals_old"))
        conn.commit()
        print("✅ 已備份舊資料表為 land_rentals_old")

if __name__ == "__main__":
    print("=" * 60)
    print("資料庫正規化遷移工具")
    print("=" * 60)
    
    response = input("是否要備份舊資料表？(y/n): ")
    if response.lower() == 'y':
        backup_old_table()
    
    response = input("是否要開始遷移資料？(y/n): ")
    if response.lower() == 'y':
        migrate_data()