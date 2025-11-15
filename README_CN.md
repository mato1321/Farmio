<div align="center">

# Farmio - 農地租用平台

<br/>

[![Python](https://img.shields.io/badge/Python-≥3.11-3776AB.svg?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Ollama](https://img.shields.io/badge/Ollama-AI-000000.svg?logo=ollama)](https://ollama.ai/)

</div>

## 專案簡介

Farmio是一個創新的農地租用平台，透過創新的租地方式與AI技術提升農地使用效率，促進農業資源的永續發展。

### 核心價值

- **世代媒合**：讓年輕人能夠有更多的意願去務農
- **即時諮詢**：使用現今熱門模型提供農業諮詢服務
- **資源優化**：提升農地利用率，減少閒置資源
- **永續發展**：促進農業資源的有效循環與可持續利用

---

## 功能特色

### 農地租賃
- **我要租地**：瀏覽可租賃農地，查看詳細資訊與地理位置
- **我要出租**：透過表單輕鬆刊登農地出租資訊
- **智慧搜尋**：根據地區、面積、價格等條件篩選

### AI 農業小助手
- **即時對話**：支援繁體中文的 AI 聊天機器人
- **專業諮詢**：農地管理、作物種植、農具使用等專業建議
- **歷史記憶**：保留對話脈絡，提供連貫的諮詢體驗

### 社群互動
- **討論區**：農民交流經驗與心得
- **知識庫**：彙整農業相關知識與技術文章

### 企業合作
- 企業資訊整合與合作方案

---

## 技術架構

### 前端技術

```
TypeScript      - 型別安全與增強開發體驗
React 18        - 現代化 UI 框架
Vite            - 極速建置工具與開發伺服器
TailwindCSS     - Utility-first CSS 框架
Shadcn/UI       - 高品質無障礙元件庫
Radix UI        - Headless UI 元件基礎
React Router    - 客戶端路由管理
Lucide React    - 優美一致的圖示庫
Leaflet         - 互動式地圖整合
```

### 後端技術

```
Python 3.11+    - 程式語言
FastAPI         - 現代高效能 Web 框架
Uvicorn         - ASGI 伺服器
SQLAlchemy      - SQL ORM（物件關聯映射）
Pydantic        - 資料驗證與設定管理
HTTPX           - 非同步 HTTP 客戶端
Python-dotenv   - 環境變數管理
```

### AI 技術

```
Ollama          - 本地 LLM 運行環境
Qwen2:latest    - 阿里巴巴千問大語言模型
```

### 第三方整合服務

```
Microsoft Forms - 企業合作諮詢表單
Power Automate  - 自動化郵件通知
OpenStreetMap   - 免費地圖圖資服務
DiceBear API    - 頭像生成服務
```

### 資料儲存

```
LocalStorage    - 瀏覽器本地資料儲存（討論區）
SQLite/PostgreSQL - 關聯式資料庫（後端）
```

### 開發工具

```
Git & GitHub    - 版本控制與程式碼託管
npm/pnpm        - Node.js 套件管理器
ESLint          - 程式碼品質檢查
Prettier        - 程式碼格式化
Chrome DevTools - 瀏覽器開發工具
React DevTools  - React 除錯擴充功能
```

## 快速開始

### 系統需求

- **Node.js** >= 18.0.0
- **Python** >= 3.11
- **Ollama** (用於 AI 功能)

### 安裝步驟

#### 1. 克隆專案

```bash
git clone https://github.com/mato1321/Farmio.git
cd Farmio
```

#### 2. 安裝前端依賴

```bash
npm install
```

#### 3. 安裝 Ollama

```bash
ollama pull qwen2:latest
ollama serve
```

#### 4. 設定後端環境

```bash
cd backend
python -m venv venv
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

**Ollama 服務**
```bash
ollama serve
```

**前端**
```bash
npm run dev
```

**後端**
```bash
# 啟動虛擬環境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
---

## 專案結構

```
Farmio/
├── frontend/                    # 前端應用程式
│   ├── src/
│   │   ├── components/          # React 元件
│   │   │   ├── Header.tsx       # 導航列
│   │   │   ├── Footer.tsx       # 頁尾元件
│   │   │   ├── Hero.tsx         # 主畫面英雄區塊
│   │   │   ├── FloatingButtons.tsx  # AI 聊天浮動按鈕
│   │   │   └── ui/              # shadcn/ui 元件
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── input.tsx
│   │   │       ├── badge.tsx
│   │   │       └── avatar.tsx
│   │   │
│   │   ├── pages/               # 頁面元件
│   │   │   ├── Index.tsx        # 首頁（含地圖）
│   │   │   ├── Member.tsx       # 會員資料頁面
│   │   │   ├── Forum.tsx        # 討論區列表
│   │   │   ├── ForumPost.tsx    # 文章詳細頁面
│   │   │   ├── Enterprise.tsx   # 企業合作頁面
│   │   │   └── Knowledge.tsx    # 知識庫頁面
│   │   │
│   │   ├── utils/               # 工具函式
│   │   │   └── forumStorage.ts  # 討論區資料管理（LocalStorage）
│   │   │
│   │   ├── App.tsx              # 主應用程式元件
│   │   ├── main.tsx             # React 入口點
│   │   └── index.css            # 全域樣式
│   │
│   ├── public/                  # 靜態資源
│   │   └── logo.ico             # 網站圖示
│   │
│   ├── package.json             # 前端相依套件
│   ├── tsconfig.json            # TypeScript 設定
│   ├── tailwind.config.ts       # TailwindCSS 設定
│   ├── vite.config.ts           # Vite 設定
│   └── components.json          # shadcn/ui 設定
│
├── backend/                     # 後端應用程式
│   ├── app/
│   │   ├── main.py              # FastAPI 主應用程式
│   │   ├── config.py            # 設定管理
│   │   │
│   │   ├── api/                 # API 路由
│   │   │   └── routes/
│   │   │       └── chat.py      # AI 聊天 API 端點
│   │   │
│   │   ├── services/            # 業務邏輯層
│   │   │   └── ollama.py        # Ollama 服務整合
│   │   │
│   │   ├── schemas/             # Pydantic 資料模型
│   │   │   └── chat.py          # 聊天請求/回應模型
│   │   │
│   │   └── models/              # 資料庫模型（未來使用）
│   │       └── user.py          # 使用者模型（預留）
│   │
│   ├── venv/                    # Python 虛擬環境
│   ├── requirements.txt         # Python 相依套件
│   ├── .env.example             # 環境變數範本
│   └── run.py                   # 後端啟動腳本
│
├── .gitignore                   # Git 忽略規則
├── README.md                    # 專案說明文件
└── package.json                 # 根目錄套件設定
```

---

## 團隊

- **開發者**: [@mato1321](https://github.com/mato1321)

---

## 聯絡我們

如有任何問題或建議，歡迎透過以下方式聯絡：

- GitHub Issues: [提交問題](https://github.com/mato1321/Farmio/issues)
- Email: charleskao811@gmail.com

---

<div align="center">

**Made with ❤️ by Farmio Team**

</div>
