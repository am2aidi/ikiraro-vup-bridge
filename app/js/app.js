/**
 * Isoko Bridge - Core Application Logic
 * Integrates Market, Emergency Social Bridge, and NISR Planner Analytics
 */

// Initial Seed State
const DEFAULT_STATE = {
  theme: "light",
  lang: "en",
  role: "Family", // Family, Farmer, Shopper, Planner
  currentUser: {
    username: "amina_family",
    name: "Amina Uwase",
    role: "Family",
    district: "Kirehe",
    programme: "Direct Support",
    householdSize: 5,
    daysLate: 8,
    donationPct: 2
  },
  pool: {
    balance: 25000,
    totalGiftsIn: 25000,
    totalPaidToFarmers: 0,
    totalRepaidByVup: 0
  },
  listings: [
    { id: 1, food: "Dry beans", district: "Kirehe", price: 780, quantity: 200, farmer: "Mukamana Farm", momo: "0788123456" },
    { id: 2, food: "Sweet potato", district: "Gisagara", price: 240, quantity: 350, farmer: "Gisagara Agrilink", momo: "0788234567" },
    { id: 3, food: "Irish potato", district: "Nyabihu", price: 440, quantity: 500, farmer: "Nyabihu Potato Coop", momo: "0788654321" },
    { id: 4, food: "Tomato", district: "Karongi", price: 480, quantity: 90, farmer: "Karongi Fresh", momo: "0788345678" },
    { id: 5, food: "Cooking banana", district: "Gatsibo", price: 290, quantity: 250, farmer: "Gatsibo Cooperative", momo: "0788456789" },
    { id: 6, food: "Onion", district: "Gicumbi", price: 1600, quantity: 80, farmer: "Gicumbi Green", momo: "0788567890" },
    { id: 7, food: "Local rice", district: "Bugesera", price: 1180, quantity: 180, farmer: "Bugesera Rice Growers", momo: "0788789012" }
  ],
  orders: [
    { id: 101, food: "Dry beans", kg: 10, total: 7800, mode: "credit", buyerRole: "Family", buyerName: "Amina Uwase", district: "Kirehe", status: "Delivered", farmer: "Mukamana Farm", paidBy: "pool", repaid: false, timestamp: "2026-10-22 08:30" },
    { id: 102, food: "Sweet potato", kg: 15, total: 3600, mode: "cash", buyerRole: "Shopper", buyerName: "Grace Ingabire", district: "Gisagara", status: "Delivered", farmer: "Gisagara Agrilink", paidBy: "buyer", gift: 72, timestamp: "2026-10-22 09:15" }
  ],
  nextOrderId: 103,
  nextListingId: 8,
  selectedDistrict: "Kirehe",
  hotspotMode: "delay" // 'delay' or 'pct'
};

// Translations
const I18N = {
  en: {
    tagline: "Ikiraro cya VUP · Food Market & Emergency Social Payment Bridge",
    poolTicker: "Social Bridge Pool:",
    switchRole: "Role:",
    roleFamily: "Family (Beneficiary)",
    roleFarmer: "Seller (Farmer)",
    roleShopper: "Ethical Shopper",
    rolePlanner: "Planner / Admin",
    statusLate: "Delayed",
    statusOnTime: "Disbursed",
    creditLimit: "Bridge Credit Left",
    dailyBasket: "Daily Basket Cost",
    marketTitle: "Direct Produce Market",
    buyCredit: "Order on Credit",
    buyCash: "Buy with Cash",
    ordersTitle: "Order History",
    addListing: "List Harvest Produce",
    priceBenchmark: "NISR Price Guide",
    fairPrice: "Fair",
    lowPrice: "Low",
    highPrice: "High",
    simulateVup: "Simulate: VUP Payments Arrive",
    resetDemo: "Reset Simulation"
  },
  rw: {
    tagline: "Ikiraro cya VUP · Isoko ry'ibiribwa n'inguzanyo y'ingoboka",
    poolTicker: "Ikigega cy'ingoboka:",
    switchRole: "Uruhare:",
    roleFamily: "Umuryango (Uhabwa VUP)",
    roleFarmer: "Umuhinzi (Ugurishe)",
    roleShopper: "Umuguzi wigenga",
    rolePlanner: "Umushingamigambi",
    statusLate: "Yatindijwe",
    statusOnTime: "Yishyuwe",
    creditLimit: "Inguzanyo usigaranye",
    dailyBasket: "Ibikenerwa ku munsi",
    marketTitle: "Isoko ry'Umusaruro",
    buyCredit: "Fata ku nguzanyo",
    buyCash: "Gura ako kanya",
    ordersTitle: "Ibyatanzwe",
    addListing: "Injiza umusaruro",
    priceBenchmark: "Igipimo cy'ibiciro (NISR)",
    fairPrice: "Birakwiye",
    lowPrice: "Biri hasi",
    highPrice: "Birahenze",
    simulateVup: "Igerageza: Inkunga ya VUP iraje",
    resetDemo: "Subiza ku ntangiriro"
  }
};

// Global App Object
class IsokoApp {
  constructor() {
    this.state = this.loadState();
    this.map = null;
    this.mapLayer = null;
    this.mapMetric = "priority"; // 'priority', 'delay', 'poverty'
  }

  loadState() {
    try {
      const saved = localStorage.getItem("isoko_bridge_state_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load state, using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem("isoko_bridge_state_v1", JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save state", e);
    }
    this.updateHeaderTicker();
  }

