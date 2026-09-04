import os
import glob
import shutil
import json
from PIL import Image

downloads_dir = r"C:\Users\DSKHO420\Downloads"
patterns_dir = r"C:\Users\DSKHO420\Downloads\PATTERNS"
out_dir = r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\assets\user-designs"

os.makedirs(out_dir, exist_ok=True)

real_designs = []

# 1. Grab Pinterest JPGs from downloads (Pinterest hash files are 32 hex chars .jpg)
import re
hash_pattern = re.compile(r'^[a-f0-9]{32}.*\.jpg$', re.IGNORECASE)

pin_files = [f for f in os.listdir(downloads_dir) if hash_pattern.match(f)]
print(f"Found {len(pin_files)} Pinterest design files.")

# Pick top 24 high quality ones
for i, f in enumerate(pin_files[:24]):
    src_path = os.path.join(downloads_dir, f)
    dst_name = f"pinterest_design_{i+1:02d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        shutil.copy2(src_path, dst_path)
        real_designs.append({
            "id": f"pin-real-{i+1}",
            "title": f"Roma Pinterest Print #{i+1:02d}",
            "collection": "Pinterest / @romatextileart",
            "category": "Resort & Fashion",
            "source": "Pinterest",
            "tag": "Live Uploaded",
            "image": f"./assets/user-designs/{dst_name}"
        })
    except Exception as e:
        print(f"Error copying {f}: {e}")

# 2. Grab PATTERNS from downloads\PATTERNS (convert a few TIFFs to high-res JPGs for web display)
tif_files = glob.glob(os.path.join(patterns_dir, "*.tif"))
print(f"Found {len(tif_files)} TIFF pattern files.")

for j, tf in enumerate(tif_files[:12]):
    base_name = os.path.splitext(os.path.basename(tf))[0]
    dst_name = f"shutterstock_vector_{j+1:02d}.jpg"
    dst_path = os.path.join(out_dir, dst_name)
    try:
        with Image.open(tf) as im:
            # Resize if huge to max 1200x1200 for fast web canvas loading
            im = im.convert('RGB')
            im.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            im.save(dst_path, 'JPEG', quality=88)
            real_designs.append({
                "id": f"stock-real-{j+1}",
                "title": f"Roma Stock Pattern — {base_name}",
                "collection": "Shutterstock / Vector Repeat",
                "category": "Commercial Art",
                "source": "Shutterstock",
                "tag": "Shutterstock Active",
                "image": f"./assets/user-designs/{dst_name}"
            })
            print(f"Converted {base_name} to {dst_name}")
    except Exception as e:
        print(f"Error converting {tf}: {e}")

# Save JSON
json_path = r"C:\Users\DSKHO420\.gemini\antigravity-ide\scratch\romatextileart-studio\assets\real-designs.json"
with open(json_path, 'w', encoding='utf-8') as jf:
    json.dump(real_designs, jf, indent=2)

print(f"Total {len(real_designs)} real designs prepared successfully!")
