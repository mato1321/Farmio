from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from app.database import get_db
from app.models.forum import ForumPost, ForumComment
from app.schemas.forum import (
    PostCreate, PostUpdate, PostResponse, PostListResponse,
    CommentCreate, CommentResponse
)

router = APIRouter()

# ===== 文章相關 API =====

@router.get("/posts", response_model=List[PostListResponse])
def get_all_posts(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """取得所有文章列表"""
    query = db.query(ForumPost)
    
    if category:
        query = query.filter(ForumPost.category == category)
    
    posts = query.order_by(ForumPost.created_at.desc()).offset(skip).limit(limit).all()
    
    # 格式化回應
    result = []
    for post in posts:
        comment_count = db.query(ForumComment).filter(ForumComment.post_id == post.id).count()
        
        # 計算時間差
        time_diff = datetime.utcnow() - post.created_at
        if time_diff < timedelta(minutes=60):
            time_str = f"{int(time_diff.total_seconds() / 60)}分鐘前"
        elif time_diff < timedelta(hours=24):
            time_str = f"{int(time_diff.total_seconds() / 3600)}小時前"
        else:
            time_str = f"{time_diff.days}天前"
        
        result.append(PostListResponse(
            id=post.id,
            title=post.title,
            author=post.author,
            avatar=post.avatar,
            category=post.category,
            tags=post.tags or [],
            likes=post.likes,
            comment_count=comment_count,
            created_at=post.created_at,
            content_preview=post.content[:100] + "..." if len(post.content) > 100 else post.content
        ))
    
    return result

@router.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    """建立新文章"""
    db_post = ForumPost(
        title=post.title,
        content=post.content,
        author=post.author,
        avatar=post.avatar or f"https://api.dicebear.com/7.x/avataaars/svg?seed={post.author}",
        category=post.category,
        tags=post.tags,
        likes=0
    )
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    print(f"✅ 成功建立文章，ID: {db_post.id}")
    
    # 返回時手動構建回應，避免 SQLAlchemy 關係問題
    response_data = {
        'id': db_post.id,
        'title': db_post.title,
        'content': db_post.content,
        'author': db_post.author,
        'avatar': db_post.avatar,
        'category': db_post.category,
        'tags': db_post.tags or [],
        'likes': db_post.likes,
        'created_at': db_post.created_at,
        'updated_at': db_post.updated_at,
        'comments': []  # 新建立的文章沒有留言
    }
    
    return response_data

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    """取得特定文章詳情"""
    # 取得文章
    post = db.query(ForumPost).filter(ForumPost.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="找不到此文章")
    
    # 手動取得所有留言
    all_comments = db.query(ForumComment).filter(
        ForumComment.post_id == post_id
    ).order_by(ForumComment.created_at.asc()).all()
    
    # 建立留言字典
    comments_map = {}
    main_comments = []
    
    # 第一遍：建立所有留言的映射
    for comment in all_comments:
        comments_map[comment.id] = {
            'id': comment.id,
            'post_id': comment.post_id,
            'author': comment.author,
            'avatar': comment.avatar,
            'content': comment.content,
            'likes': comment.likes,
            'parent_id': comment.parent_id,
            'created_at': comment.created_at,
            'replies': []
        }
    
    # 第二遍：組織留言結構
    for comment in all_comments:
        comment_data = comments_map[comment.id]
        if comment.parent_id is None:
            # 主留言
            main_comments.append(comment_data)
        else:
            # 回覆留言
            if comment.parent_id in comments_map:
                comments_map[comment.parent_id]['replies'].append(comment_data)
    
    # 組合回應資料
    response_data = {
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author,
        'avatar': post.avatar,
        'category': post.category,
        'tags': post.tags or [],
        'likes': post.likes,
        'created_at': post.created_at,
        'updated_at': post.updated_at,
        'comments': main_comments
    }
    
    return response_data

@router.put("/posts/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db)):
    """更新文章"""
    db_post = db.query(ForumPost).filter(ForumPost.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="找不到此文章")
    
    if post.title is not None:
        db_post.title = post.title
    if post.content is not None:
        db_post.content = post.content
    if post.category is not None:
        db_post.category = post.category
    if post.tags is not None:
        db_post.tags = post.tags
    
    db_post.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_post)
    
    print(f"✅ 已更新文章 ID: {post_id}")
    
    # 手動構建回應
    response_data = {
        'id': db_post.id,
        'title': db_post.title,
        'content': db_post.content,
        'author': db_post.author,
        'avatar': db_post.avatar,
        'category': db_post.category,
        'tags': db_post.tags or [],
        'likes': db_post.likes,
        'created_at': db_post.created_at,
        'updated_at': db_post.updated_at,
        'comments': []
    }
    
    return response_data

@router.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    """刪除文章"""
    post = db.query(ForumPost).filter(ForumPost.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="找不到此文章")
    
    db.delete(post)
    db.commit()
    
    print(f"✅ 已刪除文章 ID: {post_id}")
    return {"message": "刪除成功", "id": post_id}

@router.post("/posts/{post_id}/like")
def like_post(post_id: int, db: Session = Depends(get_db)):
    """按讚文章"""
    post = db.query(ForumPost).filter(ForumPost.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="找不到此文章")
    
    post.likes += 1
    db.commit()
    
    print(f"✅ 文章 {post_id} 按讚數: {post.likes}")
    
    return {"likes": post.likes}

# ===== 留言相關 API =====

@router.post("/comments", response_model=CommentResponse)
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    """建立留言或回覆"""
    # 確認文章存在
    post = db.query(ForumPost).filter(ForumPost.id == comment.post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="找不到此文章")
    
    # 如果是回覆，確認父留言存在
    if comment.parent_id:
        parent = db.query(ForumComment).filter(ForumComment.id == comment.parent_id).first()
        if parent is None:
            raise HTTPException(status_code=404, detail="找不到父留言")
    
    db_comment = ForumComment(
        post_id=comment.post_id,
        author=comment.author,
        avatar=comment.avatar or f"https://api.dicebear.com/7.x/avataaars/svg?seed={comment.author}",
        content=comment.content,
        parent_id=comment.parent_id,
        likes=0
    )
    
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    
    print(f"✅ 成功建立留言，ID: {db_comment.id}")
    
    # 手動建立回應字典，不要直接操作 SQLAlchemy 物件的 replies 屬性
    response_data = {
        'id': db_comment.id,
        'post_id': db_comment.post_id,
        'author': db_comment.author,
        'avatar': db_comment.avatar,
        'content': db_comment.content,
        'likes': db_comment.likes,
        'parent_id': db_comment.parent_id,
        'created_at': db_comment.created_at,
        'replies': []  # 新建立的留言沒有回覆
    }
    
    return response_data

@router.post("/comments/{comment_id}/like")
def like_comment(comment_id: int, db: Session = Depends(get_db)):
    """按讚留言"""
    comment = db.query(ForumComment).filter(ForumComment.id == comment_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail="找不到此留言")
    
    comment.likes += 1
    db.commit()
    
    print(f"✅ 留言 {comment_id} 按讚數: {comment.likes}")
    
    return {"likes": comment.likes}

@router.delete("/comments/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    """刪除留言"""
    comment = db.query(ForumComment).filter(ForumComment.id == comment_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail="找不到此留言")
    
    db.delete(comment)
    db.commit()
    
    print(f"✅ 已刪除留言 ID: {comment_id}")
    
    return {"message": "刪除成功", "id": comment_id}