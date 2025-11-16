from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.models.rental import Base

# 建立資料庫引擎
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # 自動檢查連線是否有效
    echo=True  # 開發時顯示 SQL 語句
)

# 建立 Session 工廠
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 建立所有資料表
def init_db():
    Base.metadata.create_all(bind=engine)

# 取得資料庫 session 的依賴注入函數
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()