import os, re

with open("js/app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update HARVEST_GALLERY and add RWANDA_FOOD_HUBS
old_gallery_pattern = r"const HARVEST_GALLERY = \{.*?\n\};\n"
new_gallery = """const HARVEST_GALLERY = {
  "Dry beans": {
    img: "assets/produce/dry_beans.jpg",
    icon: "🫘",
    kiny: "Ibihyimbo",
    category: "Pulses",
    retailPrice: 920,
    hub: "Gatore Food Bank & SACCO Point",
    distanceKm: 0.9,
    deliveryMins: 15
  },
  "Irish potato": {
    img: "assets/produce/irish_potato.jpg",
    icon: "🥔",
    kiny: "Ibirayi",
    category: "Staples",
    retailPrice: 520,
    hub: "Mukamira Highland Depot",
    distanceKm: 1.4,
    deliveryMins: 18
  },
  "Sweet potato": {
    img: "assets/produce/sweet_potato.jpg",
    icon: "🍠",
    kiny: "Ibijumba",
    category: "Staples",
    retailPrice: 320,
    hub: "Gisagara Agro-Hub",
    distanceKm: 2.5,
    deliveryMins: 25
  },
  "Tomato": {
    img: "assets/produce/tomato.jpg",
    icon: "🍅",
    kiny: "Inyanya",
    category: "Vegetables",
    retailPrice: 620,
    hub: "Kimironko Farmers Hub & SACCO",
    distanceKm: 1.1,
    deliveryMins: 12
  },
  "Cooking banana": {
    img: "assets/produce/cooking_banana.jpg",
    icon: "🍌",
    kiny: "Ibitoki",
    category: "Staples",
    retailPrice: 380,
    hub: "Nyabugogo Direct Agro-Depot",
    distanceKm: 2.8,
    deliveryMins: 20
  },
  "Onion": {
    img: "assets/produce/red_onion.jpg",
    icon: "🧅",
    kiny: "Ibitunguru",
    category: "Vegetables",
    retailPrice: 1950,
    hub: "Kimironko Farmers Hub & SACCO",
    distanceKm: 1.2,
    deliveryMins: 15
  },
  "Local rice": {
    img: "assets/produce/local_rice.jpg",
    icon: "🍚",
    kiny: "Umuceri",
    category: "Grains",
    retailPrice: 1380,
    hub: "Bugesera Rice Depot",
    distanceKm: 3.2,
    deliveryMins: 30
  },
  "Corn flour (factory)": {
    img: "assets/produce/fresh_corn.jpg",
    icon: "🌽",
    kiny: "Ifu y'Ibigori",
    category: "Grains",
    retailPrice: 960,
    hub: "Nyabugogo Direct Agro-Depot",
    distanceKm: 2.8,
    deliveryMins: 25
  },
  "Avocado": {
    img: "assets/produce/avocado.jpg",
    icon: "🥑",
    kiny: "Avoka",
    category: "Fruits",
    retailPrice: 350,
    hub: "Kimironko Farmers Hub & SACCO",
    distanceKm: 1.0,
    deliveryMins: 15
  },
  "Spinach": {
    img: "assets/produce/spinach.jpg",
    icon: "🥬",
    kiny: "Dodo / Imbwija",
    category: "Vegetables",
    retailPrice: 300,
    hub: "Kimironko Farmers Hub & SACCO",
    distanceKm: 0.8,
    deliveryMins: 10
  }
};

const RWANDA_FOOD_HUBS = [
  { id: "all", name: "All Rwanda (All Hubs)", district: "National", province: "All", distance: 0, deliveryMins: 0, stock: "3,800 kg", icon: "🇷🇼" },
  { id: "kimironko", name: "Kimironko Farmers Hub & SACCO", district: "Gasabo", province: "Kigali", distance: 1.2, deliveryMins: 15, stock: "450 kg", icon: "🏪" },
  { id: "nyabugogo", name: "Nyabugogo Direct Agro-Depot", district: "Nyarugenge", province: "Kigali", distance: 2.8, deliveryMins: 25, stock: "680 kg", icon: "🏢" },
  { id: "gikondo", name: "Gikondo Agro-Terminal", district: "Kicukiro", province: "Kigali", distance: 3.4, deliveryMins: 30, stock: "320 kg", icon: "📦" },
  { id: "gatore", name: "Gatore Food Bank & SACCO Point", district: "Kirehe", province: "Eastern", distance: 0.9, deliveryMins: 10, stock: "520 kg", icon: "🌾" },
  { id: "mukamira", name: "Mukamira Highland Potato Center", district: "Nyabihu", province: "Western", distance: 1.4, deliveryMins: 18, stock: "850 kg", icon: "🥔" },
  { id: "musanze", name: "Musanze Central Produce Depot", district: "Musanze", province: "Northern", distance: 2.1, deliveryMins: 20, stock: "400 kg", icon: "🌿" },
  { id: "huye", name: "Huye Agro-Logistics Hub", district: "Huye", province: "Southern", distance: 3.1, deliveryMins: 25, stock: "360 kg", icon: "🌽" }
];
"""

code = re.sub(old_gallery_pattern, new_gallery, code, flags=re.DOTALL)

# 2. Update DEFAULT_STATE listings and add nearby property
old_state_pattern = r"const DEFAULT_STATE = \{.*?\n\};\n"
new_state = """const DEFAULT_STATE = {
  theme: "light",
  lang: "en",
  currentView: "home",
  role: "Family",
  activeCategory: "All",
  nearby: {
    userLocation: "Kimironko, Gasabo (Kigali)",
    selectedDistrict: "Gasabo",
    selectedHub: "all",
    filterProximity: "all",
    deliveryOption: "moto"
  },
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
  listings: [
    { id: 1, food: "Dry beans", district: "Kirehe", hub: "Gatore Food Bank & SACCO Point", distanceKm: 0.9, deliveryMins: 15, price: 780, retailPrice: 920, quantity: 200, farmer: "Mukamana Farm", momo: "0788123456", photo: "assets/produce/dry_beans.jpg", isFav: false },
    { id: 2, food: "Sweet potato", district: "Gisagara", hub: "Gisagara Agro-Hub", distanceKm: 2.5, deliveryMins: 25, price: 240, retailPrice: 320, quantity: 350, farmer: "Gisagara Agrilink", momo: "0788234567", photo: "assets/produce/sweet_potato.jpg", isFav: false },
    { id: 3, food: "Irish potato", district: "Nyabihu", hub: "Mukamira Highland Depot", distanceKm: 1.4, deliveryMins: 18, price: 440, retailPrice: 520, quantity: 500, farmer: "Nyabihu Potato Coop", momo: "0788654321", photo: "assets/produce/irish_potato.jpg", isFav: true },
    { id: 4, food: "Tomato", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", distanceKm: 1.1, deliveryMins: 12, price: 480, retailPrice: 620, quantity: 90, farmer: "Karongi & Kimironko Fresh", momo: "0788345678", photo: "assets/produce/tomato.jpg", isFav: true },
    { id: 5, food: "Cooking banana", district: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", distanceKm: 2.8, deliveryMins: 20, price: 290, retailPrice: 380, quantity: 250, farmer: "Gatsibo & Nyabugogo Coop", momo: "0788456789", photo: "assets/produce/cooking_banana.jpg", isFav: false },
    { id: 6, food: "Onion", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", distanceKm: 1.2, deliveryMins: 15, price: 1600, retailPrice: 1950, quantity: 80, farmer: "Gicumbi & Kimironko Green", momo: "0788567890", photo: "assets/produce/red_onion.jpg", isFav: false },
    { id: 7, food: "Local rice", district: "Kicukiro", hub: "Gikondo Agro-Terminal", distanceKm: 3.4, deliveryMins: 30, price: 1180, retailPrice: 1380, quantity: 180, farmer: "Bugesera & Kigali Rice Growers", momo: "0788789012", photo: "assets/produce/local_rice.jpg", isFav: false },
    { id: 8, food: "Avocado", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", distanceKm: 1.0, deliveryMins: 15, price: 280, retailPrice: 350, quantity: 120, farmer: "Kigali Agro Coop", momo: "0788890123", photo: "assets/produce/avocado.jpg", isFav: true },
    { id: 9, food: "Spinach", district: "Gasabo", hub: "Kimironko Farmers Hub & SACCO", distanceKm: 0.8, deliveryMins: 10, price: 250, retailPrice: 300, quantity: 60, farmer: "Nyabarongo Valley Fresh", momo: "0788901234", photo: "assets/produce/spinach.jpg", isFav: false },
    { id: 10, food: "Corn flour (factory)", district: "Nyarugenge", hub: "Nyabugogo Direct Agro-Depot", distanceKm: 2.8, deliveryMins: 25, price: 790, retailPrice: 960, quantity: 150, farmer: "Bugarama Mills", momo: "0788012345", photo: "assets/produce/fresh_corn.jpg", isFav: false }
  ],
  orders: [
    { id: 101, food: "Dry beans", kg: 10, total: 7800, mode: "credit", buyerRole: "Family", buyerName: "Amina Uwase", district: "Kirehe", status: "Delivered", farmer: "Mukamana Farm", paidBy: "pool", deliveryType: "Free SACCO Pickup", repaid: false, date: "2026-10-22 08:30" },
    { id: 102, food: "Tomato", kg: 8, total: 3840, mode: "cash", buyerRole: "Shopper", buyerName: "Grace Ingabire", district: "Gasabo", status: "Delivered", farmer: "Karongi & Kimironko Fresh", paidBy: "MTN Mobile Money", gift: 77, deliveryType: "Express Moto (15m)", date: "2026-10-22 09:15" }
  ],
  nextOrderId: 103,
  nextListingId: 11,
  selectedDistrict: "Kirehe",
  hotspotMode: "delay",
  selectedPayMethod: "momo",
  pendingCheckoutOrder: null
};
"""

code = re.sub(old_state_pattern, new_state, code, flags=re.DOTALL)

with open("js/app.js", "w", encoding="utf-8") as f:
    f.write(code)

with open("app/js/app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("HARVEST_GALLERY and DEFAULT_STATE successfully updated!")
