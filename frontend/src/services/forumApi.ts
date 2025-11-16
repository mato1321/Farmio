const API_BASE_URL = 'http://localhost:8000/api/forum';

// ===== 介面定義 =====
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: string;
  tags: string[];
  likes: number;
  created_at: string;
  updated_at?: string;
}

export interface PostListItem {
  id: number;
  title: string;
  author: string;
  avatar: string;
  category: string;
  tags: string[];
  likes: number;
  comment_count: number;
  created_at: string;
  content_preview: string;
}

export interface Comment {
  id: number;
  post_id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  parent_id: number | null;
  created_at: string;
  replies: Comment[];
}

export interface PostDetail extends Post {
  comments: Comment[];
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  avatar?: string;
}

export interface CreateCommentData {
  post_id: number;
  content: string;
  author: string;
  parent_id?: number | null;
  avatar?: string;
}

// ===== 文章相關 API =====

/**
 * 取得所有文章列表
 */
export const getPosts = async (category?: string): Promise<PostListItem[]> => {
  try {
    const url = category 
      ? `${API_BASE_URL}/posts?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/posts`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('取得文章列表失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 取得特定文章詳情
 */
export const getPostById = async (id: number): Promise<PostDetail> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    
    if (!response.ok) {
      throw new Error('取得文章失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 建立新文章
 */
export const createPost = async (data: CreatePostData): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '建立文章失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 更新文章
 */
export const updatePost = async (
  id: number,
  data: Partial<CreatePostData>
): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('更新文章失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 刪除文章
 */
export const deletePost = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('刪除文章失敗');
    }
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 按讚文章
 */
export const likePost = async (id: number): Promise<{ likes: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/like`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('按讚失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

// ===== 留言相關 API =====

/**
 * 建立留言或回覆
 */
export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '建立留言失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 按讚留言
 */
export const likeComment = async (id: number): Promise<{ likes: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${id}/like`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('按讚失敗');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 刪除留言
 */
export const deleteComment = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('刪除留言失敗');
    }
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

/**
 * 格式化時間顯示
 */
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return '剛剛';
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分鐘前`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小時前`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}天前`;
  } else {
    return date.toLocaleDateString('zh-TW');
  }
};