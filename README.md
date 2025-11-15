<div align="center">

# Farmio - Agricultural Land Rental Platform

<br/>

[![Python](https://img.shields.io/badge/Python-≥3.11-3776AB.svg?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Ollama](https://img.shields.io/badge/Ollama-AI-000000.svg?logo=ollama)](https://ollama.ai/)

</div>

## Project Overview

Farmio is an innovative agricultural land rental platform that enhances farmland efficiency through innovative rental methods and AI technology, promoting sustainable development of agricultural resources.

### Core Values

- **Generational Matching**: Encouraging more young people to engage in farming
- **Real-time Consultation**: Providing agricultural consulting services using popular AI models
- **Resource Optimization**: Improving farmland utilization and reducing idle resources
- **Sustainable Development**: Promoting effective circulation and sustainable use of agricultural resources

---

## Features

### Farmland Rental
- **Rent Land**: Browse available farmland, view detailed information and geographic locations
- **List Land**: Easily post farmland rental information through forms
- **Smart Search**: Filter by region, area, price, and other criteria

### AI Agricultural Assistant
- **Real-time Chat**: AI chatbot with Traditional Chinese support
- **Professional Consultation**: Expert advice on land management, crop cultivation, and farm equipment usage
- **Conversation Memory**: Maintains conversation context for coherent consulting experience

### Community Interaction
- **Discussion Forum**: Platform for farmers to exchange experiences and insights
- **Knowledge Base**: Compilation of agricultural knowledge and technical articles

### Enterprise Cooperation
- Enterprise information integration and partnership solutions

---

## Tech Stack

### Frontend Technologies

```
TypeScript      - Type Safety & Enhanced Development Experience
React 18        - UI Framework with Modern Hooks
Vite            - Lightning-fast Build Tool & Dev Server
TailwindCSS     - Utility-first CSS Framework
Shadcn/UI       - High-quality Accessible Component Library
Radix UI        - Headless UI Components Foundation
React Router    - Client-side Routing Management
Lucide React    - Beautiful & Consistent Icon Library
Leaflet         - Interactive Map Integration
```

### Backend Technologies

```
Python 3.11+    - Programming Language
FastAPI         - Modern High-performance Web Framework
Uvicorn         - ASGI Server
SQLAlchemy      - SQL ORM (Object-Relational Mapping)
Pydantic        - Data Validation & Settings Management
HTTPX           - Async HTTP Client
Python-dotenv   - Environment Variable Management
```

### AI Technologies

```
Ollama          - Local LLM Runtime Environment
Qwen2:latest    - Alibaba Qwen Large Language Model
```

### Third-party Integrations

```
Microsoft Forms - Enterprise Consultation Forms
Power Automate  - Automated Email Notifications
OpenStreetMap   - Free Map Tile Service
DiceBear API    - Avatar Generation Service
```

### Data Storage

```
LocalStorage    - Browser-based Local Data Storage (Forum)
SQLite/PostgreSQL - Relational Database (Backend)
```

### Development Tools

```
Git & GitHub    - Version Control & Code Hosting
npm/pnpm        - Node.js Package Manager
ESLint          - Code Quality & Linting
Prettier        - Code Formatting
Chrome DevTools - Browser Development Tools
React DevTools  - React Debugging Extension
```

## Quick Start

### System Requirements

- **Node.js** >= 18.0.0
- **Python** >= 3.11
- **Ollama** (for AI features)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/mato1321/Farmio.git
cd Farmio
```

#### 2. Install Frontend Dependencies

```bash
npm install
```

#### 3. Install Ollama and AI Model

```bash
ollama pull qwen2:latest
ollama serve
```

#### 4. Setup Backend Environment

```bash
cd backend
python -m venv venv
pip install -r requirements.txt

# Create environment variable file
cp .env.example .env
```

Edit `.env` file:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2:latest
API_HOST=0.0.0.0
API_PORT=8000
```

#### 5. Start Services

**Ollama Service**
```bash
ollama serve
```

**Frontend**
```bash
npm run dev
```

**Backend**
```bash
# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
---

## Project Structure

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
│   │   ├── utils/               # Utility Functions
│   │   │   └── forumStorage.ts  # Forum Data Management (LocalStorage)
│   │   │
│   │   ├── App.tsx              # Main Application Component
│   │   ├── main.tsx             # React Entry Point
│   │   └── index.css            # Global Styles
│   │
│   ├── public/                  # Static Assets
│   │   └── logo.ico             # Favicon
│   │
│   ├── package.json             # Frontend Dependencies
│   ├── tsconfig.json            # TypeScript Configuration
│   ├── tailwind.config.ts       # TailwindCSS Configuration
│   ├── vite.config.ts           # Vite Configuration
│   └── components.json          # shadcn/ui Configuration
│
├── backend/                     # Backend Application
│   ├── app/
│   │   ├── main.py              # FastAPI Main Application
│   │   ├── config.py            # Configuration Management
│   │   │
│   │   ├── api/                 # API Routes
│   │   │   └── routes/
│   │   │       └── chat.py      # AI Chat API Endpoints
│   │   │
│   │   ├── services/            # Business Logic Layer
│   │   │   └── ollama.py        # Ollama Service Integration
│   │   │
│   │   ├── schemas/             # Pydantic Data Models
│   │   │   └── chat.py          # Chat Request/Response Models
│   │   │
│   │   └── models/              # Database Models (Future)
│   │       └── user.py          # User Model (Placeholder)
│   │
│   ├── venv/                    # Python Virtual Environment
│   ├── requirements.txt         # Python Dependencies
│   ├── .env.example             # Environment Variables Template
│   └── run.py                   # Backend Startup Script
│
├── .gitignore                   # Git Ignore Rules
├── README.md                    # Project Documentation
└── package.json                 # Root Package Configuration
```

---

## Team

- **Developer**: [@mato1321](https://github.com/mato1321)

---

## Contact Us

If you have any questions or suggestions, feel free to reach out:

- GitHub Issues: [Submit an Issue](https://github.com/mato1321/Farmio/issues)
- Email: charleskao811@gmail.com

---

<div align="center">

**Made with ❤️ by Farmio Team**

</div>