# ? Farmio - 農地租用平台

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

**結合 AI 技術的智慧型農地租賃媒合平台**

[功能特色](#-功能特色) ? [技術架構](#-技術架構) ? [快速開始](#-快速開始) ? [專案結構](#-專案結構) ? [API 文檔](#-api-文檔)

</div>

---

## ? 專案簡介

Farmio 是一個創新的農地租用平台，致力於透過 AI 技術提升農地使用效率，促進農業資源的永續發展。我們為農地擁有者與需求者搭建一座橋樑，讓農業資源得以更有效地配置與利用。

### ? 核心價值

- **智慧媒合**：運用 AI 演算法精準配對農地供需
- **即時諮詢**：整合 Ollama AI 模型提供 24/7 農業諮詢服務
- **資源優化**：提升農地利用率，減少閒置資源
- **永續發展**：促進農業資源的有效循環與可持續利用

---

## ? 功能特色

### ? 農地租賃
- **我要租地**：瀏覽可租賃農地，查看詳細資訊與地理位置
- **我要出租**：輕鬆刊登農地出租資訊
- **智慧搜尋**：根據地區、面積、價格等條件篩選

### ? AI 農業助手
- **即時對話**：支援繁體中文的 AI 聊天機器人
- **專業諮詢**：農地管理、作物種植、農具使用等專業建議
- **歷史記憶**：保留對話脈絡，提供連貫的諮詢體驗
- **本地部署**：使用 Ollama + Qwen2 模型，確保數據隱私

### ? 社群互動
- **討論區**：農民交流經驗與心得
- **知識庫**：彙整農業相關知識與技術文章

### ? 企業合作
- 企業資訊整合與合作方案

---

## ? 技術架構

### 前端技術棧

```
React 18.3         - UI 框架
TypeScript 5.8     - 類型安全
Vite 5.4          - 構建工具
TailwindCSS 3.4   - 樣式框架
Shadcn/UI         - 元件庫
React Router 6.30  - 路由管理
React Query 5.83   - 數據狀態管理
Lucide React      - 圖標庫
```

### 後端技術棧

```
FastAPI           - Python Web 框架
Uvicorn           - ASGI 服務器
Pydantic          - 數據驗證
httpx             - 非同步 HTTP 客戶端
```

### AI 技術

```
Ollama            - 本地 LLM 運行環境
Qwen2:latest      - 阿里巴巴千問大語言模型
```

---

## ? 快速開始

### 系統需求

- **Node.js** >= 18.0.0
- **Python** >= 3.11
- **Ollama** (用於 AI 功能)

### 安裝步驟

#### 1. 克隆專案

```bash
git clone https://github.com/mato1321/agri-rent-finder.git
cd agri-rent-finder
```

#### 2. 安裝前端依賴

```bash
npm install
```

#### 3. 安裝 Ollama 與 AI 模型

```bash
# 安裝 Ollama (訪問 https://ollama.ai 下載安裝程式)

# 下載 Qwen2 模型
ollama pull qwen2:latest

# 啟動 Ollama 服務
ollama serve
```

#### 4. 設定後端環境

```bash
cd backend

# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安裝依賴
pip install -r requirements.txt

# 建立環境變數檔案
cp .env.example .env
```

編輯 `.env` 檔案：

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2:latest
API_HOST=0.0.0.0
API_PORT=8000
```

#### 5. 啟動服務

**終端機 1 - Ollama 服務**
```bash
ollama serve
```

**終端機 2 - 後端 API**
```bash
cd backend
python run.py
```

**終端機 3 - 前端應用**
```bash
npm run dev
```

#### 6. 訪問應用

- **前端應用**: http://localhost:5173
- **後端 API**: http://localhost:8000
- **API 文檔**: http://localhost:8000/docs

---

## ? 專案結構

```
agri-rent-finder/
├── src/                      # 前端源碼
│   ├── components/           # React 元件
│   │   ├── Hero.tsx         # 主畫面英雄區塊
│   │   ├── Header.tsx       # 頁首導航
│   │   ├── Footer.tsx       # 頁尾
│   │   ├── FloatingButtons.tsx  # AI 助手浮動按鈕
│   │   └── ui/              # Shadcn UI 元件
│   ├── pages/               # 頁面組件
│   │   ├── Index.tsx        # 首頁
│   │   ├── Farmland.tsx     # 農地列表
│   │   ├── Member.tsx       # 會員中心
│   │   └── Forum.tsx        # 討論區
│   ├── App.tsx              # 應用主入口
│   └── main.tsx             # React 入口
│
├── backend/                  # 後端源碼
│   ├── app/
│   │   ├── main.py          # FastAPI 應用主程式
│   │   ├── config.py        # 配置管理
│   │   ├── api/             # API 路由
│   │   │   └── routes/
│   │   │       └── chat.py  # AI 聊天 API
│   │   ├── services/        # 業務邏輯
│   │   │   └── ollama.py    # Ollama 服務整合
│   │   └── schemas/         # Pydantic 數據模型
│   │       └── chat.py      # 聊天相關模型
│   ├── requirements.txt     # Python 依賴
│   └── run.py              # 啟動腳本
│
├── public/                  # 靜態資源
├── package.json            # 前端依賴配置
├── tsconfig.json           # TypeScript 配置
├── tailwind.config.ts      # TailwindCSS 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 專案說明文件
```

---

## ? API 文檔

### AI 聊天端點

#### POST `/api/chat/`

與 AI 農業助手進行對話

**請求體**
```json
{
  "message": "什麼是水稻種植的最佳季節？",
  "history": [
    {
      "type": "bot",
      "text": "您好！我是農業小助手"
    },
    {
      "type": "user",
      "text": "你好"
    }
  ]
}
```

**回應**
```json
{
  "answer": "水稻種植的最佳季節通常是春季...",
  "status": "success"
}
```

#### GET `/api/chat/health`

檢查 API 服務狀態

**回應**
```json
{
  "status": "healthy",
  "service": "Farmio AI Chat API",
  "model": "qwen2:latest"
}
```

詳細 API 文檔請訪問：http://localhost:8000/docs

---

## ? UI/UX 設計特點

- **響應式設計**：完美支援桌面、平板、手機等各種裝置
- **暗色主題聊天視窗**：深色半透明設計，毛玻璃效果
- **流暢動畫**：平滑的過渡效果提升用戶體驗
- **無障礙支援**：遵循 WCAG 無障礙設計規範

---

## ? 開發指令

```bash
# 開發模式
npm run dev

# 生產構建
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint

# 後端開發模式（自動重載）
cd backend && python run.py
```

---

## ? 貢獻指南

歡迎提交 Issue 或 Pull Request！

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## ? 開發路線圖

- [x] 基礎平台架構
- [x] AI 農業助手整合
- [x] 農地列表與搜尋
- [ ] 用戶認證系統（JWT）
- [ ] 農地詳細資訊頁面
- [ ] 線上預約與合約管理
- [ ] PostgreSQL 數據庫整合
- [ ] Redis 緩存系統
- [ ] 支付系統整合
- [ ] 手機 App 開發

---

## ? 授權

本專案採用私有授權，未經許可不得複製、散布或修改。

---

## ? 團隊

- **開發者**: [@mato1321](https://github.com/mato1321)

---

## ? 聯絡我們

如有任何問題或建議，歡迎透過以下方式聯絡：

- GitHub Issues: [提交問題](https://github.com/mato1321/agri-rent-finder/issues)
- Email: your-email@example.com

---

<div align="center">

**用科技賦能農業，讓每一塊土地都發揮最大價值** ?

Made with ?? by Farmio Team

</div>