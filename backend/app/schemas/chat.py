from pydantic import BaseModel, Field
from typing import List, Optional

class Message(BaseModel):
    type: str = Field(..., description="訊息類型: user 或 bot")
    text: str = Field(..., description="訊息內容")

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="用戶訊息")
    history: Optional[List[Message]] = Field(default=[], description="對話歷史")
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "什麼是水稻種植的最佳季節？",
                "history": [
                    {"type": "bot", "text": "您好！我是 AI 助理"},
                    {"type": "user", "text": "你好"}
                ]
            }
        }

class ChatResponse(BaseModel):
    answer: str = Field(..., description="AI 回覆")
    status: str = Field(default="success", description="狀態")
    
    class Config:
        json_schema_extra = {
            "example": {
                "answer": "水稻種植的最佳季節通常是春季...",
                "status": "success"
            }
        }