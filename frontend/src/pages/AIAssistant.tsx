import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from "lucide-react";

const AIAssistant = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-2">AI 農業助理</h1>
              <p className="text-muted-foreground">
                24小時線上解答您的農業問題
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>常見問題</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "如何選擇適合的作物？",
                    "病蟲害如何防治？",
                    "有機農法入門指南",
                    "灌溉系統建議"
                  ].map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4 text-left"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>對話區</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="min-h-[400px] border rounded-lg p-4 bg-muted/20">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="bg-background rounded-lg p-3 shadow-sm">
                        <p className="text-sm">
                          您好！我是 Farmio AI 助理，很高興為您服務。請問有什麼農業問題需要協助嗎？
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="輸入您的問題..."
                      className="min-h-[60px] resize-none"
                    />
                    <Button size="lg" className="px-6">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    AI 助理提供的建議僅供參考，實際操作請依據當地環境條件調整
                  </p>
                </div>
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

export default AIAssistant;
