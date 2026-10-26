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
  lang: "en", // "en", "rw", "fr"
  user: null, // null = on first page ("Who are you?"), string = logged in email
  pickRole: "", // "" or "Family", "Planner", "Farmer", "Shopper", "Admin"
  role: "Family",
  timeframe: "monthly", // "weekly", "monthly", "yearly"
  creditDeskTab: "all", // "all", "approve", "pay", "repay"
  activeCategory: "All",
  activeSubView: "dashboard", // "dashboard" or "analysis"
  nearby: {
    userDistrict: "Gasabo",
    userLocation: "Gasabo (Kimironko Hub)",
    filterProximity: "all",
    deliveryOption: "moto"
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
  pool: {
    balance: 25000,
    totalGiftsIn: 25000,
    totalPaidToFarmers: 12600,
    totalRepaidByVup: 8400
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
  // Orders covering all Credit Desk states
  orders: [
    { id: 101, food: "Sweet potato", kg: 20, total: 4800, mode: "credit", buyerRole: "Family", buyerName: "Amina Uwase", district: "Gisagara", status: "Delivered", farmer: "Gisagara Agrilink", paidBy: "pending_pool", deliveryType: "Free SACCO Pickup", repaid: false, date: "10:15" },
    { id: 102, food: "Tomato", kg: 8, total: 3840, mode: "cash", buyerRole: "Shopper", buyerName: "Grace Ingabire", district: "Gasabo", status: "Delivered", farmer: "Kimironko Fresh Growers", paidBy: "MTN MoMo", gift: 77, deliveryType: "Express Moto (15m)", repaid: false, date: "09:30" },
    { id: 103, food: "Dry beans", kg: 10, total: 7800, mode: "credit", buyerRole: "Family", buyerName: "Jean Bosco Habimana", district: "Kirehe", status: "Delivered", farmer: "Mukamana Farm", paidBy: "pool", deliveryType: "Free SACCO Pickup", repaid: false, date: "Yesterday" },
    { id: 104, food: "Irish potato", kg: 25, total: 11000, mode: "credit", buyerRole: "Family", buyerName: "Amina Uwase", district: "Nyabihu", status: "Pending Approval", farmer: "Nyabihu Potato Coop", paidBy: "pending_approval", deliveryType: "Free SACCO Pickup", repaid: false, date: "Just now" }
  ],
  nextOrderId: 105,
  nextListingId: 19,
  selectedDistrict: "Gasabo",
  hotspotMode: "delay",
  selectedPayMethod: "momo",
  pendingCheckoutOrder: null
};


const ROLES = [
  { key: "Family", title: "VUP member", line: "I receive VUP support", kinyTitle: "Umuryango wa VUP", kinyLine: "Mpagarariye umuryango ufashwa na VUP", frTitle: "Bénéficiaire VUP", frLine: "Je reçois les allocations VUP" },
  { key: "Planner", title: "Planner", line: "I manage VUP families and their credit", kinyTitle: "Umugenzuzi wa VUP", kinyLine: "Ngenzura imiryango ifashwa na VUP n'inguzanyo", frTitle: "Planificateur", frLine: "Je gère les familles VUP et leur crédit" },
  { key: "Farmer", title: "Seller", line: "I sell food", kinyTitle: "Umucuruzi w'Umusaruro", kinyLine: "Ngurisha umusaruro w'ubuhinzi", frTitle: "Vendeur Agricole", frLine: "Je vends des produits vivriers" },
  { key: "Shopper", title: "Shopper", line: "I buy food and help the pool", kinyTitle: "Umuguzi", kinyLine: "Ngura ibiribwa kandi ngaterera inkunga ikigega", frTitle: "Acheteur Solidaire", frLine: "J'achète des vivres et soutiens le fonds" },
  { key: "Admin", title: "Government worker (optional)", line: "I see the whole system", kinyTitle: "Umukozi wa Leta (Ibyifuzo)", kinyLine: "Mbona imikorere yose ya gahunda", frTitle: "Agent Gouvernemental (optionnel)", frLine: "J'ai une vue globale sur tout le système" }
];






class IsokoApp {
  constructor() {
    this.state = this.loadState();
    this.map = null;
    this.mapLayer = null;
    this.mapMetric = "priority";
    this.geminiTargetLang = "rw";
    this.currentStatementData = null;
  }

  loadState() {
    try {
      const raw = localStorage.getItem("vup_bridge_state_v7");
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...this.getInitialState(), ...parsed };
      }
    } catch (e) {
      console.warn("Could not load stored state:", e);
    }
    return this.getInitialState();
  }

  getInitialState() {
    return {
      theme: "light",
      lang: "en", // "en", "rw", "fr"
      user: null, // null when on first page ("Who are you?"), string = logged in email
      pickRole: "", // "" or "member", "planner", "seller", "shopper", "admin"
      role: "Family", // "Family", "Planner", "Farmer", "Shopper", "Admin"
      roleCode: "member", // "member", "planner", "seller", "shopper", "admin"
      timeframe: "month", // "week", "month", "year"
      analysisPeriod: "30d",
      analysisFrom: "",
      analysisTo: "",
      creditDeskTab: "all", // "all", "approve", "pay", "repay"
      activeCategory: "All",
      activeSubView: "dashboard", // "dashboard", "analysis", "reports", "cases", "audit"
      nearby: {
        userDistrict: "Gasabo",
        userLocation: "Gasabo (Kimironko Hub)",
        filterProximity: "all",
        deliveryOption: "moto"
      },
      selectedAccountIdx: 0,
      currentUser: {
        name: "Amina Uwase",
        email: "amina@vupbridge.rw",
        role: "Family",
        roleCode: "member",
        district: "Kirehe",
        sector: "Gatore",
        programme: "Direct Support",
        householdSize: 5,
        usualPaymentDay: 15,
        daysLate: 8,
        status: "credit-ready",
        paymentMethod: "MTN Mobile Money",
        accountNumber: "078XXXX456",
        holderName: "Amina Uwase",
        confirmedBy: "Planner One",
        consentTicked: true
      },
      users: JSON.parse(JSON.stringify(window.VUP_SAMPLE_USERS || {})),
      orders: JSON.parse(JSON.stringify(window.SEED_ORDERS || [])),
      ledger: JSON.parse(JSON.stringify(window.SEED_LEDGER || [])),
      cases: JSON.parse(JSON.stringify(window.SEED_CASES || [])),
      auditLog: JSON.parse(JSON.stringify(window.SEED_AUDIT_LOG || [])),
      reports: [],
      adminSettings: JSON.parse(JSON.stringify(window.DEFAULT_ADMIN_SETTINGS || {
        dailyFoodCost: 261,
        creditCapDays: 14,
        firstCreditDays: 3,
        poolSharePct: 2,
        amberPoolDays: 14,
        redPoolDays: 7,
        amberOverduePct: 10,
        redOverduePct: 20,
        makeNextPaymentFail: false
      })),
      pool: {
        balance: 20000,
        totalGiftsIn: 20000,
        totalPaidToFarmers: 16600,
        totalRepaidByVup: 8800
      },
      listings: [
        { id: 1, food: "Dry beans", district: "Kirehe", hub: "Gatore Food Bank & SACCO Point", price: 780, retailPrice: 920, quantity: 200, farmer: "Mukamana Farm", farmerEmail: "mukamana.farm@vupbridge.rw", momo: "078XXXX123", photo: "assets/produce/dry_beans.jpg", isFav: false },
        { id: 2, food: "Sweet potato", district: "Gisagara", hub: "Gisagara Agro-Hub", price: 240, retailPrice: 320, quantity: 350, farmer: "Gisagara Sweet Potato Group", farmerEmail: "sweetpotato.gisagara@vupbridge.rw", momo: "073XXXX567", photo: "assets/produce/sweet_potato.jpg", isFav: false },
        { id: 3, food: "Irish potato", district: "Nyabihu", hub: "Mukamira Highland Depot", price: 440, retailPrice: 520, quantity: 500, farmer: "Nyabihu Potato Cooperative", farmerEmail: "potato.coop@vupbridge.rw", momo: "078XXXX654", photo: "assets/produce/irish_potato.jpg", isFav: true },
        { id: 4, food: "Tomato", district: "Kamonyi", hub: "Kamonyi Farmers Depot", price: 480, retailPrice: 620, quantity: 90, farmer: "Kamonyi Vegetable Growers", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX345", photo: "assets/produce/tomato.jpg", isFav: true },
        { id: 5, food: "Cooking banana", district: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", price: 290, retailPrice: 380, quantity: 250, farmer: "Nyabugogo Agro Cooperative", farmerEmail: "mukamana.farm@vupbridge.rw", momo: "078XXXX456", photo: "assets/produce/cooking_banana.jpg", isFav: false },
        { id: 6, food: "Onion", district: "Kamonyi", hub: "Kamonyi Farmers Depot", price: 1600, retailPrice: 1950, quantity: 80, farmer: "Kamonyi Vegetable Growers", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX567", photo: "assets/produce/red_onion.jpg", isFav: false },
        { id: 7, food: "Local rice", district: "Kicukiro", hub: "Gikondo Agro-Terminal", price: 1180, retailPrice: 1380, quantity: 180, farmer: "Kigali Rice Millers", farmerEmail: "potato.coop@vupbridge.rw", momo: "078XXXX789", photo: "assets/produce/local_rice.jpg", isFav: false },
        { id: 8, food: "Avocado", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", price: 280, retailPrice: 350, quantity: 120, farmer: "Kigali Agro Coop", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX890", photo: "assets/produce/avocado.jpg", isFav: true },
        { id: 9, food: "Spinach", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", price: 250, retailPrice: 300, quantity: 60, farmer: "Nyabarongo Valley Fresh", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX901", photo: "assets/produce/spinach.jpg", isFav: false },
        { id: 10, food: "Corn flour (factory)", district: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", price: 790, retailPrice: 960, quantity: 150, farmer: "Bugarama Grain Mills", farmerEmail: "mukamana.farm@vupbridge.rw", momo: "078XXXX012", photo: "assets/produce/fresh_corn.jpg", isFav: false },
        { id: 11, food: "Cassava roots", district: "Ruhango", hub: "Ruhango Central Market Point", price: 220, retailPrice: 280, quantity: 400, farmer: "Ruhango Cassava Farmers", farmerEmail: "sweetpotato.gisagara@vupbridge.rw", momo: "078XXXX112", photo: "assets/produce/sweet_potato.jpg", isFav: false },
        { id: 12, food: "Passion fruit", district: "Musanze", hub: "Musanze Central Produce Depot", price: 950, retailPrice: 1200, quantity: 70, farmer: "Musanze Highland Fruit Coop", farmerEmail: "potato.coop@vupbridge.rw", momo: "078XXXX223", photo: "assets/produce/avocado.jpg", isFav: true },
        { id: 13, food: "Tree tomatoes", district: "Burera", hub: "Burera Highland Agro-Hub", price: 880, retailPrice: 1100, quantity: 85, farmer: "Burera Tamarillo Growers", farmerEmail: "potato.coop@vupbridge.rw", momo: "078XXXX334", photo: "assets/produce/tomato.jpg", isFav: false },
        { id: 14, food: "Carrots", district: "Gicumbi", hub: "Gicumbi High-Altitude Center", price: 360, retailPrice: 450, quantity: 140, farmer: "Gicumbi Organic Valley", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX445", photo: "assets/produce/sweet_potato.jpg", isFav: false },
        { id: 15, food: "Green cabbage", district: "Musanze", hub: "Musanze Central Produce Depot", price: 260, retailPrice: 350, quantity: 220, farmer: "Volcanoes Green Coop", farmerEmail: "potato.coop@vupbridge.rw", momo: "078XXXX556", photo: "assets/produce/spinach.jpg", isFav: false },
        { id: 16, food: "Green peppers", district: "Bugesera", hub: "Bugesera Rice & Veg Depot", price: 680, retailPrice: 850, quantity: 95, farmer: "Bugesera Irrigation Scheme", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX667", photo: "assets/produce/spinach.jpg", isFav: false },
        { id: 17, food: "Soybeans", district: "Kayonza", hub: "Kayonza Agro-Depot", price: 620, retailPrice: 750, quantity: 300, farmer: "Kayonza Grain Link", farmerEmail: "mukamana.farm@vupbridge.rw", momo: "078XXXX778", photo: "assets/produce/dry_beans.jpg", isFav: false },
        { id: 18, food: "Groundnuts", district: "Ngoma", hub: "Ngoma Farmers Hub", price: 1450, retailPrice: 1800, quantity: 110, farmer: "Ngoma Women Agrilink", farmerEmail: "mukamana.farm@vupbridge.rw", momo: "078XXXX889", photo: "assets/produce/dry_beans.jpg", isFav: true }
      ],
      nextOrderId: 107,
      nextListingId: 19,
      nextCaseId: 3,
      selectedDistrict: "Gasabo",
      hotspotMode: "delay",
      selectedPayMethod: "momo",
      pendingCheckoutOrder: null
    };
  }

  saveState() {
    try {
      localStorage.setItem("vup_bridge_state_v7", JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
  }

  resetState() {
    localStorage.removeItem("vup_bridge_state_v7");
    this.state = this.getInitialState();
    this.saveState();
    this.render();
    this.toast("Demo state has been reset to default seeded data.", "info");
  }

  init() {
    this.applyTheme();
    this.updateLangButtons();
    this.render();
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  toggleTheme() {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    this.applyTheme();
    this.saveState();
  }

  // =========================================================================
  // TRILINGUAL LOCALIZATION (EN, RW, FR)
  // =========================================================================
  t(key) {
    const lang = this.state.lang || "en";
    if (window.TRANSLATIONS && window.TRANSLATIONS[lang] && window.TRANSLATIONS[lang][key]) {
      return window.TRANSLATIONS[lang][key];
    }
    if (window.TRANSLATIONS && window.TRANSLATIONS.en && window.TRANSLATIONS.en[key]) {
      return window.TRANSLATIONS.en[key];
    }
    return key;
  }

  setLanguage(lang) {
    this.state.lang = lang;
    this.saveState();
    this.updateLangButtons();
    this.render();
    const names = { en: "English", rw: "Ikinyarwanda", fr: "Français" };
    this.toast(`Language switched to ${names[lang] || lang}`, "success");
  }

  updateLangButtons() {
    const lang = this.state.lang || "en";
    ["en", "rw", "fr"].forEach(l => {
      const btn = document.getElementById("langBtn" + l.charAt(0).toUpperCase() + l.slice(1));
      if (btn) {
        if (l === lang) {
          btn.classList.add("btn-primary");
          btn.classList.remove("btn-ghost");
        } else {
          btn.classList.remove("btn-primary");
          btn.classList.add("btn-ghost");
        }
      }
    });
  }

  // =========================================================================
  // 1. PROTOTYPE ENTRANCE & ROLE-BASED LOGIN FLOW (Section 3 & 17)
  // =========================================================================
  pickRole(roleCode) {
    this.state.pickRole = roleCode;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  cancelPickRole() {
    this.state.pickRole = "";
    this.render();
  }

  onRoleLoginUserSelected(email) {
    const roleCode = this.state.pickRole || "member";
    const userList = (this.state.users && this.state.users[roleCode]) || [];
    const found = userList.find(u => u.email === email);
    if (!found) return;

    const emEl = document.getElementById("protoEmail");
    const pwEl = document.getElementById("protoPassword");
    if (emEl) emEl.value = found.email;
    if (pwEl) pwEl.value = found.password;

    const descEl = document.getElementById("protoUserStateDesc");
    if (descEl) descEl.textContent = found.stateDesc || found.notes || "";
  }

  handlePrototypeLogin(event) {
    event.preventDefault();
    const emEl = document.getElementById("protoEmail");
    const pwEl = document.getElementById("protoPassword");
    const email = emEl ? emEl.value.trim() : "";
    const pass = pwEl ? pwEl.value.trim() : "";

    if (!email || !pass) {
      this.toast("Type any email and any password. This is a prototype.", "warning");
      return;
    }

    const roleCode = this.state.pickRole || "member";
    const roleMap = {
      member: "Family",
      planner: "Planner",
      seller: "Farmer",
      shopper: "Shopper",
      admin: "Admin"
    };

    // Check if email belongs to a sample user of a different role (Section 17.1 Rule 6)
    for (const [rCode, uList] of Object.entries(this.state.users || {})) {
      const matched = uList.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matched && rCode !== roleCode) {
        const otherRoleTitle = this.getRoleTitleByCode(rCode);
        this.toast(`This sample user is a ${otherRoleTitle}. Go back and choose ${otherRoleTitle} to see their screens. Continuing as ${this.getRoleTitleByCode(roleCode)}.`, "info");
      }
    }

    // Match or create user profile
    const userList = (this.state.users && this.state.users[roleCode]) || [];
    const existing = userList.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      this.state.currentUser = { ...existing };
      this.state.role = roleMap[roleCode] || existing.role;
      this.state.roleCode = roleCode;
    } else {
      // New demo user starts at 'Add my details' if member (Section 5.1 & 17.1)
      this.state.currentUser = {
        name: email.split("@")[0].replace(/[._]/g, " "),
        email: email,
        role: roleMap[roleCode],
        roleCode: roleCode,
        district: "Gasabo",
        status: roleCode === "member" ? "not_submitted" : "verified",
        householdSize: 4,
        daysLate: 0,
        usualPaymentDay: 15,
        programme: "Direct Support"
      };
      this.state.role = roleMap[roleCode];
      this.state.roleCode = roleCode;
    }

    this.state.user = email;
    this.state.pickRole = "";
    this.state.activeSubView = "dashboard";

    this.saveState();
    this.render();
    this.toast(`Logged in as ${this.getRoleTitleByCode(roleCode)} (${email})`, "success");
  }

  logout() {
    this.state.user = null;
    this.state.pickRole = "";
    this.state.activeSubView = "dashboard";
    this.saveState();
    this.render();
    this.toast("Logged out. Returned to role selection.", "info");
  }

  getRoleTitleByCode(code) {
    const lang = this.state.lang || "en";
    const r = ROLES.find(x => x.code === code || x.key === code || (code === "member" && x.key === "Family") || (code === "seller" && x.key === "Farmer"));
    if (!r) return code;
    return lang === "rw" ? r.kinyTitle : lang === "fr" ? r.frTitle : r.title;
  }

  setTimeframe(tf) {
    this.state.timeframe = tf;
    this.saveState();
    this.render();
  }

  setCreditDeskTab(tab) {
    this.state.creditDeskTab = tab;
    this.render();
  }

  // =========================================================================
  // 2. MEMBER DETAILS & VERIFICATION FLOW (Section 5.1)
  // =========================================================================
  saveMemberDetails(event) {
    event.preventDefault();
    const u = this.state.currentUser;
    u.name = document.getElementById("md_name").value.trim();
    u.phone = document.getElementById("md_phone").value.trim();
    u.district = document.getElementById("md_district").value;
    u.sector = document.getElementById("md_sector").value.trim() || "Central";
    u.programme = document.getElementById("md_prog").value;
    u.householdSize = parseInt(document.getElementById("md_size").value) || 4;
    u.usualPaymentDay = parseInt(document.getElementById("md_day").value) || 15;
    u.consentTicked = document.getElementById("md_consent").checked;
    u.status = "pending";
    u.daysLate = 8; // Start demo wait

    // Add to audit log
    this.state.auditLog.unshift({
      who: u.name,
      action: "Submitted member details",
      target: `${u.name} (${u.district})`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: "New VUP member application"
    });

    this.saveState();
    this.render();
    this.toast("Details submitted! Status: Demo mode. Waiting for approval.", "success");
  }

  savePaymentAccount(event) {
    event.preventDefault();
    const u = this.state.currentUser;
    u.paymentMethod = document.getElementById("pa_method").value;
    u.accountNumber = document.getElementById("pa_acc").value.trim();
    u.holderName = document.getElementById("pa_holder").value.trim();
    u.status = "credit-ready";

    this.state.auditLog.unshift({
      who: u.name,
      action: "Added payment account",
      target: `${u.paymentMethod} (${u.accountNumber})`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: "Account confirmed for credit repayment"
    });

    this.saveState();
    this.render();
    this.toast("Payment account confirmed! You are now credit-ready.", "success");
  }

  // Planner Approvals
  approveMemberRequest(email) {
    const user = this.findUserByEmail(email);
    if (!user) return;
    user.status = "verified";

    this.state.auditLog.unshift({
      who: this.state.currentUser.name || "Planner One",
      action: "Approved member",
      target: `${user.name} (${user.district})`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: "Eligibility verified against VUP register"
    });

    this.saveState();
    this.render();
    this.toast(`Approved member ${user.name}! Status changed to verified.`, "success");
  }

  rejectMemberRequest(email) {
    const reason = prompt("Enter required reason for rejection:", "Does not match sector VUP public works attendance sheet");
    if (!reason) return;
    const user = this.findUserByEmail(email);
    if (!user) return;
    user.status = "rejected";

    this.state.auditLog.unshift({
      who: this.state.currentUser.name || "Planner One",
      action: "Rejected member",
      target: `${user.name}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason
    });

    this.saveState();
    this.render();
    this.toast(`Member ${user.name} rejected: ${reason}`, "info");
  }

  askMemberMoreInfo(email) {
    const note = prompt("Enter required note for more info:", "Please confirm your Umurenge SACCO book number or sector of residence.");
    if (!note) return;
    const user = this.findUserByEmail(email);
    if (!user) return;
    user.status = "needs_info";
    user.infoNote = note;

    this.state.auditLog.unshift({
      who: this.state.currentUser.name || "Planner One",
      action: "Requested more info",
      target: `${user.name}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: note
    });

    this.saveState();
    this.render();
    this.toast(`Sent information request to ${user.name}`, "info");
  }

  findUserByEmail(email) {
    for (const uList of Object.values(this.state.users || {})) {
      const f = uList.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (f) return f;
    }
    return null;
  }

  // =========================================================================
  // 3. CREDIT DESK 3 QUEUES CONTROLLER (Approve, Pay Sellers, Repay)
  // =========================================================================
  approveCredit(orderId) {
    const o = this.state.orders.find(x => x.id === orderId);
    if (!o) return;
    o.status = "Placed";
    o.creditStatus = "approved";
    o.approvedBy = this.state.currentUser.name || "Planner One";
    o.approvedDate = new Date().toLocaleDateString('en-GB');

    this.state.auditLog.unshift({
      who: o.approvedBy,
      action: "Approved credit request",
      target: `Order #${orderId} (${o.food}, ${o.total} RWF)`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: "Within household credit limit"
    });

    this.saveState();
    this.render();
    this.toast(`Order #${orderId} approved! Ready for seller delivery.`, "success");
  }

  disburseToSeller(orderId) {
    const o = this.state.orders.find(x => x.id === orderId);
    if (!o) return;

    // Admin demo switch: 'Make the next payment fail' (Section 17.3 & 17.4)
    if (this.state.adminSettings.makeNextPaymentFail) {
      this.state.adminSettings.makeNextPaymentFail = false;
      this.toast(`DEMO TRIGGER: Payment to ${o.farmer} failed (Mobile Money float timeout). Reported as Case #3 for problem report & reversal testing!`, "danger");
      
      // Auto-create case
      this.state.cases.unshift({
        id: this.state.nextCaseId++,
        type: "payment missing",
        createdBy: o.farmer,
        role: "Seller",
        linkedTransaction: `Order #${orderId}`,
        note: `Payout of ${o.total} RWF failed at mobile money switch. Reversal required.`,
        status: "open",
        handler: "Planner One",
        outcome: null,
        createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.saveState();
      this.render();
      return;
    }

    if (this.state.pool.balance < o.total) {
      this.toast(`Pool too low! Balance (${this.state.pool.balance.toLocaleString()} RWF) is under ${o.total.toLocaleString()} RWF. Payout blocked.`, "danger");
      return;
    }

    this.state.pool.balance -= o.total;
    this.state.pool.totalPaidToFarmers += o.total;
    o.paidBy = "pool";
    o.paid = "pool";
    o.creditStatus = "seller_paid";

    // Record in Single Ledger (Section 16.3)
    this.state.ledger.unshift({
      id: this.state.ledger.length + 1,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "seller_payout",
      from: "Revolving Pool",
      to: o.farmer,
      amount: o.total,
      link: `Order #${orderId}`,
      status: "completed",
      paymentMethod: o.paymentMethod || "MTN Mobile Money",
      createdBy: this.state.currentUser.name || "Planner One"
    });

    this.state.auditLog.unshift({
      who: this.state.currentUser.name || "Planner One",
      action: "Disbursed pool payout to seller",
      target: `${o.farmer} (${o.total.toLocaleString()} RWF)`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: `Order #${orderId} delivered confirmed`
    });

    this.saveState();
    this.render();
    this.toast(`Disbursed ${o.total.toLocaleString()} RWF from revolving pool to ${o.farmer}!`, "success");
  }

  settleFromVup(orderId) {
    const o = this.state.orders.find(x => x.id === orderId);
    if (!o) return;
    o.repaid = true;
    o.creditStatus = "repaid";
    o.repaidDate = new Date().toLocaleDateString('en-GB');

    this.state.pool.balance += o.total;
    this.state.pool.totalRepaidByVup += o.total;

    this.state.ledger.unshift({
      id: this.state.ledger.length + 1,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "repayment",
      from: "VUP Treasury Transfer",
      to: "Revolving Pool",
      amount: o.total,
      link: `Order #${orderId} Repayment`,
      status: "completed",
      paymentMethod: o.paymentMethod || "MTN Mobile Money",
      createdBy: this.state.currentUser.name || "Planner One"
    });

    this.state.auditLog.unshift({
      who: this.state.currentUser.name || "Planner One",
      action: "Repaid credit to pool",
      target: `Order #${orderId} (${o.buyerName})`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: "Monthly VUP transfer wave cleared"
    });

    this.saveState();
    this.render();
    this.toast(`Order #${orderId} repaid to pool! ${o.total.toLocaleString()} RWF recovered from VUP transfer.`, "success");
  }

  writeOffCredit(orderId) {
    const reason = prompt("Enter required reason for write-off (Section 5.5):", "Family unable to repay due to illness; absorbed by revolving pool");
    if (!reason) return;

    const o = this.state.orders.find(x => x.id === orderId);
    if (!o) return;

    o.creditStatus = "written_off";
    o.repaid = true; // Absorbed

    this.state.ledger.unshift({
      id: this.state.ledger.length + 1,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "write-off",
      from: "Revolving Pool",
      to: "Write-off Reserve",
      amount: o.total,
      link: `Order #${orderId}`,
      status: "written_off",
      paymentMethod: "Social Safety Absorbed",
      createdBy: this.state.currentUser.name || "Planner One"
    });

    this.state.auditLog.unshift({
      who: this.state.currentUser.name || "Planner One",
      action: "Wrote off credit",
      target: `Order #${orderId} (${o.buyerName})`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason
    });

    this.saveState();
    this.render();
    this.toast(`Credit #${orderId} written off and absorbed by pool. Family is never punished.`, "info");
  }

  toggleMakeNextPaymentFail() {
    this.state.adminSettings = this.state.adminSettings || {};
    this.state.adminSettings.makeNextPaymentFail = !this.state.adminSettings.makeNextPaymentFail;
    this.saveState();
    this.toast(`Next payment failure demo switch: ${this.state.adminSettings.makeNextPaymentFail ? 'ENABLED' : 'DISABLED'}`, 'info');
    return this.state.adminSettings.makeNextPaymentFail;
  }

  // =========================================================================
  // 4. STATEMENTS, PDF/CSV EXPORTS & PROBLEM CASES (Section 16)
  // =========================================================================
  openStatementModal(role = null) {
    const r = role || this.state.role;
    const u = this.state.currentUser;
    const stmtNum = `STMT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    let txs = [];
    if (r === "Family") {
      txs = this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === "Family");
    } else if (r === "Farmer") {
      txs = this.state.orders.filter(o => o.farmer === u.name || o.farmer === "Mukamana Farm");
    } else if (r === "Shopper") {
      txs = this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === "Shopper");
    } else if (r === "Planner") {
      txs = this.state.orders.filter(o => o.buyerRole === "Family" || o.mode === "credit");
    } else {
      txs = this.state.orders;
    }

    const totalOrders = txs.length;
    const totalAmount = txs.reduce((sum, o) => sum + o.total, 0);
    const totalCredit = txs.filter(o => o.mode === "credit").reduce((sum, o) => sum + o.total, 0);
    const totalRepaid = txs.filter(o => o.repaid).reduce((sum, o) => sum + o.total, 0);

    this.currentStatementData = {
      stmtNum,
      role: r,
      userName: u.name,
      txs,
      totalOrders,
      totalAmount,
      totalCredit,
      totalRepaid
    };

    const modal = document.getElementById("statementModal");
    const body = document.getElementById("statementBodyContent");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="background:var(--bg); padding:14px; border-radius:10px; margin-bottom:14px; font-size:13px; line-height:1.5;">
        <div style="display:flex; justify-content:space-between; font-weight:700;">
          <span>Statement Number: <b>${stmtNum}</b></span>
          <span>Date: <b>${new Date().toLocaleDateString('en-GB')}</b></span>
        </div>
        <div>Account: <b>${u.name}</b> (${r}) · District: <b>${u.district || 'National'}</b></div>
        <div>Payment Channel: <b>${u.paymentMethod || 'MTN Mobile Money'} (${u.accountNumber || '078XXXX456'})</b></div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tx ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Food & Qty</th>
              <th>Amount (RWF)</th>
              <th>Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${txs.map(o => `
              <tr>
                <td><b>#${o.id}</b></td>
                <td>${o.date}</td>
                <td><span class="pill ${o.mode === 'credit' ? 'pill-urgent' : 'pill-fair'}">${o.mode === 'credit' ? 'Bridge Credit' : 'Cash Order'}</span></td>
                <td>${o.food} (${o.kg} kg)</td>
                <td><b>${o.total.toLocaleString()}</b></td>
                <td><small>${o.paymentMethod || 'MoMo'}</small></td>
                <td>${o.status} ${o.repaid ? '✓ Repaid' : ''}</td>
                <td>
                  <button class="btn btn-ghost btn-sm" style="font-size:11px; padding:2px 6px; color:var(--danger);" onclick="window.app.openCaseModal('Order #${o.id}')" title="Report a problem">
                    🚩 Report
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:14px; padding-top:10px; border-top:1px solid var(--card-border); font-size:13px; font-weight:700;">
        <span>Total Orders: ${totalOrders}</span>
        <span>Total Amount: ${totalAmount.toLocaleString()} RWF</span>
        <span>Credit Given: ${totalCredit.toLocaleString()} RWF</span>
        <span>Credit Repaid: ${totalRepaid.toLocaleString()} RWF</span>
      </div>

      <div style="margin-top:14px; padding:10px; background:var(--tint); border-radius:8px; font-size:11.5px; color:var(--text-main);">
        <b>How to read this:</b> All figures are in Rwandan Francs (RWF). Bridge credit has 0% interest and 0 fees.
        <br>
        <b>Report a problem:</b> Quote statement number <b>${stmtNum}</b> and the Tx ID to sector planning officers.
        <br>
        <b>Exported by:</b> ${r} · ${u.name} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    `;

    modal.classList.add("open");
  }

  closeStatementModal() {
    const modal = document.getElementById("statementModal");
    if (modal) modal.classList.remove("open");
  }

  printCurrentStatement() {
    window.print();
  }

  exportCurrentStatementCsv() {
    if (!this.currentStatementData) return;
    const d = this.currentStatementData;
    let csv = "Tx_ID,Date,Type,Food,Quantity_KG,Amount_RWF,Payment_Method,Status,Buyer,Seller\n";
    d.txs.forEach(o => {
      csv += `${o.id},"${o.date}","${o.mode}","${o.food}",${o.kg},${o.total},"${o.paymentMethod || 'MoMo'}","${o.status}","${o.buyerName}","${o.farmer}"\n`;
    });

    const dl = document.createElement("a");
    dl.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
    dl.setAttribute("download", `VUPBridge_${d.role}_statement_${new Date().toISOString().slice(0,10)}.csv`);
    dl.click();
    this.toast("Statement CSV downloaded successfully!", "success");
  }

  // Analysis Report Generator (Section 16.4)
  openAnalysisReportModal() {
    const modal = document.getElementById("analysisReportModal");
    const container = document.getElementById("analysisReportContent");
    if (!modal || !container) return;
    const report = this.getAnalysisReportData();
    const currentUser = this.state.currentUser || {};
    const totalCredit = report.creditOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const repaidCredit = report.creditOrders.filter(o => o.repaid).reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    container.innerHTML = `
      <div style="border:1px solid #fed7d7;background:#fff5f5;padding:9px 12px;border-radius:10px;margin-bottom:14px;font-size:12px;font-weight:700;color:#991b1b;">Prototype. Fake money. Prototype activity below is simulated. NISR figures describe group patterns; they do not explain why any individual payment was late.</div>

      <div style="font-size:14px; margin-bottom:12px;">
        <h2 style="font-size:22px; margin-bottom:4px;">Isoko Bridge — NISR & Activity Report</h2>
        <div style="font-size:12.5px; color:var(--text-muted);">
          Activity period: <b>${this.escapeHtml(report.period.label)}</b> · Prepared by: <b>${this.escapeHtml(currentUser.name || 'Dashboard user')}</b> · Generated: <b>${new Date().toLocaleString('en-GB')}</b>
        </div>
      </div>

      <div style="margin-bottom:14px; font-size:13.5px; line-height:1.5;">
        <b>In this period:</b> ${report.transactions.length} simulated orders worth ${report.totalValue.toLocaleString()} RWF, including ${report.creditOrders.length} food-credit orders (${totalCredit.toLocaleString()} RWF). ${repaidCredit.toLocaleString()} RWF of the recorded credit orders is marked repaid.
      </div>

      <div class="table-wrap" style="margin-bottom:14px;">
        <table>
          <thead><tr><th>NISR survey finding</th><th>Summary</th><th>Sample</th><th>How to read it</th></tr></thead>
          <tbody>
            <tr><td>National average delay</td><td>${NISR_DATA.overall.averageDelayDays.toFixed(1)} days</td><td>${NISR_DATA.overall.totalBeneficiaries.toLocaleString()} beneficiary records</td><td>Survey baseline, not live status</td></tr>
            <tr><td>Waited more than 7 days</td><td>${NISR_DATA.overall.pctOver7DaysLate}%</td><td>Project summary</td><td>About half of surveyed beneficiaries</td></tr>
            <tr><td>Longest listed hotspot</td><td>14.6 days · ${NISR_DATA.hotspots['Expanded Public Works'].Southern.latePct}% over 7 days</td><td>n = ${NISR_DATA.hotspots['Expanded Public Works'].Southern.records}</td><td>Expanded Public Works, Southern Province</td></tr>
            <tr><td>Prototype activity</td><td>${report.transactions.length} orders · ${report.totalValue.toLocaleString()} RWF</td><td>Simulated</td><td>Filtered to selected activity period</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-size:15px;margin:12px 0 6px;">Programme comparison</h3>
      <div class="table-wrap" style="margin-bottom:14px;"><table><thead><tr><th>Programme</th><th>Average delay</th><th>Over 7 days</th><th>Records</th></tr></thead><tbody>${NISR_DATA.programmes.map(p=>`<tr><td>${this.escapeHtml(p.name)}</td><td>${p.delay.toFixed(1)} days</td><td>${p.latePct}%</td><td>${p.records.toLocaleString()}</td></tr>`).join('')}</tbody></table></div>

      <h3 style="font-size:15px;margin:12px 0 6px;">Province comparison</h3>
      <div class="table-wrap" style="margin-bottom:14px;"><table><thead><tr><th>Province</th><th>Average delay</th><th>Over 7 days</th><th>Records</th></tr></thead><tbody>${NISR_DATA.provinces.map(p=>`<tr><td>${this.escapeHtml(p.name)}</td><td>${p.delay.toFixed(1)} days</td><td>${p.latePct}%</td><td>${p.records.toLocaleString()}</td></tr>`).join('')}</tbody></table></div>

      <h3 style="font-size:15px;margin:12px 0 6px;">Payment-method pattern</h3>
      <div class="table-wrap" style="margin-bottom:14px;"><table><thead><tr><th>Method</th><th>Average delay</th><th>Over 7 days</th><th>Records</th></tr></thead><tbody>${(NISR_DATA.groups['Payment Channel'] || []).map(g=>`<tr><td>${this.escapeHtml(g.name)}</td><td>${g.delay.toFixed(1)} days</td><td>${g.latePct}%</td><td>${g.records.toLocaleString()}</td></tr>`).join('')}</tbody></table></div>

      <h3 style="font-size:15px;margin:12px 0 6px;">Simulated transactions in selected period</h3>
      <div class="table-wrap" style="margin-bottom:14px;"><table><thead><tr><th>Order</th><th>Date</th><th>Buyer</th><th>District</th><th>Item</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>${report.transactions.length ? report.transactions.map(o=>`<tr><td>#${this.escapeHtml(o.id)}</td><td>${this.escapeHtml(this.getOrderDateLabel(o.date))}</td><td>${this.escapeHtml(o.buyerName || 'Demo buyer')}</td><td>${this.escapeHtml(o.district || '—')}</td><td>${this.escapeHtml(o.food || 'Food order')} (${Number(o.kg)||0} kg)</td><td>${o.mode === 'credit' ? 'Food credit' : 'Cash'}</td><td>${(Number(o.total)||0).toLocaleString()} RWF</td><td>${this.escapeHtml(o.status || 'Recorded')}</td></tr>`).join('') : '<tr><td colspan="8">No prototype transactions in this period.</td></tr>'}</tbody></table></div>

      <div style="padding:10px;background:var(--bg);border-radius:8px;font-size:11.5px;color:var(--text-muted);line-height:1.5;">
        <b>Source and limits:</b> NISR EICV7 VUP household survey, 2023–24 (<a href="https://microdata.statistics.gov.rw/index.php/catalog/121">catalogue entry</a>). The build brief marks the supplied summary figures as early, unweighted estimates pending a final weighted analysis. Interpret them as provisional. Sample guide: 100+ records is more stable, 25–99 needs caution, and fewer than 25 should be suppressed or pooled. Survey time is fixed; the selected activity period filters only simulated prototype orders. The survey shows patterns, not causes, and must not be used to decide an individual's eligibility.
      </div>
    `;

    modal.classList.add("open");
  }

  closeAnalysisReportModal() {
    const modal = document.getElementById("analysisReportModal");
    if (modal) modal.classList.remove("open");
  }

  printAnalysisReport() {
    window.print();
  }

  exportAnalysisCsv() {
    this.downloadAnalysisCsv();
  }

  // Problem Cases (Section 16.3)
  openCaseModal(txRef) {
    const modal = document.getElementById("caseModal");
    const refEl = document.getElementById("caseTxRef");
    const txIdEl = document.getElementById("caseTxId");
    if (!modal || !refEl) return;
    refEl.value = txRef;
    if (txIdEl) txIdEl.value = txRef;
    modal.classList.add("open");
  }

  closeCaseModal() {
    const modal = document.getElementById("caseModal");
    if (modal) modal.classList.remove("open");
  }

  submitProblemCase(event) {
    event.preventDefault();
    const txRef = document.getElementById("caseTxRef").value;
    const type = document.getElementById("caseTypeSelect").value;
    const note = document.getElementById("caseNoteInput").value.trim();

    if (!note) {
      this.toast("Please enter a note explaining what happened.", "warning");
      return;
    }

    const newCase = {
      id: this.state.nextCaseId++,
      type,
      createdBy: this.state.currentUser.name || "User",
      role: this.state.role,
      linkedTransaction: txRef,
      note,
      status: "open",
      handler: "Planner One",
      outcome: null,
      createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.state.cases.unshift(newCase);
    this.closeCaseModal();
    this.saveState();
    this.render();
    this.toast(`Problem report submitted! Case #${newCase.id} created for planner review.`, "success");
  }

  resolveCase(caseId, outcome) {
    const c = this.state.cases.find(x => x.id === caseId);
    if (!c) return;
    c.status = outcome === "rejected" ? "rejected" : "resolved";
    c.outcome = outcome;
    c.resolvedDate = new Date().toLocaleDateString('en-GB');

    this.saveState();
    this.render();
    this.toast(`Case #${caseId} marked ${c.status} (${outcome}).`, "success");
  }

  // =========================================================================
  // 5. GEMINI AI TRANSLATION & PLAIN-LANGUAGE INTELLIGENCE
  // =========================================================================
  openGeminiModal() {
    const m = document.getElementById("geminiModal");
    if (m) m.classList.add("open");
  }

  closeGeminiModal() {
    const m = document.getElementById("geminiModal");
    if (m) m.classList.remove("open");
  }

  updateGeminiTargetLang(lang) {
    this.geminiTargetLang = lang;
  }

  async runGeminiTranslate() {
    const inputEl = document.getElementById("geminiTextInput");
    const outCard = document.getElementById("geminiOutputCard");
    const outText = document.getElementById("geminiOutputText");
    if (!inputEl || !outCard || !outText) return;

    const query = inputEl.value.trim();
    if (!query) {
      this.toast("Please type or paste some text to translate.", "warning");
      return;
    }

    outCard.style.display = "block";
    outText.innerHTML = '<span class="dot-pulse"></span> <i>Translating with Google Gemini AI multilingual engine…</i>';

    const target = this.geminiTargetLang || "rw";
    const res = await window.geminiEngine.translateText(query, target);
    outText.textContent = res;
  }

  applyWholePageTranslation() {
    const target = this.geminiTargetLang || "rw";
    this.setLanguage(target);
    this.closeGeminiModal();
  }

  listenToTranslation() {
    const outText = document.getElementById("geminiOutputText");
    if (!outText || !outText.textContent) {
      this.toast("Translate some text first to listen.", "info");
      return;
    }
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(outText.textContent);
      u.lang = this.geminiTargetLang === 'fr' ? 'fr-FR' : 'en-US';
      window.speechSynthesis.speak(u);
    } else {
      this.toast("Speech synthesis not supported in this browser.", "warning");
    }
  }

  useGeminiPrompt(promptKey) {
    const inputEl = document.getElementById("geminiTextInput");
    if (!inputEl) return;
    const prompts = {
      sobanura: "Sobanura uko Ikiraro cya VUP gifasha imiryango ibiryo byayo byatinda.",
      "crédit vup": "Comment le crédit d'urgence Isoko Bridge protège les familles bénéficiaires VUP ?",
      "farmer sell": "How do Rwandan smallholder farmers list crops and verify fair NISR prices?",
      "shopper donation": "How does an ethical shopper subsidize child food security in Rwanda?",
      "delay nisr": "Why are government VUP payments delayed according to NISR survey data?"
    };
    inputEl.value = prompts[promptKey] || promptKey;
    this.runGeminiTranslate();
  }

  copyGeminiResult() {
    const outText = document.getElementById("geminiOutputText");
    if (outText && outText.textContent) {
      navigator.clipboard.writeText(outText.textContent).then(() => {
        this.toast("Translation copied to clipboard!", "success");
      });
    }
  }

  toggleGeminiApiKeyPrompt() {
    const cur = localStorage.getItem("isoko_gemini_api_key") || "";
    const key = prompt("Enter your Google Gemini API Key (optional - built-in offline engine active by default):", cur);
    if (key !== null) {
      localStorage.setItem("isoko_gemini_api_key", key.trim());
      if (window.geminiEngine) window.geminiEngine.apiKey = key.trim();
      this.toast(key.trim() ? "Gemini API key saved!" : "Using default built-in AI engine.", "info");
    }
  }

  // Section 8 System Prompt compliance
  explainNumbersInEasyWords(topic) {
    const lang = this.state.lang || "en";
    let text = "";
    if (topic === "delay") {
      if (lang === "rw") {
        text = "1) Incamake: Abaturage 52 ku 100 bategereza hejuru y'icyumweru. 2) Ibigenda neza: Amasoko y'ibiribwa akora neza mu turere twose. 3) Ibidakora neza: Mu Majyepfo no mu Burasirazuba amafaranga atinda iminsi 14. 4) Icyo gukora: Gusuzuma impamvu zishoboka zo gutinda muri SACCO.";
      } else if (lang === "fr") {
        text = "1) Résumé : 52 % des familles attendent plus d'une semaine. 2) Ce qui va bien : Le marché vivrier approvisionne tous les districts. 3) Ce qui ne va pas : Dans le Sud et l'Est, les retards atteignent 14 jours. 4) Que vérifier ensuite : Raison possible liée aux validations manuelles, à vérifier auprès des SACCOs.";
      } else {
        text = "1) One-line summary: 52 out of 100 families wait over a week for VUP payments. 2) What is going well: Food markets in all districts are stocked and active. 3) What is not going well: Southern Province Expanded Public Works delays reach 14.6 days. 4) What to check next: Possible reason: manual muster roll auditing; check sector social officers.";
      }
    } else if (topic === "queues") {
      if (lang === "rw") {
        text = "1) Incamake: Amatsinda 3 arinda amafaranga y'ikigega. 2) Ibigenda neza: Abahinzi bishyurwa ako kanya bimaze kugezwa ku muryango. 3) Ibidakora neza: Inguzanyo 1 iracyari mu kirarane. 4) Icyo gukora: Kumenyesha SACCO igihe cyo kugarura amafaranga.";
      } else if (lang === "fr") {
        text = "1) Résumé : Les 3 files protègent l'argent sans fuite financière. 2) Ce qui va bien : Les agriculteurs sont payés dès livraison. 3) Ce qui ne va pas : 1 crédit est en retard de remboursement. 4) Que vérifier ensuite : Date de virement VUP auprès de la banque relais.";
      } else {
        text = "1) One-line summary: The 3 queues track approvals, farmer payouts, and VUP repayments with zero leakage. 2) What is going well: Sellers receive mobile money float upon delivery. 3) What is not going well: 1 credit is overdue. 4) What to check next: Possible reason: delayed sector bank transfer; verify with district planner.";
      }
    } else {
      if (lang === "rw") {
        text = "1) Incamake: Ikigega kirimo 20,000 RWF yo gutabara imiryango. 2) Ibigenda neza: Abaguzi batanze inkunga yo kucyunganira. 3) Ibidakora neza: Aho ibiribwa bikenewe cyane hasaba amafaranga yiyongereye. 4) Icyo gukora: Gushishikariza abaguzi kongera inkunga y'ubushake.";
      } else if (lang === "fr") {
        text = "1) Résumé : Le fonds dispose de 20 000 RWF pour nourrir les familles en attente. 2) Ce qui va bien : Les dons des acheteurs solidaires renflouent le pool. 3) Ce qui ne va pas : La réserve doit atteindre 45 000 RWF pour couvrir le pic de retard. 4) Que vérifier ensuite : Augmenter la participation citoyenne solidaire.";
      } else {
        text = "1) One-line summary: The revolving pool holds 20,000 RWF to feed waiting households. 2) What is going well: Shopper donations provide continuous replenishment. 3) What is not going well: Liquidity in high-delay districts needs a 45,000 RWF cushion. 4) What to check next: Possible reason: higher demand during rainy season; check seller stock.";
      }
    }

    const box = document.getElementById("aiExplainerResult");
    if (box) {
      box.style.display = "block";
      box.innerHTML = `
        <div style="font-weight:700; color:#7e22ce; margin-bottom:4px; font-size:12.5px;">✨ Gemini AI Explainer (${lang.toUpperCase()}):</div>
        <div style="font-size:13.5px; line-height:1.5;">${text}</div>
      `;
    } else {
      alert(text);
    }
  }

  // =========================================================================
  // 6. MAIN APPLICATION RENDER ROUTER
  // =========================================================================
  render() {
    this.updateHeaderTicker();
    this.renderHeaderNavActions();

    const mainEl = document.getElementById("appView");
    if (!mainEl) return;

    if (this.state.user) {
      // User is logged in to a specific role screen
      if (this.state.activeSubView === "analysis") {
        mainEl.innerHTML = this.renderDashboardTopbar() + this.renderAnalysisView();
        this.initPlannerVisuals();
      } else {
        mainEl.innerHTML = this.renderDashboardTopbar() + this.renderRoleScreen();
        if (this.state.role === "Planner" || this.state.role === "Admin") {
          this.initPlannerVisuals();
        } else if (this.state.role === "Farmer") {
          this.updatePriceGuidePreview();
        }
      }
    } else if (this.state.pickRole !== "") {
      // User selected a role on first page, now on login page
      mainEl.innerHTML = this.renderLoginView();
    } else {
      // First Page: "Who are you?" with 5 big buttons, VUP calendar, proximity, harvest
      mainEl.innerHTML = this.renderWhoAreYouView();
    }
  }

  updateHeaderTicker() {
    const amtEl = document.getElementById("poolTickerAmount");
    const lblEl = document.getElementById("poolTickerLabel");
    if (amtEl) amtEl.textContent = `${this.state.pool.balance.toLocaleString()} RWF`;
    if (lblEl) lblEl.textContent = this.t("poolTickerLabel");
  }

  renderHeaderNavActions() {
    const slot = document.getElementById("headerUserAuthSlot");
    const topNavPill = document.getElementById("topNavPill");
    const railMid = document.getElementById("railMid");

    const lang = this.state.lang || "en";
    const logoutTxt = lang === 'rw' ? 'Gusohoka' : lang === 'fr' ? 'Déconnexion' : 'Log out';

    // 1. Render Middle Nav Pill based on active role and view
    if (topNavPill) {
      if (this.state.user) {
        const role = this.state.role || "Family";
        const sub = this.state.activeSubView || "dashboard";
        
        let navItems = [];
        if (role === "Planner") {
          navItems = [
            { id: "dashboard", label: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg> Overview' },
            { id: "creditdesk", label: '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Credit Desk' },
            { id: "nisr_facts", label: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> NISR Facts' },
            { id: "analysis", label: '<svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> NISR Analysis' },
            { id: "cases", label: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Disputes' },
            { id: "reports", label: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Reports' }
          ];
        } else if (role === "Admin") {
          navItems = [
            { id: "dashboard", label: "🏛️ Overview" },
            { id: "creditdesk", label: "💳 Credit Desk" },
            { id: "nisr_facts", label: "📑 NISR Facts" },
            { id: "analysis", label: "📊 NISR Analysis" },
            { id: "users", label: "👥 Users" },
            { id: "cases", label: "🛟 Disputes" },
            { id: "ledger", label: "📒 Ledger" }
          ];
        } else if (role === "Family") {
          navItems = [
            { id: "dashboard", label: "🥗 Food Basket" },
            { id: "credit", label: "💳 Bridge Credit" },
            { id: "orders", label: "📦 Orders" }
          ];
        } else if (role === "Farmer") {
          navItems = [
            { id: "dashboard", label: "🌾 Add Produce" },
            { id: "orders", label: "🚚 Orders & Payouts" }
          ];
        } else {
          navItems = [
            { id: "dashboard", label: "🛒 Fresh Market" },
            { id: "pool", label: "🏦 Pool Impact" }
          ];
        }

        topNavPill.innerHTML = navItems.map(item => `
          <button class="${sub === item.id ? 'on' : ''}" onclick="window.app.setNavTab('${item.id}')">
            ${item.label}
          </button>
        `).join("");
      } else {
        const pTab = this.state.publicTab || 'market';
        topNavPill.innerHTML = `
          <button class="${pTab === 'market' ? 'on' : ''}" onclick="window.app.setPublicTab('market')"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Fresh Market</button>
          <button class="${pTab === 'roles' ? 'on' : ''}" onclick="window.app.setPublicTab('roles')"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Roles & Portals</button>
          <button class="${pTab === 'schedule' ? 'on' : ''}" onclick="window.app.setPublicTab('schedule')"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> VUP Schedule</button>
        `;
      }
    }

    // 2. Render Rail Mid Icons
    if (railMid) {
      if (this.state.user) {
        railMid.innerHTML = `
          <button class="on" onclick="window.app.setNavTab('dashboard')" title="Dashboard" aria-label="Dashboard">📊<span>Overview</span></button>
          <button onclick="window.app.openStatementModal()" title="Statements" aria-label="Statements">📄<span>Statement</span></button>
          <button onclick="window.app.openAnalysisReportModal()" title="Analysis Report" aria-label="Analysis Report">📈<span>Report</span></button>
        `;
      } else {
        railMid.innerHTML = `
          <button class="on" onclick="window.app.goHome()" title="Home">🏠<span>Home</span></button>
          <button onclick="window.app.openGeminiModal()" title="Gemini AI">✨<span>Gemini AI</span></button>
        `;
      }
    }

    // 3. Render User Auth Slot Pill
    if (slot) {
      if (this.state.user) {
        const u = this.state.currentUser || {};
        const initials = (u.name || this.state.user).slice(0, 2).toUpperCase();
        slot.innerHTML = `
          <div class="av">${initials}</div>
          <div style="line-height:1.2;">
            <b style="font-size:12px;">${u.name || this.state.user.split('@')[0]}</b>
            <small style="color:var(--mute); font-size:9.5px;">${this.getRoleTitleByCode(this.state.roleCode || 'member')}</small>
          </div>
          <button class="mini" onclick="window.app.downloadUserStatement()" style="margin-left:4px;" title="Download my statement (CSV)">
            📥 CSV
          </button>
          <button class="mini" onclick="window.app.logout()" style="margin-left:4px;" title="Log out">
            ${logoutTxt}
          </button>
        `;
      } else {
        slot.innerHTML = `
          <button class="btn btn-sm btn-primary" onclick="window.app.pickRole('member')" style="border-radius:999px;">
            ${lang === 'rw' ? 'Injira' : lang === 'fr' ? 'Connexion' : 'Log In'}
          </button>
        `;
      }
    }
  }

  setNavTab(tabId) {
    this.state.activeSubView = tabId;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setPublicTab(tabId) {
    this.state.publicTab = tabId;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================================================================
  // 7. FIRST PAGE: "WHO ARE YOU?" (5 BIG BUTTONS)
  // =========================================================================
  renderWhoAreYouView() {
    const tab = this.state.publicTab || "market";
    if (tab === "roles") {
      return this.renderPublicRolesView();
    }
    if (tab === "schedule") {
      return this.renderPublicScheduleView();
    }
    return this.renderPublicMarketView();
  }

  renderPublicMarketView() {
    const curDist = (this.state.nearby && this.state.nearby.userDistrict) || "Gasabo";

    return `
      <!-- Pure SVG Logo Recreated from Concept (No image file used) -->
      <div style="text-align:center; padding: 6px 0 16px; display:flex; justify-content:center;">
        <svg viewBox="0 0 540 160" style="width: 100%; max-width: 240px; height: auto;" class="ib-brand-svg-logo">
          <!-- Top Curved Deck Line -->
          <path d="M 75 48 Q 270 18 465 48 Q 270 24 75 48 Z" fill="currentColor" style="fill:currentColor !important; stroke:none !important;"/>
          <!-- 3 Distinct Bridge Arches -->
          <path d="M 86 106 C 86 66, 182 66, 182 106" stroke="currentColor" stroke-width="14" stroke-linecap="round" fill="none"/>
          <path d="M 210 106 C 210 54, 330 54, 330 106" stroke="currentColor" stroke-width="16" stroke-linecap="round" fill="none"/>
          <path d="M 358 106 C 358 66, 454 66, 454 106" stroke="currentColor" stroke-width="14" stroke-linecap="round" fill="none"/>
          <!-- Spaced Typography -->
          <text x="270" y="148" text-anchor="middle" font-family="'Inter', 'Bricolage Grotesque', sans-serif" font-weight="700" font-size="28" letter-spacing="0.42em" fill="currentColor" style="fill:currentColor !important; stroke:none !important;">I S O K O   B R I D G E</text>
        </svg>
      </div>

      <!-- @uxui_faran Mobile User Location & Header Strip -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding:4px 2px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="av" style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, var(--on), var(--gd)); color:#fff; font-weight:700; display:grid; place-items:center;">
            IB
          </div>
          <div>
            <b style="font-size:13.5px; display:block; line-height:1.2;">Isoko Fresh Market</b>
            <small style="color:var(--mute); font-size:11px; display:flex; align-items:center; gap:3px;">
              <svg viewBox="0 0 24 24" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${curDist} District · Rwanda
            </small>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px;">
          <button class="btn btn-sm" onclick="window.app.openGeminiModal()" title="Gemini AI Assistant" style="background:rgba(126,34,206,.12); color:#7e22ce; border-radius:999px; padding:6px 12px; font-weight:700;">
            ✨ Gemini AI
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.setPublicTab('roles')" title="Log in" style="border-radius:999px; padding:6px 14px;">
            Log In →
          </button>
        </div>
      </div>

      <!-- @uxui_faran Search Bar with Filter Icon -->
      <div class="vm-search-bar" style="margin-bottom:16px;">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="vmSearchInput" placeholder="Search vegetables, beans, potatoes, fruits..." oninput="window.app.filterProduceByName(this.value)">
        <button onclick="window.app.setProximityFilter('near')" style="background:none; border:0; color:var(--mute); cursor:pointer;" title="Sort by Distance">
          <svg viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
        </button>
      </div>

      <!-- @uxui_faran Hero Promotional Card -->
      <div class="card" style="background:linear-gradient(135deg, rgba(22,163,74,0.12), rgba(14,99,94,0.18)); border:1px solid rgba(22,163,74,0.25); border-radius:24px; padding:18px 22px; margin-bottom:18px; position:relative; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:16px;">
          <div style="flex:1;">
            <span class="tag g" style="margin-bottom:6px;">Fresh food from local sellers</span>
            <h2 style="font-size:22px; font-weight:800; line-height:1.15; margin:4px 0 6px; color:var(--ink);">
              Good food, closer to home
            </h2>
            <p style="font-size:12px; color:var(--mute); margin-bottom:12px; line-height:1.4;">
              Browse local produce, compare prices, and choose what works for your family.
            </p>
            <button class="btn btn-sm btn-primary" onclick="window.app.setPublicTab('roles')">
              Enter as VUP Member →
            </button>
          </div>
          <div style="width:110px; height:100px; flex:none; border-radius:18px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.12);">
            <img src="assets/produce/dry_beans.jpg" alt="Fresh Harvest" style="width:100%; height:100%; object-fit:cover;">
          </div>
        </div>
      </div>

      <!-- @uxui_faran Category Pills Row -->
      <div class="vm-categories-row" style="margin-bottom:16px;">
        ${["All", "Beans", "Tubers", "Vegetables", "Flours", "Fruits"].map(cat => `
          <button class="vm-cat-pill ${(!this.state.activeCategory && cat === 'All') || this.state.activeCategory === cat ? 'on' : ''}" onclick="window.app.state.activeCategory='${cat}'; window.app.render();">
            ${cat === 'All' ? 'All Staples' : cat}
          </button>
        `).join("")}
      </div>

      <!-- @uxui_faran Top Farmer Cooperatives Strip -->
      <div style="margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <b style="font-size:14px; font-weight:700;">Seller examples</b>
          <small style="color:var(--mute);">Sample listings</small>
        </div>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:6px; scrollbar-width:none;">
          ${[
            { name: "Mukamana Co-op", dist: "Kirehe", tag: "Beans & Corn" },
            { name: "Kinigi Potato Union", dist: "Musanze", tag: "Irish Potato" },
            { name: "Nyamagabe Farmers", dist: "Southern", tag: "Veggies" },
            { name: "Gicumbi Cooperative", dist: "Northern", tag: "Dry Pulses" },
            { name: "Rusizi Rice Union", dist: "Western", tag: "Local Rice" }
          ].map(coop => `
            <div style="background:var(--card); border:1px solid var(--line); border-radius:18px; padding:10px 14px; min-width:140px; flex:none; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
              <b style="font-size:12.5px; display:block; line-height:1.2;">${coop.name}</b>
              <small style="color:var(--mute); font-size:10.5px; display:block; margin:2px 0 4px;">📍 ${coop.dist}</small>
              <span class="tag g" style="font-size:9.5px; padding:2px 6px;">${coop.tag}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- @uxui_faran 2-Column Produce Section Header -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
        <h3 style="font-size:16px; font-weight:800;">Food near you</h3>
        <small style="color:var(--mute); font-size:11.5px;">Prices shown in RWF</small>
      </div>

      <!-- Produce Grid -->
      ${this.renderGroceryCatalog('cash')}
    `;
  }

  renderPublicRolesView() {
    const rolesList = [
      { code: "member", key: "Family", icon: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: "VUP Member", line: "I receive VUP support and want to shop for food." },
      { code: "planner", key: "Planner", icon: '<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: "Sector Planner", line: "I review payment trends, credit activity, and open cases." },
      { code: "seller", key: "Farmer", icon: '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>', title: "Cooperative Farmer (Seller)", line: "I list food for families to buy." },
      { code: "shopper", key: "Shopper", icon: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>', title: "Ethical Shopper", line: "I buy food for my household." },
      { code: "admin", key: "Admin", icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', title: "Administrator", line: "I review users, payments, reports, and system activity." }
    ];

    return `
      <div class="head">
        <div>
          <h1>Choose Your Role Portal</h1>
          <p class="sub">Select a portal to explore interactive demo dashboards with real NISR microdata.</p>
        </div>
      </div>

      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 24px;">
        ${rolesList.map(r => `
          <div class="card pk" style="cursor:pointer; display:flex; flex-direction:column; padding:22px;" onclick="window.app.pickRole('${r.code}')">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <span class="ki" style="width:44px; height:44px; border-radius:50%; background:var(--accsoft); color:var(--acc); display:grid; place-items:center;">
                ${r.icon}
              </span>
              <span class="tag ${r.code === 'admin' ? 'r' : 'g'}">${r.key}</span>
            </div>
            <b style="font-size:16px; font-weight:700; margin-bottom:6px;">${r.title}</b>
            <p style="color:var(--mute); font-size:12.5px; margin-bottom:16px; line-height:1.45;">${r.line}</p>
            <div style="margin-top:auto;">
              <button class="btn btn-sm btn-primary" style="width:100%; justify-content:center;">
                Enter ${r.title} Portal →
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderPublicScheduleView() {
    return `
      <div class="head">
        <div>
          <h1>Rwanda VUP Payment Schedule & Delays</h1>
          <p class="sub">Evidence-based analysis of social assistance disbursement cycles across Rwanda's 30 districts.</p>
        </div>
      </div>

      ${this.renderVupDateCard()}

      <div class="card" style="margin-top:20px; padding:22px;">
        <h3 style="font-size:16px; font-weight:700; margin-bottom:8px;">Why Isoko Bridge Exists</h3>
        <p style="font-size:13.5px; color:var(--mute); line-height:1.6; margin-bottom:14px;">
          Under Vision 2020 Umurenge Programme regulations, transfers are scheduled on the 15th of each month. However, NISR empirical household survey microdata ($N = 3,399$) reveals that <b>52% of beneficiaries face disbursement delays averaging 9.2 days</b> due to administrative muster roll reconciliation, Umurenge SACCO clearance windows, and banking queues.
        </p>
        <p style="font-size:13.5px; color:var(--mute); line-height:1.6;">
          <b>Isoko Bridge</b> bridges this exact gap: families access zero-interest staple food credit from local farmer cooperatives, the community pool pays the farmer immediately upon delivery, and credit is settled automatically via SACCO deduction when the government transfer arrives.
        </p>
      </div>
    `;
  }

  renderLoginView() {
    const roleCode = this.state.pickRole || "member";
    const userList = (this.state.users && this.state.users[roleCode]) || [];
    const firstUser = userList[0] || { email: "demo@vupbridge.rw", password: "demo1234", stateDesc: "Standard demo profile" };

    const lang = this.state.lang || "en";
    const rTitle = this.getRoleTitleByCode(roleCode);

    const headerText = lang === 'rw' 
      ? `Injira nka ${rTitle}` 
      : lang === 'fr' 
      ? `Connexion en tant que ${rTitle}` 
      : `Log in as ${rTitle}`;

    const protoNotice = lang === 'rw' 
      ? "<b>Urugero rw'Ikoranabuhanga:</b> Andika imeli n'ijambo ry'ibanga iryo ari ryo ryose. Nta kigenzurwa." 
      : lang === 'fr' 
      ? "<b>Prototype :</b> saisissez n'importe quel e-mail et mot de passe. Aucun contrôle n'est effectué." 
      : "<b>Prototype:</b> type any email and any password. Nothing is checked.";

    return `
      <div style="max-width: 540px; margin: 30px auto;">
        <h2 style="font-size: 26px; font-weight:800; margin-bottom: 8px;">${headerText}</h2>
        <div class="sim">${protoNotice}</div>

        <div class="card" style="padding: 24px;">
          <!-- Section 17.1: Sample login dropdown for this role -->
          <div style="margin-bottom:16px; background:var(--bg); padding:10px 12px; border-radius:8px; border:1px solid var(--card-border);">
            <label style="font-size:12px; font-weight:700; color:var(--text-main); display:block; margin-bottom:4px;">
              Sample login for this role (Choose another sample user):
            </label>
            <select class="form-control" style="font-size:13px; font-weight:600;" onchange="window.app.onRoleLoginUserSelected(this.value)">
              ${userList.map(u => `
                <option value="${u.email}">${u.name} — ${u.email} (${u.stateDesc || u.sells || u.notes || ''})</option>
              `).join("")}
            </select>
            <div id="protoUserStateDesc" style="font-size:11.5px; color:var(--primary); margin-top:4px; font-weight:600;">
              ${firstUser.stateDesc || firstUser.notes || ''}
            </div>
          </div>

          <form onsubmit="window.app.handlePrototypeLogin(event)">
            <div class="form-group">
              <label class="form-label" style="font-weight:700;">Email</label>
              <input id="protoEmail" type="email" class="form-control" value="${firstUser.email}" style="font-size:15px; padding:10px;" required>
            </div>

            <div class="form-group" style="margin-top:14px;">
              <label class="form-label" style="font-weight:700;">Password</label>
              <input id="protoPassword" type="password" class="form-control" value="${firstUser.password}" style="font-size:15px; padding:10px;" required>
            </div>

            <div style="display:flex; gap:10px; margin-top:22px;">
              <button type="submit" class="btn btn-primary btn-lg" style="flex:1; font-weight:800;">
                Log in
              </button>
              <button type="button" class="btn btn-outline btn-lg" onclick="window.app.cancelPickRole()">
                ← Back
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 9. LOGGED-IN DASHBOARD TOPBAR
  // =========================================================================
  renderDashboardTopbar() {
    return "";
  }

  renderRoleScreen() {
    if (this.state.role === "Family" || this.state.roleCode === "member") return this.renderFamilyView();
    if (this.state.role === "Planner" || this.state.roleCode === "planner") return this.renderPlannerView();
    if (this.state.role === "Farmer" || this.state.roleCode === "seller") return this.renderFarmerView();
    if (this.state.role === "Shopper" || this.state.roleCode === "shopper") return this.renderShopperView();
    if (this.state.role === "Admin" || this.state.roleCode === "admin") return this.renderAdminView();
    return this.renderFamilyView();
  }

  // =========================================================================
  // 10. MEMBER SCREENS (Section 5.1 & 6.2)
  // =========================================================================
  renderFamilyView() {
    const u = this.state.currentUser;

    if (u.status === "not_submitted") {
      return this.renderFamilyNotSubmittedView();
    }
    if (u.status === "pending") {
      return this.renderFamilyPendingView();
    }
    if (u.status === "verified") {
      return this.renderFamilyPaymentAccountView();
    }

    const sub = this.state.activeSubView || "dashboard";
    if (sub === "credit") {
      return this.renderFamilyCreditTab();
    }
    if (sub === "orders") {
      return this.renderFamilyOrdersTab();
    }

    // Default: Fresh Food Store tab
    return this.renderFamilyStoreTab();
  }

  renderFamilyStoreTab() {
    const u = this.state.currentUser;
    const remaining = this.getRemainingCredit();
    const isLate = Number(u.daysLate) > 0;

    return `
      <!-- Member Account Safety Net Status Card -->
      <div class="card" style="padding: 20px; margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h2 style="margin:0; font-size:20px;">${u.name}</h2>
              <span class="tag g">VUP Direct Support</span>
            </div>
            <p class="sub" style="margin-top:4px;">${u.district || 'Kirehe'} District · ${u.householdSize || 5} family members · Disbursement ${isLate ? 'delayed by ' + u.daysLate + ' days' : 'on schedule'}</p>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11.5px; color:var(--mute);">Emergency Safety Net Credit</div>
            <b style="font-size:20px; color:var(--acc); font-weight:800;">${remaining.toLocaleString()} RWF</b>
            <div style="font-size:10.5px; color:var(--ok); font-weight:600;">0% Interest · Auto-deducted at SACCO</div>
          </div>
        </div>
      </div>

      <!-- VeggieMart Top Search & Category Filter Header -->
      <div class="vm-search-bar">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="vmSearchInput" placeholder="Search fresh beans, irish potatoes, vegetables, fruits..." oninput="window.app.filterProduceByName(this.value)">
      </div>

      <div class="vm-categories-row">
        ${["All", "Staples", "Beans", "Tubers", "Vegetables", "Flours"].map(cat => `
          <button class="vm-cat-pill ${(!this.state.activeCategory && cat === 'All') || this.state.activeCategory === cat ? 'on' : ''}" onclick="window.app.state.activeCategory='${cat}'; window.app.render();">
            ${cat === 'All' ? 'All Staples' : cat}
          </button>
        `).join("")}
      </div>

      <!-- Proximity Distance Bar -->
      ${this.renderNearbyBar()}

      <!-- Produce Grid with Bridge Credit Button -->
      ${this.renderGroceryCatalog(isLate ? 'credit' : 'cash')}
    `;
  }

  renderFamilyCreditTab() {
    const u = this.state.currentUser;
    const limit = this.calculateCreditLimit();
    const remaining = this.getRemainingCredit();
    const used = limit - remaining;

    return `
      <div class="head">
        <div>
          <h1>My Bridge Credit & SACCO Settlement</h1>
          <p class="sub">Transparent zero-interest social safety net credit under Rwanda VUP regulations.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Food Store
        </button>
      </div>

      <div class="kpis" style="margin-bottom:20px;">
        <div class="card kp">
          <span class="ki"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
          <small>Total Credit Limit</small>
          <b>${limit.toLocaleString()} RWF</b>
          <em>14 days safety net cap</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          <small>Available to Order</small>
          <b style="color:var(--ok);">${remaining.toLocaleString()} RWF</b>
          <em>ready for produce orders</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
          <small>Open Food Credit</small>
          <b style="color:var(--bad);">${used.toLocaleString()} RWF</b>
          <em>to settle upon VUP payment</em>
        </div>
      </div>

      <div class="card" style="padding:22px;">
        <h3 style="font-size:16px; font-weight:700; margin-bottom:10px;">How Repayment Works (No Surprise Fees)</h3>
        <p style="font-size:13.5px; color:var(--mute); line-height:1.6; margin-bottom:14px;">
          When your delayed government VUP transfer arrives at <b>Umurenge SACCO Kirehe</b> (Account: 078XXXX456), the exact amount of food credit you used (<b>${used.toLocaleString()} RWF</b>) will be deducted automatically with <b>0% interest and 0 fees</b>. The rest of your transfer is yours to withdraw.
        </p>
        <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Family')">
          Download Statement (PDF / CSV)
        </button>
      </div>
    `;
  }

  renderFamilyOrdersTab() {
    const u = this.state.currentUser;
    const familyOrders = this.state.orders.filter(o => o.buyerName === u.name || o.buyerEmail === u.email || o.buyerRole === "Family");

    return `
      <div class="head">
        <div>
          <h1>My Orders & Delivery Tracking</h1>
          <p class="sub">Track fresh produce orders, cooperative dispatches, and credit settlement status.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Food Store
        </button>
      </div>

      <!-- VeggieMart Order Progress Timeline Card -->
      <div class="order-tracking-card">
        <div class="ot-status-box">
          <div class="ot-circle-check">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <b style="font-size:15px; display:block;">Active Bridge Order #101 · Dry Beans (5 kg)</b>
            <small style="color:var(--mute);">Mukamana Farm Cooperative · Free SACCO Walk-in Pickup</small>
          </div>
        </div>

        <div class="ot-timeline">
          <div class="ot-step">
            <div class="ot-step-dot done">✓</div>
            <b>Order Placed on Bridge Credit</b>
            <small style="color:var(--mute);">16 Oct, 10:15 AM · 5 kg Dry Beans (3,900 RWF)</small>
          </div>
          <div class="ot-step">
            <div class="ot-step-dot done">✓</div>
            <b>Approved by Sector Planner</b>
            <small style="color:var(--mute);">16 Oct, 10:20 AM · Verified active VUP beneficiary</small>
          </div>
          <div class="ot-step">
            <div class="ot-step-dot done">✓</div>
            <b>Farmer Cooperative Ready</b>
            <small style="color:var(--mute);">16 Oct, 11:00 AM · Harvest packaged at Kirehe Co-op depot</small>
          </div>
          <div class="ot-step">
            <div class="ot-step-dot active">●</div>
            <b>Awaiting VUP Disbursement Settlement</b>
            <small style="color:var(--mute);">Will be settled automatically upon SACCO transfer</small>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Order History</h3>
        ${this.renderOrdersTable(familyOrders)}
      </div>
    `;
  }

  renderFamilyNotSubmittedView() {
    const u = this.state.currentUser;
    return `
      <h2>${this.t('roleFamilyTitle')}</h2>
      <div class="card" style="padding:22px;">
        <h3>Add my details (VUP Verification)</h3>
        <p class="small" style="margin-bottom:14px;">Enter your household details for VUP assistance verification. Do not enter a national ID number.</p>
        <form onsubmit="window.app.saveMemberDetails(event)">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input id="md_name" type="text" class="form-control" value="${u.name}" required>
          </div>
          <div class="grid grid-cols-2" style="margin-bottom:0;">
            <div class="form-group">
              <label class="form-label">Phone Number (Masked)</label>
              <input id="md_phone" type="text" class="form-control" value="078XXXX456" required>
            </div>
            <div class="form-group">
              <label class="form-label">District</label>
              <select id="md_district" class="form-control">
                ${NISR_DATA.districts.map(d => `<option value="${d.name}">${d.name}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2" style="margin-bottom:0;">
            <div class="form-group">
              <label class="form-label">People at Home</label>
              <input id="md_size" type="number" min="1" max="15" class="form-control" value="5" required>
            </div>
            <div class="form-group">
              <label class="form-label">Usual Payment Day</label>
              <input id="md_day" type="number" min="1" max="31" class="form-control" value="15" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:14px;">Submit Verification Request</button>
        </form>
      </div>
    `;
  }

  renderFamilyPendingView() {
    return `
      <h2>${this.t('roleFamilyTitle')}</h2>
      <div class="card" style="padding:22px; margin-bottom:18px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:24px;">⏳</span>
          <div>
            <b>Verification Request Submitted</b>
            <div style="font-size:13px; color:var(--mute); margin-top:2px;">
              Your details are awaiting review by Sector Planner One. Log in as Planner to approve live.
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <h3>Browse Produce Market</h3>
        ${this.renderGroceryCatalog('cash')}
      </div>
    `;
  }

  renderFamilyPaymentAccountView() {
    const u = this.state.currentUser;
    return `
      <h2>${this.t('roleFamilyTitle')}</h2>
      <div class="card" style="padding:22px;">
        <h3>Add my payment account</h3>
        <p class="sub" style="margin-bottom:14px;">Confirm your VUP payment channel to activate emergency food bridge credit.</p>
        <form onsubmit="window.app.savePaymentAccount(event)">
          <div class="form-group">
            <label class="form-label">Payment Method</label>
            <select id="pa_method" class="form-control">
              <option value="Umurenge SACCO">Umurenge SACCO</option>
              <option value="MTN Mobile Money">MTN Mobile Money</option>
              <option value="Airtel Money">Airtel Money</option>
              <option value="Bank transfer">Bank transfer (BK)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Account or Phone Number (Masked)</label>
            <input id="pa_acc" type="text" class="form-control" value="078XXXX456" required>
          </div>
          <div class="form-group">
            <label class="form-label">Account Holder Name</label>
            <input id="pa_holder" type="text" class="form-control" value="${u.name}" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Confirm Payment Account & Open Credit</button>
        </form>
      </div>
    `;
  }

  renderPlannerView() {
    const sub = this.state.activeSubView || "dashboard";

    if (sub === "creditdesk") {
      return this.renderPlannerCreditDeskTab();
    }
    if (sub === "nisr_facts") {
      return this.renderNisrFactsDoc();
    }
    if (sub === "analysis") {
      return this.renderAnalysisView();
    }
    if (sub === "cases") {
      return this.renderPlannerCasesTab();
    }
    if (sub === "reports") {
      return this.renderPlannerReportsTab();
    }

    // Default: Executive Overview Dashboard
    return this.renderPlannerOverviewTab();
  }

  renderPlannerOverviewTab() {
    const vupOrders = this.state.orders.filter(o => o.buyerRole === "Family" || o.mode === "credit");
    const creditOrders = vupOrders.filter(x => x.mode === "credit");
    const totalCredit = creditOrders.reduce((sum, x) => sum + x.total, 0);
    const outstanding = this.getOutstandingCredit();
    const tf = this.state.timeframe || "month";
    const tfMult = tf === "week" ? 0.25 : tf === "year" ? 12 : 1;
    const provinceMaxDelay = Math.max(...NISR_DATA.provinces.map(p => p.delay));

    return `
      <!-- Vertix Dashboard Header -->
      <div class="head">
        <div>
          <h1>Good morning, ${this.state.currentUser.name || 'Planner One'}</h1>
          <p class="sub">A clear view of payments, food credit, and open cases.</p>
        </div>
        
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <div class="seg">
            <button class="${tf === 'week' ? 'on' : ''}" onclick="window.app.setTimeframe('week')" title="1 week timeframe">1 Week</button>
            <button class="${tf === 'month' ? 'on' : ''}" onclick="window.app.setTimeframe('month')" title="1 month timeframe">1 Month</button>
            <button class="${tf === 'year' ? 'on' : ''}" onclick="window.app.setTimeframe('year')" title="1 year timeframe">1 Year</button>
          </div>

          <button class="btn btn-sm btn-primary" onclick="window.app.setNavTab('nisr_facts')" title="View official NISR document">
            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg> NISR source
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Planner')">
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download activity
          </button>
        </div>
      </div>

      <!-- Hard Rule 2 Banner -->
      <div class="card" style="background:var(--accsoft); border:1px solid rgba(14,99,94,0.3); padding:12px 18px; border-radius:18px; display:flex; align-items:center; gap:12px; margin-bottom:18px;">
        <span style="font-size:20px; flex:none;">💡</span>
        <div>
          <b style="font-size:13px; color:var(--acc);">Survey results are not live payment records.</b>
          <div style="font-size:11.5px; color:var(--mute);">Survey results show a pattern. They do not explain why one payment was late. Check a case before taking action.</div>
        </div>
      </div>

      <!-- Vertix 5 KPI Cards with Real SVG Stroke Icons -->
      <div class="kpis" style="margin-bottom:20px;">
        <div class="card kp" onclick="window.app.setNavTab('creditdesk')" style="cursor:pointer;" title="Tap to open Credit Desk">
          <span class="ki"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 4.5a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-5-5.5"/></svg></span>
          <small>VUP Families</small>
          <b>${Math.round(6 * tfMult)}</b>
          <em>sample dashboard count</em>
        </div>
        <div class="card kp" title="Families whose VUP payment is late today">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          <small>Late Payments</small>
          <b style="color:var(--bad);">${Math.round(4 * tfMult)}</b>
          <em>avg 9.2 days late</em>
        </div>
        <div class="card kp" onclick="window.app.setNavTab('creditdesk')" style="cursor:pointer;" title="Tap to open Credit Desk">
          <span class="ki"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
          <small>Bridge Credit</small>
          <b style="color:var(--acc);">${Math.round(totalCredit * tfMult).toLocaleString()} RWF</b>
          <em>${outstanding.toLocaleString()} RWF open</em>
        </div>
        <div class="card kp" title="Community revolving bridge float">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);"><svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18"/></svg></span>
          <small>Revolving Pool</small>
          <b>${this.state.pool.balance.toLocaleString()} RWF</b>
          <em>${Math.round(this.state.pool.balance / (5 * 261))} days food cover</em>
        </div>
        <div class="card kp" onclick="window.app.setNavTab('cases')" style="cursor:pointer;" title="Tap to see alerts">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>
          <small>Active Alerts</small>
          <b style="color:var(--bad);">3 Alerts</b>
          <em>attention needed</em>
        </div>
      </div>

      <!-- Interactive Rwandan Delay Bar Chart -->
      <section class="card" style="margin-bottom:20px;">
        <div class="ch">
          <div>
            <h3>Average VUP Disbursement Delay by Province</h3>
            <p class="sub" style="margin-top:4px;">NISR household survey · average reported wait: 9.2 days</p>
          </div>
            <span class="tag y">52% waited over 7 days</span>
        </div>
        <div class="bars" role="list" aria-label="Average payment delay by province">
          ${NISR_DATA.provinces.map((p, index) => `<button class="bc ${index < 2 ? 'on' : ''}" title="${p.name}: ${p.delay.toFixed(1)} days; ${p.latePct}% over 7 days; ${p.records} records" aria-label="${p.name}: ${p.delay.toFixed(1)} days average delay, ${p.latePct}% over 7 days, ${p.records} survey records">
            <span class="tip">${p.delay.toFixed(1)} days · ${p.latePct}% over 7 days</span><i style="height:${Math.max(6, p.delay / provinceMaxDelay * 100)}%;"></i><em>${p.name === 'City of Kigali' ? 'Kigali' : p.name.replace(' Province', '')}</em>
          </button>`).join('')}
        </div>
      </section>

      <!-- 3 Quick Action Cards -->
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div class="card" style="padding:20px; display:flex; flex-direction:column;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <h4 style="font-size:15px; font-weight:700;">Credit Desk Actions</h4>
            <span class="tag r">4 Items</span>
          </div>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:14px; line-height:1.45;">
            1 family verification to approve, 1 seller payout to disburse, and 2 credit settlements due.
          </p>
          <button class="btn btn-sm btn-primary" style="margin-top:auto;" onclick="window.app.setNavTab('creditdesk')">
            Open Credit Desk →
          </button>
        </div>

        <div class="card" style="padding:20px; display:flex; flex-direction:column;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <h4 style="font-size:15px; font-weight:700;">NISR Delay Analysis</h4>
            <span class="tag g">Survey baseline</span>
          </div>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:14px; line-height:1.45;">
            Read the national findings in plain language, compare programmes and districts, and export a dated report. The figures are provisional pending final weighting.
          </p>
          <button class="btn btn-sm btn-outline" style="margin-top:auto;" onclick="window.app.setNavTab('analysis')">
            Open NISR Analysis →
          </button>
          <button class="btn btn-sm btn-ghost" style="margin-top:6px;" onclick="window.app.setNavTab('nisr_facts')">
            Source facts & definitions
          </button>
        </div>

        <div class="card" style="padding:20px; display:flex; flex-direction:column;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <h4 style="font-size:15px; font-weight:700;">Gemini AI Assistant</h4>
            <span class="tag" style="background:rgba(126,34,206,.12); color:#7e22ce;">Natural AI</span>
          </div>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:14px; line-height:1.45;">
            Query disbursement patterns, translate produce listings, and analyze sector liquidity.
          </p>
          <button class="btn btn-sm btn-outline" style="margin-top:auto; border-color:#7e22ce; color:#7e22ce;" onclick="window.app.openGeminiModal()">
            Launch Gemini AI Assistant →
          </button>
        </div>
      </div>
    `;
  }

  renderPlannerCreditDeskTab() {
    return `
      <div class="head">
        <div>
          <h1>Credit Desk Liquidity & Queues</h1>
          <p class="sub">Review family credit requests, seller payments, and repayments.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Overview
        </button>
      </div>

      ${this.renderCreditDesk()}
    `;
  }

  renderPlannerCasesTab() {
    return `
      <div class="head">
        <div>
          <h1>Payment Disputes & Banking Reversals</h1>
          <p class="sub">Investigate administrative delays, SACCO clearance exceptions, and banking error reversals.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Overview
        </button>
      </div>

      <div class="card" style="margin-bottom:20px;">
        <h3>Active System Alerts</h3>
        ${this.renderAlertsBox()}
      </div>

      ${this.renderCasesQueue()}
    `;
  }

  renderPlannerReportsTab() {
    return `
      <div class="head">
        <div>
          <h1>Reports & Data Exports</h1>
          <p class="sub">Export summaries and raw analytical datasets in PDF, CSV, and JSON formats.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Overview
        </button>
      </div>

      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div class="card" style="padding:22px;">
          <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Official NISR Analytical Report</h4>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:16px;">Complete 12-section PDF document compiled with household survey evidence.</p>
          <button class="btn btn-sm btn-primary" onclick="window.app.downloadNisrPdf()">
            Download NISR Report (PDF)
          </button>
        </div>

        <div class="card" style="padding:22px;">
          <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">Credit Desk Ledger Statement</h4>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:16px;">Detailed statement of approved credit, seller floats, and SACCO repayments.</p>
          <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Planner')">
            Export Ledger (CSV / PDF)
          </button>
        </div>

        <div class="card" style="padding:22px;">
          <h4 style="font-size:15px; font-weight:700; margin-bottom:6px;">30-District Delay Microdata</h4>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:16px;">Raw JSON and summary figures for provincial delay distributions.</p>
          <button class="btn btn-sm btn-outline" onclick="window.app.downloadFile('rwanda-vup-delays.json', JSON.stringify(NISR_DATA.delaysByProvince, null, 2), 'application/json')">
            Export Microdata (JSON)
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 12. CREDIT DESK WITH THREE QUEUES (To Approve, To Pay Sellers, To Repay)
  // =========================================================================
  getToApproveQueue() {
    return (this.state.orders || []).filter(o => o.mode === "credit" && (o.status === "Pending Approval" || o.creditStatus === "requested"));
  }

  getToPaySellersQueue() {
    return (this.state.orders || []).filter(o => o.mode === "credit" && o.status === "Delivered" && o.paidBy !== "pool");
  }

  getToRepayQueue() {
    return (this.state.orders || []).filter(o => o.mode === "credit" && o.status === "Delivered" && o.paidBy === "pool" && !o.repaid);
  }

  renderCreditDesk() {
    const q1 = this.getToApproveQueue();
    const q2 = this.getToPaySellersQueue();
    const q3 = this.getToRepayQueue();

    const lang = this.state.lang || "en";
    const deskTitle = lang === 'rw' ? "Ibiro by'Inguzanyo (Amatsinda 3)" : lang === 'fr' ? "Bureau du Crédit (3 files d'attente)" : "The Credit Desk (3 Queues)";

    return `
      <div class="credit-desk">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <h3 style="font-size:18px; font-weight:800;">${deskTitle}</h3>
          <button class="btn btn-ghost btn-sm" style="color:#7e22ce; font-weight:700; font-size:12px;" onclick="window.app.explainNumbersInEasyWords('queues')">
            ✨ Explain Queues in Easy Words
          </button>
        </div>
        <p class="small" style="color:var(--text-muted); margin-bottom:12px;">Track bridge credit through verification, seller payout, and treasury reimbursement:</p>

        <div class="queue-grid">
          <!-- Queue 1: To Approve -->
          <div class="queue-card">
            <div class="queue-head">
              <div>
                <b style="font-size:14.5px;">1. To Approve</b>
                <div style="font-size:11px; color:var(--text-muted);">Eligibility check & credit cap</div>
              </div>
              <span class="queue-badge" style="background:#fef3c7; color:#92400e;">${q1.length} pending</span>
            </div>
            <div style="flex:1;">
              ${q1.length ? q1.map(o => `
                <div class="queue-item">
                  <div style="display:flex; justify-content:space-between; font-weight:700;">
                    <span>#${o.id} ${o.food} (${o.kg} kg)</span>
                    <b style="color:var(--primary);">${o.total.toLocaleString()} RWF</b>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-muted); margin:3px 0;">Family: <b>${o.buyerName}</b> · ${o.district}</div>
                  <button class="btn btn-sm btn-primary" style="width:100%; margin-top:6px; padding:4px;" onclick="window.app.approveCredit(${o.id})">
                    ✓ Approve Credit
                  </button>
                </div>
              `).join("") : '<p class="small" style="color:var(--text-muted); text-align:center; padding:18px 0;">✓ All credit applications approved</p>'}
            </div>
          </div>

          <!-- Queue 2: To Pay Sellers -->
          <div class="queue-card">
            <div class="queue-head">
              <div>
                <b style="font-size:14.5px;">2. To Pay Sellers</b>
                <div style="font-size:11px; color:var(--text-muted);">Disburse pool money to farmer</div>
              </div>
              <span class="queue-badge" style="background:#fee2e2; color:#991b1b;">${q2.length} pending</span>
            </div>
            <div style="flex:1;">
              ${q2.length ? q2.map(o => `
                <div class="queue-item">
                  <div style="display:flex; justify-content:space-between; font-weight:700;">
                    <span>#${o.id} ${o.food} (${o.kg} kg)</span>
                    <b style="color:var(--danger);">${o.total.toLocaleString()} RWF</b>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-muted); margin:3px 0;">Seller: <b>${o.farmer}</b> · Delivered ✓</div>
                  <button class="btn btn-sm btn-primary" style="width:100%; margin-top:6px; padding:4px; background:var(--ok); border-color:var(--ok);" onclick="window.app.disburseToSeller(${o.id})">
                    💸 Pay Seller (MoMo)
                  </button>
                </div>
              `).join("") : '<p class="small" style="color:var(--text-muted); text-align:center; padding:18px 0;">✓ All delivered sellers paid</p>'}
            </div>
          </div>

          <!-- Queue 3: To Repay -->
          <div class="queue-card">
            <div class="queue-head">
              <div>
                <b style="font-size:14.5px;">3. To Repay</b>
                <div style="font-size:11px; color:var(--text-muted);">Awaiting VUP treasury wave</div>
              </div>
              <span class="queue-badge" style="background:#e0e7ff; color:#3730a3;">${q3.length} open</span>
            </div>
            <div style="flex:1;">
              ${q3.length ? q3.map(o => `
                <div class="queue-item">
                  <div style="display:flex; justify-content:space-between; font-weight:700;">
                    <span>#${o.id} ${o.food}</span>
                    <b style="color:#4338ca;">${o.total.toLocaleString()} RWF</b>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-muted); margin:3px 0;">Family: <b>${o.buyerName}</b> ${o.isOverdue ? '<span style="color:var(--danger); font-weight:700;">(Overdue)</span>' : ''}</div>
                  <div style="display:flex; gap:6px; margin-top:6px;">
                    <button class="btn btn-sm btn-outline" style="flex:1; padding:4px;" onclick="window.app.settleFromVup(${o.id})">
                      ⚡ Repay from VUP
                    </button>
                    <button class="btn btn-sm btn-ghost" style="padding:4px; font-size:11px; color:var(--mute);" onclick="window.app.writeOffCredit(${o.id})" title="Write-off (never punish family)">
                      Write-off
                    </button>
                  </div>
                </div>
              `).join("") : '<p class="small" style="color:var(--text-muted); text-align:center; padding:18px 0;">✓ No open credit awaiting repayment</p>'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 13. "WHAT IS NOT GOING WELL" ALERTS BOX (Section 7.3 Rules)
  // =========================================================================
  renderAlertsBox() {
    const lang = this.state.lang || "en";
    const title = lang === 'rw' 
      ? "⚠️ Ibibazo Bihari Bikwiye Kwitabwaho (What is not going well):" 
      : lang === 'fr' 
      ? "⚠️ Ce qui ne va pas (Alertes critiques) :" 
      : "⚠️ What is not going well (Active Problem Alerts):";

    return `
      <div class="alert-box">
        <b style="color:var(--danger); font-size:14.5px; display:block; margin-bottom:8px;">${title}</b>
        
        <div class="alert-item">
          <span style="font-size:16px;">🚨</span>
          <div>
            <b>Southern Province Delay Hotspot:</b> Expanded Public Works in the Southern Province reaches <b>14.6 days delay</b> (79% over 7 days). Manual attendance logs in Gisagara and Huye cause critical food security gaps.
          </div>
        </div>

        <div class="alert-item">
          <span style="font-size:16px;">⚠️</span>
          <div>
            <b>Overdue Credit in Gisagara:</b> Credit #103 (Jean Bosco Habimana, 6,000 RWF) is overdue by 14 days awaiting sector payment reconciliation.
          </div>
        </div>

        <div class="alert-item">
          <span style="font-size:16px;">⚠️</span>
          <div>
            <b>Pool Cover Liquidity:</b> Current bridge pool balance is <b>${this.state.pool.balance.toLocaleString()} RWF</b> (~15 days food cover). Buffer is approaching the 14-day amber threshold.
          </div>
        </div>
      </div>
    `;
  }

  // Cases Queue (Section 16.3)
  renderCasesQueue() {
    const cases = this.state.cases || [];
    return `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div>
            <h3 style="font-size:17px; font-weight:800;">🛟 Problem Cases Queue (${cases.length})</h3>
            <div style="font-size:12px; color:var(--text-muted);">Disputed orders, missing payouts, and member problem reports:</div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="window.app.openCaseModal('General')">🚩 Report Problem</button>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Case ID</th><th>Reported By</th><th>Tx Link</th><th>Problem Type</th><th>Note</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${cases.map(c => `
                <tr>
                  <td><b>#C-${c.id}</b></td>
                  <td>${c.createdBy} (${c.role})</td>
                  <td><b>${c.linkedTransaction}</b></td>
                  <td><span class="pill pill-urgent">${c.type}</span></td>
                  <td><small>${c.note}</small></td>
                  <td><span class="pill ${c.status === 'resolved' ? 'pill-fair' : 'pill-high'}">${c.status}</span></td>
                  <td>
                    ${c.status !== 'resolved' ? `
                      <button class="btn btn-sm btn-primary" style="padding:2px 8px; font-size:11px;" onclick="window.app.resolveCase(${c.id}, 'reversal')">Resolve</button>
                    ` : '<span style="color:var(--success); font-weight:700;">Resolved ✓</span>'}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 14. GEMINI AI HELPER CARD (Explains Numbers in Easy Words)
  // =========================================================================
  renderAiHelperCard() {
    const lang = this.state.lang || "en";
    const aiTitle = lang === 'rw' 
      ? "✨ Ubufasha bwa Gemini AI — 'Sobanura Iyi Mibare mu Magambo Yoroshye'" 
      : lang === 'fr' 
      ? "✨ Assistant Gemini AI — 'Expliquer les Chiffres en Mots Simples'" 
      : "✨ Gemini AI Helper — 'Explain the Numbers in Easy Words'";

    return `
      <div class="ai-helper-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
          <b style="color:#7e22ce; font-size:15px;">${aiTitle}</b>
          <button class="btn btn-outline btn-sm" style="border-color:#7e22ce; color:#7e22ce; font-size:11px; padding:2px 8px;" onclick="window.app.openGeminiModal()">
            Open Full AI Translator 🌐
          </button>
        </div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">Click below to hear an easy, plain-language 4-part explanation of these numbers:</p>

        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <button class="ai-prompt-chip" onclick="window.app.explainNumbersInEasyWords('delay')">
            💡 Explain delay numbers in plain words
          </button>
          <button class="ai-prompt-chip" onclick="window.app.explainNumbersInEasyWords('queues')">
            💡 How the 3 queues protect money
          </button>
          <button class="ai-prompt-chip" onclick="window.app.explainNumbersInEasyWords('pool')">
            💡 How the revolving pool stays alive
          </button>
        </div>

        <div id="aiExplainerResult" style="display:none; background:var(--card-bg); border:1px solid rgba(126,34,206,0.3); border-radius:10px; padding:12px; margin-top:12px;"></div>
      </div>
    `;
  }

  // =========================================================================
  // 15. SELLER SCREEN (Farmer / Cooperative)
  // =========================================================================
  renderFarmerView() {
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

  renderShopperView() {
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === "Shopper" || o.buyerEmail === u.email);
    const totalGifts = myOrders.reduce((sum, o) => sum + (o.gift || 0), 0);
    const dpp = 5 * this.state.adminSettings.dailyFoodCost;
    const daysFunded = (totalGifts / dpp).toFixed(1);

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
        <h2>${this.t('roleShopperTitle')}</h2>
        <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Shopper')">
          🧾 Download Purchases & Gifts (PDF/CSV)
        </button>
      </div>

      <p class="sub">Buy farm-fresh produce with MTN MoMo, Airtel, or BK. A small donation share refills the bridge pool that keeps waiting families fed.</p>

      <div class="card">
        <div class="f">
          <label style="display:flex; align-items:center; gap:10px;">
            <span>Share to pool: <b>${u.giftShare || 2}%</b></span>
            <input type="range" min="1" max="5" value="${u.giftShare || 2}" 
              oninput="window.app.state.currentUser.giftShare = +this.value; window.app.saveState(); window.app.render();" style="width:160px;">
          </label>
        </div>
        <div class="stats" style="margin-top:12px;">
          <div class="stat"><b style="color:var(--accent);">${totalGifts.toLocaleString()} RWF</b><span>you gave so far</span></div>
          <div class="stat"><b style="color:var(--success);">${daysFunded}</b><span>days of food for a family of 5</span></div>
          <div class="stat"><b>${this.state.pool.balance.toLocaleString()} RWF</b><span>pool balance today</span></div>
        </div>
      </div>

      <!-- Nearby Proximity Bar -->
      ${this.renderNearbyBar()}

      <div class="card">
        <h3>🛒 Buy Food</h3>
        ${this.renderGroceryCatalog('cash')}
      </div>

      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3>🧾 My Orders & Receipts</h3>
          <button class="btn btn-sm btn-ghost" onclick="window.app.openStatementModal('Shopper')">Download CSV / PDF</button>
        </div>
        ${this.renderOrdersTable(myOrders)}
      </div>
    `;
  }

  // =========================================================================
  // 17. GOVERNMENT WORKER (ADMIN) SCREEN (Sees Whole System & Demo Switch)
  // =========================================================================
  renderAdminView() {
    if (this.state.activeSubView === "nisr_facts") {
      return this.renderNisrFactsDoc();
    }
    const allUsers = [];
    for (const [r, list] of Object.entries(this.state.users || {})) {
      list.forEach(u => allUsers.push({ ...u, role: r.toUpperCase() }));
    }

    const totalSales = this.state.orders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);
    const cases = this.state.cases || [];

    return `
      <!-- Vertix Admin Header -->
      <div class="head">
        <div>
          <h1>System Administration & Audit</h1>
          <p class="sub">Review users, payments, cases, and reports in one place.</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm btn-acc" onclick="window.app.openAnalysisReportModal()">
            📄 Make Analysis Report
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Admin')">
            📥 Export System Audit
          </button>
        </div>
      </div>

      <!-- Admin Demo Switch: 'Make the next payment fail' -->
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <b style="font-size:14.5px;">Demo Switch for Judges: 'Make the next payment fail'</b>
          <div style="font-size:12px; color:var(--mute); margin-top:2px;">
            When toggled ON, the next seller payout will simulate a Mobile Money float failure to test problem reporting and reversal flow.
          </div>
        </div>
        <button class="sw ${this.state.adminSettings.makeNextPaymentFail ? 'on' : ''}" 
          onclick="window.app.toggleMakeNextPaymentFail()" 
          title="Toggle payment failure simulation" 
          aria-label="Make next payment fail"></button>
      </div>

      <!-- Top Master KPIs -->
      <div class="kpis">
        <div class="card kp">
          <span class="ki">👥</span>
          <small>Total Users</small>
          <b>${allUsers.length}</b>
          <em>members, sellers, shoppers</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);">🛒</span>
          <small>Total Sales</small>
          <b style="color:var(--ok);">${totalSales.toLocaleString()} RWF</b>
          <em>gross market volume</em>
        </div>
        <div class="card kp">
          <span class="ki">🏦</span>
          <small>Pool Balance</small>
          <b>${this.state.pool.balance.toLocaleString()} RWF</b>
          <em>liquidity available</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);">🛟</span>
          <small>Problem Cases</small>
          <b style="color:var(--bad);">${cases.length} Open</b>
          <em>audit queue</em>
        </div>
      </div>

      <section class="card nisr-admin-entry" style="margin:0 0 20px; padding:18px 20px; border-left:4px solid var(--acc);">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <div>
            <span class="tag g">NISR EICV7 · 2023–24</span>
            <h3 style="margin:8px 0 4px;">National payment-delay analysis</h3>
            <p class="sub">Early survey estimates: an average wait of 9.2 days; 52% waited over 7 days. These numbers may change after final checks.</p>
          </div>
          <button class="btn btn-sm btn-primary" onclick="window.app.setNavTab('analysis')">Open NISR Analysis →</button>
        </div>
      </section>

      <!-- Two-column grid -->
      <div class="grid g2">
        <div class="left">
          ${this.renderCreditDesk()}
          ${this.renderCasesQueue()}
          <div class="card">
            <div class="ch">
              <h3>All System Orders (${this.state.orders.length})</h3>
            </div>
            ${this.renderOrdersTable(this.state.orders)}
          </div>
        </div>
        <div class="left">
          <div class="card">
            <div class="ch">
              <h3>All Registered Users (${allUsers.length})</h3>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th></tr></thead>
                <tbody>
                  ${allUsers.map(u => `
                    <tr>
                      <td><b>${u.name}</b></td>
                      <td><span class="tag">${u.role}</span></td>
                      <td><small>${u.email}</small></td>
                      <td><span class="tag ${u.status === 'pending' ? 'y' : 'g'}">${u.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 18. ANALYSIS & GIS OBSERVATORY (30 Districts, Microdata, Shared DB)
  // =========================================================================
  escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }

  localDateInput(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  getAnalysisPeriod() {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const preset = this.state.analysisPeriod || "30d";
    let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today);
    let label = "Last 30 days";
    if (preset === "today") {
      label = "Today";
    } else if (preset === "7d" || preset === "30d" || preset === "12m") {
      const days = preset === "7d" ? 7 : preset === "30d" ? 30 : 365;
      start.setDate(start.getDate() - days + 1);
      label = preset === "7d" ? "Last 7 days" : preset === "30d" ? "Last 30 days" : "Last 12 months";
    } else if (preset === "custom") {
      const defaultStart = new Date(start);
      defaultStart.setDate(defaultStart.getDate() - 29);
      const fromText = this.state.analysisFrom || this.localDateInput(defaultStart);
      const toText = this.state.analysisTo || this.localDateInput(today);
      const fromParts = fromText.split("-").map(Number);
      const toParts = toText.split("-").map(Number);
      if (fromParts.length === 3 && fromParts.every(Number.isFinite)) start = new Date(fromParts[0], fromParts[1] - 1, fromParts[2]);
      const end = new Date(today);
      if (toParts.length === 3 && toParts.every(Number.isFinite)) end.setTime(new Date(toParts[0], toParts[1] - 1, toParts[2], 23, 59, 59, 999).getTime());
      label = `${start.toLocaleDateString("en-GB")} – ${end.toLocaleDateString("en-GB")}`;
      return { start, end, from: this.localDateInput(start), to: this.localDateInput(end), label };
    }
    return { start, end, from: this.localDateInput(start), to: this.localDateInput(end), label };
  }

  parseOrderDate(value) {
    if (!value) return null;
    const text = String(value).trim();
    const lower = text.toLowerCase();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (/^(just now|today)(\b|,)/i.test(lower) || /^\d{1,2}:\d{2}$/.test(lower)) return today;
    if (lower.startsWith("yesterday")) { today.setDate(today.getDate() - 1); return today; }
    let match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    match = text.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})/);
    if (match) return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? null : new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }

  getOrderDateLabel(value) {
    const date = this.parseOrderDate(value);
    if (!date) return value || "Date not recorded";
    const time = String(value || "").match(/\b(\d{1,2}:\d{2})\b/);
    return `${date.toLocaleDateString("en-GB")}${time ? ` ${time[1]}` : ""}`;
  }

  getTransactionsForAnalysisPeriod(period = this.getAnalysisPeriod()) {
    return (this.state.orders || []).filter(order => {
      const date = this.parseOrderDate(order.date);
      return date && date >= period.start && date <= period.end;
    }).sort((a, b) => (this.parseOrderDate(b.date)?.getTime() || 0) - (this.parseOrderDate(a.date)?.getTime() || 0));
  }

  setAnalysisPeriod(period) {
    this.state.analysisPeriod = period;
    if (period === "custom") {
      const defaultStart = new Date();
      defaultStart.setDate(defaultStart.getDate() - 29);
      this.state.analysisFrom = this.state.analysisFrom || this.localDateInput(defaultStart);
      this.state.analysisTo = this.state.analysisTo || this.localDateInput(new Date());
    }
    this.saveState();
    this.render();
  }

  applyAnalysisDates() {
    const from = document.getElementById("analysisFrom")?.value;
    const to = document.getElementById("analysisTo")?.value;
    if (!from || !to || from > to) {
      this.toast("Choose a valid start date and end date.", "warning");
      return;
    }
    this.state.analysisPeriod = "custom";
    this.state.analysisFrom = from;
    this.state.analysisTo = to;
    this.saveState();
    this.render();
  }

  getAnalysisReportData() {
    const period = this.getAnalysisPeriod();
    const transactions = this.getTransactionsForAnalysisPeriod(period);
    const creditOrders = transactions.filter(order => order.mode === "credit");
    return { period, transactions, creditOrders, totalValue: transactions.reduce((sum, order) => sum + (Number(order.total) || 0), 0) };
  }

  renderAnalysisView() {
    const overall = NISR_DATA.overall;
    const period = this.getAnalysisPeriod();
    const transactions = this.getTransactionsForAnalysisPeriod(period);
    const credit = transactions.filter(o => o.mode === "credit");
    const periodLabel = period.label;
    const programmes = NISR_DATA.programmes || [];
    const maxDelay = Math.max(...programmes.map(p => p.delay));
    const districtHotspots = [...NISR_DATA.districts].sort((a, b) => b.delay - a.delay).slice(0, 5);
    const groupComparisons = Object.entries(NISR_DATA.groups || {}).flatMap(([group, rows]) => rows.map(row => ({ group, ...row })));
    return `
      <div class="head nisr-analysis-head">
        <div><h1>NISR payment-delay analysis</h1><p class="sub">What the 2023–24 household survey says about VUP payment waits.</p></div>
        <div class="nisr-export-actions">
          <button class="btn btn-sm btn-primary" onclick="window.app.openAnalysisReportModal()">Print / Save report as PDF</button>
          <button class="btn btn-sm btn-outline" onclick="window.app.downloadAnalysisCsv()">Download analysis CSV</button>
        </div>
      </div>

      <div class="card nisr-truth-note"><b>Before you read:</b> These NISR survey numbers are early estimates. They may change after the final checks. The date filter below changes demo orders only; it does not change the 2023–24 survey results. Survey results show patterns, not the reason one person's payment was late. <a href="https://microdata.statistics.gov.rw/index.php/catalog/121" target="_blank" rel="noopener">View the NISR survey source</a>.</div>

      <div class="nisr-kpis">
        <article class="card"><small>Average delay</small><strong>${overall.averageDelayDays.toFixed(1)} days</strong><span>Across ${overall.totalBeneficiaries.toLocaleString()} VUP beneficiary records</span></article>
        <article class="card"><small>Waited more than 7 days</small><strong>${overall.pctOver7DaysLate}%</strong><span>About 1 in 2 surveyed beneficiaries</span></article>
        <article class="card"><small>Longest average in this summary</small><strong>14.6 days</strong><span>Expanded Public Works · Southern Province · 140 records</span></article>
        <article class="card"><small>Districts in the summary</small><strong>${NISR_DATA.districts.length}</strong><span>Survey results, not live payment tracking</span></article>
      </div>

      <section class="card nisr-explainer">
        <h3>What the findings mean</h3>
        <ul>
          <li>The national average is <b>${overall.averageDelayDays.toFixed(1)} days</b>, and <b>${overall.pctOver7DaysLate}%</b> of surveyed beneficiaries reported waits longer than a week.</li>
          <li>Average waits differ by VUP programme. Expanded Public Works has the longest average in this summary (${programmes[0].delay.toFixed(1)} days).</li>
          <li>The longest listed wait is in Expanded Public Works in Southern Province: <b>14.6 days</b> on average. <b>79%</b> waited over 7 days (140 records).</li>
          <li>These results do not explain the cause or show whether a family's current payment has arrived.</li>
        </ul>
      </section>

      <section class="card nisr-programmes">
        <div class="ch"><div><h3>Average wait by VUP programme</h3><p class="sub">Bars show the average wait. The table shows the number of survey records.</p></div></div>
        <div class="nisr-bar-list" role="list">
          ${programmes.map(p => `<div class="nisr-bar-row" role="listitem"><span>${p.name}</span><div class="nisr-bar-track" aria-label="${p.delay} days average delay"><i style="width:${Math.max(4, (p.delay / maxDelay) * 100)}%"></i></div><b>${p.delay.toFixed(1)} days</b><small>${p.latePct}% over 7 days · n=${p.records.toLocaleString()}</small></div>`).join("")}
        </div>
        <div class="table-wrap"><table><thead><tr><th>Programme</th><th>Average delay</th><th>Over 7 days</th><th>Records</th></tr></thead><tbody>${programmes.map(p => `<tr><td>${p.name}</td><td>${p.delay.toFixed(1)} days</td><td>${p.latePct}%</td><td>${p.records.toLocaleString()}</td></tr>`).join("")}</tbody></table></div>
      </section>

      <section class="card nisr-comparison">
        <div class="ch"><div><h3>Province comparison</h3><p class="sub">Averages and late shares from the survey summaries.</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>Province</th><th>Average delay</th><th>Over 7 days</th><th>Records</th><th>Sample note</th></tr></thead><tbody>${NISR_DATA.provinces.map(p => `<tr><td>${p.name}</td><td>${p.delay.toFixed(1)} days</td><td>${p.latePct}%</td><td>${p.records.toLocaleString()}</td><td>${p.records < 100 ? 'Small sample; interpret cautiously' : '100+ records'}</td></tr>`).join("")}</tbody></table></div>
        <p class="sub" style="margin-top:10px;">Small groups are less certain. Read results from fewer than 100 records with care; results under 25 records are hidden.</p>
      </section>

      <section class="card nisr-comparison">
        <div class="ch"><div><h3>Districts with the longest reported waits</h3><p class="sub">Ranked by average wait. Small groups can make results less certain.</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>District</th><th>Province</th><th>Average delay</th><th>Records</th><th>Reliability</th></tr></thead><tbody>${districtHotspots.map(d => `<tr><td>${d.name}</td><td>${d.province}</td><td>${d.records < 25 ? 'Suppressed' : `${d.delay.toFixed(1)} days`}</td><td>${d.records < 25 ? '—' : d.records}</td><td>${d.records < 25 ? 'Suppressed (<25)' : d.records < 100 ? 'Caution (<100)' : '100+ records'}</td></tr>`).join("")}</tbody></table></div>
      </section>

      <section class="card nisr-comparison">
        <div class="ch"><div><h3>Differences between surveyed groups</h3><p class="sub">Descriptive comparisons across payment method, poverty group, location, sex, and age.</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>Category</th><th>Group</th><th>Average delay</th><th>Over 7 days</th><th>Records</th><th>Sample note</th></tr></thead><tbody>${groupComparisons.map(row => `<tr><td>${row.group}</td><td>${row.name}</td><td>${row.records < 25 ? 'Suppressed' : `${row.delay.toFixed(1)} days`}</td><td>${row.records < 25 ? '—' : `${row.latePct}%`}</td><td>${row.records < 25 ? '—' : row.records.toLocaleString()}</td><td>${row.records < 25 ? 'Suppressed (<25)' : row.records < 100 ? 'Caution (<100)' : '100+ records'}</td></tr>`).join("")}</tbody></table></div>
        <p class="sub" style="margin-top:10px;">Differences between groups do not prove why waits differ. Poverty status is measured after support and must not be used alone to decide who gets help.</p>
      </section>

      <section class="card nisr-date-panel">
        <div class="ch"><div><h3>Prototype transaction activity</h3><p class="sub">Choose a period to review simulated orders. This does not filter the NISR survey baseline.</p></div></div>
        <div class="nisr-period-controls">
          <label>Period<select class="form-control" onchange="window.app.setAnalysisPeriod(this.value)">
            ${[['today','Today'],['7d','Last 7 days'],['30d','Last 30 days'],['12m','Last 12 months'],['custom','Choose dates']].map(([v,l])=>`<option value="${v}" ${this.state.analysisPeriod===v?'selected':''}>${l}</option>`).join('')}
          </select></label>
          ${this.state.analysisPeriod === 'custom' ? `<label>From<input class="form-control" id="analysisFrom" type="date" value="${period.from}"></label><label>To<input class="form-control" id="analysisTo" type="date" value="${period.to}"></label><button class="btn btn-sm btn-outline" onclick="window.app.applyAnalysisDates()">Apply dates</button>` : ''}
          <span class="nisr-range-label">${periodLabel}</span>
        </div>
        <div class="nisr-kpis nisr-activity-kpis">
          <article class="card"><small>Orders in period</small><strong>${transactions.length}</strong><span>Simulated prototype records</span></article>
          <article class="card"><small>Order value</small><strong>${transactions.reduce((s,o)=>s+(Number(o.total)||0),0).toLocaleString()} RWF</strong><span>Demo only · no real payment</span></article>
          <article class="card"><small>Credit orders</small><strong>${credit.length}</strong><span>${credit.reduce((s,o)=>s+(Number(o.total)||0),0).toLocaleString()} RWF simulated credit</span></article>
        </div>
        <div class="nisr-export-actions" style="margin:12px 0;">
          <button class="btn btn-sm btn-primary" onclick="window.app.downloadTransactionsCsv()">Download transactions CSV</button>
          <button class="btn btn-sm btn-outline" onclick="window.app.openAnalysisReportModal()">Create dated report</button>
        </div>
        <div class="table-wrap"><table><thead><tr><th>Date</th><th>Order</th><th>Buyer</th><th>District</th><th>Item</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>
          ${transactions.length ? transactions.map(o=>`<tr><td>${this.escapeHtml(this.getOrderDateLabel(o.date))}</td><td>#${this.escapeHtml(String(o.id))}</td><td>${this.escapeHtml(o.buyerName || 'Demo buyer')}</td><td>${this.escapeHtml(o.district || '—')}</td><td>${this.escapeHtml(o.food || 'Food order')} · ${Number(o.kg)||0} kg</td><td>${o.mode === 'credit'?'Food credit':'Cash'}</td><td>${(Number(o.total)||0).toLocaleString()} RWF</td><td>${this.escapeHtml(o.status || 'Recorded')}</td></tr>`).join('') : `<tr><td colspan="8">No prototype transactions in this date range.</td></tr>`}
        </tbody></table></div>
      </section>

      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">Interactive Rwanda 30-District GIS Map</div>
            <div class="card-subtitle">GeoJSON choropleth visualising payment delays and priority index across all 30 districts:</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm ${this.mapMetric === 'priority' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.setMapMetric('priority')">Priority Score</button>
            <button class="btn btn-sm ${this.mapMetric === 'delay' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.setMapMetric('delay')">Payment Delay</button>
            <button class="btn btn-sm ${this.mapMetric === 'poverty' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.setMapMetric('poverty')">Poverty Rate</button>
          </div>
        </div>

        <div class="grid grid-cols-3" style="margin-bottom:0;">
          <div style="grid-column: span 2;">
            <div id="mapContainer" style="height:380px; border-radius:12px; border:1px solid var(--card-border);"></div>
          </div>
          <div>
            <div class="card" style="height:100%; padding:14px; background:var(--bg); margin:0;">
              <div id="districtSelectedInfo">
                ${this.renderDistrictInfo(this.state.selectedDistrict || 'Gasabo')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Inclusion Channels Table -->
      <div class="card">
        <h3>💳 Financial Inclusion Channels & Disbursement Speed</h3>
        <table>
          <thead>
            <tr><th>Disbursement Channel</th><th>Avg Delay</th><th>>7d Late (%)</th><th>Survey Records</th></tr>
          </thead>
          <tbody>
            <tr><td><b>Mobile Money</b></td><td style="color:var(--danger); font-weight:700;">10.4 days</td><td>59%</td><td>630</td></tr>
            <tr><td><b>Bank-type SACCO</b></td><td>9.2 days</td><td>53%</td><td>2,205</td></tr>
            <tr><td><b>Umurenge SACCO</b></td><td style="color:var(--success); font-weight:700;">7.7 days</td><td>43%</td><td>546</td></tr>
          </tbody>
        </table>
        <p class="small" style="margin-top:8px;">The survey shows an association between payment method and reported delay. It does not establish why the groups differ.</p>
      </div>
    `;
  }

  exportDatabaseJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `VUPBridge_database_${Date.now()}.json`);
    dl.click();
    this.toast("Database exported successfully!", "success");
  }

  // =========================================================================
  // 19. VUP PAYMENT CYCLE CALENDAR
  // =========================================================================
  renderVupDateCard() {
    return `
      <div class="vup-date-card">
        <div class="vup-date-header">
          <div>
            <div style="font-size: 12px; font-weight:800; color:var(--accent); text-transform:uppercase;">${this.t('vupCalHeader')}</div>
            <h3 style="font-size: 19px; font-weight:800; color:var(--text-main); margin-top:2px;">${this.t('vupCalTitle')}</h3>
          </div>
          <span class="pill pill-urgent">${this.t('vupCalAvgDelay')}</span>
        </div>
        <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5;">
          ${this.t('vupCalDesc')}
        </p>
        <div class="cycle-steps">
          <div class="cycle-box">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">${this.t('vupStep1Time')}</span>
            <b>${this.t('vupStep1Title')}</b>
            <small>${this.t('vupStep1Sub')}</small>
          </div>
          <div class="cycle-box">
            <span style="font-size: 11px; font-weight: 700; color: var(--primary);">${this.t('vupStep2Time')}</span>
            <b>${this.t('vupStep2Title')}</b>
            <small>${this.t('vupStep2Sub')}</small>
          </div>
          <div class="cycle-box active">
            <span style="font-size: 11px; font-weight: 700; color: var(--danger);">${this.t('vupStep3Time')}</span>
            <b style="color:var(--danger);">${this.t('vupStep3Title')}</b>
            <small>${this.t('vupStep3Sub')}</small>
          </div>
          <div class="cycle-box">
            <span style="font-size: 11px; font-weight: 700; color: var(--success);">${this.t('vupStep4Time')}</span>
            <b>${this.t('vupStep4Title')}</b>
            <small>${this.t('vupStep4Sub')}</small>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 20. UNIVERSAL PROXIMITY BAR ("The Place You Are Right Now")
  // =========================================================================
  renderNearbyBar() {
    const nb = this.state.nearby || { userDistrict: "Gasabo", userLocation: "Gasabo (Kimironko Hub)", filterProximity: "all" };
    const curDist = nb.userDistrict || "Gasabo";

    return `
      <div class="nearby-bar">
        <div class="nearby-loc-badge">
          <div class="pin-icon">📍</div>
          <div>
            <div class="loc-title">${this.t('nearbyLocTitle')}</div>
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
                ${this.t('nearbyGpsBtn')}
              </button>
            </div>
          </div>
        </div>

        <div class="nearby-chips-wrap">
          <button class="nearby-chip ${nb.filterProximity === 'all' ? 'active' : ''}" onclick="window.app.setProximityFilter('all')">
            ${this.t('filterAllRwanda')}
          </button>
          <button class="nearby-chip ${nb.filterProximity === 'near' ? 'active' : ''}" onclick="window.app.setProximityFilter('near')">
            ⚡ ${this.t('filterNear')}
          </button>
          <button class="nearby-chip ${nb.filterProximity === 'district' ? 'active' : ''}" onclick="window.app.setProximityFilter('district')">
            📍 ${this.t('filterDistrict')}
          </button>
          <button class="nearby-chip ${nb.filterProximity === 'fast' ? 'active' : ''}" onclick="window.app.setProximityFilter('fast')">
            🚴 ${this.t('filterFast')}
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
    this.toast(`Location set to ${districtName} District. Showing nearest sellers first!`, "success");
  }

  detectUserLocation() {
    this.setUserDistrict("Gasabo");
    this.toast(this.t('nearbyGpsToast'), "success");
  }

  setProximityFilter(filter) {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.filterProximity = filter;
    this.saveState();
    this.render();
  }

  // =========================================================================
  // 21. 18 PRODUCTIONS CATALOG WITH DISTANCE SORTING
  // =========================================================================
    renderGroceryCatalog(mode) {
    const curDist = (this.state.nearby && this.state.nearby.userDistrict) || "Gasabo";
    const filter = (this.state.nearby && this.state.nearby.filterProximity) || "all";

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

    if (this.state.activeCategory && this.state.activeCategory !== "All") {
      items = items.filter(l => {
        const cat = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].category : "Staples";
        return cat.toLowerCase().includes(this.state.activeCategory.toLowerCase()) || 
               l.food.toLowerCase().includes(this.state.activeCategory.toLowerCase());
      });
    }

    if (filter === "near") {
      items = items.filter(l => l.dynamicDistanceKm <= 5.0);
    } else if (filter === "district") {
      items = items.filter(l => l.isLocalDistrict);
    } else if (filter === "fast") {
      items = items.filter(l => l.dynamicDeliveryMins <= 20);
    }

    items.sort((a, b) => a.dynamicDistanceKm - b.dynamicDistanceKm);

    if (items.length === 0) {
      return `
        <div style="text-align:center; padding: 40px 20px; background:var(--card); border:1px solid var(--line); border-radius:24px; margin-bottom: 24px;">
          <svg viewBox="0 0 24 24" style="width:36px;height:36px;stroke:var(--mute);fill:none;margin-bottom:8px;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"/></svg>
          <h4 style="font-size: 16px; font-weight:700;">No farm produce found for this filter in ${curDist}</h4>
          <p style="font-size: 13px; color:var(--mute); margin-bottom: 14px;">Try selecting "All Staples" or changing your district location.</p>
          <button class="btn btn-sm btn-primary" onclick="window.app.setProximityFilter('all'); window.app.state.activeCategory='All'; window.app.render();">
            Show All Rwanda Sellers (18 items)
          </button>
        </div>
      `;
    }

    const lang = this.state.lang || "en";

    return `
      <div class="vm-grocery-grid" id="produceGridContainer">
        ${items.map(l => {
          const guide = this.getPriceGuide(l.food, l.price);
          const photo = l.photo || (HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].img : "assets/produce/dry_beans.jpg");
          
          let displayName = l.food;
          let kinyName = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].kiny : "";
          if (lang === "rw" && window.TRANSLATIONS?.rw?.produce?.[l.food]) {
            displayName = window.TRANSLATIONS.rw.produce[l.food].name;
          } else if (lang === "fr" && window.TRANSLATIONS?.fr?.produce?.[l.food]) {
            displayName = window.TRANSLATIONS.fr.produce[l.food].name;
          }

          const dist = l.dynamicDistanceKm;

          return `
            <div class="vm-product-card">
              <div class="vm-product-img-box">
                <span class="vm-badge-distance">
                  <svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:#fff;fill:none;stroke-width:2.5;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${dist <= 1.0 ? '0.8 km' : dist + ' km'}
                </span>
                <span class="vm-badge-guide ${guide.class}">${guide.label}</span>
                <img src="${photo}" alt="${displayName}" class="vm-product-img" onerror="this.onerror=null; this.src='assets/produce/dry_beans.jpg';">
              </div>

              <div class="vm-product-info">
                <div class="vm-product-origin">
                  ${l.farmer} · ${l.district}
                </div>
                <div class="vm-product-title">${displayName}</div>
                <div class="vm-product-kiny">${kinyName || 'Fresh Harvest'}</div>
                <div class="vm-product-stock">${l.quantity} kg available</div>

                <div class="vm-product-bottom">
                  <div class="vm-price-wrap">
                    <b>${l.price.toLocaleString()}</b> <small>RWF/kg</small>
                  </div>
                  <button class="vm-add-btn" onclick="window.app.startBuyProduce(${l.id}, '${mode || 'cash'}')" title="Buy Produce">
                    <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>

                ${mode === 'credit' ? `
                  <button class="vm-credit-order-btn" onclick="window.app.startBuyProduce(${l.id}, 'credit')">
                    Order on Bridge Credit (0%)
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
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

  // =========================================================================
  // 22. PHONE ORDER & PAYMENT FLOW (media_1792662744615.html)
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
      this.executeOrder(listing, qty, total, "credit", "pending_approval", 0, "Free SACCO Pickup");
    } else {
      this.state.pendingCheckoutOrder = { listing, qty, total };
      this.openPhonePayModal(listing, qty, total);
    }
  }

  openPhonePayModal(listing, qty, total) {
    const modal = document.getElementById("payModal");
    if (!modal) return;

    const donationPct = this.state.currentUser.giftShare || this.state.currentUser.donationPct || 2;
    const gift = Math.round(total * (donationPct / 100));
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const grandTotal = total + gift + deliveryFee;

    const imgEl = document.getElementById("orderProduceImg");
    const badgeEl = document.getElementById("orderProduceBadge");
    if (imgEl) imgEl.src = listing.photo || "assets/produce/dry_beans.jpg";
    if (badgeEl) badgeEl.textContent = `${listing.food} · ${listing.farmer}`;

    document.getElementById("rcV2").textContent = `${listing.food} (${qty} kg)`;
    document.getElementById("rfV2").textContent = `${total.toLocaleString()} RWF`;
    document.getElementById("rdModeV2").innerHTML = isPickup 
      ? this.t('checkoutDeliveryPickup') 
      : this.t('checkoutDeliveryMoto');
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

    const targetMap = { 2: "p2_v2", 6: "p6_v2", 3: "p3_v2", 4: "p4_v2", 5: "p5_v2" };
    const cur = document.getElementById(targetMap[n] || "p2_v2");
    if (cur) cur.classList.add("on");

    const clock = document.getElementById("clockV2");
    if (clock) {
      const d = new Date();
      clock.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }

  goToPaymentMethods() {
    this.renderPaymentAccountsList();
    this.goPhonePage(6);
  }

  renderPaymentAccountsList() {
    const mlist = document.getElementById("mlV2");
    const flist = document.getElementById("flV2");
    if (!mlist || !flist) return;

    mlist.innerHTML = RWANDA_PAYMENT_ACCOUNTS.map((a, i) => `
      <div class="mitem-v2 ${i === this.state.selectedAccountIdx ? 'on' : ''}" onclick="window.app.selectPaymentAccount(${i})">
        <span class="mico-v2" style="${a.c}">${a.l}</span>
        <div style="flex:1">
          <b>${a.n}</b>
          <div style="font-size:11px;color:var(--mute);">${a.s}</div>
        </div>
        <div style="text-align:right">
          <span style="font-weight:700;font-size:13px">${a.credit ? 'Credit Limit' : a.bal.toLocaleString() + ' RWF'}</span>
        </div>
      </div>
    `).join("");

    flist.innerHTML = `
      <div style="font-size:12px;font-weight:700;margin:6px 0 4px;color:var(--text-muted);">${this.t('checkoutTopupChips')}</div>
      <div class="chips-v2">
        ${TOPUP_CHIPS.map(c => `
          <button type="button" class="chip-v2" onclick="window.app.topupSelectedAccount(${c.v})">${c.l}</button>
        `).join("")}
      </div>
      <div id="payErrorV2" style="color:var(--danger);font-size:12px;margin-top:6px;min-height:16px;"></div>
    `;

    const p = this.state.pendingCheckoutOrder;
    if (p) {
      const donationPct = this.state.currentUser.giftShare || this.state.currentUser.donationPct || 2;
      const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
      const deliveryFee = isPickup ? 0 : 300;
      const grandTotal = p.total + Math.round(p.total * (donationPct / 100)) + deliveryFee;
      const pp = document.getElementById("ppV2");
      if (pp) pp.textContent = `Pay ${grandTotal.toLocaleString()} RWF`;
    }
  }

  selectPaymentAccount(i) {
    this.state.selectedAccountIdx = i;
    this.renderPaymentAccountsList();
  }

  topupSelectedAccount(amt) {
    const acc = RWANDA_PAYMENT_ACCOUNTS[this.state.selectedAccountIdx];
    acc.bal += amt;
    this.renderPaymentAccountsList();
    const errEl = document.getElementById("payErrorV2");
    if (errEl) errEl.textContent = "";
    this.toast(`Added ${amt.toLocaleString()} RWF demo balance to ${acc.n}`, "success");
  }

  processPhonePayment() {
    const p = this.state.pendingCheckoutOrder;
    if (!p) return;

    const acc = RWANDA_PAYMENT_ACCOUNTS[this.state.selectedAccountIdx];
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const donationPct = this.state.currentUser.giftShare || this.state.currentUser.donationPct || 2;
    const gift = Math.round(p.total * (donationPct / 100));
    const grandTotal = p.total + gift + deliveryFee;

    if (acc.bal < grandTotal) {
      const errEl = document.getElementById("payErrorV2");
      if (errEl) errEl.textContent = `Insufficient balance (${acc.bal.toLocaleString()} RWF). Click a + chip to top up!`;
      return;
    }

    acc.bal -= grandTotal;
    this.state.pool.balance += gift;
    this.state.pool.totalGiftsIn += gift;

    const deliveryType = isPickup ? "Free SACCO Hub Pickup" : "Express Moto Drop (15-25 min)";
    const newOrder = this.executeOrder(p.listing, p.qty, p.total, "cash", acc.by, gift, deliveryType, deliveryFee);

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
    }, 2400);

    setTimeout(() => {
      document.getElementById("pdV2").textContent = `${grandTotal.toLocaleString()} RWF`;
      document.getElementById("pdFulV2").textContent = deliveryType;
      this.goPhonePage(4);

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
    }, 3200);
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
    }, 2800);

    setTimeout(() => {
      if (pt) pt.style.opacity = 0;
      if (rbtn) rbtn.classList.add('on');
    }, 3400);
  }

  closePayFlow() {
    const modal = document.getElementById("payModal");
    if (modal) modal.classList.remove("open");
    this.render();
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
      buyerEmail: this.state.currentUser.email || "user@vupbridge.rw",
      district: listing.district,
      hub: listing.hub || (this.state.nearby ? this.state.nearby.userLocation : "Kimironko Hub"),
      status: mode === "credit" ? "Pending Approval" : "Placed",
      creditStatus: mode === "credit" ? "requested" : "n/a",
      farmer: listing.farmer,
      farmerEmail: listing.farmerEmail || "farmer@vupbridge.rw",
      paidBy: paidBy,
      paymentMethod: paidBy === "pending_approval" ? (this.state.currentUser.paymentMethod || "MTN Mobile Money") : paidBy,
      gift: gift,
      deliveryType: deliveryType,
      deliveryFee: deliveryFee,
      repaid: false,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.state.orders.unshift(newOrder);

    // If cash order, add entry to ledger
    if (mode === "cash") {
      this.state.ledger.unshift({
        id: this.state.ledger.length + 1,
        date: newOrder.date,
        type: "order",
        from: newOrder.buyerName,
        to: newOrder.farmer,
        amount: total,
        link: `Order #${newOrder.id}`,
        status: "completed",
        paymentMethod: paidBy,
        createdBy: newOrder.buyerName
      });
      if (gift > 0) {
        this.state.ledger.unshift({
          id: this.state.ledger.length + 1,
          date: newOrder.date,
          type: "gift",
          from: newOrder.buyerName,
          to: "Revolving Pool",
          amount: gift,
          link: `Order #${newOrder.id} (${gift} RWF Pool Gift)`,
          status: "completed",
          paymentMethod: paidBy,
          createdBy: newOrder.buyerName
        });
      }
    }

    this.saveState();
    this.render();

    if (mode === "credit") {
      this.toast(`Order #${newOrder.id} placed on Bridge Credit. Submitted to Credit Desk for verification.`, "success");
    } else {
      this.toast(`Order #${newOrder.id} paid via ${paidBy}! Delivery: ${deliveryType}`, "success");
    }
    return newOrder;
  }

  deliverOrder(orderId) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.mode === "credit") {
      order.status = "Delivered";
      order.creditStatus = "to_pay_seller";
      order.paidBy = "pending_pool";
      this.toast(`Order #${orderId} marked Delivered. Moved to Credit Desk: To Pay Sellers queue!`, "success");
    } else {
      order.status = "Delivered";
      this.toast(`Order #${orderId} delivered! Seller paid by buyer.`, "success");
    }

    this.saveState();
    this.render();
  }

  simulateVupRepayment() {
    let count = 0;
    this.state.orders.forEach(o => {
      if (o.mode === "credit" && o.status === "Delivered" && !o.repaid) {
        o.repaid = true;
        o.creditStatus = "repaid";
        this.state.pool.balance += o.total;
        this.state.pool.totalRepaidByVup += o.total;
        count++;

        this.state.ledger.unshift({
          id: this.state.ledger.length + 1,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "repayment",
          from: "VUP Treasury Transfer",
          to: "Revolving Pool",
          amount: o.total,
          link: `Order #${o.id} Repayment`,
          status: "completed",
          paymentMethod: o.paymentMethod || "MTN Mobile Money",
          createdBy: "Treasury Simulation"
        });
      }
    });

    this.saveState();
    this.render();

    if (count === 0) {
      this.toast("No delivered credit orders pending reimbursement.", "info");
    } else {
      this.toast(`Disbursement wave arrived! ${count} delivered orders settled back into the pool.`, "success");
    }
  }

  // =========================================================================
  // 23. FARMER PHOTO UPLOAD & PRODUCE ADDITION
  // =========================================================================
  setListingPhoto(url) {
    const preview = document.getElementById("listingPhotoPreview");
    const input = document.getElementById("new_photo_url");
    if (preview) preview.src = url;
    if (input) input.value = url;
  }

  handleCustomPhotoUpload(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setListingPhoto(e.target.result);
        this.toast("Produce photo captured and loaded!", "success");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addListing(event) {
    if (event) event.preventDefault();
    const foodEl = document.getElementById("new_food");
    const districtEl = document.getElementById("new_district");
    const priceEl = document.getElementById("new_price");
    const qtyEl = document.getElementById("new_qty");
    const photoEl = document.getElementById("new_photo_url");

    if (!foodEl || !priceEl || !qtyEl) return;

    const food = foodEl.value;
    const district = districtEl ? districtEl.value : "Gasabo";
    const price = parseFloat(priceEl.value);
    const quantity = parseFloat(qtyEl.value);
    const photo = photoEl && photoEl.value ? photoEl.value : (HARVEST_GALLERY[food] ? HARVEST_GALLERY[food].img : "assets/produce/dry_beans.jpg");

    if (!price || !quantity || price <= 0 || quantity <= 0) {
      this.toast("Please enter a valid price and quantity.", "warning");
      return;
    }

    const newListing = {
      id: this.state.nextListingId++,
      food,
      district,
      hub: `${district} Food Hub`,
      price,
      retailPrice: HARVEST_GALLERY[food] ? HARVEST_GALLERY[food].retailPrice : Math.round(price * 1.2),
      quantity,
      farmer: this.state.currentUser.name || "Mukamana Farm",
      farmerEmail: this.state.currentUser.email || "mukamana.farm@vupbridge.rw",
      momo: this.state.currentUser.momo || "078XXXX123",
      photo,
      isFav: false
    };

    this.state.listings.unshift(newListing);
    this.saveState();
    this.render();
    this.toast(`Listed ${quantity} kg of ${food} at ${price.toLocaleString()} RWF/kg!`, "success");
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
    el.innerHTML = `NISR Median: <b>${guide.median.toLocaleString()} RWF/kg</b> · <span class="pill ${guide.class}">${guide.label}</span>`;
  }

  getPriceGuide(food, price) {
    const median = NISR_DATA.foodPrices[food] || (HARVEST_GALLERY[food] ? HARVEST_GALLERY[food].retailPrice : 600);
    const ratio = price / median;
    if (ratio < 0.85) return { label: "Fair Price (Low)", class: "pill-fair", median };
    if (ratio > 1.15) return { label: "High Price", class: "pill-high", median };
    return { label: "Median Benchmark", class: "pill-neutral", median };
  }

  calculateCreditLimit() {
    const u = this.state.currentUser;
    const days = Number(u.daysLate) || 0;
    if (days <= 0) return 0;
    const size = Number(u.householdSize) || 1;
    const dpp = this.state.adminSettings.dailyFoodCost || 261;
    const cap = this.state.adminSettings.creditCapDays || 14;
    const effectiveDays = Math.min(days, cap);
    return size * dpp * effectiveDays;
  }

  getOutstandingCredit() {
    return this.state.orders
      .filter(o => o.mode === "credit" && !o.repaid && o.status !== "Cancelled" && o.creditStatus !== "written_off")
      .reduce((sum, o) => sum + o.total, 0);
  }

  getRemainingCredit() {
    const limit = this.calculateCreditLimit();
    const out = this.getOutstandingCredit();
    return Math.max(0, limit - out);
  }

  // =========================================================================
  // 24. ORDERS TABLE WITH 'REPORT A PROBLEM' ACTION (Section 16.3)
  // =========================================================================
  renderOrdersTable(ordersList, showDeliverBtn = false) {
    if (!ordersList || !ordersList.length) {
      return `<p style="padding: 16px; color: var(--text-muted); font-size: 13px;">No orders found in this view.</p>`;
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
              <th>Actions</th>
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
                    ${o.mode === 'credit' ? 'Bridge Credit' : o.paymentMethod || o.paidBy || 'Cash'}
                  </span>
                  ${o.repaid ? '<span class="pill pill-fair" style="margin-left: 4px;">Repaid</span>' : ''}
                </td>
                <td>
                  <span class="pill ${o.status === 'Delivered' ? 'pill-fair' : o.status === 'Pending Approval' ? 'pill-urgent' : 'pill-high'}">
                    ${o.status}
                  </span>
                </td>
                <td>
                  <div style="display:flex; align-items:center; gap:4px;">
                    ${showDeliverBtn && o.status === 'Placed' 
                      ? `<button class="btn btn-sm btn-primary" style="padding:2px 8px; font-size:11px;" onclick="window.app.deliverOrder(${o.id})">Mark Delivered</button>`
                      : showDeliverBtn && o.status === 'Pending Approval'
                      ? `<button class="btn btn-sm btn-outline" style="padding:2px 8px; font-size:11px;" onclick="window.app.approveCredit(${o.id})">Approve</button>`
                      : ''}
                    <button class="btn btn-ghost btn-sm" style="font-size:11px; padding:2px 6px; color:var(--danger);" onclick="window.app.openCaseModal('Order #${o.id}')" title="Report a problem with this transaction (Section 16.3)">
                      🚩 Report
                    </button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 25. GIS OBSERVATORY & 30-DISTRICT MAP
  // =========================================================================
  renderDistrictInfo(districtName) {
    const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === districtName.toLowerCase()) || NISR_DATA.districts[0];
    return `
      <div style="font-size: 18px; font-weight: 800; color: var(--primary);">${d.name} District</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 10px;">Province: <b>${d.province}</b></div>

      <div style="margin-bottom: 8px;">
        <span class="pill ${d.priority >= 70 ? 'pill-urgent' : d.priority >= 45 ? 'pill-high' : 'pill-neutral'}">${d.band}</span>
      </div>

      <div style="font-size: 12.5px; line-height: 1.55; color: var(--text-main);">
        <div>Help Priority Score: <b>${d.priority} / 100</b></div>
        <div>VUP Disbursement Delay: <b>${d.delay} days</b></div>
        <div>Over 7-Day Delay: <b>${d.latePct}%</b></div>
        <div>Poverty Prevalence: <b>${d.poverty}%</b></div>
        <div>Survey Beneficiaries: <b>${d.records}</b></div>
        <div style="margin-top:6px; font-size:11.5px; color:var(--text-muted);">Local Hub: <b>${d.hub}</b></div>
      </div>
    `;
  }

  selectDistrict(name) {
    this.state.selectedDistrict = name;
    const info = document.getElementById("districtSelectedInfo");
    if (info) info.innerHTML = this.renderDistrictInfo(name);
  }

  setMapMetric(metric) {
    this.mapMetric = metric;
    this.initMap();
  }

  initPlannerVisuals() {
    setTimeout(() => {
      this.initMap();
    }, 150);
  }

  initMap() {
    const container = document.getElementById("mapContainer");
    if (!container) return;

    if (window.L && window.RWANDA_DISTRICTS_GEOJSON) {
      try {
        if (this.map) {
          this.map.remove();
          this.map = null;
        }

        this.map = L.map('mapContainer', { zoomControl: true, attributionControl: false }).setView([-1.9403, 29.8739], 8);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 14 }).addTo(this.map);

        const getColor = (name) => {
          const d = NISR_DATA.districts.find(x => x.name.toLowerCase() === name.toLowerCase());
          if (!d) return "#ccc";
          if (this.mapMetric === "priority") {
            return d.priority >= 70 ? "#b91c1c" : d.priority >= 55 ? "#c2410c" : d.priority >= 40 ? "#d97706" : "#22c55e";
          }
          if (this.mapMetric === "delay") {
            return d.delay >= 11 ? "#b91c1c" : d.delay >= 9 ? "#d97706" : "#22c55e";
          }
          return d.poverty >= 45 ? "#7e22ce" : d.poverty >= 35 ? "#a855f7" : "#c084fc";
        };

        this.mapLayer = L.geoJSON(window.RWANDA_DISTRICTS_GEOJSON, {
          style: (feature) => ({
            fillColor: getColor(feature.properties.shapeName || feature.properties.ADM2_EN || ""),
            weight: 1.5,
            opacity: 1,
            color: '#fff',
            fillOpacity: 0.72
          }),
          onEachFeature: (feature, layer) => {
            const name = feature.properties.shapeName || feature.properties.ADM2_EN || "District";
            layer.bindTooltip(`<b>${name}</b>`, { sticky: true });
            layer.on({
              click: () => this.selectDistrict(name),
              mouseover: (e) => e.target.setStyle({ weight: 3, color: '#1b6b4a', fillOpacity: 0.9 }),
              mouseout: (e) => this.mapLayer.resetStyle(e.target)
            });
          }
        }).addTo(this.map);
        return;
      } catch (err) {
        console.warn("Leaflet map init error, falling back to SVG:", err);
      }
    }

    this.renderOfflineSvgMap(container);
  }

  renderOfflineSvgMap(container) {
    if (!container) return;
    container.innerHTML = `
      <div style="padding: 18px; text-align: center; height:100%; display:flex; flex-direction:column; justify-content:center;">
        <div style="font-weight: 700; margin-bottom: 8px;">Interactive 30-District GIS Grid</div>
        <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; max-height: 290px; overflow-y: auto;">
          ${NISR_DATA.districts.map(d => {
            const isHigh = d.priority >= 60;
            const bg = isHigh ? 'var(--danger-light)' : 'var(--bg)';
            const border = isHigh ? 'var(--danger)' : 'var(--card-border)';
            return `
              <button onclick="window.app.selectDistrict('${d.name}')" 
                      style="font-size: 11px; padding: 4px 8px; border-radius: 6px; border: 1px solid ${border}; background: ${bg}; cursor: pointer;">
                ${d.name} (${d.delay}d)
              </button>
            `;
          }).join("")}
        </div>
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">Click any district to view household microdata delay profile.</p>
      </div>
    `;
  }

  toast(msg, type = "info") {
    const floatEl = document.getElementById("toast");
    if (floatEl) {
      floatEl.textContent = msg;
      floatEl.classList.add("show");
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => floatEl.classList.remove("show"), 2800);
    }
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // EAT WHILE YOU WAIT ENHANCEMENTS: DEVICE PREVIEW, NISR DOC, EXPORTS
  // =========================================================================
  setDevicePreview(mode) {
    const dev = document.getElementById('dev');
    if (dev) dev.dataset.d = mode;
    document.querySelectorAll('.devbar button').forEach(b => {
      b.classList.toggle('on', b.dataset.v === mode);
    });
    if (window.L && window.mapInstance) {
      setTimeout(() => window.mapInstance.invalidateSize(), 300);
    }
    this.toast(`Preview: ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`, 'info');
  }

  downloadFile(name, data, type) {
    const blob = (data instanceof Blob) ? data : new Blob([data], { type: type || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  downloadNisrPdf() {
    const b64 = (typeof window !== 'undefined' && window.NISR_PDF) || (typeof NISR_PDF !== 'undefined' && NISR_PDF);
    if (b64) {
      const raw = atob(b64);
      const u = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) u[i] = raw.charCodeAt(i);
      const today = new Date().toISOString().slice(0, 10);
      this.downloadFile(`VUPBridge_NISR_Report_${today}.pdf`, new Blob([u], { type: 'application/pdf' }));
      this.toast('NISR Analytical Report (PDF) downloaded successfully', 'success');
    } else {
      window.print();
    }
  }

  downloadNisrCsv() {
    const rows = this.getNisrSummaryCsvRows();
    const today = new Date().toISOString().slice(0, 10);
    this.downloadFile(`VUPBridge_NISR_tables_${today}.csv`, rows.map(r => r.join(',')).join('\n'), 'text/csv');
    this.toast('NISR analytical tables (CSV) downloaded successfully', 'success');
  }

  csvCell(value) {
    let text = String(value == null ? "" : value);
    if (/^[=+@\-]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }

  downloadAnalysisCsv() {
    const report = this.getAnalysisReportData();
    const rows = [
      ["Dataset", "Metric", "Value", "Unit", "Sample / Scope", "Notes"],
      ["NISR survey", "Survey period", "2023–24", "", "EICV7 VUP", "Fixed survey baseline; not a live time series"],
      ["NISR survey", "Average payment delay", NISR_DATA.overall.averageDelayDays, "days", NISR_DATA.overall.totalBeneficiaries, "Current project summary; provisional pending final weighted analysis"],
      ["NISR survey", "Beneficiaries waiting over 7 days", NISR_DATA.overall.pctOver7DaysLate, "%", NISR_DATA.overall.totalBeneficiaries, "Current project summary; provisional pending final weighted analysis"],
      ...NISR_DATA.programmes.map(p => ["NISR programme", p.name, p.delay, "average days late", p.records, `${p.latePct}% waited over 7 days; provisional project summary`]),
      ...NISR_DATA.provinces.map(p => ["NISR province", p.name, p.delay, "average days late", p.records, `${p.latePct}% waited over 7 days; provisional project summary`]),
      ...NISR_DATA.districts.map(d => ["NISR district", d.name, d.records < 25 ? "" : d.delay, "average days late", d.records < 25 ? "suppressed" : d.records, `${d.province}; priority score ${d.records < 25 ? "suppressed" : d.priority}; ${d.records < 25 ? "n<25, suppress" : d.records < 100 ? "n<100, caution" : "n>=100"}`]),
      ...Object.entries(NISR_DATA.groups || {}).flatMap(([group, rows]) => rows.map(r => ["NISR group", `${group}: ${r.name}`, r.records < 25 ? "" : r.delay, "average days late", r.records < 25 ? "suppressed" : r.records, r.records < 25 ? "n<25, suppress" : `${r.records < 100 ? "n<100, caution" : "n>=100"}; ${r.records < 25 ? "" : `${r.latePct}% waited over 7 days`}`])),
      ...Object.entries(NISR_DATA.hotspots || {}).flatMap(([programme, provinces]) => Object.entries(provinces).filter(([, value]) => value).map(([province, value]) => ["NISR programme/province hotspot", `${programme}: ${province}`, value.records < 25 ? "" : value.delay, "average days late", value.records < 25 ? "suppressed" : value.records, value.records < 25 ? "n<25, suppress" : `${value.records < 100 ? "n<100, caution" : "n>=100"}; ${value.records < 25 ? "" : `${value.latePct}% waited over 7 days`}`])),
      ...Object.entries(NISR_DATA.foodPrices || {}).map(([food, value]) => ["NISR food-price benchmark", food, value.median, `RWF per ${value.unit}`, "", `${value.category}; reference median price`]),
      ["Simulated prototype activity", "Selected period", report.period.label, "", "", "Date filter applies only to prototype transactions"],
      ["Simulated prototype activity", "Orders", report.transactions.length, "orders", "", "Fake money; local demo activity"],
      ["Simulated prototype activity", "Order value", report.totalValue, "RWF", "", "Fake money; not a real transfer"],
      ["Simulated prototype activity", "Credit order count", report.creditOrders.length, "orders", "", "Fake money; not a real transfer"],
      ["Limit", "Interpretation", "Patterns, not reasons", "", "", "Survey data cannot explain why an individual payment was late"],
      ["Limit", "Weighting", "Provisional", "", "", "The build brief labels supplied estimates early and unweighted; final weighted estimates are not confirmed here"]
    ];
    const csv = rows.map(row => row.map(value => this.csvCell(value)).join(",")).join("\r\n");
    const today = this.localDateInput(new Date());
    this.downloadFile(`VUPBridge_NISR_analysis_${today}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
    this.toast("NISR analysis CSV downloaded.", "success");
  }

  downloadTransactionsCsv() {
    const report = this.getAnalysisReportData();
    const rows = [
      ["Report", "Prototype. Fake money.", `Activity period: ${report.period.label}`, `Generated: ${new Date().toLocaleString("en-GB")}`, "", "", "", "", "", "", "", "", ""],
      ["Order ID", "Date", "Buyer", "Buyer role", "District", "Food", "Quantity kg", "Mode", "Amount RWF", "Status", "Paid by", "Payment method", "Repaid"],
      ...report.transactions.map(order => [
        order.id, this.getOrderDateLabel(order.date), order.buyerName || "Demo buyer", order.buyerRole || "", order.district || "",
        order.food || "", order.kg || "", order.mode || "", Number(order.total) || 0, order.status || "",
        order.paidBy || order.paid || "", order.paymentMethod || "", order.repaid ? "Yes" : "No"
      ])
    ];
    const csv = rows.map(row => row.map(value => this.csvCell(value)).join(",")).join("\r\n");
    const today = this.localDateInput(new Date());
    this.downloadFile(`VUPBridge_transactions_${report.period.from}_to_${report.period.to}_${today}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
    this.toast(`${report.transactions.length} simulated transactions downloaded.`, "success");
  }

  downloadNisrHtml() {
    const docEl = document.getElementById('nisrdoc');
    if (!docEl) {
      this.toast('Open the NISR Facts tab to export web document', 'warning');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const styles = document.querySelector('style') ? document.querySelector('style').textContent : '';
    const content = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>NISR Facts: VUP Bridge</title><style>' + styles + '</style></head><body style="max-width:960px;margin:20px auto;padding:16px;">' + docEl.outerHTML.replace(/data-a="[^"]*"/g, '') + '</body></html>';
    this.downloadFile(`VUPBridge_NISR_facts_${today}.html`, content, 'text/html');
    this.toast('NISR facts web page downloaded successfully', 'success');
  }

  downloadUserStatement() {
    const role = this.state.role || 'Family';
    const email = (this.state.currentUser && this.state.currentUser.email) || 'user@vupbridge.rw';
    const today = new Date().toISOString().slice(0, 10);
    const rows = this.state.orders.filter(o => {
      if (role === 'Family') return o.buyerEmail === email || o.buyerRole === 'Family';
      if (role === 'Farmer') return o.farmerEmail === email || o.farmer === (this.state.currentUser && this.state.currentUser.name);
      return o.buyerEmail === email;
    });

    const csvContent = [
      'Prototype. Fake money.',
      `Statement for ${email} generated ${new Date().toISOString()}`,
      'order_id,date,food,amount_rwf,mode,status,payment_method',
      ...rows.map(o => [o.id, o.date || today, `"${o.food || 'Fresh staple'}"`, o.total, o.mode, o.status, `"${o.payMethod || 'MTN Mobile Money'}"`].join(','))
    ].join('\n');

    this.downloadFile(`VUPBridge_${role}_statement_${today}.csv`, csvContent, 'text/csv');
    this.toast(`Statement for ${email} downloaded successfully`, 'success');
  }

  downloadAuditCsv() {
    const today = new Date().toISOString().slice(0, 10);
    const rows = (this.state.cases || []).map(c => [c.id, c.date, c.status, `"${c.type}"`, c.amount, `"${c.actionTaken || ''}"`].join(','));
    const content = ['Prototype. Fake money.', 'case_id,date,status,type,amount_rwf,action_taken', ...rows].join('\n');
    this.downloadFile(`VUPBridge_audit_disputes_${today}.csv`, content, 'text/csv');
    this.toast('Audit & disputes log downloaded', 'success');
  }

  downloadLedgerCsv() {
    const today = new Date().toISOString().slice(0, 10);
    const rows = (this.state.orders || []).map(o => [o.id, o.date || today, `"${o.food}"`, o.total, o.mode, o.status, `"${o.payMethod || ''}"`].join(','));
    const content = ['Prototype. Fake money.', 'id,date,item,total_rwf,mode,status,payment_method', ...rows].join('\n');
    this.downloadFile(`VUPBridge_transactions_${today}.csv`, content, 'text/csv');
    this.toast('Transactions ledger (CSV) downloaded', 'success');
  }

  filterNisrClass(cls) {
    this.state.nisrFilter = cls;
    this.render();
  }

  getNisrSummaryCsvRows() {
    const NISR = [['Expanded Public Works', 11.0, 63, 796], ['Classic Public Works', 9.7, 50, 925], ['Direct Support', 8.3, 51, 1003], ['NSDS', 7.7, 42, 675]];
    const PROV = [['Southern', 10.7, 64, 675], ['Eastern', 10.7, 59, 762], ['Western', 9.4, 55, 789], ['City of Kigali', 8.3, 47, 358], ['Northern', 6.6, 34, 815]];
    const PG = [['Severely poor', 11.0, 62, 174], ['Moderately poor', 9.7, 56, 875], ['Not poor', 8.9, 50, 2350]];
    const PM = [['Mobile money', 10.4, 59, 630], ['Umurenge SACCO', 7.7, 43, 546]];
    const SX = [['Women', 9.2, 52, 2468], ['Men', 9.2, 52, 931]];
    const DIS_slow = [['Kirehe', 15.5, null, 70], ['Gisagara', 14.9, null, 77], ['Karongi', 13.2, null, 100], ['Kicukiro', 12.4, null, 27], ['Gatsibo', 12.2, null, 92]];
    const DIS_fast = [['Nyabihu', 4.5, null, 63], ['Musanze', 5.1, null, 70], ['Gicumbi', 6.3, null, 297], ['Rwamagana', 6.3, null, 55], ['Rubavu', 6.6, null, 76]];
    const PR = [['Sweet potato', 250], ['Cooking banana', 300], ['Salt', 400], ['Avocado', 400], ['Irish potato', 450], ['Tomato', 500], ['Dry beans', 800], ['Corn flour', 1000], ['Local rice', 1200], ['Onion (about)', 1667], ['Groundnut flour', 2000], ['Small dry fish', 3030]];

    const cD = d => d > 10 ? ['ba', '✖', 'High delay'] : d >= 7 ? ['wa', '▲', 'Medium delay'] : ['ok', '✔', 'Low delay'];
    const cN = n => n < 25 ? ['ba', '✖', 'Under 25: hide'] : n < 100 ? ['wa', '▲', 'Small sample'] : ['ok', '✔', 'Reliable'];
    const cP = p => p > 1500 ? ['ba', '✖', 'High cost'] : p >= 500 ? ['wa', '▲', 'Mid cost'] : ['ok', '✔', 'Cheap staple'];

    const o = [
      ['Prototype. Fake money. NISR EICV7 2023-2024 summary. Early unweighted values. Patterns, not reasons.'],
      ['section', 'name', 'avg_days_late', 'over_7_days_pct', 'records', 'delay_class', 'sample_class']
    ];
    const add = (sc, rows) => rows.forEach(r => o.push([sc, r[0], r[1], r[2] == null ? '' : r[2], r[3], cD(r[1])[2], cN(r[3])[2]]));
    add('programme', NISR);
    add('province', PROV);
    add('poverty group', PG);
    add('payment method', PM);
    add('sex', SX);
    add('district slowest', DIS_slow);
    add('district fastest', DIS_fast);
    PR.forEach(r => o.push(['food price rwf per kg', r[0], r[1], '', '', cP(r[1])[2], '']));
    return o;
  }

  renderSummaryCard(adm = false) {
    const tf = (this.state.timeframe || 'week');
    const tfKey = tf.charAt(0).toUpperCase() + tf.slice(1);
    const SM = {
      Week: [14, 12, 2, 64000, 52000, 3, 70000, 58000, 11, 56, 2.4, 38, 212000, 'Sweet potato, Irish potato, Dry beans', [6, 2, 5, 41]],
      Month: [61, 52, 9, 288000, 251000, 5, 300000, 262000, 44, 53, 2.1, 164, 904000, 'Irish potato, Sweet potato, Tomato', [24, 8, 19, 118]],
      Year: [702, 604, 98, 3310000, 3025000, 9, 3500000, 3180000, 402, 51, 2.3, 1893, 10240000, 'Irish potato, Dry beans, Sweet potato', [260, 71, 204, 402]]
    };
    const q = SM[tfKey] || SM.Month;
    const t = (v, l) => `<div class="tile"><b>${v}</b>${l}</div>`;
    return `
      <div class="card" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <h3 style="margin:0; font-size:16px;">📈 This ${tfKey.toLowerCase()} summary <span class="tag g">Simulated</span></h3>
          <div class="seg">
            ${['Week', 'Month', 'Year'].map(x => `<button class="${x.toLowerCase() === tf ? 'on' : ''}" onclick="window.app.setTimeframe('${x.toLowerCase()}')">${x}</button>`).join('')}
          </div>
        </div>
        <div class="tiles">
          ${t(q[0], 'credit requests (' + q[1] + ' approved, ' + q[2] + ' refused)')}
          ${t(Math.round(q[3]).toLocaleString() + ' RWF', 'credit given')}
          ${t(Math.round(q[4]).toLocaleString() + ' RWF', 'credit repaid')}
          ${t(q[5], 'credit overdue')}
          ${t(Math.round(q[6]).toLocaleString() + ' RWF', 'pool money in')}
          ${t(Math.round(q[7]).toLocaleString() + ' RWF', 'pool paid out')}
          ${t(q[8], 'families helped')}
          ${t(q[9] + '%', 'paid over 7 days late (NISR benchmark: 52%)')}
          ${t(q[10] + ' days', 'average time to pay sellers')}
          ${t(q[11], 'orders')}
          ${t(Math.round(q[12]).toLocaleString() + ' RWF', 'sales')}
          ${t(q[13].split(',')[0], 'top staple: ' + q[13])}
          ${adm ? t(q[14][0] + ' / ' + q[14][1] + ' / ' + q[14][2], 'new members / sellers / shoppers') + t(q[14][3], 'active users') : ''}
        </div>
      </div>
    `;
  }

  renderNisrFactsDoc() {
    const NISR = [
      ['Expanded Public Works', 11.0, 63, 796],
      ['Classic Public Works', 9.7, 50, 925],
      ['Direct Support', 8.3, 51, 1003],
      ['NSDS', 7.7, 42, 675]
    ];
    const PROV = [
      ['Southern', 10.7, 64, 675],
      ['Eastern', 10.7, 59, 762],
      ['Western', 9.4, 55, 789],
      ['City of Kigali', 8.3, 47, 358],
      ['Northern', 6.6, 34, 815]
    ];
    const PG = [['Severely poor', 11.0, 62, 174], ['Moderately poor', 9.7, 56, 875], ['Not poor', 8.9, 50, 2350]];
    const PM = [['Mobile money', 10.4, 59, 630], ['Umurenge SACCO', 7.7, 43, 546]];
    const SX = [['Women', 9.2, 52, 2468], ['Men', 9.2, 52, 931]];
    const DIS = {
      slow: [['Kirehe', 15.5, null, 70], ['Gisagara', 14.9, null, 77], ['Karongi', 13.2, null, 100], ['Kicukiro', 12.4, null, 27], ['Gatsibo', 12.2, null, 92]],
      fast: [['Nyabihu', 4.5, null, 63], ['Musanze', 5.1, null, 70], ['Gicumbi', 6.3, null, 297], ['Rwamagana', 6.3, null, 55], ['Rubavu', 6.6, null, 76]]
    };
    const COLS = ['Southern', 'Eastern', 'Western', 'City of Kigali', 'Northern'];
    const MX = [
      ['Expanded Public Works', [[14.6, '79% · worst hotspot'], 0, 0, 0, 0]],
      ['Classic Public Works', [[11.4], [12.0], [10.0], [8.5], [6.3]]],
      ['Direct Support', [[9.7], [9.2], [9.2], [7.4], [6.0]]],
      ['NSDS', [[8.3], [11.4, 'only 57 records'], [7.8], 0, [6.2]]]
    ];
    const PR = [
      ['Sweet potato', 250], ['Cooking banana', 300], ['Salt', 400], ['Avocado', 400],
      ['Irish potato', 450], ['Tomato', 500], ['Dry beans', 800], ['Corn flour', 1000],
      ['Local rice', 1200], ['Onion (about)', 1667], ['Groundnut flour', 2000], ['Small dry fish', 3030]
    ];
    const ACC = [['Mobile money', 4699], ['Umurenge SACCO', 4641], ['Commercial bank', 444]];
    const LON = [['Tontine', 2129], ['Relatives', 1246], ['VUP financial loan', 614]];
    const REF = [['Purpose not clear', 113], ['Income too low', 89], ['No collateral', 35]];
    const BUY = [['Small shop', 69], ['Market', 27], ['Individual seller', 5]];

    const cD = d => d > 10 ? ['ba', '✖', 'High delay'] : d >= 7 ? ['wa', '▲', 'Medium delay'] : ['ok', '✔', 'Low delay'];
    const cS = p => p > 55 ? ['ba', '✖'] : p >= 40 ? ['wa', '▲'] : ['ok', '✔'];
    const cN = n => n < 25 ? ['ba', '✖', 'Under 25: hide'] : n < 100 ? ['wa', '▲', 'Small sample'] : ['ok', '✔', 'Reliable'];
    const cP = p => p > 1500 ? ['ba', '✖', 'High cost'] : p >= 500 ? ['wa', '▲', 'Mid cost'] : ['ok', '✔', 'Cheap staple'];
    const bd = c => `<span class="bd ${c[0]}">${c[1]} ${c[2] || ''}</span>`;

    const NF = this.state.nisrFilter || 'All';
    const tot = NISR.reduce((a, r) => a + r[3], 0);
    const avg = (NISR.reduce((a, r) => a + r[1] * r[3], 0) / tot).toFixed(1);
    const o7 = Math.round(NISR.reduce((a, r) => a + r[2] * r[3], 0) / tot);

    const sec = (id, t, x) => `<section class="card" id="${id}"><h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">${t}</h3>${x}</section>`;
    const bars = (rows, max, fmt, cls) => rows.map(r => `
      <div class="br">
        <span>${r[0]}</span>
        <i><u class="${cls(r)}" style="width:${Math.max(2, r[1] / max * 100)}%"></u></i>
        <b>${fmt(r)}</b>
      </div>
    `).join('');

    const dt = (rows, first) => {
      const f = rows.filter(r => NF === 'All' || cD(r[1])[2].startsWith(NF)).sort((a, b) => b[1] - a[1]);
      return f.length ? `
        <div class="sc">
          <table>
            <tr>
              <th>${first}</th>
              <th>Average days late</th>
              <th>Over 7 days</th>
              <th>Records</th>
              <th>Delay class</th>
              <th>Sample</th>
            </tr>
            ${f.map(r => `
              <tr>
                <td>${r[0]}</td>
                <td><b>${r[1]}</b><i class="mb"><u class="${cD(r[1])[0]}" style="width:${r[1] / 16 * 100}%"></u></i></td>
                <td>${r[2] == null ? '—' : r[2] + '% ' + cS(r[2])[1]}</td>
                <td>${r[3].toLocaleString()}</td>
                <td>${bd(cD(r[1]))}</td>
                <td>${bd(cN(r[3]))}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      ` : '<p class="mute" style="color:var(--mute); padding:10px 0;">No rows in this class.</p>';
    };

    const toc = [
      ['s1', 'Key findings'], ['s2', 'How to read'], ['s3', 'By programme'],
      ['s4', 'By province'], ['s5', 'Hotspots'], ['s6', 'Districts'],
      ['s7', 'Who waits longer'], ['s8', 'Poverty risk'], ['s9', 'Finance'],
      ['s10', 'Food prices'], ['s11', 'Priority score'], ['s12', 'Limits and sources']
    ];

    const todayStr = new Date().toISOString().slice(0, 10);

    return `
      <div class="doc" id="nisrdoc">
        <!-- Hero Header Card with Leaves -->
        <div class="dh">
          <i class="lf l1"></i>
          <i class="lf l2"></i>
          <span class="tag">Real data</span>
          <span class="tag">EICV7 · 2023–2024</span>
          <span class="tag">Early unweighted values</span>
          <h1>NISR facts: late VUP payments, poverty and food prices</h1>
          <p>A plain-words report from the NISR Integrated Household Living Conditions Survey (EICV7). It shows patterns, not reasons. Prepared ${todayStr} in VUP Bridge. Built on NISR household microdata.</p>
          <div class="tb">
            <button class="btn" onclick="window.app.downloadNisrPdf()">
              📥 Download PDF
            </button>
            <button class="btn" onclick="window.app.downloadNisrHtml()">
              🌐 Download web page
            </button>
            <button class="btn" onclick="window.app.downloadNisrCsv()">
              📊 Download tables (CSV)
            </button>
          </div>
        </div>

        <!-- Table of Contents Pills -->
        <div class="toc" role="navigation" aria-label="Contents">
          ${toc.map(t => `<button onclick="document.getElementById('${t[0]}')?.scrollIntoView({behavior:'smooth'})">${t[1]}</button>`).join('')}
        </div>

        <!-- Section 1: Key Findings -->
        ${sec('s1', 'Key findings', `
          <div class="kpis">
            <div class="kpi">
              <b>${avg} days</b>
              average wait after due date
              <small>${tot.toLocaleString()} payment records</small>
            </div>
            <div class="kpi">
              <b>${o7}%</b>
              waited more than 7 days
              <small>about half of beneficiaries</small>
            </div>
            <div class="kpi">
              <b>14.6 days</b>
              worst hotspot: Expanded Public Works, Southern
              <small>79% waited over 7 days</small>
            </div>
            <div class="kpi">
              <b>Kirehe 15.5</b>
              slowest district (days late)
              <small>70 records, small sample</small>
            </div>
          </div>
          <p class="mute" style="margin-top:10px; color:var(--mute); font-size:12.5px;">Totals calculated from the survey microdata. The survey covers 3,771 households and 15,039 people across Rwanda.</p>
        `)}

        <!-- Section 2: How to read this report -->
        ${sec('s2', 'How to read this report', `
          <p class="mute" style="margin-bottom:10px; color:var(--mute); font-size:13px;">Every group gets a class with a shape, so you never need color to read it. Use the filter to show only one class.</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <b>Show delay class:</b>
            <div class="seg">
              ${['All', 'High', 'Medium', 'Low'].map(x => `
                <button class="${x === NF ? 'on' : ''}" onclick="window.app.filterNisrClass('${x}')">${x}</button>
              `).join('')}
            </div>
          </div>
          <div class="sc">
            <table>
              <tr><th>What we measure</th><th>✔ Good</th><th>▲ Watch</th><th>✖ Act</th></tr>
              <tr><td>Average days late</td><td>under 7</td><td>7 to 10</td><td>over 10</td></tr>
              <tr><td>Paid more than 7 days late</td><td>under 40%</td><td>40% to 55%</td><td>over 55%</td></tr>
              <tr><td>Records in the group</td><td>100 or more: reliable</td><td>25 to 99: small sample, take care</td><td>under 25: hide or warn</td></tr>
              <tr><td>Food price per kg</td><td>under 500: cheap staple</td><td>500 to 1,500: mid cost</td><td>over 1,500: high cost</td></tr>
              <tr><td>Seller price vs NISR middle price</td><td>85% to 115%: Fair</td><td>under 85%: Low</td><td>over 115%: High</td></tr>
            </table>
          </div>
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12px;"><b>Real</b> = NISR survey numbers. <b>Simulated</b> = app people, orders, credit, pool. <b>Assumed</b> = food basket daily cost (261 RWF/person/day).</p>
        `)}

        <!-- Section 3: Delay by programme -->
        ${sec('s3', '1. Payment delay by VUP programme', dt(NISR, 'Programme') + `
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12.5px;">Public works programmes wait longer than Direct Support and NSDS.</p>
        `)}

        <!-- Section 4: Delay by province -->
        ${sec('s4', '2. Payment delay by province', dt(PROV, 'Province') + `
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12.5px;">Southern and Eastern wait longest. Northern waits least.</p>
        `)}

        <!-- Section 5: Hotspots matrix -->
        ${sec('s5', '3. Hotspots: programme by province', `
          <p class="mute" style="margin-bottom:8px; color:var(--mute); font-size:12.5px;">Average days late. A dash means no value in this summary.</p>
          <div class="sc">
            <table>
              <tr><th>Programme</th>${COLS.map(c => `<th style="text-align:center">${c}</th>`).join('')}</tr>
              ${MX.map(r => `
                <tr>
                  <td>${r[0]}</td>
                  ${r[1].map(c => c ? `<td class="c ${cD(c[0])[0]}"><b>${c[0]}</b> ${cD(c[0])[1]}${c[1] ? `<small>${c[1]}</small>` : ''}</td>` : '<td class="c">—</td>').join('')}
                </tr>
              `).join('')}
            </table>
          </div>
        `)}

        <!-- Section 6: Districts -->
        ${sec('s6', '4. Districts: slowest and fastest', `
          <b>Slowest five districts</b>
          ${dt(DIS.slow, 'District')}
          <b style="display:block; margin-top:14px;">Fastest five districts</b>
          ${dt(DIS.fast, 'District')}
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12.5px;">Kicukiro has only 27 records. Treat small samples with care.</p>
        `)}

        <!-- Section 7: Who waits longer -->
        ${sec('s7', '5. Who waits longer?', `
          <b>By poverty group (measured after support is received)</b>
          ${dt(PG, 'Group')}
          <b style="display:block; margin-top:14px;">By payment method</b>
          ${dt(PM, 'Method')}
          <b style="display:block; margin-top:14px;">By sex</b>
          ${dt(SX, 'Sex')}
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12.5px;">Mobile money payments wait about 2.7 days longer than Umurenge SACCO payments. Women and men wait the same time. This is an administrative pattern, not a reason.</p>
        `)}

        <!-- Section 8: Poverty risk model -->
        ${sec('s8', '6. Poverty risk model', `
          <div class="kpis">
            <div class="kpi"><b>29%</b>of sampled households are poor</div>
            <div class="kpi"><b>0.76–0.79</b>AUC score ${bd(['wa', '▲', 'Fair'])}<small>0.5 = guessing, 1 = perfect</small></div>
            <div class="kpi"><b>4.9 vs 3.6</b>people at home: poor vs not poor</div>
          </div>
          <b style="display:block; margin-top:14px;">Main factors, from strongest:</b>
          <ol class="ol" style="margin-top:6px;">
            <li>Household size</li>
            <li>Estimated rent</li>
            <li>Number of children</li>
            <li>Outside floor area</li>
            <li>Floor material</li>
          </ol>
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12.5px;">The model uses housing and household facts only. Use it to guide where to look. Never use it to decide who gets help.</p>
        `)}

        <!-- Section 9: Finance & Loans -->
        ${sec('s9', '7. Money and loans (survey records)', `
          <b>Accounts held</b>
          ${bars(ACC, 4699, r => r[1].toLocaleString(), () => 'ok')}
          <b style="display:block; margin-top:12px;">Where loans come from</b>
          ${bars(LON, 2129, r => r[1].toLocaleString(), () => 'ok')}
          <b style="display:block; margin-top:12px;">Why loans were refused</b>
          ${bars(REF, 113, r => r[1].toLocaleString(), () => 'wa')}
          <p class="mute" style="margin-top:8px; color:var(--mute); font-size:12.5px;">Only 353 of 5,404 people (6.5%) tried to get a formal loan. Most borrow from a tontine (ibimina) or relatives.</p>
        `)}

        <!-- Section 10: Food prices -->
        ${sec('s10', '8. Food prices (NISR middle price per kg, RWF)', `
          ${bars(PR, 3030, r => r[1].toLocaleString() + ' ' + cP(r[1])[1], r => cP(r[1])[0])}
          <b style="display:block; margin-top:14px;">Where households buy food</b>
          ${bars(BUY, 69, r => r[1] + '%', () => 'ok')}
          <b style="display:block; margin-top:14px;">Basket used for credit (assumed): 261 RWF per person per day</b>
          <div class="sc">
            <table>
              <tr><th>Food</th><th>Amount</th><th>Price per kg</th><th>Cost</th></tr>
              <tr><td>Dry beans</td><td>120 g</td><td>800</td><td>96</td></tr>
              <tr><td>Sweet potato</td><td>300 g</td><td>250</td><td>75</td></tr>
              <tr><td>Tomato</td><td>80 g</td><td>500</td><td>40</td></tr>
              <tr><td>Onion</td><td>30 g</td><td>1,667</td><td>50</td></tr>
              <tr><td><b>Total</b></td><td></td><td></td><td><b>261 RWF</b></td></tr>
            </table>
          </div>
        `)}

        <!-- Section 11: Priority score -->
        ${sec('s11', '9. District priority score', `
          <p class="mute" style="color:var(--mute); font-size:13px;">Method: for each district, standardise (a) poverty rate, (b) average payment delay, and (c) food price level, average the three, then rank. Delay-only list to investigate first:</p>
          <ol class="ol" style="margin-top:8px;">
            ${DIS.slow.map(r => `<li><b>${r[0]}</b>: ${r[1]} days late ${bd(cN(r[3]))}</li>`).join('')}
          </ol>
        `)}

        <!-- Section 12: Limits & Sources -->
        ${sec('s12', 'Limits and sources', `
          <ol class="ol">
            <li>These are patterns. The data cannot show why a payment was late.</li>
            <li>Values are early and unweighted. They will change after the weighted run and the check against NISR's EICV7 VUP Thematic Report.</li>
            <li>Poverty is measured after support is received.</li>
            <li>Only summary tables are shown. No individual household rows are published.</li>
            <li>Source: NISR, EICV7 2023–2024, VUP. Reference RWA-NISR-EICV7-VUP-2023-2024-V01, microdata.statistics.gov.rw/index.php/catalog/121.</li>
            <li>AI tools helped build this prototype.</li>
          </ol>
        `)}
      </div>
    `;
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new IsokoApp();
  window.app.init();
});
