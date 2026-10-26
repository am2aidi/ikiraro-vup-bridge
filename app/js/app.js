/**
 * Isoko Bridge - Comprehensive Application Logic
 * Integrates:
 * 1. Opening Landing Page with Tailored Onboarding Questionnaires
 * 2. Visual Grocery Store with Produce Photos (Upload, Camera, or Curated Gallery)
 * 3. Rwanda VUP Disbursement Schedule & Delay Calendar (NISR Survey Dates)
 * 4. Realistic Rwandan Payment Sheet (MTN MoMo, Airtel, BK, Umurenge SACCO)
 * 5. Animated Printable Order Receipts
 * 6. Evidence Dashboards & Interactive 30-District GIS Map
 */

// Curated Produce Photography (High quality web links with reliable SVG/Emoji fallbacks)

// 1. EXTENDED RWANDAN HARVEST PRODUCTION & GALLERY
const HARVEST_GALLERY = {
  "Dry beans": { img: "assets/produce/dry_beans.jpg", icon: "🫘", kiny: "Ibihyimbo", category: "Pulses", retailPrice: 920, defaultDistrict: "Kirehe", hub: "Gatore Food Bank & SACCO Point" },
  "Irish potato": { img: "assets/produce/irish_potato.jpg", icon: "🥔", kiny: "Ibirayi", category: "Staples", retailPrice: 520, defaultDistrict: "Nyabihu", hub: "Mukamira Highland Depot" },
  "Sweet potato": { img: "assets/produce/sweet_potato.jpg", icon: "🍠", kiny: "Ibijumba", category: "Staples", retailPrice: 320, defaultDistrict: "Gisagara", hub: "Gisagara Agro-Hub" },
  "Tomato": { img: "assets/produce/tomato.jpg", icon: "🍅", kiny: "Inyanya", category: "Vegetables", retailPrice: 620, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub & SACCO" },
  "Cooking banana": { img: "assets/produce/cooking_banana.jpg", icon: "🍌", kiny: "Ibitoki", category: "Staples", retailPrice: 380, defaultDistrict: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot" },
  "Onion": { img: "assets/produce/red_onion.jpg", icon: "🧅", kiny: "Ibitunguru", category: "Vegetables", retailPrice: 1950, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub & SACCO" },
  "Local rice": { img: "assets/produce/local_rice.jpg", icon: "🍚", kiny: "Umuceri", category: "Grains", retailPrice: 1380, defaultDistrict: "Kicukiro", hub: "Gikondo Agro-Terminal" },
  "Corn flour (factory)": { img: "assets/produce/fresh_corn.jpg", icon: "🌽", kiny: "Ifu y'Ibigori", category: "Grains", retailPrice: 960, defaultDistrict: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot" },
  "Avocado": { img: "assets/produce/avocado.jpg", icon: "🥑", kiny: "Avoka", category: "Fruits", retailPrice: 350, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub & SACCO" },
  "Spinach": { img: "assets/produce/spinach.jpg", icon: "🥬", kiny: "Dodo / Imbwija", category: "Vegetables", retailPrice: 300, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub & SACCO" },
  "Cassava roots": { img: "assets/produce/sweet_potato.jpg", icon: "🪵", kiny: "Imyumbati", category: "Staples", retailPrice: 280, defaultDistrict: "Ruhango", hub: "Ruhango Central Market Point" },
  "Passion fruit": { img: "assets/produce/avocado.jpg", icon: "🫐", kiny: "Marakuja", category: "Fruits", retailPrice: 1200, defaultDistrict: "Musanze", hub: "Musanze Central Produce Depot" },
  "Tree tomatoes": { img: "assets/produce/tomato.jpg", icon: "🍅", kiny: "Ibinyomoro", category: "Fruits", retailPrice: 1100, defaultDistrict: "Burera", hub: "Burera Highland Agro-Hub" },
  "Carrots": { img: "assets/produce/sweet_potato.jpg", icon: "🥕", kiny: "Amakaroti", category: "Vegetables", retailPrice: 450, defaultDistrict: "Gicumbi", hub: "Gicumbi High-Altitude Center" },
  "Green cabbage": { img: "assets/produce/spinach.jpg", icon: "🥬", kiny: "Amashu", category: "Vegetables", retailPrice: 350, defaultDistrict: "Musanze", hub: "Musanze Central Produce Depot" },
  "Green peppers": { img: "assets/produce/spinach.jpg", icon: "🫑", kiny: "Urusenda", category: "Vegetables", retailPrice: 850, defaultDistrict: "Bugesera", hub: "Bugesera Rice & Veg Depot" },
  "Soybeans": { img: "assets/produce/dry_beans.jpg", icon: "🫘", kiny: "Soya", category: "Pulses", retailPrice: 750, defaultDistrict: "Kayonza", hub: "Kayonza Agro-Depot" },
  "Groundnuts": { img: "assets/produce/dry_beans.jpg", icon: "🥜", kiny: "Ubunyobwa", category: "Pulses", retailPrice: 1800, defaultDistrict: "Ngoma", hub: "Ngoma Farmers Hub" }
};

// 2. ALL 30 RWANDAN DISTRICTS ORGANIZED BY PROVINCE
const RWANDA_PROVINCES = {
  "Kigali City": ["Gasabo", "Nyarugenge", "Kicukiro"],
  "Northern Province": ["Musanze", "Gicumbi", "Burera", "Gakenke", "Rulindo"],
  "Southern Province": ["Huye", "Gisagara", "Muhanga", "Kamonyi", "Ruhango", "Nyanza", "Nyamagabe", "Nyaruguru"],
  "Eastern Province": ["Kirehe", "Bugesera", "Rwamagana", "Gatsibo", "Kayonza", "Ngoma", "Nyagatare"],
  "Western Province": ["Rubavu", "Nyabihu", "Karongi", "Rusizi", "Nyamasheke", "Rutsiro", "Ngororero"]
};

// Approximate District Center Coordinates for Real-Time Distance Calculation (km)
const DISTRICT_COORDS = {
  "Gasabo": [-1.890, 30.130], "Nyarugenge": [-1.954, 30.058], "Kicukiro": [-1.980, 30.100],
  "Musanze": [-1.498, 29.635], "Gicumbi": [-1.602, 30.098], "Burera": [-1.455, 29.832], "Gakenke": [-1.698, 29.789], "Rulindo": [-1.733, 29.992],
  "Huye": [-2.597, 29.740], "Gisagara": [-2.618, 29.845], "Muhanga": [-2.080, 29.754], "Kamonyi": [-2.005, 29.897], "Ruhango": [-2.223, 29.778], "Nyanza": [-2.352, 29.751], "Nyamagabe": [-2.476, 29.508], "Nyaruguru": [-2.721, 29.531],
  "Kirehe": [-2.268, 30.651], "Bugesera": [-2.185, 30.125], "Rwamagana": [-1.949, 30.435], "Gatsibo": [-1.610, 30.457], "Kayonza": [-1.921, 30.562], "Ngoma": [-2.176, 30.508], "Nyagatare": [-1.298, 30.324],
  "Rubavu": [-1.677, 29.261], "Nyabihu": [-1.657, 29.500], "Karongi": [-2.155, 29.351], "Rusizi": [-2.484, 28.907], "Nyamasheke": [-2.348, 29.138], "Rutsiro": [-1.942, 29.324], "Ngororero": [-1.865, 29.625]
};

// Haversine formula to compute distance between two Rwandan districts (in km)
function calculateRwandaDistance(d1, d2) {
  if (!d1 || !d2) return 1.5;
  if (d1.toLowerCase() === d2.toLowerCase()) return 0.8;
  const c1 = DISTRICT_COORDS[d1] || [-1.940, 30.060];
  const c2 = DISTRICT_COORDS[d2] || [-1.940, 30.060];
  const R = 6371; // km
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLon = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10;
}

// 3. RWANDAN PAYMENT ACCOUNTS (Matching media_1792662744615.html)
const RWANDA_PAYMENT_ACCOUNTS = [
  { n: 'MTN MoMo', s: '078 123 4567', t: 'mobile', c: 'background:#ffcb05;color:#000', l: 'MoMo', by: 'MTN MOMO', bal: 500000 },
  { n: 'Airtel Money', s: '073 123 4567', t: 'mobile', c: 'background:#e40000;color:#fff', l: 'airtel', by: 'AIRTEL TIGO MONEY', bal: 1500 },
  { n: 'BK Debit', s: '•••• 4821', t: 'card', c: 'background:#0a5ca8;color:#fff', l: 'BK', by: 'BK DEBIT', bal: 1500 },
  { n: 'BK Credit', s: '•••• 7730', t: 'card', c: 'background:#0a5ca8;color:#fff', l: 'BK', by: 'BK CREDIT', bal: 800000, credit: true },
  { n: 'Umurenge SACCO', s: 'Local SACCO Point', t: 'card', c: 'background:#15803d;color:#fff', l: 'SACCO', by: 'UMURENGE SACCO', bal: 250000 },
  { n: 'Mastercard Debit', s: '•••• 5521', t: 'card', c: 'background:#222;color:#fff', l: 'MC', by: 'MASTERCARD DEBIT', bal: 320000 },
  { n: 'Visa Debit', s: '•••• 4012', t: 'card', c: 'background:#1a1f71;color:#fff', l: 'VISA', by: 'VISA DEBIT', bal: 1500 }
];

const TOPUP_CHIPS = [
  { l: '+ RWF 1,500', v: 1500 },
  { l: '+ $5 (7,250 RWF)', v: 7250 },
  { l: '+ RWF 50,000', v: 50000 },
  { l: '+ RWF 500,000', v: 500000 }
];


const DEFAULT_STATE = {
  theme: "light",
  lang: "en",
  currentView: "home",
  role: "Family",
  activeCategory: "All",
  nearby: {
    userDistrict: "Gasabo",
    userLocation: "Gasabo (Kimironko Hub)",
    filterProximity: "all", // "all", "near", "district", "fast", "sacco"
    deliveryOption: "moto" // "moto" (+300 RWF) or "pickup" (0 RWF)
  },
  selectedAccountIdx: 0,
  currentUser: {
    username: "amina_family",
    name: "Amina Uwase",
    role: "Family",
    district: "Kirehe",
    programme: "Direct Support",
    householdSize: 5,
    daysLate: 8,
    donationPct: 2,
    momo: "0788123456"
  },
  sampleQ: {
    daysLate: 8,
    householdSize: 5
  },
  pool: {
    balance: 25000,
    totalGiftsIn: 25000,
    totalPaidToFarmers: 0,
    totalRepaidByVup: 0
  },
  // 18 Diverse Rwandan Harvest Productions
  listings: [
    { id: 1, food: "Dry beans", district: "Kirehe", hub: "Gatore Food Bank & SACCO Point", price: 780, retailPrice: 920, quantity: 200, farmer: "Mukamana Farm", momo: "0788123456", photo: "assets/produce/dry_beans.jpg", isFav: false },
    { id: 2, food: "Sweet potato", district: "Gisagara", hub: "Gisagara Agro-Hub", price: 240, retailPrice: 320, quantity: 350, farmer: "Gisagara Agrilink", momo: "0788234567", photo: "assets/produce/sweet_potato.jpg", isFav: false },
    { id: 3, food: "Irish potato", district: "Nyabihu", hub: "Mukamira Highland Depot", price: 440, retailPrice: 520, quantity: 500, farmer: "Nyabihu Potato Coop", momo: "0788654321", photo: "assets/produce/irish_potato.jpg", isFav: true },
    { id: 4, food: "Tomato", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", price: 480, retailPrice: 620, quantity: 90, farmer: "Kimironko Fresh Growers", momo: "0788345678", photo: "assets/produce/tomato.jpg", isFav: true },
    { id: 5, food: "Cooking banana", district: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", price: 290, retailPrice: 380, quantity: 250, farmer: "Nyabugogo Agro Cooperative", momo: "0788456789", photo: "assets/produce/cooking_banana.jpg", isFav: false },
    { id: 6, food: "Onion", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", price: 1600, retailPrice: 1950, quantity: 80, farmer: "Kimironko Green Sellers", momo: "0788567890", photo: "assets/produce/red_onion.jpg", isFav: false },
    { id: 7, food: "Local rice", district: "Kicukiro", hub: "Gikondo Agro-Terminal", price: 1180, retailPrice: 1380, quantity: 180, farmer: "Kigali Rice Millers", momo: "0788789012", photo: "assets/produce/local_rice.jpg", isFav: false },
    { id: 8, food: "Avocado", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", price: 280, retailPrice: 350, quantity: 120, farmer: "Kigali Agro Coop", momo: "0788890123", photo: "assets/produce/avocado.jpg", isFav: true },
    { id: 9, food: "Spinach", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", price: 250, retailPrice: 300, quantity: 60, farmer: "Nyabarongo Valley Fresh", momo: "0788901234", photo: "assets/produce/spinach.jpg", isFav: false },
    { id: 10, food: "Corn flour (factory)", district: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", price: 790, retailPrice: 960, quantity: 150, farmer: "Bugarama Grain Mills", momo: "0788012345", photo: "assets/produce/fresh_corn.jpg", isFav: false },
    { id: 11, food: "Cassava roots", district: "Ruhango", hub: "Ruhango Central Market Point", price: 220, retailPrice: 280, quantity: 400, farmer: "Ruhango Cassava Farmers", momo: "0788112233", photo: "assets/produce/sweet_potato.jpg", isFav: false },
    { id: 12, food: "Passion fruit", district: "Musanze", hub: "Musanze Central Produce Depot", price: 950, retailPrice: 1200, quantity: 70, farmer: "Musanze Highland Fruit Coop", momo: "0788223344", photo: "assets/produce/avocado.jpg", isFav: true },
    { id: 13, food: "Tree tomatoes", district: "Burera", hub: "Burera Highland Agro-Hub", price: 880, retailPrice: 1100, quantity: 85, farmer: "Burera Tamarillo Growers", momo: "0788334455", photo: "assets/produce/tomato.jpg", isFav: false },
    { id: 14, food: "Carrots", district: "Gicumbi", hub: "Gicumbi High-Altitude Center", price: 360, retailPrice: 450, quantity: 140, farmer: "Gicumbi Organic Valley", momo: "0788445566", photo: "assets/produce/sweet_potato.jpg", isFav: false },
    { id: 15, food: "Green cabbage", district: "Musanze", hub: "Musanze Central Produce Depot", price: 260, retailPrice: 350, quantity: 220, farmer: "Volcanoes Green Coop", momo: "0788556677", photo: "assets/produce/spinach.jpg", isFav: false },
    { id: 16, food: "Green peppers", district: "Bugesera", hub: "Bugesera Rice & Veg Depot", price: 680, retailPrice: 850, quantity: 95, farmer: "Bugesera Irrigation Scheme", momo: "0788667788", photo: "assets/produce/spinach.jpg", isFav: false },
    { id: 17, food: "Soybeans", district: "Kayonza", hub: "Kayonza Agro-Depot", price: 620, retailPrice: 750, quantity: 300, farmer: "Kayonza Grain Link", momo: "0788778899", photo: "assets/produce/dry_beans.jpg", isFav: false },
    { id: 18, food: "Groundnuts", district: "Ngoma", hub: "Ngoma Farmers Hub", price: 1450, retailPrice: 1800, quantity: 110, farmer: "Ngoma Women Agrilink", momo: "0788889900", photo: "assets/produce/dry_beans.jpg", isFav: true }
  ],
  orders: [
    { id: 101, food: "Dry beans", kg: 10, total: 7800, mode: "credit", buyerRole: "Family", buyerName: "Amina Uwase", district: "Kirehe", status: "Delivered", farmer: "Mukamana Farm", paidBy: "pool", deliveryType: "Free SACCO Pickup", repaid: false, date: "2026-10-22 08:30" },
    { id: 102, food: "Tomato", kg: 8, total: 3840, mode: "cash", buyerRole: "Shopper", buyerName: "Grace Ingabire", district: "Gasabo", status: "Delivered", farmer: "Kimironko Fresh Growers", paidBy: "MTN MoMo", gift: 77, deliveryType: "Express Moto (15m)", date: "2026-10-22 09:15" }
  ],
  nextOrderId: 103,
  nextListingId: 19,
  selectedDistrict: "Gasabo",
  hotspotMode: "delay",
  selectedPayMethod: "momo",
  pendingCheckoutOrder: null
};

class IsokoApp {
  constructor() {
    this.state = this.loadState();
    this.map = null;
    this.mapLayer = null;
    this.mapMetric = "priority";
  }

  loadState() {
    try {
      const saved = localStorage.getItem("isoko_bridge_state_v3");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem("isoko_bridge_state_v3", JSON.stringify(this.state));
    } catch (e) {}
    this.updateHeaderTicker();
  }

  resetState() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
    this.render();
    this.toast("State reset to demo values.", "info");
  }

  init() {
    this.applyTheme();
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

  goHome() {
    this.state.currentView = "home";
    this.saveState();
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  enterRole(role, username = null) {
    this.state.currentView = "dashboard";
    this.state.role = role;
    if (username) {
      const account = NISR_DATA.demoAccounts.find(a => a.username === username);
      if (account) this.state.currentUser = { ...this.state.currentUser, ...account };
    } else {
      const account = NISR_DATA.demoAccounts.find(a => a.role === role);
      if (account) this.state.currentUser = { ...this.state.currentUser, ...account };
    }
    this.saveState();
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.toast(`Viewing portal as ${this.state.currentUser.name} (${role})`, "success");
  }

  setUser(username) {
    const account = NISR_DATA.demoAccounts.find(a => a.username === username);
    if (account) {
      this.state.currentUser = { ...this.state.currentUser, ...account };
      this.state.role = account.role;
      this.state.currentView = "dashboard";
      this.saveState();
      this.render();
      this.toast(`Active session: ${account.name} (${account.role})`, "success");
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
    const dpp = NISR_DATA.overall.dailyFoodBasketCostRwf;
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

  showReceipt(order, payMethod) {
    const modal = document.getElementById("receiptModal");
    const paper = document.getElementById("receiptPaper");
    if (!modal || !paper) return;

    paper.innerHTML = `
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
      <div class="receipt-stamp">PAID<small style="font-size:7px;display:block;">APPROVED</small></div>
      <div style="text-align: center; margin-top: 24px; font-size: 10px; color: #888;">
        Murakoze cyane · Supporting Rwandan Farmers & Families
      </div>
    `;

    modal.classList.add("open");
  }

  deliverOrder(orderId) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order || order.status === "Delivered") return;

    if (order.mode === "credit") {
      if (this.state.pool.balance < order.total) {
        this.toast("Pool balance low. Shopper donations refill the pool.", "warning");
        return;
      }
      this.state.pool.balance -= order.total;
      this.state.pool.totalPaidToFarmers += order.total;
      order.paidBy = "pool";
    }

    order.status = "Delivered";
    this.saveState();
    this.render();
    this.toast(`Order #${orderId} marked Delivered. Farmer paid via ${order.paidBy === 'pool' ? 'Bridge Pool' : 'Buyer Cash'}.`, "success");
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
    this.toast(`VUP Treasury payments arrived! ${count} family credits (${totalRepaid.toLocaleString()} RWF) repaid into social pool.`, "success");
  }

  // Handle Photo Picker for Produce Listing (Upload, Camera, or Choose Ours)
  setListingPhoto(url) {
    const preview = document.getElementById("listingPhotoPreview");
    const hiddenInput = document.getElementById("new_photo_url");
    if (preview) preview.src = url;
    if (hiddenInput) hiddenInput.value = url;
  }

  handleCustomPhotoUpload(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setListingPhoto(e.target.result);
        this.toast("Harvest photo attached successfully!", "success");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addListing(event) {
    event.preventDefault();
    const food = document.getElementById("new_food").value;
    const district = document.getElementById("new_district").value;
    const price = parseFloat(document.getElementById("new_price").value);
    const quantity = parseFloat(document.getElementById("new_qty").value);
    const momo = document.getElementById("new_momo").value || "0788123456";
    const photoUrl = document.getElementById("new_photo_url").value || (HARVEST_GALLERY[food] ? HARVEST_GALLERY[food].img : "");

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
      momo,
      photo: photoUrl
    };

    this.state.listings.unshift(newListing);
    this.saveState();
    this.render();
    const guide = this.getPriceGuide(food, price);
    this.toast(`Produce listing added with photo! Rated ${guide.label} vs NISR median.`, "success");
  }

  updateHeaderTicker() {
    const el = document.getElementById("poolTickerAmount");
    if (el) el.textContent = `${this.state.pool.balance.toLocaleString()} RWF`;
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

  updateSampleCalc() {
    const daysEl = document.getElementById("sq_days");
    const sizeEl = document.getElementById("sq_size");
    const resEl = document.getElementById("sq_result_val");
    const textEl = document.getElementById("sq_result_text");
    if (!daysEl || !sizeEl || !resEl) return;

    const days = parseInt(daysEl.value) || 0;
    const size = parseInt(sizeEl.value) || 1;
    const dpp = NISR_DATA.overall.dailyFoodBasketCostRwf;
    const totalCredit = days > 0 ? (size * dpp * days) : 0;

    resEl.textContent = `${totalCredit.toLocaleString()} RWF`;
    if (textEl) {
      textEl.textContent = days > 0 
        ? `Covers ${days} days of beans, sweet potatoes & vegetables for ${size} people.` 
        : `Payment is on time. Zero credit required.`;
    }
  }

  render() {
    this.updateHeaderTicker();
    const mainEl = document.getElementById("appView");
    if (!mainEl) return;

    if (this.state.currentView === "home") {
      mainEl.innerHTML = this.renderOpeningPage();
      this.updateSampleCalc();
    } else {
      mainEl.innerHTML = this.renderDashboardWrapper();
      if (this.state.role === "Planner") {
        this.initPlannerVisuals();
      } else if (this.state.role === "Farmer") {
        this.updatePriceGuidePreview();
      }
    }
  }



  // =========================================================================
  // 1. SLIDING LOGIN & SIGN UP CONTROLLER (media_1792662744651.html)
  // =========================================================================
  openAuthModal(mode = 'login') {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    this.setAuthMode(mode);
    modal.classList.add("open");
  }

  closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.classList.remove("open");
  }

  setAuthMode(mode) {
    const card = document.getElementById("authCardV5");
    if (card) card.setAttribute("data-mode", mode);
  }

  // As user instructed: No credentials needed! 1-click sample login
  quickLoginSample(username) {
    const acc = NISR_DATA.demoAccounts.find(a => a.username === username);
    if (!acc) return;
    this.state.currentUser = { ...this.state.currentUser, ...acc };
    this.state.role = acc.role;
    this.state.currentView = "dashboard";
    this.saveState();
    this.closeAuthModal();
    this.render();
    this.toast(`Welcome back, ${acc.name}! Logged in as ${acc.role}.`, "success");
  }

  handleAuthSubmit(event, formType) {
    event.preventDefault();
    if (formType === 'login') {
      const u = document.getElementById("li_user").value.trim();
      const matched = NISR_DATA.demoAccounts.find(a => a.username.toLowerCase() === u.toLowerCase() || a.name.toLowerCase().includes(u.toLowerCase()));
      if (matched) {
        this.quickLoginSample(matched.username);
      } else {
        // Fallback default
        this.state.currentUser.name = u || "Demo User";
        this.state.currentView = "dashboard";
        this.saveState();
        this.closeAuthModal();
        this.render();
        this.toast(`Signed in as ${this.state.currentUser.name} (${this.state.role})`, "success");
      }
    } else {
      const u = document.getElementById("su_user").value.trim();
      const role = document.getElementById("su_role").value;
      this.state.currentUser.name = u || "New Member";
      this.state.role = role;
      this.state.currentView = "dashboard";
      this.saveState();
      this.closeAuthModal();
      this.render();
      this.toast(`Account created! Logged in as ${role}.`, "success");
    }
  }

  // =========================================================================
  // 2. UNIVERSAL LOCATION & PROXIMITY FILTERING ("The Place You Are")
  // =========================================================================
  renderNearbyBar() {
    const nb = this.state.nearby || { userDistrict: "Gasabo", userLocation: "Gasabo (Kimironko Hub)", filterProximity: "all" };
    const curDist = nb.userDistrict || "Gasabo";

    return `
      <div class="nearby-bar">
        <div class="nearby-loc-badge">
          <div class="pin-icon">📍</div>
          <div>
            <div class="loc-title">The Place You Are Right Now (Your Location):</div>
            <div style="display:flex; align-items:center; gap:8px; margin-top:2px; flex-wrap:wrap;">
              <select class="form-control" style="width:auto; padding:4px 10px; font-weight:800; font-size:13px; border-radius:18px; background:var(--card-bg);" 
                      onchange="window.app.setUserDistrict(this.value)">
                ${Object.keys(RWANDA_PROVINCES).map(prov => `
                  <optgroup label="${prov}">
                    ${RWANDA_PROVINCES[prov].map(d => `
                      <option value="${d}" ${d === curDist ? 'selected' : ''}>${d} District (${prov})</option>
                    `).join('')}
                  </optgroup>
                `).join('')}
              </select>
              <button class="btn btn-sm btn-primary" style="padding:4px 10px; font-size:11px; border-radius:14px;" onclick="window.app.detectUserLocation()">
                🎯 Detect My GPS
              </button>
            </div>
          </div>
        </div>

        <div class="nearby-filters-row">
          <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Show Sellers:</span>
          <button class="hub-chip ${(!nb.filterProximity || nb.filterProximity === 'all') ? 'active' : ''}" onclick="window.app.setProximityFilter('all')">
            🇷🇼 All Rwanda
          </button>
          <button class="hub-chip ${nb.filterProximity === 'near' ? 'active' : ''}" onclick="window.app.setProximityFilter('near')" title="Sorted closest to you first">
            📍 Nearest (< 5 km)
          </button>
          <button class="hub-chip ${nb.filterProximity === 'district' ? 'active' : ''}" onclick="window.app.setProximityFilter('district')" title="Only sellers in ${curDist}">
            🏙️ In ${curDist}
          </button>
          <button class="hub-chip ${nb.filterProximity === 'fast' ? 'active' : ''}" onclick="window.app.setProximityFilter('fast')">
            ⚡ Fast Moto (< 20m)
          </button>
          <button class="hub-chip ${nb.filterProximity === 'sacco' ? 'active' : ''}" onclick="window.app.setProximityFilter('sacco')">
            🚶 Walk-in SACCO Hub
          </button>
        </div>
      </div>
    `;
  }

  setUserDistrict(districtName) {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.userDistrict = districtName;
    this.state.nearby.userLocation = `${districtName} (Local Hub)`;
    this.saveState();
    this.render();
    this.toast(`Location set to ${districtName}! Recalculated distance to all 18 farm sellers.`, "success");
  }

  detectUserLocation() {
    this.toast("Acquiring device GPS coordinates...", "info");
    setTimeout(() => {
      this.setUserDistrict("Gasabo");
      this.toast("📍 GPS calibrated: Gasabo - Kimironko Hub (±12m accuracy)", "success");
    }, 500);
  }

  setProximityFilter(filter) {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.filterProximity = filter;
    this.saveState();
    this.render();
    const labels = {
      all: "Showing all Rwandan sellers",
      near: "Filtered to nearest sellers (< 5 km)",
      district: `Filtered to sellers in ${this.state.nearby.userDistrict}`,
      fast: "Filtered to fastest delivery (< 20 mins)",
      sacco: "Filtered to local SACCO collection points"
    };
    this.toast(labels[filter] || "Filter applied", "info");
  }

  // =========================================================================
  // 3. GROCERY CATALOG RENDERING WITH LIVE DISTANCE TO CURRENT USER LOCATION
  // =========================================================================
  renderGroceryCatalog(mode) {
    const curDist = (this.state.nearby && this.state.nearby.userDistrict) || "Gasabo";
    const filter = (this.state.nearby && this.state.nearby.filterProximity) || "all";

    // 1. Calculate live dynamic distance from user's current place to each seller
    let items = this.state.listings.map(l => {
      const dist = calculateRwandaDistance(curDist, l.district);
      const deliveryMins = dist <= 1.0 ? 12 : dist <= 5.0 ? 18 : dist <= 15 ? 25 : Math.round(dist * 1.5);
      return {
        ...l,
        dynamicDistanceKm: dist,
        dynamicDeliveryMins: deliveryMins,
        isLocalDistrict: (l.district.toLowerCase() === curDist.toLowerCase())
      };
    });

    // 2. Category filter
    if (this.state.activeCategory && this.state.activeCategory !== "All") {
      items = items.filter(l => {
        const cat = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].category : "Staples";
        return cat === this.state.activeCategory;
      });
    }

    // 3. Proximity filter
    if (filter === "near") {
      items = items.filter(l => l.dynamicDistanceKm <= 5.0);
    } else if (filter === "district") {
      items = items.filter(l => l.isLocalDistrict);
    } else if (filter === "fast") {
      items = items.filter(l => l.dynamicDeliveryMins <= 20);
    }

    // 4. Sort by distance (Nearest seller first)
    items.sort((a, b) => a.dynamicDistanceKm - b.dynamicDistanceKm);

    if (items.length === 0) {
      return `
        <div style="text-align:center; padding: 40px 20px; background:var(--bg); border-radius:var(--radius-lg); margin-bottom: 24px;">
          <div style="font-size: 36px; margin-bottom: 8px;">🌾</div>
          <h4 style="font-size: 16px; font-weight:800;">No farm produce found for this filter in ${curDist}</h4>
          <p style="font-size: 13px; color:var(--text-muted); margin-bottom: 14px;">Try selecting "All Rwanda" or changing your district location.</p>
          <button class="btn btn-sm btn-primary" onclick="window.app.setProximityFilter('all'); window.app.state.activeCategory='All'; window.app.render();">
            Show All Rwanda Sellers (18 items)
          </button>
        </div>
      `;
    }

    return `
      <div class="grocery-grid">
        ${items.map(l => {
          const guide = this.getPriceGuide(l.food, l.price);
          const photo = l.photo || (HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].img : "assets/produce/dry_beans.jpg");
          const kiny = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].kiny : "";
          const discountPct = l.retailPrice ? Math.round((1 - l.price / l.retailPrice) * 100) : 15;
          const dist = l.dynamicDistanceKm;
          const mins = l.dynamicDeliveryMins;

          return `
            <div class="grocery-card">
              <div class="grocery-img-box">
                <span class="proximity-badge">
                  📍 ${dist <= 1.0 ? '0.8 km (Near you)' : dist + ' km away'}
                </span>
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
                  <span>🏪 <b>${l.farmer}</b></span>
                  <span>Stock: <b>${l.quantity} kg</b></span>
                </div>
                <div class="produce-origin-strip" style="margin-top:2px;">
                  <span>📍 Origin: ${l.district} District</span>
                  ${l.isLocalDistrict ? '<span class="pill pill-fair" style="padding:1px 6px; font-size:9px;">In Your District</span>' : ''}
                </div>
                <div class="delivery-eta-badge">
                  ⚡ ${mins <= 20 ? mins + ' min express moto' : mins + ' mins transit'} · 🚶 SACCO pickup
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

  // =========================================================================
  // 4. PHONE PAYMENT FLOW CONTROLLER (media_1792662744615.html)
  // =========================================================================
  startBuyProduce(listingId, mode) {
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
      this.executeOrder(listing, qty, total, "credit", "pool");
    } else {
      // Open Phone Frame Payment Flow from media_1792662744615.html
      this.state.pendingCheckoutOrder = { listing, qty, total };
      this.openPhonePayModal(listing, qty, total);
    }
  }

  openPhonePayModal(listing, qty, total) {
    const modal = document.getElementById("payModal");
    if (!modal) return;

    const donationPct = this.state.currentUser.donationPct || 2;
    const gift = Math.round(total * (donationPct / 100));
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const grandTotal = total + gift + deliveryFee;

    // Fill Page 2 (Confirm order)
    const imgEl = document.getElementById("orderProduceImg");
    const badgeEl = document.getElementById("orderProduceBadge");
    if (imgEl) imgEl.src = listing.photo || "assets/produce/dry_beans.jpg";
    if (badgeEl) badgeEl.textContent = `${listing.food} · ${listing.farmer}`;

    document.getElementById("rcV2").textContent = `${listing.food} (${qty} kg)`;
    document.getElementById("rfV2").textContent = `${total.toLocaleString()} RWF`;
    document.getElementById("rdModeV2").innerHTML = isPickup 
      ? '🚶 Walk-in SACCO Hub (FREE) ▾' 
      : '🚴 Express Moto (+300 RWF) ▾';
    document.getElementById("rgV2").textContent = `+${gift.toLocaleString()} RWF (${donationPct}%)`;
    document.getElementById("rtV2").textContent = `${grandTotal.toLocaleString()} RWF`;

    this.goPhonePage(2);
    modal.classList.add("open");
  }

  toggleCheckoutDelivery() {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.deliveryOption = this.state.nearby.deliveryOption === 'pickup' ? 'moto' : 'pickup';
    if (this.state.pendingCheckoutOrder) {
      const p = this.state.pendingCheckoutOrder;
      this.openPhonePayModal(p.listing, p.qty, p.total);
    }
  }

  goPhonePage(n) {
    const pages = ["p2_v2", "p6_v2", "p3_v2", "p4_v2", "p5_v2"];
    pages.forEach(pid => {
      const el = document.getElementById(pid);
      if (el) el.classList.remove("on");
    });
    const target = document.getElementById("p" + n + "_v2");
    if (target) target.classList.add("on");

    const scr = document.getElementById("scrV2");
    if (scr) scr.classList.toggle("dark", n === 5);
  }

  goToPaymentMethods() {
    this.renderPaymentAccountsList();
    this.goPhonePage(6);
  }

  renderPaymentAccountsList() {
    const listEl = document.getElementById("mlV2");
    const fieldsEl = document.getElementById("flV2");
    const ppEl = document.getElementById("ppV2");
    if (!listEl || !this.state.pendingCheckoutOrder) return;

    const p = this.state.pendingCheckoutOrder;
    const donationPct = this.state.currentUser.donationPct || 2;
    const gift = Math.round(p.total * (donationPct / 100));
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const grandTotal = p.total + gift + deliveryFee;

    const sel = this.state.selectedAccountIdx || 0;

    listEl.innerHTML = RWANDA_PAYMENT_ACCOUNTS.map((m, i) => `
      <button type="button" class="m-v2 ${i === sel ? 'on' : ''}" onclick="window.app.selectPaymentAccount(${i})">
        <span class="lg-v2" style="${m.c}">${m.l}</span>
        <span style="flex:1; min-width:0;">
          <b>${m.n}</b>
          <small>${m.s}</small>
        </span>
        <span class="am-v2">
          ${m.bal.toLocaleString()} RWF
          <small>${m.credit ? 'credit left' : 'balance'}</small>
        </span>
        <span class="r-v2"></span>
      </button>
    `).join('');

    fieldsEl.innerHTML = `
      <div class="bal-v2">Add demo money to selected account:</div>
      <div class="chips-v2">
        ${TOPUP_CHIPS.map(c => `
          <button type="button" class="chip-v2" onclick="window.app.topupSelectedAccount(${c.v})">${c.l}</button>
        `).join('')}
      </div>
      <div class="err-v2" id="payErrMsgV2"></div>
    `;

    if (ppEl) ppEl.textContent = `Pay ${grandTotal.toLocaleString()} RWF`;
  }

  selectPaymentAccount(i) {
    this.state.selectedAccountIdx = i;
    this.renderPaymentAccountsList();
  }

  topupSelectedAccount(amt) {
    const sel = this.state.selectedAccountIdx || 0;
    RWANDA_PAYMENT_ACCOUNTS[sel].bal += amt;
    this.renderPaymentAccountsList();
    const errEl = document.getElementById("payErrMsgV2");
    if (errEl) {
      errEl.style.color = "#2e8b57";
      errEl.textContent = `Added ${amt.toLocaleString()} RWF to ${RWANDA_PAYMENT_ACCOUNTS[sel].n}!`;
    }
  }

  processPhonePayment() {
    const p = this.state.pendingCheckoutOrder;
    if (!p) return;

    const sel = this.state.selectedAccountIdx || 0;
    const acc = RWANDA_PAYMENT_ACCOUNTS[sel];
    const donationPct = this.state.currentUser.donationPct || 2;
    const gift = Math.round(p.total * (donationPct / 100));
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const grandTotal = p.total + gift + deliveryFee;

    const errEl = document.getElementById("payErrMsgV2");
    if (acc.bal < grandTotal) {
      if (errEl) {
        errEl.style.color = "#c0392b";
        errEl.textContent = `Not enough ${acc.credit ? 'credit' : 'balance'}. Add ${(grandTotal - acc.bal).toLocaleString()} RWF more.`;
      }
      return;
    }

    acc.bal -= grandTotal;

    // Refill bridge pool
    this.state.pool.balance += gift;
    this.state.pool.totalGiftsIn += gift;

    // Execute order record
    const deliveryType = isPickup ? "Free Walk-in SACCO Hub Pickup" : "Express Moto Drop (15-25 min)";
    const newOrder = this.executeOrder(p.listing, p.qty, p.total, "cash", acc.by, gift, deliveryType, deliveryFee);

    // Page 3: Terminal Processing
    const isMobile = acc.t === 'mobile';
    document.getElementById("vtV2").textContent = acc.l || 'MOMO';
    this.goPhonePage(3);

    const t3 = document.getElementById("t3V2");
    const t3s = document.getElementById("t3sV2");
    t3.textContent = isMobile ? "Check your phone" : "Processing…";
    t3s.textContent = isMobile ? `Approve ${grandTotal.toLocaleString()} RWF with your PIN (*182#)` : "Communicating with bank host…";

    setTimeout(() => {
      t3.textContent = "Approved ✓";
      t3s.textContent = "";
    }, 2800);

    setTimeout(() => {
      // Page 4: Order Placed
      document.getElementById("pdV2").textContent = `${grandTotal.toLocaleString()} RWF`;
      document.getElementById("pdFulV2").textContent = deliveryType;
      this.goPhonePage(4);

      // Prepare receipt data
      document.getElementById("recNumV2").textContent = `#IB-2026-${newOrder.id}`;
      document.getElementById("recDateV2").textContent = `${new Date().toLocaleDateString('en-GB')} ${newOrder.date}`;
      document.getElementById("recCustV2").textContent = newOrder.buyerName.toUpperCase();
      document.getElementById("recSellerV2").textContent = newOrder.farmer.toUpperCase();
      document.getElementById("recHubV2").textContent = newOrder.hub.toUpperCase();
      document.getElementById("recItemV2").textContent = `${newOrder.food} (${newOrder.kg} kg)`;
      document.getElementById("recItemCostV2").textContent = `${newOrder.total.toLocaleString()} RWF`;
      document.getElementById("recDelV2").textContent = isPickup ? "FREE (SACCO)" : "300 RWF (Moto)";
      document.getElementById("recGiftV2").textContent = `+${newOrder.gift.toLocaleString()} RWF`;
      document.getElementById("recTotV2").textContent = `${grandTotal.toLocaleString()} RWF`;
      document.getElementById("recPayByV2").textContent = `PAID BY ${acc.by}`;
    }, 3800);
  }

  triggerReceiptPrinter() {
    const paper = document.getElementById("paperV2");
    const stamp = document.getElementById("stampV2");
    const rbtn = document.getElementById("rbV2");
    const pt = document.getElementById("ptV2");
    const bars = document.getElementById("barsV2");

    if (bars) {
      bars.innerHTML = Array.from({length: 44}, () => `<i style="width:${1+Math.floor(Math.random()*3)}px; margin-right:${Math.random()>.6?2:0}px"></i>`).join('');
    }

    if (!paper) return;
    paper.style.transition = 'none';
    paper.classList.remove('print');
    if (stamp) stamp.classList.remove('on');
    if (rbtn) rbtn.classList.remove('on');
    if (pt) pt.style.opacity = 1;

    void paper.offsetWidth;
    paper.style.transition = '';
    paper.classList.add('print');

    setTimeout(() => {
      if (stamp) stamp.classList.add('on');
    }, 3200);

    setTimeout(() => {
      if (pt) pt.style.opacity = 0;
      if (rbtn) rbtn.classList.add('on');
    }, 3800);
  }

  closePayFlow() {
    const modal = document.getElementById("payModal");
    if (modal) modal.classList.remove("open");
    this.render();
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

  // 1. OPENING LANDING PAGE (With Hero CTA, Role Questions, VUP Dates, Proximity, and Harvest Showcase)
  renderOpeningPage() {
    return `
      <!-- Hero Grocery Intro -->
      <div class="hero-grocery">
        <div class="hero-tagline">🌿 Rwanda Social Fintech & Farmer Direct Market · NISR 2026 Big Data Hackathon</div>
        <h1 class="hero-heading">Isoko Bridge <span style="color:var(--accent); font-weight:400;">(Ikiraro cya VUP)</span></h1>
        <p class="hero-description">
          Connecting Rwandan smallholder farmers directly with households and ethical shoppers. 
          When government VUP payments arrive late, emergency zero-interest bridge credit keeps families fed.
        </p>

        <!-- Prominent Hero Call-to-Action Buttons -->
        <div style="display:flex; justify-content:center; gap:12px; margin: 18px 0 22px; flex-wrap:wrap;">
          <button class="btn btn-primary btn-lg" style="box-shadow: 0 4px 14px rgba(27,107,74,0.35); font-weight:800;" onclick="window.app.openAuthModal('login')">
            🔑 1-Click Sign In (Demo Accounts)
          </button>
          <button class="btn btn-outline btn-lg" style="background:var(--card-bg); font-weight:700;" onclick="window.app.openAuthModal('signup')">
            📝 New Member Sign Up
          </button>
          <button class="btn btn-ghost btn-lg" style="font-weight:700; color:var(--primary);" onclick="const el=document.getElementById('harvestMarketSection'); if(el) el.scrollIntoView({behavior:'smooth'});">
            🛒 Browse Fresh Harvest Nearby ↓
          </button>
        </div>

        <!-- Category Pills (From Grocery App Mockup) -->
        <div class="category-strip">
          ${["All", "Pulses", "Staples", "Vegetables", "Grains", "Fruits"].map(cat => `
            <button class="category-pill ${this.state.activeCategory === cat ? 'active' : ''}" 
              onclick="window.app.state.activeCategory = '${cat}'; window.app.render();">
              ${cat === 'All' ? '🧺' : cat === 'Pulses' ? '🫘' : cat === 'Staples' ? '🥔' : cat === 'Vegetables' ? '🥦' : cat === 'Grains' ? '🌽' : '🥑'}
              ${cat}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Tailored Onboarding Entrances (4 Distinct Personas with Questions & 1-Click Entry) -->
      <div style="margin-bottom: 28px;">
        <h2 style="font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 4px;">How You Join Isoko Bridge</h2>
        <p style="font-size: 14px; color: var(--text-muted); text-align: center; margin-bottom: 20px;">
          No password or credentials needed — choose your role, answer the sample question, or click any demo persona to enter immediately:
        </p>

        <div class="role-entry-grid">
          <!-- 1. VUP Family -->
          <div class="role-card-select highlight">
            <div>
              <div class="role-card-icon">👨‍👩‍👧</div>
              <div class="role-card-title">
                <span>VUP Beneficiary Member</span>
                <span class="pill pill-fair">Bridge Credit</span>
              </div>
              <p class="role-card-desc">
                <b>Sample Question:</b> <i>"Is your VUP monthly cash transfer delayed this month?"</i><br>
                Check your automatic bridge credit limit, and order staple harvest food on credit until your VUP assistance arrives.
              </p>
            </div>
            <div class="role-card-sample">
              <b>Sample: Amina Uwase</b> · Kirehe District · Direct Support (8 days late · 5 household members)
            </div>
            <button class="btn btn-primary btn-lg" onclick="window.app.quickLoginSample('amina_family')">
              👨‍👩‍👧 1-Click Enter as VUP Member →
            </button>
          </div>

          <!-- 2. Farmer / Seller -->
          <div class="role-card-select">
            <div>
              <div class="role-card-icon">🌾</div>
              <div class="role-card-title">
                <span>Farmer / Cooperative</span>
                <span class="pill pill-high">Seller</span>
              </div>
              <p class="role-card-desc">
                <b>Sample Question:</b> <i>"What Rwandan crop are you harvesting and selling?"</i><br>
                List produce with verified photos or camera upload, benchmark prices against NISR medians, and receive instant Mobile Money payments.
              </p>
            </div>
            <div class="role-card-sample">
              <b>Sample: Mukamana Farm</b> · Kirehe · Dry Beans Seller
            </div>
            <button class="btn btn-outline btn-lg" onclick="window.app.quickLoginSample('mukamana_seller')">
              🌾 1-Click Enter as Farmer / Seller →
            </button>
          </div>

          <!-- 3. Ethical Shopper -->
          <div class="role-card-select">
            <div>
              <div class="role-card-icon">🛒</div>
              <div class="role-card-title">
                <span>Ethical Shopper</span>
                <span class="pill pill-neutral">Consumer</span>
              </div>
              <p class="role-card-desc">
                <b>Sample Question:</b> <i>"How much pool donation do you want to add to your order?"</i><br>
                Buy farm-fresh produce with MTN MoMo, Airtel Money, or BK. Contribute 1%–5% to refill the bridge pool and subsidize family food security.
              </p>
            </div>
            <div class="role-card-sample">
              <b>Sample: Grace Ingabire</b> · Kigali · 2% Pool Donor
            </div>
            <button class="btn btn-outline btn-lg" onclick="window.app.quickLoginSample('grace_shopper')">
              🛒 1-Click Enter as Shopper →
            </button>
          </div>

          <!-- 4. Planner / Judge -->
          <div class="role-card-select highlight" style="border-color:#7e22ce;">
            <div>
              <div class="role-card-icon">📊</div>
              <div class="role-card-title">
                <span>Government Planner & Judges</span>
                <span class="pill pill-urgent" style="background:#f3e8ff; color:#7e22ce;">Evidence Cockpit</span>
              </div>
              <p class="role-card-desc">
                <b>Sample Question:</b> <i>"Need evidence from NISR 3,399 beneficiary microdata?"</i><br>
                Inspect 30-district interactive choropleth map, delay hotspot matrix, priority rankings, and treasury liquidity simulation.
              </p>
            </div>
            <div class="role-card-sample">
              <b>Sample: LODA / NISR Administrator</b> · National & District Planning
            </div>
            <button class="btn btn-primary btn-lg" style="background:#7e22ce;" onclick="window.app.quickLoginSample('planner_demo')">
              📊 1-Click Enter as Planner / Judge →
            </button>
          </div>
        </div>
      </div>

      <!-- Rwanda VUP Payment Dates & Delay Calendar Widget -->
      <div class="vup-date-card">
        <div class="vup-date-header">
          <div>
            <div style="font-size: 12px; font-weight:800; color:var(--accent); text-transform:uppercase;">NISR Survey Payment Cycle Calendar</div>
            <h3 style="font-size: 19px; font-weight:800; color:var(--text-main); margin-top:2px;">How Rwanda VUP Disbursements & Delays Occur</h3>
          </div>
          <span class="pill pill-urgent">Average National Delay: 9.2 Days</span>
        </div>
        <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5;">
          Under Vision 2020 Umurenge Programme regulations, cash transfers are targeted on the <b>15th of each month</b>. 
          However, NISR survey microdata proves that <b>52% of beneficiaries wait over a week</b>. Isoko Bridge covers this exact interim gap:
        </p>
        <div class="cycle-steps">
          <div class="cycle-box">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">1st – 14th of Month</span>
            <b>Work & Attendance Audit</b>
            <small>Public works labor logged</small>
          </div>
          <div class="cycle-box">
            <span style="font-size: 11px; font-weight: 700; color: var(--primary);">15th of Month</span>
            <b>Scheduled Disbursement</b>
            <small>Target transfer date</small>
          </div>
          <div class="cycle-box active">
            <span style="font-size: 11px; font-weight: 700; color: var(--danger);">16th – 27th (Late Gap)</span>
            <b style="color:var(--danger);">Isoko Bridge Active!</b>
            <small>Families buy food on credit</small>
          </div>
          <div class="cycle-box">
            <span style="font-size: 11px; font-weight: 700; color: var(--success);">28th of Month</span>
            <b>Treasury Clearance Wave</b>
            <small>Credit repaid to pool</small>
          </div>
        </div>
      </div>

      <!-- "The Place You Are Right Now" Universal Location & Proximity Bar -->
      ${this.renderNearbyBar()}

      <!-- Live Harvest Grocery Showcase with Photos (Visual Grocery UI from Mockup) -->
      <div id="harvestMarketSection" style="margin-bottom: 28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="font-size: 20px; font-weight:800;">Fresh Harvest Catalog (18 Rwandan Productions)</h3>
            <p style="font-size: 13px; color: var(--text-muted);">Real produce photography · Live proximity distance from your location · Direct farmer mobile money payments</p>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="pill pill-fair">18 Rwandan Produce Items</span>
            <span class="pill pill-neutral">NISR Median Price Benchmarked</span>
          </div>
        </div>

        ${this.renderGroceryCatalog('cash')}
      </div>
    `;
  }

  renderDashboardWrapper() {
    const u = this.state.currentUser;
    let content = "";
    if (this.state.role === "Family") content = this.renderFamilyView();
    else if (this.state.role === "Farmer") content = this.renderFarmerView();
    else if (this.state.role === "Shopper") content = this.renderShopperView();
    else if (this.state.role === "Planner") content = this.renderPlannerView();

    return `
      <div class="dashboard-topbar">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-home-btn" onclick="window.app.goHome()">
            ← Back to Home / Change Role
          </button>
          <div style="font-size: 13px;">
            Role: <b style="color: var(--primary); text-transform: uppercase;">${this.state.role}</b>
            <span style="color: var(--text-muted); margin: 0 4px;">·</span>
            User: <b>${u.name}</b> (${u.district || 'National'})
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn btn-sm ${this.state.role === 'Family' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.enterRole('Family')">👨‍👩‍👧 Family</button>
          <button class="btn btn-sm ${this.state.role === 'Farmer' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.enterRole('Farmer')">🌾 Farmer</button>
          <button class="btn btn-sm ${this.state.role === 'Shopper' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.enterRole('Shopper')">🛒 Shopper</button>
          <button class="btn btn-sm ${this.state.role === 'Planner' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.enterRole('Planner')">📊 Planner</button>
        </div>
      </div>

      ${content}
    `;
  }

  renderFamilyView() {
    const u = this.state.currentUser;
    const limit = this.calculateCreditLimit();
    const remaining = this.getRemainingCredit();
    const isLate = Number(u.daysLate) > 0;
    const dailyCost = (Number(u.householdSize) || 1) * NISR_DATA.overall.dailyFoodBasketCostRwf;
    const benchmarkProg = NISR_DATA.programmes.find(p => p.name === u.programme) || NISR_DATA.programmes[2];

    return `
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

      ${this.renderNearbyBar()}

      <!-- Produce Market -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">🛒 Direct Produce Market</div>
            <div class="card-subtitle">Direct staple produce from Rwandan farmers with photos and official NISR median price benchmarks.</div>
          </div>
          <span class="pill ${isLate ? 'pill-urgent' : 'pill-neutral'}">${isLate ? 'Bridge Credit Mode Active' : 'Cash Market Mode'}</span>
        </div>
        ${this.renderGroceryCatalog(isLate ? 'credit' : 'cash')}
      </div>

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
          <p class="metric-sub" style="margin-top: 10px;">* Illustrative food security budget based on NISR food prices.</p>
        </div>

        <div class="card">
          <div class="card-title">📋 My Family Orders</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Track delivery and settlement of your food orders.</div>
          ${this.renderOrdersTable(this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === 'Family'))}
        </div>
      </div>
    `;
  }

  renderFarmerView() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.farmer === u.name || o.farmer === "Mukamana Farm" || o.farmer === "You (farmer)");
    const mySales = myOrders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

    return `
      <div class="banner-notice info">
        <div style="font-size: 24px;">🌾</div>
        <div>
          <b>Seller Portal · Direct Smallholder & Cooperative Produce Hub</b>
          <div style="font-size: 13px; margin-top: 2px;">
            Sell directly to local families and urban shoppers. Upload photos of your harvest or use our verified produce gallery so buyers know exactly what they are purchasing!
          </div>
        </div>
      </div>

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

      <div class="grid grid-cols-2">
        <!-- Add Listing with Photo Options -->
        <div class="card">
          <div class="card-title">➕ Add Harvest Listing with Photo</div>
          <div class="card-subtitle" style="margin-bottom: 16px;">Take a photo, upload an image, or pick one from our verified gallery:</div>
          
          <form onsubmit="window.app.addListing(event)">
            <div class="form-group">
              <label class="form-label">Produce Crop</label>
              <select id="new_food" class="form-control" onchange="window.app.onProduceSelected(this.value)">
                ${Object.keys(NISR_DATA.foodPrices).map(k => `
                  <option value="${k}">${k} (${HARVEST_GALLERY[k] ? HARVEST_GALLERY[k].kiny : ''})</option>
                `).join("")}
              </select>
            </div>

            <!-- Photo Selection: Upload, Camera, or Choose Ours -->
            <div class="form-group" style="background:var(--bg); padding:12px; border-radius:var(--radius-md); border:1px solid var(--card-border);">
              <label class="form-label">Produce Photo (Show Buyers What You Grow)</label>
              <div style="display:flex; gap:12px; align-items:center; margin-bottom:10px;">
                <img id="listingPhotoPreview" src="${HARVEST_GALLERY['Dry beans'].img}" style="width:75px; height:75px; object-fit:cover; border-radius:8px; border:2px solid var(--primary);" alt="Preview">
                <div style="flex:1;">
                  <input type="file" id="cameraUploadInput" accept="image/*" capture="environment" style="display:none;" onchange="window.app.handleCustomPhotoUpload(this)">
                  <button type="button" class="btn btn-sm btn-outline" style="margin-bottom:6px; width:100%;" onclick="document.getElementById('cameraUploadInput').click()">
                    📸 Take Photo / Upload File
                  </button>
                  <input type="hidden" id="new_photo_url" value="${HARVEST_GALLERY['Dry beans'].img}">
                  <small style="color:var(--text-muted); font-size:11px; display:block;">Or pick from our verified harvest photos below:</small>
                </div>
              </div>

              <!-- Quick Gallery Chooser -->
              <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:4px;">
                ${Object.keys(HARVEST_GALLERY).map(k => `
                  <img src="${HARVEST_GALLERY[k].img}" title="${k}" 
                       style="width:38px; height:38px; object-fit:cover; border-radius:6px; cursor:pointer; border:1px solid var(--card-border);"
                       onclick="window.app.setListingPhoto('${HARVEST_GALLERY[k].img}')">
                `).join("")}
              </div>
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

            <button type="submit" class="btn btn-primary" style="width: 100%;">Publish Produce to Market</button>
          </form>
        </div>

        <!-- Orders Awaiting Delivery -->
        <div class="card">
          <div class="card-title">📦 Orders to Deliver</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Confirm delivery to release guaranteed payout from the pool or buyer.</div>
          ${this.renderOrdersTable(myOrders, true)}
        </div>
      </div>
    `;
  }

  onProduceSelected(foodName) {
    if (HARVEST_GALLERY[foodName]) {
      this.setListingPhoto(HARVEST_GALLERY[foodName].img);
    }
    this.updatePriceGuidePreview();
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

  renderPlannerView() {
    const o = this.state.orders;
    const creditOrders = o.filter(x => x.mode === "credit");
    const totalCredit = creditOrders.reduce((sum, x) => sum + x.total, 0);
    const outstanding = this.getOutstandingCredit();

    return `
      <div class="banner-notice" style="background: #f3e8ff; border-left-color: #7e22ce;">
        <div style="font-size: 24px;">📊</div>
        <div>
          <b>Government & Programme Planner Intelligence (LODA / NISR Dashboard)</b>
          <div style="font-size: 13px; margin-top: 2px;">
            Evidence-based decision cockpit grounded in NISR VUP household survey microdata ($N = 3,399$ beneficiaries). Analyze disbursement friction, explore the 30-district interactive choropleth, test poverty proxy models, and simulate treasury liquidity cycles.
          </div>
        </div>
      </div>

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

      <div class="card" style="margin-bottom: 24px; background: var(--bg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div>
            <b>Treasury & Liquidity Simulation Engine</b>
            <div style="font-size: 13px; color: var(--text-muted);">Simulate the arrival of the scheduled VUP government cash transfer wave to automatically reimburse the community pool.</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary" onclick="window.app.simulateVupRepayment()">⚡ Simulate: VUP Payments Arrive</button>
            <button class="btn btn-outline" onclick="window.app.resetState()">↺ Reset Simulation</button>
          </div>
        </div>
      </div>

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
          </div>
          <div>
            <div class="card" style="height: 100%; border: 1px solid var(--card-border); padding: 14px; background: var(--bg);">
              <div id="districtSelectedInfo">
                ${this.renderDistrictInfo(this.state.selectedDistrict)}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <tr><th>Programme</th><th>Southern</th><th>Eastern</th><th>Western</th><th>Kigali</th><th>Northern</th></tr>
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
        </div>

        <div class="card">
          <div class="card-title">💳 Financial Inclusion Channels & Speed</div>
          <div class="card-subtitle" style="margin-bottom: 12px;">Disbursement turnaround by payment provider.</div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Disbursement Channel</th><th>Avg Delay</th><th>>7d Late (%)</th><th>Survey Records</th></tr>
              </thead>
              <tbody>
                <tr><td><b>Mobile Money</b></td><td style="color: var(--danger); font-weight: 700;">10.4 days</td><td>59%</td><td>630</td></tr>
                <tr><td><b>Bank-type SACCO</b></td><td>9.2 days</td><td>53%</td><td>2,205</td></tr>
                <tr><td><b>Umurenge SACCO</b></td><td style="color: var(--success); font-weight: 700;">7.7 days</td><td>43%</td><td>546</td></tr>
              </tbody>
            </table>
          </div>
          <div class="banner-notice info" style="margin-top: 14px; margin-bottom: 0; padding: 10px;">
            <small><b>Planner Insight:</b> Umurenge SACCOs disburse fastest (7.7 days). Mobile money delays (10.4 days) stem from rural cash float constraints.</small>
          </div>
        </div>
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
                    ${o.mode === 'credit' ? 'Bridge Credit' : o.paidBy || 'Cash'}
                  </span>
                  ${o.repaid ? '<span class="pill pill-fair" style="margin-left: 4px;">Repaid</span>' : ''}
                </td>
                <td>
                  <span class="pill ${o.status === 'Delivered' ? 'pill-fair' : 'pill-high'}">
                    ${o.status}
                  </span>
                </td>
                ${showDeliverBtn ? `
                  <td>
                    ${o.status === 'Placed' 
                      ? `<button class="btn btn-sm btn-primary" onclick="window.app.deliverOrder(${o.id})">Mark Delivered</button>`
                      : '<span style="color: var(--success); font-weight:700;">Delivered ✓</span>'}
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
        <span class="pill pill-neutral">Rank #${d.rank} of 30</span>
      </div>

      <table style="margin-top: 12px; font-size: 12px;">
        <tr><td>Average Delay:</td><td><b>${d.delay.toFixed(1)} days</b></td></tr>
        <tr><td>Estimated Poverty Rate:</td><td><b>${d.poverty.toFixed(1)}%</b></td></tr>
        <tr><td>Priority Score:</td><td><b style="color: var(--primary);">${d.priority.toFixed(1)} / 100</b></td></tr>
        <tr><td>NISR Records:</td><td><b>${d.records} households</b></td></tr>
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
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  initMap() {
    const mapEl = document.getElementById("mapContainer");
    if (!mapEl) return;

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
            return val >= 75 ? "#991b1b" : val >= 60 ? "#dc2626" : val >= 45 ? "#ea580c" : val >= 30 ? "#eab308" : "#16a34a";
          }
          if (this.mapMetric === "delay") {
            return val >= 13 ? "#991b1b" : val >= 10 ? "#dc2626" : val >= 8 ? "#ea580c" : val >= 6 ? "#eab308" : "#16a34a";
          }
          return val >= 42 ? "#991b1b" : val >= 35 ? "#dc2626" : val >= 28 ? "#ea580c" : val >= 20 ? "#eab308" : "#16a34a";
        };

        this.mapLayer = L.geoJson(window.RWANDA_DISTRICTS_GEOJSON, {
          style: (feat) => ({
            fillColor: getColor(getMetricValue(feat.properties.shapeName || "")),
            weight: 1.5,
            opacity: 1,
            color: "#ffffff",
            fillOpacity: 0.75
          }),
          onEachFeature: (feat, layer) => {
            const name = feat.properties.shapeName || "District";
            const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === name.toLowerCase());
            if (d) {
              layer.bindTooltip(`<b>${d.name}</b><br>Delay: ${d.delay.toFixed(1)}d · Score: ${d.priority.toFixed(1)}`, { sticky: true });
            }
            layer.on({
              click: () => this.selectDistrict(name)
            });
          }
        }).addTo(this.map);

        this.map.fitBounds(this.mapLayer.getBounds());
        return;
      } catch (e) {
        console.warn("Leaflet error, using SVG fallback", e);
      }
    }

    this.renderOfflineSvgMap(mapEl);
  }

  renderOfflineSvgMap(container) {
    if (!window.RWANDA_DISTRICTS_GEOJSON) return;
    const minX = 28.8, maxX = 30.9, minY = -2.9, maxY = -1.0;
    const width = 600, height = 450;
    const scaleX = width / (maxX - minX);
    const scaleY = height / (maxY - minY);

    const project = (lng, lat) => [(lng - minX) * scaleX, height - (lat - minY) * scaleY];

    let paths = "";
    window.RWANDA_DISTRICTS_GEOJSON.features.forEach(feat => {
      const name = feat.properties.shapeName || "District";
      const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === name.toLowerCase());
      const val = d ? (this.mapMetric === 'delay' ? d.delay : this.mapMetric === 'poverty' ? d.poverty : d.priority) : 50;
      let col = val >= 75 ? "#991b1b" : val >= 60 ? "#dc2626" : val >= 45 ? "#ea580c" : val >= 30 ? "#eab308" : "#16a34a";

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

      if (geom.type === "Polygon") addPolygon(geom.coordinates);
      else if (geom.type === "MultiPolygon") geom.coordinates.forEach(poly => addPolygon(poly));

      paths += `<path d="${dAttr}" fill="${col}" stroke="#ffffff" stroke-width="1" style="cursor:pointer;" onclick="window.app.selectDistrict('${name}')"><title>${name}</title></path>`;
    });

    container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto;">${paths}</svg>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new IsokoApp();
  window.app.init();
});
