# -*- coding: utf-8 -*-
import sys
import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace emojis in rail buttons
html = re.sub(
    r'<button id="railSun"[^>]*>.*?</button>',
    '<button id="railSun" onclick="window.app.setTheme(\'light\')" aria-label="Light mode" title="Light mode"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>',
    html,
    flags=re.DOTALL
)

html = re.sub(
    r'<button id="railMoon"[^>]*>.*?</button>',
    '<button id="railMoon" onclick="window.app.setTheme(\'dark\')" aria-label="Dark mode" title="Dark mode"><svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg></button>',
    html,
    flags=re.DOTALL
)

html = re.sub(
    r'<button id="railRw"[^>]*>.*?</button>',
    '<button id="railRw" onclick="document.getElementById(\'appRail\').classList.toggle(\'wide\')" aria-label="Expand sidebar" title="Expand sidebar"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>',
    html,
    flags=re.DOTALL
)

html = re.sub(
    r'<button onclick="window\.app\.openGeminiModal\(\)" aria-label="Gemini AI"[^>]*>.*?</button>',
    '<button onclick="window.app.openGeminiModal()" aria-label="Gemini AI" title="Gemini AI"><svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></button>',
    html,
    flags=re.DOTALL
)

html = re.sub(
    r'<button onclick="window\.app\.logout\(\)" aria-label="Log out"[^>]*>.*?</button>',
    '<button onclick="window.app.logout()" aria-label="Log out" title="Log out"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button>',
    html,
    flags=re.DOTALL
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html rail with SVG icons!")

# 2. Update css/style.css to hide .devbar on mobile
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

hide_devbar_css = """
@media (max-width: 768px) {
  .devbar {
    display: none !important;
  }
}
"""

if ".devbar {" not in css or "@media (max-width: 768px) {\n  .devbar" not in css:
    css += hide_devbar_css
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated css/style.css to hide devbar on mobile screens!")
