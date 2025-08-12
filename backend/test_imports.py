#!/usr/bin/env python3
"""
Simple test script to verify all imports work correctly.
"""

try:
    import fastapi
    print("✓ FastAPI imported successfully")
except ImportError as e:
    print(f"✗ FastAPI import failed: {e}")

try:
    import cv2
    print("✓ OpenCV imported successfully")
except ImportError as e:
    print(f"✗ OpenCV import failed: {e}")

try:
    import numpy as np
    print("✓ NumPy imported successfully")
except ImportError as e:
    print(f"✗ NumPy import failed: {e}")

try:
    from PIL import Image
    print("✓ Pillow imported successfully")
except ImportError as e:
    print(f"✗ Pillow import failed: {e}")

try:
    import kociemba
    print("✓ kociemba imported successfully")
except ImportError as e:
    print(f"✗ kociemba import failed: {e}")

try:
    from utils import analyze_face_image, solve_cube_state
    print("✓ Local utils imported successfully")
except ImportError as e:
    print(f"✗ Local utils import failed: {e}")

print("\nImport test completed!")
