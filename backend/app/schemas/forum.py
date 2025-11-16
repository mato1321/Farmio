from pydantic import BaseModel, field_validator
from typing import List, Optional
from datetime import datetime

# ===== 留言相關 =====
class CommentBase(BaseModel):
    content: str
    author: str
    avatar: Optional[str] = None

class CommentCreate(CommentBase):
    post_id: int
    parent_id: Optional[int] = None

class CommentResponse(CommentBase):
    id: int
    post_id: int
    parent_id: Optional[int]
    likes: int
    created_at: datetime
    replies: List['CommentResponse'] = []  # 預設空列表
    
    @field_validator('replies', mode='before')
    @classmethod
    def validate_replies(cls, v):
        """確保 replies 永遠是列表"""
        if v is None:
            return []
        return v
    
    class Config:
        from_attributes = True

# 解決循環引用
CommentResponse.model_rebuild()

# ===== 文章相關 =====
class PostBase(BaseModel):
    title: str
    content: str
    author: str
    category: str
    tags: List[str] = []
    avatar: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None

class PostResponse(PostBase):
    id: int
    likes: int
    created_at: datetime
    updated_at: datetime
    comments: List[CommentResponse] = []
    
    class Config:
        from_attributes = True

class PostListResponse(BaseModel):
    id: int
    title: str
    author: str
    avatar: Optional[str]
    category: str
    tags: List[str]
    likes: int
    comment_count: int
    created_at: datetime
    content_preview: str  # 內容預覽（前 100 字）
    
    class Config:
        from_attributes = True