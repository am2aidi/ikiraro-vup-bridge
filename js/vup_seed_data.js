/**
 * VUP Bridge - Seed Data, Sample Users & Accounting Ledger
 * Specified in "VUP Bridge – Build Brief for the AI Developer.pdf" (Section 17)
 */

const VUP_SAMPLE_USERS = {
  // 1. VUP Members
  member: [
    {
      name: "Amina Uwase",
      email: "amina@vupbridge.rw",
      password: "Amina#2026",
      role: "Family",
      roleCode: "member",
      district: "Kirehe",
      sector: "Gatore",
      programme: "Direct Support",
      householdSize: 5,
      usualPaymentDay: 15,
      daysLate: 8,
      status: "credit-ready",
      stateDesc: "Credit-ready, payment 8 days late, one approved credit",
      paymentMethod: "MTN Mobile Money",
      accountNumber: "078XXXX456",
      holderName: "Amina Uwase",
      confirmedBy: "Planner One",
      consentTicked: true
    },
    {
      name: "Jean Bosco Habimana",
      email: "bosco@vupbridge.rw",
      password: "Bosco#2026",
      role: "Family",
      roleCode: "member",
      district: "Gisagara",
      sector: "Ndora",
      programme: "Expanded Public Works",
      householdSize: 6,
      usualPaymentDay: 15,
      daysLate: 14,
      status: "credit-ready",
      stateDesc: "Credit-ready, one overdue credit (shows an alert)",
      paymentMethod: "Umurenge SACCO",
      accountNumber: "SACCO-GIS-XXXX82",
      holderName: "Jean Bosco Habimana",
      confirmedBy: "Planner One",
      consentTicked: true
    },
    {
      name: "Claudine Mukamana",
      email: "claudine@vupbridge.rw",
      password: "Claudine#2026",
      role: "Family",
      roleCode: "member",
      district: "Karongi",
      sector: "Rubengera",
      programme: "NSDS",
      householdSize: 4,
      usualPaymentDay: 15,
      daysLate: 6,
      status: "verified",
      stateDesc: "Verified, still needs to add payment details",
      paymentMethod: "",
      accountNumber: "",
      holderName: "",
      consentTicked: true
    },
    {
      name: "Emmanuel Niyonsenga",
      email: "emmanuel@vupbridge.rw",
      password: "Emmanuel#2026",
      role: "Family",
      roleCode: "member",
      district: "Nyabihu",
      sector: "Mukamira",
      programme: "Classic Public Works",
      householdSize: 7,
      usualPaymentDay: 15,
      daysLate: 5,
      status: "pending",
      stateDesc: "Pending approval (Judges can approve live)",
      consentTicked: true
    },
    {
      name: "Beatrice Uwimana",
      email: "beatrice@vupbridge.rw",
      password: "Beatrice#2026",
      role: "Family",
      roleCode: "member",
      district: "Gatsibo",
      sector: "Kabarore",
      programme: "Direct Support",
      householdSize: 3,
      usualPaymentDay: 15,
      daysLate: 9,
      status: "pending",
      stateDesc: "Pending approval (Judges can approve live)",
      consentTicked: true
    },
    {
      name: "Theogene Habiyaremye",
      email: "theogene@vupbridge.rw",
      password: "Theogene#2026",
      role: "Family",
      roleCode: "member",
      district: "Gisagara",
      sector: "Kigembe",
      programme: "Expanded Public Works",
      householdSize: 5,
      usualPaymentDay: 15,
      daysLate: 12,
      status: "pending",
      stateDesc: "Pending approval (Judges can approve live)",
      consentTicked: true
    }
  ],

  // 2. Sellers (Farmers & Cooperatives)
  seller: [
    {
      name: "Mukamana Farm",
      email: "mukamana.farm@vupbridge.rw",
      password: "Farm#2026",
      role: "Farmer",
      roleCode: "seller",
      sells: "Dry beans",
      district: "Kirehe",
      payoutMethod: "MTN Mobile Money",
      payoutAccount: "078XXXX123"
    },
    {
      name: "Nyabihu Potato Cooperative",
      email: "potato.coop@vupbridge.rw",
      password: "Coop#2026",
      role: "Farmer",
      roleCode: "seller",
      sells: "Irish potato",
      district: "Nyabihu",
      payoutMethod: "Bank transfer (BK)",
      payoutAccount: "BK-XXXX4821"
    },
    {
      name: "Kamonyi Vegetable Growers",
      email: "kamonyi.growers@vupbridge.rw",
      password: "Growers#2026",
      role: "Farmer",
      roleCode: "seller",
      sells: "Tomato and onion",
      district: "Kamonyi",
      payoutMethod: "Umurenge SACCO",
      payoutAccount: "SACCO-KAM-XXXX11"
    },
    {
      name: "Gisagara Sweet Potato Group",
      email: "sweetpotato.gisagara@vupbridge.rw",
      password: "Sweet#2026",
      role: "Farmer",
      roleCode: "seller",
      sells: "Sweet potato",
      district: "Gisagara",
      payoutMethod: "Airtel Money",
      payoutAccount: "073XXXX567"
    }
  ],

  // 3. Shoppers
  shopper: [
    {
      name: "Grace Ingabire",
      email: "grace@vupbridge.rw",
      password: "Grace#2026",
      role: "Shopper",
      roleCode: "shopper",
      district: "Gasabo",
      giftShare: 2
    },
    {
      name: "Eric Mugisha",
      email: "eric@vupbridge.rw",
      password: "Eric#2026",
      role: "Shopper",
      roleCode: "shopper",
      district: "Kicukiro",
      giftShare: 3
    },
    {
      name: "Aline Uwase",
      email: "aline@vupbridge.rw",
      password: "Aline#2026",
      role: "Shopper",
      roleCode: "shopper",
      district: "Nyarugenge",
      giftShare: 5
    },
    {
      name: "Patrick Nkurunziza",
      email: "patrick@vupbridge.rw",
      password: "Patrick#2026",
      role: "Shopper",
      roleCode: "shopper",
      district: "Gasabo",
      giftShare: 1
    }
  ],

  // 4. Planners
  planner: [
    {
      name: "Planner One",
      email: "planner1@vupbridge.rw",
      password: "Plan#2026",
      role: "Planner",
      roleCode: "planner",
      district: "National",
      notes: "Sees all VUP families. Has approved some members in the history."
    },
    {
      name: "Planner Two",
      email: "planner2@vupbridge.rw",
      password: "Plan2#2026",
      role: "Planner",
      roleCode: "planner",
      district: "National",
      notes: "Same rights. Lets you check that the audit log shows who approved what."
    }
  ],

  // 5. Government Worker (Admin)
  admin: [
    {
      name: "Admin Demo",
      email: "admin@vupbridge.rw",
      password: "Admin#2026",
      role: "Admin",
      roleCode: "admin",
      district: "National",
      notes: "Sees all users, all history, settings and the audit log."
    }
  ]
};

