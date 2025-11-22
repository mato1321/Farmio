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
├── frontend/                    # Frontend Application
│   ├── src/
│   │   ├── components/          # React Components
│   │   │   ├── Header.tsx       # Navigation Header
│   │   │   ├── Footer.tsx       # Footer Component
│   │   │   ├── Hero.tsx         # Hero Section
│   │   │   ├── FloatingButtons.tsx  # AI Chat Floating Button
│   │   │   └── ui/              # shadcn/ui Components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── input.tsx
│   │   │       ├── badge.tsx
│   │   │       └── avatar.tsx
│   │   │
│   │   ├── pages/               # Page Components
│   │   │   ├── Index.tsx        # Home Page (with Map)
│   │   │   ├── Member.tsx       # Member Profile Page
│   │   │   ├── Forum.tsx        # Discussion Forum List
│   │   │   ├── ForumPost.tsx    # Forum Post Detail Page
│   │   │   ├── Enterprise.tsx   # Enterprise Cooperation Page
│   │   │   └── Knowledge.tsx    # Knowledge Base Page
│   │   │
│   │   ├── services/            # API Service Layer
│   │   │   └── api.ts           # API Client & HTTP Requests
│   │   │
│   │   ├── hooks/               # Custom React Hooks
│   │   │   └── use-mobile.tsx   # Mobile Detection Hook
│   │   │
│   │   ├── utils/               # Utility Functions
│   │   │   └── forumStorage.ts  # Forum Data Management (LocalStorage)
│   │   │
│   │   ├── lib/                 # Library Utilities
│   │   │   └── utils.ts         # Shared Utility Functions
│   │   │
│   │   ├── App.tsx              # Main Application Component
│   │   ├── main.tsx             # React Entry Point
│   │   ├── index.css            # Global Styles
│   │   └── vite-env.d.ts        # Vite Type Definitions
│   │
│   ├── public/                  # Static Assets
│   │   └── logo.ico             # Favicon
│   │
│   ├── package.json             # Frontend Dependencies
│   ├── package-lock.json        # npm Lock File
│   ├── bun.lockb                # Bun Lock File
│   ├── tsconfig.json            # TypeScript Configuration
│   ├── tsconfig.app.json        # App TypeScript Config
│   ├── tsconfig.node.json       # Node TypeScript Config
│   ├── tailwind.config.ts       # TailwindCSS Configuration
│   ├── postcss.config.js        # PostCSS Configuration
│   ├── vite.config.ts           # Vite Configuration
│   ├── eslint.config.js         # ESLint Configuration
│   ├── components.json          # shadcn/ui Configuration
│   ├── index.html               # HTML Entry Point
│   └── .gitignore               # Git Ignore Rules
│
├── backend/                     # Backend Application
│   ├── app/
│   │   ├── __init__.py          # Package Initializer
│   │   ├── main.py              # FastAPI Main Application
│   │   ├── config.py            # Configuration Management
│   │   ├── database.py          # Database Connection & Session
│   │   │
│   │   ├── api/                 # API Routes
│   │   │   ├── __init__.py
│   │   │   └── routes/
│   │   │       ├── __init__.py
│   │   │       ├── chat.py      # AI Chat API Endpoints
│   │   │       └── lands.py     # Land Management Endpoints
│   │   │
│   │   ├── services/            # Business Logic Layer
│   │   │   ├── __init__.py
│   │   │   └── ollama.py        # Ollama Service Integration
│   │   │
│   │   ├── schemas/             # Pydantic Data Models
│   │   │   ├── __init__.py
│   │   │   ├── chat.py          # Chat Request/Response Models
│   │   │   └── land.py          # Land Data Models
│   │   │
│   │   └── models/              # SQLAlchemy Database Models
│   │       ├── __init__.py
│   │       ├── user.py          # User Model
│   │       └── land.py          # Land Model
│   │
│   ├── migrations/              # Database Migration Scripts
│   ├── uploads/                 # User Uploaded Files
│   ├── venv/                    # Python Virtual Environment
│   ├── requirements.txt         # Python Dependencies
│   ├── .env.example             # Environment Variables Template
│   ├── .gitignore               # Git Ignore Rules
│   ├── init_normalized_db.py    # Database Initialization Script
│   └── migrate_with_backup.py   # Database Migration Tool
│
├── .gitignore                   # Git Ignore Rules
├── README.md                    # Project Documentation (English)
├── README_CN.md                 # Project Documentation (Chinese)
└── package.json                 # Root Package Configuration
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
