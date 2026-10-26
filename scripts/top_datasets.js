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



