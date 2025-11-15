import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, MessageCircle } from "lucide-react";
import { getPosts, addPost, type Post } from "@/utils/forumStorage";

const Forum = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "種植技術",
    tags: ""
  });

  // 載入文章
  useEffect(() => {
    setPosts(getPosts());
  }, []);

  // 發表文章
  const handleSubmit = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("請填寫標題和內容");
      return;
    }

    const post = addPost({
      title: newPost.title,
      content: newPost.content,
      author: "高碩辰",
      category: newPost.category,
      tags: newPost.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaoshuochen"
    });

    setPosts(getPosts());
    setIsDialogOpen(false);
    setNewPost({ title: "", content: "", category: "種植技術", tags: "" });
    
    // 導向到新文章
    navigate(`/forum/${post.id}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">討論區</h1>
                <p className="text-muted-foreground">與其他農友交流經驗與心得</p>
              </div>
              
              {/* 發表文章對話框 */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    發表文章
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>發表新文章</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">文章標題</label>
                      <Input
                        placeholder="請輸入文章標題..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">分類</label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={newPost.category}
                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      >
                        <option value="種植技術">種植技術</option>
                        <option value="設備工具">設備工具</option>
                        <option value="病蟲害防治">病蟲害防治</option>
                        <option value="經驗分享">經驗分享</option>
                        <option value="其他">其他</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">標籤（用逗號分隔）</label>
                      <Input
                        placeholder="例如：有機農法, 經驗分享"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">文章內容</label>
                      <Textarea
                        placeholder="分享您的經驗與想法..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleSubmit}>
                        發表文章
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* 文章列表 */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    目前還沒有文章，快來發表第一篇吧！
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/forum/${post.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {post.author} · {post.time}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 mb-4 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments} 則留言</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Forum;