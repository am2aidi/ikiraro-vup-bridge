import re

with open("js/app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update checkout and nearby methods
checkout_old_pattern = r"  openPaymentSheet\(total, foodName, qty\) \{.*?  showReceipt\(order, payMethod\) \{"
checkout_new = """  setCheckoutDelivery(option) {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.deliveryOption = option;
    const btnMoto = document.getElementById("delOptionMoto");
    const btnPickup = document.getElementById("delOptionPickup");
    if (btnMoto && btnPickup) {
      if (option === 'moto') {
        btnMoto.classList.add('selected');
        btnPickup.classList.remove('selected');
      } else {
        btnPickup.classList.add('selected');
        btnMoto.classList.remove('selected');
      }
    }
    if (this.state.pendingCheckoutOrder) {
      const p = this.state.pendingCheckoutOrder;
      this.updatePaymentSummary(p.total, p.listing.food, p.qty);
    }
  }

  updatePaymentSummary(total, foodName, qty) {
    const summaryEl = document.getElementById("paySheetSummary");
    const amountBtn = document.getElementById("paySubmitBtn");
    if (!summaryEl || !amountBtn) return;

    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const donationPct = this.state.currentUser.donationPct || 2;
    const gift = Math.round(total * (donationPct / 100));
    const grandTotal = total + gift + deliveryFee;

    summaryEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${foodName} (${qty} kg)</span>
        <b>${total.toLocaleString()} RWF</b>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:6px; color: ${isPickup ? 'var(--success)' : 'var(--text-main)'};">
        <span>${isPickup ? '🚶 Walk-in SACCO Hub Pickup' : '🚴 Express Moto Delivery (15-25 min)'}</span>
        <b>${isPickup ? 'FREE (0 RWF)' : '+300 RWF'}</b>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:6px; color: var(--accent);">
        <span>Social Pool Contribution (${donationPct}%)</span>
        <b>+${gift.toLocaleString()} RWF</b>
      </div>
      <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid var(--card-border); font-size:16px; font-weight:800;">
        <span>Total Payout</span>
        <b style="color:var(--primary);">${grandTotal.toLocaleString()} RWF</b>
      </div>
    `;

    amountBtn.textContent = `Pay ${grandTotal.toLocaleString()} RWF`;
  }

  openPaymentSheet(total, foodName, qty) {
    const modal = document.getElementById("payModal");
    if (!modal) return;
    this.updatePaymentSummary(total, foodName, qty);
    modal.classList.add("open");
  }

  confirmPayment() {
    const pending = this.state.pendingCheckoutOrder;
    if (!pending) return;

    const method = this.state.selectedPayMethod || "momo";
    const methodNames = {
      momo: "MTN Mobile Money",
      airtel: "Airtel Money",
      bk: "Bank of Kigali (BK)",
      sacco: "Umurenge SACCO"
    };

    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryType = isPickup ? "Free Walk-in SACCO Pickup" : "Express Moto Drop (15-25 min)";
    const deliveryFee = isPickup ? 0 : 300;
    const donationPct = this.state.currentUser.donationPct || 2;
    const gift = Math.round(pending.total * (donationPct / 100));

    // Refill pool
    this.state.pool.balance += gift;
    this.state.pool.totalGiftsIn += gift;

    const newOrder = this.executeOrder(pending.listing, pending.qty, pending.total, "cash", methodNames[method], gift, deliveryType, deliveryFee);
    document.getElementById("payModal").classList.remove("open");

    // Open receipt modal
    this.showReceipt(newOrder, methodNames[method]);
  }

  executeOrder(listing, qty, total, mode, paidBy, gift = 0, deliveryType = "Standard Delivery", deliveryFee = 0) {
    listing.quantity -= qty;
    const newOrder = {
      id: this.state.nextOrderId++,
      food: listing.food,
      kg: qty,
      total: total,
      mode: mode,
      buyerRole: this.state.role,
      buyerName: this.state.currentUser.name || "Customer",
      district: listing.district,
      hub: listing.hub || (this.state.nearby ? this.state.nearby.userLocation : "Kimironko Hub"),
      status: "Placed",
      farmer: listing.farmer,
      paidBy: paidBy,
      gift: gift,
      deliveryType: deliveryType,
      deliveryFee: deliveryFee,
      repaid: false,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.state.orders.unshift(newOrder);
    this.saveState();
    this.render();

    if (mode === "credit") {
      this.toast(`Order #${newOrder.id} placed on Bridge Credit. Pool pays farmer on delivery.`, "success");
    } else {
      this.toast(`Order #${newOrder.id} paid via ${paidBy}! Delivery: ${deliveryType}`, "success");
    }
    return newOrder;
  }

  showReceipt(order, payMethod) {"""

code = re.sub(checkout_old_pattern, checkout_new, code, flags=re.DOTALL)

# 2. Update showReceipt paper contents
receipt_old_pattern = r"    paper\.innerHTML = `.*?      <div class=\"receipt-stamp\">PAID"
receipt_new = """    paper.innerHTML = `
      <div style="text-align: center; margin-bottom: 12px;">
        <h3 style="font-size: 20px; font-weight: 800; letter-spacing: 2px;">ISOKO BRIDGE</h3>
        <small style="color: #666; font-size: 10px;">RWANDA VUP FOOD MARKETPLACE</small>
      </div>
      <hr style="border: 0; border-top: 1px dashed #999; margin: 8px 0;">
      <div style="display:flex; justify-content:space-between; font-size: 11px;">
        <span>RECEIPT NO:</span><span>#IB-2026-${order.id}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size: 11px;">
        <span>DATE:</span><span>${new Date().toLocaleDateString('en-GB')} ${order.date}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size: 11px;">
        <span>CUSTOMER:</span><span>${order.buyerName}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size: 11px;">
        <span>NEARBY HUB:</span><span style="font-weight:700;">${order.hub || 'Kimironko Hub'}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size: 11px;">
        <span>FULFILLMENT:</span><span>${order.deliveryType || 'Direct Pickup'}</span>
      </div>
      <hr style="border: 0; border-top: 1px dashed #999; margin: 8px 0;">
      <div style="display:flex; justify-content:space-between; font-size: 12px; font-weight:700;">
        <span>${order.food} (${order.kg} kg)</span>
        <span>${order.total.toLocaleString()} RWF</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size: 11px; color:#555;">
        <span>Farmer: ${order.farmer}</span>
        <span>Delivery: ${order.deliveryFee ? order.deliveryFee + ' RWF' : 'FREE'}</span>
      </div>
      ${order.gift ? `
        <div style="display:flex; justify-content:space-between; font-size: 11px; color: #b45309;">
          <span>Bridge Pool Gift:</span>
          <span>+${order.gift.toLocaleString()} RWF</span>
        </div>
      ` : ''}
      <hr style="border: 0; border-top: 1px dashed #999; margin: 8px 0;">
      <div style="display:flex; justify-content:space-between; font-size: 15px; font-weight: 800;">
        <span>TOTAL:</span>
        <span>${(order.total + (order.gift || 0) + (order.deliveryFee || 0)).toLocaleString()} RWF</span>
      </div>
      <div style="font-size: 11px; color: #555; margin-top: 6px;">
        PAYMENT METHOD: <b>${payMethod || 'BRIDGE POOL'}</b>
      </div>
      <div class="receipt-stamp">PAID"""

code = re.sub(receipt_old_pattern, receipt_new, code, flags=re.DOTALL)

# 3. Add Nearby helper methods
nearby_helpers = """
  // NEARBY & PROXIMITY BUYING METHODS
  renderNearbyBar() {
    const nb = this.state.nearby || { userLocation: "Kimironko, Gasabo (Kigali)", filterProximity: "all", selectedHub: "all" };
    return `
      <div class="nearby-bar">
        <div class="nearby-loc-badge">
          <div class="pin-icon">📍</div>
          <div>
            <div class="loc-title">Buying Food Near By</div>
            <div class="loc-name">
              <span>${nb.userLocation}</span>
              <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 11px; margin-left: 6px;" onclick="window.app.promptChangeLocation()">
                ✏️ Change
              </button>
              <button class="btn btn-sm btn-primary" style="padding: 3px 8px; font-size: 11px; margin-left: 4px;" onclick="window.app.detectUserLocation()">
                🎯 Detect GPS
              </button>
            </div>
          </div>
        </div>

        <div class="nearby-filters-row">
          <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Nearby Filter:</span>
          <button class="hub-chip ${(!nb.filterProximity || nb.filterProximity === 'all') ? 'active' : ''}" onclick="window.app.setProximityFilter('all')">
            🇷🇼 All Rwanda
          </button>
          <button class="hub-chip ${nb.filterProximity === 'near' ? 'active' : ''}" onclick="window.app.setProximityFilter('near')">
            📍 Nearest (< 2 km)
          </button>
          <button class="hub-chip ${nb.filterProximity === 'fast' ? 'active' : ''}" onclick="window.app.setProximityFilter('fast')">
            ⚡ Fast Moto (< 20m)
          </button>
          <button class="hub-chip ${nb.filterProximity === 'sacco' ? 'active' : ''}" onclick="window.app.setProximityFilter('sacco')">
            🚶 Walk-in SACCO Hub
          </button>
        </div>
      </div>

      <!-- Quick Rwanda Hub Selector Strip -->
      <div style="display:flex; align-items:center; gap:8px; overflow-x:auto; padding-bottom:12px; margin-bottom:18px; scrollbar-width:none;">
        <span style="font-size:12px; font-weight:700; color:var(--text-muted); white-space:nowrap;">Nearby Hubs:</span>
        ${RWANDA_FOOD_HUBS.map(h => `
          <button class="hub-chip ${(nb.selectedHub === h.id || (!nb.selectedHub && h.id === 'all')) ? 'active' : ''}" 
                  onclick="window.app.setNearbyHub('${h.id}')" title="${h.district} (${h.province}) · ${h.distance > 0 ? h.distance + ' km away' : 'National'}">
            <span>${h.icon}</span> <span>${h.name.replace(' & SACCO', '').replace(' Direct', '')}</span>
            ${h.distance > 0 ? `<small style="opacity:0.85; margin-left:2px;">(${h.distance} km)</small>` : ''}
          </button>
        `).join('')}
      </div>
    `;
  }

  setNearbyHub(hubId) {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.selectedHub = hubId;
    const hub = RWANDA_FOOD_HUBS.find(h => h.id === hubId);
    if (hub && hubId !== "all") {
      this.state.nearby.userLocation = `${hub.name} (${hub.district})`;
      this.state.nearby.selectedDistrict = hub.district;
      this.toast(`Browsing produce around ${hub.name}`, "info");
    } else {
      this.state.nearby.userLocation = "All Rwanda (National Hubs)";
      this.toast(`Browsing all Rwandan produce hubs`, "info");
    }
    this.saveState();
    this.render();
  }

  setProximityFilter(filter) {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.filterProximity = filter;
    this.saveState();
    this.render();
    const msgs = {
      all: "Showing all available produce",
      near: "Filtered to nearest food (< 2.0 km)",
      fast: "Filtered to fast delivery (< 20 mins)",
      sacco: "Filtered to Walk-in SACCO Hub pickup"
    };
    this.toast(msgs[filter] || "Filter applied", "info");
  }

  promptChangeLocation() {
    const current = this.state.nearby ? this.state.nearby.userLocation : "Kimironko, Gasabo (Kigali)";
    const newLoc = prompt("Enter your Rwandan District or Sector (e.g. Gasabo, Nyarugenge, Kirehe, Musanze, Huye, Rubavu, Nyabihu):", current);
    if (newLoc && newLoc.trim()) {
      if (!this.state.nearby) this.state.nearby = {};
      this.state.nearby.userLocation = newLoc.trim();
      this.saveState();
      this.render();
      this.toast(`Location updated to ${newLoc.trim()}! Recalculating nearby hubs...`, "success");
    }
  }

  detectUserLocation() {
    this.toast("Acquiring GPS location...", "info");
    setTimeout(() => {
      if (!this.state.nearby) this.state.nearby = {};
      this.state.nearby.userLocation = "Gasabo - Kimironko Market Hub (GPS Detected: ±15m)";
      this.state.nearby.selectedDistrict = "Gasabo";
      this.saveState();
      this.render();
      this.toast("📍 GPS Location set: Gasabo - Kimironko Hub (±15m accuracy)", "success");
    }, 600);
  }

  toggleFavorite(id) {
    const item = this.state.listings.find(l => l.id === id);
    if (item) {
      item.isFav = !item.isFav;
      this.saveState();
      this.render();
      this.toast(item.isFav ? `Added ${item.food} to favorites ❤️` : `Removed ${item.food} from favorites`, "info");
    }
  }
"""

if "renderNearbyBar()" not in code:
    code = code.replace("  // 1. OPENING LANDING PAGE", nearby_helpers + "\n  // 1. OPENING LANDING PAGE")

# 4. Update renderGroceryCatalog
catalog_old_pattern = r"  // Render Visual Grocery Catalog with Photos\n  renderGroceryCatalog\(mode\) \{.*?\n  \}\n\n  renderOrdersTable"
catalog_new = """  // Render Visual Grocery Catalog with Photos & Nearby Proximity Info
  renderGroceryCatalog(mode) {
    const nb = this.state.nearby || { filterProximity: "all", selectedHub: "all" };

    let filtered = this.state.listings.filter(l => {
      if (this.state.activeCategory && this.state.activeCategory !== "All") {
        const cat = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].category : "Staples";
        if (cat !== this.state.activeCategory) return false;
      }
      if (nb.selectedHub && nb.selectedHub !== "all") {
        const hub = RWANDA_FOOD_HUBS.find(h => h.id === nb.selectedHub);
        if (hub && l.district !== hub.district && (!l.hub || !l.hub.includes(hub.district))) {
          if (l.distanceKm > 3.0) return false;
        }
      }
      if (nb.filterProximity === "near" && l.distanceKm > 2.0) return false;
      if (nb.filterProximity === "fast" && l.deliveryMins > 20) return false;
      return true;
    });

    if (filtered.length === 0) {
      return `
        <div style="text-align:center; padding: 40px 20px; background:var(--bg); border-radius:var(--radius-lg); margin-bottom: 24px;">
          <div style="font-size: 36px; margin-bottom: 8px;">🌾</div>
          <h4 style="font-size: 16px; font-weight:800;">No harvest produce matches this nearby filter</h4>
          <p style="font-size: 13px; color:var(--text-muted); margin-bottom: 14px;">Try switching to "All Rwanda" or clearing the category filter.</p>
          <button class="btn btn-sm btn-primary" onclick="window.app.setProximityFilter('all'); window.app.state.activeCategory='All'; window.app.render();">Reset Filters</button>
        </div>
      `;
    }

    return `
      <div class="grocery-grid">
        ${filtered.map(l => {
          const guide = this.getPriceGuide(l.food, l.price);
          const photo = l.photo || (HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].img : "assets/produce/dry_beans.jpg");
          const kiny = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].kiny : "";
          const discountPct = l.retailPrice ? Math.round((1 - l.price / l.retailPrice) * 100) : 15;
          const dist = l.distanceKm || 1.2;
          const mins = l.deliveryMins || 15;

          return `
            <div class="grocery-card">
              <div class="grocery-img-box">
                <span class="proximity-badge">📍 ${dist} km</span>
                <button class="favorite-btn" onclick="window.app.toggleFavorite(${l.id})" title="Favorite">
                  ${l.isFav ? '❤️' : '🤍'}
                </button>
                <img src="${photo}" alt="${l.food}" 
                     onerror="this.onerror=null; this.src='assets/produce/dry_beans.jpg';">
                <span class="grocery-price-pill ${guide.class}" style="position:absolute; bottom:8px; right:8px;">${guide.label}</span>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; align-items:baseline;">
                  <h4>${l.food}</h4>
                  ${kiny ? `<small style="font-weight:700; color:var(--text-muted); font-size:11px;">${kiny}</small>` : ''}
                </div>
                <div class="produce-origin-strip">
                  <span>🏪 ${l.hub || l.district}</span>
                  <span>Stock: <b>${l.quantity} kg</b></span>
                </div>
                <div class="produce-origin-strip" style="margin-top:2px;">
                  <span>Seller: <b>${l.farmer}</b></span>
                </div>
                <div class="delivery-eta-badge">
                  ⚡ ${mins} min moto drop · 🚶 Free SACCO pickup
                </div>
              </div>

              <div class="grocery-card-footer">
                <div>
                  <div class="grocery-cost">
                    ${l.price.toLocaleString()} <small>RWF/kg</small>
                  </div>
                  ${l.retailPrice ? `
                    <div class="grocery-retail-strike">
                      Market: ${l.retailPrice.toLocaleString()} RWF <span style="color:var(--success); font-weight:700;">(-${discountPct}%)</span>
                    </div>
                  ` : ''}
                </div>

                <div style="display:flex; align-items:center; gap:6px;">
                  <input id="qty_${l.id}" type="number" min="1" max="${l.quantity}" value="5" class="form-control" style="width:48px; padding:4px 6px; text-align:center;" aria-label="kg">
                  <button class="btn btn-sm ${mode === 'credit' ? 'btn-accent' : 'btn-primary'}" onclick="window.app.startBuyProduce(${l.id}, '${mode}')">
                    ${mode === 'credit' ? 'Credit' : 'Buy'}
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  renderOrdersTable"""

code = re.sub(catalog_old_pattern, catalog_new, code, flags=re.DOTALL)

# 5. Update renderShopperView
shopper_old_pattern = r"  // 3\. Shopper View\n  renderShopperView\(\) \{.*?\n  \}\n\n  // 4\. Planner"
shopper_new = """  // 3. Shopper View
  renderShopperView() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === "Shopper");
    const totalGifts = myOrders.reduce((sum, o) => sum + (o.gift || 0), 0);
    const dpp = 5 * NISR_DATA.overall.dailyFoodBasketCostRwf;
    const daysFunded = (totalGifts / dpp).toFixed(1);

    return `
      <div class="banner-notice info">
        <div style="font-size: 26px;">🛒</div>
        <div>
          <b>Ethical Shopper Portal · Support Local Farmers & Bridge the Hunger Gap</b>
          <div style="font-size: 13.5px; margin-top: 3px; line-height: 1.5;">
            Buy fresh Rwandan farm produce at fair direct-from-farm prices with MTN MoMo, Airtel Money, or BK. 
            With every order, your chosen donation share (1% to 5%) directly fuels the Emergency Bridge Pool, keeping vulnerable Rwandan families fed while their VUP transfers are delayed.
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3" style="margin-bottom: 24px;">
        <div class="card">
          <div class="card-subtitle">Pool Donation Share</div>
          <div class="slider-pill-container">
            <input type="range" min="1" max="5" value="${u.donationPct || 2}" 
              oninput="window.app.state.currentUser.donationPct = +this.value; window.app.saveState(); window.app.render();" style="flex: 1;">
            <div class="slider-val-pill">${u.donationPct || 2}%</div>
          </div>
          <div class="metric-sub">Automatically added to cart purchases to subsidize VUP families</div>
        </div>

        <div class="card">
          <div class="card-subtitle">Your Total Pool Contributions</div>
          <div class="metric-value" style="color: var(--accent);">${totalGifts.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">Contributed into the social revolving credit pool</div>
        </div>

        <div class="card">
          <div class="card-subtitle">Tangible Social Impact</div>
          <div class="metric-value" style="color: var(--success);">${daysFunded} <span style="font-size: 14px;">Family Days</span></div>
          <div class="metric-sub">Days of complete sustenance funded for a vulnerable family of 5</div>
        </div>
      </div>

      ${this.renderNearbyBar()}

      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">🛒 Fresh Farm Harvest Catalog (Direct from Rwandan Hubs)</div>
            <div class="card-subtitle">Order high-quality produce straight from Rwandan cooperatives and smallholder farmers.</div>
          </div>
          <span class="pill pill-fair">Ethical Cash & MoMo Checkout</span>
        </div>
        ${this.renderGroceryCatalog('cash')}
      </div>

      <div class="card">
        <div class="card-title">🧾 My Purchase Receipts & Impact Contribution</div>
        <div class="card-subtitle" style="margin-bottom: 12px;">See what you purchased and how much was contributed to the bridge pool.</div>
        ${this.renderOrdersTable(myOrders)}
      </div>
    `;
  }

  // 4. Planner"""

code = re.sub(shopper_old_pattern, shopper_new, code, flags=re.DOTALL)

# 6. Update renderOpeningPage with renderNearbyBar
opening_old = "      <!-- Live Harvest Grocery Showcase with Photos (Visual Grocery UI from Mockup) -->"
opening_new = """      ${this.renderNearbyBar()}

      <!-- Live Harvest Grocery Showcase with Photos (Visual Grocery UI from Mockup) -->"""
if "${this.renderNearbyBar()}" not in code.split("renderOpeningPage")[1].split("Choose Your Role")[0]:
    code = code.replace(opening_old, opening_new)

# 7. Update renderFamilyView with renderNearbyBar
family_old = "      <!-- Produce Market -->"
family_new = """      ${this.renderNearbyBar()}

      <!-- Produce Market -->"""
if "${this.renderNearbyBar()}" not in code.split("renderFamilyView")[1].split("Affordable Family Food Basket")[0]:
    code = code.replace(family_old, family_new)

# Write to both files
with open("js/app.js", "w", encoding="utf-8") as f:
    f.write(code)

with open("app/js/app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("js/app.js and app/js/app.js successfully patched!")
