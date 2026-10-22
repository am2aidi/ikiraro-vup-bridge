import os

new_styles = """
/* ==========================================================================
   CARDS, GRIDS & UTILITY LAYOUT
   ========================================================================== */
.grid { display: grid; gap: 20px; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 992px) {
  .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .grid-cols-4, .grid-cols-3, .grid-cols-2 { grid-template-columns: 1fr; }
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  position: relative;
}
.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
  flex-wrap: wrap;
}

.card-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.3px;
}

.card-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
  line-height: 1.4;
}

.metric-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.metric-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
  font-weight: 500;
}

/* ==========================================================================
   BANNER NOTICES
   ========================================================================== */
.banner-notice {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
  border: 1.5px solid transparent;
  box-shadow: var(--shadow-sm);
}
.banner-notice.info {
  background: var(--primary-light);
  border-color: rgba(14, 99, 94, 0.25);
  color: var(--primary-dark);
}
.banner-notice.warning {
  background: var(--accent-light);
  border-color: rgba(217, 119, 6, 0.3);
  color: #78350f;
}
.banner-notice.danger {
  background: var(--danger-light);
  border-color: rgba(185, 28, 28, 0.3);
  color: #7f1d1d;
}

/* ==========================================================================
   PILLS & STATUS BADGES
   ========================================================================== */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.pill-fair {
  background: var(--success-light);
  color: var(--success);
}
.pill-urgent, .pill-danger {
  background: var(--danger-light);
  color: var(--danger);
}
.pill-high, .pill-warning {
  background: var(--accent-light);
  color: #b45309;
}
.pill-low, .pill-info {
  background: var(--info-light);
  color: var(--info);
}
.pill-neutral {
  background: var(--bg);
  color: var(--text-muted);
  border: 1px solid var(--card-border);
}

/* ==========================================================================
   FORM CONTROLS
   ========================================================================== */
.form-group {
  margin-bottom: 14px;
}
.form-label {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
}
.form-control {
  width: 100%;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--card-border);
  background: var(--card-bg);
  color: var(--text-main);
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  transition: var(--transition);
}
.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(14, 99, 94, 0.15);
}

/* ==========================================================================
   TABLES
   ========================================================================== */
.table-wrap {
  overflow-x: auto;
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--card-border);
  background: var(--card-bg);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}
th {
  background: var(--bg);
  padding: 11px 14px;
  font-weight: 700;
  color: var(--text-muted);
  border-bottom: 1px solid var(--card-border);
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--card-border);
  color: var(--text-main);
}
tr:last-child td {
  border-bottom: none;
}

/* ==========================================================================
   NEARBY & PROXIMITY BUYING BAR & HUBS
   ========================================================================== */
.nearby-bar {
  background: var(--card-bg);
  border: 1.5px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
}
.nearby-loc-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nearby-loc-badge .pin-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.nearby-loc-badge .loc-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.nearby-loc-badge .loc-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 6px;
}
.nearby-filters-row {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
}
.nearby-filters-row::-webkit-scrollbar { display: none; }

.hub-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  background: var(--card-bg);
  border: 1.5px solid var(--card-border);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-main);
  cursor: pointer;
  white-space: nowrap;
  transition: var(--transition);
}
.hub-chip:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  color: var(--primary);
}
.hub-chip.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 4px 10px rgba(14,99,94,0.25);
}

/* ==========================================================================
   MODERN GROCERY CARDS (ShopMate & Grocery App Mockup Style)
   ========================================================================== */
.grocery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
  margin-bottom: 36px;
}

.grocery-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}
.grocery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(14,99,94,0.1);
  border-color: var(--primary);
}

.grocery-img-box {
  height: 140px;
  border-radius: var(--radius-md);
  background: #f8faf9;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-theme="dark"] .grocery-img-box {
  background: #182729;
}
.grocery-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.grocery-card:hover .grocery-img-box img {
  transform: scale(1.06);
}

.proximity-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(15, 23, 42, 0.78);
  color: #fff;
  backdrop-filter: blur(4px);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 10.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  z-index: 2;
  transition: var(--transition);
}
.favorite-btn:hover {
  transform: scale(1.15);
  background: #fee2e2;
}

.grocery-card h4 {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 2px;
  line-height: 1.3;
}

.produce-origin-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 2px;
}

.delivery-eta-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-light);
  padding: 2px 7px;
  border-radius: 6px;
  margin-top: 4px;
}

.grocery-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 8px;
  border-top: 1px solid var(--card-border);
}

.grocery-cost {
  font-size: 17px;
  font-weight: 800;
  color: var(--primary);
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.grocery-cost small {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}
.grocery-retail-strike {
  font-size: 11px;
  color: var(--text-sub);
  text-decoration: line-through;
  font-weight: 500;
}

.add-btn-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 10px rgba(14,99,94,0.25);
}
.add-btn-circle:hover {
  background: var(--primary-hover);
  transform: scale(1.1);
}

/* Impact Progress Slider */
.slider-pill-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}
.slider-val-pill {
  background: var(--accent-light);
  color: var(--accent);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 15px;
  font-weight: 800;
  min-width: 52px;
  text-align: center;
}
"""

with open("css/style.css", "r", encoding="utf-8") as f:
    orig = f.read()

# Check if already added
if "/* NEARBY & PROXIMITY BUYING BAR" not in orig:
    combined = orig + "\n" + new_styles
    with open("css/style.css", "w", encoding="utf-8") as f:
        f.write(combined)
    with open("app/css/style.css", "w", encoding="utf-8") as f:
        f.write(combined)
    print("CSS successfully patched in both css/style.css and app/css/style.css!")
else:
    print("Already patched!")
