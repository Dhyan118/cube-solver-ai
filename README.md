# 🧩 CubeSolver AI - Intelligent Rubik's Cube Solution Generator

A full-stack AI-powered Rubik's Cube solver that uses computer vision to analyze cube faces and provides step-by-step solving instructions.

![CubeSolver AI](https://img.shields.io/badge/CubeSolver-AI%20Powered-blue?style=for-the-badge&logo=robot)
![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18.3+-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.3+-purple?style=for-the-badge&logo=vite)

## ✨ Features

- **🎯 AI-Powered Analysis**: Computer vision algorithms detect colors from uploaded images
- **📱 Modern UI**: Beautiful glassmorphism interface with responsive design
- **🚀 Fast Processing**: Optimized image processing with OpenCV and NumPy
- **🧩 Smart Solving**: Advanced Rubik's Cube solving algorithms (kociemba)
- **📊 Real-time Progress**: Visual tracking of face capture completion
- **🎨 Beautiful Background**: Custom Rubik's Cube themed background
- **📱 Mobile Friendly**: Responsive design that works on all devices

## 🏗️ Architecture

```
CUBE-MASTER AI/
├── backend/                 # FastAPI Python backend
│   ├── app.py              # Main FastAPI application
│   ├── utils.py            # Image processing & cube solving logic
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── frontend-lite/          # Vite + React frontend
│   ├── src/               # React components & logic
│   ├── public/            # Static assets (background image)
│   ├── package.json       # Node.js dependencies
│   └── vite.config.ts     # Vite configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18.17+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cube-solver-ai.git
cd cube-solver-ai
```

### 2. Start the Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### 3. Start the Frontend
```bash
cd frontend-lite
npm install
npm run dev
```

### 4. Open Your Browser
Navigate to `http://localhost:3001`

## 🎯 How It Works

1. **📸 Capture Faces**: Upload photos of all 6 cube faces
2. **🤖 AI Analysis**: Computer vision detects colors and creates 3×3 grids
3. **🧩 State Mapping**: Maps detected colors to standard cube notation
4. **🎯 Solve Generation**: Advanced algorithms generate optimal solutions
5. **📋 Step-by-Step**: Receive clear, numbered solving instructions

## 🛠️ Tech Stack

### Backend
- **Python 3.11**: Core language
- **FastAPI**: Modern, fast web framework
- **OpenCV**: Computer vision & image processing
- **NumPy**: Numerical computations
- **Pillow**: Image handling
- **kociemba**: Rubik's Cube solving algorithm
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool & dev server
- **CSS-in-JS**: Inline styling for components
- **Glassmorphism**: Modern UI design patterns

## 📱 API Endpoints

### `POST /analyze_face?face=<F|B|L|R|U|D>`
Analyzes uploaded face images and returns color data.

**Request**: Form data with `image` file
**Response**: JSON with stickers array, center color, and HSV values

### `POST /solve`
Generates solving instructions for complete cube state.

**Request**: JSON with faces data
**Response**: JSON with solution moves, state, and turn count

## 🎨 UI Components

- **FaceUploader**: Drag & drop image upload with preview
- **ColorGrid**: 3×3 color grid display with hover effects
- **CaptureProgress**: Visual progress tracking with completion status
- **SolvePanel**: Solution display with move list and copy functionality

## 🔧 Development

### Backend Development
```bash
cd backend
source .venv/bin/activate
uvicorn app:app --reload --port 8000
```

### Frontend Development
```bash
cd frontend-lite
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

## 📦 Installation

### Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Frontend Dependencies
```bash
cd frontend-lite
npm install
```

## 🌐 Environment Variables

### Backend
Create `.env` file in backend directory:
```env
# Optional: Custom port
PORT=8000
```

### Frontend
Create `.env` file in frontend-lite directory:
```env
VITE_API_BASE=http://localhost:8000
```

## 🚀 Deployment

### Backend (Production)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

### Frontend (Production)
```bash
cd frontend-lite
npm run build
# Serve dist/ folder with your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **kociemba**: Rubik's Cube solving algorithm
- **OpenCV**: Computer vision library
- **FastAPI**: Modern Python web framework
- **React**: UI framework
- **Vite**: Build tool

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Made with ❤️ by Dhyan**

*Solving Rubik's Cubes with AI, one face at a time! 🎲✨*
