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
TypeScript      - Type Safety
React           - UI Framework
Vite            - Build Tool
TailwindCSS     - CSS Framework
Shadcn/UI       - Component Library
React Router    - Routing Management
React Query     - Data State Management
Lucide React    - Icon Library
```

### Backend Technologies

```
Python          - Programming Language
FastAPI         - Web Framework
Uvicorn         - ASGI Server
Pydantic        - Data Validation
HTTPX           - Async HTTP Client
Python-dotenv   - Environment Variable Management
```

### AI Technologies

```
Ollama          - Local LLM Runtime Environment
Qwen2:latest    - Alibaba Qwen Large Language Model
```

---

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
├── src/                      # Frontend source code
│   ├── components/           # React components
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Header.tsx       # Header navigation
│   │   ├── Footer.tsx       # Footer
│   │   ├── FloatingButtons.tsx  # AI assistant floating button
│   │   └── ui/              # Shadcn UI components
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Home page
│   │   ├── Farmland.tsx     # Farmland list
│   │   ├── Member.tsx       # Member center
│   │   └── Forum.tsx        # Discussion forum
│   ├── App.tsx              # Application entry point
│   └── main.tsx             # React entry point
│
├── backend/                  # Backend source code
│   ├── app/
│   │   ├── main.py          # FastAPI main application
│   │   ├── config.py        # Configuration management
│   │   ├── api/             # API routes
│   │   │   └── routes/
│   │   │       └── chat.py  # AI chat API
│   │   ├── services/        # Business logic
│   │   │   └── ollama.py    # Ollama service integration
│   │   └── schemas/         # Pydantic data models
│   │       └── chat.py      # Chat-related models
│   ├── requirements.txt     # Python dependencies
│   └── run.py              # Startup script
│
├── public/                  # Static assets
├── package.json            # Frontend dependencies configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # TailwindCSS configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
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