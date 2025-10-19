import { Button } from "@/components/ui/button";
import { MessageSquare, Building2, X, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const FloatingButtons = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "您好！我是 Farmio AI 助理，很高興為您服務。請問有什麼農業問題需要協助嗎？"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 添加用戶訊息
    const userMessage = { type: "user", text: inputValue };
    setMessages([...messages, userMessage]);

    // 模擬 AI 回應（您可以在這裡接入真實的 AI API）
    setTimeout(() => {
      const botReply = {
        type: "bot",
        text: "感謝您的提問！我們的 AI 助理正在為您分析問題..."
      };
      setMessages((prev) => [...prev, botReply]);
    }, 500);

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 聊天視窗 */}
      {isChatOpen && (
        <Card className="fixed bottom-24 right-8 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          {/* 標題列 */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold">AI 農業助理</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary-foreground/10 text-white h-8 w-8 p-0"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* 訊息區域 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-white"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 輸入區域 */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                placeholder="輸入您的問題..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 浮動按鈕 */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => setIsChatOpen(!isChatOpen)}
          title="AI助理"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
        
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => navigate("/enterprise")}
          title="企業資訊合作"
        >
          <Building2 className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};

export default FloatingButtons;