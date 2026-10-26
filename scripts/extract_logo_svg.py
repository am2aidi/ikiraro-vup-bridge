# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt
from matplotlib.path import Path
from PIL import Image
import numpy as np

img = Image.open('C:/Users/zaidi/Downloads/VUP Bridge Logo Concept 1/2.png').convert('L')
arr = np.array(img)

# Crop exactly around the logo:
# Logo bounds: x: [139, 676] (width: 537), y: [338, 495] (height: 157)
y_min, y_max = 330, 502
x_min, x_max = 135, 680
crop = arr[y_min:y_max, x_min:x_max]

# Threshold (dark lines)
binary = (crop < 100).astype(float)
# Flip vertically so matplotlib y goes top-down
binary_flipped = np.flipud(binary)
h, w = binary.shape

fig, ax = plt.subplots(figsize=(w/50, h/50), dpi=50)
ax.set_aspect('equal')
ax.axis('off')

cs = ax.contour(binary_flipped, levels=[0.5], colors='black')

svg_d_parts = []
contour_paths = cs.get_paths() if hasattr(cs, 'get_paths') else [p for c in cs.collections for p in c.get_paths()]

for p in contour_paths:
    verts = p.vertices
    codes = p.codes
    if codes is None:
        codes = [Path.MOVETO] + [Path.LINETO] * (len(verts) - 2) + [Path.CLOSEPOLY]
    
    current_cmd = ""
    for (vx, vy), code in zip(verts, codes):
        sy = h - vy
        if code == Path.MOVETO:
            svg_d_parts.append(f"M {vx:.1f} {sy:.1f}")
        elif code == Path.LINETO:
            svg_d_parts.append(f"L {vx:.1f} {sy:.1f}")
        elif code == Path.CLOSEPOLY:
            svg_d_parts.append("Z")

plt.close(fig)

svg_d = " ".join(svg_d_parts)
print(f"Total SVG path length: {len(svg_d)} chars, parts: {len(svg_d_parts)}")

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <path d="{svg_d}" fill="currentColor" fill-rule="evenodd" />
</svg>'''

with open('scripts/test_logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print("Saved scripts/test_logo.svg!")

# Also let's render it to PNG to verify visually
from PIL import ImageDraw
# Let's see if we can convert the svg to an image or view it
