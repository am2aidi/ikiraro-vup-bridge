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
  // Beans & Pulses
  "Dry beans": { img: "assets/produce/dry_beans.jpg", icon: "🫘", kiny: "Ibishyimbo bitukura", category: "Beans", retailPrice: 850, defaultDistrict: "Kirehe", hub: "Gatore Food Bank & SACCO Point", unit: "kg" },
  "Yellow beans": { img: "assets/produce/dry_beans.jpg", icon: "🫘", kiny: "Ibishyimbo by'umuhondo", category: "Beans", retailPrice: 950, defaultDistrict: "Ngoma", hub: "Ngoma Agro-Hub", unit: "kg" },
  "Climbing beans": { img: "assets/produce/dry_beans.jpg", icon: "🫘", kiny: "Ibishyimbo by'imishingo", category: "Beans", retailPrice: 900, defaultDistrict: "Musanze", hub: "Musanze Highland Depot", unit: "kg" },
  "Soybeans": { img: "assets/produce/dry_beans.jpg", icon: "🫘", kiny: "Soya y'u Rwanda", category: "Beans", retailPrice: 750, defaultDistrict: "Kayonza", hub: "Kayonza Grain Link", unit: "kg" },
  "Groundnuts": { img: "assets/produce/dry_beans.jpg", icon: "🥜", kiny: "Ubunyobwa", category: "Beans", retailPrice: 1750, defaultDistrict: "Ngoma", hub: "Ngoma Farmers Hub", unit: "kg" },

  // Tubers & Roots
  "Irish potato": { img: "assets/produce/irish_potato.jpg", icon: "🥔", kiny: "Ibirayi bya Kinigi", category: "Tubers", retailPrice: 480, defaultDistrict: "Musanze", hub: "Mukamira Highland Depot", unit: "kg" },
  "Kinigi Irish potato": { img: "assets/produce/irish_potato.jpg", icon: "🥔", kiny: "Ibirayi bya Kinigi", category: "Tubers", retailPrice: 480, defaultDistrict: "Musanze", hub: "Kinigi Potato Center", unit: "kg" },
  "Kuruseke potato": { img: "assets/produce/irish_potato.jpg", icon: "🥔", kiny: "Ibirayi bya Kuruseke", category: "Tubers", retailPrice: 440, defaultDistrict: "Nyabihu", hub: "Mukamira Highland Depot", unit: "kg" },
  "Sweet potato": { img: "assets/produce/sweet_potato.jpg", icon: "🍠", kiny: "Ibijumba bitukura", category: "Tubers", retailPrice: 280, defaultDistrict: "Gisagara", hub: "Gisagara Agro-Hub", unit: "kg" },
  "Orange sweet potato": { img: "assets/produce/sweet_potato.jpg", icon: "🍠", kiny: "Ibijumba by'umuhondo", category: "Tubers", retailPrice: 320, defaultDistrict: "Huye", hub: "Huye Women Agrilink", unit: "kg" },
  "Cassava roots": { img: "assets/produce/sweet_potato.jpg", icon: "🪵", kiny: "Imyumbati mibisi", category: "Tubers", retailPrice: 260, defaultDistrict: "Ruhango", hub: "Ruhango Central Market Point", unit: "kg" },

  // Vegetables
  "Tomato": { img: "assets/produce/tomato.jpg", icon: "🍅", kiny: "Inyanya zihiye", category: "Vegetables", retailPrice: 550, defaultDistrict: "Kamonyi", hub: "Kamonyi Farmers Depot", unit: "kg" },
  "Fresh tomato": { img: "assets/produce/tomato.jpg", icon: "🍅", kiny: "Inyanya zihiye", category: "Vegetables", retailPrice: 550, defaultDistrict: "Kamonyi", hub: "Kamonyi Farmers Depot", unit: "kg" },
  "Onion": { img: "assets/produce/red_onion.jpg", icon: "🧅", kiny: "Ibitunguru bitukura", category: "Vegetables", retailPrice: 1650, defaultDistrict: "Kamonyi", hub: "Kamonyi Farmers Depot", unit: "kg" },
  "Red onion": { img: "assets/produce/red_onion.jpg", icon: "🧅", kiny: "Ibitunguru bitukura", category: "Vegetables", retailPrice: 1650, defaultDistrict: "Kamonyi", hub: "Kamonyi Farmers Depot", unit: "kg" },
  "Green cabbage": { img: "assets/produce/spinach.jpg", icon: "🥬", kiny: "Amashu meza", category: "Vegetables", retailPrice: 320, defaultDistrict: "Musanze", hub: "Volcanoes Green Depot", unit: "kg" },
  "Carrots": { img: "assets/produce/sweet_potato.jpg", icon: "🥕", kiny: "Amakaroti", category: "Vegetables", retailPrice: 420, defaultDistrict: "Gicumbi", hub: "Gicumbi High-Altitude Center", unit: "kg" },
  "Fresh carrots": { img: "assets/produce/sweet_potato.jpg", icon: "🥕", kiny: "Amakaroti", category: "Vegetables", retailPrice: 420, defaultDistrict: "Gicumbi", hub: "Gicumbi High-Altitude Center", unit: "kg" },
  "Spinach": { img: "assets/produce/spinach.jpg", icon: "🥬", kiny: "Dodo / Imbwija", category: "Vegetables", retailPrice: 280, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", unit: "kg" },
  "Spinach / Dodo": { img: "assets/produce/spinach.jpg", icon: "🥬", kiny: "Dodo / Imbwija", category: "Vegetables", retailPrice: 280, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub", unit: "kg" },
  "Green peppers": { img: "assets/produce/spinach.jpg", icon: "🫑", kiny: "Poivrons vert", category: "Vegetables", retailPrice: 800, defaultDistrict: "Bugesera", hub: "Bugesera Rice & Veg Depot", unit: "kg" },
  "Isombe (Cassava leaves)": { img: "assets/produce/spinach.jpg", icon: "🥬", kiny: "Isombe ritetse", category: "Vegetables", retailPrice: 350, defaultDistrict: "Muhanga", hub: "Muhanga Valley Hub", unit: "kg" },

  // Fruits
  "Cooking banana": { img: "assets/produce/cooking_banana.jpg", icon: "🍌", kiny: "Ibitoki by'igitoki", category: "Fruits", retailPrice: 340, defaultDistrict: "Rwamagana", hub: "Rwamagana Banana Depot", unit: "kg" },
  "Sweet banana (Kamaramasenge)": { img: "assets/produce/cooking_banana.jpg", icon: "🍌", kiny: "Kamaramasenge", category: "Fruits", retailPrice: 550, defaultDistrict: "Gatsibo", hub: "Kabarore Fruit Terminal", unit: "kg" },
  "Avocado": { img: "assets/produce/avocado.jpg", icon: "🥑", kiny: "Avoka ya Hass", category: "Fruits", retailPrice: 320, defaultDistrict: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", unit: "kg" },
  "Hass avocado": { img: "assets/produce/avocado.jpg", icon: "🥑", kiny: "Avoka ya Hass", category: "Fruits", retailPrice: 320, defaultDistrict: "Karongi", hub: "Karongi Lake Depot", unit: "kg" },
  "Passion fruit": { img: "assets/produce/avocado.jpg", icon: "🫐", kiny: "Marakuja y'umutuku", category: "Fruits", retailPrice: 1100, defaultDistrict: "Nyamagabe", hub: "Nyamagabe Highland Hub", unit: "kg" },
  "Tree tomatoes": { img: "assets/produce/tomato.jpg", icon: "🍅", kiny: "Ibinyomoro", category: "Fruits", retailPrice: 980, defaultDistrict: "Burera", hub: "Burera Highland Agro-Hub", unit: "kg" },
  "Tree tomatoes (Tamarillo)": { img: "assets/produce/tomato.jpg", icon: "🍅", kiny: "Ibinyomoro", category: "Fruits", retailPrice: 980, defaultDistrict: "Burera", hub: "Burera Highland Agro-Hub", unit: "kg" },
  "Bugesera mangoes": { img: "assets/produce/avocado.jpg", icon: "🥭", kiny: "Imyembe y'i Bugesera", category: "Fruits", retailPrice: 750, defaultDistrict: "Bugesera", hub: "Nyamata Fresh Depot", unit: "kg" },
  "Golden papaya": { img: "assets/produce/cooking_banana.jpg", icon: "🍈", kiny: "Ipapayi", category: "Fruits", retailPrice: 480, defaultDistrict: "Ngoma", hub: "Ngoma Sunrise Center", unit: "kg" },

  // Grains & Flours
  "Local rice": { img: "assets/produce/local_rice.jpg", icon: "🍚", kiny: "Umuceri wa Bugarama", category: "Grains", retailPrice: 1350, defaultDistrict: "Rusizi", hub: "Bugarama Rice Mill", unit: "kg" },
  "Local rice (Bugarama)": { img: "assets/produce/local_rice.jpg", icon: "🍚", kiny: "Umuceri wa Bugarama", category: "Grains", retailPrice: 1350, defaultDistrict: "Rusizi", hub: "Bugarama Rice Mill", unit: "kg" },
  "Local rice (Mukunguri)": { img: "assets/produce/local_rice.jpg", icon: "🍚", kiny: "Umuceri wa Mukunguri", category: "Grains", retailPrice: 1250, defaultDistrict: "Kamonyi", hub: "Mukunguri Valley Terminal", unit: "kg" },
  "Fresh sweet corn": { img: "assets/produce/fresh_corn.jpg", icon: "🌽", kiny: "Ibigori bibisi", category: "Grains", retailPrice: 400, defaultDistrict: "Nyagatare", hub: "Nyagatare Agro-Depot", unit: "kg" },
  "Dry maize grain": { img: "assets/produce/fresh_corn.jpg", icon: "🌽", kiny: "Ibigori byumye", category: "Grains", retailPrice: 580, defaultDistrict: "Kayonza", hub: "Kayonza Central Silos", unit: "kg" },
  "Corn flour (factory)": { img: "assets/produce/fresh_corn.jpg", icon: "🌽", kiny: "Ifu y'Ibigori", category: "Grains", retailPrice: 920, defaultDistrict: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", unit: "kg" },
  "Corn flour (Kawunga)": { img: "assets/produce/fresh_corn.jpg", icon: "🌽", kiny: "Ifu y'Ibigori (Kawunga)", category: "Grains", retailPrice: 920, defaultDistrict: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", unit: "kg" },
  "Cassava flour": { img: "assets/produce/fresh_corn.jpg", icon: "🌾", kiny: "Ifu y'imyumbati", category: "Grains", retailPrice: 540, defaultDistrict: "Nyanza", hub: "Nyanza Central Hub", unit: "kg" },
  "Sorghum flour": { img: "assets/produce/fresh_corn.jpg", icon: "🥣", kiny: "Ifu y'amasaka y'igikoma", category: "Grains", retailPrice: 850, defaultDistrict: "Nyamasheke", hub: "Nyamasheke Mills", unit: "kg" },

  // Dairy & Honey
  "Fresh farm milk": { img: "assets/produce/local_rice.jpg", icon: "🥛", kiny: "Amata y'inshyushyu", category: "Dairy", retailPrice: 500, defaultDistrict: "Gicumbi", hub: "Gicumbi Milk Collection Center", unit: "L" },
  "Farm chicken eggs": { img: "assets/produce/dry_beans.jpg", icon: "🥚", kiny: "Amagi y'inkoko (Tray)", category: "Dairy", retailPrice: 4200, defaultDistrict: "Bugesera", hub: "Bugesera Poultry Hub", unit: "tray" },
  "Nyungwe forest honey": { img: "assets/produce/cooking_banana.jpg", icon: "🍯", kiny: "Ubuki bw'i Nyungwe", category: "Dairy", retailPrice: 3800, defaultDistrict: "Nyaruguru", hub: "Kibeho Agro-Point", unit: "kg" }
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
  { key: "Farmer", title: "Farmer", line: "I sell food I grow", kinyTitle: "Umucuruzi w'Umusaruro", kinyLine: "Ngurisha umusaruro w'ubuhinzi", frTitle: "Vendeur Agricole", frLine: "Je vends des produits vivriers" },
  { key: "Trader", title: "Market trader", line: "I sell food from local markets", kinyTitle: "Umucuruzi wo ku isoko", kinyLine: "Ngurisha ibiribwa byo ku isoko", frTitle: "Commerçant du marché", frLine: "Je vends des produits du marché" },
  { key: "Shopper", title: "Shopper", line: "I buy food and help the pool", kinyTitle: "Umuguzi", kinyLine: "Ngura ibiribwa kandi ngaterera inkunga ikigega", frTitle: "Acheteur Solidaire", frLine: "J'achète des vivres et soutiens le fonds" },
  { key: "Admin", title: "Government worker (optional)", line: "I see the whole system", kinyTitle: "Umukozi wa Leta (Ibyifuzo)", kinyLine: "Mbona imikorere yose ya gahunda", frTitle: "Agent Gouvernemental (optionnel)", frLine: "J'ai une vue globale sur tout le système" }
];






class IsokoApp {
  constructor() {
    this.state = this.loadState();
    this.map = null;
    this.mapLayer = null;
    this.mapMetric = "priority";
    this.currentStatementData = null;
  }

  loadState() {
    try {
      const raw = localStorage.getItem("vup_bridge_state_v7");
      if (raw) {
        const parsed = JSON.parse(raw);
        const init = this.getInitialState();
        if (parsed.listings && parsed.listings.length < init.listings.length) {
          const userCreated = parsed.listings.filter(l => l.id > 46);
          parsed.listings = [...init.listings, ...userCreated];
        }
        const state = { ...init, ...parsed };
        state.agasekePool = typeof state.agasekePool === "number" ? state.agasekePool : 145210;
        state.agasekeDisbursed = typeof state.agasekeDisbursed === "number" ? state.agasekeDisbursed : 35000;
        state.agasekeAssistedCount = typeof state.agasekeAssistedCount === "number" ? state.agasekeAssistedCount : 7;
        state.selectedArchNode ||= "bridge";
        state.activeArchFlow ||= "all";
        state.archSimStep = typeof state.archSimStep === "number" ? state.archSimStep : 0;
        const seededMembers = new Map((init.users?.member || []).map(user => [user.email, user]));
        state.users ||= {};
        if (!state.users.trader?.length && window.VUP_SAMPLE_USERS?.trader?.length) state.users.trader = JSON.parse(JSON.stringify(window.VUP_SAMPLE_USERS.trader));
        state.users.member ||= [];
        state.users.member = state.users.member.map(user => {
          const seeded = seededMembers.get(user.email) || {};
          return {
            ...seeded,
            ...user,
            daysWorked: Number.isFinite(Number(user.daysWorked)) ? Number(user.daysWorked) : Number(seeded.daysWorked || 0),
            governmentAmountOwed: Number.isFinite(Number(user.governmentAmountOwed)) ? Number(user.governmentAmountOwed) : Number(seeded.governmentAmountOwed || 0)
          };
        });
        this.ensureTraderListings(state);
        state.orders = (state.orders || []).map(order => {
          if (order.mode !== "credit" || !(order.creditStatus === "requested" || order.status === "Pending Approval")) return order;
          return { ...order, status: "Placed", creditStatus: "approved", approvedBy: "System (automatic)", approvedDate: order.approvedDate || new Date().toLocaleDateString("en-GB"), paidBy: "VUP amount owed" };
        });
        if (state.currentUser?.email) {
          const savedUser = state.users.member.find(user => user.email === state.currentUser.email);
          if (savedUser) state.currentUser = { ...savedUser };
        }
        return state;
      }
    } catch (e) {
      console.warn("Could not load stored state:", e);
    }
    const fresh = this.getInitialState();
    this.ensureTraderListings(fresh);
    return fresh;
  }

  ensureTraderListings(state) {
    const traderEmail = "umutima.market@vupbridge.rw";
    const items = [
      { food: "Hass avocado", price: 320, retailPrice: 380, quantity: 65, unit: "kg", photo: "assets/produce/avocado.jpg", category: "Fruits" },
      { food: "Cooking banana", price: 310, retailPrice: 360, quantity: 90, unit: "kg", photo: "assets/produce/cooking_banana.jpg", category: "Fruits" },
      { food: "Farm chicken eggs", price: 3700, retailPrice: 4300, quantity: 24, unit: "tray", photo: "assets/produce/dry_beans.jpg", category: "Dairy" }
    ];
    state.listings ||= [];
    let nextId = Math.max(1, ...(state.listings || []).map(listing => (Number(listing.id) || 0) + 1));
    items.forEach(item => {
      if (state.listings.some(listing => listing.farmerEmail === traderEmail && listing.food === item.food)) return;
      state.listings.push({ id: nextId++, ...item, district: "Gasabo", sector: "Kimironko", hub: "Kimironko Market", farmer: "Umutima Market Traders", farmerEmail: traderEmail, sellerType: "trader", momo: "078XXXX321", isFav: false });
    });
    state.nextListingId = Math.max(Number(state.nextListingId) || 1, nextId);
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
      sellerTypeFilter: "all",
      searchQuery: "",
      selectedDistrictFilter: "all",
      selectedSellerFilter: null,
      produceSort: "distance",
      selectedArchNode: "bridge",
      activeArchFlow: "all",
      archSimStep: 0,
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
      daysWorked: 0,
      governmentAmountOwed: 14400,
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
        { id: 1, food: "Dry beans", district: "Kirehe", sector: "Gatore", hub: "Gatore Food Bank & SACCO Point", price: 780, retailPrice: 850, quantity: 240, unit: "kg", farmer: "Mukamana Farm", farmerEmail: "mukamana.farm@vupbridge.rw", momo: "078XXXX123", photo: "assets/produce/dry_beans.jpg", isFav: false, category: "Beans" },
        { id: 2, food: "Yellow beans", district: "Ngoma", sector: "Kibungo", hub: "Ngoma Agro-Hub", price: 820, retailPrice: 950, quantity: 180, unit: "kg", farmer: "Ngoma Bean Cooperative", farmerEmail: "ngoma.beans@vupbridge.rw", momo: "078XXXX234", photo: "assets/produce/dry_beans.jpg", isFav: false, category: "Beans" },
        { id: 3, food: "Climbing beans", district: "Musanze", sector: "Kinigi", hub: "Musanze Highland Depot", price: 790, retailPrice: 900, quantity: 300, unit: "kg", farmer: "Burera Terrace Farmers", farmerEmail: "burera.farmers@vupbridge.rw", momo: "078XXXX345", photo: "assets/produce/dry_beans.jpg", isFav: true, category: "Beans" },
        { id: 4, food: "Kinigi Irish potato", district: "Musanze", sector: "Muhoza", hub: "Kinigi Potato Center", price: 420, retailPrice: 480, quantity: 650, unit: "kg", farmer: "Kinigi Highland Union", farmerEmail: "kinigi.union@vupbridge.rw", momo: "078XXXX456", photo: "assets/produce/irish_potato.jpg", isFav: true, category: "Tubers" },
        { id: 5, food: "Kuruseke potato", district: "Nyabihu", sector: "Mukamira", hub: "Mukamira Highland Depot", price: 380, retailPrice: 440, quantity: 500, unit: "kg", farmer: "Nyabihu Potato Cooperative", farmerEmail: "potato.coop@vupbridge.rw", momo: "078XXXX654", photo: "assets/produce/irish_potato.jpg", isFav: false, category: "Tubers" },
        { id: 6, food: "Sweet potato", district: "Gisagara", sector: "Save", hub: "Gisagara Agro-Hub", price: 240, retailPrice: 280, quantity: 350, unit: "kg", farmer: "Gisagara Sweet Potato Group", farmerEmail: "sweetpotato.gisagara@vupbridge.rw", momo: "073XXXX567", photo: "assets/produce/sweet_potato.jpg", isFav: false, category: "Tubers" },
        { id: 7, food: "Orange sweet potato", district: "Huye", sector: "Ngoma", hub: "Huye Women Agrilink", price: 270, retailPrice: 320, quantity: 280, unit: "kg", farmer: "Huye Women Agro-Link", farmerEmail: "huye.women@vupbridge.rw", momo: "078XXXX789", photo: "assets/produce/sweet_potato.jpg", isFav: false, category: "Tubers" },
        { id: 8, food: "Cassava roots", district: "Ruhango", sector: "Kinazi", hub: "Ruhango Central Market Point", price: 220, retailPrice: 260, quantity: 420, unit: "kg", farmer: "Ruhango Cassava Farmers", farmerEmail: "ruhango.cassava@vupbridge.rw", momo: "078XXXX112", photo: "assets/produce/sweet_potato.jpg", isFav: false, category: "Tubers" },
        { id: 9, food: "Fresh tomato", district: "Kamonyi", sector: "Gacurabwenge", hub: "Kamonyi Farmers Depot", price: 480, retailPrice: 550, quantity: 120, unit: "kg", farmer: "Kamonyi Vegetable Growers", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX345", photo: "assets/produce/tomato.jpg", isFav: true, category: "Vegetables" },
        { id: 10, food: "Red onion", district: "Kamonyi", sector: "Runda", hub: "Kamonyi Farmers Depot", price: 1500, retailPrice: 1650, quantity: 95, unit: "kg", farmer: "Kamonyi Vegetable Growers", farmerEmail: "kamonyi.growers@vupbridge.rw", momo: "078XXXX567", photo: "assets/produce/red_onion.jpg", isFav: false, category: "Vegetables" },
        { id: 11, food: "Green cabbage", district: "Musanze", sector: "Remera", hub: "Volcanoes Green Depot", price: 260, retailPrice: 320, quantity: 280, unit: "kg", farmer: "Volcanoes Green Coop", farmerEmail: "volcanoes.green@vupbridge.rw", momo: "078XXXX556", photo: "assets/produce/spinach.jpg", isFav: false, category: "Vegetables" },
        { id: 12, food: "Fresh carrots", district: "Gicumbi", sector: "Kaniga", hub: "Gicumbi High-Altitude Center", price: 360, retailPrice: 420, quantity: 170, unit: "kg", farmer: "Gicumbi Organic Valley", farmerEmail: "gicumbi.organic@vupbridge.rw", momo: "078XXXX445", photo: "assets/produce/sweet_potato.jpg", isFav: false, category: "Vegetables" },
        { id: 13, food: "Spinach / Dodo", district: "Gasabo", sector: "Kimironko", hub: "Kimironko Farmers Hub & SACCO", price: 250, retailPrice: 280, quantity: 80, unit: "kg", farmer: "Nyabarongo Valley Fresh", farmerEmail: "nyabarongo.fresh@vupbridge.rw", momo: "078XXXX901", photo: "assets/produce/spinach.jpg", isFav: false, category: "Vegetables" },
        { id: 14, food: "Green bell peppers", district: "Bugesera", sector: "Nyamata", hub: "Bugesera Rice & Veg Depot", price: 680, retailPrice: 800, quantity: 95, unit: "kg", farmer: "Bugesera Irrigation Scheme", farmerEmail: "bugesera.irrig@vupbridge.rw", momo: "078XXXX667", photo: "assets/produce/spinach.jpg", isFav: false, category: "Vegetables" },
        { id: 15, food: "Isombe (Cassava leaves)", district: "Muhanga", sector: "Nyamabuye", hub: "Muhanga Valley Hub", price: 290, retailPrice: 350, quantity: 150, unit: "kg", farmer: "Muhanga Valley Cooperative", farmerEmail: "muhanga.valley@vupbridge.rw", momo: "078XXXX891", photo: "assets/produce/spinach.jpg", isFav: true, category: "Vegetables" },
        { id: 16, food: "Cooking banana", district: "Rwamagana", sector: "Kigabiro", hub: "Rwamagana Banana Depot", price: 290, retailPrice: 340, quantity: 380, unit: "kg", farmer: "Rwamagana Banana Coop", farmerEmail: "rwamagana.banana@vupbridge.rw", momo: "078XXXX456", photo: "assets/produce/cooking_banana.jpg", isFav: false, category: "Fruits" },
        { id: 17, food: "Sweet banana (Kamaramasenge)", district: "Gatsibo", sector: "Kabarore", hub: "Kabarore Fruit Terminal", price: 460, retailPrice: 550, quantity: 190, unit: "kg", farmer: "Gatsibo Fruit Growers", farmerEmail: "gatsibo.fruit@vupbridge.rw", momo: "078XXXX672", photo: "assets/produce/cooking_banana.jpg", isFav: true, category: "Fruits" },
        { id: 18, food: "Hass avocado", district: "Karongi", sector: "Rubengera", hub: "Karongi Lake Depot", price: 270, retailPrice: 320, quantity: 140, unit: "kg", farmer: "Karongi Lake Harvest", farmerEmail: "karongi.lake@vupbridge.rw", momo: "078XXXX890", photo: "assets/produce/avocado.jpg", isFav: true, category: "Fruits" },
        { id: 19, food: "Passion fruit", district: "Nyamagabe", sector: "Gasaka", hub: "Nyamagabe Highland Hub", price: 920, retailPrice: 1100, quantity: 110, unit: "kg", farmer: "Nyamagabe Highland Fruit Coop", farmerEmail: "nyamagabe.fruit@vupbridge.rw", momo: "078XXXX223", photo: "assets/produce/avocado.jpg", isFav: false, category: "Fruits" },
        { id: 20, food: "Tree tomatoes (Tamarillo)", district: "Burera", sector: "Cyanika", hub: "Burera Highland Agro-Hub", price: 820, retailPrice: 980, quantity: 85, unit: "kg", farmer: "Burera Tamarillo Growers", farmerEmail: "burera.tamarillo@vupbridge.rw", momo: "078XXXX334", photo: "assets/produce/tomato.jpg", isFav: false, category: "Fruits" },
        { id: 21, food: "Bugesera mangoes", district: "Bugesera", sector: "Mayange", hub: "Nyamata Fresh Depot", price: 620, retailPrice: 750, quantity: 200, unit: "kg", farmer: "Bugesera Tropical Fruit Union", farmerEmail: "bugesera.tropical@vupbridge.rw", momo: "078XXXX441", photo: "assets/produce/avocado.jpg", isFav: false, category: "Fruits" },
        { id: 22, food: "Golden papaya", district: "Ngoma", sector: "Rukira", hub: "Ngoma Sunrise Center", price: 390, retailPrice: 480, quantity: 130, unit: "kg", farmer: "Ngoma Sunrise Growers", farmerEmail: "ngoma.sunrise@vupbridge.rw", momo: "078XXXX552", photo: "assets/produce/cooking_banana.jpg", isFav: false, category: "Fruits" },
        { id: 23, food: "Local rice (Bugarama)", district: "Rusizi", sector: "Bugarama", hub: "Bugarama Rice Mill", price: 1150, retailPrice: 1350, quantity: 340, unit: "kg", farmer: "Rusizi Rice Union", farmerEmail: "rusizi.rice@vupbridge.rw", momo: "078XXXX789", photo: "assets/produce/local_rice.jpg", isFav: true, category: "Grains" },
        { id: 24, food: "Local rice (Mukunguri)", district: "Kamonyi", sector: "Musambira", hub: "Mukunguri Valley Terminal", price: 1080, retailPrice: 1250, quantity: 220, unit: "kg", farmer: "Kamonyi Rice Millers", farmerEmail: "kamonyi.rice@vupbridge.rw", momo: "078XXXX790", photo: "assets/produce/local_rice.jpg", isFav: false, category: "Grains" },
        { id: 25, food: "Fresh sweet corn", district: "Nyagatare", sector: "Matimba", hub: "Nyagatare Agro-Depot", price: 320, retailPrice: 400, quantity: 450, unit: "kg", farmer: "Nyagatare Grain Producers", farmerEmail: "nyagatare.grain@vupbridge.rw", momo: "078XXXX012", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" },
        { id: 26, food: "Dry maize grain", district: "Kayonza", sector: "Mukarange", hub: "Kayonza Central Silos", price: 490, retailPrice: 580, quantity: 600, unit: "kg", farmer: "Kayonza Maize Millers", farmerEmail: "kayonza.maize@vupbridge.rw", momo: "078XXXX013", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" },
        { id: 27, food: "Corn flour (Kawunga)", district: "Nyarugenge", sector: "Kigali", hub: "Nyabugogo Direct Agro-Depot", price: 790, retailPrice: 920, quantity: 310, unit: "kg", farmer: "Bugarama Grain Mills", farmerEmail: "bugarama.mills@vupbridge.rw", momo: "078XXXX014", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" },
        { id: 28, food: "Cassava flour", district: "Nyanza", sector: "Busasamana", hub: "Nyanza Central Hub", price: 440, retailPrice: 540, quantity: 270, unit: "kg", farmer: "Nyanza Flour Millers", farmerEmail: "nyanza.flour@vupbridge.rw", momo: "078XXXX015", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" },
        { id: 29, food: "Sorghum flour", district: "Nyamasheke", sector: "Kagano", hub: "Nyamasheke Mills", price: 720, retailPrice: 850, quantity: 180, unit: "kg", farmer: "Nyamasheke Sorghum Mills", farmerEmail: "nyamasheke.mills@vupbridge.rw", momo: "078XXXX016", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" },
        { id: 30, food: "Soybeans", district: "Kayonza", sector: "Rwinkwavu", hub: "Kayonza Agro-Depot", price: 620, retailPrice: 750, quantity: 320, unit: "kg", farmer: "Kayonza Grain Link", farmerEmail: "kayonza.grain@vupbridge.rw", momo: "078XXXX778", photo: "assets/produce/dry_beans.jpg", isFav: false, category: "Beans" },
        { id: 31, food: "Groundnuts", district: "Kirehe", sector: "Mahama", hub: "Ngoma Farmers Hub", price: 1450, retailPrice: 1750, quantity: 160, unit: "kg", farmer: "Kirehe Women Agrilink", farmerEmail: "kirehe.women@vupbridge.rw", momo: "078XXXX889", photo: "assets/produce/dry_beans.jpg", isFav: true, category: "Beans" },
        { id: 32, food: "Fresh farm milk", district: "Gicumbi", sector: "Byumba", hub: "Gicumbi Milk Collection Center", price: 420, retailPrice: 500, quantity: 500, unit: "L", farmer: "Gicumbi Dairy Cooperative", farmerEmail: "gicumbi.dairy@vupbridge.rw", momo: "078XXXX991", photo: "assets/produce/local_rice.jpg", isFav: true, category: "Dairy" },
        { id: 33, food: "Farm chicken eggs", district: "Bugesera", sector: "Gashora", hub: "Bugesera Poultry Hub", price: 3600, retailPrice: 4200, quantity: 90, unit: "tray", farmer: "Bugesera Poultry Cooperative", farmerEmail: "bugesera.poultry@vupbridge.rw", momo: "078XXXX992", photo: "assets/produce/dry_beans.jpg", isFav: false, category: "Dairy" },
        { id: 34, food: "Nyungwe forest honey", district: "Nyaruguru", sector: "Kibeho", hub: "Kibeho Agro-Point", price: 3200, retailPrice: 3800, quantity: 75, unit: "kg", farmer: "Nyungwe Beekeepers Union", farmerEmail: "nyungwe.honey@vupbridge.rw", momo: "078XXXX993", photo: "assets/produce/cooking_banana.jpg", isFav: true, category: "Dairy" },
        { id: 35, food: "Fresh ginger", district: "Rulindo", sector: "Bushoki", hub: "Rulindo Spice Depot", price: 1200, retailPrice: 1450, quantity: 130, unit: "kg", farmer: "Rulindo Spice Cooperative", farmerEmail: "rulindo.spice@vupbridge.rw", momo: "078XXXX101", photo: "assets/produce/sweet_potato.jpg", isFav: false, category: "Vegetables" },
        { id: 36, food: "High-altitude green peas", district: "Gicumbi", sector: "Miyove", hub: "Miyove Highland Hub", price: 1100, retailPrice: 1350, quantity: 150, unit: "kg", farmer: "Miyove Pea Farmers", farmerEmail: "miyove.peas@vupbridge.rw", momo: "078XXXX102", photo: "assets/produce/dry_beans.jpg", isFav: true, category: "Beans" },
        { id: 37, food: "Fermented milk (Ikivuguto)", district: "Nyagatare", sector: "Karangazi", hub: "Nyagatare Milk Center", price: 650, retailPrice: 800, quantity: 300, unit: "L", farmer: "Karangazi Dairy Union", farmerEmail: "karangazi.dairy@vupbridge.rw", momo: "078XXXX103", photo: "assets/produce/local_rice.jpg", isFav: true, category: "Dairy" },
        { id: 38, food: "Lake Kivu fresh fish (Isambaza)", district: "Rubavu", sector: "Gisenyi", hub: "Gisenyi Lake Depot", price: 2800, retailPrice: 3400, quantity: 95, unit: "kg", farmer: "Lake Kivu Fishermen Union", farmerEmail: "kivu.fish@vupbridge.rw", momo: "078XXXX104", photo: "assets/produce/local_rice.jpg", isFav: true, category: "Dairy" },
        { id: 39, food: "Traditional sorghum grain", district: "Burera", sector: "Nemba", hub: "Cyanika Agro Hub", price: 540, retailPrice: 650, quantity: 240, unit: "kg", farmer: "Burera Grain Cooperative", farmerEmail: "burera.grain@vupbridge.rw", momo: "078XXXX105", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" },
        { id: 40, food: "Red kidney beans", district: "Gisagara", sector: "Ndora", hub: "Save Agrilink Point", price: 810, retailPrice: 940, quantity: 260, unit: "kg", farmer: "Ndora Farmers Cooperative", farmerEmail: "ndora.farmers@vupbridge.rw", momo: "078XXXX106", photo: "assets/produce/dry_beans.jpg", isFav: false, category: "Beans" },
        { id: 41, food: "Fresh pineapple", district: "Rwamagana", sector: "Karenge", hub: "Karenge Fruit Center", price: 380, retailPrice: 480, quantity: 320, unit: "kg", farmer: "Rwamagana Tropical Growers", farmerEmail: "rwamagana.tropical@vupbridge.rw", momo: "078XXXX107", photo: "assets/produce/cooking_banana.jpg", isFav: true, category: "Fruits" },
        { id: 42, food: "Specialty Arabica coffee cherries", district: "Rutsiro", sector: "Murunda", hub: "Murunda Washing Station", price: 1600, retailPrice: 2100, quantity: 180, unit: "kg", farmer: "Rutsiro Specialty Coffee Coop", farmerEmail: "rutsiro.coffee@vupbridge.rw", momo: "078XXXX108", photo: "assets/produce/avocado.jpg", isFav: true, category: "Fruits" },
        { id: 43, food: "French green beans", district: "Rubavu", sector: "Rugerero", hub: "Rugerero Export Hub", price: 750, retailPrice: 900, quantity: 140, unit: "kg", farmer: "Rubavu Vegetable Growers", farmerEmail: "rubavu.veg@vupbridge.rw", momo: "078XXXX109", photo: "assets/produce/spinach.jpg", isFav: false, category: "Vegetables" },
        { id: 44, food: "High-altitude mountain tea", district: "Nyamagabe", sector: "Kitabi", hub: "Kitabi Tea Center", price: 1200, retailPrice: 1500, quantity: 110, unit: "kg", farmer: "Kitabi Smallholder Tea Farmers", farmerEmail: "kitabi.tea@vupbridge.rw", momo: "078XXXX110", photo: "assets/produce/spinach.jpg", isFav: false, category: "Vegetables" },
        { id: 45, food: "Organic white honey", district: "Gasabo", sector: "Rutunga", hub: "Rutunga Agro-Terminal", price: 3400, retailPrice: 4000, quantity: 80, unit: "kg", farmer: "Gasabo Beekeepers Association", farmerEmail: "gasabo.honey@vupbridge.rw", momo: "078XXXX111", photo: "assets/produce/cooking_banana.jpg", isFav: true, category: "Dairy" },
        { id: 46, food: "Yellow maize grain", district: "Nyarugenge", sector: "Mageragere", hub: "Mageragere Farmers Point", price: 470, retailPrice: 560, quantity: 480, unit: "kg", farmer: "Mageragere Cooperative", farmerEmail: "mageragere.coop@vupbridge.rw", momo: "078XXXX112", photo: "assets/produce/fresh_corn.jpg", isFav: false, category: "Grains" }
      ],
      nextOrderId: 107,
      nextListingId: 47,
      nextCaseId: 3,
      agasekePool: 145210,
      agasekeDisbursed: 35000,
      agasekeAssistedCount: 7,
      farmerTaxExempt: false,
      newListingFood: "Dry beans",
      selectedDistrict: "Gasabo",
      hotspotMode: "delay",
      selectedPayMethod: "momo",
      pendingCheckoutOrder: null,
      cart: [],
      notifications: [],
      pendingCartListingId: null,
      activityPeriod: "30d"
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
    this.updateLanguageSelector();
    this.syncSidebar();
    this.render();
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  toggleTheme() {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    this.applyTheme();
    this.updateThemeControl();
    this.saveState();
  }

  syncSidebar() {
    const sidebar = document.getElementById("appRail");
    const toggle = document.getElementById("railRw");
    const edgeToggle = document.getElementById("railEdgeToggle");
    if (!sidebar) return;
    const stored = localStorage.getItem("isoko_sidebar_expanded");
    const expanded = stored === null ? true : stored === "true";
    sidebar.classList.toggle("wide", expanded);
    const body = document.querySelector(".shell > .body");
    if (body) body.classList.toggle("menu-collapsed", !expanded);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.title = expanded ? "Close menu" : "Open menu";
      const label = document.getElementById("menuToggleLabel");
      if (label) label.textContent = expanded ? "Close menu" : "Open menu";
    }
    if (edgeToggle) {
      edgeToggle.setAttribute("aria-expanded", String(expanded));
      edgeToggle.title = expanded ? "Collapse sidebar" : "Expand sidebar";
      edgeToggle.classList.toggle("collapsed", !expanded);
    }
    if (typeof this.initRailHighlight === "function") {
      setTimeout(() => this.initRailHighlight(), 460);
    }
  }

  toggleSidebar() {
    const sidebar = document.getElementById("appRail");
    if (!sidebar) return;
    const expanded = !sidebar.classList.contains("wide");
    sidebar.classList.toggle("wide", expanded);
    localStorage.setItem("isoko_sidebar_expanded", String(expanded));
    this.syncSidebar();
  }

  initRailHighlight() {
    const nav = document.getElementById("topNavPill");
    const hl = document.getElementById("railHl");
    if (!nav || !hl) return;
    const links = nav.querySelectorAll(".sidebar-link");
    const move = (el) => {
      if (!el || typeof el.offsetTop !== "number") return;
      hl.style.transform = `translateY(${el.offsetTop}px)`;
      hl.style.height = `${el.offsetHeight || 38}px`;
      hl.style.opacity = "1";
    };
    const settle = () => {
      const active = nav.querySelector(".sidebar-link.on");
      if (active) {
        move(active);
      } else {
        hl.style.opacity = "0";
      }
    };
    links.forEach(link => {
      link.onmouseenter = () => move(link);
    });
    nav.onmouseleave = settle;
    settle();
  }

  updateThemeControl() {
    const button = document.getElementById("themeToggle");
    const label = document.getElementById("themeToggleLabel");
    if (!button) return;
    const dark = this.state.theme === "dark";
    const title = dark ? "Switch to light mode" : "Switch to dark mode";
    button.title = title;
    button.innerHTML = `<i class="bi ${dark ? "bi-sun" : "bi-moon-stars"}" aria-hidden="true"></i><span class="rail-label" id="themeToggleLabel">${dark ? "Light mode" : "Dark mode"}</span>`;
    button.dataset.tip = title;
    button.setAttribute("aria-label", title);
  }

  setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    this.state.theme = theme;
    this.applyTheme();
    this.saveState();
    this.render();
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
    this.updateLanguageSelector();
    this.render();
    const names = { en: "English", rw: "Ikinyarwanda", fr: "Français" };
    this.toast(`Language switched to ${names[lang] || lang}`, "success");
  }

  updateLanguageSelector() {
    ["languageSelect", "settingsLanguage"].forEach(id => {
      const select = document.getElementById(id);
      if (select) select.value = this.state.lang || "en";
    });
  }

  // =========================================================================
  // 1. PROTOTYPE ENTRANCE & ROLE-BASED LOGIN FLOW (Section 3 & 17)
  // =========================================================================
  pickRole(roleCode) {
    this.state.pickRole = roleCode;
    this.state.authMode = "login";
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  cancelPickRole() {
    this.state.pickRole = "";
    this.state.authMode = "login";
    this.render();
  }

  setAuthMode(mode) {
    if (mode !== "login" && mode !== "signup") return;
    const roleCode = this.state.pickRole || "member";
    if (mode === "signup" && ["planner", "admin"].includes(roleCode)) {
      this.toast("Planner and admin accounts are provided by the organization. Choose a demo account to sign in.", "info");
      return;
    }
    this.state.authMode = mode;
    const authCard = document.querySelector(".auth-card");
    if (authCard && !window.matchMedia("(max-width: 760px)").matches) {
      authCard.dataset.mode = mode;
      window.setTimeout(() => {
        if (this.state.authMode === mode && authCard.isConnected) this.render();
      }, 680);
      return;
    }
    this.render();
  }

  handlePrototypeSignup(event) {
    event.preventDefault();
    const name = (document.getElementById("signupName")?.value || "").trim();
    const email = (document.getElementById("signupEmail")?.value || "").trim().toLowerCase();
    const password = document.getElementById("signupPassword")?.value || "";
    const roleCode = this.state.pickRole || "member";
    if (!name || !email || password.length < 6) {
      this.toast("Add your name, a valid email, and a password with at least 6 characters.", "warning");
      return;
    }
    if (["planner", "admin"].includes(roleCode)) {
      this.toast("Planner and admin accounts are provided by the organization.", "info");
      return;
    }
    const allUsers = Object.values(this.state.users || {}).flat();
    if (allUsers.some(user => (user.email || "").toLowerCase() === email)) {
      this.state.authMode = "login";
      this.render();
      this.toast("This email already has an account. Please log in.", "info");
      return;
    }
    const roleMap = { member: "Family", planner: "Planner", seller: "Farmer", trader: "Farmer", shopper: "Shopper", admin: "Admin" };
    const account = {
      name, email, password,
      role: roleMap[roleCode] || "Family",
      roleCode,
      district: "Gasabo",
      sector: "",
      status: roleCode === "member" ? "not_submitted" : ["seller", "trader"].includes(roleCode) ? "pending" : "verified",
      householdSize: 4,
      daysWorked: 0,
      governmentAmountOwed: 0,
      daysLate: 0,
      usualPaymentDay: 15,
      programme: "Direct Support"
    };
    this.state.users ||= {};
    this.state.users[roleCode] ||= [];
    this.state.users[roleCode].push(account);
    this.state.currentUser = { ...account };
    this.state.user = email;
    this.state.role = account.role;
    this.state.roleCode = roleCode;
    this.state.pickRole = "";
    this.state.activeSubView = "dashboard";
    if (this.state.pendingCartListingId) { const listingId=this.state.pendingCartListingId; this.state.pendingCartListingId=null; this.addToCart(listingId); }
    this.saveState();
    this.render();
    this.toast("Your demo account is ready.", "success");
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
    const email = (document.getElementById("protoEmail")?.value || "").trim().toLowerCase();
    const password = document.getElementById("protoPassword")?.value || "";
    const roleCode = this.state.pickRole || "member";
    const users = Object.values(this.state.users || {}).flat();
    const account = users.find(user => (user.email || "").toLowerCase() === email);
    if (!account) {
      this.toast("We could not find this account. Create an account or choose a demo user.", "warning");
      return;
    }
    if ((account.roleCode || roleCode) !== roleCode) {
      this.state.pickRole = account.roleCode;
      this.state.authMode = "login";
      this.render();
      this.toast(`Choose the ${this.getRoleTitleByCode(account.roleCode)} portal for this account.`, "info");
      return;
    }
    if (account.password && account.password !== password) {
      this.toast("That password does not match this account. Try again.", "warning");
      return;
    }
    const roleMap = { member: "Family", planner: "Planner", seller: "Farmer", trader: "Farmer", shopper: "Shopper", admin: "Admin" };
    this.state.currentUser = { ...account };
    this.state.role = roleMap[roleCode] || account.role;
    this.state.roleCode = roleCode;
    this.state.user = email;
    this.state.pickRole = "";
    this.state.authMode = "login";
    this.state.activeSubView = "dashboard";
    if (this.state.pendingCartListingId) { const listingId=this.state.pendingCartListingId; this.state.pendingCartListingId=null; this.addToCart(listingId); }
    this.saveState();
    this.render();
    this.toast(`Welcome, ${account.name || email}.`, "success");
  }

  logout() {
    this.state.user = null;
    this.state.pickRole = "";
    this.state.activeSubView = "dashboard";
    this.saveState();
    this.render();
    this.toast("Logged out. Returned to role selection.", "info");
  }

  deleteOwnAccount() {
    const email = String(this.state.currentUser?.email || this.state.user || "").trim().toLowerCase();
    const roleCode = this.state.roleCode || "member";
    if (!email || !this.state.user) { this.toast("Sign in before deleting an account.", "warning"); return; }
    if (roleCode === "admin" && (this.state.users?.admin || []).filter(account => String(account.email || "").toLowerCase() !== email).length === 0) {
      this.toast("This is the only admin account. Add another admin before deleting it.", "warning"); return;
    }
    if (!window.confirm("Delete this demo account? Your sign-in and profile will be removed from this browser. Existing transaction and audit records stay unchanged under the project rules. This cannot be undone.")) return;
    this.state.users[roleCode] = (this.state.users?.[roleCode] || []).filter(account => String(account.email || "").toLowerCase() !== email);
    this.state.notifications = (this.state.notifications || []).filter(note => String(note.targetEmail || "").toLowerCase() !== email);
    this.state.user = null; this.state.currentUser = null; this.state.roleCode = null; this.state.role = null;
    this.state.pickRole = ""; this.state.activeSubView = "dashboard";
    this.saveState(); this.render();
    this.toast("Demo account deleted. Existing transaction records were kept.", "info");
  }

  getRoleTitleByCode(code) {
    const lang = this.state.lang || "en";
    const r = ROLES.find(x => x.code === code || x.key === code || (code === "member" && x.key === "Family") || (code === "seller" && x.key === "Farmer") || (code === "trader" && x.key === "Trader"));
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
    this.addNotification(`Your Isoko Bridge account has been approved. You can now use your member dashboard.`, { targetEmail: user.email, type: "account" });

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
    this.toast(`Food credit is issued automatically. No approval is needed for order #${orderId}.`, "info");
  }

  disburseToSeller(orderId) {
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can send money from the bridge pool.", "warning"); return; }
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
    this.addNotification(`Payment of ${o.total.toLocaleString()} RWF for order #${orderId} was sent to ${o.farmer}.`, { targetEmail: o.farmerEmail, type: "payment" });
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
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can record a VUP repayment.", "warning"); return; }
    const o = this.state.orders.find(x => x.id === orderId);
    if (!o) return;
    const due = Math.max(0, Number(o.total) - Number(o.repaidAmount || 0));
    const member = (this.state.users?.member || []).find(user => user.email === o.buyerEmail);
    if (!member || Number(member.governmentAmountOwed || 0) < due) {
      this.toast("The recorded VUP amount is too low to settle this full order. Record a partial VUP payment instead.", "warning");
      return;
    }
    o.repaidAmount = Number(o.repaidAmount || 0) + due;
    o.repaid = true;
    o.creditStatus = "repaid";
    o.paymentStatus = "paid";
    o.repaidDate = new Date().toLocaleDateString('en-GB');
    member.governmentAmountOwed = Math.max(0, Number(member.governmentAmountOwed || 0) - due);
    if (this.state.currentUser?.email === member.email) this.state.currentUser.governmentAmountOwed = member.governmentAmountOwed;
    const creditRecord = (this.state.ledger || []).find(entry => entry.type === "credit_draw" && entry.link === `Order #${orderId}`);
    if (creditRecord) creditRecord.status = "repaid";

    this.state.pool.balance += due;
    this.state.pool.totalRepaidByVup += due;

    this.state.ledger.unshift({
      id: this.state.ledger.length + 1,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "repayment",
      from: "VUP Treasury Transfer",
      to: "Revolving Pool",
      amount: due,
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

    this.addNotification(`Food credit order #${orderId} was repaid from the simulated VUP transfer.`, { targetEmail: o.buyerEmail, type: "credit" });
    this.saveState();
    this.render();
    this.toast(`Order #${orderId} repaid to pool! ${due.toLocaleString()} RWF recovered from VUP transfer.`, "success");
  }

  recordVupPayment() {
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can record a VUP payment in this prototype.", "warning"); return; }
    const email = document.getElementById("vupPaymentEmail")?.value;
    const amount = Number(document.getElementById("vupPaymentAmount")?.value);
    const family = (this.state.users?.member || []).find(user => user.email === email);
    if (!family || !Number.isFinite(amount) || amount <= 0) { this.toast("Choose a family and enter an amount above zero.", "warning"); return; }
    if (amount > Number(family.governmentAmountOwed || 0)) { this.toast("The amount cannot be higher than the VUP amount recorded as owed.", "warning"); return; }
    const orders = (this.state.orders || []).filter(order => order.mode === "credit" && order.status === "Delivered" && order.paidBy === "pool" && order.creditStatus !== "written_off" && !order.repaid && (order.buyerEmail === email || (!order.buyerEmail && order.buyerName === family.name))).sort((a,b)=>(a.id||0)-(b.id||0));
    let left = amount, repaid = 0;
    orders.forEach(order => {
      if (left <= 0) return;
      const due = Math.max(0, Number(order.total) - Number(order.repaidAmount || 0));
      const part = Math.min(left, due);
      order.repaidAmount = Number(order.repaidAmount || 0) + part;
      left -= part; repaid += part;
      if (order.repaidAmount >= Number(order.total)) { order.repaid = true; order.creditStatus = "repaid"; order.paymentStatus = "paid"; order.repaidDate = new Date().toLocaleDateString("en-GB"); }
      else { order.creditStatus = "partly_repaid"; order.paymentStatus = "partly_paid"; }
      const creditRecord = (this.state.ledger || []).find(entry => entry.type === "credit_draw" && entry.link === `Order #${order.id}`);
      if (creditRecord) creditRecord.status = order.repaid ? "repaid" : "partly repaid";
    });
    const wallet = Math.max(0, Number(family.vupWalletBalance || 0)) + left;
    family.governmentAmountOwed = Math.max(0, Number(family.governmentAmountOwed || 0) - amount);
    family.vupWalletBalance = wallet;
    if (this.state.currentUser?.email === email) this.state.currentUser.vupWalletBalance = wallet;
    if (this.state.currentUser?.email === email) this.state.currentUser.governmentAmountOwed = family.governmentAmountOwed;
    this.state.pool.balance += repaid;
    this.state.pool.totalRepaidByVup += repaid;
    this.state.ledger.unshift({ id: this.state.ledger.length + 1, date: new Date().toISOString(), type: "VUP payment received", from: "Simulated VUP payment", to: family.name, amount, repaymentAmount: repaid, walletAmount: left, link: "VUP payment", status: "completed", paymentMethod: family.paymentMethod || "VUP payout" });
    this.addNotification(`A VUP payment of ${amount.toLocaleString()} RWF was recorded. ${repaid.toLocaleString()} RWF paid food credit; ${left.toLocaleString()} RWF added to your food wallet.`, { targetEmail: email, type: "payment" });
    this.saveState(); this.render();
    this.toast(`${repaid.toLocaleString()} RWF paid toward food credit. ${left.toLocaleString()} RWF is now in ${family.name}'s VUP wallet.`, "success");
  }

  writeOffCredit(orderId) {
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can write off a credit balance.", "warning"); return; }
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
        <img class="ib-report-logo" src="assets/isoko-bridge-logo.svg" alt="Isoko Bridge">
        <h2 style="font-size:22px; margin-bottom:4px;">NISR & Activity Report</h2>
        <div style="font-size:12.5px; color:var(--text-muted);">
          Activity period: <b>${this.escapeHtml(report.period.label)}</b> · Prepared by: <b>${this.escapeHtml(currentUser.name || 'Dashboard user')}</b> · Generated: <b>${new Date().toLocaleString('en-GB')}</b>
        </div>
      </div>

      <div style="margin-bottom:14px; font-size:13.5px; line-height:1.5;">
        <b>In this period:</b> ${report.transactions.length} simulated orders worth ${report.totalValue.toLocaleString()} RWF, including ${report.creditOrders.length} food-credit orders (${totalCredit.toLocaleString()} RWF). ${repaidCredit.toLocaleString()} RWF of the recorded credit orders is marked repaid.
      </div>

      <h3 style="font-size:15px;margin:12px 0 6px;">Published NISR payment timing</h3>
      ${this.renderPublishedTimelinessTable()}

      <h3 style="font-size:15px;margin:12px 0 6px;">Exploratory project summary (provisional)</h3>
      <div class="table-wrap" style="margin-bottom:14px;">
        <table>
          <thead><tr><th>Project-prepared estimate</th><th>Summary</th><th>Sample</th><th>How to read it</th></tr></thead>
          <tbody>
            <tr><td>National average delay</td><td>${NISR_DATA.overall.averageDelayDays.toFixed(1)} days</td><td>${NISR_DATA.overall.totalBeneficiaries.toLocaleString()} prepared records</td><td>Unweighted project summary; not an official NISR published estimate</td></tr>
            <tr><td>Waited more than 7 days</td><td>${NISR_DATA.overall.pctOver7DaysLate}%</td><td>Prepared summary</td><td>Exploratory; definition and weights need review</td></tr>
            <tr><td>Longest listed hotspot</td><td>14.6 days · ${NISR_DATA.hotspots['Expanded Public Works'].Southern.latePct}% over 7 days</td><td>n = ${NISR_DATA.hotspots['Expanded Public Works'].Southern.records}</td><td>Prepared project summary; not an official NISR published estimate</td></tr>
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
        <b>Sources and limits:</b> Official payment timing: NISR EICV7 VUP Thematic Report (2025), tables 4.2, 4.5, 4.8, and 4.11 (<a href="${this.escapeHtml((window.NISR_PUBLISHED_DATA || {}).sourceUrl || 'https://microdata.statistics.gov.rw/index.php/catalog/121')}">open NISR report</a>). Project-prepared average-delay summaries are separate early, unweighted estimates and remain provisional. Sample-size labels are warnings, not guarantees of precision. Survey time is fixed; the selected activity period filters only simulated prototype orders. Survey patterns do not show individual causes or determine eligibility.
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
      createdByEmail: this.state.currentUser.email || "",
      role: this.state.role,
      linkedTransaction: txRef,
      note,
      status: "open",
      handler: "Planner One",
      outcome: null,
      createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.state.cases.unshift(newCase);
    this.addNotification(`Your problem report #${newCase.id} was sent to the planner.`, { targetEmail: newCase.createdByEmail, type: "case" });
    this.addNotification(`Problem report #${newCase.id} needs review.`, { targetRoles: ["planner", "admin"], type: "case" });
    this.closeCaseModal();
    this.saveState();
    this.render();
    this.toast(`Problem report submitted! Case #${newCase.id} created for planner review.`, "success");
  }

  resolveCase(caseId, outcome) {
    if (!['planner', 'admin'].includes(this.state.roleCode)) { this.toast("Only a planner or admin can resolve a case.", "warning"); return; }
    const c = this.state.cases.find(x => x.id === caseId);
    if (!c) return;
    c.status = outcome === "rejected" ? "rejected" : "resolved";
    c.outcome = outcome;
    c.resolutionNote = c.resolutionNote || `Case marked ${c.status}.`;
    c.resolvedBy = this.state.currentUser.name || this.state.role;
    c.resolvedDate = new Date().toLocaleDateString('en-GB');
    this.addNotification(`Problem report #${caseId} was ${c.status}.`, { targetEmail: c.createdByEmail, type: "case" });

    this.saveState();
    this.render();
    this.toast(`Case #${caseId} marked ${c.status} (${outcome}).`, "success");
  }

  openCaseResolution(caseId) {
    if (!['planner', 'admin'].includes(this.state.roleCode)) { this.toast("Only a planner or admin can review a case.", "warning"); return; }
    const caseItem = (this.state.cases || []).find(item => Number(item.id) === Number(caseId));
    if (!caseItem) return;
    document.getElementById("caseResolveId").value = caseItem.id;
    document.getElementById("caseResolveSummary").textContent = `Case #${caseItem.id} · ${caseItem.type} · ${caseItem.linkedTransaction || "No order linked"}`;
    document.getElementById("caseResolveNote").value = caseItem.resolutionNote || "";
    document.getElementById("caseResolveAction").value = caseItem.status === "needs_admin" ? "resolved" : "resolved";
    document.getElementById("caseResolveModal")?.classList.add("open");
  }

  saveCaseResolution(event) {
    event.preventDefault();
    if (!['planner', 'admin'].includes(this.state.roleCode)) { this.toast("Only a planner or admin can review a case.", "warning"); return; }
    const id = Number(document.getElementById("caseResolveId")?.value);
    const outcome = document.getElementById("caseResolveAction")?.value;
    const note = document.getElementById("caseResolveNote")?.value.trim();
    const caseItem = (this.state.cases || []).find(item => Number(item.id) === id);
    if (!caseItem || !note) { this.toast("Add a short note about what happened.", "warning"); return; }
    caseItem.outcome = outcome;
    caseItem.resolutionNote = note;
    caseItem.resolvedBy = this.state.currentUser.name || this.state.role;
    caseItem.resolvedDate = new Date().toLocaleDateString("en-GB");
    caseItem.handler = caseItem.resolvedBy;
    caseItem.status = outcome === "needs_admin" && this.state.roleCode === "planner" ? "needs_admin" : outcome === "rejected" ? "rejected" : "resolved";
    this.state.auditLog.unshift({ who: caseItem.resolvedBy, action: caseItem.status === "needs_admin" ? "Sent case to admin" : "Resolved problem case", target: `Case #${id} · ${caseItem.linkedTransaction || "General"}`, date: new Date().toISOString(), reason: note });
    this.addNotification(`Problem case #${id} was updated: ${caseItem.status.replace(/_/g, " ")}. ${note}`, { targetEmail: caseItem.createdByEmail, type: "case" });
    if (caseItem.status === "needs_admin") this.addNotification(`Case #${id} needs admin review.`, { targetRoles: ["admin"], type: "case" });
    document.getElementById("caseResolveModal")?.classList.remove("open");
    this.saveState();
    this.render();
    this.toast(caseItem.status === "needs_admin" ? `Case #${id} sent to an admin.` : `Case #${id} updated.`, "success");
  }

  // Plain-language notes use reviewed text already included with the app.
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
        <div style="font-weight:700; color:var(--acc); margin-bottom:4px; font-size:12.5px;">✨ Simple explanation (${lang.toUpperCase()}):</div>
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
      if (this.state.activeSubView === "settings") {
        mainEl.innerHTML = this.renderSettingsView();
      } else if (this.state.activeSubView === "cart") {
        mainEl.innerHTML = this.renderCartView();
      } else if (this.state.activeSubView === "activity") {
        mainEl.innerHTML = this.renderActivityView();
      } else if (this.state.activeSubView === "notifications") {
        mainEl.innerHTML = this.renderNotificationsView();
      } else if (this.state.activeSubView === "analysis") {
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
    const nav = document.getElementById("topNavPill");
    if (!nav) return;
    const lang = this.state.lang || "en";
    const activeSub = this.state.activeSubView || "dashboard";
    const role = this.state.role || "Family";
    const icon = {
      dashboard: "bi-grid-1x2",
      payroll: "bi-cash-stack",
      agaseke: "bi-heart-pulse",
      creditdesk: "bi-credit-card",
      credit: "bi-credit-card",
      nisr_facts: "bi-file-earmark-text",
      analysis: "bi-graph-up-arrow",
      activity: "bi-clock-history",
      cart: "bi-basket2",
      cases: "bi-shield-exclamation",
      reports: "bi-download",
      users: "bi-people",
      ledger: "bi-journal-text",
      orders: "bi-receipt",
      produce: "bi-basket",
      add_produce: "bi-basket2",
      listings: "bi-card-list",
      pool: "bi-bank",
      architecture: "bi-diagram-3",
      settings: "bi-gear"
    };
    const navText = {
      en: { dashboard: "Overview", architecture: "Architecture & Flow", payroll: "VUP Payroll", agaseke: "Agaseke Relief", creditdesk: "Credit desk", nisr_facts: "NISR facts", analysis: "NISR analysis", cases: "Disputes", reports: "Reports", users: "Users", ledger: "Ledger", credit: "Bridge credit & Ejo Heza", orders: "Orders", add_produce: "Add produce", listings: "My listings", pool: "Pool impact", settings: "Settings", market: "Fresh market", roles: "Roles and sign in", schedule: "VUP schedule" },
      rw: { dashboard: "Incamake", architecture: "Imiterere n'Uburyo Bikora", payroll: "Imihembo ya VUP", agaseke: "Agaseke k'Ubumwe", creditdesk: "Inguzanyo", nisr_facts: "Amakuru ya NISR", analysis: "Isesengura rya NISR", cases: "Ibibazo", reports: "Raporo", users: "Abakoresha", ledger: "Ibyakozwe", credit: "Inguzanyo & Ejo Heza", orders: "Ibyatumijwe", add_produce: "Ongeraho umusaruro", listings: "Ibyo ncuruza", pool: "Ikigega rusange", settings: "Igenamiterere", market: "Isoko ry'ibiribwa", roles: "Uruhare no kwinjira", schedule: "Gahunda ya VUP" },
      fr: { dashboard: "Vue d'ensemble", architecture: "Architecture & Flux", payroll: "Paie VUP", agaseke: "Fonds Agaseke", creditdesk: "Crédit", nisr_facts: "Données NISR", analysis: "Analyse NISR", cases: "Litiges", reports: "Rapports", users: "Utilisateurs", ledger: "Registre", credit: "Crédit & Ejo Heza", orders: "Commandes", add_produce: "Ajouter des produits", listings: "Mes annonces", pool: "Fonds commun", settings: "Paramètres", market: "Marché", roles: "Rôles et connexion", schedule: "Calendrier VUP" }
    };
    const copy = navText[lang] || navText.en;
    const item = (id, fallback) => ({ id, label: copy[id] || fallback, icon: icon[id] || icon.dashboard });
    let items = [];
    if (this.state.user) {
      if (role === "Planner") items = [item("dashboard", "Overview"), item("architecture", "Architecture & Flow"), item("payroll", "VUP Payroll"), item("agaseke", "Agaseke Relief"), item("creditdesk", "Credit desk"), item("nisr_facts", "NISR facts"), item("analysis", "NISR analysis"), item("activity", "Activity"), item("cases", "Disputes"), item("reports", "Reports"), item("settings", "Settings")];
      else if (role === "Admin") items = [item("dashboard", "Overview"), item("architecture", "Architecture & Flow"), item("payroll", "VUP Payroll"), item("agaseke", "Agaseke Relief"), item("creditdesk", "Credit desk"), item("nisr_facts", "NISR facts"), item("analysis", "NISR analysis"), item("activity", "Activity"), item("users", "Users"), item("cases", "Disputes"), item("ledger", "Ledger"), item("settings", "Settings")];
      else if (role === "Family") items = [item("dashboard", "Food basket"), item("architecture", "Architecture & Flow"), item("cart", "My cart"), item("credit", "Bridge credit & Ejo Heza"), item("orders", "Orders"), item("activity", "Activity"), item("settings", "Settings")];
      else if (role === "Farmer") items = [item("dashboard", this.state.roleCode === "trader" ? "Market orders" : "Orders"), item("architecture", "Architecture & Flow"), item("add_produce", "Add produce"), item("listings", "My listings"), item("activity", "Activity"), item("settings", "Settings")];
      else items = [item("dashboard", "Shop & Agaseke"), item("architecture", "Architecture & Flow"), item("cart", "My cart"), item("pool", "Pool impact"), item("activity", "Activity"), item("settings", "Settings")];
      nav.innerHTML = '<span class="rail-hl" id="railHl" aria-hidden="true"></span>' + items.map(entry => { const label = entry.id === "cart" && this.cartCount() ? `${entry.label} (${this.cartCount()})` : entry.label; return `<button class="sidebar-link ${activeSub === entry.id ? "on" : ""}" onclick="window.app.setNavTab('${entry.id}')" title="${label}" data-tip="${label}" aria-label="${label}" ${activeSub === entry.id ? 'aria-current="page"' : ""}><i class="bi ${entry.icon}" aria-hidden="true"></i><span class="rail-label">${label}</span></button>`; }).join("");
    } else {
      const publicTab = this.state.publicTab || "market";
      items = [
        { id: "market", label: copy.market, icon: "bi-basket" },
        { id: "architecture", label: copy.architecture, icon: "bi-diagram-3" },
        { id: "roles", label: copy.roles, icon: "bi-person-vcard" },
        { id: "schedule", label: copy.schedule, icon: "bi-calendar3" }
      ];
      nav.innerHTML = '<span class="rail-hl" id="railHl" aria-hidden="true"></span>' + items.map(entry => `<button class="sidebar-link ${publicTab === entry.id ? "on" : ""}" onclick="window.app.setPublicTab('${entry.id}')" title="${entry.label}" data-tip="${entry.label}" aria-label="${entry.label}" ${publicTab === entry.id ? 'aria-current="page"' : ""}><i class="bi ${entry.icon}" aria-hidden="true"></i><span class="rail-label">${entry.label}</span></button>`).join("");
    }
    const accountSlot = document.getElementById("railAccountSlot");
    const footerSlot = document.getElementById("railFooterSlot");
    if (accountSlot) {
      if (this.state.user) {
        const user = this.state.currentUser || {};
        const initials = (user.name || this.state.user).slice(0, 2).toUpperCase();
        accountSlot.innerHTML = `<button class="rail-account" type="button" onclick="window.app.setNavTab('settings')" title="Profile and settings" data-tip="Profile and settings"><span class="rail-avatar">${user.profilePhoto ? `<img src="${user.profilePhoto}" alt="">` : this.escapeHtml(initials)}</span><span class="rail-account-copy rail-label"><b>${this.escapeHtml(user.name || this.state.user.split("@")[0])}</b><small>${this.escapeHtml(this.getRoleTitleByCode(this.state.roleCode || "member"))}</small></span><i class="bi bi-gear rail-label" aria-hidden="true"></i></button>`;
      } else accountSlot.innerHTML = `<button class="rail-account" type="button" onclick="window.app.setPublicTab('roles')" title="Sign in or create an account" data-tip="Sign in or create an account"><span class="rail-avatar"><i class="bi bi-person" aria-hidden="true"></i></span><span class="rail-account-copy rail-label"><b>Welcome</b><small>Sign in or join</small></span></button>`;
    }
    if (footerSlot) footerSlot.innerHTML = this.state.user ? `<button class="rail-delete-account" type="button" onclick="window.app.setNavTab('settings')" title="Account and privacy settings" data-tip="Account and privacy settings"><i class="bi bi-person-x" aria-hidden="true"></i><span class="rail-label">Account settings</span></button><button class="rail-logout" type="button" onclick="window.app.logout()" title="Log out" data-tip="Log out"><i class="bi bi-box-arrow-right" aria-hidden="true"></i><span class="rail-label">Log out</span></button>` : "";
    this.updateThemeControl();
    this.syncSidebar();
    this.initRailHighlight();
    if (!slot) return;
    if (this.state.user) {
      const user = this.state.currentUser || {};
      const initials = (user.name || this.state.user).slice(0, 2).toUpperCase();
      slot.innerHTML = `<button class="icon-action notification-button" onclick="window.app.openNotifications()" title="Notifications" aria-label="Notifications"><i class="bi bi-bell" aria-hidden="true"></i>${this.getUnreadNotifications().length ? `<span class="notification-count">${Math.min(99,this.getUnreadNotifications().length)}</span>` : ""}</button><div class="av ${user.profilePhoto ? "has-photo" : ""}" aria-hidden="true">${user.profilePhoto ? `<img src="${user.profilePhoto}" alt="">` : this.escapeHtml(initials)}</div><span class="user-copy"><b>${this.escapeHtml(user.name || this.state.user.split("@")[0])}</b><small>${this.escapeHtml(this.getRoleTitleByCode(this.state.roleCode || "member"))}</small></span><button class="icon-action" onclick="window.app.downloadUserStatement()" title="Download my activity" aria-label="Download my activity"><i class="bi bi-download" aria-hidden="true"></i></button>`;
    } else {
      slot.innerHTML = `<button class="btn btn-sm btn-primary" onclick="window.app.setPublicTab('roles')"><i class="bi bi-box-arrow-in-right" aria-hidden="true"></i> ${lang === "rw" ? "Injira" : lang === "fr" ? "Se connecter" : "Log in"}</button>`;
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
    if (tab === "architecture") {
      return this.renderPublicArchitectureView();
    }
    return this.renderPublicMarketView();
  }

  renderPublicMarketView() {
    const curDist = (this.state.nearby && this.state.nearby.userDistrict) || "Gasabo";

    return `
      <!-- Shared Isoko Bridge logo -->
      <div class="ib-market-brand">
        <img src="assets/isoko-bridge-logo.svg" alt="Isoko Bridge">
      </div>

      <!-- @uxui_faran Mobile User Location & Header Strip -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding:4px 2px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <img class="ib-market-icon" src="assets/isoko-bridge-icon.svg" alt="">
          <div>
            <b style="font-size:13.5px; display:block; line-height:1.2;">Isoko Fresh Market</b>
            <small style="color:var(--mute); font-size:11px; display:flex; align-items:center; gap:3px;">
              <svg viewBox="0 0 24 24" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${curDist} District · Rwanda
            </small>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px;">
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
        ${["All", "Beans", "Tubers", "Vegetables", "Grains", "Fruits", "Dairy"].map(cat => `
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
        <div class="vm-seller-list">
          ${[
            { name: "Mukamana Co-op", dist: "Kirehe", tag: "Beans & Corn" },
            { name: "Kinigi Potato Union", dist: "Musanze", tag: "Irish Potato" },
            { name: "Nyamagabe Farmers", dist: "Southern", tag: "Veggies" },
            { name: "Gicumbi Cooperative", dist: "Northern", tag: "Dry Pulses" },
            { name: "Rusizi Rice Union", dist: "Western", tag: "Local Rice" }
          ].map(coop => `
            <div class="vm-seller-card">
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
      { code: "member", key: "Family", icon: '<i class="bi bi-people" aria-hidden="true"></i>', title: "VUP Member", line: "I receive VUP support and want to shop for food." },
      { code: "planner", key: "Planner", icon: '<i class="bi bi-bar-chart-line" aria-hidden="true"></i>', title: "Sector Planner", line: "I review payment trends, credit activity, and open cases." },
      { code: "seller", key: "Farmer", icon: '<i class="bi bi-shop" aria-hidden="true"></i>', title: "Cooperative Farmer (Seller)", line: "I list food for families to buy." },
      { code: "trader", key: "Trader", icon: '<i class="bi bi-shop-window" aria-hidden="true"></i>', title: "Market trader", line: "I sell food bought from local markets and suppliers." },
      { code: "shopper", key: "Shopper", icon: '<i class="bi bi-cart3" aria-hidden="true"></i>', title: "Ethical Shopper", line: "I buy food for my household." },
      { code: "admin", key: "Admin", icon: '<i class="bi bi-shield-lock" aria-hidden="true"></i>', title: "Administrator", line: "I review users, payments, reports, and system activity." }
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

  // =========================================================================
  // SYSTEM ARCHITECTURE & ECOSYSTEM FLOW VISUALIZER
  // =========================================================================
  getArchNodes() {
    const listingsCount = (this.state.listings || []).length;
    const agasekeTotal = (this.state.agasekePool || 145210).toLocaleString();
    const bridgeFloat = (this.state.pool?.balance || 25000).toLocaleString();
    const membersCount = (this.state.users?.member || []).length;

    return {
      farmer: {
        id: "farmer",
        tier: 1,
        title: "Smallholder Farmers & Co-ops",
        titleRw: "Abahinzi Bato & Koperative",
        titleFr: "Petits Exploitants & Coopératives",
        icon: "bi-tree-fill",
        badge: `${listingsCount} Produce Listings`,
        badgeColor: "g",
        flows: ["market", "bridge"],
        mandate: "NST2 Pillar 1: Agriculture Transformation & Market Access",
        desc: "Certified smallholder agricultural cooperatives listing fresh harvests directly across all 30 districts of Rwanda.",
        inbound: "Harvest yields, seasonal inventory, certified cooperative verification.",
        processing: "Transparent 2% statutory district market levy calculation; Smallholder Cooperative Tax Exemption toggle under Ministerial Order.",
        outbound: "Farm-fresh staple crops to buyers & VUP workers; instant direct payments to farmer MoMo/SACCO accounts.",
        liveMetric: `${listingsCount} Active Crop Listings in 30 Districts`,
        actionLabel: "Explore Market Listings",
        actionFn: "window.app.setPublicTab('market')"
      },
      shopper: {
        id: "shopper",
        tier: 1,
        title: "Civil Servants & Public Shoppers",
        titleRw: "Abakozi ba Leta n'Abaguzi",
        titleFr: "Fonctionnaires & Acheteurs Publics",
        icon: "bi-cart-check-fill",
        badge: "Gahunda y'Abakozi ba Leta",
        badgeColor: "g",
        flows: ["market", "relief"],
        mandate: "NST2 Inclusive Trade & Middleman Elimination",
        desc: "Civil servants (abakozi ba Leta) and public conscious shoppers buying directly from farmers at fair prices.",
        inbound: "Digital payments via MTN MoMo, Airtel Money, or SACCO; delivery requests.",
        processing: "Direct order matching; automated default 10 RWF Agaseke micro-solidarity contribution.",
        outbound: "Fresh harvest delivery; 10 RWF micro-solidarity routed to Agaseke Social Relief Pool.",
        liveMetric: "10 RWF default solidarity per order",
        actionLabel: "Shop Fresh Produce",
        actionFn: "window.app.setPublicTab('market')"
      },
      member: {
        id: "member",
        tier: 1,
        title: "VUP Public Works Beneficiaries",
        titleRw: "Abagenerwabikorwa ba VUP",
        titleFr: "Bénéficiaires des Travaux Publics VUP",
        icon: "bi-shield-check",
        badge: "Ubudehe 1 & 2 Social Protection",
        badgeColor: "g",
        flows: ["bridge", "payroll"],
        mandate: "VUP Vision 2020 Umurenge Programme (MINALOC / LODA)",
        desc: "Vulnerable households performing public infrastructure works (1,500 RWF/day wage) facing salary delay periods.",
        inbound: "Verified public works days from sector muster rolls, urgent staple food orders.",
        processing: "Collateral-free zero-interest food bridge credit up to earned wages (9.2-day average wait).",
        outbound: "Zero-interest food advances; automatic credit recovery upon payroll settlement; 5% Ejo Heza savings.",
        liveMetric: `${membersCount} Registered VUP Households in Sector`,
        actionLabel: "View Member Portal",
        actionFn: "window.app.pickRole('member')"
      },
      matcher: {
        id: "matcher",
        tier: 2,
        title: "Decentralized Produce & Trade Matcher",
        titleRw: "Sisitemu yo Guhuza Isoko",
        titleFr: "Moteur de Jumelage Agricole",
        icon: "bi-diagram-2-fill",
        badge: "Geo-Proximity & Multi-Channel",
        badgeColor: "b",
        flows: ["market", "bridge"],
        mandate: "NISR Track 3: Open Innovation & Market Transparency",
        desc: "Core routing engine matching local agricultural supply with consumer and institutional demand across Rwanda.",
        inbound: "Real-time stock feeds, district coordinates, buyer delivery locations, consumer orders.",
        processing: "Haversine distance ranking (all 30 districts), price comparison against NISR benchmarks, tax calculation.",
        outbound: "Automated digital dispatch to express moto couriers, seller notifications, order receipts.",
        liveMetric: "Real-Time Haversine Distance across 30 Districts",
        actionLabel: "View Market Catalog",
        actionFn: "window.app.setPublicTab('market')"
      },
      bridge: {
        id: "bridge",
        tier: 2,
        title: "Revolving VUP Food Bridge Float",
        titleRw: "Ikigega cy'Inguzanyo y'Ibiribwa",
        titleFr: "Fonds Revolvant de Crédit Alimentaire",
        icon: "bi-arrow-repeat",
        badge: "0% Interest Liquidity Facility",
        badgeColor: "b",
        flows: ["bridge", "payroll"],
        mandate: "Financial Inclusion (Track 2) & Social Safety Net Resilience",
        desc: "Autonomous revolving credit facility guaranteeing immediate farmer payment while beneficiaries await government salaries.",
        inbound: "Automated repayments from SACCO payroll, donor revolving liquidity injections, Agaseke surplus transfers.",
        processing: "Collateral-free credit ceiling = verified earned wage; zero interest, zero fees, zero predatory debt trap.",
        outbound: "Instant guaranteed settlements to food sellers; 100% repayment back into the revolving float.",
        liveMetric: `${bridgeFloat} RWF Active Revolving Float`,
        actionLabel: "Inspect Credit Desk",
        actionFn: "window.app.setNavTab('creditdesk')"
      },
      agaseke: {
        id: "agaseke",
        tier: 2,
        title: "Agaseke k'Ubumwe Solidarity Pool",
        titleRw: "Agaseke k'Ubumwe Social Relief",
        titleFr: "Cagnotte de Solidarité Agaseke",
        icon: "bi-heart-pulse-fill",
        badge: "Community Micro-Relief Pool",
        badgeColor: "r",
        flows: ["market", "relief"],
        mandate: "NST2 Inclusive Growth & Traditional Rwandan Social Cohesion",
        desc: "Community micro-solidarity fund collecting 10 RWF per order to support vulnerable families and reinforce liquidity.",
        inbound: "10 RWF micro-levies from shoppers, voluntary citizen round-ups, community solidarity donations.",
        processing: "Transparent ledger tracking; Sector Planner discretionary emergency relief allocation.",
        outbound: "5,000 / 10,000 RWF food vouchers to Ubudehe 1 families; liquidity injections into Revolving Bridge Float.",
        liveMetric: `${agasekeTotal} RWF Accumulated Relief Pool`,
        actionLabel: "Manage Agaseke Relief",
        actionFn: "window.app.setNavTab('agaseke')"
      },
      planner: {
        id: "planner",
        tier: 3,
        title: "Sector Social Planners & Local Gov",
        titleRw: "Abashinzwe Imibereho Myiza ku Murenge",
        titleFr: "Planificateurs Sociaux du Secteur",
        icon: "bi-building-check",
        badge: "Umurenge Social Affairs & LODA",
        badgeColor: "g",
        flows: ["relief", "payroll"],
        mandate: "Local Government Decentralized Social Protection & Monitoring",
        desc: "Sector officials monitoring household wait times, arbitrating disputes, and disbursing emergency social relief.",
        inbound: "NISR EICV7 survey delay indicators, beneficiary dispute reports, community hardship cases.",
        processing: "Vulnerability targeting; approval of Agaseke emergency vouchers; payroll reconciliation.",
        outbound: "Direct emergency relief vouchers to Ubudehe 1 households; authorization of batch SACCO payroll releases.",
        liveMetric: "Sector Administrative Oversight & Social Protection",
        actionLabel: "Open Planner Workspace",
        actionFn: "window.app.pickRole('planner')"
      },
      sacco: {
        id: "sacco",
        tier: 3,
        title: "Umurenge SACCOs & Mobile Money Rails",
        titleRw: "Umurenge SACCO & Mobile Money",
        titleFr: "SACCOs Sectorielles & Mobile Money",
        icon: "bi-cash-coin",
        badge: "Automated Batch Settlement Rails",
        badgeColor: "b",
        flows: ["market", "bridge", "payroll"],
        mandate: "Universal Financial Inclusion & Rwanda Cashless Vision",
        desc: "Digital banking and telecommunication rails (MTN MoMo, Airtel Money, SACCO) executing automated wage disbursements.",
        inbound: "MINECOFIN / LODA public works payroll allocations, shopper mobile wallet settlements.",
        processing: "Automated food bridge credit debt deduction; automated 5% Ejo Heza long-term savings deduction.",
        outbound: "Net cash wage delivery to worker accounts; immediate merchant settlements; transfers to RSSB.",
        liveMetric: "Zero-leakage automated batch payroll waves",
        actionLabel: "Review Payroll Register",
        actionFn: "window.app.setNavTab('payroll')"
      },
      ejoheza: {
        id: "ejoheza",
        tier: 3,
        title: "RSSB Ejo Heza Long-Term Savings",
        titleRw: "Ubwizigame bwa Ejo Heza (RSSB)",
        titleFr: "Épargne Long Terme Ejo Heza (RSSB)",
        icon: "bi-piggy-bank-fill",
        badge: "Law N° 29/2017 & 100% Gov Match",
        badgeColor: "g",
        flows: ["payroll"],
        mandate: "Universal Pension Coverage (Law N° 29/2017 & RSSB)",
        desc: "Rwanda's flagship national micro-pension scheme securing financial resilience for informal and vulnerable workers.",
        inbound: "Automated 5% statutory deductions from VUP public works payroll disbursements.",
        processing: "Statutory 100% Government matching grant for Ubudehe Categories 1 and 2; compound interest growth.",
        outbound: "Old-age retirement pensions, life insurance cover, accidental disability benefits, education credit.",
        liveMetric: "5% wage deduction + 100% Government co-contribution match",
        actionLabel: "View Ejo Heza Passbook",
        actionFn: "window.app.setNavTab('credit')"
      },
      nisr: {
        id: "nisr",
        tier: 3,
        title: "NISR Big Data Intelligence Engine",
        titleRw: "Ikigo cy'Ibarurishamibare (NISR)",
        titleFr: "Moteur Big Data NISR",
        icon: "bi-bar-chart-fill",
        badge: "EICV7 3,399 Household Baseline",
        badgeColor: "b",
        flows: ["relief", "bridge"],
        mandate: "National Institute of Statistics of Rwanda (NISR 2026 Hackathon)",
        desc: "Empirical household microdata analytics driving evidence-based targeting, delay tracking, and priority allocation.",
        inbound: "EICV7 VUP survey microdata modules (Direct Support, Classic PW, Expanded PW, NSDS).",
        processing: "District Priority Index = 45% normalized delay + 40% poverty rate + 15% food-price index.",
        outbound: "Interactive 30-district geospatial map, wait-time benchmarks, policy decision-support summaries.",
        liveMetric: "3,399 Microdata Records · 9.2-day national wait baseline",
        actionLabel: "Explore NISR Analytics",
        actionFn: "window.app.setNavTab('analysis')"
      }
    };
  }

  getArchSimSteps() {
    return [
      {
        step: 1,
        title: "1. 🚜 Smallholder Farmer Lists Harvest in Kirehe",
        titleRw: "1. 🚜 Umuhinzi Ashyizeho Umusaruro i Kirehe",
        titleFr: "1. 🚜 L'agriculteur publie sa récolte à Kirehe",
        activeNodes: ["farmer", "matcher"],
        actor: "Cooperative KODUKIK (Kirehe District)",
        action: "Lists 50 kg Dry Beans at 700 RWF/kg.",
        details: "The system dynamically computes the 2% statutory district market levy (14 RWF/kg). The cooperative can toggle the Smallholder Tax-Exempt Status under Ministerial Order to keep producer revenue 100% tax-free.",
        metric: "50 kg @ 700 RWF/kg · 2% District Tax: 14 RWF/kg"
      },
      {
        step: 2,
        title: "2. 🛒 Civil Servant Buys Direct via MoMo (+10 RWF Agaseke)",
        titleRw: "2. 🛒 Umukozi wa Leta Aguze Akoresheje MoMo (+10 RWF Agaseke)",
        titleFr: "2. 🛒 Le fonctionnaire achète via MoMo (+10 RWF Agaseke)",
        activeNodes: ["shopper", "matcher", "agaseke", "sacco"],
        actor: "Grace Mutoni (Civil Servant in Kigali)",
        action: "Purchases 10 kg Beans via MTN Mobile Money.",
        details: "Grace pays 7,000 RWF for the beans + 800 RWF express moto delivery. An automatic 10 RWF Agaseke micro-solidarity contribution is added to her order, instantly credited to the central Agaseke Social Relief Pool.",
        metric: "7,800 RWF Order Total + 10 RWF Agaseke Micro-Solidarity"
      },
      {
        step: 3,
        title: "3. 🛡️ VUP Beneficiary Receives 0% Food Advance on Wage Delay",
        titleRw: "3. 🛡️ Umugenerwabikorwa wa VUP Ahawe Inguzanyo y'Ibiribwa ku Buntu",
        titleFr: "3. 🛡️ Le bénéficiaire VUP reçoit une avance alimentaire à 0%",
        activeNodes: ["member", "bridge", "matcher", "farmer"],
        actor: "Amina Uwase (Gasabo District)",
        action: "Faces an 8-day VUP payroll delay; orders 5 kg beans at 0% interest.",
        details: "Amina has 14,400 RWF in verified unpaid public works wages. The system issues a 3,900 RWF food bridge credit advance. The Revolving Bridge Float settles the farmer immediately, so Amina's family eats while waiting.",
        metric: "3,900 RWF Food Advance Issued · 0% Interest · Farmer Paid Instantly"
      },
      {
        step: 4,
        title: "4. 💰 Automated SACCO Payroll Settlement & Ejo Heza Wealth Co-Match",
        titleRw: "4. 💰 Imihembo ya SACCO Ishyizweho & Ejo Heza Ibonye Inkunga ya Leta",
        titleFr: "4. 💰 Règlement de paie SACCO & Co-contribution Ejo Heza",
        activeNodes: ["planner", "sacco", "bridge", "ejoheza", "member"],
        actor: "Sector Social Protection Planner & Umurenge SACCO",
        action: "Batch payroll release of 14,400 RWF arrives in Amina's account.",
        details: "The system automatically recovers 3,900 RWF back to the Revolving Bridge Float (0 fees). 720 RWF (5%) is deposited into Amina's RSSB Ejo Heza account, triggering the Rwandan Government's 100% matching co-contribution (+720 RWF). Amina receives 9,780 RWF net cash!",
        metric: "14,400 RWF Gross -> 3,900 RWF Credit Repaid -> 720 RWF Ejo Heza (+720 RWF Gov Match) -> 9,780 RWF Net Cash"
      }
    ];
  }

  setArchFlow(flowId) {
    this.state.activeArchFlow = flowId;
    this.render();
  }

  selectArchNode(nodeKey) {
    this.state.selectedArchNode = nodeKey;
    this.render();
    const panel = document.getElementById("archInspector");
    if (panel && typeof panel.scrollIntoView === "function") {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  setArchSimStep(stepIdx) {
    this.state.archSimStep = Math.max(0, Math.min(3, stepIdx));
    this.render();
  }

  advanceArchSim() {
    const cur = this.state.archSimStep || 0;
    this.state.archSimStep = (cur + 1) % 4;
    this.render();
  }

  renderPublicArchitectureView() {
    const lang = this.state.lang || "en";
    const flow = this.state.activeArchFlow || "all";
    const selectedKey = this.state.selectedArchNode || "bridge";
    const simIdx = this.state.archSimStep || 0;

    const allNodes = this.getArchNodes();
    const selectedNode = allNodes[selectedKey] || allNodes.bridge;
    const simSteps = this.getArchSimSteps();
    const curStep = simSteps[simIdx] || simSteps[0];

    const flows = [
      { id: "all", label: lang === "rw" ? "Imikoranire Yose" : lang === "fr" ? "Tous les Flux" : "✨ All Ecosystem Connections" },
      { id: "market", label: lang === "rw" ? "1. Isoko & Agaseke" : lang === "fr" ? "1. Marché & Agaseke" : "🌾 1. Farm-to-Shopper & Agaseke" },
      { id: "bridge", label: lang === "rw" ? "2. Inguzanyo ya VUP" : lang === "fr" ? "2. Avance Alimentaire VUP" : "🛡️ 2. VUP Wage Delay & 0% Advance" },
      { id: "payroll", label: lang === "rw" ? "3. Imihembo & Ejo Heza" : lang === "fr" ? "3. Paie & Ejo Heza" : "💰 3. SACCO Payroll & Ejo Heza" },
      { id: "relief", label: lang === "rw" ? "4. Ubufasha bw'Agaseke" : lang === "fr" ? "4. Aide Sociale Agaseke" : "🏺 4. Agaseke Social Relief Aid" }
    ];

    const flowDescriptions = {
      all: "Complete end-to-end architecture unifying 30-district farm linkages, zero-interest social protection food advances, community micro-solidarity (Agaseke), and RSSB Ejo Heza wealth co-contributions.",
      market: "Direct farm-to-plate connection: Civil servants and public shoppers buy directly from smallholder co-ops via MoMo, disintermediating brokers while funding the 10 RWF Agaseke solidarity pool.",
      bridge: "Zero-interest food credit: When VUP wage disbursements are delayed (9.2 days avg), workers receive food advances backed by verified public works muster rolls, repaid automatically upon treasury arrival.",
      payroll: "Universal financial inclusion: Automated batch SACCO payroll releases wage funds, auto-recovers food advances to the revolving float, and deposits 5% into RSSB Ejo Heza with 100% Government matching.",
      relief: "Community social safety net: Accumulated 10 RWF micro-donations in the Agaseke pool are allocated by Sector Planners as 5,000 / 10,000 RWF emergency food aid vouchers for Ubudehe 1 households."
    };

    const isNodeInFlow = node => {
      if (flow === "all") return true;
      return (node.flows || []).includes(flow);
    };

    const isNodeInSim = nodeKey => {
      return (curStep.activeNodes || []).includes(nodeKey);
    };

    const renderCard = nodeKey => {
      const node = allNodes[nodeKey];
      if (!node) return "";
      const inFlow = isNodeInFlow(node);
      const isSelected = selectedKey === nodeKey;
      const inSim = isNodeInSim(nodeKey);

      let classes = "arch-node";
      if (isSelected) classes += " active";
      if (!inFlow && !inSim) classes += " dimmed";

      return `
        <div class="${classes}" onclick="window.app.selectArchNode('${nodeKey}')" role="button" tabindex="0" title="Click to inspect ${node.title}">
          <div class="arch-node-top">
            <div class="arch-node-icon"><i class="bi ${node.icon}"></i></div>
            <span class="tag ${node.badgeColor || 'g'} arch-node-badge">${node.badge}</span>
          </div>
          <div>
            <h4 class="arch-node-title">${lang === "rw" ? (node.titleRw || node.title) : lang === "fr" ? (node.titleFr || node.title) : node.title}</h4>
            <p class="arch-node-desc">${node.desc}</p>
          </div>
          <div style="font-size:11px; font-weight:700; color:var(--on); display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:6px; border-top:1px dashed var(--line);">
            <span>${node.liveMetric}</span>
            <i class="bi bi-chevron-right" style="font-size:12px;"></i>
          </div>
        </div>
      `;
    };

    return `
      <!-- Vertix Brand Header -->
      <div class="ib-market-brand">
        <img src="assets/isoko-bridge-logo.svg" alt="Isoko Bridge">
      </div>

      <div class="arch-container">
        <!-- Hero Header -->
        <div class="arch-hero">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px;">
            <div style="max-width:760px;">
              <span class="tag g" style="margin-bottom:8px;">NISR Big Data Hackathon 2026 · Track 2 & Track 3</span>
              <h1 style="font-size:clamp(22px, 3vw, 30px); font-weight:800; line-height:1.2; margin:6px 0 10px; color:var(--ink);">
                ${lang === "rw" ? "Imiterere y'Ikoranabuhanga & Uburyo Isoko Bridge Ikora" : lang === "fr" ? "Architecture du Système & Flux de l'Écosystème Isoko Bridge" : "System Architecture & Ecosystem Flow"}
              </h1>
              <p style="font-size:13.5px; color:var(--mute); line-height:1.6; margin:0;">
                ${flowDescriptions[flow] || flowDescriptions.all}
              </p>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-sm btn-primary" onclick="window.app.setPublicTab('roles')">
                <i class="bi bi-person-badge"></i> ${lang === "rw" ? "Injira muri Sisitemu" : lang === "fr" ? "Tester un Rôle" : "Explore Roles"} →
              </button>
            </div>
          </div>

          <!-- Flow Selector Pills -->
          <div class="arch-flow-pills">
            ${flows.map(f => `
              <button type="button" class="arch-pill ${flow === f.id ? "on" : ""}" onclick="window.app.setArchFlow('${f.id}')">
                ${f.label}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- 3-TIER ARCHITECTURAL ECOSYSTEM MAP -->
        <div class="arch-tier-block">
          <!-- TIER 1: Grassroots Community -->
          <div class="arch-tier-header">
            <span class="arch-tier-title"><i class="bi bi-people-fill"></i> Tier 1: Grassroots Community Actors</span>
            <small style="color:var(--mute); font-size:11px;">Direct Proximity · 30 Districts</small>
          </div>
          <div class="arch-cards-grid">
            ${renderCard("farmer")}
            ${renderCard("shopper")}
            ${renderCard("member")}
          </div>

          <!-- CONDUIT 1 -->
          <div class="arch-conduit-banner">
            <span class="arch-pulse-dot"></span>
            <span>⮛ Decentralized Market Linkage · MoMo Checkout · Zero-Interest Food Advances ⮛</span>
            <span class="arch-pulse-dot"></span>
          </div>

          <!-- TIER 2: Core Platform Engine -->
          <div class="arch-tier-header" style="margin-top:14px;">
            <span class="arch-tier-title"><i class="bi bi-cpu-fill"></i> Tier 2: Core Isoko Bridge Platform Engine</span>
            <small style="color:var(--mute); font-size:11px;">Autonomous Matching · Revolving Liquidity · Micro-Solidarity</small>
          </div>
          <div class="arch-cards-grid">
            ${renderCard("matcher")}
            ${renderCard("bridge")}
            ${renderCard("agaseke")}
          </div>

          <!-- CONDUIT 2 -->
          <div class="arch-conduit-banner">
            <span class="arch-pulse-dot" style="background:#0284c7;"></span>
            <span style="color:#0284c7;">⮛ Automated SACCO Payroll Wave · 100% Ejo Heza Wealth Match · NISR Analytics ⮛</span>
            <span class="arch-pulse-dot" style="background:#0284c7;"></span>
          </div>

          <!-- TIER 3: National Infrastructure & Policy Rails -->
          <div class="arch-tier-header" style="margin-top:14px;">
            <span class="arch-tier-title"><i class="bi bi-bank2"></i> Tier 3: National Infrastructure & Institutional Rails</span>
            <small style="color:var(--mute); font-size:11px;">MINECOFIN · LODA · RSSB · NISR</small>
          </div>
          <div class="arch-cards-grid">
            ${renderCard("planner")}
            ${renderCard("sacco")}
            ${renderCard("ejoheza")}
            ${renderCard("nisr")}
          </div>
        </div>

        <!-- INTERACTIVE COMPONENT INSPECTOR -->
        <div class="arch-inspector-panel" id="archInspector">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--line); padding-bottom:14px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="arch-node-icon" style="width:44px; height:44px; font-size:22px;">
                <i class="bi ${selectedNode.icon}"></i>
              </div>
              <div>
                <h3 style="margin:0; font-size:18px; font-weight:800; color:var(--ink);">
                  ${lang === "rw" ? (selectedNode.titleRw || selectedNode.title) : lang === "fr" ? (selectedNode.titleFr || selectedNode.title) : selectedNode.title}
                </h3>
                <small style="color:var(--mute); font-size:12px;">${selectedNode.mandate}</small>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="tag ${selectedNode.badgeColor || 'g'}">${selectedNode.liveMetric}</span>
              <button class="btn btn-sm btn-primary" onclick="${selectedNode.actionFn}">
                ${selectedNode.actionLabel} →
              </button>
            </div>
          </div>

          <div class="arch-flow-grid">
            <div class="arch-flow-card">
              <h5><i class="bi bi-box-arrow-in-right" style="color:var(--on);"></i> Inbound Pipeline</h5>
              <p>${selectedNode.inbound}</p>
            </div>
            <div class="arch-flow-card">
              <h5><i class="bi bi-gear" style="color:var(--acc);"></i> Algorithmic & Statutory Rules</h5>
              <p>${selectedNode.processing}</p>
            </div>
            <div class="arch-flow-card">
              <h5><i class="bi bi-box-arrow-right" style="color:#0284c7;"></i> Outbound Pipeline</h5>
              <p>${selectedNode.outbound}</p>
            </div>
          </div>
        </div>

        <!-- INTERACTIVE 4-STAGE LIFECYCLE SIMULATION SANDBOX -->
        <div class="arch-sim-wrap">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <span class="tag b" style="margin-bottom:4px;">Interactive Sandbox</span>
              <h3 style="margin:0; font-size:17px; font-weight:800;">End-to-End Transaction Lifecycle Simulator</h3>
              <p style="margin:2px 0 0; font-size:12px; color:var(--mute);">
                Experience how an agricultural listing in Kirehe triggers civil servant purchases, food credit advances, and automated Ejo Heza pension savings.
              </p>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-sm btn-outline" onclick="window.app.setArchSimStep(${(simIdx + 3) % 4})" ${simIdx === 0 ? "disabled" : ""}>
                ◀ Previous
              </button>
              <button class="btn btn-sm btn-primary" onclick="window.app.advanceArchSim()">
                ${simIdx === 3 ? "Restart Simulation ↺" : "Next Stage ▶"}
              </button>
            </div>
          </div>

          <!-- Stepper Node Indicator -->
          <div class="arch-sim-stepper">
            ${simSteps.map((s, idx) => `
              <div class="arch-step-node ${idx < simIdx ? "completed" : idx === simIdx ? "current" : ""}" 
                   onclick="window.app.setArchSimStep(${idx})" 
                   style="cursor:pointer;" 
                   title="Step ${s.step}: ${s.title}">
                ${idx < simIdx ? "✓" : s.step}
              </div>
            `).join("")}
          </div>

          <!-- Active Simulation Stage Card -->
          <div class="card" style="background:var(--soft); border:1px solid var(--line); border-radius:16px; padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
              <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--ink);">
                ${lang === "rw" ? (curStep.titleRw || curStep.title) : lang === "fr" ? (curStep.titleFr || curStep.title) : curStep.title}
              </h4>
              <span class="tag g" style="font-weight:700;">${curStep.actor}</span>
            </div>
            <p style="font-size:13px; color:var(--ink); font-weight:600; margin:0 0 6px;">
              ${curStep.action}
            </p>
            <p style="font-size:12.5px; color:var(--mute); line-height:1.55; margin:0 0 12px;">
              ${curStep.details}
            </p>
            <div style="background:var(--card); border:1px dashed var(--line); border-radius:10px; padding:10px 14px; font-size:12px; font-weight:700; color:var(--on); display:flex; align-items:center; gap:8px;">
              <i class="bi bi-check2-circle" style="font-size:16px;"></i>
              <span>${curStep.metric}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderLoginView() {
    const roleCode = this.state.pickRole || "member";
    const userList = (this.state.users && this.state.users[roleCode]) || [];
    const firstUser = userList[0] || {};
    const mode = this.state.authMode || "login";
    const isSignup = mode === "signup";
    const canSignUp = !["planner", "admin"].includes(roleCode);
    const roleTitle = this.getRoleTitleByCode(roleCode);
    const language = this.state.lang || "en";
    const copy = {
      en: { welcome: "Welcome back", create: "Create your account", loginSub: "Log in to continue to your Isoko Bridge account.", signupSub: "Create a demo account to continue. Your details stay in this browser.", account: "Your account", newAccount: "New account", fullName: "Full name", email: "Email address", password: "Password", logIn: "Log in", signUp: "Create account", back: "Back", sample: "Demo account", note: "Prototype sign-in is saved on this device only.", safe: "This prototype saves your demo account in this browser. Do not use a real password.", already: "Already have an account?", newHere: "New to Isoko Bridge?", haveAccount: "Already registered?", needAccount: "Need an account?", chooseDemo: "Choose a demo account or enter an account you created." },
      rw: { welcome: "Murakaza neza", create: "Fungura konti", loginSub: "Injira muri konti yawe ya Isoko Bridge.", signupSub: "Fungura konti y'igerageza. Amakuru yawe abikwa muri iyi browser.", account: "Konti yawe", newAccount: "Konti nshya", fullName: "Amazina yawe", email: "Imeli", password: "Ijambo ry'ibanga", logIn: "Injira", signUp: "Fungura konti", back: "Subira inyuma", sample: "Konti y'igerageza", note: "Kwinjira kw'igerageza kubikwa kuri iki gikoresho gusa.", safe: "Iyi porogaramu ibika konti y'igerageza muri iyi browser. Ntukoreshe ijambo ry'ibanga nyaryo.", already: "Usanzwe ufite konti?", newHere: "Ni ubwa mbere ukoresha Isoko Bridge?", haveAccount: "Usanzwe ufite konti?", needAccount: "Ukeneye konti?", chooseDemo: "Hitamo konti y'igerageza cyangwa wandike imeli wakoresheje." },
      fr: { welcome: "Bon retour", create: "Créer votre compte", loginSub: "Connectez-vous à votre compte Isoko Bridge.", signupSub: "Créez un compte de démonstration. Vos données restent dans ce navigateur.", account: "Votre compte", newAccount: "Nouveau compte", fullName: "Nom complet", email: "Adresse e-mail", password: "Mot de passe", logIn: "Se connecter", signUp: "Créer le compte", back: "Retour", sample: "Compte de démonstration", note: "La connexion de démonstration est enregistrée sur cet appareil.", safe: "Ce prototype enregistre le compte dans ce navigateur. N'utilisez pas votre vrai mot de passe.", already: "Vous avez déjà un compte ?", newHere: "Nouveau sur Isoko Bridge ?", haveAccount: "Déjà inscrit ?", needAccount: "Besoin d'un compte ?", chooseDemo: "Choisissez un compte de démonstration ou saisissez votre adresse e-mail." }
    }[language] || {};
    const text = key => copy[key] || ({ en: { welcome: "Welcome back", create: "Create your account", loginSub: "Log in to continue to your Isoko Bridge account." } }["en"][key] || key);
    return `
      <section class="auth-scene" aria-labelledby="authTitle">
        <!-- Glowing Circuit SVG Background (login-form-v5.html) -->
        <svg class="auth-bg-circuit" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M0 220H140L180 260H300"/>
          <path d="M0 560H220L260 520H340"/>
          <path d="M1200 180H1040L1000 220H900"/>
          <path d="M1200 600H980L940 560H860"/>
          <path d="M300 0V90L340 130"/>
          <path d="M900 800V700L860 660"/>
          <circle cx="300" cy="260" r="5"/>
          <circle cx="340" cy="520" r="5" style="animation-delay:.8s"/>
          <circle cx="900" cy="220" r="5" style="animation-delay:1.4s"/>
          <circle cx="860" cy="560" r="5" style="animation-delay:.4s"/>
          <circle cx="340" cy="130" r="4" style="animation-delay:1s"/>
          <circle cx="860" cy="660" r="4" style="animation-delay:1.8s"/>
        </svg>

        <div class="auth-card" id="authCard" data-mode="${mode}">
          <!-- Left Panel: Login Form (login-form-v5.html) -->
          <div class="auth-form-panel auth-panel-login" id="protoLoginPanel">
            <div class="auth-form-heading">
              <div><span class="auth-eyebrow">${text("account")}</span><h2>${text("logIn")}</h2></div>
              <button class="auth-back" type="button" onclick="window.app.cancelPickRole()"><i class="bi bi-arrow-left" aria-hidden="true"></i> ${text("back")}</button>
            </div>
            <form class="auth-form" onsubmit="window.app.handlePrototypeLogin(event)" autocomplete="on">
              <label for="demoUserSelect">${text("sample")}</label>
              <select id="demoUserSelect" class="auth-select" onchange="window.app.onRoleLoginUserSelected(this.value)">
                ${userList.map(user => `<option value="${this.escapeHtml(user.email)}" ${user.email === firstUser.email ? "selected" : ""}>${this.escapeHtml(user.name)} · ${this.escapeHtml(user.email)}</option>`).join("")}
              </select>
              <p class="auth-help" id="protoUserStateDesc">${this.escapeHtml(firstUser.stateDesc || firstUser.notes || text("chooseDemo"))}</p>
              <label for="protoEmail">${text("email")}</label>
              <div class="auth-field"><i class="bi bi-envelope" aria-hidden="true"></i><input id="protoEmail" name="email" type="email" autocomplete="username" value="${this.escapeHtml(firstUser.email || "")}" placeholder="name@example.com" required></div>
              <label for="protoPassword">${text("password")}</label>
              <div class="auth-field"><i class="bi bi-lock" aria-hidden="true"></i><input id="protoPassword" name="password" type="password" autocomplete="current-password" value="${this.escapeHtml(firstUser.password || "")}" placeholder="Your password" required></div>
              <p class="auth-help">${text("note")}</p>
              <button class="btn btn-primary auth-submit" type="submit"><i class="bi bi-box-arrow-in-right" aria-hidden="true"></i> ${text("logIn")}</button>
            </form>
            ${canSignUp ? `<p class="auth-mobile-switch">${text("needAccount")} <button type="button" onclick="window.app.setAuthMode('signup')">${text("signUp")}</button></p>` : ""}
          </div>

          <!-- Right Panel: Sign Up Form (login-form-v5.html) -->
          <div class="auth-form-panel auth-panel-signup" id="protoSignupPanel">
            <div class="auth-form-heading">
              <div><span class="auth-eyebrow">${text("newAccount")}</span><h2>${text("signUp")}</h2></div>
              <button class="auth-back" type="button" onclick="window.app.cancelPickRole()"><i class="bi bi-arrow-left" aria-hidden="true"></i> ${text("back")}</button>
            </div>
            <form class="auth-form" onsubmit="window.app.handlePrototypeSignup(event)" autocomplete="on">
              <label for="signupName">${text("fullName")}</label>
              <div class="auth-field"><i class="bi bi-person" aria-hidden="true"></i><input id="signupName" name="name" autocomplete="name" placeholder="${text("fullName")}" required></div>
              <label for="signupEmail">${text("email")}</label>
              <div class="auth-field"><i class="bi bi-envelope" aria-hidden="true"></i><input id="signupEmail" name="email" type="email" autocomplete="email" placeholder="name@example.com" required></div>
              <label for="signupPassword">${text("password")}</label>
              <div class="auth-field"><i class="bi bi-lock" aria-hidden="true"></i><input id="signupPassword" name="password" type="password" autocomplete="new-password" minlength="6" placeholder="At least 6 characters" required></div>
              <p class="auth-help">${text("safe")}</p>
              <button class="btn btn-primary auth-submit" type="submit"><i class="bi bi-person-plus" aria-hidden="true"></i> ${text("signUp")}</button>
            </form>
            <p class="auth-mobile-switch">${text("haveAccount")} <button type="button" onclick="window.app.setAuthMode('login')">${text("logIn")}</button></p>
          </div>

          <!-- Sliding Diagonal Overlay (login-form-v5.html) -->
          <aside class="auth-welcome auth-diagonal-overlay" aria-hidden="true">
            <div class="auth-overlay-msg m-signup">
              <span class="auth-mark"><img src="assets/isoko-bridge-icon.svg" alt=""></span>
              <span class="auth-eyebrow">Isoko Bridge · ${this.escapeHtml(roleTitle)}</span>
              <h1>${text("create")}</h1>
              <p>${text("signupSub")}</p>
              <div class="auth-switch">
                <span>${text("already")}</span>
                <button type="button" onclick="window.app.setAuthMode('login')">${text("logIn")}</button>
              </div>
            </div>
            <div class="auth-overlay-msg m-login">
              <span class="auth-mark"><img src="assets/isoko-bridge-icon.svg" alt=""></span>
              <span class="auth-eyebrow">Isoko Bridge · ${this.escapeHtml(roleTitle)}</span>
              <h1>${text("welcome")}</h1>
              <p>${text("loginSub")}</p>
              <div class="auth-switch">
                <span>${text("newHere")}</span>
                ${canSignUp ? `<button type="button" onclick="window.app.setAuthMode('signup')">${text("create")}</button>` : `<small>Organization demo account.</small>`}
              </div>
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  // =========================================================================
  // 9. LOGGED-IN DASHBOARD TOPBAR
  // =========================================================================
  renderDashboardTopbar() {
    return "";
  }

  renderRoleScreen() {
    if (this.state.activeSubView === "architecture") return this.renderPublicArchitectureView();
    if (this.state.role === "Family" || this.state.roleCode === "member") return this.renderFamilyView();
    if (this.state.role === "Planner" || this.state.roleCode === "planner") return this.renderPlannerView();
    if (this.state.role === "Farmer" || this.state.roleCode === "seller") return this.renderFarmerView();
    if (this.state.role === "Shopper" || this.state.roleCode === "shopper") return this.renderShopperView();
    if (this.state.role === "Admin" || this.state.roleCode === "admin") return this.renderAdminView();
    return this.renderFamilyView();
  }

  renderSettingsView() {
    const user = this.state.currentUser || {};
    const language = this.state.lang || "en";
    const theme = this.state.theme || "light";
    const roleName = this.getRoleTitleByCode(this.state.roleCode || "member");
    const languageOptions = [ ["en", "EN"], ["rw", "RW"], ["fr", "FR"] ];
    return `
      <div class="head settings-heading">
        <div><h1>Settings</h1><p class="sub">Choose how Isoko Bridge looks and reads for you.</p></div>
      </div>
      <div class="settings-layout">
        <section class="card settings-card">
          <div class="settings-title"><span class="settings-icon"><i class="bi bi-translate" aria-hidden="true"></i></span><div><h3>Language</h3><p>Choose the language used in the app.</p></div></div>
          <label class="settings-language-select" for="settingsLanguage">App language<select id="settingsLanguage" onchange="window.app.setLanguage(this.value)">${languageOptions.map(([value, label]) => `<option value="${value}" ${language === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
        </section>
        <section class="card settings-card">
          <div class="settings-title"><span class="settings-icon"><i class="bi bi-palette" aria-hidden="true"></i></span><div><h3>Appearance</h3><p>Pick a light or dark screen.</p></div></div>
          <div class="settings-choice-row"><button class="settings-choice ${theme === 'light' ? 'selected' : ''}" aria-pressed="${theme === 'light'}" onclick="window.app.setTheme('light')"><i class="bi bi-sun" aria-hidden="true"></i> Light</button><button class="settings-choice ${theme === 'dark' ? 'selected' : ''}" aria-pressed="${theme === 'dark'}" onclick="window.app.setTheme('dark')"><i class="bi bi-moon-stars" aria-hidden="true"></i> Dark</button></div>
        </section>
        <section class="card settings-card settings-account">
          <div class="settings-title"><span class="settings-icon"><i class="bi bi-person" aria-hidden="true"></i></span><div><h3>Your account</h3><p>Your profile details for this demo.</p></div></div>
          <div class="profile-photo-row"><div class="av profile-photo-preview ${user.profilePhoto ? "has-photo" : ""}">${user.profilePhoto ? `<img src="${user.profilePhoto}" alt="Profile photo">` : this.escapeHtml((user.name || "U").slice(0,2).toUpperCase())}</div><div><b>Profile photo</b><p>Choose a photo from your device. It stays on this device.</p><label class="btn btn-sm btn-outline" for="profilePhotoInput"><i class="bi bi-camera" aria-hidden="true"></i> ${user.profilePhoto ? "Change photo" : "Add photo"}</label><input id="profilePhotoInput" type="file" accept="image/*" hidden onchange="window.app.handleProfilePhotoUpload(this)">${user.profilePhoto ? ` <button class="btn btn-sm btn-ghost" onclick="window.app.removeProfilePhoto()">Remove</button>` : ""}</div></div>
          <dl class="settings-account-list"><div><dt>Name</dt><dd>${this.escapeHtml(user.name || this.state.user || "User")}</dd></div><div><dt>Role</dt><dd>${this.escapeHtml(roleName)}</dd></div><div><dt>Email</dt><dd>${this.escapeHtml(user.email || this.state.user || "Not added")}</dd></div><div><dt>District</dt><dd>${this.escapeHtml(user.district || "Not added")}</dd></div></dl>
        </section>
        <section class="card settings-card">
          <div class="settings-title"><span class="settings-icon"><i class="bi bi-file-earmark-arrow-down" aria-hidden="true"></i></span><div><h3>Your records</h3><p>Download a copy of your activity.</p></div></div>
          <button class="btn btn-primary settings-download" onclick="window.app.downloadUserStatement()"><i class="bi bi-download" aria-hidden="true"></i> Download my activity</button>
        </section>
        <section class="card settings-card settings-privacy">
          <div class="settings-title"><span class="settings-icon"><i class="bi bi-shield-check" aria-hidden="true"></i></span><div><h3>Privacy and records</h3><p>Simple rules for information in this prototype.</p></div></div>
          <ul><li>NISR household details are not shown. The app uses summary data only.</li><li>Your activity download includes only your account's records.</li><li>Transactions cannot be changed or deleted. Corrections need a new linked reversal record.</li><li>This demo saves data in this browser. Do not enter national ID numbers or private household data.</li></ul>
        </section>
        <section class="card settings-card settings-delete-account">
          <div class="settings-title"><span class="settings-icon"><i class="bi bi-person-x" aria-hidden="true"></i></span><div><h3>Delete this demo account</h3><p>Remove your sign-in and profile from this browser.</p></div></div>
          <p class="settings-policy-note">Old transaction and audit records stay unchanged for record keeping. This action cannot be undone.</p>
          <button class="btn settings-delete-button" onclick="window.app.deleteOwnAccount()"><i class="bi bi-trash3" aria-hidden="true"></i> Delete my account</button>
        </section>
      </div>
    `;
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
    if (sub === "cart") return this.renderCartView();
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
            <div class="wallet-balance-label"><i class="bi bi-wallet2" aria-hidden="true"></i> VUP food wallet</div>
            <b class="wallet-balance-amount">${Number(u.vupWalletBalance || 0).toLocaleString()} RWF</b>
            <div style="font-size:11.5px; color:var(--mute); margin-top:8px;">Government amount recorded as owed</div>
            <b style="font-size:18px; color:var(--primary); font-weight:800;">${Number(u.governmentAmountOwed || 0).toLocaleString()} RWF</b>
            <div style="font-size:11px; color:var(--mute);">${Number(u.daysWorked || 0)} work days recorded where applicable · demo record</div>
            <div style="font-size:11.5px; color:var(--mute); margin-top:8px;">Food credit ready to use</div>
            <b style="font-size:20px; color:var(--acc); font-weight:800;">${remaining.toLocaleString()} RWF</b>
            <div style="font-size:10.5px; color:var(--ok); font-weight:600;">0% interest · no planner approval</div>
          </div>
        </div>
      </div>

      <section class="market-promo-banner"><span class="market-promo-icon"><i class="bi bi-basket2" aria-hidden="true"></i></span><div><b>Fresh food, at a fair price</b><p>Shop local harvests and choose a safe demo payment method at checkout.</p></div><button class="btn btn-primary" onclick="window.app.setNavTab('cart')"><i class="bi bi-cart3" aria-hidden="true"></i> Cart${this.cartCount() ? ` · ${this.cartCount()}` : ""}</button></section>

      <!-- VeggieMart Top Search & Category Filter Header -->
      <div class="vm-search-bar">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="vmSearchInput" placeholder="Search fresh beans, irish potatoes, vegetables, fruits..." oninput="window.app.filterProduceByName(this.value)">
      </div>

      <div class="vm-categories-row">
        ${["All", "Staples", "Beans", "Tubers", "Vegetables", "Grains", "Fruits", "Dairy"].map(cat => `
          <button class="vm-cat-pill ${(!this.state.activeCategory && cat === 'All') || this.state.activeCategory === cat ? 'on' : ''}" onclick="window.app.state.activeCategory='${cat}'; window.app.render();">
            ${cat === 'All' ? 'All Staples' : cat}
          </button>
        `).join("")}
      </div>

      <!-- Proximity Distance Bar -->
      ${this.renderNearbyBar()}

      <!-- Produce Grid with Bridge Credit Button -->
      ${this.renderGroceryCatalog('cash')}
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
          <h1>My food credit</h1>
          <p class="sub">Your available amount comes from the unpaid VUP amount recorded for you.</p>
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
          <em>VUP amount recorded as owed</em>
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

      <!-- RSSB Ejo Heza Passbook Card -->
      <div class="card" style="background:linear-gradient(135deg, rgba(34,197,94,0.12), rgba(14,99,94,0.18)); border:1px solid rgba(34,197,94,0.28); border-radius:20px; padding:20px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="tag g" style="font-weight:700;"><i class="bi bi-shield-check"></i> Ejo Heza Long-Term Savings Passbook</span>
            <h3 style="margin:6px 0 4px; font-size:17px;">Your Social Pension & Government Match</h3>
            <p class="sub" style="margin:0; font-size:12.5px; max-width:550px;">
              5% of your VUP public works wage is automatically saved for your future, and the Government of Rwanda provides an equal 100% matching grant for Ubudehe Categories 1 & 2 under Law N° 29/2017.
            </p>
          </div>
          <span class="tag g" style="padding:6px 12px; font-size:11.5px;">100% Match Active</span>
        </div>

        <div class="stats" style="margin-top:14px;">
          <div class="stat">
            <b style="color:var(--accent);">${((u.ejoHezaBalance ? Math.round(u.ejoHezaBalance / 2) : 2400)).toLocaleString()} RWF</b>
            <span>Your 5% Savings</span>
          </div>
          <div class="stat">
            <b style="color:var(--success);">${((u.ejoHezaBalance ? Math.round(u.ejoHezaBalance / 2) : 2400)).toLocaleString()} RWF</b>
            <span>Government 100% Match</span>
          </div>
          <div class="stat">
            <b>${(u.ejoHezaBalance || 4800).toLocaleString()} RWF</b>
            <span>Total Ejo Heza Balance</span>
          </div>
        </div>
      </div>

      <div class="card" style="padding:22px;">
          <h3 style="font-size:16px; font-weight:700; margin-bottom:10px;">How your food credit is repaid</h3>
        <p style="font-size:13.5px; color:var(--mute); line-height:1.6; margin-bottom:14px;">
          When a VUP payment is recorded for you, open food credit is paid first. Any money left is added to your VUP food wallet. This prototype does not check or deduct a real government payment. Food credit has <b>0% interest and no fee</b>.
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

  renderWorkspaceBanner({ eyebrow, title, description, metricValue, metricLabel, metricNote, icon, actionLabel, targetTab, flow = [] }) {
    const safeIcon = /^[a-z0-9-]+$/.test(icon || "") ? icon : "bar-chart-line";
    const safeTab = /^[a-z0-9_-]+$/.test(targetTab || "") ? targetTab : "dashboard";
    const flowMarkup = flow.slice(0, 3).map((step, index) => `${index ? '<i class="bi bi-arrow-right" aria-hidden="true"></i>' : ''}<span>${this.escapeHtml(step)}</span>`).join("");
    return `<section class="workspace-banner card" aria-label="${this.escapeHtml(eyebrow)}">
      <div class="workspace-banner-copy"><span class="workspace-banner-eyebrow"><i class="bi bi-stars" aria-hidden="true"></i> ${this.escapeHtml(eyebrow)}</span><h2>${this.escapeHtml(title)}</h2><p>${this.escapeHtml(description)}</p><button class="workspace-banner-action" onclick="window.app.setNavTab('${safeTab}')">${this.escapeHtml(actionLabel)} <i class="bi bi-arrow-right" aria-hidden="true"></i></button><div class="workspace-banner-flow" aria-label="Simple process">${flowMarkup}</div></div>
      <div class="workspace-banner-visual" aria-hidden="true"><div class="workspace-banner-icon"><i class="bi bi-${safeIcon}"></i></div><div class="workspace-banner-stat"><strong>${this.escapeHtml(metricValue)}</strong><span>${this.escapeHtml(metricLabel)}</span><small>${this.escapeHtml(metricNote)}</small></div><span class="workspace-banner-orbit"></span></div>
    </section>`;
  }

  renderPlannerView() {
    const sub = this.state.activeSubView || "dashboard";

    if (sub === "payroll") {
      return this.renderPlannerPayrollTab();
    }
    if (sub === "agaseke") {
      return this.renderAgasekeManagementTab();
    }
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
    const memberUsers = this.state.users?.member || [];
    const familyCount = memberUsers.length || 6;
    const lateCount = memberUsers.filter(user => Number(user.daysLate) > 0).length;
    const activeAlertCount = (this.state.cases || []).filter(item => !["closed", "resolved"].includes(String(item.status || "").toLowerCase())).length;
    const tf = this.state.timeframe || "month";
    const periodEnd = new Date(); periodEnd.setHours(23,59,59,999);
    const periodStart = new Date(periodEnd); periodStart.setDate(periodStart.getDate() - (tf === "week" ? 6 : tf === "year" ? 364 : 29)); periodStart.setHours(0,0,0,0);
    const vupOrders = this.state.orders.filter(order => { const date=this.parseOrderDate(order.date); return date && date >= periodStart && date <= periodEnd && (order.buyerRole === "Family" || order.mode === "credit"); });
    const creditOrders = vupOrders.filter(order => order.mode === "credit");
    const totalCredit = creditOrders.reduce((sum, order) => sum + (Number(order.total)||0), 0);
    const outstanding = creditOrders.filter(order => !order.repaid && order.creditStatus !== "written_off").reduce((sum,order)=>sum+Math.max(0,Number(order.total)-Number(order.repaidAmount||0)),0);
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

      ${this.renderWorkspaceBanner({ eyebrow: "Planner workspace", title: `Welcome, ${this.state.currentUser.name || "Planner"}`, description: "Review VUP activity, follow up on cases, and use survey results as context.", metricValue: `${NISR_DATA.overall.averageDelayDays.toFixed(1)} days`, metricLabel: "average wait in the survey", metricNote: "Survey data · not live payments", icon: "clipboard-data", actionLabel: "Open NISR analysis", targetTab: "analysis", flow: ["Review activity", "Compare areas", "Follow up"] })}

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
          <b>${familyCount}</b>
          <em>family demo accounts</em>
        </div>
        <div class="card kp" title="Families whose VUP payment is late today">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          <small>Late in demo records</small>
          <b style="color:var(--bad);">${lateCount}</b>
          <em>NISR average: ${NISR_DATA.overall.averageDelayDays.toFixed(1)} days</em>
        </div>
        <div class="card kp" onclick="window.app.setNavTab('creditdesk')" style="cursor:pointer;" title="Tap to open Credit Desk">
          <span class="ki"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
          <small>Bridge Credit</small>
          <b style="color:var(--acc);">${totalCredit.toLocaleString()} RWF</b>
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
          <b style="color:var(--bad);">${activeAlertCount}</b>
          <em>attention needed</em>
        </div>
      </div>

      <section class="nisr-hero-banner card"><div class="nisr-hero-icon"><i class="bi bi-bar-chart-line" aria-hidden="true"></i></div><div class="nisr-hero-copy"><span class="tag g">NISR survey · 2023–24</span><h2>About ${NISR_DATA.overall.averageDelayDays.toFixed(1)} days average wait</h2><p>${NISR_DATA.overall.pctOver7DaysLate}% of surveyed VUP beneficiaries waited more than 7 days. These results show a national pattern, not a live family payment.</p></div><div class="nisr-hero-actions"><button class="btn btn-primary" onclick="window.app.setNavTab('analysis')"><i class="bi bi-graph-up-arrow" aria-hidden="true"></i> Read the analysis</button><button class="btn btn-outline" onclick="window.app.setNavTab('nisr_facts')"><i class="bi bi-file-earmark-text" aria-hidden="true"></i> NISR source</button></div></section>

      <!-- Interactive Rwandan Delay Bar Chart -->
      <section class="card" style="margin-bottom:20px;">
        <div class="ch">
          <div>
            <h3>Average VUP Disbursement Delay by Province</h3>
            <p class="sub" style="margin-top:4px;">NISR household survey · average reported wait: ${NISR_DATA.overall.averageDelayDays.toFixed(1)} days</p>
          </div>
            <span class="tag y">${NISR_DATA.overall.pctOver7DaysLate}% waited over 7 days</span>
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
            <span class="tag r">${this.getToApproveQueue().length + this.getToPaySellersQueue().length + this.getToRepayQueue().length} items</span>
          </div>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:14px; line-height:1.45;">
            ${this.getToPaySellersQueue().length} seller payments and ${this.getToRepayQueue().length} repayments need admin attention. New member credit is automatic.
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
            <h4 style="font-size:15px; font-weight:700;">NISR data guide</h4>
            <span class="tag g">Plain language</span>
          </div>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:14px; line-height:1.45;">
            See what the survey can show, what it cannot show, and how to read the results.
          </p>
          <button class="btn btn-sm btn-outline" style="margin-top:auto;" onclick="window.app.setNavTab('nisr_facts')">
            Read the data guide →
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
          <p class="sub">Credit is automatic. Review activity here; an admin handles money and payment records.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Overview
        </button>
      </div>

      ${this.state.roleCode === "admin" ? `<section class="card payout-receipt-card"><div class="settings-title"><span class="settings-icon"><i class="bi bi-cash-coin" aria-hidden="true"></i></span><div><h3>Record a VUP payment received</h3><p>Enter the amount confirmed by the payment record. Open food credit is repaid first; any balance left goes to the member's food wallet.</p></div></div><div class="payout-receipt-fields"><label>Family account<select class="form-control" id="vupPaymentEmail">${(this.state.users?.member || []).map(user=>`<option value="${this.escapeHtml(user.email)}">${this.escapeHtml(user.name)} · ${this.escapeHtml(user.email)}</option>`).join("")}</select></label><label>Amount received (RWF)<input class="form-control" id="vupPaymentAmount" type="number" min="1" step="100" placeholder="Example: 20,000"></label><button class="btn btn-primary" onclick="window.app.recordVupPayment()"><i class="bi bi-check-circle" aria-hidden="true"></i> Record payment</button></div><small>Prototype only. No real VUP payment is checked or moved.</small></section>` : `<section class="card"><b>Money controls are for admins.</b><p class="sub">You can review credit activity and resolve member cases. You cannot change a member's credit, send a payment, or record a VUP transfer.</p></section>`}
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
  // 12. Automatic food credit and admin-managed repayment
  // =========================================================================
  getToApproveQueue() {
    return [];
  }

  getToPaySellersQueue() {
    return (this.state.orders || []).filter(o => o.mode === "credit" && o.status === "Delivered" && o.paidBy !== "pool");
  }

  getToRepayQueue() {
    return (this.state.orders || []).filter(o => o.mode === "credit" && o.status === "Delivered" && o.paidBy === "pool" && !o.repaid);
  }

  renderCreditDesk() {
    const q2 = this.getToPaySellersQueue();
    const q3 = this.getToRepayQueue();

    const lang = this.state.lang || "en";
    const canManageFunds = this.state.roleCode === "admin";
    const deskTitle = lang === 'rw' ? "Gukurikirana inguzanyo n'ubwishyu" : lang === 'fr' ? "Suivi du crédit et des paiements" : "Credit and payment tracking";

    return `
      <div class="credit-desk">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <h3 style="font-size:18px; font-weight:800;">${deskTitle}</h3>
          <button class="btn btn-ghost btn-sm" style="color:#7e22ce; font-weight:700; font-size:12px;" onclick="window.app.explainNumbersInEasyWords('queues')">
            ✨ Explain Queues in Easy Words
          </button>
        </div>
        <p class="small" style="color:var(--text-muted); margin-bottom:12px;">Credit is given automatically from the member's recorded unpaid VUP amount. Admins manage money; planners can review records and help with cases.</p>

        <div class="queue-grid">
          <!-- Automatic credit: no planner approval -->
          <div class="queue-card">
            <div class="queue-head">
              <div>
                <b style="font-size:14.5px;">Automatic food credit</b>
                <div style="font-size:11px; color:var(--text-muted);">No planner approval needed</div>
              </div>
              <span class="queue-badge" style="background:#e5f5ec; color:#176b48;">${this.state.orders.filter(o => o.mode === "credit" && o.approvedBy === "System (automatic)").length} issued</span>
            </div>
            <div class="queue-item"><b>How the amount is set</b><p class="small">Recorded VUP money owed minus the member's open food credit. The member can use the amount left at checkout.</p><p class="small">A planner cannot approve, reduce, or issue credit.</p></div>
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
                  ${canManageFunds ? `<button class="btn btn-sm btn-primary" style="width:100%; margin-top:6px; padding:4px; background:var(--ok); border-color:var(--ok);" onclick="window.app.disburseToSeller(${o.id})"><i class="bi bi-send" aria-hidden="true"></i> Record seller payment</button>` : '<small class="tag">Admin handles payments</small>'}
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
                    ${canManageFunds ? `<button class="btn btn-sm btn-outline" style="flex:1; padding:4px;" onclick="window.app.settleFromVup(${o.id})">Record repayment</button><button class="btn btn-sm btn-ghost" style="padding:4px; font-size:11px; color:var(--mute);" onclick="window.app.writeOffCredit(${o.id})" title="Write off a balance after review">Write off</button>` : '<small class="tag">Admin handles repayment</small>'}
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
                    ${!['resolved','rejected'].includes(String(c.status).toLowerCase()) ? `<button class="btn btn-sm btn-primary" style="padding:2px 8px; font-size:11px;" onclick="window.app.openCaseResolution(${c.id})">Review / solve</button>` : `<small>${this.escapeHtml(c.resolvedBy || "Reviewed")}<br>${this.escapeHtml(c.resolutionNote || c.outcome || "Case closed")}</small>`}
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
  // 14. PLAIN-LANGUAGE DATA GUIDE
  // =========================================================================
  renderAiHelperCard() {
    return `
      <section class="card plain-guide">
        <div class="plain-guide-heading"><span class="settings-icon"><i class="bi bi-lightbulb" aria-hidden="true"></i></span><div><h3>Understand the numbers</h3><p>Short, clear notes about the NISR survey.</p></div></div>
        <div class="plain-guide-actions">
          <button class="btn btn-sm btn-outline" onclick="window.app.explainNumbersInEasyWords('delay')">Explain payment delays</button>
          <button class="btn btn-sm btn-outline" onclick="window.app.explainNumbersInEasyWords('queues')">Explain the payment steps</button>
          <button class="btn btn-sm btn-outline" onclick="window.app.explainNumbersInEasyWords('pool')">Explain the bridge pool</button>
        </div>
        <div id="aiExplainerResult" class="plain-guide-result" hidden></div>
      </section>
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
    const openOrders = myOrders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled").length;

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

      ${this.renderWorkspaceBanner({ eyebrow: this.state.roleCode === "trader" ? "Market seller workspace" : "Farmer workspace", title: "Reach more local buyers", description: "Manage your food listings and follow orders from one clear screen.", metricValue: String(openOrders), metricLabel: "orders to follow up", metricNote: "Demo orders · no live payouts", icon: "basket2", actionLabel: "Add a food listing", targetTab: "add_produce", flow: ["Add a listing", "Get an order", "Confirm delivery"] })}

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
    const isTrader = this.state.roleCode === "trader";
    const selectedFood = this.state.newListingFood || "Dry beans";
    const info = HARVEST_GALLERY[selectedFood] || { kiny: "Ibihingwa", category: "Staples", img: "assets/produce/dry_beans.jpg", price: 780, unit: "kg" };
    const defaultPrice = info.price || 780;
    const isExempt = !!this.state.farmerTaxExempt;

    return `
      <div class="head">
        <div>
          <h1>${isTrader ? "Add market food listing" : "Add farm produce listing"}</h1>
          <p class="sub">${isTrader ? "List food you source from local markets and suppliers." : "List food you grow for families and shoppers."} Buyers can see the price, unit, location, and seller type.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')">
          ← Back to Orders
        </button>
      </div>

      <!-- Quick Rwandan Produce Preset Selector -->
      <div class="card" style="padding:18px 20px; margin-bottom:16px; border-radius:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <b style="font-size:13.5px; font-weight:700;"><i class="bi bi-lightning-charge" style="color:var(--accent);"></i> 🇷🇼 Quick food preset</b>
          <small style="color:var(--mute);">Tap any Rwandan staple to auto-fill photo and NISR benchmark</small>
        </div>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:8px; scrollbar-width:thin;">
          ${Object.entries(HARVEST_GALLERY).slice(0, 14).map(([name, crop]) => `
            <button type="button" class="btn btn-sm ${name === selectedFood ? 'btn-primary' : 'btn-outline'}"
              style="display:flex; align-items:center; gap:6px; flex:0 0 auto; border-radius:12px; padding:6px 12px; font-size:12px;"
              onclick="window.app.selectFarmerCropPreset('${name}')">
              <img src="${crop.img}" style="width:20px; height:20px; border-radius:6px; object-fit:cover;" alt="">
              <span>${name}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="card" style="padding:24px; border-radius:20px;">
        <h3 style="margin-bottom:14px;">Food item and photo</h3>
        <div class="f" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:16px;">
          <div>
            <label class="form-label">Food item</label>
            <select id="new_food" class="form-control" onchange="window.app.onProduceSelected(this.value)">
              ${Object.keys(NISR_DATA.foodPrices).map(k => `<option value="${k}" ${k === selectedFood ? 'selected' : ''}>${k} (${HARVEST_GALLERY[k] ? HARVEST_GALLERY[k].kiny : ''})</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="form-label">District Origin</label>
            <select id="new_district" class="form-control">
              ${NISR_DATA.districts.map(d => `<option value="${d.name}">${d.name} (${d.province})</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="form-label">Gross Price (RWF / <span class="listing-unit-label">${info.unit || 'kg'}</span>)</label>
            <input id="new_price" type="number" class="form-control listing-unit-placeholder" placeholder="RWF per unit" value="${defaultPrice}" oninput="window.app.updatePriceGuidePreview()">
          </div>
          <div>
            <label class="form-label">Harvest Quantity (<span class="listing-unit-label">${info.unit || 'kg'}</span>)</label>
            <input id="new_qty" type="number" class="form-control listing-unit-placeholder" placeholder="available stock" value="100">
          </div>
        </div>

        <!-- Custom Photo Upload or Captured Image with Preset Preview -->
        <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap; padding:14px; background:var(--card); border:1px solid var(--line); border-radius:16px; margin-bottom:18px;">
          <img id="listingPhotoPreview" src="${info.img}" style="width:60px; height:60px; object-fit:cover; border-radius:14px; border:1px solid var(--line);" alt="Preview">
          <div style="flex:1; min-width:200px;">
            <input type="file" id="cameraUploadInput" accept="image/*" capture="environment" style="display:none;" onchange="window.app.handleCustomPhotoUpload(this)">
            <button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('cameraUploadInput').click()">
              <i class="bi bi-camera" aria-hidden="true"></i> ${isTrader ? "Upload a market product photo" : "Take farm photo / upload file"}
            </button>
            <span id="customPhotoBadge" style="display:none; margin-left:8px;" class="tag g"><i class="bi bi-check-circle"></i> Custom Photo Attached</span>
            <input type="hidden" id="new_photo_url" value="${info.img}">
            <div id="priceGuidePreview" style="font-size:12.5px; color:var(--mute); margin-top:6px;"></div>
          </div>
        </div>

        <!-- Transparent Tax & Net Calculation Breakdown Card -->
        <div class="card" style="background:var(--soft); border:1px solid var(--line); border-radius:16px; padding:16px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
            <b style="font-size:13.5px; color:var(--ink);"><i class="bi bi-receipt"></i> Statutory Tax & Community Agaseke Breakdown</b>
            <label style="display:flex; align-items:center; gap:8px; font-size:12.5px; cursor:pointer;">
              <input type="checkbox" id="taxExemptCheckbox" ${isExempt ? 'checked' : ''} onchange="window.app.toggleFarmerTaxExemption(this.checked)">
              <span><b>Smallholder Tax-Exempt Status</b> (Certified Cooperative Exemption)</span>
            </label>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:10px; margin-bottom:12px;">
            <div style="background:var(--card); padding:10px 12px; border-radius:12px; border:1px solid var(--line);">
              <small style="color:var(--mute); display:block;">Gross Listing Price</small>
              <b id="calcGrossPrice" style="font-size:15px;">${defaultPrice} RWF</b> <span style="font-size:11px;">/${info.unit || 'kg'}</span>
            </div>
            <div style="background:var(--card); padding:10px 12px; border-radius:12px; border:1px solid var(--line);">
              <small style="color:var(--mute); display:block;">District Market Levy (2%)</small>
              <b id="calcTaxLevy" style="font-size:15px; color:${isExempt ? 'var(--mute)' : 'var(--accent)'};">${isExempt ? '0 RWF (Exempt)' : `${Math.round(defaultPrice * 0.02)} RWF`}</b>
            </div>
            <div style="background:var(--card); padding:10px 12px; border-radius:12px; border:1px solid var(--line);">
              <small style="color:var(--mute); display:block;">Agaseke Solidarity Levy</small>
              <b style="font-size:15px; color:var(--success);">10 RWF</b> <span style="font-size:11px;">/ order</span>
            </div>
            <div style="background:var(--card); padding:10px 12px; border-radius:12px; border:1px solid var(--line);">
              <small style="color:var(--mute); display:block;">Net Payout to Farmer</small>
              <b id="calcNetPayout" style="font-size:15px; color:var(--success);">${isExempt ? defaultPrice : defaultPrice - Math.round(defaultPrice * 0.02)} RWF</b> <span style="font-size:11px;">/${info.unit || 'kg'}</span>
            </div>
          </div>

          <p class="sub" style="margin:0; font-size:11.5px; line-height:1.4;">
            📢 <b>RRA & District Market Notice</b>: Under Rwandan local government market regulations, agricultural produce sold through formal trade links is subject to a 2% district market levy unless your cooperative holds a registered smallholder agricultural tax exemption certificate. Every transaction also channels a micro-levy of 10 RWF to the Agaseke k'Ubumwe Social Fund to protect food access for vulnerable neighbors.
          </p>
        </div>

        <button class="btn btn-primary" onclick="window.app.addListing(event)" style="width:100%; justify-content:center; padding:12px; font-weight:700;">
          <i class="bi bi-cloud-arrow-up" aria-hidden="true"></i> Publish Produce Listing to Isoko Market
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
    if (this.state.activeSubView === "cart") return this.renderCartView();
    const u = this.state.currentUser || {};
    const myOrders = this.state.orders.filter(o => o.buyerName === u.name || o.buyerRole === "Shopper" || o.buyerEmail === u.email);
    const totalAgasekeGiven = myOrders.reduce((sum, o) => sum + (o.gift || o.agasekeGift || 0), 0);
    const currentAgaseke = u.agasekeContribution !== undefined ? u.agasekeContribution : 10;
    const agasekePool = this.state.agasekePool || 145210;
    const familiesHelped = Math.max(1, Math.floor(agasekePool / 5000));

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
        <div>
          <h2>${this.t('roleShopperTitle') || 'Ethical Marketplace & Solidarity'}</h2>
          <p class="sub" style="margin:2px 0 0;">Buy fresh farm harvest direct from rural cooperatives with transparent community micro-savings.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Shopper')">
          🧾 Download Purchases & Agaseke Receipts (PDF/CSV)
        </button>
      </div>

      <!-- Civil Servants & Conscious Shoppers Banner -->
      <div class="card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(14, 99, 94, 0.18)); border: 1px solid rgba(16, 185, 129, 0.28); border-radius: 20px; padding: 18px 22px; margin-bottom: 16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap;">
          <div style="flex:1; min-width:280px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="tag g" style="font-weight:700;">🇷🇼 Gahunda y'Abakozi ba Leta n'Abaguzi</span>
              <span class="tag" style="background:rgba(52,211,153,0.18); color:var(--on);">Direct Farm Gate</span>
            </div>
            <h3 style="font-size:17px; font-weight:800; margin:4px 0 6px; color:var(--ink);">
              Empower Smallholders · Support Vulnerable Neighbors with Agaseke
            </h3>
            <p style="font-size:12.5px; color:var(--mute); margin:0 0 10px; line-height:1.45;">
              We encourage government employees, civil servants, institutional buyers, and urban citizens to purchase fresh produce directly on Isoko Bridge. Smallholder farmers receive fair gate prices with zero middlemen commission, while each purchase micro-funds emergency food relief for families in Ubudehe Category 1.
            </p>
          </div>
          <div style="flex:0 0 auto; text-align:right;">
            <span class="tag g" style="font-size:12px; padding:6px 12px;">Zero Middlemen Markups</span>
          </div>
        </div>
      </div>

      <!-- Agaseke k'Ubumwe Micro-Solidarity Control & Pool Stats -->
      <div class="card" style="border-radius:20px; padding:20px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div>
            <h3 style="display:flex; align-items:center; gap:8px; margin:0 0 4px; font-size:15.5px;">
              <i class="bi bi-heart-pulse" style="color:var(--accent);"></i>
              Agaseke k'Ubumwe Micro-Solidarity Contribution
            </h3>
            <p class="sub" style="margin:0; font-size:12px;">
              10 RWF default micro-saving per order — small enough for anyone, yet collectively feeds vulnerable families.
            </p>
          </div>
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span style="font-size:12px; font-weight:600; color:var(--mute); margin-right:4px;">Your contribution:</span>
            ${[10, 20, 50, 100, 0].map(amt => `
              <button class="btn btn-sm ${currentAgaseke === amt ? 'btn-primary' : 'btn-outline'}" 
                style="padding:4px 10px; font-size:11.5px; border-radius:8px;"
                onclick="window.app.setShopperAgasekeAmount(${amt})">
                ${amt === 10 ? '10 RWF (Default)' : amt === 0 ? 'Exempt' : `${amt} RWF`}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="stats" style="margin-top:12px;">
          <div class="stat">
            <b style="color:var(--accent);">${totalAgasekeGiven.toLocaleString()} RWF</b>
            <span>your Agaseke gifts</span>
          </div>
          <div class="stat">
            <b style="color:var(--success);">${agasekePool.toLocaleString()} RWF</b>
            <span>Agaseke relief pool today</span>
          </div>
          <div class="stat">
            <b>${familiesHelped} families</b>
            <span>emergency relief capacity</span>
          </div>
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

  renderPlannerPayrollTab() {
    const members = this.state.users?.member || [];
    const totalOwed = members.reduce((sum, u) => sum + (Number(u.governmentAmountOwed) || 0), 0);
    const totalOpenCredit = members.reduce((sum, u) => sum + this.getOutstandingCredit(u.email), 0);
    const totalEjoHezaSavings = Math.round(totalOwed * 0.05);
    const totalGovMatch = totalEjoHezaSavings;
    const totalNetPayable = Math.max(0, totalOwed - totalOpenCredit - totalEjoHezaSavings);
    const lateCount = members.filter(u => Number(u.daysLate) > 0).length;

    return `
      <div class="head">
        <div>
          <h1>VUP Beneficiaries Social Protection Payroll & Ejo Heza</h1>
          <p class="sub">Statutory monthly public works payroll disbursement, automated food credit recovery, and RSSB Ejo Heza co-savings.</p>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-sm btn-primary" onclick="window.app.autoDisburseAllVupPayments()">
            <i class="bi bi-lightning-charge"></i> ⚡ Auto-Disburse All VUP Payroll
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.downloadVupPayrollCsv()">
            <i class="bi bi-download"></i> Export Payroll (CSV / Bank Wave)
          </button>
        </div>
      </div>

      <!-- Ejo Heza Long-Term Savings & Fiscal Resilience Card -->
      <div class="card" style="background: linear-gradient(135deg, rgba(14, 99, 94, 0.12), rgba(34, 197, 94, 0.16)); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 20px; padding: 22px; margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
          <div style="flex:1; min-width:280px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="tag g" style="font-weight:700;"><i class="bi bi-shield-check"></i> RSSB Ejo Heza Long-Term Savings Scheme</span>
              <span class="tag" style="background:rgba(52,211,153,0.18); color:var(--on);">Law N° 29/2017</span>
            </div>
            <h3 style="font-size:17px; font-weight:800; margin:4px 0 6px; color:var(--ink);">
              Ubudehe 1 & 2 Co-Savings & Fiscal Relief Shield
            </h3>
            <p style="font-size:12.5px; color:var(--mute); margin:0 0 10px; line-height:1.5;">
              Under Rwandan law, vulnerable households in public works save 5% of their gross social allowance into Ejo Heza, which the Government of Rwanda matches with a 100% co-contribution. This converts temporary social relief into permanent household resilience and reduces future emergency relief budgets.
            </p>
          </div>
          <div style="flex:0 0 auto; text-align:right;">
            <span class="tag g" style="font-size:12px; padding:6px 12px;">100% Government Co-Contribution</span>
          </div>
        </div>

        <div class="stats" style="margin-top:14px;">
          <div class="stat">
            <b style="color:var(--accent);">${totalEjoHezaSavings.toLocaleString()} RWF</b>
            <span>Member 5% Savings</span>
          </div>
          <div class="stat">
            <b style="color:var(--success);">${totalGovMatch.toLocaleString()} RWF</b>
            <span>Govt 100% Matching Grant</span>
          </div>
          <div class="stat">
            <b>${(totalEjoHezaSavings + totalGovMatch).toLocaleString()} RWF</b>
            <span>Total Ejo Heza Reserve</span>
          </div>
          <div class="stat">
            <b style="color:var(--ok);">14,800,000 RWF</b>
            <span>Projected 10-Yr Fiscal Budget Saved</span>
          </div>
        </div>
      </div>

      <!-- Beneficiaries Payroll Table Card -->
      <section class="card admin-list-card" style="border-radius:20px; padding:20px;">
        <div class="ch" style="margin-bottom:14px;">
          <div>
            <h3 style="margin:0 0 4px;">Beneficiary Allowance & Settlement Register</h3>
            <p class="sub" style="margin:0;">Net Cash = Gross Allowance − Open Food Credit (Auto-Settled) − Ejo Heza 5% Savings.</p>
          </div>
          <span class="tag g">${members.length} Registered Beneficiaries (${lateCount} Delayed)</span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Beneficiary</th>
                <th>Sector & District</th>
                <th>Days Worked</th>
                <th>Gross Allowance</th>
                <th>Food Credit Settled</th>
                <th>Ejo Heza (5%)</th>
                <th>Net Cash Disbursed</th>
                <th>Payment Channel</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${members.map(user => {
                const gross = Number(user.governmentAmountOwed) || 0;
                const openCredit = this.getOutstandingCredit(user.email);
                const ejoHeza = Math.round(gross * 0.05);
                const netPay = Math.max(0, gross - openCredit - ejoHeza);
                const isDisbursed = user.payrollStatus === "Disbursed" || gross === 0;

                return `
                  <tr>
                    <td>
                      <b>${this.escapeHtml(user.name || "—")}</b><br>
                      <small style="color:var(--mute);">${this.escapeHtml(user.email || "")}</small>
                    </td>
                    <td>
                      ${this.escapeHtml(user.sector || "Sector Hub")}<br>
                      <small style="color:var(--mute);">${this.escapeHtml(user.district || "—")}</small>
                    </td>
                    <td><b>${Number(user.daysWorked || 0)}</b> days</td>
                    <td><b style="color:var(--ink);">${gross.toLocaleString()} RWF</b></td>
                    <td><span style="color:${openCredit ? 'var(--bad)' : 'var(--mute)'}; font-weight:600;">−${openCredit.toLocaleString()} RWF</span></td>
                    <td><span style="color:var(--accent); font-weight:600;">−${ejoHeza.toLocaleString()} RWF</span></td>
                    <td><b style="color:var(--success); font-size:14px;">${netPay.toLocaleString()} RWF</b></td>
                    <td>
                      <small style="font-weight:600;">${this.escapeHtml(user.paymentMethod || "Umurenge SACCO")}</small><br>
                      <small style="color:var(--mute);">${this.escapeHtml(user.accountNumber || "SACCO-01")}</small>
                    </td>
                    <td>
                      <span class="tag ${isDisbursed ? 'g' : user.daysLate > 0 ? 'r' : 'y'}">
                        ${isDisbursed ? 'Disbursed' : `${user.daysLate || 0}d Late`}
                      </span>
                    </td>
                    <td>
                      ${isDisbursed ? `
                        <button class="btn btn-sm btn-ghost" disabled style="opacity:0.6;">
                          <i class="bi bi-check2-all"></i> Paid
                        </button>
                      ` : `
                        <button class="btn btn-sm btn-primary" onclick="window.app.disburseMemberPayment('${this.escapeHtml(user.email)}')">
                          <i class="bi bi-send-check"></i> Disburse
                        </button>
                      `}
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  disburseMemberPayment(email) {
    const user = (this.state.users?.member || []).find(u => u.email === email);
    if (!user) {
      this.toast("Member not found.", "warning");
      return;
    }
    const gross = Number(user.governmentAmountOwed) || 0;
    if (gross <= 0) {
      this.toast(`${user.name} has already been disbursed.`, "info");
      return;
    }
    const openCredit = this.getOutstandingCredit(user.email);
    const ejoHeza = Math.round(gross * 0.05);
    const govMatch = ejoHeza;
    const netPay = Math.max(0, gross - openCredit - ejoHeza);

    this.state.orders.forEach(o => {
      if (o.buyerEmail === user.email && o.mode === "credit" && !o.repaid) {
        o.repaid = true;
        o.repaidDate = new Date().toLocaleDateString("en-GB");
        o.creditStatus = "settled";
      }
    });

    if (openCredit > 0) {
      this.state.pool.balance += openCredit;
      this.state.pool.totalRepaidByVup = (this.state.pool.totalRepaidByVup || 0) + openCredit;
    }

    user.ejoHezaBalance = (user.ejoHezaBalance || 0) + ejoHeza + govMatch;
    user.governmentAmountOwed = 0;
    user.daysLate = 0;
    user.payrollStatus = "Disbursed";
    user.lastDisbursedDate = new Date().toLocaleDateString("en-GB");

    this.state.ledger = this.state.ledger || [];
    this.state.ledger.unshift({
      date: new Date().toLocaleDateString("en-GB"),
      type: "vup_payroll_disbursement",
      from: "Government Social Protection Treasury (LODA / MINECOFIN)",
      to: `${user.name} (${user.paymentMethod || 'SACCO'})`,
      amount: netPay,
      link: `Gross: ${gross} RWF · Credit Settled: ${openCredit} RWF · Ejo Heza: ${ejoHeza} RWF (+${govMatch} Gov Match)`,
      status: "Settled via SACCO Wave"
    });

    this.addNotification({
      type: "payroll",
      title: "VUP Allowance Disbursed",
      body: `Net cash of ${netPay.toLocaleString()} RWF sent to ${user.paymentMethod}. ${openCredit.toLocaleString()} RWF settled your bridge credit, and ${(ejoHeza + govMatch).toLocaleString()} RWF credited to Ejo Heza.`
    });

    this.saveState();
    this.render();
    this.toast(`Disbursed ${netPay.toLocaleString()} RWF net cash to ${user.name}. Credit settled & Ejo Heza credited!`, "success");
  }

  autoDisburseAllVupPayments() {
    const members = (this.state.users?.member || []).filter(u => Number(u.governmentAmountOwed) > 0);
    if (members.length === 0) {
      this.toast("All registered VUP beneficiaries have already been disbursed.", "info");
      return;
    }
    let totalDisbursedNet = 0;
    let totalSettledCredit = 0;
    let totalEjoHeza = 0;

    members.forEach(user => {
      const gross = Number(user.governmentAmountOwed) || 0;
      const openCredit = this.getOutstandingCredit(user.email);
      const ejoHeza = Math.round(gross * 0.05);
      const govMatch = ejoHeza;
      const netPay = Math.max(0, gross - openCredit - ejoHeza);

      this.state.orders.forEach(o => {
        if (o.buyerEmail === user.email && o.mode === "credit" && !o.repaid) {
          o.repaid = true;
          o.repaidDate = new Date().toLocaleDateString("en-GB");
          o.creditStatus = "settled";
        }
      });

      if (openCredit > 0) {
        this.state.pool.balance += openCredit;
        this.state.pool.totalRepaidByVup = (this.state.pool.totalRepaidByVup || 0) + openCredit;
      }

      user.ejoHezaBalance = (user.ejoHezaBalance || 0) + ejoHeza + govMatch;
      user.governmentAmountOwed = 0;
      user.daysLate = 0;
      user.payrollStatus = "Disbursed";
      user.lastDisbursedDate = new Date().toLocaleDateString("en-GB");

      totalDisbursedNet += netPay;
      totalSettledCredit += openCredit;
      totalEjoHeza += (ejoHeza + govMatch);
    });

    this.state.ledger = this.state.ledger || [];
    this.state.ledger.unshift({
      date: new Date().toLocaleDateString("en-GB"),
      type: "vup_batch_payroll_wave",
      from: "Government Social Protection Treasury (LODA / SACCO Automated Wave)",
      to: `${members.length} VUP Beneficiaries`,
      amount: totalDisbursedNet,
      link: `Settled ${totalSettledCredit.toLocaleString()} RWF Credit · Transferred ${totalEjoHeza.toLocaleString()} RWF to Ejo Heza`,
      status: "Automated SACCO & MoMo Batch Complete"
    });

    this.addNotification({
      type: "payroll_batch",
      title: "Batch VUP Payroll Disbursed",
      body: `Automated SACCO wave completed for ${members.length} households. Settled ${totalSettledCredit.toLocaleString()} RWF bridge credit into revolving pool.`
    });

    this.saveState();
    this.render();
    this.toast(`Batch Complete: Disbursed ${totalDisbursedNet.toLocaleString()} RWF net cash to ${members.length} families. Revolving pool replenished!`, "success");
  }

  downloadVupPayrollCsv() {
    const members = this.state.users?.member || [];
    const rows = [
      ["Beneficiary", "Email", "Programme", "District", "Sector", "Days Worked", "Gross Allowance RWF", "Open Food Credit RWF", "Ejo Heza 5% RWF", "Gov 100% Match RWF", "Net Cash Payout RWF", "Payment Method", "Account Number", "Status"],
      ...members.map(user => {
        const gross = Number(user.governmentAmountOwed) || 0;
        const openCredit = this.getOutstandingCredit(user.email);
        const ejoHeza = Math.round(gross * 0.05);
        const netPay = Math.max(0, gross - openCredit - ejoHeza);
        return [
          user.name || "—",
          user.email || "—",
          user.programme || "VUP",
          user.district || "—",
          user.sector || "—",
          Number(user.daysWorked || 0),
          gross,
          openCredit,
          ejoHeza,
          ejoHeza,
          netPay,
          user.paymentMethod || "Umurenge SACCO",
          user.accountNumber || "—",
          user.payrollStatus || "Pending"
        ];
      })
    ];
    const csv = rows.map(r => r.map(v => this.csvCell(v ?? "")).join(",")).join("\r\n");
    this.downloadFile(`vup-payroll-wave-${this.localDateInput(new Date())}.csv`, csv, "text/csv;charset=utf-8");
  }

  renderAgasekeManagementTab() {
    const pool = this.state.agasekePool || 145210;
    const disbursed = this.state.agasekeDisbursed || 35000;
    const assisted = this.state.agasekeAssistedCount || 7;
    const members = this.state.users?.member || [];

    return `
      <div class="head">
        <div>
          <h1>🇷🇼 Agaseke k'Ubumwe Social Relief Fund (Ikigega cy'Agaseke)</h1>
          <p class="sub">Citizen & civil servant micro-solidarity pool (10 RWF default contribution per order), providing emergency relief baskets for Ubudehe 1 households.</p>
        </div>
        <button class="btn btn-sm btn-primary" onclick="window.app.transferAgasekeToBridgePool(50000)">
          <i class="bi bi-arrow-repeat"></i> Transfer 50,000 RWF to Revolving Bridge Pool
        </button>
      </div>

      <!-- Agaseke Metrics -->
      <div class="stats" style="margin-bottom:20px;">
        <div class="stat">
          <b style="color:var(--success); font-size:24px;">${pool.toLocaleString()} RWF</b>
          <span>Current Agaseke Reserve</span>
        </div>
        <div class="stat">
          <b style="color:var(--accent); font-size:24px;">${disbursed.toLocaleString()} RWF</b>
          <span>Emergency Food Vouchers Disbursed</span>
        </div>
        <div class="stat">
          <b style="font-size:24px;">${assisted} households</b>
          <span>Vulnerable Families Assisted</span>
        </div>
        <div class="stat">
          <b style="color:var(--primary); font-size:24px;">10 RWF / order</b>
          <span>Citizen Micro-Solidarity Inflow</span>
        </div>
      </div>

      <!-- Vulnerable Families Relief Allocation Table -->
      <section class="card admin-list-card" style="border-radius:20px; padding:20px;">
        <div class="ch" style="margin-bottom:14px;">
          <div>
            <h3 style="margin:0 0 4px;">Sector Social Affairs Relief Desk</h3>
            <p class="sub" style="margin:0;">Select a vulnerable family to grant an emergency food basket voucher directly from the Agaseke fund.</p>
          </div>
          <span class="tag g">Ubudehe Category 1 Priorities</span>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Vulnerable Household</th>
                <th>Sector & District</th>
                <th>Vulnerability & Delay</th>
                <th>Urgent Food Debt</th>
                <th>Agaseke Aid Actions</th>
              </tr>
            </thead>
            <tbody>
              ${members.map(user => {
                const openCredit = this.getOutstandingCredit(user.email);
                const isUrgent = Number(user.daysLate) >= 7;

                return `
                  <tr>
                    <td>
                      <b>${this.escapeHtml(user.name || "—")}</b><br>
                      <small style="color:var(--mute);">${user.householdSize || 5} members · Ubudehe Category 1</small>
                    </td>
                    <td>
                      ${this.escapeHtml(user.sector || "Sector Hub")}<br>
                      <small style="color:var(--mute);">${this.escapeHtml(user.district || "—")}</small>
                    </td>
                    <td>
                      <span class="tag ${isUrgent ? 'r' : 'y'}">${user.daysLate ? `${user.daysLate}d Delay` : 'Severe Hardship'}</span><br>
                      <small style="color:var(--mute);">${this.escapeHtml(user.programme || "VUP Public Works")}</small>
                    </td>
                    <td>
                      <b style="color:${openCredit ? 'var(--bad)' : 'var(--ok)'};">${openCredit.toLocaleString()} RWF</b><br>
                      <small style="color:var(--mute);">${openCredit ? 'Food credit balance' : 'Clean balance'}</small>
                    </td>
                    <td>
                      <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button class="btn btn-sm btn-primary" style="padding:4px 10px; font-size:11px;" onclick="window.app.grantAgasekeAid('${this.escapeHtml(user.email)}', 5000)">
                          Grant 5,000 RWF Food Basket
                        </button>
                        <button class="btn btn-sm btn-outline" style="padding:4px 10px; font-size:11px;" onclick="window.app.grantAgasekeAid('${this.escapeHtml(user.email)}', 10000)">
                          Grant 10,000 RWF Full Month Aid
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  grantAgasekeAid(email, amount) {
    amount = Number(amount) || 5000;
    const pool = this.state.agasekePool || 145210;
    if (pool < amount) {
      this.toast(`Insufficient Agaseke pool balance (${pool.toLocaleString()} RWF available).`, "warning");
      return;
    }
    const user = (this.state.users?.member || []).find(u => u.email === email);
    if (!user) {
      this.toast("Beneficiary family not found.", "warning");
      return;
    }

    this.state.agasekePool = pool - amount;
    this.state.agasekeDisbursed = (this.state.agasekeDisbursed || 35000) + amount;
    this.state.agasekeAssistedCount = (this.state.agasekeAssistedCount || 7) + 1;

    let remainingAid = amount;
    this.state.orders.forEach(o => {
      if (o.buyerEmail === user.email && o.mode === "credit" && !o.repaid && remainingAid > 0) {
        const orderOwed = Math.max(0, Number(o.total) - Number(o.repaidAmount || 0));
        const payDown = Math.min(orderOwed, remainingAid);
        o.repaidAmount = (Number(o.repaidAmount) || 0) + payDown;
        remainingAid -= payDown;
        if (o.repaidAmount >= o.total) {
          o.repaid = true;
          o.creditStatus = "settled";
          o.repaidDate = new Date().toLocaleDateString("en-GB");
        }
      }
    });

    if (remainingAid > 0) {
      user.vupWalletBalance = (user.vupWalletBalance || 0) + remainingAid;
    }

    this.state.ledger = this.state.ledger || [];
    this.state.ledger.unshift({
      date: new Date().toLocaleDateString("en-GB"),
      type: "agaseke_emergency_relief",
      from: "Agaseke k'Ubumwe Social Relief Pool",
      to: `${user.name} (${user.district})`,
      amount: amount,
      link: `Emergency food relief approved by Sector Social Affairs Planner`,
      status: "Disbursed to Household"
    });

    this.addNotification({
      type: "agaseke_grant",
      title: "Agaseke Food Relief Granted",
      body: `You received ${amount.toLocaleString()} RWF emergency food relief from Agaseke k'Ubumwe. Your food security is protected.`
    });

    this.saveState();
    this.render();
    this.toast(`Granted ${amount.toLocaleString()} RWF food assistance from Agaseke Fund to ${user.name}!`, "success");
  }

  transferAgasekeToBridgePool(amount) {
    amount = Number(amount) || 50000;
    const pool = this.state.agasekePool || 145210;
    if (pool < amount) {
      this.toast(`Insufficient Agaseke pool balance (${pool.toLocaleString()} RWF available).`, "warning");
      return;
    }
    this.state.agasekePool = pool - amount;
    this.state.pool.balance = (this.state.pool.balance || 0) + amount;
    this.state.pool.totalGiftsIn = (this.state.pool.totalGiftsIn || 0) + amount;

    this.state.ledger = this.state.ledger || [];
    this.state.ledger.unshift({
      date: new Date().toLocaleDateString("en-GB"),
      type: "agaseke_to_bridge_transfer",
      from: "Agaseke k'Ubumwe Social Relief Pool",
      to: "Revolving VUP Bridge Credit Float",
      amount: amount,
      link: `Revolving liquidity injection to guarantee 0% food credit for delayed workers`,
      status: "Liquidity Bolstered"
    });

    this.saveState();
    this.render();
    this.toast(`Transferred ${amount.toLocaleString()} RWF from Agaseke into Revolving Bridge Pool!`, "success");
  }

  // =========================================================================
  // 17. GOVERNMENT WORKER (ADMIN) SCREEN (Sees Whole System & Demo Switch)
  // =========================================================================
  renderAdminUsersTab() {
    const users = Object.entries(this.state.users || {}).flatMap(([role, list]) => list.map(user => ({ ...user, role })));
    const members = this.state.users?.member || [];
    return `
      <div class="head"><div><h1>Users and VUP work records</h1><p class="sub">Admins keep work days and unpaid VUP amounts up to date. The member's food credit updates automatically.</p></div><button class="btn btn-sm btn-outline" onclick="window.app.downloadVupWorkRecords()"><i class="bi bi-download" aria-hidden="true"></i> Download work records</button></div>
      <section class="card admin-list-card">
        <div class="ch"><div><h3>VUP amount owed</h3><p class="sub">Use the amount confirmed by a work or payment record. Work days apply to public works programmes. These accounts are demo data.</p></div><span class="tag g">${members.length} VUP members</span></div>
        <div class="table-wrap"><table><thead><tr><th>Member</th><th>Programme and district</th><th>Days worked</th><th>Government owes (demo)</th><th>Open food credit</th><th>Credit left</th><th>Record</th></tr></thead><tbody>
          ${members.map(user => `<tr><td><b>${this.escapeHtml(user.name || "—")}</b><br><small>${this.escapeHtml(user.email || "")}</small></td><td>${this.escapeHtml(user.programme || "VUP")}<br><small>${this.escapeHtml(user.district || "—")}</small></td><td>${Number(user.daysWorked || 0)}</td><td><b>${Number(user.governmentAmountOwed || 0).toLocaleString()} RWF</b></td><td>${this.getOutstandingCredit(user.email).toLocaleString()} RWF</td><td>${this.getRemainingCredit(user).toLocaleString()} RWF</td><td><button class="btn btn-sm btn-outline" onclick="window.app.openVupWorkRecord('${this.escapeHtml(user.email)}')"><i class="bi bi-pencil-square" aria-hidden="true"></i> Update</button></td></tr>`).join("")}
        </tbody></table></div>
        <p class="sub" style="margin-top:12px;">Food credit available = government amount owed − open food credit. Planners can help with cases, but cannot edit this record or grant credit.</p>
      </section>
      <div class="head" style="margin-top:26px;"><div><h2>All accounts</h2><p class="sub">Search accounts by name, email, or role.</p></div></div>
      <section class="card admin-list-card">
        <div class="admin-list-tools"><label class="admin-search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input type="search" placeholder="Search name, email, or role" oninput="window.app.filterAdminUserRows(this.value)"></label><span class="tag g">${users.length} demo accounts</span></div>
        <div class="table-wrap"><table><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th><th>District</th></tr></thead><tbody>
          ${users.map(user => { const search = `${user.name || ""} ${user.email || ""} ${user.role}`.toLowerCase(); return `<tr data-admin-user="${this.escapeHtml(search)}"><td><b>${this.escapeHtml(user.name || "—")}</b></td><td>${this.escapeHtml(user.role)}</td><td>${this.escapeHtml(user.email || "—")}</td><td><span class="tag ${user.status === 'pending' ? 'y' : 'g'}">${this.escapeHtml(user.status || 'active')}</span></td><td>${this.escapeHtml(user.district || "—")}</td></tr>`; }).join("")}
        </tbody></table></div>
      </section>`;
  }

  openVupWorkRecord(email) {
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can update VUP work records.", "warning"); return; }
    const user = (this.state.users?.member || []).find(item => item.email === email);
    if (!user) return;
    const modal = document.getElementById("vupWorkRecordModal");
    if (!modal) return;
    document.getElementById("vupWorkEmail").value = user.email;
    document.getElementById("vupWorkMemberName").textContent = `${user.name} · ${user.programme || "VUP member"} · ${user.district || "District not set"}`;
    document.getElementById("vupDaysWorked").value = Number(user.daysWorked || 0);
    document.getElementById("vupAmountOwed").value = Number(user.governmentAmountOwed || 0);
    modal.classList.add("open");
  }

  saveVupWorkRecord(event) {
    event.preventDefault();
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can update VUP work records.", "warning"); return; }
    const email = document.getElementById("vupWorkEmail")?.value;
    const daysWorked = Number(document.getElementById("vupDaysWorked")?.value);
    const amount = Number(document.getElementById("vupAmountOwed")?.value);
    const user = (this.state.users?.member || []).find(item => item.email === email);
    if (!user || !Number.isInteger(daysWorked) || daysWorked < 0 || !Number.isFinite(amount) || amount < 0) { this.toast("Enter zero or a positive number for work days and amount owed.", "warning"); return; }
    user.daysWorked = daysWorked;
    user.governmentAmountOwed = Math.round(amount);
    user.workRecordUpdatedAt = new Date().toISOString();
    user.workRecordUpdatedBy = this.state.currentUser.name || "Admin";
    if (this.state.currentUser?.email === email) this.state.currentUser = { ...user };
    this.state.auditLog.unshift({ who: user.workRecordUpdatedBy, action: "Updated VUP work record", target: `${user.name} · ${daysWorked} days · ${user.governmentAmountOwed.toLocaleString()} RWF owed`, date: new Date().toISOString(), reason: "Admin update" });
    this.addNotification(`Your VUP work record was updated. Government amount owed: ${user.governmentAmountOwed.toLocaleString()} RWF.`, { targetEmail: email, type: "account" });
    document.getElementById("vupWorkRecordModal")?.classList.remove("open");
    this.saveState();
    this.render();
    this.toast("VUP work record saved. Available food credit has been updated.", "success");
  }

  downloadVupWorkRecords() {
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can download member work records.", "warning"); return; }
    const rows = [["Member", "Email", "Programme", "District", "Days worked", "Government amount owed RWF", "Open food credit RWF", "Food credit available RWF"], ...(this.state.users?.member || []).map(user => [user.name, user.email, user.programme, user.district, Number(user.daysWorked || 0), Number(user.governmentAmountOwed || 0), this.getOutstandingCredit(user.email), this.getRemainingCredit(user)])];
    const csv = rows.map(row => row.map(value => this.csvCell(value ?? "")).join(",")).join("\r\n");
    this.downloadFile(`vup-work-records-${this.localDateInput(new Date())}.csv`, csv, "text/csv;charset=utf-8");
  }

  filterAdminUserRows(query) {
    const term = String(query || "").trim().toLowerCase();
    document.querySelectorAll("[data-admin-user]").forEach(row => { row.hidden = !row.dataset.adminUser.includes(term); });
  }

  renderAdminLedgerTab() {
    const entries = this.state.ledger || [];
    return `
      <div class="head"><div><h1>Money record</h1><p class="sub">See money added to or paid from the bridge pool.</p></div><button class="btn btn-sm btn-primary" onclick="window.app.downloadLedgerCsv()"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/></svg> Download CSV</button></div>
      <section class="card admin-list-card"><div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>From</th><th>To</th><th>Amount</th><th>Order</th><th>Status</th></tr></thead><tbody>
        ${entries.length ? entries.map(entry => `<tr><td>${this.escapeHtml(entry.date || "—")}</td><td>${this.escapeHtml(String(entry.type || "Record").replace(/_/g, " "))}</td><td>${this.escapeHtml(entry.from || "—")}</td><td>${this.escapeHtml(entry.to || "—")}</td><td>${(Number(entry.amount) || 0).toLocaleString()} RWF</td><td>${this.escapeHtml(entry.link || "—")}</td><td>${this.escapeHtml(entry.status || "Recorded")}</td></tr>`).join("") : '<tr><td colspan="7">No money records yet.</td></tr>'}
      </tbody></table></div></section>`;
  }

  renderAdminView() {
    const sub = this.state.activeSubView || "dashboard";
    if (sub === "payroll") return this.renderPlannerPayrollTab();
    if (sub === "agaseke") return this.renderAgasekeManagementTab();
    if (sub === "nisr_facts") {
      return this.renderNisrFactsDoc();
    }
    if (sub === "users") return this.renderAdminUsersTab();
    if (sub === "ledger") return this.renderAdminLedgerTab();
    if (sub === "cases") return this.renderPlannerCasesTab();
    if (sub === "creditdesk") return this.renderPlannerCreditDeskTab();
    const allUsers = [];
    for (const [r, list] of Object.entries(this.state.users || {})) {
      list.forEach(u => allUsers.push({ ...u, role: r.toUpperCase() }));
    }

    const totalSales = this.state.orders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);
    const cases = this.state.cases || [];
    const activeCases = cases.filter(item => !["closed", "resolved", "rejected"].includes(String(item.status || "").toLowerCase())).length;

    return `
      <!-- Vertix Admin Header -->
      <div class="head">
        <div>
          <h1>System Administration & Audit</h1>
          <p class="sub">Review users, payments, cases, and reports in one place.</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm btn-acc" onclick="window.app.openAnalysisReportModal()" title="Create a report">
            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v18h16V8zM14 2v6h6M8 13h8m-8 4h8"/></svg> Make report
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Admin')" title="Download system activity">
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/></svg> Download activity
          </button>
        </div>
      </div>

      ${this.renderWorkspaceBanner({ eyebrow: "Admin workspace", title: "System overview", description: "Review users, orders, reports, and open cases across the prototype.", metricValue: String(activeCases), metricLabel: "open cases", metricNote: "Review before taking action", icon: "shield-check", actionLabel: "Review open cases", targetTab: "cases", flow: ["Check records", "Review cases", "Export reports"] })}

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
          <span class="ki"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m2-13a4 4 0 0 1 0 8m2 5v-2a6 6 0 0 0-3-5.2"/></svg></span>
          <small>Total Users</small>
          <b>${allUsers.length}</b>
          <em>members, sellers, shoppers</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);"><svg viewBox="0 0 24 24"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg></span>
          <small>Total Sales</small>
          <b style="color:var(--ok);">${totalSales.toLocaleString()} RWF</b>
          <em>gross market volume</em>
        </div>
        <div class="card kp">
          <span class="ki"><svg viewBox="0 0 24 24"><path d="M3 10h18M5 10v9m5-9v9m4-9v9m5-9v9M3 21h18M12 3l9 5H3z"/></svg></span>
          <small>Pool Balance</small>
          <b>${this.state.pool.balance.toLocaleString()} RWF</b>
          <em>liquidity available</em>
        </div>
        <div class="card kp">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6m5.6 5.6 3.6 3.6m0-12.8-3.6 3.6m-5.6 5.6-3.6 3.6"/></svg></span>
          <small>Problem Cases</small>
          <b style="color:var(--bad);">${activeCases} Open</b>
          <em>audit queue</em>
        </div>
      </div>

      <section class="card nisr-admin-entry" style="margin:0 0 20px; padding:18px 20px; border-left:4px solid var(--acc);">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <div>
            <span class="tag g">NISR EICV7 · 2023–24</span>
            <h3 style="margin:8px 0 4px;">National payment-delay analysis</h3>
            <p class="sub">Early survey estimates: ${NISR_DATA.overall.averageDelayDays.toFixed(1)} days average wait; ${NISR_DATA.overall.pctOver7DaysLate}% waited over 7 days. These results show patterns, not the reason for an individual delay.</p>
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

  getUnreadNotifications() {
    const email = this.state.currentUser?.email;
    return (this.state.notifications || []).filter(note => !note.read && (!note.targetEmail || note.targetEmail === email) && (!note.targetRoles || note.targetRoles.includes(this.state.roleCode)));
  }

  addNotification(message, options = {}) {
    if (!Array.isArray(this.state.notifications)) this.state.notifications = [];
    this.state.notifications.unshift({ id: Date.now() + Math.random(), message, date: new Date().toISOString(), read: false, targetEmail: options.targetEmail || "", targetRoles: options.targetRoles || null, type: options.type || "info" });
    this.state.notifications = this.state.notifications.slice(0, 100);
  }

  openNotifications() { this.state.activeSubView = "notifications"; this.render(); }
  markNotificationsRead() {
    const email = this.state.currentUser?.email;
    (this.state.notifications || []).forEach(note => { if ((!note.targetEmail || note.targetEmail === email) && (!note.targetRoles || note.targetRoles.includes(this.state.roleCode))) note.read = true; });
    this.saveState(); this.render();
  }

  renderNotificationsView() {
    const email = this.state.currentUser?.email;
    const notes = (this.state.notifications || []).filter(note => (!note.targetEmail || note.targetEmail === email) && (!note.targetRoles || note.targetRoles.includes(this.state.roleCode)));
    return `<div class="head"><div><h1>Notifications</h1><p class="sub">Recent updates for your account.</p></div><button class="btn btn-sm btn-outline" onclick="window.app.markNotificationsRead()">Mark all as read</button></div><section class="card notification-list">${notes.length ? notes.map(note => `<article class="notification-row ${note.read ? "" : "unread"}"><span class="notification-dot" aria-hidden="true"></span><div><b>${this.escapeHtml(note.message)}</b><small>${new Date(note.date).toLocaleString()}</small></div></article>`).join("") : `<div class="empty-state"><i class="bi bi-bell" aria-hidden="true"></i><b>You are all caught up</b><span>New order, payment, and account updates will appear here.</span></div>`}</section>`;
  }

  getUserActivityOrders() {
    const user = this.state.currentUser || {}, role = this.state.role;
    return (this.state.orders || []).filter(order => role === "Planner" || role === "Admin" || (role === "Farmer" ? order.farmerEmail === user.email || order.farmer === user.name : order.buyerEmail === user.email || order.buyerName === user.name));
  }

  getUserActivityLedger() {
    const user = this.state.currentUser || {}, role = this.state.role;
    const dateRange = this.getUserActivityPeriod();
    return (this.state.ledger || []).filter(entry => {
      const date = this.parseOrderDate(entry.date);
      if (!date || date < dateRange.start || date > dateRange.end) return false;
      if (role === "Planner" || role === "Admin") return true;
      if (role === "Farmer") return entry.to === user.name || entry.to === "Revolving Pool" && entry.from === user.name;
      return entry.from === user.name || entry.to === user.name;
    });
  }

  getUserActivityPeriod() {
    const key = this.state.activityPeriod || "30d", today = new Date(), end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const start = new Date(end);
    if (key === "7d") start.setDate(start.getDate() - 6);
    else if (key === "12m") start.setMonth(start.getMonth() - 12);
    else if (key === "30d") start.setDate(start.getDate() - 29);
    if (key === "custom" && this.state.activityFrom && this.state.activityTo) {
      const [fy,fm,fd] = this.state.activityFrom.split("-").map(Number), [ty,tm,td] = this.state.activityTo.split("-").map(Number);
      start.setFullYear(fy, fm - 1, fd); end.setFullYear(ty, tm - 1, td);
    }
    const label = key === "today" ? "Today" : key === "7d" ? "Last 7 days" : key === "12m" ? "Last 12 months" : key === "custom" ? `${start.toLocaleDateString("en-GB")} – ${end.toLocaleDateString("en-GB")}` : "Last 30 days";
    return { start, end, label };
  }

  setActivityPeriod(period) {
    this.state.activityPeriod = period;
    if (period === "custom") { const from = new Date(); from.setDate(from.getDate()-29); this.state.activityFrom ||= this.localDateInput(from); this.state.activityTo ||= this.localDateInput(new Date()); }
    this.saveState(); this.render();
  }
  applyActivityDates() {
    const from = document.getElementById("activityFrom")?.value, to = document.getElementById("activityTo")?.value;
    if (!from || !to || from > to) { this.toast("Choose a valid start date and end date.", "warning"); return; }
    this.state.activityPeriod="custom"; this.state.activityFrom=from; this.state.activityTo=to; this.saveState(); this.render();
  }

  renderActivityView() {
    const period = this.getUserActivityPeriod();
    const rows = this.getUserActivityOrders().filter(order => { const date = this.parseOrderDate(order.date); return date && date >= period.start && date <= period.end; });
    const total = rows.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const ledgerRows = this.getUserActivityLedger();
    return `<div class="head"><div><h1>Activity summary</h1><p class="sub">Orders and payments for these dates. Prototype only; no real money is moved.</p></div><button class="btn btn-sm btn-primary" onclick="window.app.downloadUserStatement()"><i class="bi bi-download" aria-hidden="true"></i> Download my activity</button></div><section class="activity-controls card"><label>Show<select class="form-control" onchange="window.app.setActivityPeriod(this.value)">${[["today","Today"],["7d","Last 7 days"],["30d","Last 30 days"],["12m","Last 12 months"],["custom","Choose dates"]].map(([key,label])=>`<option value="${key}" ${this.state.activityPeriod===key?"selected":""}>${label}</option>`).join("")}</select></label>${this.state.activityPeriod === "custom" ? `<label>From<input class="form-control" id="activityFrom" type="date" value="${this.state.activityFrom || ""}"></label><label>To<input class="form-control" id="activityTo" type="date" value="${this.state.activityTo || ""}"></label><button class="btn btn-sm btn-outline" onclick="window.app.applyActivityDates()">Apply dates</button>` : ""}<span class="tag g">${period.label}</span></section><div class="nisr-kpis activity-kpis"><article class="card"><small>Orders</small><strong>${rows.length}</strong><span>In this date range</span></article><article class="card"><small>Food cost</small><strong>${total.toLocaleString()} RWF</strong><span>Delivery and pool gifts are listed per order</span></article><article class="card"><small>Money records</small><strong>${ledgerRows.length}</strong><span>Payments, credit, gifts, and pool activity</span></article></div><section class="card admin-list-card"><div class="ch"><div><h3>Orders</h3><p class="sub">Cash at delivery stays due until delivery is marked complete. VUP credit is repaid when a VUP payment is recorded.</p></div><span>${period.label}</span></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Order</th><th>Food</th><th>Pay with</th><th>Food cost</th><th>Payment status</th><th>Order status</th></tr></thead><tbody>${rows.length ? rows.map(order=>`<tr><td>${this.escapeHtml(this.getOrderDateLabel(order.date))}</td><td>#${this.escapeHtml(String(order.id))}</td><td>${this.escapeHtml(order.food)} · ${Number(order.kg)||0} ${this.escapeHtml(order.unit || "kg")}</td><td>${this.escapeHtml(order.paymentMethod || order.paidBy || (order.mode === "credit" ? "VUP food credit" : "Cash"))}</td><td>${(Number(order.total)||0).toLocaleString()} RWF${Number(order.deliveryFee) ? ` + ${Number(order.deliveryFee).toLocaleString()} RWF delivery` : ""}${Number(order.gift) ? ` + ${Number(order.gift).toLocaleString()} RWF pool gift` : ""}</td><td>${this.escapeHtml(order.paymentStatus || (order.mode === "credit" ? "Due from VUP" : "Paid"))}</td><td>${this.escapeHtml(order.status || "Recorded")}</td></tr>`).join("") : `<tr><td colspan="7">No orders found for these dates.</td></tr>`}</tbody></table></div></section><section class="card admin-list-card"><div class="ch"><h3>Payments and money records</h3><span>${period.label}</span></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>From</th><th>To</th><th>Amount</th><th>Status</th></tr></thead><tbody>${ledgerRows.length ? ledgerRows.map(entry=>`<tr><td>${this.escapeHtml(this.getOrderDateLabel(entry.date))}</td><td>${this.escapeHtml(String(entry.type||"Payment").replace(/_/g," "))}</td><td>${this.escapeHtml(entry.from||"—")}</td><td>${this.escapeHtml(entry.to||"—")}</td><td>${(Number(entry.amount)||0).toLocaleString()} RWF</td><td>${this.escapeHtml(entry.status||"Recorded")}</td></tr>`).join("") : `<tr><td colspan="6">No payment records found for these dates.</td></tr>`}</tbody></table></div></section>`;
  }

  cartCount() { return (this.state.cart || []).length; }
  cartQuantityCount() { return (this.state.cart || []).reduce((sum, line) => sum + (Number(line.qty) || 0), 0); }
  getAgasekeContributionAmount() {
    if (this.state.roleCode !== "shopper") return 0;
    const amount = Number(this.state.currentUser?.agasekeContribution);
    return Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 10;
  }
  addToCart(listingId) {
    const listing = this.state.listings.find(item => Number(item.id) === Number(listingId));
    if (!listing) return;
    if (!this.state.user) { this.state.pendingCartListingId = listingId; this.state.publicTab = "roles"; this.render(); this.toast("Choose a role and log in to add this food to your cart.", "info"); return; }
    const qty = Number(document.getElementById(`qty_${listingId}`)?.value || 1);
    if (!Number.isFinite(qty) || qty <= 0 || qty > listing.quantity) { this.toast(`Choose a quantity from 1 to ${listing.quantity} kg.`, "warning"); return; }
    if (!Array.isArray(this.state.cart)) this.state.cart = [];
    const line = this.state.cart.find(item => Number(item.listingId) === Number(listingId));
    if (line) line.qty = Math.min(listing.quantity, line.qty + qty); else this.state.cart.push({ listingId: listing.id, qty });
    this.saveState(); this.renderHeaderNavActions(); this.toast(`${listing.food} added to your cart.`, "success");
  }
  updateCartQuantity(listingId, qty) {
    const line = (this.state.cart || []).find(item => Number(item.listingId) === Number(listingId));
    const listing = this.state.listings.find(item => Number(item.id) === Number(listingId));
    if (!line || !listing) return;
    if (qty <= 0) this.state.cart = this.state.cart.filter(item => Number(item.listingId) !== Number(listingId));
    else line.qty = Math.min(Number(qty), listing.quantity);
    this.saveState(); this.render();
  }
  renderCartView() {
    const lines = (this.state.cart || []).map(line => ({ ...line, listing: this.state.listings.find(item => Number(item.id) === Number(line.listingId)) })).filter(line => line.listing);
    const subtotal = lines.reduce((sum,line)=>sum+line.qty*line.listing.price,0);
    const gift = this.getAgasekeContributionAmount(), fee = this.state.nearby?.deliveryOption === "pickup" ? 0 : 300;
    const count = this.cartCount(), qtyCount = this.cartQuantityCount();
    return `<div class="head"><div><h1>Your cart <span class="tag g" aria-label="${count} products in cart">${count} ${count === 1 ? "product" : "products"}</span></h1><p class="sub">${qtyCount} total units · check your food and quantity before you pay.</p></div><button class="btn btn-sm btn-outline" onclick="window.app.setNavTab('dashboard')"><i class="bi bi-arrow-left" aria-hidden="true"></i> Continue shopping</button></div>${lines.length ? `<div class="cart-layout"><section class="card cart-items">${lines.map(line=>`<article class="cart-line"><img src="${this.escapeHtml(line.listing.photo || "assets/produce/dry_beans.jpg")}" alt=""><div class="cart-line-main"><b>${this.escapeHtml(line.listing.food)}</b><small>${this.escapeHtml(line.listing.farmer)} · ${line.listing.price.toLocaleString()} RWF per ${this.escapeHtml(line.listing.unit || "kg")}</small><label>Quantity <input class="form-control" type="number" min="1" max="${line.listing.quantity}" value="${line.qty}" onchange="window.app.updateCartQuantity(${line.listingId},Number(this.value))"> ${this.escapeHtml(line.listing.unit || "kg")}</label></div><strong>${(line.qty*line.listing.price).toLocaleString()} RWF</strong><button class="icon-action" onclick="window.app.updateCartQuantity(${line.listingId},0)" aria-label="Remove ${this.escapeHtml(line.listing.food)}" title="Remove"><i class="bi bi-trash3" aria-hidden="true"></i></button></article>`).join("")}</section><aside class="card cart-summary"><h2>Order total</h2><div><span>${count} ${count === 1 ? "product" : "products"}</span><b>${subtotal.toLocaleString()} RWF</b></div><div><span>Delivery</span><button class="btn btn-sm btn-ghost" onclick="window.app.toggleCheckoutDelivery()">${fee ? "Moto · 300 RWF" : "SACCO pickup · Free"}</button></div>${gift ? `<div><span>Agaseke Relief</span><b>${gift.toLocaleString()} RWF</b></div>` : `<div><span>Agaseke Relief</span><b>Not added</b></div>`}<div class="cart-grand-total"><span>Food total</span><b>${(subtotal+gift+fee).toLocaleString()} RWF</b></div>${this.state.roleCode === "member" ? `<p><b>${this.getRemainingCredit().toLocaleString()} RWF</b> VUP food credit available. Choose it at payment if you want to use it.</p>` : ""}<p class="sub">Choose cash, a demo payment method, your VUP wallet, or available VUP credit at the next step.</p><button class="btn btn-primary" onclick="window.app.checkoutCart()"><i class="bi bi-lock" aria-hidden="true"></i> Choose how to pay</button></aside></div>` : `<section class="card empty-state"><i class="bi bi-basket" aria-hidden="true"></i><b>Your cart is empty</b><span>Add fresh food from the market to start an order.</span><button class="btn btn-primary" onclick="window.app.setNavTab('dashboard')">Browse food</button></section>`}`;
  }
  checkoutCart() {
    const items = (this.state.cart || []).map(line => ({ listing: this.state.listings.find(item=>Number(item.id)===Number(line.listingId)), qty: Number(line.qty) })).filter(line=>line.listing);
    if (!items.length) return;
    if (items.some(line => line.qty <= 0 || line.qty > line.listing.quantity)) { this.toast("One item has changed stock. Please check your cart.", "warning"); this.render(); return; }
    const total = items.reduce((sum,line)=>sum+line.qty*line.listing.price,0);
    this.state.pendingCheckoutOrder = { items, total };
    this.openPhonePayModal(items[0].listing, items[0].qty, total);
  }

  handleProfilePhotoUpload(input) {
    const file = input.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/")) { this.toast("Choose an image file.", "warning"); return; }
    if (file.size > 8 * 1024 * 1024) { this.toast("Choose a photo smaller than 8 MB.", "warning"); input.value=""; return; }
    const reader = new FileReader();
    reader.onload = () => { const image = new Image(); image.onload = () => { const scale = Math.min(1, 512 / Math.max(image.width,image.height)), canvas = document.createElement("canvas"); canvas.width=Math.round(image.width*scale); canvas.height=Math.round(image.height*scale); canvas.getContext("2d").drawImage(image,0,0,canvas.width,canvas.height); const photo=canvas.toDataURL("image/jpeg",0.82); this.state.currentUser.profilePhoto=photo; const list=this.state.users?.[this.state.roleCode]||[]; const match=list.find(person=>person.email===this.state.currentUser.email); if(match) match.profilePhoto=photo; this.saveState(); this.render(); this.toast("Profile photo updated.","success"); }; image.src=reader.result; };
    reader.readAsDataURL(file);
  }
  removeProfilePhoto() { if (this.state.currentUser) delete this.state.currentUser.profilePhoto; (this.state.users?.[this.state.roleCode]||[]).forEach(person=>{if(person.email===this.state.currentUser?.email) delete person.profilePhoto;}); this.saveState(); this.render(); }

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

  getPublishedTimeliness() {
    return (window.NISR_PUBLISHED_DATA && window.NISR_PUBLISHED_DATA.timeliness) || [];
  }

  renderPublishedTimelinessTable() {
    const rows = this.getPublishedTimeliness();
    if (!rows.length) return "";
    const source = window.NISR_PUBLISHED_DATA;
    return `
      <section class="card" aria-labelledby="nisr-published-title" style="margin-bottom:18px;">
        <div class="card-header" style="align-items:flex-start;">
          <div><h2 id="nisr-published-title" class="card-title">Published NISR payment timing</h2>
          <p class="card-subtitle">How soon the most recent VUP payment arrived, by programme.</p></div>
          <span class="tag g">Official report</span>
        </div>
        <div class="table-wrap"><table>
          <thead><tr><th>Programme</th><th>On time</th><th>1–10 days late</th><th>11–20 days late</th><th>More than 20 days late</th></tr></thead>
          <tbody>${rows.map(row => `<tr><th scope="row">${this.escapeHtml(row.programme)}</th><td>${row.onTime.toFixed(1)}%</td><td>${row.days1to10.toFixed(1)}%</td><td>${row.days11to20.toFixed(1)}%</td><td>${row.over20.toFixed(1)}%</td></tr>`).join("")}</tbody>
        </table></div>
        <p class="small" style="margin:10px 0 0;">These are NISR's published categories for the latest reported payment, not average delay days. They show how often each delay band was reported, not why a delay happened. Source: <a href="${this.escapeHtml(source.sourceUrl)}" target="_blank" rel="noopener">${this.escapeHtml(source.title)}</a>; ${rows.map(row => `${this.escapeHtml(row.table)}, p. ${row.page}`).join(" · ")}.</p>
      </section>`;
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
    const paymentChannels = NISR_DATA.groups?.["Payment Channel"] || [];
    return `
      <div class="head nisr-analysis-head">
        <div><h1>NISR payment-delay analysis</h1><p class="sub">What the 2023–24 household survey says about VUP payment waits.</p></div>
        <div class="nisr-export-actions">
          <button class="btn btn-sm btn-primary" onclick="window.app.openAnalysisReportModal()">Print / Save report as PDF</button>
          <button class="btn btn-sm btn-outline" onclick="window.app.downloadAnalysisCsv()">Download analysis CSV</button>
        </div>
      </div>

      <div class="card nisr-truth-note"><b>How to read this page:</b> The table below uses results published by NISR for the most recent VUP payment. The summary cards and map later on use early project-prepared estimates and still need review. Their average-day figures are a different measure, so do not compare them as if they were the same statistic. The date filter changes demo orders only. Survey results show patterns, not the reason one person's payment was late. <a href="https://microdata.statistics.gov.rw/index.php/catalog/121" target="_blank" rel="noopener">View the NISR survey source</a>.</div>

      ${this.renderWorkspaceBanner({ eyebrow: "NISR survey · 2023–24", title: "See the pattern. Then explore the details.", description: "Compare VUP payment waits by programme and place. Survey results do not explain any one person's delay.", metricValue: `${overall.pctOver7DaysLate}%`, metricLabel: "waited more than 7 days", metricNote: `${overall.totalBeneficiaries.toLocaleString()} survey records`, icon: "bar-chart-line", actionLabel: "View NISR source", targetTab: "nisr_facts", flow: ["Read survey", "Compare groups", "Review carefully"] })}
      ${this.renderPublishedTimelinessTable()}

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
        <details class="nisr-details"><summary>Show the full programme table</summary><div class="table-wrap"><table><thead><tr><th>Programme</th><th>Average wait</th><th>Over 7 days</th><th>Records</th></tr></thead><tbody>${programmes.map(p => `<tr><td>${p.name}</td><td>${p.delay.toFixed(1)} days</td><td>${p.latePct}%</td><td>${p.records.toLocaleString()}</td></tr>`).join("")}</tbody></table></div></details>
      </section>

      <section class="card nisr-comparison">
        <div class="ch"><div><h3>Province results</h3><p class="sub">See the province averages and how many survey records each includes.</p></div></div>
        <details class="nisr-details"><summary>Show province results</summary><div class="table-wrap"><table><thead><tr><th>Province</th><th>Average wait</th><th>Over 7 days</th><th>Records</th><th>Sample note</th></tr></thead><tbody>${NISR_DATA.provinces.map(p => `<tr><td>${p.name}</td><td>${p.delay.toFixed(1)} days</td><td>${p.latePct}%</td><td>${p.records.toLocaleString()}</td><td>${p.records < 100 ? 'Small sample; take care' : '100+ records'}</td></tr>`).join("")}</tbody></table></div><p class="sub">Results with fewer than 100 records are less certain. Results under 25 records are hidden.</p></details>
      </section>

      <section class="card nisr-comparison">
        <div class="ch"><div><h3>Districts with the longest waits</h3><p class="sub">These five districts have the highest averages in the summary.</p></div></div>
        <details class="nisr-details"><summary>Show district results</summary><div class="table-wrap"><table><thead><tr><th>District</th><th>Province</th><th>Average wait</th><th>Records</th><th>Sample note</th></tr></thead><tbody>${districtHotspots.map(d => `<tr><td>${d.name}</td><td>${d.province}</td><td>${d.records < 25 ? 'Hidden' : `${d.delay.toFixed(1)} days`}</td><td>${d.records < 25 ? '—' : d.records}</td><td>${d.records < 25 ? 'Hidden: fewer than 25' : d.records < 100 ? 'Small sample; take care' : '100+ records'}</td></tr>`).join("")}</tbody></table></div></details>
      </section>

      <section class="card nisr-comparison">
        <div class="ch"><div><h3>How groups compare</h3><p class="sub">Explore results by payment method, location, age, and other groups.</p></div></div>
        <details class="nisr-details"><summary>Show group results</summary><div class="table-wrap"><table><thead><tr><th>Category</th><th>Group</th><th>Average wait</th><th>Over 7 days</th><th>Records</th><th>Sample note</th></tr></thead><tbody>${groupComparisons.map(row => `<tr><td>${row.group}</td><td>${row.name}</td><td>${row.records < 25 ? 'Hidden' : `${row.delay.toFixed(1)} days`}</td><td>${row.records < 25 ? '—' : `${row.latePct}%`}</td><td>${row.records < 25 ? '—' : row.records.toLocaleString()}</td><td>${row.records < 25 ? 'Hidden: fewer than 25' : row.records < 100 ? 'Small sample; take care' : '100+ records'}</td></tr>`).join("")}</tbody></table></div><p class="sub">Group differences do not explain why waits differ. Poverty status is measured after support and must not be used alone to decide who gets help.</p></details>
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
            <div class="card-subtitle">NISR survey summaries · Rwanda district boundaries from geoBoundaries. Colors compare group patterns, not live household payments.</div>
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
            <div class="nisr-map-legend" id="mapMetricLegend" aria-live="polite">${this.renderMapMetricLegend()}</div>
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
            ${paymentChannels.map((channel, index) => `<tr><td><b>${this.escapeHtml(channel.name)}</b></td><td ${index === 0 ? 'style="color:var(--danger); font-weight:700;"' : ''}>${Number(channel.delay).toFixed(1)} days</td><td>${Number(channel.latePct)}%</td><td>${Number(channel.records).toLocaleString()}</td></tr>`).join("")}
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

  filterProduceByName(query) {
    this.state.searchQuery = (query || "").trim();
    const q = this.state.searchQuery.toLowerCase();
    const container = document.getElementById("produceGridContainer");
    if (container) {
      const cards = container.querySelectorAll(".vm-product-card");
      let visibleCount = 0;
      cards.forEach(card => {
        const text = (card.textContent || "").toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = "";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });
      let emptyMsg = document.getElementById("searchEmptyNotice");
      if (visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement("div");
          emptyMsg.id = "searchEmptyNotice";
          emptyMsg.style.cssText = "grid-column: 1 / -1; text-align: center; padding: 30px 16px; background: var(--card); border: 1px dashed var(--line); border-radius: 20px; margin: 12px 0;";
          emptyMsg.innerHTML = `<p style="margin:0; font-weight:600; color:var(--ink);">No produce found matching "${this.escapeHtml(query)}"</p><small style="color:var(--mute);">Try searching for beans, potatoes, tomatoes, rice, or dairy.</small>`;
          container.appendChild(emptyMsg);
        }
      } else if (emptyMsg) {
        emptyMsg.remove();
      }
    } else {
      this.render();
    }
  }

  setDistrictFilter(district) {
    this.state.selectedDistrictFilter = district;
    this.saveState();
    this.render();
  }

  setProduceSort(sortKey) {
    this.state.produceSort = sortKey;
    this.saveState();
    this.render();
  }

  setSellerFilter(sellerName) {
    this.state.selectedSellerFilter = sellerName;
    this.saveState();
    this.render();
  }

  clearSellerFilter() {
    this.state.selectedSellerFilter = null;
    this.state.selectedDistrictFilter = "all";
    this.state.searchQuery = "";
    this.saveState();
    this.render();
  }

  resetMarketFilters() {
    this.state.selectedSellerFilter = null;
    this.state.selectedDistrictFilter = "all";
    this.state.searchQuery = "";
    this.state.activeCategory = "All";
    this.state.produceSort = "distance";
    if (this.state.nearby) this.state.nearby.filterProximity = "all";
    this.saveState();
    this.render();
  }

  renderGroceryCatalog(mode) {
    const curDist = (this.state.nearby && this.state.nearby.userDistrict) || "Gasabo";
    const filter = (this.state.nearby && this.state.nearby.filterProximity) || "all";
    const selectedDist = this.state.selectedDistrictFilter || "all";
    const sellerFilterName = this.state.selectedSellerFilter;
    const sortKey = this.state.produceSort || "distance";
    const searchQuery = (this.state.searchQuery || "").trim().toLowerCase();

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

    const sellerFilter = this.state.sellerTypeFilter || "all";
    if (sellerFilter !== "all") items = items.filter(l => (l.sellerType || (l.farmerEmail === "umutima.market@vupbridge.rw" ? "trader" : "farmer")) === sellerFilter);

    if (searchQuery) {
      items = items.filter(l => {
        const kiny = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].kiny : "";
        const sector = l.sector || "";
        return l.food.toLowerCase().includes(searchQuery) ||
               kiny.toLowerCase().includes(searchQuery) ||
               l.farmer.toLowerCase().includes(searchQuery) ||
               l.district.toLowerCase().includes(searchQuery) ||
               sector.toLowerCase().includes(searchQuery);
      });
    }

    if (this.state.activeCategory && this.state.activeCategory !== "All") {
      items = items.filter(l => {
        const cat = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].category : "Staples";
        return cat.toLowerCase().includes(this.state.activeCategory.toLowerCase()) || 
               l.food.toLowerCase().includes(this.state.activeCategory.toLowerCase());
      });
    }

    if (selectedDist !== "all") {
      items = items.filter(l => l.district.toLowerCase() === selectedDist.toLowerCase());
    }

    if (sellerFilterName) {
      items = items.filter(l => l.farmer.toLowerCase().includes(sellerFilterName.toLowerCase()));
    }

    if (filter === "near") {
      items = items.filter(l => l.dynamicDistanceKm <= 5.0);
    } else if (filter === "district") {
      items = items.filter(l => l.isLocalDistrict);
    } else if (filter === "fast") {
      items = items.filter(l => l.dynamicDeliveryMins <= 20);
    }

    if (sortKey === "price_asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortKey === "price_desc") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortKey === "stock") {
      items.sort((a, b) => b.quantity - a.quantity);
    } else {
      items.sort((a, b) => a.dynamicDistanceKm - b.dynamicDistanceKm);
    }

    const hasActiveFilters = selectedDist !== "all" || sellerFilterName || searchQuery || (this.state.activeCategory && this.state.activeCategory !== "All") || filter !== "all";

    return `
      <!-- Market Toolbar: District Filter, Proximity Sort, and Active Filter Strip -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px; padding:10px 14px; background:var(--soft); border-radius:16px; border:1px solid var(--line);">
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:var(--ink);">
            <i class="bi bi-geo-alt"></i> District:
            <select class="form-control" style="padding:4px 8px; font-size:12px; min-height:32px; border-radius:8px;" onchange="window.app.setDistrictFilter(this.value)">
              <option value="all" ${selectedDist === 'all' ? 'selected' : ''}>All Rwanda (30 Districts)</option>
              ${NISR_DATA.districts.map(d => `<option value="${d.name}" ${selectedDist.toLowerCase() === d.name.toLowerCase() ? 'selected' : ''}>${d.name} (${d.province})</option>`).join("")}
            </select>
          </label>

          <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:var(--ink);">
            <i class="bi bi-sort-numeric-down"></i> Sort:
            <select class="form-control" style="padding:4px 8px; font-size:12px; min-height:32px; border-radius:8px;" onchange="window.app.setProduceSort(this.value)">
              <option value="distance" ${sortKey === 'distance' ? 'selected' : ''}>Nearest First</option>
              <option value="price_asc" ${sortKey === 'price_asc' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price_desc" ${sortKey === 'price_desc' ? 'selected' : ''}>Price: High to Low</option>
              <option value="stock" ${sortKey === 'stock' ? 'selected' : ''}>Highest Stock</option>
            </select>
          </label>
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          ${hasActiveFilters ? `
            <button class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11.5px; color:var(--accent);" onclick="window.app.resetMarketFilters()">
              <i class="bi bi-x-circle"></i> Reset Filters
            </button>
          ` : ''}
          <span class="tag g" style="font-size:11px; padding:3px 8px;">${items.length} crops listed</span>
        </div>
      </div>

      <div class="seller-filter-row" role="group" aria-label="Filter by seller" style="margin-bottom:12px;">
        ${[["all", "All sellers"], ["farmer", "Farmer Co-ops"], ["trader", "Market traders"]].map(([value, label]) => `<button type="button" class="vm-cat-pill ${(sellerFilter === value) ? "on" : ""}" onclick="window.app.state.sellerTypeFilter='${value}'; window.app.render();">${label}</button>`).join("")}
      </div>

      ${items.length === 0 ? `
        <div style="text-align:center; padding: 40px 20px; background:var(--card); border:1px solid var(--line); border-radius:24px; margin-bottom: 24px;">
          <svg viewBox="0 0 24 24" style="width:36px;height:36px;stroke:var(--mute);fill:none;margin-bottom:8px;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"/></svg>
          <h4 style="font-size: 16px; font-weight:700;">No farm produce found matching your filters</h4>
          <p style="font-size: 13px; color:var(--mute); margin-bottom: 14px;">Try resetting your filters or selecting "All Rwanda (30 Districts)".</p>
          <button class="btn btn-sm btn-primary" onclick="window.app.resetMarketFilters()">
            Show All Nationwide Produce (${this.state.listings.length} items)
          </button>
        </div>
      ` : `
        <div class="vm-grocery-grid" id="produceGridContainer">
          ${items.map(l => {
            const guide = this.getPriceGuide(l.food, l.price);
            const photo = l.photo || (HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].img : "assets/produce/dry_beans.jpg");
            
            let displayName = l.food;
            let kinyName = HARVEST_GALLERY[l.food] ? HARVEST_GALLERY[l.food].kiny : "";
            if (this.state.lang === "rw" && window.TRANSLATIONS?.rw?.produce?.[l.food]) {
              displayName = window.TRANSLATIONS.rw.produce[l.food].name;
            } else if (this.state.lang === "fr" && window.TRANSLATIONS?.fr?.produce?.[l.food]) {
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
                    ${l.farmer} · ${l.sector ? `${l.sector}, ` : ''}${l.district} <span class="seller-type-badge">${(l.sellerType || "farmer") === "trader" ? "Trader" : "Co-op"}</span>
                  </div>
                  <div class="vm-product-title">${displayName}</div>
                  <div class="vm-product-kiny">${kinyName || 'Fresh Harvest'}</div>
                  <div class="vm-product-stock">${l.quantity} ${l.unit || "kg"} available</div>

                  <div class="vm-product-bottom">
                    <div class="vm-price-wrap">
                      <b>${l.price.toLocaleString()}</b> <small>RWF/${l.unit || "kg"}</small>
                    </div>
                    <button class="vm-add-btn" onclick="window.app.${mode === 'credit' ? `startBuyProduce(${l.id}, 'credit')` : `addToCart(${l.id})`}" title="${mode === 'credit' ? 'Order with food credit' : 'Add to cart'}" aria-label="${mode === 'credit' ? 'Order' : 'Add'} ${this.escapeHtml(displayName)} ${mode === 'credit' ? 'with food credit' : 'to cart'}">
                      <i class="bi bi-cart-plus" aria-hidden="true"></i>
                    </button>
                  </div>

                  ${mode === 'credit' || this.state.roleCode === 'member' ? `
                    <button class="vm-credit-order-btn" onclick="window.app.startBuyProduce(${l.id}, 'credit')">
                      Order on Bridge Credit (0%)
                    </button>
                  ` : `
                    <button class="vm-credit-order-btn" style="background:var(--acc); color:#fff; border-color:transparent; margin-top:6px;" onclick="window.app.startBuyProduce(${l.id}, 'cash')">
                      Buy Direct (MoMo / Card)
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `}
    `;
  }

  toggleFavorite(id) {
    if (!this.state.user) {
      this.pickRole("shopper");
      this.toast("Log in or create an account to save favorites.", "info");
      return;
    }
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
    if (!this.state.user) {
      this.pickRole(mode === "credit" ? "member" : "shopper");
      this.toast("Log in or create an account to place an order.", "info");
      return;
    }
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
        this.toast(`This costs more than your available VUP amount (${remaining.toLocaleString()} RWF left).`, "danger");
        return;
      }
      this.executeOrder(listing, qty, total, "credit", "VUP amount owed", 0, "Free SACCO Pickup");
    } else this.addToCart(listingId);
  }

  openPhonePayModal(listing, qty, total) {
    const modal = document.getElementById("payModal");
    if (!modal) return;

    const gift = this.getAgasekeContributionAmount();
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const deliveryFee = isPickup ? 0 : 300;
    const grandTotal = total + gift + deliveryFee;

    const items = this.state.pendingCheckoutOrder?.items || [{ listing, qty }];
    const imgEl = document.getElementById("orderProduceImg");
    const badgeEl = document.getElementById("orderProduceBadge");
    if (imgEl) imgEl.src = listing.photo || "assets/produce/dry_beans.jpg";
    if (badgeEl) badgeEl.textContent = `${listing.food} · ${listing.farmer}`;

    document.getElementById("rcV2").textContent = items.length > 1 ? `${items.length} food products` : `${listing.food} (${qty} ${listing.unit || "kg"})`;
    document.getElementById("rfV2").textContent = `${total.toLocaleString()} RWF`;
    document.getElementById("rdModeV2").innerHTML = isPickup 
      ? this.t('checkoutDeliveryPickup') 
      : this.t('checkoutDeliveryMoto');
    document.getElementById("rgV2").textContent = gift ? `+${gift.toLocaleString()} RWF (Agaseke Relief)` : "0 RWF (Exempt)";
    document.getElementById("rtV2").textContent = `${grandTotal.toLocaleString()} RWF`;

    this.goPhonePage(2);
    modal.classList.add("open");
  }

  toggleCheckoutDelivery() {
    if (!this.state.nearby) this.state.nearby = {};
    this.state.nearby.deliveryOption = this.state.nearby.deliveryOption === 'pickup' ? 'moto' : 'pickup';
    if (this.state.pendingCheckoutOrder) {
      const p = this.state.pendingCheckoutOrder;
      const items = p.items || [{ listing: p.listing, qty: p.qty }];
      this.openPhonePayModal(items[0].listing, items[0].qty, p.total);
    } else this.render();
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
    this.state.selectedAccountIdx = -1;
    this.renderPaymentAccountsList();
    this.goPhonePage(6);
  }

  renderPaymentAccountsList() {
    const mlist = document.getElementById("mlV2");
    const flist = document.getElementById("flV2");
    if (!mlist || !flist) return;

    const methods = this.getAvailablePaymentAccounts();
    if (this.state.selectedAccountIdx >= methods.length) this.state.selectedAccountIdx = -1;
    mlist.innerHTML = methods.map((a, i) => `
      <button type="button" class="m-v2 ${i === this.state.selectedAccountIdx ? 'on' : ''} ${a.disabled ? 'disabled' : ''}" onclick="window.app.selectPaymentAccount(${i})" ${a.disabled ? 'disabled' : ''} aria-pressed="${i === this.state.selectedAccountIdx}">
        <span class="lg-v2" style="${a.color}"><i class="bi ${a.icon}" aria-hidden="true"></i></span>
        <span><b>${a.n}</b><small>${a.s}</small></span>
        <span class="am-v2">${a.credit ? `${a.available.toLocaleString()} RWF<small>available credit</small>` : a.wallet ? `${a.available.toLocaleString()} RWF<small>wallet balance</small>` : `<small>${a.demo ? 'Demo payment' : 'Pay in person'}</small>`}</span>
        <span class="r-v2" aria-hidden="true"></span>
      </button>
    `).join("");

    const selected = methods[this.state.selectedAccountIdx];
    const p = this.state.pendingCheckoutOrder;
    const isPickup = this.state.nearby?.deliveryOption === "pickup";
    const isCredit = selected?.credit;
    const gift = this.state.roleCode === "shopper" && !isCredit ? this.getAgasekeContributionAmount() : 0;
    const deliveryFee = isCredit || isPickup ? 0 : 300;
    const total = (Number(p?.total) || 0) + gift + deliveryFee;
    const payButton = document.getElementById("goBtnV2");
    const payLabel = document.getElementById("ppV2");
    if (payLabel) payLabel.textContent = selected ? (selected.credit ? `Use ${total.toLocaleString()} RWF credit` : selected.cash ? `Place cash order · ${total.toLocaleString()} RWF` : `Pay ${total.toLocaleString()} RWF`) : "Choose a payment method";
    flist.innerHTML = `
      <div class="bal-v2" style="font-weight:700; font-size:11px; margin-top:4px;">
        ${this.state.lang === 'rw' ? "Ongeraho amafaranga y'igerageza / Demo top-up:" : "Add demo money to selected account:"}
      </div>
      <div class="chips-v2">
        <button type="button" class="chip-v2" onclick="window.app.addDemoMoney(1500)">+ RWF 1,500</button>
        <button type="button" class="chip-v2" onclick="window.app.addDemoMoney(10000)">+ RWF 10,000</button>
        <button type="button" class="chip-v2" onclick="window.app.addDemoMoney(50000)">+ RWF 50,000</button>
        <button type="button" class="chip-v2" onclick="window.app.addDemoMoney(100000)">+ RWF 100,000</button>
      </div>
      <p class="payment-demo-note"><i class="bi bi-info-circle" aria-hidden="true"></i> ${selected?.cash ? "Pay the seller when your food arrives or when you collect it." : "Digital payments are simulated here. The app is not connected to MoMo, Airtel Money, SACCO, or a bank."}</p>
      <div id="payErrorV2" role="status" aria-live="polite"></div>
    `;

    if (p) {
      const giftEl = document.getElementById("rgV2");
      const deliveryEl = document.getElementById("rdModeV2");
      const totalEl = document.getElementById("rtV2");
      if (giftEl) giftEl.textContent = gift ? `+${gift.toLocaleString()} RWF (Agaseke Relief)` : "0 RWF (Exempt)";
      if (deliveryEl) deliveryEl.textContent = selected?.credit ? "SACCO pickup · Free" : isPickup ? "SACCO pickup · Free" : "Moto delivery · 300 RWF";
      if (totalEl) totalEl.textContent = `${total.toLocaleString()} RWF`;
    }
  }

  getAvailablePaymentAccounts() {
    const pickup = this.state.nearby?.deliveryOption === "pickup";
    const custom = this.state.demoCustomBalances || {};
    const accounts = [
      { n: "MTN MoMo", s: "Mobile money · simulated", icon: "bi-phone", color: "background:#ffcb05;color:#111", l: "MTN", by: "MTN MoMo (demo)", demo: true, available: 500000 + (Number(custom["MTN MoMo"]) || 0) },
      { n: "Airtel Money", s: "Mobile money · simulated", icon: "bi-phone", color: "background:#e40000;color:#fff", l: "Airtel", by: "Airtel Money (demo)", demo: true, available: 150000 + (Number(custom["Airtel Money"]) || 0) },
      { n: "Bank or SACCO", s: "Account payment · simulated", icon: "bi-bank", color: "background:#137653;color:#fff", l: "BANK", by: "Bank / SACCO (demo)", demo: true, available: 320000 + (Number(custom["Bank or SACCO"]) || 0) },
      { n: pickup ? "Cash at SACCO pickup" : "Cash on delivery", s: pickup ? "Pay when you collect your food" : "Pay when your food arrives", icon: pickup ? "bi-shop" : "bi-cash", color: "background:#e9f5ed;color:#176b48", l: "CASH", by: pickup ? "Cash at pickup" : "Cash at delivery", cash: true }
    ];
    if (this.state.roleCode === "member") {
      const available = this.getRemainingCredit();
      accounts.unshift({ n: "VUP food credit", s: "Use the unpaid VUP amount recorded for you · 0% interest", icon: "bi-wallet2", color: "background:#0e635e;color:#fff", l: "VUP", by: "VUP amount owed", credit: true, available, disabled: available <= 0 });
      const wallet = Number(this.state.currentUser?.vupWalletBalance || 0);
      if (wallet > 0) accounts.unshift({ n: "My VUP food wallet", s: "Use money left from a recorded VUP payment", icon: "bi-wallet", color: "background:#e2f2ec;color:#176b48", l: "VUP", by: "VUP food wallet", wallet: true, available: wallet });
    }
    return accounts;
  }

  addDemoMoney(amount) {
    if (!amount || amount <= 0) return;
    if (!this.state.demoCustomBalances) this.state.demoCustomBalances = {};
    const accounts = this.getAvailablePaymentAccounts();
    const selIdx = this.state.selectedAccountIdx >= 0 ? this.state.selectedAccountIdx : 0;
    const acc = accounts[selIdx] || accounts[0];

    if (acc.wallet || (this.state.roleCode === "member" && this.state.currentUser)) {
      this.state.currentUser.vupWalletBalance = (Number(this.state.currentUser.vupWalletBalance) || 0) + amount;
      const family = (this.state.users?.member || []).find(user => user.email === this.state.currentUser.email);
      if (family) family.vupWalletBalance = this.state.currentUser.vupWalletBalance;
    } else {
      this.state.demoCustomBalances[acc.n] = (Number(this.state.demoCustomBalances[acc.n]) || 0) + amount;
    }
    this.toast(`Added +${amount.toLocaleString()} RWF to ${acc.n} demo balance`, "success");
    this.renderPaymentAccountsList();
  }

  selectPaymentAccount(i) {
    if (this.getAvailablePaymentAccounts()[i]?.disabled) return;
    this.state.selectedAccountIdx = i;
    this.renderPaymentAccountsList();
  }

  processPhonePayment() {
    const p = this.state.pendingCheckoutOrder;
    if (!p) return;

    const acc = this.getAvailablePaymentAccounts()[this.state.selectedAccountIdx];
    if (!acc || acc.disabled) { this.toast("Choose an available payment method first.", "info"); return; }
    const isPickup = this.state.nearby && this.state.nearby.deliveryOption === "pickup";
    const isCredit = Boolean(acc.credit), isCash = Boolean(acc.cash);
    const deliveryFee = isCredit || isPickup ? 0 : 300;
    const gift = this.state.roleCode === "shopper" && !isCredit ? this.getAgasekeContributionAmount() : 0;
    const grandTotal = p.total + gift + deliveryFee;
    const items = p.items || [{ listing: p.listing, qty: p.qty }];
    if (items.some(line => !line.listing || line.qty <= 0 || line.qty > line.listing.quantity)) { this.toast("An item is no longer available in that quantity. Review your cart.", "warning"); this.closePayFlow(); return; }

    const availableCredit = this.getRemainingCredit();
    if (isCredit && grandTotal > availableCredit) {
      const errEl = document.getElementById("payErrorV2");
      if (errEl) errEl.textContent = `You have ${availableCredit.toLocaleString()} RWF of VUP food credit left. Remove some food or choose another payment method.`;
      return;
    }
    const availableBalance = Number(this.state.currentUser?.vupWalletBalance || 0);
    if (acc.wallet && availableBalance < grandTotal) {
      const errEl = document.getElementById("payErrorV2");
      if (errEl) errEl.textContent = `Insufficient balance (${availableBalance.toLocaleString()} RWF).`;
      return;
    }

    if (acc.wallet) {
      this.state.currentUser.vupWalletBalance = Math.max(0, availableBalance - grandTotal);
      const family = (this.state.users?.member || []).find(user => user.email === this.state.currentUser.email);
      if (family) family.vupWalletBalance = this.state.currentUser.vupWalletBalance;
    }

    const deliveryType = isCredit || isPickup ? "Free SACCO Hub Pickup" : "Express Moto Drop (15-25 min)";
    const paidBy = isCredit ? "VUP amount owed" : isCash ? (isPickup ? "Cash at pickup" : "Cash at delivery") : acc.by;
    let assignedGift = 0;
    const createdOrders = items.map((line, index) => {
      const itemTotal = Math.round(line.qty * line.listing.price);
      const itemGift = isCredit ? 0 : index === items.length - 1 ? gift - assignedGift : Math.round(gift * itemTotal / p.total);
      assignedGift += itemGift;
      return this.executeOrder(line.listing, line.qty, itemTotal, isCredit ? "credit" : "cash", paidBy, itemGift, deliveryType, index === 0 ? deliveryFee : 0);
    });
    if (gift && !isCash) { this.state.pool.balance += gift; this.state.pool.totalGiftsIn += gift; }
    const newOrder = createdOrders[0];
    this.state.cart = [];
    this.state.pendingCheckoutOrder = null;
    this.state.selectedAccountIdx = -1;
    this.addNotification(isCash ? `Your order is placed. Pay ${grandTotal.toLocaleString()} RWF when you receive your food.` : isCredit ? `Your order used ${grandTotal.toLocaleString()} RWF of automatic VUP food credit.` : `Your demo payment of ${grandTotal.toLocaleString()} RWF was recorded. No real money was moved.`, { targetEmail: this.state.currentUser.email, type: "payment" });
    this.saveState();
    this.renderHeaderNavActions();

    const payBtn = document.getElementById("goBtnV2");
    if (payBtn) payBtn.classList.add("busy");

    setTimeout(() => {
      if (payBtn) payBtn.classList.remove("busy");
      const vtEl = document.getElementById("vtV2");
      if (vtEl) vtEl.textContent = acc.l || 'PAY';
      this.goPhonePage(3);

      const t3 = document.getElementById("t3V2");
      const t3s = document.getElementById("t3sV2");
      if (t3) t3.textContent = isCash ? "Order placed" : isCredit ? "Food credit used" : "Demo payment recorded";
      if (t3s) t3s.textContent = isCash ? "Pay when your food arrives or when you collect it." : "This is a prototype. No real money was moved.";

      setTimeout(() => {
        if (t3) t3.textContent = isCash ? "Payment due at delivery" : isCredit ? "Credit issued" : "Demo payment recorded";
        if (t3s) t3s.textContent = "";
      }, 450);

      setTimeout(() => {
        const pdV2 = document.getElementById("pdV2");
        const pdLabelV2 = document.getElementById("pdLabelV2");
        const pdFulV2 = document.getElementById("pdFulV2");
        if (pdV2) pdV2.textContent = `${grandTotal.toLocaleString()} RWF`;
        if (pdLabelV2) pdLabelV2.textContent = isCash ? "Pay when you get your food" : isCredit ? "Paid with VUP food credit" : "Demo payment recorded";
        if (pdFulV2) pdFulV2.textContent = deliveryType;
        this.goPhonePage(4);

        const recNum = document.getElementById("recNumV2");
        if (recNum) recNum.textContent = `#IB-2026-${newOrder.id}`;
        const recDate = document.getElementById("recDateV2");
        if (recDate) recDate.textContent = `${new Date().toLocaleDateString('en-GB')} ${newOrder.date}`;
        const recCust = document.getElementById("recCustV2");
        if (recCust) recCust.textContent = newOrder.buyerName.toUpperCase();
        const recSeller = document.getElementById("recSellerV2");
        if (recSeller) recSeller.textContent = newOrder.farmer.toUpperCase();
        const recHub = document.getElementById("recHubV2");
        if (recHub) recHub.textContent = newOrder.hub.toUpperCase();
        const recItem = document.getElementById("recItemV2");
        if (recItem) recItem.textContent = items.length > 1 ? `${items.length} food products · ${items.map(line => `${line.listing.food} (${line.qty} ${line.listing.unit || "kg"})`).join(", ")}` : `${newOrder.food} (${newOrder.kg} ${newOrder.unit || "kg"})`;
        const recCost = document.getElementById("recItemCostV2");
        if (recCost) recCost.textContent = `${p.total.toLocaleString()} RWF`;
        const recDel = document.getElementById("recDelV2");
        if (recDel) recDel.textContent = deliveryFee ? "300 RWF (Moto)" : "FREE (SACCO)";
        const recGift = document.getElementById("recGiftV2");
        if (recGift) recGift.textContent = gift ? `+${gift.toLocaleString()} RWF` : "None";
        const recTot = document.getElementById("recTotV2");
        if (recTot) recTot.textContent = `${grandTotal.toLocaleString()} RWF`;
        const recPayBy = document.getElementById("recPayByV2");
        if (recPayBy) recPayBy.textContent = isCash ? `PAY BY ${paidBy}` : isCredit ? "VUP FOOD CREDIT · 0%" : `DEMO PAID BY ${acc.by}`;
        const recApproval = document.getElementById("recApprovalV2");
        if (recApproval) recApproval.textContent = isCash ? "PAYMENT DUE" : isCredit ? "AUTO ISSUED" : "DEMO ONLY";
        const recStamp = document.getElementById("recStampV2");
        if (recStamp) recStamp.innerHTML = isCash ? "ORDER<small>PAY AT DELIVERY</small>" : isCredit ? "CREDIT<small>AUTO ISSUED</small>" : "DEMO<small>NO REAL MONEY</small>";
      }, 900);
    }, 550);
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
      unit: listing.unit || "kg",
      total: total,
      mode: mode,
      buyerRole: this.state.role,
      buyerName: this.state.currentUser.name || "Customer",
      buyerEmail: this.state.currentUser.email || "user@vupbridge.rw",
      district: listing.district,
      hub: listing.hub || (this.state.nearby ? this.state.nearby.userLocation : "Kimironko Hub"),
      status: "Placed",
      creditStatus: mode === "credit" ? "approved" : "n/a",
      approvedBy: mode === "credit" ? "System (automatic)" : undefined,
      approvedDate: mode === "credit" ? new Date().toLocaleDateString("en-GB") : undefined,
      paymentStatus: paidBy === "Cash at delivery" || paidBy === "Cash at pickup" ? "due" : mode === "credit" ? "due_from_vup" : "paid",
      farmer: listing.farmer,
      farmerEmail: listing.farmerEmail || "farmer@vupbridge.rw",
      paidBy: paidBy,
      paymentMethod: paidBy === "pending_approval" ? (this.state.currentUser.paymentMethod || "MTN Mobile Money") : paidBy,
      gift: gift,
      deliveryType: deliveryType,
      deliveryFee: deliveryFee,
      repaid: false,
      date: new Date().toLocaleString("sv-SE")
    };

    this.state.orders.unshift(newOrder);
    this.addNotification(`New order #${newOrder.id}: ${newOrder.food} · ${newOrder.kg} kg.`, { targetEmail: newOrder.buyerEmail, type: "order" });
    this.addNotification(`New order #${newOrder.id} for ${newOrder.food} is ready to process.`, { targetEmail: newOrder.farmerEmail, type: "order" });
    this.addNotification(`Order #${newOrder.id} was placed and is ready for review.`, { targetRoles: ["planner", "admin"], type: "order" });

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
        status: newOrder.paymentStatus === "due" ? "pending" : "completed",
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
          status: newOrder.paymentStatus === "due" ? "pending" : "completed",
          paymentMethod: paidBy,
          createdBy: newOrder.buyerName
        });
      }
    } else if (mode === "credit") {
      this.state.ledger.unshift({
        id: this.state.ledger.length + 1,
        date: newOrder.date,
        type: "credit_draw",
        from: "VUP amount owed",
        to: newOrder.buyerName,
        amount: total,
        link: `Order #${newOrder.id}`,
        status: "open",
        paymentMethod: "VUP food credit",
        createdBy: "Automatic credit"
      });
    }

    this.saveState();
    this.render();

    if (mode === "credit") {
      this.toast(`Order #${newOrder.id} placed. Food credit was issued automatically from your recorded VUP amount.`, "success");
    } else if (newOrder.paymentStatus === "due") {
      this.toast(`Order #${newOrder.id} placed. Pay ${total + deliveryFee + gift} RWF when you receive your food.`, "success");
    } else {
      this.toast(`Demo payment for order #${newOrder.id} recorded. No real money was moved.`, "success");
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
      if (order.paymentStatus === "due") {
        order.paymentStatus = "paid";
        (this.state.ledger || []).filter(entry => entry.link === `Order #${orderId}` || String(entry.link || "").startsWith(`Order #${orderId} (`)).forEach(entry => { entry.status = "completed"; });
        if (Number(order.gift) > 0) {
          this.state.pool.balance += Number(order.gift);
          this.state.pool.totalGiftsIn += Number(order.gift);
        }
      }
      this.toast(`Order #${orderId} marked delivered. ${order.paymentMethod === "Cash at delivery" || order.paymentMethod === "Cash at pickup" ? "Cash payment recorded." : "Demo payment was already recorded."}`, "success");
    }

    this.saveState();
    this.render();
  }

  simulateVupRepayment() {
    if (this.state.roleCode !== "admin") { this.toast("Only an admin can record a VUP payment.", "warning"); return; }
    this.toast("Enter the confirmed amount in Record a VUP payment. The app will apply it to open food credit first.", "info");
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
      sellerType: this.state.roleCode === "trader" ? "trader" : "farmer",
      unit: HARVEST_GALLERY[food]?.unit || "kg",
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
    this.toast(`Listed ${quantity} ${newListing.unit} of ${food} at ${price.toLocaleString()} RWF per ${newListing.unit}.`, "success");
  }

  onProduceSelected(foodName) {
    this.state.newListingFood = foodName;
    const unit = HARVEST_GALLERY[foodName]?.unit || "kg";
    document.querySelectorAll(".listing-unit-label").forEach(el => el.textContent = unit);
    document.querySelectorAll(".listing-unit-placeholder").forEach(el => el.textContent = unit);
    if (HARVEST_GALLERY[foodName]) {
      this.setListingPhoto(HARVEST_GALLERY[foodName].img);
    }
    this.updatePriceGuidePreview();
  }

  selectFarmerCropPreset(cropName) {
    this.state.newListingFood = cropName;
    const foodEl = document.getElementById("new_food");
    if (foodEl) foodEl.value = cropName;
    const info = HARVEST_GALLERY[cropName];
    if (info) {
      const priceEl = document.getElementById("new_price");
      if (priceEl && info.retailPrice) priceEl.value = info.retailPrice;
      this.onProduceSelected(cropName);
    }
    this.saveState();
  }

  toggleFarmerTaxExemption(isExempt) {
    this.state.farmerTaxExempt = !!isExempt;
    this.saveState();
    this.updatePriceGuidePreview();
  }

  updatePriceGuidePreview() {
    const el = document.getElementById("priceGuidePreview");
    const foodEl = document.getElementById("new_food");
    const priceEl = document.getElementById("new_price");
    if (!foodEl || !priceEl) return;
    const food = foodEl.value;
    const price = parseFloat(priceEl.value) || 0;
    const guide = this.getPriceGuide(food, price);
    const unit = HARVEST_GALLERY[food]?.unit || "kg";
    if (el) {
      el.innerHTML = `Reference price: <b>${guide.median.toLocaleString()} RWF/${unit}</b> · <span class="tag ${guide.class}">${guide.label}</span>`;
    }

    const isExempt = !!this.state.farmerTaxExempt;
    const tax = isExempt ? 0 : Math.round(price * 0.02);
    const net = Math.max(0, price - tax);

    const grossEl = document.getElementById("calcGrossPrice");
    const taxEl = document.getElementById("calcTaxLevy");
    const netEl = document.getElementById("calcNetPayout");
    if (grossEl) grossEl.textContent = `${price.toLocaleString()} RWF`;
    if (taxEl) {
      taxEl.textContent = isExempt ? "0 RWF (Exempt)" : `${tax.toLocaleString()} RWF`;
      taxEl.style.color = isExempt ? "var(--mute)" : "var(--accent)";
    }
    if (netEl) netEl.textContent = `${net.toLocaleString()} RWF`;
  }

  getPriceGuide(food, price) {
    const median = NISR_DATA.foodPrices[food] || (HARVEST_GALLERY[food] ? HARVEST_GALLERY[food].retailPrice : 600);
    const ratio = price / median;
    if (ratio < 0.85) return { label: "Fair Price (Low)", class: "pill-fair", median };
    if (ratio > 1.15) return { label: "High Price", class: "pill-high", median };
    return { label: "Median Benchmark", class: "pill-neutral", median };
  }

  calculateCreditLimit(u = this.state.currentUser) {
    u ||= {};
    return Math.max(0, Number(u.governmentAmountOwed) || 0);
  }

  getOutstandingCredit(email = this.state.currentUser?.email) {
    return this.state.orders
      .filter(o => o.mode === "credit" && !o.repaid && o.status !== "Cancelled" && o.creditStatus !== "written_off" && (!email || o.buyerEmail === email))
      .reduce((sum, o) => sum + Math.max(0, Number(o.total) - Number(o.repaidAmount || 0)), 0);
  }

  getRemainingCredit(user = this.state.currentUser) {
    const limit = this.calculateCreditLimit(user);
    const out = this.getOutstandingCredit(user?.email);
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
    if (!['priority', 'delay', 'poverty'].includes(metric)) return;
    this.mapMetric = metric;
    const legend = document.getElementById("mapMetricLegend");
    if (legend) legend.innerHTML = this.renderMapMetricLegend();
    this.initMap();
  }

  renderMapMetricLegend() {
    const legends = {
      priority: { title: "Prototype support priority score", stops: [["#22c55e", "Lower"], ["#d97706", "Medium"], ["#b91c1c", "Higher"]] },
      delay: { title: "Average reported wait", stops: [["#22c55e", "Under 9 days"], ["#d97706", "9–10.9 days"], ["#b91c1c", "11+ days"]] },
      poverty: { title: "Households below poverty line", stops: [["#c084fc", "Under 35%"], ["#a855f7", "35–44.9%"], ["#7e22ce", "45% or more"]] }
    };
    const legend = legends[this.mapMetric] || legends.priority;
    return `<strong>${legend.title}</strong><span>${legend.stops.map(([color, label]) => `<span class="nisr-map-legend-key"><i style="--legend-color:${color}"></i>${label}</span>`).join("")}</span>`;
  }

  initPlannerVisuals() {
    setTimeout(() => {
      this.initMap();
    }, 150);
  }

  initMap() {
    const container = document.getElementById("mapContainer");
    if (!container) return;
    delete container.dataset.mapFallback;

    if (window.L && window.RWANDA_DISTRICTS_GEOJSON) {
      try {
        if (this.map) {
          this.map.remove();
          this.map = null;
        }

        this.map = L.map('mapContainer', { zoomControl: true, attributionControl: false, scrollWheelZoom: false, keyboard: true });

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
            const district = NISR_DATA.districts.find(item => item.name.toLowerCase() === name.toLowerCase());
            const metricLabel = this.mapMetric === "priority" ? "Prototype support priority" : this.mapMetric === "delay" ? "Average wait" : "Poverty rate";
            const metricValue = district ? this.mapMetric === "priority" ? `${district.priority.toFixed(1)} / 100` : this.mapMetric === "delay" ? `${district.delay.toFixed(1)} days` : `${district.poverty.toFixed(1)}%` : "No NISR summary";
            layer.bindTooltip(`<b>${this.escapeHtml(name)}</b><br>${metricLabel}: ${metricValue}${district ? `<br>${district.records.toLocaleString()} survey records` : ""}`, { sticky: true });
            layer.on({
              click: () => this.selectDistrict(name),
              mouseover: (e) => e.target.setStyle({ weight: 3, color: '#1b6b4a', fillOpacity: 0.9 }),
              mouseout: (e) => this.mapLayer.resetStyle(e.target)
            });
          }
        }).addTo(this.map);
        const bounds = this.mapLayer.getBounds();
        if (bounds.isValid()) this.map.fitBounds(bounds, { padding: [12, 12] });
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
    this.downloadFile(`VUPBridge_NISR_tables_${today}.csv`, `\uFEFF${rows.map(r => r.map(value => this.csvCell(value)).join(',')).join('\r\n')}`, 'text/csv;charset=utf-8');
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
      ...this.getPublishedTimeliness().flatMap(row => [
        ["Official NISR published latest-payment timing", `${row.programme}: on time`, row.onTime, "%", "People involved in programme", `${row.table}, p. ${row.page}; ${window.NISR_PUBLISHED_DATA.title}`],
        ["Official NISR published latest-payment timing", `${row.programme}: 1–10 days late`, row.days1to10, "%", "People involved in programme", `${row.table}, p. ${row.page}; ${window.NISR_PUBLISHED_DATA.title}`],
        ["Official NISR published latest-payment timing", `${row.programme}: 11–20 days late`, row.days11to20, "%", "People involved in programme", `${row.table}, p. ${row.page}; ${window.NISR_PUBLISHED_DATA.title}`],
        ["Official NISR published latest-payment timing", `${row.programme}: more than 20 days late`, row.over20, "%", "People involved in programme", `${row.table}, p. ${row.page}; ${window.NISR_PUBLISHED_DATA.title}`]
      ]),
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
      ["Report", "Prototype. Fake money. No real payment is moved.", `Activity period: ${report.period.label}`, `Generated: ${new Date().toLocaleString("en-GB")}`],
      ["Order ID", "Date", "Buyer", "Buyer role", "District", "Food", "Quantity", "Unit", "Payment type", "Food amount RWF", "Delivery fee RWF", "Pool gift RWF", "Order total RWF", "Order status", "Payment status", "Payment method", "Repaid"],
      ...report.transactions.map(order => [
        order.id, this.getOrderDateLabel(order.date), order.buyerName || "Demo buyer", order.buyerRole || "", order.district || "",
        order.food || "", order.kg || "", order.unit || "kg", order.mode === "credit" ? "VUP food credit" : order.paymentStatus === "due" ? "Cash on arrival" : "Cash / demo",
        Number(order.total) || 0, Number(order.deliveryFee) || 0, Number(order.gift) || 0,
        (Number(order.total) || 0) + (Number(order.deliveryFee) || 0) + (Number(order.gift) || 0),
        order.status || "", order.paymentStatus || (order.mode === "credit" ? "due from VUP" : "paid"),
        order.paymentMethod || order.paidBy || "Not recorded", order.repaid ? "Yes" : "No"
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
    const period = this.getUserActivityPeriod();
    const rows = this.getUserActivityOrders().filter(order => { const date = this.parseOrderDate(order.date); return date && date >= period.start && date <= period.end; });
    const ledgerRows = this.getUserActivityLedger();

    const csvContent = [
      ['Prototype. Fake money. No real payment is moved.', `Activity period: ${period.label}`, `Account: ${email}`, `Created: ${new Date().toLocaleString("en-GB")}`].map(value=>this.csvCell(value)).join(','),
      ...(this.state.roleCode === "member" ? [["VUP work record", `Days worked: ${Number(this.state.currentUser.daysWorked || 0)}`, `Government amount owed: ${Number(this.state.currentUser.governmentAmountOwed || 0)} RWF`, `Open food credit: ${this.getOutstandingCredit(email)} RWF`, `Credit available: ${this.getRemainingCredit(this.state.currentUser)} RWF`, "Available credit = amount owed - open credit"].map(value=>this.csvCell(value)).join(",")] : []),
      ['Record type','ID','Date','Food or payment','Quantity','Unit','Amount RWF','Delivery fee RWF','Pool gift RWF','Type','Order status','Payment status','Payment method'].map(value=>this.csvCell(value)).join(','),
      ...rows.map(order => ['Order',order.id, this.getOrderDateLabel(order.date || today), order.food || 'Fresh staple', Number(order.kg)||0, order.unit || "kg", Number(order.total)||0, Number(order.deliveryFee)||0, Number(order.gift)||0, order.mode, order.status, order.paymentStatus || (order.mode === "credit" ? "due from VUP" : "paid"), order.paymentMethod || order.paidBy || 'Not recorded'].map(value=>this.csvCell(value)).join(',')),
      ...ledgerRows.map(entry => ['Money record',entry.link || entry.id,this.getOrderDateLabel(entry.date || today),`${entry.from || ""} → ${entry.to || ""}`,Number(entry.amount)||0,entry.type,entry.status,entry.paymentMethod].map(value=>this.csvCell(value)).join(','))
    ].join('\n');

    this.downloadFile(`VUPBridge_${role}_activity_${today}.csv`, `\uFEFF${csvContent}`, 'text/csv;charset=utf-8');
    this.toast(`${rows.length + ledgerRows.length} activity records for ${period.label} downloaded.`, 'success');
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
    const rows = [["Dataset", "Programme / group", "Measure", "Value", "Unit", "Sample or scope", "Source and notes"]];
    const add = (dataset, name, metric, value, unit, sample, note) => rows.push([dataset, name, metric, value, unit, sample, note]);
    const sampleNote = count => count < 25
      ? `n=${count}; suppressed in summary`
      : count < 100
        ? `n=${count}; small-sample caution, not a precision guarantee`
        : `n=${count}; no small-sample warning, not a precision guarantee`;

    const official = window.NISR_PUBLISHED_DATA || {};
    (official.timeliness || []).forEach(item => {
      const source = `${official.title || "NISR EICV7 VUP Thematic Report"}, ${item.table}, p. ${item.page}; latest reported payment`;
      [["On time", item.onTime], ["1–10 days late", item.days1to10], ["11–20 days late", item.days11to20], ["More than 20 days late", item.over20]]
        .forEach(([band, value]) => add("Official NISR published result", item.programme, band, value, "%", "People involved in programme", source));
    });

    add("Exploratory project summary", "All programme rows", "Average delay", NISR_DATA.overall.averageDelayDays, "days", NISR_DATA.overall.totalBeneficiaries, "Prepared, early, unweighted project estimate; not the official NISR published statistic.");
    add("Exploratory project summary", "All programme rows", "Average delay over 7 days", NISR_DATA.overall.pctOver7DaysLate, "%", NISR_DATA.overall.totalBeneficiaries, "Prepared project estimate; definition and weights need review.");
    (NISR_DATA.programmes || []).forEach(item => {
      add("Exploratory programme summary", item.name, "Average delay", item.delay, "days", item.records, "Prepared, early, unweighted project estimate; not the official NISR published statistic.");
      add("Exploratory programme summary", item.name, "Records over 7 days", item.latePct, "%", item.records, "Prepared project estimate; definition and weights need review.");
    });
    (NISR_DATA.provinces || []).forEach(item => {
      add("Exploratory province summary", item.name, "Average delay", item.delay, "days", item.records, "Prepared, early, unweighted project estimate; not the official NISR published statistic.");
      add("Exploratory province summary", item.name, "Records over 7 days", item.latePct, "%", item.records, "Prepared project estimate; definition and weights need review.");
    });
    Object.entries(NISR_DATA.groups || {}).forEach(([group, items]) => items.forEach(item => {
      const suppressed = item.records < 25;
      add("Exploratory group summary", `${group}: ${item.name}`, "Average delay", suppressed ? "" : item.delay, "days", sampleNote(item.records), "Prepared project estimate; not an official NISR published statistic.");
      add("Exploratory group summary", `${group}: ${item.name}`, "Records over 7 days", suppressed ? "" : item.latePct, "%", sampleNote(item.records), "Prepared project estimate; definition and weights need review.");
    }));
    (NISR_DATA.districts || []).forEach(item => {
      const suppressed = item.records < 25;
      add("Exploratory district map input", item.name, "Average delay", suppressed ? "" : item.delay, "days", sampleNote(item.records), `${item.province}; prepared project estimate, not official NISR published statistic.`);
      add("Exploratory district map input", item.name, "Priority score", suppressed ? "" : item.priority, "prototype points", sampleNote(item.records), "Rule-based prototype score, not NISR policy or a validated prediction.");
    });
    Object.entries(NISR_DATA.hotspots || {}).forEach(([programme, provinces]) => Object.entries(provinces).filter(([, item]) => item).forEach(([province, item]) => {
      const suppressed = item.records < 25;
      add("Exploratory programme/province summary", `${programme}: ${province}`, "Average delay", suppressed ? "" : item.delay, "days", sampleNote(item.records), "Prepared project estimate, not official NISR published statistic.");
      add("Exploratory programme/province summary", `${programme}: ${province}`, "Records over 7 days", suppressed ? "" : item.latePct, "%", sampleNote(item.records), "Prepared project estimate; definition and weights need review.");
    }));
    Object.entries(NISR_DATA.foodPrices || {}).forEach(([food, item]) => add(
      "Exploratory food-price guide", food, "Reference price", item.median, `RWF per ${item.unit}`, "", `${item.category}; prepared price input, not reproduced from raw survey module.`
    ));
    return rows;
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
