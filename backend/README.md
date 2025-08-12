# CubeSolver Backend

A FastAPI backend for analyzing Rubik's Cube face images and solving cube states.

## Features

- **Face Analysis**: Upload images of cube faces and get color analysis
- **Cube Solving**: Solve complete cube states using the kociemba algorithm
- **Image Processing**: Automatic cropping, resizing, and color detection
- **CORS Support**: Configured for frontend integration

## Requirements

- Python 3.11+
- OpenCV
- NumPy
- Pillow
- kociemba
- FastAPI
- Uvicorn

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the development server:
```bash
python app.py
```

Or using uvicorn directly:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST /analyze_face
Analyze a cube face image and return color information.

**Query Parameters:**
- `face`: Face identifier (F, B, L, R, U, D)

**Form Data:**
- `image`: Image file

**Response:**
```json
{
  "face": "F",
  "stickers": ["#RRGGBB", ...],
  "center": "#RRGGBB",
  "hsv_center": [h, s, v]
}
```

### POST /solve
Solve a complete cube state.

**Request Body:**
```json
{
  "faces": {
    "U": {"stickers": [...], "center": "#RRGGBB", "hsv_center": [h, s, v]},
    "R": {...},
    "F": {...},
    "D": {...},
    "L": {...},
    "B": {...}
  }
}
```

**Response:**
```json
{
  "state": "URFDLB...",
  "solutionText": "R U R' U'",
  "moves": ["R", "U", "R'", "U'"],
  "turnsCount": 4
}
```

## Development

The backend uses:
- **FastAPI**: Modern web framework for building APIs
- **OpenCV**: Computer vision library for image processing
- **kociemba**: Rubik's Cube solving algorithm
- **NumPy**: Numerical computing library

## Error Handling

- Invalid face identifiers return 400
- Missing faces return 400
- Invalid cube states return 400 with helpful messages
- Image processing errors return 500
