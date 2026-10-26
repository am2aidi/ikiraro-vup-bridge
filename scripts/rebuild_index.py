import re

# Read current files
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Clean up index.html: remove .vertix-banner-bar from top!
html = re.sub(r'<!-- Mandatory Hackathon Hard Rule Banners \(Section 2\) -->\s*<div class="vertix-banner-bar">.*?</div>\s*</div>', '', html, flags=re.DOTALL)
# Also check if vertix-banner-bar still exists
html = re.sub(r'<div class="vertix-banner-bar">.*?</div>', '', html, flags=re.DOTALL)

# Add mobile bottom nav bar before toast
mobile_nav = """
  <!-- Mobile Bottom Floating Navigation Bar (VeggieMart style) -->
  <nav class="mobile-bottom-nav" id="mobileBottomNav">
    <button class="mb-nav-btn on" onclick="window.app.goHome()" id="mbNavHome">
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Store</span>
    </button>
    <button class="mb-nav-btn" onclick="window.app.openCreditTab()" id="mbNavCredit">
      <svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
      <span>Credit</span>
    </button>
    <button class="mb-nav-btn" onclick="window.app.openOrdersTab()" id="mbNavOrders">
      <svg viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      <span>Orders</span>
    </button>
    <button class="mb-nav-btn" onclick="window.app.openPlannerTab()" id="mbNavPlanner">
      <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      <span>Planner</span>
    </button>
    <button class="mb-nav-btn" onclick="window.app.openRoleModal()" id="mbNavProfile">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Profile</span>
    </button>
  </nav>
"""

if "mobile-bottom-nav" not in html:
    html = html.replace('<div class="toast" id="toast" role="status"></div>', mobile_nav + '\n  <div class="toast" id="toast" role="status"></div>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html updated successfully!")
