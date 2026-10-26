# -*- coding: utf-8 -*-

svg_markup = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 160" class="ib-brand-svg-logo">
  <!-- Top Curved Deck Line (Tapered crescent) -->
  <path d="M 75 48 Q 270 18 465 48 Q 270 24 75 48 Z" fill="currentColor"/>
  <!-- 3 Distinct Bridge Arches -->
  <!-- Left Arch -->
  <path d="M 86 106 C 86 66, 182 66, 182 106" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>
  <!-- Middle Arch (Taller) -->
  <path d="M 210 106 C 210 54, 330 54, 330 106" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" fill="none"/>
  <!-- Right Arch -->
  <path d="M 358 106 C 358 66, 454 66, 454 106" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>
  <!-- Spaced Geometric Typography: I s o k o   B r i d g e -->
  <text x="270" y="148" text-anchor="middle" font-family="'Inter', 'Bricolage Grotesque', sans-serif" font-weight="600" font-size="28" letter-spacing="0.42em" fill="currentColor">I s o k o   B r i d g e</text>
</svg>'''

with open('scripts/rendered_logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_markup)

print("Saved scripts/rendered_logo.svg!")
