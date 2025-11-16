from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.models.base import Base  # 從獨立檔案匯入 Base

# 建立資料庫引擎
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    echo=True
)

# 建立 Session 工廠
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 建立所有資料表
def init_db():
    # 匯入所有模型以確保它們被註冊
    from app.models import rental, forum
    
    # 建立所有資料表
    Base.metadata.create_all(bind=engine)
    print("✅ 資料庫初始化完成")

# 取得資料庫 session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()