// Seed Orders covering all states defined in Section 17 & Section 9:
// approved, delivered, seller paid, repaid, overdue, pending approval
const SEED_ORDERS = [
  {
    id: 101,
    food: "Dry beans",
    kg: 10,
    total: 7800,
    mode: "credit",
    buyerRole: "Family",
    buyerName: "Amina Uwase",
    buyerEmail: "amina@vupbridge.rw",
    district: "Kirehe",
    farmer: "Mukamana Farm",
    farmerEmail: "mukamana.farm@vupbridge.rw",
    status: "Delivered",
    creditStatus: "seller_paid",
    paidBy: "pool",
    paid: "pool",
    paymentMethod: "MTN Mobile Money",
    gift: 0,
    deliveryType: "Free SACCO Pickup",
    repaid: false,
    date: "2026-10-22 09:15",
    approvedBy: "Planner One",
    approvedDate: "2026-10-22 08:30"
  },
  {
    id: 102,
    food: "Tomato",
    kg: 6,
    total: 2880,
    mode: "cash",
    buyerRole: "Shopper",
    buyerName: "Grace Ingabire",
    buyerEmail: "grace@vupbridge.rw",
    district: "Gasabo",
    farmer: "Kamonyi Vegetable Growers",
    farmerEmail: "kamonyi.growers@vupbridge.rw",
    status: "Delivered",
    creditStatus: "n/a",
    paidBy: "buyer",
    paid: "buyer",
    paymentMethod: "MTN Mobile Money",
    gift: 58,
    deliveryType: "Express Moto (15m)",
    repaid: false,
    date: "2026-10-23 11:20"
  },
  {
    id: 103,
    food: "Sweet potato",
    kg: 25,
    total: 6000,
    mode: "credit",
    buyerRole: "Family",
    buyerName: "Jean Bosco Habimana",
    buyerEmail: "bosco@vupbridge.rw",
    district: "Gisagara",
    farmer: "Gisagara Sweet Potato Group",
    farmerEmail: "sweetpotato.gisagara@vupbridge.rw",
    status: "Delivered",
    creditStatus: "overdue",
    paidBy: "pool",
    paid: "pool",
    paymentMethod: "Umurenge SACCO",
    gift: 0,
    deliveryType: "Free SACCO Pickup",
    repaid: false,
    date: "2026-09-28 14:00",
    approvedBy: "Planner One",
    approvedDate: "2026-09-28 10:00",
    isOverdue: true,
    overdueDays: 14
  },
  {
    id: 104,
    food: "Irish potato",
    kg: 20,
    total: 8800,
    mode: "credit",
    buyerRole: "Family",
    buyerName: "Amina Uwase",
    buyerEmail: "amina@vupbridge.rw",
    district: "Nyabihu",
    farmer: "Nyabihu Potato Cooperative",
    farmerEmail: "potato.coop@vupbridge.rw",
    status: "Delivered",
    creditStatus: "repaid",
    paidBy: "pool",
    paid: "pool",
    paymentMethod: "MTN Mobile Money",
    gift: 0,
    deliveryType: "Free SACCO Pickup",
    repaid: true,
    repaidDate: "2026-10-18 16:30",
    date: "2026-10-12 10:00",
    approvedBy: "Planner One"
  },
  {
    id: 105,
    food: "Cooking banana",
    kg: 15,
    total: 4350,
    mode: "credit",
    buyerRole: "Family",
    buyerName: "Amina Uwase",
    buyerEmail: "amina@vupbridge.rw",
    district: "Kirehe",
    farmer: "Mukamana Farm",
    farmerEmail: "mukamana.farm@vupbridge.rw",
    status: "Delivered",
    creditStatus: "to_pay_seller",
    paidBy: "pending_pool",
    paid: null,
    paymentMethod: "MTN Mobile Money",
    gift: 0,
    deliveryType: "Free SACCO Pickup",
    repaid: false,
    date: "2026-10-25 08:45",
    approvedBy: "Planner Two"
  },
  {
    id: 106,
    food: "Irish potato",
    kg: 15,
    total: 6600,
    mode: "credit",
    buyerRole: "Family",
    buyerName: "Amina Uwase",
    buyerEmail: "amina@vupbridge.rw",
    district: "Nyabihu",
    farmer: "Nyabihu Potato Cooperative",
    farmerEmail: "potato.coop@vupbridge.rw",
    status: "Pending Approval",
    creditStatus: "requested",
    paidBy: "pending_approval",
    paid: null,
    paymentMethod: "MTN Mobile Money",
    gift: 0,
    deliveryType: "Free SACCO Pickup",
    repaid: false,
    date: "2026-10-26 09:30"
  }
];

