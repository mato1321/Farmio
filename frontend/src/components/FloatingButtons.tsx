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
      text: "您好！我是農業小助手，很高興為您服務。請問有什麼農業問題需要協助嗎？"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage = { type: "user", text: inputValue };
    setMessages([...messages, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      console.log("發送請求到:", 'http://localhost:8000/api/chat/');
      console.log("請求數據:", { message: currentInput, history: messages });
      
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          history: messages
        }),
      });

      console.log("回應狀態:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("錯誤回應:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("收到數據:", data);
      
      const botReply = {
        type: "bot",
        text: data.answer || "抱歉，我無法回答這個問題。"
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('詳細錯誤:', error);
      const errorReply = {
        type: "bot",
        text: "抱歉，系統發生錯誤，請確認 AI 服務是否正常運行。"
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 聊天視窗 - 深色半透明 */}
      {isChatOpen && (
        <Card className="fixed bottom-24 right-8 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-black/70 backdrop-blur-md border-gray-700">
          {/* 標題列 - 深色半透明 */}
          <div className="bg-gray-800/80 text-white p-4 rounded-t-lg flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold">農業小助手</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/20 text-white h-8 w-8 p-0"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* 訊息區域 - 深色透明背景 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-gray-700/80 text-white backdrop-blur-sm"
                      : "bg-gray-800/80 text-gray-100 backdrop-blur-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-gray-300">農業小助手正在思考中...</p>
                </div>
              </div>
            )}
          </div>

          {/* 輸入區域 - 深色半透明 */}
          <div className="p-4 border-t border-gray-700 bg-gray-800/80 backdrop-blur-sm rounded-b-lg">
            <div className="flex gap-2">
              <Input
                placeholder="輸入您的農業問題..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                disabled={isLoading}
                className="bg-gray-600 hover:bg-gray-500"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 浮動按鈕 - 保持原本顏色 */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => setIsChatOpen(!isChatOpen)}
          title="農業小助手"
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