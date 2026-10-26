with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

veggiemart_css = """
/* =========================================================================
   VEGGIEMART & UXUI_FARAN MODERN GROCERY EXPERIENCE
   Real photography, clean cards, category pills, search bar, order tracking
   ========================================================================= */

.vm-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 10px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  margin-bottom: 16px;
}
.vm-search-bar input {
  border: 0;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--ink);
  width: 100%;
  padding: 0;
  min-height: auto;
}
.vm-search-bar svg {
  width: 18px;
  height: 18px;
  stroke: var(--mute);
  flex: none;
}

.vm-categories-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: 16px;
  scrollbar-width: none;
}
.vm-categories-row::-webkit-scrollbar {
  display: none;
}
.vm-cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--card);
  border: 1px solid var(--line);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}
.vm-cat-pill:hover {
  background: var(--soft);
}
.vm-cat-pill.on {
  background: var(--on);
  color: var(--onink);
  border-color: var(--on);
}

.vm-grocery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 16px;
  margin-top: 14px;
}
@media (max-width: 580px) {
  .vm-grocery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.vm-product-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  position: relative;
}
.vm-product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 26px rgba(0,0,0,0.07);
}

.vm-product-img-box {
  height: 125px;
  width: 100%;
  border-radius: 14px;
  background: var(--soft);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vm-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.vm-product-card:hover .vm-product-img {
  transform: scale(1.05);
}

.vm-badge-distance {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(15, 23, 42, 0.75);
  color: #fff;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
}
.vm-badge-guide {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: #fff;
  color: #0b7a36;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.vm-badge-guide.wa {
  color: var(--wa);
}
.vm-badge-guide.ba {
  color: var(--ba);
}

.vm-product-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.vm-product-origin {
  font-size: 11px;
  color: var(--mute);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vm-product-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  margin: 3px 0 2px;
  line-height: 1.25;
}
.vm-product-kiny {
  font-size: 11px;
  color: var(--mute);
  margin-bottom: 6px;
}
.vm-product-stock {
  font-size: 11px;
  color: var(--ok);
  font-weight: 600;
  margin-bottom: 10px;
}

.vm-product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--line);
}
.vm-price-wrap b {
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
}
.vm-price-wrap small {
  font-size: 11px;
  color: var(--mute);
  font-weight: 500;
}

.vm-add-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--on);
  color: var(--onink);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 3px 10px rgba(22, 163, 74, 0.3);
  border: 0;
}
.vm-add-btn:hover {
  transform: scale(1.1);
  background: var(--gd);
}
.vm-add-btn svg {
  width: 18px;
  height: 18px;
  stroke: #fff;
  stroke-width: 2.5;
}

.vm-credit-order-btn {
  margin-top: 8px;
  width: 100%;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 700;
  background: rgba(22, 163, 74, 0.12);
  color: #0b7a36;
  border: 1px solid rgba(22, 163, 74, 0.25);
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
}
.vm-credit-order-btn:hover {
  background: var(--on);
  color: var(--onink);
}

/* Mobile Bottom Navigation Bar */
.mobile-bottom-nav {
  display: none;
  position: fixed;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  max-width: 480px;
  background: rgba(255, 255, 255, 0.92);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--line);
  border-radius: 999px;
  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.2);
  z-index: 999;
  padding: 6px 12px;
  justify-content: space-around;
  align-items: center;
}
:root[data-theme="dark"] .mobile-bottom-nav {
  background: rgba(21, 21, 24, 0.92);
}
@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex;
  }
  body {
    padding-bottom: 90px;
  }
}
.mb-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: none;
  border: 0;
  color: var(--mute);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 999px;
  transition: all 0.2s ease;
}
.mb-nav-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}
.mb-nav-btn.on {
  color: var(--on);
}

/* Order Progress Timeline (VeggieMart Order Tracking) */
.order-tracking-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 22px;
  margin-bottom: 20px;
}
.ot-status-box {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}
.ot-circle-check {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--ok);
  color: #fff;
  display: grid;
  place-items: center;
  flex: none;
}
.ot-circle-check svg {
  width: 24px;
  height: 24px;
  stroke: #fff;
  stroke-width: 3;
}
.ot-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-left: 28px;
  margin-top: 12px;
}
.ot-timeline:before {
  content: "";
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--line);
}
.ot-step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ot-step-dot {
  position: absolute;
  left: -28px;
  top: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--card);
  border: 2px solid var(--line);
  display: grid;
  place-items: center;
  font-size: 11px;
}
.ot-step-dot.done {
  background: var(--ok);
  border-color: var(--ok);
  color: #fff;
}
.ot-step-dot.active {
  background: var(--soft);
  border-color: var(--ok);
  color: var(--ok);
}

/* Ensure clean rail hiding on mobile */
@media (max-width: 980px) {
  .rail {
    display: none !important;
  }
  .shell {
    padding: 14px 16px !important;
    border-radius: 28px !important;
  }
}
"""

if ".vm-product-card" not in css:
    css += "\n" + veggiemart_css

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("css/style.css updated with VeggieMart styling successfully!")
