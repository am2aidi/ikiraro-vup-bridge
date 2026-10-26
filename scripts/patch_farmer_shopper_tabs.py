# -*- coding: utf-8 -*-
import sys
import re

print("Reading js/app.js...")
with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_farmer = code.find("  renderFarmerView() {")
end_farmer = code.find("  renderShopperView() {")
assert start_farmer != -1 and end_farmer != -1, "renderFarmerView boundaries not found!"

modular_farmer = """  renderFarmerView() {
    const sub = this.state.activeSubView || "dashboard";
    if (sub === "add_produce") {
      return this.renderFarmerAddProduceTab();
    }
    if (sub === "listings") {
      return this.renderFarmerListingsTab();
    }
    if (sub === "statements") {
      return this.renderFarmerStatementsTab();
    }
    return this.renderFarmerOrdersTab();
  }

  renderFarmerOrdersTab() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.farmer === u.name || o.farmer === "Mukamana Farm" || o.farmerEmail === u.email);
    const mySales = myOrders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

    return `
      <div class="head">
        <div>
          <h1>Orders to Deliver</h1>
          <p class="sub">Cooperative order dispatch, customer delivery confirmation, and instant Mobile Money float payouts.</p>
        </div>
        <button class="btn btn-sm btn-primary" onclick="window.app.setNavTab('add_produce')">
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Add Harvest Produce
        </button>
      </div>

      <div class="kpis" style="margin-bottom:20px;">
        <div class="card kp">
          <span class="ki"><svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
          <small>Orders Placed</small>
          <b>${myOrders.length} Orders</b>
          <em>active delivery queue</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
          <small>Completed Sales</small>
          <b style="color:var(--ok);">${mySales.toLocaleString()} RWF</b>
          <em>settled by pool float</em>
        </div>
        <div class="card kp">
          <span class="ki"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>
          <small>Payout Account</small>
          <b>${u.payoutMethod || 'MTN MoMo'}</b>
          <em>instant cashout</em>
        </div>
      </div>

      <div class="card">
        <div class="ch">
          <h3>Customer Orders Queue</h3>
          <span class="tag g">Float Guaranteed</span>
        </div>
        ${this.renderOrdersTable(this.state.orders, true)}
        <p class="small" style="margin-top:12px; color:var(--mute);">
          Credit orders are pre-guaranteed and paid directly from the revolving pool float upon delivery confirmation.
        </p>
      </div>
    `;
  }

  renderFarmerAddProduceTab() {
    return `
      <div class="head">
        <div>
          <h1>Add Harvest Produce Listing</h1>
          <p class="sub">Publish your harvest directly to local VUP families and ethical shoppers with NISR Fair Price benchmarking.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Orders
        </button>
      </div>

      <div class="card" style="padding:24px;">
        <h3 style="margin-bottom:14px;">Produce Details & Photo</h3>
        <div class="f" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:16px;">
          <div>
            <label class="form-label">Crop Name</label>
            <select id="new_food" class="form-control" onchange="window.app.onProduceSelected(this.value)">
              ${Object.keys(NISR_DATA.foodPrices).map(k => `<option value="${k}">${k} (${HARVEST_GALLERY[k] ? HARVEST_GALLERY[k].kiny : ''})</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="form-label">District Origin</label>
            <select id="new_district" class="form-control">
              ${NISR_DATA.districts.map(d => `<option value="${d.name}">${d.name} (${d.province})</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="form-label">Price (RWF / kg)</label>
            <input id="new_price" type="number" class="form-control" placeholder="RWF per kg" value="780" oninput="window.app.updatePriceGuidePreview()">
          </div>
          <div>
            <label class="form-label">Harvest Quantity (kg)</label>
            <input id="new_qty" type="number" class="form-control" placeholder="kg available" value="100">
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap; padding:12px; background:var(--card); border:1px solid var(--line); border-radius:16px; margin-bottom:18px;">
          <img id="listingPhotoPreview" src="assets/produce/dry_beans.jpg" style="width:56px; height:56px; object-fit:cover; border-radius:12px; border:1px solid var(--line);" alt="Preview">
          <input type="file" id="cameraUploadInput" accept="image/*" capture="environment" style="display:none;" onchange="window.app.handleCustomPhotoUpload(this)">
          <button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('cameraUploadInput').click()">
            <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Capture / Upload Photo
          </button>
          <input type="hidden" id="new_photo_url" value="assets/produce/dry_beans.jpg">
          <span id="priceGuidePreview" style="font-size:12.5px; color:var(--mute);"></span>
        </div>

        <button class="btn btn-primary" onclick="window.app.addListing(event)" style="width:100%; justify-content:center;">
          Publish Produce Listing to Isoko Market
        </button>
      </div>
    `;
  }

  renderFarmerListingsTab() {
    return `
      <div class="head">
        <div>
          <h1>My Active Harvest Listings</h1>
          <p class="sub">Currently published harvest items visible to buyers across Rwanda.</p>
        </div>
        <button class="btn btn-sm btn-primary" onclick="window.app.setNavTab('add_produce')">
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Add New Listing
        </button>
      </div>

      ${this.renderGroceryCatalog('cash')}
    `;
  }

  renderFarmerStatementsTab() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.farmer === u.name || o.farmer === "Mukamana Farm" || o.farmerEmail === u.email);
    const mySales = myOrders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

    return `
      <div class="head">
        <div>
          <h1>Sales & Settlement Statements</h1>
          <p class="sub">Track completed dispatches, Mobile Money float payouts, and tax receipts.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Farmer')">
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Statement (PDF/CSV)
        </button>
      </div>

      <div class="card" style="padding:22px; margin-bottom:20px;">
        <h3>Payout Summary</h3>
        <div style="font-size:24px; font-weight:800; color:var(--ok); margin:8px 0;">
          ${mySales.toLocaleString()} RWF
        </div>
        <p style="color:var(--mute); font-size:13px;">
          All delivered orders have been settled into Umurenge SACCO float / MTN MoMo (078XXXX456).
        </p>
      </div>

      <div class="card">
        <h3>Delivered Order Archive</h3>
        ${this.renderOrdersTable(myOrders)}
      </div>
    `;
  }

"""

code = code[:start_farmer] + modular_farmer + code[end_farmer:]
print("Replaced renderFarmerView with clean modular tabs!")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved js/app.js successfully!")