  resetState() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
    this.render();
    this.toast("State reset to initial demo values.", "info");
  }

  t(key) {
    const lang = this.state.lang || "en";
    return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
  }

  init() {
    this.applyTheme();
    this.bindEvents();
    this.render();
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  toggleTheme() {
    this.state.theme = this.state.theme === "dark" ? "light" : "dark";
    this.applyTheme();
    this.saveState();
  }

  toggleLang() {
    this.state.lang = this.state.lang === "en" ? "rw" : "en";
    const btnText = document.getElementById("langBtnText");
    if (btnText) btnText.textContent = this.state.lang === "en" ? "EN / RW" : "RW / EN";
    this.saveState();
    this.render();
  }

  setRole(role) {
    this.state.role = role;
    const account = NISR_DATA.demoAccounts.find(a => a.role === role);
    if (account) {
      this.state.currentUser = { ...this.state.currentUser, ...account };
    }
    this.saveState();
    this.render();
  }

  setUser(username) {
    const account = NISR_DATA.demoAccounts.find(a => a.username === username);
    if (account) {
      this.state.currentUser = { ...this.state.currentUser, ...account };
      this.state.role = account.role;
      this.saveState();
      this.render();
      this.toast(`Logged in as ${account.name} (${account.role})`, "success");
    }
  }

  getPriceGuide(food, price) {
    const benchmark = NISR_DATA.foodPrices[food];
    if (!benchmark) return { label: "Fair", class: "pill-fair", ratio: 1.0, median: price };
    const median = benchmark.median;
    const ratio = price / median;
    if (ratio < 0.85) return { label: "Low", class: "pill-low", ratio, median };
    if (ratio > 1.15) return { label: "High", class: "pill-high", ratio, median };
    return { label: "Fair", class: "pill-fair", ratio, median };
  }

  calculateCreditLimit() {
    const u = this.state.currentUser;
    const dpp = NISR_DATA.overall.dailyFoodBasketCostRwf; // ~261 RWF
    const days = Number(u.daysLate) || 0;
    const size = Number(u.householdSize) || 1;
    if (days <= 0) return 0;
    return Math.round(size * dpp * days);
  }

  getOutstandingCredit() {
    return this.state.orders
      .filter(o => o.mode === "credit" && !o.repaid && o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0);
  }

  getRemainingCredit() {
    const limit = this.calculateCreditLimit();
    const out = this.getOutstandingCredit();
    return Math.max(0, limit - out);
  }

  buyProduce(listingId, mode) {
    const listing = this.state.listings.find(l => l.id === listingId);
    if (!listing) return;
    const inputEl = document.getElementById(`qty_${listingId}`);
    const qty = parseFloat(inputEl ? inputEl.value : 5);

    if (!qty || qty <= 0) {
      this.toast("Please enter a valid quantity.", "warning");
      return;
    }
    if (qty > listing.quantity) {
      this.toast(`Only ${listing.quantity} kg available in stock.`, "warning");
      return;
    }

    const total = Math.round(qty * listing.price);

    if (mode === "credit") {
      const remaining = this.getRemainingCredit();
      if (total > remaining) {
        this.toast(`Exceeds available bridge credit limit (${remaining.toLocaleString()} RWF left).`, "danger");
        return;
      }
    }

    let gift = 0;
    if (this.state.role === "Shopper") {
      const pct = this.state.currentUser.donationPct || 2;
      gift = Math.round(total * (pct / 100));
      this.state.pool.balance += gift;
      this.state.pool.totalGiftsIn += gift;
    }

    // Deduct stock
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
      status: "Placed",
      farmer: listing.farmer,
      paidBy: null,
      gift: gift,
      repaid: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.state.orders.unshift(newOrder);
    this.saveState();
    this.render();

    if (mode === "credit") {
      this.toast(`Order #${newOrder.id} placed on Bridge Credit. Pool will pay seller upon delivery.`, "success");
    } else {
      const giftNote = gift > 0 ? ` (+${gift.toLocaleString()} RWF contributed to social pool!)` : "";
      this.toast(`Order #${newOrder.id} placed successfully!${giftNote}`, "success");
    }
  }

  deliverOrder(orderId) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order || order.status === "Delivered") return;

    if (order.mode === "credit") {
      if (this.state.pool.balance < order.total) {
        this.toast("Pool balance insufficient to pay seller immediately. Shopper contributions refill the pool.", "warning");
        return;
      }
      this.state.pool.balance -= order.total;
      this.state.pool.totalPaidToFarmers += order.total;
      order.paidBy = "pool";
    } else {
      order.paidBy = "buyer";
    }

    order.status = "Delivered";
    this.saveState();
    this.render();
    this.toast(`Order #${orderId} marked Delivered. Farmer paid via ${order.paidBy === 'pool' ? 'Bridge Pool' : 'Buyer Cash'}.`, "success");
  }

  addListing(event) {
    event.preventDefault();
    const food = document.getElementById("new_food").value;
    const district = document.getElementById("new_district").value;
    const price = parseFloat(document.getElementById("new_price").value);
    const quantity = parseFloat(document.getElementById("new_qty").value);
    const momo = document.getElementById("new_momo").value || "0788000000";

    if (!price || !quantity || price <= 0 || quantity <= 0) {
      this.toast("Please enter a valid price and quantity.", "warning");
      return;
    }

    const newListing = {
      id: this.state.nextListingId++,
      food,
      district,
      price,
      quantity,
      farmer: this.state.currentUser.name || "My Farm",
      momo
    };

    this.state.listings.unshift(newListing);
    this.saveState();
    this.render();
    const guide = this.getPriceGuide(food, price);
    this.toast(`Produce listing added! Price is rated ${guide.label} against NISR median.`, "success");
  }

  simulateVupRepayment() {
    let count = 0;
    let totalRepaid = 0;
    this.state.orders.forEach(o => {
      if (o.mode === "credit" && o.status === "Delivered" && !o.repaid) {
        o.repaid = true;
        totalRepaid += o.total;
        count++;
      }
    });

    if (count === 0) {
      this.toast("No delivered credit orders pending reimbursement.", "info");
      return;
    }

    this.state.pool.balance += totalRepaid;
    this.state.pool.totalRepaidByVup += totalRepaid;
    this.saveState();
    this.render();
    this.toast(`VUP Treasury payments processed! ${count} family credits (${totalRepaid.toLocaleString()} RWF) repaid into social pool.`, "success");
  }

  toast(msg, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const t = document.createElement("div");
    t.className = "toast";
    let icon = "✓";
    if (type === "warning") icon = "⚠️";
    if (type === "danger") icon = "✕";
    t.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  updateHeaderTicker() {
    const el = document.getElementById("poolTickerAmount");
    if (el) el.textContent = `${this.state.pool.balance.toLocaleString()} RWF`;
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      if (this.map) this.map.invalidateSize();
    });
  }

  // View Renders
  render() {
    this.renderHeader();
    this.renderSubNav();
    const mainEl = document.getElementById("appView");
    if (!mainEl) return;

    switch (this.state.role) {
      case "Family":
        mainEl.innerHTML = this.renderFamilyView();
        break;
      case "Farmer":
        mainEl.innerHTML = this.renderFarmerView();
        this.updatePriceGuidePreview();
        break;
      case "Shopper":
        mainEl.innerHTML = this.renderShopperView();
        break;
      case "Planner":
        mainEl.innerHTML = this.renderPlannerView();
        this.initPlannerVisuals();
        break;
      default:
        mainEl.innerHTML = this.renderFamilyView();
    }

    this.updateHeaderTicker();
  }

  renderHeader() {
    const roleNav = document.getElementById("roleNav");
    if (!roleNav) return;

    const roles = [
      { id: "Family", label: this.t("roleFamily"), icon: "👨‍👩‍👧" },
      { id: "Farmer", label: this.t("roleFarmer"), icon: "🌾" },
      { id: "Shopper", label: this.t("roleShopper"), icon: "🛒" },
      { id: "Planner", label: this.t("rolePlanner"), icon: "📊" }
    ];

    roleNav.innerHTML = roles.map(r => `
      <button class="role-nav-item ${this.state.role === r.id ? 'active' : ''}" onclick="window.app.setRole('${r.id}')">
        <span>${r.icon}</span>
        <span>${r.label}</span>
      </button>
    `).join("");
  }

  renderSubNav() {
    const el = document.getElementById("quickUserSelector");
    if (!el) return;

    el.innerHTML = `
      <span>Quick Demo User:</span>
      <select onchange="window.app.setUser(this.value)">
        ${NISR_DATA.demoAccounts.map(acc => `
          <option value="${acc.username}" ${this.state.currentUser.username === acc.username ? 'selected' : ''}>
            ${acc.name} (${acc.role}) - ${acc.district || acc.institution || 'Urban'}
          </option>
        `).join("")}
      </select>
    `;
  }

  // 1. Family View
  renderFamilyView() {
    const u = this.state.currentUser;
    const limit = this.calculateCreditLimit();
    const remaining = this.getRemainingCredit();
    const isLate = Number(u.daysLate) > 0;
    const dailyCost = (Number(u.householdSize) || 1) * NISR_DATA.overall.dailyFoodBasketCostRwf;
    const benchmarkProg = NISR_DATA.programmes.find(p => p.name === u.programme) || NISR_DATA.programmes[2];

    return `
      <!-- Family Overview Banner -->
      <div class="banner-notice ${isLate ? 'danger' : 'info'}">
        <div style="font-size: 24px;">${isLate ? '🚨' : '✅'}</div>
        <div>
          <b>${isLate ? `Disbursement Delay Alert: Payment is ${u.daysLate} days late.` : 'Payment on schedule.'}</b>
          <div style="font-size: 13px; margin-top: 2px;">
            ${isLate 
              ? `Your emergency Bridge Credit is active! You can purchase nutritious staple food now. The revolving pool guarantees payment to the local farmer, and the credit is automatically settled when your VUP disbursement arrives.` 
              : `Your VUP assistance is up to date. You can purchase fresh farm produce using cash.`}
          </div>
        </div>
      </div>

      <!-- Family Status Controls & Cards -->
      <div class="grid grid-cols-4">
        <div class="card">
          <div class="card-subtitle">VUP Programme</div>
          <div class="form-group" style="margin-top: 6px;">
            <select class="form-control" onchange="window.app.state.currentUser.programme = this.value; window.app.saveState(); window.app.render();">
              ${NISR_DATA.programmes.map(p => `
                <option value="${p.name}" ${u.programme === p.name ? 'selected' : ''}>${p.name}</option>
              `).join("")}
            </select>
          </div>
          <div class="metric-sub">NISR benchmark delay: <b>${benchmarkProg.delay} days</b></div>
        </div>

        <div class="card">
          <div class="card-subtitle">Family Size (Members)</div>
          <input type="number" min="1" max="15" class="form-control" value="${u.householdSize || 5}" 
            onchange="window.app.state.currentUser.householdSize = +this.value || 1; window.app.saveState(); window.app.render();" style="margin-top: 6px;">
          <div class="metric-sub">Demo Food Basket: <b>${dailyCost.toLocaleString()} RWF / day</b></div>
        </div>

        <div class="card">
          <div class="card-subtitle">Disbursement Delay</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <input type="range" min="0" max="30" value="${u.daysLate}" 
              oninput="window.app.state.currentUser.daysLate = +this.value; window.app.saveState(); window.app.render();" style="flex: 1;">
            <b style="font-size: 16px; min-width: 38px;">${u.daysLate} d</b>
          </div>
          <div class="metric-sub">Status: <span class="pill ${isLate ? 'pill-urgent' : 'pill-fair'}">${isLate ? 'Delayed' : 'On Time'}</span></div>
        </div>

        <div class="card" style="background: linear-gradient(135deg, var(--card-bg), var(--primary-light));">
          <div class="card-subtitle">Available Bridge Credit</div>
          <div class="metric-value" style="color: var(--primary); margin-top: 4px;">${remaining.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">Max cap: ${limit.toLocaleString()} RWF (calculated per day late)</div>
        </div>
      </div>

      <!-- Produce Market -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">🛒 ${this.t("marketTitle")}</div>
            <div class="card-subtitle">Direct staple produce from Rwandan farmers with official NISR median price benchmarks.</div>
          </div>
          <span class="pill ${isLate ? 'pill-urgent' : 'pill-neutral'}">${isLate ? 'Bridge Credit Mode Active' : 'Cash Market Mode'}</span>
        </div>
        ${this.renderMarketCatalog(isLate ? 'credit' : 'cash')}
      </div>

      <!-- Budget Nutrition Guide & Orders -->
      <div class="grid grid-cols-2">
        <div class="card">
          <div class="card-title">🍲 Affordable Family Food Basket (NISR Cost Guide)</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Assumed daily nutritious portion per person based on NISR commodity prices.</div>
          <table>
            <thead>
              <tr><th>Commodity</th><th>Portion/Day</th><th>Price (kg)</th><th>Daily Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>Dry Beans</td><td>120g</td><td>800 RWF</td><td>96 RWF</td></tr>
              <tr><td>Sweet / Irish Potato</td><td>300g</td><td>250–450 RWF</td><td>105 RWF</td></tr>
              <tr><td>Tomato & Onion</td><td>110g</td><td>500–1667 RWF</td><td>60 RWF</td></tr>
              <tr style="font-weight: 700; background: var(--bg);">
                <td>Total Basket</td><td>530g/person</td><td>-</td><td>~261 RWF/person/day</td>
              </tr>
            </tbody>
          </table>
          <p class="metric-sub" style="margin-top: 10px;">* NISR survey does not measure calories; cost calculations represent illustrative food security budgets.</p>
        </div>

        <div class="card">
          <div class="card-title">📋 My Family Orders</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Track delivery and settlement of your food orders.</div>
          ${this.renderOrdersTable(this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === 'Family'))}
        </div>
      </div>
    `;
  }

  // 2. Farmer View
  renderFarmerView() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.farmer === u.name || o.farmer === "Mukamana Farm" || o.farmer === "You (farmer)");
    const mySales = myOrders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

    return `
      <!-- Farmer Header Banner -->
      <div class="banner-notice info">
        <div style="font-size: 24px;">🌾</div>
        <div>
          <b>Seller Portal · Direct Smallholder & Cooperative Produce Hub</b>
          <div style="font-size: 13px; margin-top: 2px;">
            Sell directly to local families and urban shoppers without middlemen. When a family orders on Bridge Credit, the social pool guarantees your payment via Mobile Money as soon as you confirm delivery!
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-3">
        <div class="card">
          <div class="card-subtitle">Pending Orders to Deliver</div>
          <div class="metric-value">${myOrders.filter(o => o.status === 'Placed').length}</div>
          <div class="metric-sub">Requires fulfillment</div>
        </div>
        <div class="card">
          <div class="card-subtitle">Total Completed Payouts</div>
          <div class="metric-value" style="color: var(--success);">${mySales.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">Paid instantly upon delivery</div>
        </div>
        <div class="card">
          <div class="card-subtitle">Linked Mobile Money</div>
          <div class="metric-value" style="font-size: 20px;">${u.momo || '0788 123 456'}</div>
          <div class="metric-sub">MTN / Airtel Money Account</div>
        </div>
      </div>

      <!-- Add Listing & Orders -->
      <div class="grid grid-cols-2">
        <div class="card">
          <div class="card-title">➕ ${this.t("addListing")}</div>
          <div class="card-subtitle" style="margin-bottom: 16px;">List your harvest produce with real-time NISR price fairness benchmarking.</div>
          
          <form onsubmit="window.app.addListing(event)">
            <div class="form-group">
              <label class="form-label">Produce Crop</label>
              <select id="new_food" class="form-control" onchange="window.app.updatePriceGuidePreview()">
                ${Object.keys(NISR_DATA.foodPrices).map(k => `
                  <option value="${k}">${k} (${NISR_DATA.foodPrices[k].category})</option>
                `).join("")}
              </select>
            </div>

            <div class="grid grid-cols-2" style="margin-bottom: 0;">
              <div class="form-group">
                <label class="form-label">District Location</label>
                <select id="new_district" class="form-control">
                  ${NISR_DATA.districts.map(d => `
                    <option value="${d.name}">${d.name} (${d.province})</option>
                  `).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Available Stock (kg)</label>
                <input id="new_qty" type="number" min="1" value="100" class="form-control" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Selling Price (RWF per kg)</label>
              <input id="new_price" type="number" min="50" value="780" class="form-control" required oninput="window.app.updatePriceGuidePreview()">
              <div id="priceGuidePreview" style="margin-top: 6px; font-size: 13px;"></div>
            </div>

            <div class="form-group">
              <label class="form-label">Payout MoMo Phone Number</label>
              <input id="new_momo" type="text" value="${u.momo || '0788123456'}" class="form-control">
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Publish Listing to Isoko Market</button>
          </form>
        </div>

        <div class="card">
          <div class="card-title">📦 Orders Awaiting Delivery</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Confirm delivery to immediately release guaranteed payout from the pool or buyer.</div>
          ${this.renderOrdersTable(myOrders, true)}
        </div>
      </div>

      <!-- My Active Listings -->
      <div class="card">
        <div class="card-title">🌾 My Current Produce Listings</div>
        <div class="card-subtitle" style="margin-bottom: 14px;">Available produce visible to families and shoppers.</div>
        <div class="market-grid">
          ${this.state.listings.filter(l => l.farmer === u.name || l.farmer === "Mukamana Farm" || l.farmer === "You (farmer)").map(l => {
            const guide = this.getPriceGuide(l.food, l.price);
            return `
              <div class="product-card">
                <div class="product-info">
                  <h4>${l.food}</h4>
                  <div class="product-meta">📍 ${l.district} · Stock: <b>${l.quantity} kg</b></div>
                  <div style="margin-top: 8px;">
                    <span class="pill ${guide.class}">${guide.label} (${guide.ratio < 0.85 ? 'Below median' : guide.ratio > 1.15 ? 'Above median' : 'Aligned with NISR'})</span>
                  </div>
                </div>
                <div class="product-price">${l.price.toLocaleString()} <span>RWF/kg</span></div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  updatePriceGuidePreview() {
    const el = document.getElementById("priceGuidePreview");
    const foodEl = document.getElementById("new_food");
    const priceEl = document.getElementById("new_price");
    if (!el || !foodEl || !priceEl) return;
    const food = foodEl.value;
    const price = parseFloat(priceEl.value) || 0;
    const guide = this.getPriceGuide(food, price);
    el.innerHTML = `NISR Benchmark Median: <b>${guide.median.toLocaleString()} RWF/kg</b> · Rating: <span class="pill ${guide.class}">${guide.label}</span>`;
  }

  // 3. Shopper View
  renderShopperView() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === "Shopper");
    const totalGifts = myOrders.reduce((sum, o) => sum + (o.gift || 0), 0);
    const dpp = 5 * NISR_DATA.overall.dailyFoodBasketCostRwf;
    const daysFunded = (totalGifts / dpp).toFixed(1);

    return `
      <!-- Shopper Header Banner -->
      <div class="banner-notice warning">
        <div style="font-size: 24px;">🛒</div>
        <div>
          <b>Ethical Shopper Portal · Support Local Farmers & Bridge the Hunger Gap</b>
          <div style="font-size: 13px; margin-top: 2px;">
            Buy fresh farm produce at fair prices. With every order, your chosen donation share ($1\% \text{ to } 5\%$) directly fuels the Emergency Bridge Pool, keeping vulnerable Rwandan families fed while their VUP transfers are delayed.
          </div>
        </div>
      </div>

      <!-- Social Impact Metrics -->
      <div class="grid grid-cols-3">
        <div class="card">
          <div class="card-subtitle">Pool Donation Share</div>
          <div style="display: flex; align-items: center; gap: 10px; margin-top: 6px;">
            <input type="range" min="1" max="5" value="${u.donationPct || 2}" 
              oninput="window.app.state.currentUser.donationPct = +this.value; window.app.saveState(); window.app.render();" style="flex: 1;">
            <b style="font-size: 18px; color: var(--accent); min-width: 38px;">${u.donationPct || 2}%</b>
          </div>
          <div class="metric-sub">Automatically added to cart purchases</div>
        </div>

        <div class="card">
          <div class="card-subtitle">Your Total Pool Contributions</div>
          <div class="metric-value" style="color: var(--accent);">${totalGifts.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">Contributed into the social revolving pool</div>
        </div>

        <div class="card">
          <div class="card-subtitle">Tangible Social Impact</div>
          <div class="metric-value" style="color: var(--success);">${daysFunded} <span style="font-size: 14px;">Family Days</span></div>
          <div class="metric-sub">Days of complete sustenance funded for a family of 5</div>
        </div>
      </div>

      <!-- Produce Market for Shoppers -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">🛒 Fresh Farm Harvest Catalog</div>
            <div class="card-subtitle">Order high-quality produce straight from Rwandan cooperatives and smallholder farmers.</div>
          </div>
          <span class="pill pill-fair">Ethical Cash Checkout</span>
        </div>
        ${this.renderMarketCatalog('cash')}
      </div>

      <!-- My Shopper Orders -->
      <div class="card">
        <div class="card-title">🧾 My Purchase Receipts & Impact Contribution</div>
        <div class="card-subtitle" style="margin-bottom: 12px;">See what you purchased and how much was contributed to the bridge pool.</div>
        ${this.renderOrdersTable(myOrders)}
      </div>
    `;
  }

  // 4. Planner / Admin View
  renderPlannerView() {
    const o = this.state.orders;
    const creditOrders = o.filter(x => x.mode === "credit");
    const totalCredit = creditOrders.reduce((sum, x) => sum + x.total, 0);
    const outstanding = this.getOutstandingCredit();

    return `
      <!-- Planner Header Banner -->
      <div class="banner-notice" style="background: #f3e8ff; border-left-color: #7e22ce;">
        <div style="font-size: 24px;">📊</div>
        <div>
          <b>Government & Programme Planner Intelligence (LODA / NISR Dashboard)</b>
          <div style="font-size: 13px; margin-top: 2px;">
            Evidence-based decision cockpit grounded in NISR VUP household survey microdata ($N = 3,399$ beneficiaries). Analyze disbursement friction, explore the 30-district interactive choropleth, test poverty proxy models, and simulate treasury liquidity cycles.
          </div>
        </div>
      </div>

      <!-- Planner KPIs -->
      <div class="grid grid-cols-4">
        <div class="card">
          <div class="card-subtitle">Total Market Orders</div>
          <div class="metric-value">${o.length}</div>
          <div class="metric-sub">${creditOrders.length} placed on bridge credit</div>
        </div>

        <div class="card">
          <div class="card-subtitle">Bridge Credit Extended</div>
          <div class="metric-value" style="color: var(--primary);">${totalCredit.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">Zero-interest emergency safety net</div>
        </div>

        <div class="card">
          <div class="card-subtitle">Open Unsettled Credit</div>
          <div class="metric-value" style="color: ${outstanding > 0 ? 'var(--accent)' : 'var(--success)'};">${outstanding.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">Awaiting government VUP payment wave</div>
        </div>

        <div class="card" style="background: linear-gradient(135deg, var(--card-bg), var(--primary-light));">
          <div class="card-subtitle">Bridge Pool Liquidity</div>
          <div class="metric-value" style="color: var(--primary);">${this.state.pool.balance.toLocaleString()} <span style="font-size: 14px;">RWF</span></div>
          <div class="metric-sub">In: ${this.state.pool.totalGiftsIn.toLocaleString()} · Out: ${this.state.pool.totalPaidToFarmers.toLocaleString()} · Repaid: ${this.state.pool.totalRepaidByVup.toLocaleString()}</div>
        </div>
      </div>

      <!-- Simulation Actions -->
      <div class="card" style="margin-bottom: 24px; background: var(--bg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div>
            <b>Treasury & Liquidity Simulation Engine</b>
            <div style="font-size: 13px; color: var(--text-muted);">Simulate the arrival of the scheduled VUP government cash transfer wave to automatically reimburse the community pool.</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary" onclick="window.app.simulateVupRepayment()">⚡ ${this.t("simulateVup")}</button>
            <button class="btn btn-outline" onclick="window.app.resetState()">↺ ${this.t("resetDemo")}</button>
          </div>
        </div>
      </div>

      <!-- Interactive Rwanda Map & 30-District Ranking -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">🗺️ Interactive Rwanda 30-District Geospatial Observatory</div>
            <div class="card-subtitle">GeoJSON choropleth visualising payment delays, poverty prevalence, and the composite 'Help Here First' priority index.</div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-sm ${this.mapMetric === 'priority' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.setMapMetric('priority')">Priority Score</button>
            <button class="btn btn-sm ${this.mapMetric === 'delay' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.setMapMetric('delay')">Payment Delay</button>
            <button class="btn btn-sm ${this.mapMetric === 'poverty' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.setMapMetric('poverty')">Poverty Rate</button>
          </div>
        </div>

        <div class="grid grid-cols-3" style="margin-bottom: 0;">
          <div style="grid-column: span 2;">
            <div id="mapContainer"></div>
            <div class="metric-sub" style="margin-top: 6px;">
              * Source: geoBoundaries ADM2 Rwanda District Boundaries verified against NISR Geodata.
            </div>
          </div>
          <div>
            <div class="card" style="height: 100%; border: 1px solid var(--card-border); padding: 14px; background: var(--bg);">
              <div id="districtDetailPane">
                <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">District Profile</div>
                <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Click any district on the map or select from the list below to inspect NISR microdata metrics.</div>
                <div id="districtSelectedInfo">
                  ${this.renderDistrictInfo(this.state.selectedDistrict)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hotspots & Delays Matrix -->
      <div class="grid grid-cols-2">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">🔥 Programme × Province Hotspot Matrix</div>
              <div class="card-subtitle">Disbursement friction matrix cross-tabulating 4 programmes across 5 provinces.</div>
            </div>
            <div style="display: flex; gap: 4px;">
              <button class="btn btn-sm ${this.state.hotspotMode === 'delay' ? 'btn-primary' : 'btn-outline'}" 
                onclick="window.app.state.hotspotMode = 'delay'; window.app.render();">Days Late</button>
              <button class="btn btn-sm ${this.state.hotspotMode === 'pct' ? 'btn-primary' : 'btn-outline'}" 
                onclick="window.app.state.hotspotMode = 'pct'; window.app.render();">% >7d Late</button>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Southern</th>
                  <th>Eastern</th>
                  <th>Western</th>
                  <th>Kigali</th>
                  <th>Northern</th>
                </tr>
              </thead>
              <tbody>
                ${Object.keys(NISR_DATA.hotspots).map(prog => `
                  <tr>
                    <td style="font-weight: 600;">${prog}</td>
                    ${["Southern", "Eastern", "Western", "City of Kigali", "Northern"].map(prov => {
                      const cell = NISR_DATA.hotspots[prog][prov];
                      if (!cell) return `<td style="color: var(--text-muted); text-align: center;">-</td>`;
                      const isHot = cell.delay >= 11;
                      const isWarn = cell.delay >= 8.5;
                      const bg = isHot ? 'var(--danger-light)' : isWarn ? 'var(--accent-light)' : 'var(--success-light)';
                      const color = isHot ? 'var(--danger)' : isWarn ? 'var(--accent)' : 'var(--success)';
                      const flag = cell.records < 100 ? '*' : '';
                      const displayVal = this.state.hotspotMode === 'pct' ? `${cell.latePct}%` : `${cell.delay.toFixed(1)}d`;
                      return `
                        <td style="text-align: center; background: ${bg}; color: ${color}; font-weight: 700;">
                          ${displayVal}${flag}
                          <small style="display:block; font-size:10px; font-weight:400; color:var(--text-muted);">${cell.records} records</small>
                        </td>
                      `;
                    }).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="metric-sub" style="margin-top: 8px;">
            * Cell with asterisk (*) indicates fewer than 100 survey records. Darker red indicates acute friction.
          </div>
        </div>

        <div class="card">
          <div class="card-title">💳 Financial Inclusion Channels & Disbursement Speed</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">How delivery channel correlates with recipient waiting periods.</div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Disbursement Channel</th><th>Avg Delay</th><th>>7d Late (%)</th><th>Survey Records</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Mobile Money</b></td>
                  <td style="color: var(--danger); font-weight: 700;">10.4 days</td>
                  <td>59%</td>
                  <td>630</td>
                </tr>
                <tr>
                  <td><b>Bank-type SACCO</b></td>
                  <td>9.2 days</td>
                  <td>53%</td>
                  <td>2,205</td>
                </tr>
                <tr>
                  <td><b>Umurenge SACCO</b></td>
                  <td style="color: var(--success); font-weight: 700;">7.7 days</td>
                  <td>43%</td>
                  <td>546</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="banner-notice info" style="margin-top: 14px; margin-bottom: 0; padding: 10px;">
            <small><b>Key Insight for Planners:</b> Umurenge SACCOs achieve the fastest disbursement turnarounds (7.7 days), while mobile money disbursements experience longer delays (10.4 days) due to agent liquidity shortages in remote rural cells.</small>
          </div>
        </div>
      </div>

      <!-- Poverty Risk Proxy Model & 30 District Ranking -->
      <div class="grid grid-cols-2" style="margin-top: 24px;">
        <div class="card">
          <div class="card-title">🧮 Interactive Poverty Risk Proxy Estimator</div>
          <div class="card-subtitle" style="margin-bottom: 14px;">Evaluates household vulnerability strictly from dwelling and demographic facts without income circularity (AUC ~ 0.78).</div>
          
          <div class="grid grid-cols-2" style="margin-bottom: 10px;">
            <div class="form-group">
              <label class="form-label">Household Size</label>
              <input id="pov_size" type="number" min="1" max="15" value="6" class="form-control" oninput="window.app.calculatePovertyProxy()">
            </div>
            <div class="form-group">
              <label class="form-label">Number of Children</label>
              <input id="pov_children" type="number" min="0" max="10" value="4" class="form-control" oninput="window.app.calculatePovertyProxy()">
            </div>
          </div>

          <div class="grid grid-cols-2" style="margin-bottom: 10px;">
            <div class="form-group">
              <label class="form-label">Floor Material</label>
              <select id="pov_floor" class="form-control" onchange="window.app.calculatePovertyProxy()">
                <option value="earth">Dirt / Beaten Earth</option>
                <option value="wood">Timber / Wood</option>
                <option value="cement">Cement Screed</option>
                <option value="tile">Ceramic / Modern Tiles</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Estimated Monthly Rent</label>
              <input id="pov_rent" type="number" min="1000" step="1000" value="4000" class="form-control" oninput="window.app.calculatePovertyProxy()">
            </div>
          </div>

          <div id="povertyProxyResult" style="padding: 14px; border-radius: var(--radius-md); background: var(--bg); border: 1px solid var(--card-border); margin-top: 10px;">
            <!-- Rendered dynamically -->
          </div>
          <div class="metric-sub" style="margin-top: 6px;">
            * Rule: For geographic targeting only. Never use to automatically deny benefits to eligible individuals.
          </div>
        </div>

        <div class="card">
          <div class="card-title">🏆 National 'Help Here First' 30-District Ranking</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Composite Priority = 45% Delay + 40% Poverty Rate + 15% Food Price Index.</div>
          <div class="table-wrap" style="max-height: 380px;">
            <table>
              <thead>
                <tr><th>Rank</th><th>District</th><th>Province</th><th>Score</th><th>Delay</th><th>Poverty</th><th>Band</th></tr>
              </thead>
              <tbody>
                ${NISR_DATA.districts.map(d => `
                  <tr style="cursor: pointer;" onclick="window.app.selectDistrict('${d.name}')">
                    <td><b>#${d.rank}</b></td>
                    <td><b>${d.name}</b></td>
                    <td>${d.province}</td>
                    <td style="font-weight: 700; color: var(--primary);">${d.priority.toFixed(1)}</td>
                    <td>${d.delay.toFixed(1)}d</td>
                    <td>${d.poverty.toFixed(1)}%</td>
                    <td><span class="pill ${d.priority >= 70 ? 'pill-urgent' : d.priority >= 45 ? 'pill-high' : 'pill-neutral'}">${d.band}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Policy Recommendations linked to NST2 and Vision 2050 -->
      <div class="card" style="margin-top: 24px;">
        <div class="card-title">🎯 Actionable Policy Recommendations (NST2 & Vision 2050)</div>
        <div class="grid grid-cols-3" style="margin-top: 14px; margin-bottom: 0;">
          <div style="background: var(--bg); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--card-border);">
            <b>1. Priority Liquidity Buffering</b>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
              Direct emergency liquidity reserves to the top 7 urgent districts (Gisagara, Kirehe, Karongi, Nyaruguru, Gatsibo, Nyamagabe, Rutsiro) where average delays exceed 11 days.
            </p>
          </div>
          <div style="background: var(--bg); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--card-border);">
            <b>2. Umurenge SACCO Integration</b>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
              Strengthen SACCO cash reconciliation capabilities. Survey evidence proves SACCO recipients experience 2.7 fewer days delay than mobile money disbursements.
            </p>
          </div>
          <div style="background: var(--bg); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--card-border);">
            <b>3. Local Market Bridge Adoption</b>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
              Formalize the Isoko Bridge emergency credit and farmer registry under LODA social protection innovation pilots to achieve zero interim hunger.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // Common UI components
  renderMarketCatalog(mode) {
    if (!this.state.listings.length) {
      return `<p style="padding: 20px; color: var(--text-muted);">No produce listings currently available.</p>`;
    }

    return `
      <div class="market-grid">
        ${this.state.listings.map(l => {
          const guide = this.getPriceGuide(l.food, l.price);
          const canBuy = l.quantity > 0;
          return `
            <div class="product-card">
              <div class="product-info">
                <h4>${l.food}</h4>
                <div class="product-meta">📍 ${l.district} · Seller: <b>${l.farmer}</b></div>
                <div class="product-meta" style="margin-top: 4px;">Stock: <b>${l.quantity} kg available</b></div>
                <div style="margin-top: 8px;">
                  <span class="pill ${guide.class}">${guide.label} (NISR Median: ${guide.median} RWF)</span>
                </div>
              </div>
              <div>
                <div class="product-price">${l.price.toLocaleString()} <span>RWF / kg</span></div>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                  <input id="qty_${l.id}" type="number" min="1" max="${l.quantity}" value="5" class="form-control" style="width: 75px;" aria-label="Quantity kg">
                  <button class="btn ${mode === 'credit' ? 'btn-accent' : 'btn-primary'}" 
                    style="flex: 1;" ${canBuy ? '' : 'disabled'}
                    onclick="window.app.buyProduce(${l.id}, '${mode}')">
                    ${mode === 'credit' ? this.t("buyCredit") : this.t("buyCash")}
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  renderOrdersTable(ordersList, showDeliverBtn = false) {
    if (!ordersList || !ordersList.length) {
      return `<p style="padding: 16px; color: var(--text-muted); font-size: 13px;">No orders found in this category.</p>`;
    }

    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#Order</th>
              <th>Produce</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              ${showDeliverBtn ? '<th>Action</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${ordersList.map(o => `
              <tr>
                <td><b>#${o.id}</b></td>
                <td>${o.food}</td>
                <td>${o.kg} kg</td>
                <td><b>${o.total.toLocaleString()} RWF</b></td>
                <td>
                  <span class="pill ${o.mode === 'credit' ? 'pill-urgent' : 'pill-fair'}">
                    ${o.mode === 'credit' ? 'Bridge Credit' : 'Cash'}
                  </span>
                  ${o.repaid ? '<span class="pill pill-fair" style="margin-left: 4px;">Repaid</span>' : ''}
                </td>
                <td>
                  <span class="pill ${o.status === 'Delivered' ? 'pill-fair' : 'pill-high'}">
                    ${o.status}
                  </span>
                  ${o.paidBy ? `<small style="display:block; font-size:10px; color:var(--text-muted);">Paid by ${o.paidBy}</small>` : ''}
                </td>
                ${showDeliverBtn ? `
                  <td>
                    ${o.status === 'Placed' 
                      ? `<button class="btn btn-sm btn-primary" onclick="window.app.deliverOrder(${o.id})">Mark Delivered</button>`
                      : '<span style="color: var(--success); font-weight:600;">Completed</span>'}
                  </td>
                ` : ''}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderDistrictInfo(districtName) {
    const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === districtName.toLowerCase()) || NISR_DATA.districts[0];
    return `
      <div style="font-size: 20px; font-weight: 800; color: var(--primary);">${d.name} District</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Province: <b>${d.province}</b></div>

      <div style="margin-bottom: 8px;">
        <span class="pill ${d.priority >= 70 ? 'pill-urgent' : d.priority >= 45 ? 'pill-high' : 'pill-neutral'}">${d.band}</span>
        <span class="pill pill-neutral">National Rank #${d.rank} of 30</span>
      </div>

      <table style="margin-top: 12px; font-size: 12px;">
        <tr><td>Average Payment Delay:</td><td><b>${d.delay.toFixed(1)} days</b></td></tr>
        <tr><td>Estimated Poverty Rate:</td><td><b>${d.poverty.toFixed(1)}%</b></td></tr>
        <tr><td>Composite Priority Score:</td><td><b style="color: var(--primary);">${d.priority.toFixed(1)} / 100</b></td></tr>
        <tr><td>Food Price Index:</td><td><b>${d.priceIdx.toFixed(2)}x</b></td></tr>
        <tr><td>NISR Sample Records:</td><td><b>${d.records} households</b> ${d.records < 100 ? '<small style="color:var(--danger);">(<100)</small>' : ''}</td></tr>
      </table>
    `;
  }

  selectDistrict(name) {
    this.state.selectedDistrict = name;
    const infoEl = document.getElementById("districtSelectedInfo");
    if (infoEl) infoEl.innerHTML = this.renderDistrictInfo(name);
    this.toast(`Selected ${name} District`, "info");
  }

  setMapMetric(metric) {
    this.mapMetric = metric;
    this.render();
  }

  initPlannerVisuals() {
    this.calculatePovertyProxy();
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  calculatePovertyProxy() {
    const sizeEl = document.getElementById("pov_size");
    const childEl = document.getElementById("pov_children");
    const floorEl = document.getElementById("pov_floor");
    const rentEl = document.getElementById("pov_rent");
    const resEl = document.getElementById("povertyProxyResult");
    if (!sizeEl || !childEl || !floorEl || !rentEl || !resEl) return;

    const size = parseFloat(sizeEl.value) || 4;
    const children = parseFloat(childEl.value) || 2;
    const floor = floorEl.value;
    const rent = parseFloat(rentEl.value) || 10000;

    let logOdds = -1.25;
    logOdds += 0.28 * (size - 4.0);
    logOdds += 0.35 * children;

    const floorWeights = { earth: 0.85, wood: 0.10, cement: -0.65, tile: -1.40 };
    logOdds += floorWeights[floor] || 0;

    if (rent <= 5000) logOdds += 0.60;
    else if (rent <= 15000) logOdds += 0.10;
    else if (rent <= 30000) logOdds -= 0.50;
    else logOdds -= 1.30;

    const prob = 1.0 / (1.0 + Math.exp(-logOdds));
    const pct = Math.round(prob * 100);

    let band = "Low Risk (Relatively Resilient)";
    let pillClass = "pill-fair";
    if (pct >= 70) {
      band = "High Risk (Likely Extremely Poor)";
      pillClass = "pill-urgent";
    } else if (pct >= 45) {
      band = "Moderate Risk (Vulnerable Household)";
      pillClass = "pill-high";
    }

    resEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 12px; color: var(--text-muted);">Estimated Poverty Probability:</div>
          <div style="font-size: 24px; font-weight: 800;">${pct}%</div>
        </div>
        <span class="pill ${pillClass}">${band}</span>
      </div>
    `;
  }

  initMap() {
    const mapEl = document.getElementById("mapContainer");
    if (!mapEl) return;

    // Check if Leaflet is available and online
    if (window.L && window.RWANDA_DISTRICTS_GEOJSON) {
      try {
        if (this.map) {
          this.map.remove();
          this.map = null;
        }

        this.map = L.map("mapContainer", {
          center: [-1.9403, 29.8739],
          zoom: 9,
          zoomControl: true
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 12,
          minZoom: 8,
          attribution: '© OpenStreetMap contributors | NISR'
        }).addTo(this.map);

        const getMetricValue = (dName) => {
          const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === dName.toLowerCase());
          if (!d) return 0;
          if (this.mapMetric === "delay") return d.delay;
          if (this.mapMetric === "poverty") return d.poverty;
          return d.priority;
        };

        const getColor = (val) => {
          if (this.mapMetric === "priority") {
            return val >= 75 ? "#991b1b" :
                   val >= 60 ? "#dc2626" :
                   val >= 45 ? "#ea580c" :
                   val >= 30 ? "#eab308" :
                               "#16a34a";
          }
          if (this.mapMetric === "delay") {
            return val >= 13 ? "#991b1b" :
                   val >= 10 ? "#dc2626" :
                   val >= 8  ? "#ea580c" :
                   val >= 6  ? "#eab308" :
                               "#16a34a";
          }
          return val >= 42 ? "#991b1b" :
                 val >= 35 ? "#dc2626" :
                 val >= 28 ? "#ea580c" :
                 val >= 20 ? "#eab308" :
                             "#16a34a";
        };

        const styleFeature = (feature) => {
          const name = feature.properties.shapeName || feature.properties.ADM2_EN || feature.properties.NAME_2 || "";
          const val = getMetricValue(name);
          return {
            fillColor: getColor(val),
            weight: 1.5,
            opacity: 1,
            color: "#ffffff",
            dashArray: "",
            fillOpacity: 0.75
          };
        };

        this.mapLayer = L.geoJson(window.RWANDA_DISTRICTS_GEOJSON, {
          style: styleFeature,
          onEachFeature: (feature, layer) => {
            const name = feature.properties.shapeName || feature.properties.ADM2_EN || feature.properties.NAME_2 || "District";
            const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === name.toLowerCase());
            
            if (d) {
              layer.bindTooltip(`<b>${d.name}</b><br>Delay: ${d.delay.toFixed(1)}d · Poverty: ${d.poverty.toFixed(1)}% · Score: ${d.priority.toFixed(1)}`, {
                sticky: true
              });
            }

            layer.on({
              mouseover: (e) => {
                const l = e.target;
                l.setStyle({ weight: 3, color: '#0e635e', fillOpacity: 0.9 });
                l.bringToFront();
              },
              mouseout: (e) => {
                this.mapLayer.resetStyle(e.target);
              },
              click: () => {
                this.selectDistrict(name);
              }
            });
          }
        }).addTo(this.map);

        this.map.fitBounds(this.mapLayer.getBounds());
        return;
      } catch (err) {
        console.warn("Leaflet error, falling back to built-in SVG map:", err);
      }
    }

    // Built-in Offline SVG Fallback
    this.renderOfflineSvgMap(mapEl);
  }

  renderOfflineSvgMap(container) {
    if (!window.RWANDA_DISTRICTS_GEOJSON) return;
    
    // Bounds: Rwanda is roughly Longitude 28.8 to 30.9, Latitude -2.9 to -1.0
    const minX = 28.8, maxX = 30.9, minY = -2.9, maxY = -1.0;
    const width = 600, height = 450;
    const scaleX = width / (maxX - minX);
    const scaleY = height / (maxY - minY);

    const project = (lng, lat) => {
      const x = (lng - minX) * scaleX;
      const y = height - (lat - minY) * scaleY;
      return [x, y];
    };

    let paths = "";
    window.RWANDA_DISTRICTS_GEOJSON.features.forEach(feat => {
      const name = feat.properties.shapeName || "District";
      const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === name.toLowerCase());
      const val = d ? (this.mapMetric === 'delay' ? d.delay : this.mapMetric === 'poverty' ? d.poverty : d.priority) : 50;
      
      let col = "#16a34a";
      if (this.mapMetric === 'priority') {
        col = val >= 75 ? "#991b1b" : val >= 60 ? "#dc2626" : val >= 45 ? "#ea580c" : val >= 30 ? "#eab308" : "#16a34a";
      } else if (this.mapMetric === 'delay') {
        col = val >= 13 ? "#991b1b" : val >= 10 ? "#dc2626" : val >= 8 ? "#ea580c" : val >= 6 ? "#eab308" : "#16a34a";
      } else {
        col = val >= 42 ? "#991b1b" : val >= 35 ? "#dc2626" : val >= 28 ? "#ea580c" : val >= 20 ? "#eab308" : "#16a34a";
      }

      const geom = feat.geometry;
      let dAttr = "";
      const addPolygon = (rings) => {
        rings.forEach(ring => {
          ring.forEach((pt, i) => {
            const [px, py] = project(pt[0], pt[1]);
            dAttr += (i === 0 ? "M" : "L") + px.toFixed(1) + "," + py.toFixed(1);
          });
          dAttr += "Z";
        });
      };

      if (geom.type === "Polygon") {
        addPolygon(geom.coordinates);
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach(poly => addPolygon(poly));
      }

      paths += `<path d="${dAttr}" fill="${col}" stroke="#ffffff" stroke-width="1" style="cursor:pointer; transition: opacity 0.2s;" 
        onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'" onclick="window.app.selectDistrict('${name}')">
        <title>${name}: ${d ? (this.mapMetric === 'delay' ? d.delay + ' days' : this.mapMetric === 'poverty' ? d.poverty + '%' : d.priority + ' score') : ''}</title>
      </path>`;
    });

    container.innerHTML = `
      <div style="background: var(--card-bg); border-radius: var(--radius-md); padding: 12px; text-align: center;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; max-height: 420px; display: block; margin: 0 auto;">
          ${paths}
        </svg>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
          Self-Contained Offline GIS Vector Map · Hover over or click any district to inspect details.
        </div>
      </div>
    `;
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.app = new IsokoApp();
  window.app.init();
});
