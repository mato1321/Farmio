from fastapi import APIRouter, HTTPException, status
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ollama import ollama_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse, summary="AI 聊天對話")
async def chat(request: ChatRequest):
    """
    與 AI 助理進行對話
    
    - **message**: 用戶問題
    - **history**: 對話歷史（可選）
    """
    try:
        # 將 Pydantic 模型轉換為字典
        history_dict = [msg.model_dump() for msg in request.history] if request.history else []
        
        # 調用 Ollama 服務生成回應
        answer = await ollama_service.generate_response(
            prompt=request.message,
            history=history_dict
        )
        
        return ChatResponse(
            answer=answer,
            status="success"
        )
        
    except Exception as e:
        logger.error(f"聊天 API 錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="系統發生錯誤，請稍後再試"
        )

@router.get("/health", summary="健康檢查")
async def health_check():
    """檢查 API 服務狀態"""
    return {
        "status": "healthy",
        "service": "Farmio AI Chat API",
        "model": ollama_service.model
    }