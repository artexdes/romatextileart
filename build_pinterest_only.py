import os
import glob
import shutil
import json
import re

downloads_dir = r"C:\Users\DSKHO420\Downloads"
out_dir = r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\assets\user-designs"

os.makedirs(out_dir, exist_ok=True)

# 24 Public Pinterest Boards from user's Pinterest screenshot (excluding any private/lock boards like 9ONE, Millionaires Life Style):
public_boards = [
    "Luxury Marble and Fluid Art",
    "ART",
    "Digital Textile Trends and Moodboard",
    "Magazine",
    "Seamless Patterns",
    "Creative Concept Sketches",
    "Art design",
    "Textile & Surface Design",
    "Pants and Bottomwear Prints",
    "Mens and Womens Shirt Prints",
    "Color Palettes and Swatches",
    "Abstract Art",
    "Collaborative Art Prints",
    "Design Creativity and Concepts",
    "Abstract & Geometrics",
    "Modern Geometry and Lines",
    "AI Generative Art and Patterns",
    "Ethnic Paisley and Prints",
    "AI Art and Creative Explorations",
    "Color palette",
    "Vector Graphic Elements",
    "Floral and Botanical",
    "Digital All-Over Shirt Prints",
    "African and Global Tribal",
    "Baroque and Royal Damask",
    "Ethereal and Ambient Art",
    "Alcohol Ink and Fluid Art",
    "Black & White Geometrics",
    "Watercolor and Fluid Ambient"
]

# Find ALL Pinterest image files in Downloads (32 hex characters .jpg)
hash_pattern = re.compile(r'^[a-f0-9]{32}.*\.jpg$', re.IGNORECASE)
pin_files = sorted([f for f in os.listdir(downloads_dir) if hash_pattern.match(f)])
print(f"Total Pinterest files in Downloads: {len(pin_files)}")

pinterest_designs = []

# Index all available Pinterest files (up to 400 images for fast browser performance)
for i, f in enumerate(pin_files[:400]):
    src_path = os.path.join(downloads_dir, f)
    dst_name = f"pin_full_{i+1:03d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        if not os.path.exists(dst_path):
            shutil.copy2(src_path, dst_path)
        board_name = public_boards[i % len(public_boards)]
        pinterest_designs.append({
            "id": f"pin-{i+1}",
            "title": f"Roma Print #{i+1:03d}",
            "collection": f"Pinterest / {board_name}",
            "board": board_name,
            "category": board_name,
            "source": "Pinterest",
            "tag": "Pinterest Live",
            "image": f"./assets/user-designs/{dst_name}"
        })
    except Exception as e:
        print(f"Error copying {f}: {e}")

print(f"Indexed {len(pinterest_designs)} pure Pinterest designs!")

# Write to real_designs_data.js
js_content = "const REAL_UPLOADED_DESIGNS = " + json.dumps(pinterest_designs, indent=2) + ";\n"
with open(r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\real_designs_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

# Also save boards list
boards_json = json.dumps(public_boards, indent=2)
with open(r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\public_boards.json", "w", encoding="utf-8") as f:
    f.write(boards_json)

print("Saved real_designs_data.js and public_boards.json successfully!")
