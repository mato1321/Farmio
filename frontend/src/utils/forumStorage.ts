// 討論區資料管理工具

export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
  category: string;
  avatar: string;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string;
}

// 初始化預設文章
const defaultPosts: Post[] = [
  {
    id: 1,
    title: "有機農法經驗分享",
    author: "農友小李",
    content: "最近嘗試了有機農法，想跟大家分享一些心得...",
    likes: 24,
    comments: 3,
    time: "2小時前",
    tags: ["有機農法", "經驗分享"],
    category: "種植技術",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoli"
  },
  {
    id: 2,
    title: "夏季蔬菜種植建議",
    author: "田園達人",
    content: "夏季來臨，分享一些適合這個季節種植的蔬菜...",
    likes: 35,
    comments: 2,
    time: "5小時前",
    tags: ["夏季種植", "蔬菜"],
    category: "種植技術",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert"
  },
  {
    id: 3,
    title: "灌溉系統設置問題請教",
    author: "新手農夫",
    content: "請問大家都用什麼樣的灌溉系統？想請教經驗...",
    likes: 18,
    comments: 1,
    time: "1天前",
    tags: ["灌溉系統", "請教"],
    category: "設備技術",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newbie"
  }
];

// 取得所有文章
export const getPosts = (): Post[] => {
  const stored = localStorage.getItem('farmio_posts');
  if (!stored) {
    localStorage.setItem('farmio_posts', JSON.stringify(defaultPosts));
    return defaultPosts;
  }
  return JSON.parse(stored);
};

// 取得單一文章
export const getPost = (id: number): Post | undefined => {
  const posts = getPosts();
  return posts.find(post => post.id === id);
};

// 新增文章
export const addPost = (post: Omit<Post, 'id' | 'likes' | 'comments' | 'time'>): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: Date.now(),
    likes: 0,
    comments: 0,
    time: "剛剛"
  };
  posts.unshift(newPost);
  localStorage.setItem('farmio_posts', JSON.stringify(posts));
  return newPost;
};

// 按讚文章
export const likePost = (id: number): void => {
  const posts = getPosts();
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes += 1;
    localStorage.setItem('farmio_posts', JSON.stringify(posts));
  }
};

// 取消按讚文章
export const unlikePost = (id: number): void => {
  const posts = getPosts();
  const post = posts.find(p => p.id === id);
  if (post && post.likes > 0) {
    post.likes -= 1;
    localStorage.setItem('farmio_posts', JSON.stringify(posts));
  }
};

// 取得文章的留言
export const getComments = (postId: number): Comment[] => {
  const stored = localStorage.getItem(`farmio_comments_${postId}`);
  if (!stored) return [];
  return JSON.parse(stored);
};

// 新增留言
export const addComment = (postId: number, content: string, author: string = "高碩辰"): Comment => {
  const comments = getComments(postId);
  const newComment: Comment = {
    id: Date.now(),
    author,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaoshuochen",
    content,
    likes: 0,
    time: "剛剛",
    replies: []
  };
  comments.push(newComment);
  localStorage.setItem(`farmio_comments_${postId}`, JSON.stringify(comments));
  
  // 更新文章的留言數
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.comments = comments.length;
    localStorage.setItem('farmio_posts', JSON.stringify(posts));
  }
  
  return newComment;
};

// 按讚留言
export const likeComment = (postId: number, commentId: number): void => {
  const comments = getComments(postId);
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
    comment.likes += 1;
    localStorage.setItem(`farmio_comments_${postId}`, JSON.stringify(comments));
  }
};

// 清除所有資料（重置）
export const clearAllData = (): void => {
  localStorage.removeItem('farmio_posts');
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('farmio_comments_')) {
      localStorage.removeItem(key);
    }
  });
};