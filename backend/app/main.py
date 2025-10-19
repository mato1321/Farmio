from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings, CORS_ORIGINS
from app.api.routes import chat
import logging

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

# 設定 CORS - 更寬鬆的設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 暫時允許所有來源，方便測試
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# 註冊路由
app.include_router(chat.router, prefix="/api")

@app.get("/")
async def root():
    """根路徑"""
    return {
        "message": "歡迎使用 Farmio AI Chat API",
        "docs": "/docs",
        "health": "/api/chat/health"
    }

@app.get("/health")
async def health():
    """全域健康檢查"""
    return {"status": "healthy", "service": "Farmio AI API"}

# 添加全域異常處理
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"全域錯誤: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "系統發生錯誤，請稍後再試"}
    )