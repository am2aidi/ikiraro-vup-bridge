import re

# ==============================================================================
# 1. PATCH index.html and app/index.html
# ==============================================================================
for html_path in ["index.html", "app/index.html"]:
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    delivery_snippet = """
      <!-- Delivery Method Selection (Nearby Way) -->
      <div style="margin-bottom: 14px;">
        <label class="form-label" style="font-size: 11.5px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px;">
          📍 Nearby Delivery / Collection Method
        </label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div id="delOptionMoto" class="pay-method-item selected" style="padding: 10px; margin-bottom: 0;" onclick="window.app.setCheckoutDelivery('moto')">
            <span style="font-size: 20px;">🚴</span>
            <div style="flex:1;">
              <b style="font-size: 13px;">Moto Drop</b>
              <div style="font-size: 10px; color: var(--text-muted);">+300 RWF · 15-25m</div>
            </div>
          </div>
          <div id="delOptionPickup" class="pay-method-item" style="padding: 10px; margin-bottom: 0;" onclick="window.app.setCheckoutDelivery('pickup')">
            <span style="font-size: 20px;">🚶</span>
            <div style="flex:1;">
              <b style="font-size: 13px;">SACCO Pickup</b>
              <div style="font-size: 10px; color: var(--success); font-weight: 700;">FREE · Ready now</div>
            </div>
          </div>
        </div>
      </div>
"""
    if "<!-- Delivery Method Selection (Nearby Way) -->" not in html:
        html = html.replace('<!-- Payment Summary -->', delivery_snippet + '\n      <!-- Payment Summary -->')
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Patched {html_path} with delivery method selector!")
    else:
        print(f"{html_path} already had delivery method selector.")

print("index.html patch completed.")