// Single Immutable Accounting Ledger (Section 16.3)
const SEED_LEDGER = [
  { id: 1, date: "2026-10-01 08:00", type: "gift", from: "Shoppers Pool Donations", to: "Revolving Pool", amount: 25000, link: "Initial Pool Funding", status: "completed", paymentMethod: "Bank transfer", createdBy: "System" },
  { id: 2, date: "2026-10-12 11:30", type: "seller_payout", from: "Revolving Pool", to: "Nyabihu Potato Cooperative", amount: 8800, link: "Order #104", status: "completed", paymentMethod: "Bank transfer (BK)", createdBy: "Planner One" },
  { id: 3, date: "2026-10-18 16:30", type: "repayment", from: "VUP Treasury Transfer", to: "Revolving Pool", amount: 8800, link: "Order #104 Repayment", status: "completed", paymentMethod: "MTN Mobile Money", createdBy: "Planner One" },
  { id: 4, date: "2026-10-22 10:00", type: "seller_payout", from: "Revolving Pool", to: "Mukamana Farm", amount: 7800, link: "Order #101", status: "completed", paymentMethod: "MTN Mobile Money", createdBy: "Planner One" },
  { id: 5, date: "2026-10-23 11:20", type: "gift", from: "Grace Ingabire", to: "Revolving Pool", amount: 58, link: "Order #102 (2% Gift)", status: "completed", paymentMethod: "MTN Mobile Money", createdBy: "Grace Ingabire" }
];

