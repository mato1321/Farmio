"""
初始化正規化的資料庫結構
"""
from app.database import engine
from app.models.base import Base
from app.models import rental, forum

def init_database():
    """建立所有資料表"""
    print("開始建立資料表...")
    Base.metadata.create_all(bind=engine)
    print("✅ 資料表建立完成！")
    
    print("\n建立的資料表：")
    print("- contacts (聯絡人)")
    print("- locations (地址)")
    print("- land_rentals (土地租賃)")
    print("- rental_photos (租賃照片)")
    print("- rental_land_status (土地狀態)")

if __name__ == "__main__":
    init_database()