import httpx
from typing import List, Dict
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class OllamaService:
    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_MODEL
    
    async def generate_response(self, prompt: str, history: List[Dict] = None) -> str:
        """
        使用 Ollama 生成回應
        
        Args:
            prompt: 用戶問題
            history: 對話歷史
            
        Returns:
            AI 生成的回應
        """
        try:
            # 構建完整的提示詞（包含歷史對話）
            full_prompt = self._build_prompt(prompt, history)
            
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": full_prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "top_p": 0.9,
                        }
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("response", "抱歉，我無法生成回應。")
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
        構建包含歷史對話的完整提示詞
        
        Args:
            prompt: 當前用戶問題
            history: 對話歷史
            
        Returns:
            完整的提示詞
        """
        system_message = """你是一個專業的農業 AI 助理，名為 Farmio AI。
你的任務是幫助農民和農業從業者解決各種農業相關問題。
請用繁體中文回答，保持專業、友善且實用的態度。
重點關注：農地管理、作物種植、農具使用、農業技術等主題。
"""
        
        if not history or len(history) == 0:
            return f"{system_message}\n\n用戶問題：{prompt}\n\nAI 回覆："
        
        # 構建對話歷史
        conversation = system_message + "\n\n"
        for msg in history[-5:]:  # 只保留最近 5 輪對話
            if msg.get("type") == "user":
                conversation += f"用戶：{msg.get('text')}\n"
            elif msg.get("type") == "bot":
                conversation += f"AI：{msg.get('text')}\n"
        
        conversation += f"\n用戶問題：{prompt}\n\nAI 回覆："
        return conversation

# 單例模式
ollama_service = OllamaService()