from PIL import Image
import os

SRC = r"C:\Users\Administrator\AccioWork\2026-08-17-15-17-39-019-bfd12c5b\_logo_p1.png"
OUT_DIR = r"C:\Users\Administrator\AccioWork\2026-08-17-15-17-39-019-bfd12c5b\assets"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

# Remove white background: alpha = 255 - min(r,g,b)
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        alpha = 255 - min(r, g, b)
        px[x, y] = (r, g, b, alpha)

# Crop to content bounding box
bbox = img.getbbox()
img = img.crop(bbox)

# Version 1: original colors (transparent background)
img.save(os.path.join(OUT_DIR, "logo-horizontal.png"))
print("saved logo-horizontal.png", img.size)

# Version 2: white text version for dark footer (red stays, dark gray -> white)
img2 = img.copy()
px2 = img2.load()
w2, h2 = img2.size
for y in range(h2):
    for x in range(w2):
        r, g, b, a = px2[x, y]
        if a > 0 and r <= 150:  # not the red bird -> make white
            px2[x, y] = (255, 255, 255, a)
img2.save(os.path.join(OUT_DIR, "logo-white.png"))
print("saved logo-white.png", img2.size)
