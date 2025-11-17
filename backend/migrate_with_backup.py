"""
完全清理並重新遷移
這個腳本會刪除所有相關的表和索引，然後重新建立
"""
from sqlalchemy import text
from app.database import engine, SessionLocal
from app.models.base import Base
from app.models.rental import Contact, Location, LandRental, RentalPhoto, RentalLandStatus
import json

def full_cleanup_and_migrate():
    """完全清理並遷移"""
    db = SessionLocal()
    
    try:
        print("=" * 60)
        print("完全清理並遷移工具")
        print("=" * 60)
        
        # 1. 備份舊資料到臨時表
        print("\n1. 備份舊資料...")
        with engine.connect() as conn:
            # 檢查 land_rentals 是否存在
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'land_rentals'
                );
            """))
            table_exists = result.scalar()
            
            if table_exists:
                # 建立臨時備份表
                conn.execute(text("DROP TABLE IF EXISTS temp_backup CASCADE"))
                conn.execute(text("CREATE TABLE temp_backup AS SELECT * FROM land_rentals"))
                print("   ✅ 已備份到 temp_backup")
                
                # 查詢備份資料數量
                result = conn.execute(text("SELECT COUNT(*) FROM temp_backup"))
                count = result.scalar()
                print(f"   📊 備份了 {count} 筆資料")
            else:
                print("   ℹ️  沒有找到 land_rentals 表")
                count = 0
            
            conn.commit()
        
        # 2. 刪除所有相關的表和索引
        print("\n2. 清理所有舊表和索引...")
        with engine.connect() as conn:
            # 刪除索引
            indexes = [
                'ix_land_rentals_id',
                'ix_land_rentals_created_at',
                'ix_contacts_id',
                'ix_locations_id',
                'ix_locations_county',
                'ix_locations_district'
            ]
            
            for index in indexes:
                try:
                    conn.execute(text(f"DROP INDEX IF EXISTS {index} CASCADE"))
                    print(f"   ✅ 已刪除索引: {index}")
                except:
                    pass
            
            # 刪除表
            tables = [
                'rental_land_status',
                'rental_photos',
                'land_rentals',
                'land_rentals_backup',
                'locations',
                'contacts'
            ]
            
            for table in tables:
                try:
                    conn.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE"))
                    print(f"   ✅ 已刪除表: {table}")
                except:
                    pass
            
            conn.commit()
        
        # 3. 建立新的表結構
        print("\n3. 建立新的正規化表結構...")
        Base.metadata.create_all(bind=engine)
        print("   ✅ 新表結構建立完成")
        
        # 4. 從臨時表遷移資料
        if count > 0:
            print("\n4. 從備份遷移資料...")
            
            with engine.connect() as conn:
                result = conn.execute(text("SELECT * FROM temp_backup"))
                old_rentals = result.fetchall()
                column_names = result.keys()
            
            migrated_count = 0
            error_count = 0
            
            for old_rental in old_rentals:
                rental_dict = dict(zip(column_names, old_rental))
                
                try:
                    # 建立聯絡人
                    contact_phone = rental_dict.get('contact_phone', '')
                    if not contact_phone:
                        error_count += 1
                        continue
                    
                    contact = db.query(Contact).filter(
                        Contact.phone == contact_phone
                    ).first()
                    
                    if not contact:
                        contact = Contact(
                            name=rental_dict.get('contact_name', '未提供'),
                            phone=contact_phone,
                            email=rental_dict.get('contact_email'),
                            role=rental_dict.get('contact_role', '地主本人')
                        )
                        db.add(contact)
                        db.flush()
                    
                    # 建立地址
                    county = rental_dict.get('county', '')
                    district = rental_dict.get('district', '')
                    
                    if not county or not district:
                        error_count += 1
                        continue
                    
                    location = db.query(Location).filter(
                        Location.county == county,
                        Location.district == district,
                        Location.address == rental_dict.get('address')
                    ).first()
                    
                    if not location:
                        location = Location(
                            county=county,
                            district=district,
                            address=rental_dict.get('address')
                        )
                        db.add(location)
                        db.flush()
                    
                    # 建立租賃記錄
                    new_rental = LandRental(
                        title=rental_dict.get('title', '未命名'),
                        contact_id=contact.id,
                        location_id=location.id,
                        area=rental_dict.get('area', '0'),
                        rent_amount=rental_dict.get('rent_amount', '0'),
                        zone_type=rental_dict.get('zone_type', '未分類'),
                        created_at=rental_dict.get('created_at'),
                        updated_at=rental_dict.get('updated_at')
                    )
                    db.add(new_rental)
                    db.flush()
                    
                    # 遷移照片
                    if rental_dict.get('cover_photo_path'):
                        cover_photo = RentalPhoto(
                            rental_id=new_rental.id,
                            photo_path=rental_dict['cover_photo_path'],
                            is_cover=True,
                            sort_order=0
                        )
                        db.add(cover_photo)
                    
                    photos_paths = rental_dict.get('photos_paths')
                    if photos_paths:
                        try:
                            if isinstance(photos_paths, str):
                                photos_list = json.loads(photos_paths)
                            else:
                                photos_list = photos_paths or []
                            
                            for idx, photo_path in enumerate(photos_list, start=1):
                                photo = RentalPhoto(
                                    rental_id=new_rental.id,
                                    photo_path=photo_path,
                                    is_cover=False,
                                    sort_order=idx
                                )
                                db.add(photo)
                        except:
                            pass
                    
                    # 遷移土地狀態
                    land_status = rental_dict.get('land_status')
                    if land_status:
                        try:
                            if isinstance(land_status, str):
                                status_list = json.loads(land_status)
                            else:
                                status_list = land_status or []
                            
                            for status in status_list:
                                if status:
                                    land_status_obj = RentalLandStatus(
                                        rental_id=new_rental.id,
                                        status=status
                                    )
                                    db.add(land_status_obj)
                        except:
                            pass
                    
                    migrated_count += 1
                    
                except Exception as e:
                    print(f"   ⚠️  遷移記錄失敗: {e}")
                    error_count += 1
                    continue
            
            db.commit()
            print(f"\n   📊 遷移統計:")
            print(f"      - 成功: {migrated_count} 筆")
            print(f"      - 失敗: {error_count} 筆")
            
            # 刪除臨時表
            with engine.connect() as conn:
                conn.execute(text("DROP TABLE IF EXISTS temp_backup"))
                conn.commit()
            print("   ✅ 已清理臨時備份表")
        else:
            print("\n4. 沒有需要遷移的資料")
        
        print("\n" + "=" * 60)
        print("✅ 完成！")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ 錯誤: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("\n⚠️  這個腳本會刪除並重建所有表！")
    print("你的舊資料會被保留並遷移到新結構。\n")
    response = input("確定要繼續嗎？ (yes/no): ")
    
    if response.lower() == 'yes':
        full_cleanup_and_migrate()
    else:
        print("已取消操作")