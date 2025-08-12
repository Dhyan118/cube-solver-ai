from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, List, Tuple, Optional
import json
from utils import analyze_face_image, solve_cube_state

app = FastAPI(title="CubeSolver API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "CubeSolver API is running"}

@app.post("/analyze_face")
async def analyze_face(
    face: str = Form(...),
    image: UploadFile = File(...)
):
    """
    Analyze a face image and return color information for the 3x3 grid.
    
    Args:
        face: Face identifier (F, B, L, R, U, D)
        image: Image file to analyze
    
    Returns:
        JSON with face analysis results
    """
    if face not in ['F', 'B', 'L', 'R', 'U', 'D']:
        raise HTTPException(status_code=400, detail="Invalid face identifier")
    
    try:
        # Read image content
        image_content = await image.read()
        
        # Analyze the face
        result = analyze_face_image(image_content, face)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing face: {str(e)}")

@app.post("/solve")
async def solve_cube(request_data: dict):
    """
    Solve a Rubik's cube given the face information.
    
    Args:
        request_data: Dictionary containing faces data
    
    Returns:
        JSON with solution information
    """
    try:
        faces = request_data.get("faces")
        if not faces:
            raise HTTPException(status_code=400, detail="Faces data is required")
        
        # Validate that all 6 faces are present
        required_faces = ['U', 'R', 'F', 'D', 'L', 'B']
        missing_faces = [face for face in required_faces if face not in faces]
        if missing_faces:
            raise HTTPException(
                status_code=400, 
                detail=f"Missing faces: {', '.join(missing_faces)}"
            )
        
        # Solve the cube
        solution = solve_cube_state(faces)
        
        return JSONResponse(content=solution)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error solving cube: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
