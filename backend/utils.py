import cv2
import numpy as np
from PIL import Image
import io
import kociemba
from typing import Dict, List, Tuple, Optional
import colorsys

def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB tuple to hex color string."""
    return f"#{r:02x}{g:02x}{b:02x}"

def bgr_to_hsv(b: int, g: int, r: int) -> Tuple[float, float, float]:
    """Convert BGR to HSV using OpenCV."""
    # OpenCV uses BGR, convert to RGB for colorsys
    h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
    return (h * 360, s * 100, v * 100)  # Convert to degrees and percentages

def analyze_face_image(image_content: bytes, face: str) -> Dict:
    """
    Analyze a face image and return color information for the 3x3 grid.
    
    Args:
        image_content: Raw image bytes
        image: Face identifier (F, B, L, R, U, D)
    
    Returns:
        Dictionary with face analysis results
    """
    # Convert bytes to numpy array
    nparr = np.frombuffer(image_content, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("Could not decode image")
    
    # Get image dimensions
    height, width = img.shape[:2]
    
    # Crop to center square
    size = min(height, width)
    start_y = (height - size) // 2
    start_x = (width - size) // 2
    cropped = img[start_y:start_y + size, start_x:start_x + size]
    
    # Resize to 600x600
    resized = cv2.resize(cropped, (600, 600))
    
    # Divide into 3x3 grid
    cell_size = 600 // 3
    stickers = []
    
    for row in range(3):
        for col in range(3):
            # Get the center patch of each cell
            y_start = row * cell_size + cell_size // 4
            y_end = row * cell_size + 3 * cell_size // 4
            x_start = col * cell_size + cell_size // 4
            x_end = col * cell_size + 3 * cell_size // 4
            
            cell = resized[y_start:y_end, x_start:x_end]
            
            # Calculate average BGR values
            avg_bgr = np.mean(cell, axis=(0, 1))
            b, g, r = int(avg_bgr[0]), int(avg_bgr[1]), int(avg_bgr[2])
            
            # Convert to hex
            hex_color = rgb_to_hex(r, g, b)
            stickers.append(hex_color)
    
    # Get center color (index 4 in row-major order)
    center_color = stickers[4]
    
    # Convert center to HSV
    center_bgr = np.mean(resized[cell_size:2*cell_size, cell_size:2*cell_size], axis=(0, 1))
    center_b, center_g, center_r = int(center_bgr[0]), int(center_bgr[1]), int(center_bgr[2])
    hsv_center = bgr_to_hsv(center_b, center_g, center_r)
    
    return {
        "face": face,
        "stickers": stickers,
        "center": center_color,
        "hsv_center": [hsv_center[0], hsv_center[1], hsv_center[2]]
    }

def solve_cube_state(faces: Dict) -> Dict:
    """
    Solve a Rubik's cube given the face information.
    
    Args:
        faces: Dictionary with face data for all 6 faces
    
    Returns:
        Dictionary with solution information
    """
    # Build calibration mapping
    calibration = {}
    for face_letter, face_data in faces.items():
        if face_data and 'hsv_center' in face_data:
            calibration[face_letter] = face_data['hsv_center']
    
    # Build the 54-character state string
    # Order: U, R, F, D, L, B (each face in row-major order 0..8)
    state_string = ""
    
    face_order = ['U', 'R', 'F', 'D', 'L', 'B']
    
    for face_letter in face_order:
        if face_letter not in faces or not faces[face_letter]:
            raise ValueError(f"Missing face data for {face_letter}")
        
        face_data = faces[face_letter]
        stickers = face_data['stickers']
        
        # Map each sticker to the nearest center color
        mapped_stickers = []
        for sticker in stickers:
            sticker_rgb = hex_to_rgb(sticker)
            sticker_hsv = colorsys.rgb_to_hsv(sticker_rgb[0]/255.0, sticker_rgb[1]/255.0, sticker_rgb[2]/255.0)
            sticker_hsv = (sticker_hsv[0] * 360, sticker_hsv[1] * 100, sticker_hsv[2] * 100)
            
            # Find nearest center color
            best_match = None
            min_distance = float('inf')
            
            for center_face, center_hsv in calibration.items():
                # Calculate HSV distance (circular hue)
                hue_diff = min(abs(sticker_hsv[0] - center_hsv[0]), 360 - abs(sticker_hsv[0] - center_hsv[0]))
                sat_diff = abs(sticker_hsv[1] - center_hsv[1])
                val_diff = abs(sticker_hsv[2] - center_hsv[2])
                
                distance = hue_diff + sat_diff + val_diff
                
                if distance < min_distance:
                    min_distance = distance
                    best_match = center_face
            
            mapped_stickers.append(best_match)
        
        # Add to state string
        state_string += ''.join(mapped_stickers)
    
    # Validate state string length
    if len(state_string) != 54:
        raise ValueError(f"Invalid state string length: {len(state_string)}")
    
    try:
        # Solve using kociemba
        solution = kociemba.solve(state_string)
        
        # Parse solution into moves
        moves = solution.split()
        
        return {
            "state": state_string,
            "solutionText": solution,
            "moves": moves,
            "turnsCount": len(moves)
        }
    
    except Exception as e:
        raise ValueError(f"Invalid cube state: {str(e)}")
