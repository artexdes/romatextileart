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

# 1. Grab Pinterest JPGs from downloads (Pinterest hash files are 32 hex chars .jpg)
hash_pattern = re.compile(r'^[a-f0-9]{32}.*\.jpg$', re.IGNORECASE)
pin_files = sorted([f for f in os.listdir(downloads_dir) if hash_pattern.match(f)])
print(f"Found {len(pin_files)} Pinterest design files.")

# Pick 36 Pinterest designs
for i, f in enumerate(pin_files[:36]):
    src_path = os.path.join(downloads_dir, f)
    dst_name = f"pinterest_design_{i+1:02d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        shutil.copy2(src_path, dst_path)
        real_designs.append({
            "id": f"pin-real-{i+1}",
            "title": f"Roma Pinterest Pattern #{i+1:02d}",
            "collection": "Pinterest / @romatextileart",
            "category": "Resort Wear",
            "source": "Pinterest",
            "tag": "Pinterest Live",
            "image": f"./assets/user-designs/{dst_name}"
        })
    except Exception as e:
        print(f"Error copying {f}: {e}")

# 2. Grab PATTERNS from downloads\PATTERNS (convert TIFFs to high-res JPGs for web display)
tif_files = sorted(glob.glob(os.path.join(patterns_dir, "*.tif")))
print(f"Found {len(tif_files)} TIFF pattern files.")

for j, tf in enumerate(tif_files[:24]):
    base_name = os.path.splitext(os.path.basename(tf))[0]
    dst_name = f"shutterstock_vector_{j+1:02d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        if not os.path.exists(dst_path) or os.path.getsize(dst_path) == 0:
            with Image.open(tf) as im:
                im = im.convert('RGB')
                im.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                im.save(dst_path, 'JPEG', quality=88)
        real_designs.append({
            "id": f"stock-real-{j+1}",
            "title": f"Roma Stock Vector — {base_name}",
            "collection": "Shutterstock / Vector Repeat",
            "category": "Commercial Print",
            "source": "Shutterstock",
            "tag": "Shutterstock Active",
            "image": f"./assets/user-designs/{dst_name}"
        })
    except Exception as e:
        print(f"Error converting {tf}: {e}")

print(f"Total {len(real_designs)} pure real designs prepared!")

# Write JS snippet
js_content = "const REAL_UPLOADED_DESIGNS = " + json.dumps(real_designs, indent=2) + ";\n"
with open(r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\real_designs_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Saved real_designs_data.js successfully!")
