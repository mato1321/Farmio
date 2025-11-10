import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, MessageCircle } from "lucide-react";

const Forum = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "有機農法經驗分享",
      author: "農友小李",
      content: "最近嘗試了有機農法，想跟大家分享一些心得...",
      likes: 24,
      comments: 8,
      time: "2小時前"
    },
    {
      id: 2,
      title: "夏季蔬菜種植建議",
      author: "田園達人",
      content: "夏季來臨，分享一些適合這個季節種植的蔬菜...",
      likes: 35,
      comments: 12,
      time: "5小時前"
    },
    {
      id: 3,
      title: "灌溉系統設置問題請教",
      author: "新手農夫",
      content: "請問大家都用什麼樣的灌溉系統？想請教經驗...",
      likes: 18,
      comments: 15,
      time: "1天前"
    }
  ];

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
              <Button size="lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                發表文章
              </Button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
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
                    <p className="text-foreground/80 mb-4">{post.content}</p>
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
              ))}
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