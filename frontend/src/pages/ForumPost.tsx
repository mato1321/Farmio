import { useState } from "react";
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
  MoreHorizontal,
  Send
} from "lucide-react";

const ForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");

  // 所有文章的完整資料
  const allPosts: { [key: number]: any } = {
    1: {
      id: 1,
      title: "有機農法經驗分享",
      author: "農友小李",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoli",
      content: `最近嘗試了有機農法，想跟大家分享一些心得。

## 土壤改良

開始有機農法的第一步就是土壤改良。我使用了大量的堆肥和有機質，經過三個月的改良後，土壤變得鬆軟許多，保水性也大幅提升。

## 病蟲害防治

這是有機農法最大的挑戰。我採用以下方法：

1. **物理防治**：使用防蟲網、黃色黏蟲板
2. **生物防治**：引入瓢蟲、草蛉等天敵
3. **植物性防治**：苦楝油、辣椒水等天然資材

## 成果分享

經過半年的努力，雖然產量比慣行農法少了約 20%，但是品質明顯提升，而且通過了有機認證，售價也高出許多，整體收益反而更好！

歡迎大家一起討論交流！`,
      likes: 24,
      time: "2小時前",
      tags: ["有機農法", "經驗分享"],
      category: "種植技術",
      initialComments: [
        {
          id: 1,
          author: "田園新手",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newbie1",
          content: "感謝分享！請問堆肥是自己製作的嗎？還是購買現成的？",
          likes: 5,
          time: "1小時前",
          replies: [
            {
              id: 11,
              author: "農友小李",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoli",
              content: "我是自己製作的，使用廚餘、落葉和牛糞混合發酵。大約需要 3-4 個月才能完全腐熟。",
              likes: 3,
              time: "50分鐘前"
            }
          ]
        },
        {
          id: 2,
          author: "有機達人",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert",
          content: "做得很好！有機農法確實需要更多耐心。建議可以試試綠肥作物輪作，效果會更好。",
          likes: 8,
          time: "45分鐘前",
          replies: []
        },
        {
          id: 3,
          author: "學習中農夫",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=learner",
          content: "想請問有機認證的流程會很複雜嗎？需要準備哪些資料？",
          likes: 2,
          time: "30分鐘前",
          replies: []
        }
      ]
    },
    2: {
      id: 2,
      title: "夏季蔬菜種植建議",
      author: "田園達人",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert",
      content: `夏季來臨，分享一些適合這個季節種植的蔬菜。

## 適合夏季的蔬菜

### 1. 空心菜
- 耐熱性極佳
- 生長快速，約 30 天可採收
- 需要充足水分

### 2. 絲瓜
- 需要充足陽光和水分
- 搭設棚架可提高產量
- 注意蟲害防治

### 3. 茄子
- 夏季主要作物之一
- 喜高溫環境
- 定期施肥很重要

### 4. 辣椒
- 適合台灣氣候
- 可持續採收
- 注意排水

## 注意事項

- 水分管理很重要，避免乾旱
- 病蟲害防治要及時
- 適時遮陽，避免強光灼傷葉片
- 定期施肥補充養分

歡迎大家補充其他推薦品種！`,
      likes: 35,
      time: "5小時前",
      tags: ["夏季種植", "蔬菜"],
      category: "種植技術",
      initialComments: []
    },
    3: {
      id: 3,
      title: "灌溉系統設置問題請教",
      author: "新手農夫",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newbie",
      content: `請問大家都用什麼樣的灌溉系統？

## 我的情況

我的農地大約 500 平方公尺，目前是手動澆水，但是每天要花很多時間。想請教有經驗的農友：

## 問題

1. **噴灌好還是滴灌好？**
   - 聽說滴灌比較省水
   - 但噴灌涵蓋面積大
   - 不知道該選哪個

2. **需要自動化控制嗎？**
   - 定時器大概多少錢？
   - 設定會不會很複雜？
   - 穩定性如何？

3. **預算考量**
   - 整套系統大概要多少錢？
   - 維護成本高嗎？
   - 有推薦的廠商嗎？

## 目前種植

主要種植葉菜類和瓜果類，需要考慮不同作物的需水量。

希望有經驗的農友可以分享一下經驗，謝謝大家！`,
      likes: 18,
      time: "1天前",
      tags: ["灌溉系統", "請教", "設備"],
      category: "設備技術",
      initialComments: []
    }
  };

  // 取得當前文章
  const postId = Number(id);
  const currentPost = allPosts[postId];

  // 初始化留言
  const [comments, setComments] = useState(currentPost?.initialComments || []);

  const handleSubmitComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "高碩辰",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaoshuochen",
        content: comment,
        likes: 0,
        time: "剛剛",
        replies: []
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  // 如果文章不存在
  if (!currentPost) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">找不到此文章</h1>
              <Button onClick={() => navigate('/forum')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回討論區
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按鈕 */}
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
                      <AvatarImage src={currentPost.avatar} />
                      <AvatarFallback>{currentPost.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{currentPost.author}</span>
                        <Badge variant="secondary">{currentPost.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{currentPost.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                {/* 文章標題 */}
                <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>

                {/* 標籤 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentPost.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* 文章內容 */}
                <div className="prose prose-green max-w-none mb-8">
                  {currentPost.content.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4 whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 互動按鈕 */}
                <div className="flex items-center gap-4 pt-6 border-t">
                  <Button
                    variant={liked ? "default" : "outline"}
                    className={`gap-2 ${liked ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => setLiked(!liked)}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {liked ? '已按讚' : '按讚'} {currentPost.likes + (liked ? 1 : 0)}
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    留言 {comments.length}
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
                  留言 {comments.length}
                </h2>

                {/* 發表留言 */}
                <div className="mb-8">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=kaoshuochen" />
                      <AvatarFallback>高</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="寫下你的留言..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-2 min-h-[100px]"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmitComment}
                          disabled={!comment.trim()}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          送出留言
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 留言列表 */}
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    目前還沒有留言，快來搶第一個留言吧！
                  </div>
                ) : (
                  <div className="space-y-6">
                    {comments.map((comment: any) => (
                      <div key={comment.id} className="space-y-4">
                        {/* 主留言 */}
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-sm text-muted-foreground">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="text-foreground/90">{comment.content}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <button className="hover:text-green-600 transition-colors flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                {comment.likes}
                              </button>
                              <button className="hover:text-green-600 transition-colors">
                                回覆
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 回覆留言 */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-12 space-y-4">
                            {comment.replies.map((reply: any) => (
                              <div key={reply.id} className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={reply.avatar} />
                                  <AvatarFallback>{reply.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-semibold text-sm">
                                        {reply.author}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {reply.time}
                                      </span>
                                    </div>
                                    <p className="text-sm text-foreground/90">
                                      {reply.content}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <button className="hover:text-green-600 transition-colors flex items-center gap-1">
                                      <ThumbsUp className="w-3 h-3" />
                                      {reply.likes}
                                    </button>
                                    <button className="hover:text-green-600 transition-colors">
                                      回覆
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
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