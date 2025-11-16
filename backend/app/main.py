from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings, CORS_ORIGINS
from app.api.routes import chat
from app.api.routes import rental  # 新增
from app.database import init_db  # 新增
import logging
import os

# 設定日誌
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# 建立 FastAPI 應用
app = FastAPI(
    title="Farmio AI Chat API",
    description="農地租用平台 AI 聊天服務",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 設定 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)

# 註冊路由
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(rental.router, prefix="/api", tags=["rental"])  # 新增

# 提供靜態檔案存取（上傳的圖片）
os.makedirs("uploads/rentals", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup_event():
    """應用啟動時初始化資料庫"""
    init_db()
    logging.info("資料庫初始化完成")

@app.get("/")
async def root():
    return {"message": "Farmio API 運行中"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}