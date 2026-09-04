import os
import glob
import shutil
import json
import re
from PIL import Image

downloads_dir = r"C:\Users\DSKHO420\Downloads"
patterns_dir = r"C:\Users\DSKHO420\Downloads\PATTERNS"
out_dir = r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\assets\user-designs"

os.makedirs(out_dir, exist_ok=True)

real_designs = []

# Real Pinterest boards from user's screenshot:
boards = [
    {"name": "Luxury Marble and Fluid Art", "category": "Luxury Marble"},
    {"name": "Seamless Patterns", "category": "Seamless Repeat"},
    {"name": "Modern Geometry and Lines", "category": "Modern Geometry"},
    {"name": "Ethnic Paisley and Global Tribal", "category": "Ethnic & Tribal"},
    {"name": "Floral and Botanical", "category": "Floral & Botanical"},
    {"name": "Digital All-Over Shirt Prints", "category": "Apparel & Shirt"},
    {"name": "Baroque and Royal Damask", "category": "Baroque & Royal"},
    {"name": "Alcohol Ink and Fluid Art", "category": "Fluid Art"},
    {"name": "Watercolor and Ambient", "category": "Watercolor"},
    {"name": "Commercial Vectors", "category": "Commercial Art"},
    {"name": "Abstract & Modern Art", "category": "Abstract Art"}
]

# 1. Grab Pinterest JPGs
hash_pattern = re.compile(r'^[a-f0-9]{32}.*\.jpg$', re.IGNORECASE)
pin_files = sorted([f for f in os.listdir(downloads_dir) if hash_pattern.match(f)])
print(f"Total Pinterest files available: {len(pin_files)}")

# Prepare 120 Pinterest designs
for i, f in enumerate(pin_files[:120]):
    src_path = os.path.join(downloads_dir, f)
    dst_name = f"pin_full_{i+1:03d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        if not os.path.exists(dst_path):
            shutil.copy2(src_path, dst_path)
        board = boards[i % len(boards)]
        real_designs.append({
            "id": f"pin-{i+1}",
            "title": f"Roma Pinterest Design #{i+1:03d}",
            "collection": f"Pinterest / {board['name']}",
            "board": board['name'],
            "category": board['category'],
            "source": "Pinterest",
            "tag": "Pinterest Live",
            "image": f"./assets/user-designs/{dst_name}"
        })
    except Exception as e:
        print(f"Error copying {f}: {e}")

# 2. Grab Shutterstock Patterns
tif_files = sorted(glob.glob(os.path.join(patterns_dir, "*.tif")))
print(f"Total TIFF files available: {len(tif_files)}")

for j, tf in enumerate(tif_files[:50]):
    base_name = os.path.splitext(os.path.basename(tf))[0]
    dst_name = f"shutterstock_vector_{j+1:03d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        if not os.path.exists(dst_path) or os.path.getsize(dst_path) == 0:
            with Image.open(tf) as im:
                im = im.convert('RGB')
                im.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                im.save(dst_path, 'JPEG', quality=85)
        real_designs.append({
            "id": f"stock-{j+1}",
            "title": f"Roma Vector Print — {base_name}",
            "collection": "Shutterstock / Vector Repeat",
            "board": "Commercial Vectors",
            "category": "Commercial Print",
            "source": "Shutterstock",
            "tag": "Shutterstock Active",
            "image": f"./assets/user-designs/{dst_name}"
        })
    except Exception as e:
        print(f"Error processing {tf}: {e}")

print(f"Indexed total {len(real_designs)} designs into full library!")

# Save to real_designs_data.js
js_content = "const REAL_UPLOADED_DESIGNS = " + json.dumps(real_designs, indent=2) + ";\n"
with open(r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\real_designs_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Updated real_designs_data.js successfully!")