// Problem Cases Queue (Section 16.3)
const SEED_CASES = [
  {
    id: 1,
    type: "payment missing",
    createdBy: "Mukamana Farm",
    role: "Seller",
    linkedTransaction: "Order #105",
    note: "Order delivered to Gatore SACCO hub on Oct 25 but MoMo payout not yet received from pool.",
    status: "open",
    handler: "Planner One",
    outcome: null,
    createdDate: "2026-10-25 15:30"
  },
  {
    id: 2,
    type: "wrong amount",
    createdBy: "Jean Bosco Habimana",
    role: "Family",
    linkedTransaction: "Order #103",
    note: "VUP transfer wave was delayed in Ndora sector. Requesting 7-day credit extension before overdue flag.",
    status: "in review",
    handler: "Planner Two",
    outcome: null,
    createdDate: "2026-10-24 10:15"
  }
];

// Audit Log (Section 5.1 & Section 16.3)
const SEED_AUDIT_LOG = [
  { who: "Planner One", action: "Approved member", target: "Amina Uwase (Kirehe)", date: "2026-10-10 09:00", reason: "Direct Support recipient verified with sector social officer" },
  { who: "Planner One", action: "Confirmed payment account", target: "Amina Uwase (078XXXX456)", date: "2026-10-10 14:30", reason: "MoMo number matches LODA disbursement registry" },
  { who: "Planner One", action: "Approved member", target: "Jean Bosco Habimana (Gisagara)", date: "2026-10-12 11:00", reason: "Expanded Public Works muster roll matched" },
  { who: "Planner One", action: "Disbursed pool payout", target: "Mukamana Farm (7,800 RWF)", date: "2026-10-22 10:00", reason: "Delivery confirmed for Order #101" }
];

// Admin System Settings (Section 5.7 & 15)
const DEFAULT_ADMIN_SETTINGS = {
  dailyFoodCost: 261, // RWF per person
  creditCapDays: 14,
  firstCreditDays: 3,
  poolSharePct: 2,
  amberPoolDays: 14,
  redPoolDays: 7,
  amberOverduePct: 10,
  redOverduePct: 20,
  makeNextPaymentFail: false // Admin demo toggle to test reversal & problem report
};

window.VUP_SAMPLE_USERS = VUP_SAMPLE_USERS;
window.SEED_ORDERS = SEED_ORDERS;
window.SEED_LEDGER = SEED_LEDGER;
window.SEED_CASES = SEED_CASES;
window.SEED_AUDIT_LOG = SEED_AUDIT_LOG;
window.DEFAULT_ADMIN_SETTINGS = DEFAULT_ADMIN_SETTINGS;
