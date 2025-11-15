import httpx
from typing import List, Dict
from app.config import settings
import logging
from opencc import OpenCC

logger = logging.getLogger(__name__)

class OllamaService:
    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_MODEL
        # ✅ 初始化簡繁轉換器
        self.cc = OpenCC('s2t')  # Simplified Chinese to Traditional Chinese
    
    async def generate_response(self, prompt: str, history: List[Dict] = None) -> str:
        """
        使用 Ollama 生成回應（GPU 優化版本 + 繁體中文輸出）
        
        Args:
            prompt: 用戶問題
            history: 對話歷史
            
        Returns:
            AI 生成的回應（繁體中文）
        """
        try:
            # 構建完整的提示詞（包含歷史對話）
            full_prompt = self._build_prompt(prompt, history)
            
            # GPU 優化：增加超時時間，但實際上 GPU 會很快
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": full_prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "top_p": 0.9,
                            "num_predict": 256,      # 限制最大生成長度
                            "num_ctx": 2048,         # 上下文窗口（適合 RTX 3050）
                            "num_gpu": 1,            # 使用 1 個 GPU
                            "num_thread": 8,         # CPU 線程數
                            "repeat_penalty": 1.1,   # 重複懲罰
                        }
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    ai_response = data.get("response", "抱歉，我無法生成回應。")
                    
                    # ✅ 強制轉換成繁體中文
                    ai_response_traditional = self.cc.convert(ai_response)
                    
                    logger.info(f"原始回應（可能是簡體）: {ai_response[:50]}...")
                    logger.info(f"轉換後（繁體）: {ai_response_traditional[:50]}...")
                    
                    return ai_response_traditional
                else:
                    logger.error(f"Ollama API 錯誤: {response.status_code}")
                    return "抱歉，AI 服務暫時無法使用。"
                    
        except httpx.TimeoutException:
            logger.error("Ollama API 請求超時")
            return "抱歉，AI 服務回應超時，請稍後再試。"
        except Exception as e:
            logger.error(f"Ollama 服務錯誤: {str(e)}")
            return "抱歉，系統發生錯誤，請稍後再試。"
    
    def _build_prompt(self, prompt: str, history: List[Dict] = None) -> str:
        """
        構建包含歷史對話的完整提示詞（優化版本 + 強化繁體中文提示）
        
        Args:
            prompt: 當前用戶問題
            history: 對話歷史
            
        Returns:
            完整的提示詞
        """
        # ✅ 加強繁體中文提示
        system_message = """你是一個專業的農業 AI 助理，名為 Farmio AI。
你的任務是幫助農民和農業從業者解決各種農業相關問題。

【重要】請務必使用「繁體中文」（Traditional Chinese）回答所有問題。
【重要】絕對不要使用「簡體中文」（Simplified Chinese）。
【重要】使用台灣常用的詞彙，例如：「資訊」而非「信息」、「軟體」而非「软件」。

請用繁體中文回答，保持專業、友善且實用的態度。
重點關注：農地管理、作物種植、農具使用、農業技術等主題。
請保持回答簡潔明確，控制在 200 字以內。
"""
        
        if not history or len(history) == 0:
            return f"{system_message}\n\n用戶問題：{prompt}\n\nAI 回覆（請用繁體中文）："
        
        # 構建對話歷史（只保留最近 3 輪，減少 GPU 記憶體使用）
        conversation = system_message + "\n\n"
        for msg in history[-3:]:  # 改為 3 輪對話
            if msg.get("type") == "user":
                conversation += f"用戶：{msg.get('text')}\n"
            elif msg.get("type") == "bot":
                conversation += f"AI：{msg.get('text')}\n"
        
        conversation += f"\n用戶問題：{prompt}\n\nAI 回覆（請用繁體中文）："
        return conversation

# 單例模式
ollama_service = OllamaService()