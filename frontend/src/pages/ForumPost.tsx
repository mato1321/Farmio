import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowLeft,
  Send
} from "lucide-react";
import {
  getPostById,
  createComment,
  likePost,
  likeComment,
  formatTimeAgo,
  type PostDetail,
  type Comment
} from "@/services/forumApi";

const ForumPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost(parseInt(id));
    }
  }, [id]);

  const loadPost = async (postId: number) => {
    try {
      setLoading(true);
      const data = await getPostById(postId);
      setPost(data);
      setLocalLikes(data.likes);
      console.log('✅ 載入文章詳情成功:', data);
    } catch (error) {
      console.error('❌ 載入文章詳情失敗:', error);
      setError('找不到此文章');
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async () => {
    if (!post || liked) return;

    try {
      const result = await likePost(post.id);
      setLocalLikes(result.likes);
      setLiked(true);
      console.log('✅ 按讚成功');
    } catch (error) {
      console.error('❌ 按讚失敗:', error);
      alert('按讚失敗，請稍後再試');
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim() || !post) return;

    setIsSubmittingComment(true);

    try {
      await createComment({
        post_id: post.id,
        content: comment,
        author: "mato1321",  // 使用你的使用者名稱
        parent_id: null,
      });

      console.log('✅ 留言成功');
      setComment("");
      
      // 重新載入文章以更新留言列表
      await loadPost(post.id);
    } catch (error: any) {
      console.error('❌ 留言失敗:', error);
      alert(`留言失敗：${error.message}`);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      await likeComment(commentId);
      console.log('✅ 留言按讚成功');
      
      // 重新載入文章以更新按讚數
      if (post) {
        await loadPost(post.id);
      }
    } catch (error) {
      console.error('❌ 留言按讚失敗:', error);
    }
  };

  const renderComment = (comment: Comment, isReply: boolean = false) => {
    return (
      <div key={comment.id} className="space-y-4">
        <div className={`flex gap-3 ${isReply ? 'ml-12' : ''}`}>
          <Avatar className={isReply ? 'w-8 h-8' : 'w-10 h-10'}>
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold ${isReply ? 'text-sm' : ''}`}>
                  {comment.author}
                </span>
                <span className={`text-muted-foreground ${isReply ? 'text-xs' : 'text-sm'}`}>
                  {formatTimeAgo(comment.created_at)}
                </span>
              </div>
              <p className={`text-foreground/90 ${isReply ? 'text-sm' : ''}`}>
                {comment.content}
              </p>
            </div>
            <div className={`flex items-center gap-4 mt-2 text-muted-foreground ${isReply ? 'text-xs' : 'text-sm'}`}>
              <button 
                className="hover:text-green-600 transition-colors flex items-center gap-1"
                onClick={() => handleLikeComment(comment.id)}
              >
                <ThumbsUp className={isReply ? 'w-3 h-3' : 'w-4 h-4'} />
                {comment.likes > 0 && <span>{comment.likes}</span>}
              </button>
              <button className="hover:text-green-600 transition-colors">
                回覆
              </button>
            </div>
          </div>
        </div>

        {/* 回覆留言 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4">
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-muted-foreground">載入中...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-12">
              <h2 className="text-2xl font-bold mb-4">找不到此文章</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => navigate('/forum')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回討論區
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate('/forum')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回討論區
            </Button>

            {/* 文章主體 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                {/* 文章頭部 */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{post.author}</span>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeAgo(post.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 文章標題 */}
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                {/* 標籤 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* 文章內容 */}
                <div className="prose prose-green max-w-none mb-8">
                  {post.content.split('\n').map((paragraph, idx) => {
                    // 處理 Markdown 標題
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl font-bold mt-4 mb-2">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    } else if (paragraph.startsWith('- ')) {
                      return (
                        <li key={idx} className="ml-6">
                          {paragraph.replace('- ', '')}
                        </li>
                      );
                    } else if (paragraph.trim() === '') {
                      return <br key={idx} />;
                    } else {
                      return (
                        <p key={idx} className="mb-4">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>

                {/* 互動按鈕 */}
                <div className="flex items-center gap-4 pt-6 border-t">
                  <Button
                    variant={liked ? "default" : "outline"}
                    className={`gap-2 ${liked ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={handleLikePost}
                    disabled={liked}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {liked ? '已按讚' : '按讚'} {localLikes}
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    留言 {post.comments?.length || 0}
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setBookmarked(!bookmarked)}
                    className={bookmarked ? 'text-yellow-600' : ''}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 留言區 */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">
                  留言 {post.comments?.length || 0}
                </h2>

                {/* 發表留言 */}
                <div className="mb-8">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=mato1321" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="寫下你的留言..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-2 min-h-[100px]"
                        disabled={isSubmittingComment}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmitComment}
                          disabled={!comment.trim() || isSubmittingComment}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {isSubmittingComment ? '送出中...' : '送出留言'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 留言列表 */}
                {!post.comments || post.comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    目前還沒有留言，快來搶第一個留言吧！
                  </div>
                ) : (
                  <div className="space-y-6">
                    {post.comments.map(comment => renderComment(comment))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ForumPost;