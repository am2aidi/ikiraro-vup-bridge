# -*- coding: utf-8 -*-
import sys
import re

print("Starting modular refactor...")

# =========================================================================
# 1. CLEAN UP index.html (Remove devbar and #dev)
# =========================================================================
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove .devbar
html = re.sub(
    r'<!-- Device Preview Bar.*?</div>\s*</div>',
    '',
    html,
    flags=re.DOTALL
)

# Alternative devbar removal
html = re.sub(
    r'<div class="devbar".*?</div>\s*</div>',
    '',
    html,
    flags=re.DOTALL
)

# Remove <div id="dev" data-d="laptop"> and corresponding closing div
html = re.sub(r'<div id="dev"[^>]*>', '', html)
html = html.replace('<!-- End of dev container -->', '')

# Clean up any trailing extra closing divs before mobile-bottom-nav
html = re.sub(
    r'</main>\s*</div>\s*</div>\s*</div>',
    '</main>\n    </div>\n  </div>',
    html
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("1. index.html cleaned (devbar & #dev removed)!")

# =========================================================================
# 2. CLEAN UP css/style.css (Ensure SVGs stroke correctly & responsive shell)
# =========================================================================
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

svg_fix_css = """
/* =========================================================================
   UNIVERSAL SVG STROKE SYSTEM (NO BLACK BLOBS)
   ========================================================================= */
svg {
  width: 18px;
  height: 18px;
  fill: none !important;
  stroke: currentColor !important;
  stroke-width: 2 !important;
  stroke-linecap: round !important;
  stroke-linejoin: round !important;
  flex-shrink: 0;
}
svg * {
  fill: none !important;
  stroke: currentColor !important;
  stroke-width: 2 !important;
}

/* Fluid responsive shell for ANY device (phone, tablet, laptop, desktop) */
.shell {
  width: 100% !important;
  max-width: 1260px !important;
  margin: 0 auto !important;
  box-sizing: border-box !important;
  border-radius: 32px !important;
  padding: 20px 24px 30px !important;
  transition: all 0.3s ease !important;
}
@media (max-width: 980px) {
  .shell {
    padding: 14px 16px 24px !important;
    border-radius: 20px !important;
  }
  .rail {
    display: none !important;
  }
}
@media (max-width: 640px) {
  body {
    padding: 6px 6px 85px !important;
  }
  .shell {
    padding: 10px 8px 20px !important;
    border-radius: 14px !important;
  }
  .top {
    gap: 8px !important;
  }
  .kpis {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
  }
}

/* Remove any remaining devbar or #dev styling */
.devbar { display: none !important; }
#dev { max-width: 100% !important; margin: 0 !important; }
"""

if "UNIVERSAL SVG STROKE SYSTEM" not in css:
    css += "\n" + svg_fix_css

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("2. css/style.css updated with SVG stroke & responsive shell!")
