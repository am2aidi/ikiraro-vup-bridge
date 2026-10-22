/**
 * NISR VUP Survey Aggregates & Model Constants
 * Direct extraction from NISR 2026 Big Data Hackathon VUP Household Microdata
 */

window.NISR_DATA = {
  // Overall Metrics
  overall: {
    totalBeneficiaries: 3399,
    totalHouseholds: 3771,
    averageDelayDays: 9.2,
    medianDelayDays: 7.5,
    pctOver7DaysLate: 52.0,
    dailyFoodBasketCostRwf: 261 // Per person per day (assumed demo basket)
  },

  // Delays by Programme
  programmes: [
    { name: "Expanded Public Works", delay: 11.0, latePct: 63, records: 796, desc: "Flexible community wage labor" },
    { name: "Classic Public Works", delay: 9.7, latePct: 50, records: 925, desc: "Standard public works infrastructure" },
    { name: "Direct Support", delay: 8.3, latePct: 51, records: 1003, desc: "Unconditional cash for labor-constrained HHs" },
    { name: "NSDS (nutrition)", delay: 7.7, latePct: 42, records: 675, desc: "Nutrition-sensitive support for mothers & infants" }
  ],

  // Delays by Province
  provinces: [
    { name: "Southern", delay: 10.7, latePct: 64, records: 675, risk: "High" },
    { name: "Eastern", delay: 10.7, latePct: 59, records: 762, risk: "High" },
    { name: "Western", delay: 9.4, latePct: 55, records: 789, risk: "Medium" },
    { name: "City of Kigali", delay: 8.3, latePct: 47, records: 358, risk: "Medium" },
    { name: "Northern", delay: 6.6, latePct: 34, records: 815, risk: "Low" }
  ],

  // Programme x Province Hotspots
  hotspots: {
    "Expanded Public Works": {
      "Southern": { delay: 14.6, latePct: 79, records: 140 },
      "Eastern": { delay: 10.8, latePct: 61, records: 238 },
      "Western": { delay: 11.0, latePct: 63, records: 186 },
      "City of Kigali": { delay: 9.6, latePct: 60, records: 83 },
      "Northern": { delay: 8.5, latePct: 54, records: 149 }
    },
    "Classic Public Works": {
      "Southern": { delay: 11.4, latePct: 68, records: 157 },
      "Eastern": { delay: 12.0, latePct: 58, records: 236 },
      "Western": { delay: 10.0, latePct: 54, records: 190 },
      "City of Kigali": { delay: 8.5, latePct: 42, records: 132 },
      "Northern": { delay: 6.3, latePct: 27, records: 210 }
    },
    "Direct Support": {
      "Southern": { delay: 9.7, latePct: 62, records: 210 },
      "Eastern": { delay: 9.2, latePct: 61, records: 231 },
      "Western": { delay: 9.2, latePct: 59, records: 185 },
      "City of Kigali": { delay: 7.4, latePct: 45, records: 143 },
      "Northern": { delay: 6.0, latePct: 31, records: 234 }
    },
    "NSDS (nutrition)": {
      "Southern": { delay: 8.3, latePct: 51, records: 168 },
      "Eastern": { delay: 11.4, latePct: 49, records: 57 },
      "Western": { delay: 7.8, latePct: 47, records: 228 },
      "City of Kigali": null,
      "Northern": { delay: 6.2, latePct: 30, records: 222 }
    }
  },

  // Groups comparison
  groups: {
    "Poverty Level": [
      { name: "Severely poor", delay: 11.0, latePct: 62, records: 174 },
      { name: "Moderately poor", delay: 9.7, latePct: 56, records: 875 },
      { name: "Not poor", delay: 8.9, latePct: 50, records: 2350 }
    ],
    "Payment Channel": [
      { name: "Mobile money", delay: 10.4, latePct: 59, records: 630 },
      { name: "Bank-type SACCO", delay: 9.2, latePct: 53, records: 2205 },
      { name: "Umurenge SACCO", delay: 7.7, latePct: 43, records: 546 }
    ],
    "Area": [
      { name: "Rural", delay: 9.3, latePct: 52, records: 2895 },
      { name: "Urban", delay: 8.5, latePct: 50, records: 504 }
    ],
    "Gender": [
      { name: "Female", delay: 9.2, latePct: 52, records: 2468 },
      { name: "Male", delay: 9.2, latePct: 52, records: 931 }
    ],
    "Age Group": [
      { name: "40–59 years", delay: 9.8, latePct: 54, records: 1115 },
      { name: "60+ years", delay: 8.9, latePct: 53, records: 1317 },
      { name: "25–39 years", delay: 8.8, latePct: 49, records: 810 },
      { name: "Under 25", delay: 8.7, latePct: 45, records: 157 }
    ]
  },

  // Commodity Benchmarks (NISR Median Price in RWF / kg)
  foodPrices: {
    "Dry beans": { median: 800, category: "Pulses", unit: "kg" },
    "Irish potato": { median: 450, category: "Staples", unit: "kg" },
    "Sweet potato": { median: 250, category: "Staples", unit: "kg" },
    "Cooking banana": { median: 300, category: "Staples", unit: "kg" },
    "Tomato": { median: 500, category: "Vegetables", unit: "kg" },
    "Onion": { median: 1667, category: "Vegetables", unit: "kg" },
    "Local rice": { median: 1200, category: "Grains", unit: "kg" },
    "Corn flour (factory)": { median: 1000, category: "Grains", unit: "kg" },
    "Salt": { median: 400, category: "Condiments", unit: "kg" },
    "Avocado": { median: 400, category: "Fruits/Veg", unit: "kg" },
    "Groundnut flour": { median: 2000, category: "Flours", unit: "kg" },
    "Small dry fish": { median: 3030, category: "Protein", unit: "kg" }
  },

  // Complete Rwanda 30-District Data & Priority Score
  districts: [
    { rank: 1, name: "Gisagara", province: "Southern", delay: 14.9, poverty: 46.2, priceIdx: 1.05, priority: 94.5, band: "Priority 1 (Urgent)", records: 77 },
    { rank: 2, name: "Kirehe", province: "Eastern", delay: 15.5, poverty: 42.5, priceIdx: 1.06, priority: 93.7, band: "Priority 1 (Urgent)", records: 70 },
    { rank: 3, name: "Karongi", province: "Western", delay: 13.2, poverty: 41.5, priceIdx: 1.04, priority: 81.1, band: "Priority 1 (Urgent)", records: 100 },
    { rank: 4, name: "Nyaruguru", province: "Southern", delay: 11.8, poverty: 45.0, priceIdx: 1.04, priority: 79.5, band: "Priority 1 (Urgent)", records: 85 },
    { rank: 5, name: "Gatsibo", province: "Eastern", delay: 12.2, poverty: 40.1, priceIdx: 1.03, priority: 74.4, band: "Priority 1 (Urgent)", records: 92 },
    { rank: 6, name: "Nyamagabe", province: "Southern", delay: 11.5, poverty: 43.1, priceIdx: 1.02, priority: 74.0, band: "Priority 1 (Urgent)", records: 95 },
    { rank: 7, name: "Rutsiro", province: "Western", delay: 11.3, poverty: 42.0, priceIdx: 1.02, priority: 71.9, band: "Priority 1 (Urgent)", records: 85 },
    { rank: 8, name: "Kayonza", province: "Eastern", delay: 11.1, poverty: 38.5, priceIdx: 1.01, priority: 66.0, band: "Priority 2 (Targeted)", records: 84 },
    { rank: 9, name: "Nyanza", province: "Southern", delay: 10.8, poverty: 41.0, priceIdx: 0.99, priority: 65.7, band: "Priority 2 (Targeted)", records: 88 },
    { rank: 10, name: "Nyagatare", province: "Eastern", delay: 10.4, poverty: 39.2, priceIdx: 1.02, priority: 64.9, band: "Priority 2 (Targeted)", records: 150 },
    { rank: 11, name: "Huye", province: "Southern", delay: 10.2, poverty: 39.5, priceIdx: 1.01, priority: 63.8, band: "Priority 2 (Targeted)", records: 110 },
    { rank: 12, name: "Bugesera", province: "Eastern", delay: 10.5, poverty: 37.0, priceIdx: 0.99, priority: 61.9, band: "Priority 2 (Targeted)", records: 120 },
    { rank: 13, name: "Ngororero", province: "Western", delay: 10.1, poverty: 38.5, priceIdx: 1.00, priority: 61.6, band: "Priority 2 (Targeted)", records: 90 },
    { rank: 14, name: "Ngoma", province: "Eastern", delay: 10.0, poverty: 36.8, priceIdx: 0.98, priority: 58.7, band: "Priority 2 (Targeted)", records: 91 },
    { rank: 15, name: "Nyamasheke", province: "Western", delay: 9.8, poverty: 37.2, priceIdx: 1.01, priority: 58.6, band: "Priority 2 (Targeted)", records: 115 },
    { rank: 16, name: "Ruhango", province: "Southern", delay: 9.8, poverty: 38.0, priceIdx: 0.98, priority: 58.1, band: "Priority 2 (Targeted)", records: 75 },
    { rank: 17, name: "Kicukiro", province: "City of Kigali", delay: 12.4, poverty: 12.0, priceIdx: 1.08, priority: 57.0, band: "Priority 2 (Targeted)", records: 27 },
    { rank: 18, name: "Muhanga", province: "Southern", delay: 9.2, poverty: 35.5, priceIdx: 0.99, priority: 53.0, band: "Priority 2 (Targeted)", records: 80 },
    { rank: 19, name: "Kamonyi", province: "Southern", delay: 8.8, poverty: 34.0, priceIdx: 0.97, priority: 48.7, band: "Priority 2 (Targeted)", records: 65 },
    { rank: 20, name: "Rusizi", province: "Western", delay: 9.0, poverty: 33.0, priceIdx: 0.98, priority: 48.6, band: "Priority 2 (Targeted)", records: 130 },
    { rank: 21, name: "Gasabo", province: "City of Kigali", delay: 8.2, poverty: 15.5, priceIdx: 1.05, priority: 38.4, band: "Priority 3 (Monitoring)", records: 185 },
    { rank: 22, name: "Nyarugenge", province: "City of Kigali", delay: 7.8, poverty: 17.0, priceIdx: 1.04, priority: 37.6, band: "Priority 3 (Monitoring)", records: 146 },
    { rank: 23, name: "Rubavu", province: "Western", delay: 6.6, poverty: 28.5, priceIdx: 0.96, priority: 33.9, band: "Priority 3 (Monitoring)", records: 76 },
    { rank: 24, name: "Burera", province: "Northern", delay: 7.2, poverty: 25.8, priceIdx: 0.97, priority: 33.7, band: "Priority 3 (Monitoring)", records: 110 },
    { rank: 25, name: "Rwamagana", province: "Eastern", delay: 6.3, poverty: 29.5, priceIdx: 0.95, priority: 33.3, band: "Priority 3 (Monitoring)", records: 55 },
    { rank: 26, name: "Gicumbi", province: "Northern", delay: 6.3, poverty: 24.5, priceIdx: 0.96, priority: 25.0, band: "Priority 3 (Monitoring)", records: 297 },
    { rank: 27, name: "Gakenke", province: "Northern", delay: 6.9, poverty: 23.2, priceIdx: 0.95, priority: 24.9, band: "Priority 3 (Monitoring)", records: 135 },
    { rank: 28, name: "Rulindo", province: "Northern", delay: 6.8, poverty: 21.5, priceIdx: 0.94, priority: 21.5, band: "Priority 3 (Monitoring)", records: 120 },
    { rank: 29, name: "Nyabihu", province: "Western", delay: 4.5, poverty: 27.0, priceIdx: 0.94, priority: 18.5, band: "Priority 3 (Monitoring)", records: 63 },
    { rank: 30, name: "Musanze", province: "Northern", delay: 5.1, poverty: 19.8, priceIdx: 0.93, priority: 11.6, band: "Priority 3 (Monitoring)", records: 70 }
  ],

  // Sample Pre-configured Accounts (Section 4.3 of PDF)
  demoAccounts: [
    { username: "amina_family", password: "Amina#2026", role: "Family", name: "Amina Uwase", district: "Kirehe", programme: "Direct Support", members: 5, daysLate: 8 },
    { username: "bosco_family", password: "Bosco#2026", role: "Family", name: "Jean Bosco Habimana", district: "Gisagara", programme: "Expanded Public Works", members: 6, daysLate: 14 },
    { username: "mukamana_seller", password: "Farm#2026", role: "Farmer", name: "Mukamana Farm", district: "Kirehe", produce: "Dry beans", momo: "0788123456" },
    { username: "nyabihu_seller", password: "Coop#2026", role: "Farmer", name: "Nyabihu Potato Cooperative", district: "Nyabihu", produce: "Irish potato", momo: "0788654321" },
    { username: "grace_shopper", password: "Grace#2026", role: "Shopper", name: "Grace Ingabire", donationPct: 2 },
    { username: "eric_shopper", password: "Eric#2026", role: "Shopper", name: "Eric Mugisha", donationPct: 3 },
    { username: "planner_demo", password: "Plan#2026", role: "Planner", name: "LODA / NISR Planner", institution: "LODA / NISR" }
  ]
};
