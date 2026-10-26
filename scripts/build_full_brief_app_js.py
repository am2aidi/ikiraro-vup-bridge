import re

# Read top datasets from scripts/top_datasets.js
with open("scripts/top_datasets.js", "r", encoding="utf-8") as f:
    top_code = f.read()

# Build the complete IsokoApp / VUPBridgeApp class adhering to all 26 pages of the brief
app_class_code = """
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
    let csv = "Tx_ID,Date,Type,Food,Quantity_KG,Amount_RWF,Payment_Method,Status,Buyer,Seller\\n";
    d.txs.forEach(o => {
      csv += `${o.id},"${o.date}","${o.mode}","${o.food}",${o.kg},${o.total},"${o.paymentMethod || 'MoMo'}","${o.status}","${o.buyerName}","${o.farmer}"\\n`;
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

    const tf = this.state.timeframe || "month";
    const vupOrders = this.state.orders.filter(o => o.buyerRole === "Family" || o.mode === "credit");
    const totalCredit = vupOrders.reduce((sum, o) => sum + o.total, 0);
    const repaidCredit = vupOrders.filter(o => o.repaid).reduce((sum, o) => sum + o.total, 0);

    container.innerHTML = `
      <div style="border: 1px solid #fed7d7; background:#fff5f5; padding:8px 12px; border-radius:6px; margin-bottom:14px; font-size:12px; font-weight:700; color:#991b1b;">
        Prototype. Fake money. The NISR data shows patterns. It cannot show why a payment was late.
      </div>

      <div style="font-size:14px; margin-bottom:12px;">
        <h2 style="font-size:22px; margin-bottom:4px;">Isoko Bridge — Executive Analysis Report</h2>
        <div style="font-size:12.5px; color:var(--text-muted);">
          Period: <b>${tf.toUpperCase()}</b> · Scope: <b>All VUP Families (${this.state.currentUser.district})</b> · Prepared by: <b>${this.state.currentUser.name} (Planner)</b> · Date: <b>${new Date().toLocaleDateString('en-GB')}</b>
        </div>
      </div>

      <div style="margin-bottom:14px; font-size:13.5px; line-height:1.5;">
        <b>One-line summary:</b> Over the ${tf}, ${vupOrders.length} VUP families used emergency bridge credit totaling ${totalCredit.toLocaleString()} RWF to purchase staple food, with ${repaidCredit.toLocaleString()} RWF repaid upon VUP disbursement waves.
      </div>

      <!-- Numbers Table -->
      <div class="table-wrap" style="margin-bottom:14px;">
        <table>
          <thead>
            <tr><th>Metric</th><th>App Value</th><th>NISR Survey Benchmark</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>National Average Payment Delay</td><td>8.0 days (active)</td><td>9.2 days (overall)</td><td><span class="pill pill-fair">Improved</span></td></tr>
            <tr><td>Wait Over 7 Days (%)</td><td>42% in app</td><td>52% national survey</td><td><span class="pill pill-fair">Cushioned</span></td></tr>
            <tr><td>Total Food Credit Disbursed</td><td>${totalCredit.toLocaleString()} RWF</td><td>-</td><td>Active</td></tr>
            <tr><td>Revolving Pool Repayment Velocity</td><td>94.2% on time</td><td>-</td><td><span class="pill pill-fair">Healthy</span></td></tr>
          </tbody>
        </table>
      </div>

      <div style="margin-bottom:14px;">
        <h4 style="font-size:15px; font-weight:800; margin-bottom:6px;">Friction Alerts & Goulots d'étranglement:</h4>
        <ul style="padding-left:18px; font-size:13px; line-height:1.5;">
          <li><b>Southern Province Delay Hotspot:</b> Expanded Public Works delays average 14.6 days. Administrative muster rolls require acceleration.</li>
          <li><b>Revolving Pool Liquidity Cushion:</b> Pool balance (${this.state.pool.balance.toLocaleString()} RWF) requires shopper refill to sustain 14-day zero-default protection.</li>
        </ul>
      </div>

      <div style="padding:10px; background:var(--bg); border-radius:8px; font-size:11.5px; color:var(--text-muted);">
        <b>Limits note:</b> This report shows patterns, not reasons. History in the prototype is simulated. Data sources: NISR EICV7 VUP Household Microdata (3,771 households, 15,039 people).
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
    const tf = this.state.timeframe || "month";
    const vupOrders = this.state.orders.filter(o => o.buyerRole === "Family" || o.mode === "credit");
    let csv = "Metric,App_Value,NISR_Benchmark\\n";
    csv += `"Average Payment Delay","8.0 days","9.2 days"\\n`;
    csv += `"Share Over 7 Days","42%","52%"\\n`;
    csv += `"Total Credit Disbursed","${vupOrders.reduce((s,o)=>s+o.total,0)} RWF","N/A"\\n`;
    csv += `"Pool Balance","${this.state.pool.balance} RWF","N/A"\\n`;

    const dl = document.createElement("a");
    dl.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
    dl.setAttribute("download", `VUPBridge_Analysis_Report_${new Date().toISOString().slice(0,10)}.csv`);
    dl.click();
    this.toast("Analysis CSV exported successfully!", "success");
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
            { id: "dashboard", label: "📊 Overview" },
            { id: "creditdesk", label: "💳 Credit Desk" },
            { id: "analysis", label: "🗺️ Delays & GIS" },
            { id: "cases", label: "🛟 Disputes" },
            { id: "reports", label: "📄 Reports" }
          ];
        } else if (role === "Admin") {
          navItems = [
            { id: "dashboard", label: "🏛️ Overview" },
            { id: "creditdesk", label: "💳 Credit Desk" },
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
        topNavPill.innerHTML = `
          <button class="${!this.state.pickRole ? 'on' : ''}" onclick="window.app.cancelPickRole()">👥 Roles</button>
          <button onclick="document.getElementById('vupDateCard')?.scrollIntoView({behavior:'smooth'})">📅 VUP Schedule</button>
          <button onclick="document.getElementById('nearbyStoreSection')?.scrollIntoView({behavior:'smooth'})">🛒 Fresh Produce</button>
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
          <button class="mini" onclick="window.app.logout()" style="margin-left:6px;" title="Log out">
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
    if (tabId === "analysis") {
      this.state.activeSubView = "analysis";
      this.render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      this.state.activeSubView = "dashboard";
      this.render();
      const el = document.getElementById(tabId + "Section") || document.getElementById(tabId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // =========================================================================
  // 7. FIRST PAGE: "WHO ARE YOU?" (5 BIG BUTTONS)
  // =========================================================================
  renderWhoAreYouView() {
    const lang = this.state.lang || "en";
    const title = lang === 'rw' ? "Uri nde?" : lang === 'fr' ? "Qui êtes-vous ?" : "Who are you?";
    const sub = lang === 'rw' 
      ? "Hitamo uruhare rwawe. Hanyuma urinjira mu buryo bworoshye." 
      : lang === 'fr' 
      ? "Choisissez votre rôle. Ensuite, vous vous connecterez." 
      : "Choose your role. Then you will log in.";

    const rolesList = [
      { code: "member", key: "Family", icon: "👨‍👩‍👧", title: "VUP member", line: "I receive VUP support", kinyTitle: "Umuryango wa VUP", kinyLine: "Mpagarariye umuryango ufashwa na VUP", frTitle: "Bénéficiaire VUP", frLine: "Je reçois les allocations VUP" },
      { code: "planner", key: "Planner", icon: "📊", title: "Planner", line: "I manage VUP families and their credit", kinyTitle: "Umugenzuzi wa VUP", kinyLine: "Ngenzura imiryango ifashwa na VUP n'inguzanyo", frTitle: "Planificateur", frLine: "Je gère les familles VUP et leur crédit" },
      { code: "seller", key: "Farmer", icon: "🌾", title: "Seller", line: "I sell food", kinyTitle: "Umucuruzi w'Umusaruro", kinyLine: "Ngurisha umusaruro w'ubuhinzi", frTitle: "Vendeur Agricole", frLine: "Je vends des produits vivriers" },
      { code: "shopper", key: "Shopper", icon: "🛒", title: "Shopper", line: "I buy food and help the pool", kinyTitle: "Umuguzi", kinyLine: "Ngura ibiribwa kandi ngaterera inkunga ikigega", frTitle: "Acheteur Solidaire", frLine: "J'achète des vivres et soutiens le fonds" },
      { code: "admin", key: "Admin", icon: "🏛️", title: "Government worker (optional)", line: "I see the whole system", kinyTitle: "Umukozi wa Leta (Ibyifuzo)", kinyLine: "Mbona imikorere yose ya gahunda", frTitle: "Agent Gouvernemental (optionnel)", frLine: "J'ai une vue globale sur tout le système" }
    ];

    return `
      <!-- First Page Header -->
      <div class="head">
        <div>
          <h1>${title}</h1>
          <p class="sub">${sub}</p>
        </div>
      </div>

      <!-- 5 Big Role Cards in Vertix Grid -->
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">
        ${rolesList.map(r => {
          const rTitle = lang === 'rw' ? r.kinyTitle : lang === 'fr' ? r.frTitle : r.title;
          const rLine = lang === 'rw' ? r.kinyLine : lang === 'fr' ? r.frLine : r.line;
          return `
            <div class="card pk" style="cursor:pointer; display:flex; flex-direction:column; margin-bottom:0;" onclick="window.app.pickRole('${r.code}')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <span class="ki" style="width:40px; height:40px; border-radius:50%; background:var(--accsoft); color:var(--acc); display:grid; place-items:center; font-size:18px;">
                  ${r.icon}
                </span>
                <span class="tag ${r.code === 'admin' ? 'r' : 'g'}">${r.code === 'admin' ? 'Audit' : r.key}</span>
              </div>
              <b style="font-size:16px; font-weight:600; display:block; margin-bottom:4px;">${rTitle}</b>
              <p style="color:var(--mute); font-size:12px; margin-bottom:14px; line-height:1.4;">${rLine}</p>
              <div style="margin-top:auto;">
                <button class="mini" style="width:100%; text-align:center;">
                  ${lang === 'rw' ? 'Injira hano →' : lang === 'fr' ? 'Accéder →' : 'Enter as ' + r.title + ' →'}
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Rwanda VUP Payment Dates & Delay Calendar -->
      ${this.renderVupDateCard()}

      <!-- Universal Location & Proximity Bar ("The Place You Are Right Now") -->
      ${this.renderNearbyBar()}

      <!-- Produce Harvest Catalog -->
      ${this.renderGroceryCatalog()}
    `;
  }

  // =========================================================================
  // 8. ROLE LOGIN VIEW WITH SAMPLE DROPDOWN (Section 17.1)
  // =========================================================================
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
    const lang = this.state.lang || "en";
    const logoutTxt = lang === 'rw' ? 'Gusohoka' : lang === 'fr' ? 'Déconnexion' : 'Log out';
    const backTxt = lang === 'rw' ? '← Ahabanza' : lang === 'fr' ? '← Accueil' : '← Home';

    return `
      <div class="dashboard-topbar" style="margin-bottom:18px;">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap:wrap;">
          <button class="back-home-btn" onclick="window.app.logout()">
            ${backTxt}
          </button>
          <div style="font-size: 13.5px;">
            ${this.state.user} · <b style="color: var(--primary); text-transform: uppercase;">${this.getRoleTitleByCode(this.state.roleCode || 'member')}</b>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 6px; flex-wrap:wrap;">
          <button class="btn btn-sm ${this.state.roleCode === 'member' && this.state.activeSubView === 'dashboard' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.state.role='Family'; window.app.state.roleCode='member'; window.app.state.activeSubView='dashboard'; window.app.render();">👨‍👩‍👧 Member</button>
          <button class="btn btn-sm ${this.state.roleCode === 'planner' && this.state.activeSubView === 'dashboard' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.state.role='Planner'; window.app.state.roleCode='planner'; window.app.state.activeSubView='dashboard'; window.app.render();">📊 Planner</button>
          <button class="btn btn-sm ${this.state.roleCode === 'seller' && this.state.activeSubView === 'dashboard' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.state.role='Farmer'; window.app.state.roleCode='seller'; window.app.state.activeSubView='dashboard'; window.app.render();">🌾 Seller</button>
          <button class="btn btn-sm ${this.state.roleCode === 'shopper' && this.state.activeSubView === 'dashboard' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.state.role='Shopper'; window.app.state.roleCode='shopper'; window.app.state.activeSubView='dashboard'; window.app.render();">🛒 Shopper</button>
          <button class="btn btn-sm ${this.state.roleCode === 'admin' && this.state.activeSubView === 'dashboard' ? 'btn-primary' : 'btn-outline'}" onclick="window.app.state.role='Admin'; window.app.state.roleCode='admin'; window.app.state.activeSubView='dashboard'; window.app.render();">🏛️ Admin</button>
          <button class="btn btn-sm ${this.state.activeSubView === 'analysis' ? 'btn-primary' : 'btn-ghost'}" style="border:1px solid var(--card-border);" onclick="window.app.state.activeSubView='analysis'; window.app.render();">🗺️ Analysis & GIS</button>
          <button class="btn btn-sm btn-outline" style="border-color:#7e22ce; color:#7e22ce;" onclick="window.app.openGeminiModal()">✨ AI</button>
          <button class="btn btn-sm btn-outline" onclick="window.app.logout()">${logoutTxt}</button>
        </div>
      </div>
    `;
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

    // Flow 5.1: If member has not submitted details
    if (u.status === "not_submitted") {
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
                <label class="form-label">District Location</label>
                <select id="md_district" class="form-control">
                  ${NISR_DATA.districts.map(d => `<option value="${d.name}">${d.name} (${d.province})</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2" style="margin-bottom:0;">
              <div class="form-group">
                <label class="form-label">Sector</label>
                <input id="md_sector" type="text" class="form-control" value="Central Sector" required>
              </div>
              <div class="form-group">
                <label class="form-label">VUP Programme</label>
                <select id="md_prog" class="form-control">
                  ${NISR_DATA.programmes.map(p => `<option value="${p.name}">${p.name}</option>`).join("")}
                  <option value="Financial Services">Financial Services</option>
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
            <div style="margin: 12px 0;">
              <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                <input type="checkbox" id="md_consent" required checked>
                <span>I agree to the credit rules and to repay credit from my VUP payment.</span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Submit Verification Request</button>
          </form>
        </div>
      `;
    }

    // Flow 5.1: If pending
    if (u.status === "pending") {
      return `
        <h2>${this.t('roleFamilyTitle')}</h2>
        <div class="banner-notice info">
          <div style="font-size:24px;">⏳</div>
          <div>
            <b>Demo mode. Waiting for approval.</b>
            <div style="font-size:13px; margin-top:2px;">
              Your details have been submitted. Log in as <b>Planner</b> to approve this request live, or browse the produce market below.
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Browse Produce Market</h3>
          ${this.renderGroceryCatalog('cash')}
        </div>
      `;
    }

    // Flow 5.1: If verified, needs payment account
    if (u.status === "verified") {
      return `
        <h2>${this.t('roleFamilyTitle')}</h2>
        <div class="banner-notice info">
          <div style="font-size:24px;">✅</div>
          <div>
            <b>Request Approved! Please add your payment account.</b>
            <div style="font-size:13px; margin-top:2px;">
              To open bridge credit, confirm your VUP disbursement payment channel.
            </div>
          </div>
        </div>

        <div class="card" style="padding:22px;">
          <h3>Add my payment account</h3>
          <form onsubmit="window.app.savePaymentAccount(event)">
            <div class="form-group">
              <label class="form-label">Payment Method</label>
              <select id="pa_method" class="form-control">
                <option value="MTN Mobile Money">MTN Mobile Money</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="Umurenge SACCO">Umurenge SACCO</option>
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

    // Credit-ready member
    const limit = this.calculateCreditLimit();
    const remaining = this.getRemainingCredit();
    const isLate = Number(u.daysLate) > 0;
    const dailyCost = (Number(u.householdSize) || 1) * this.state.adminSettings.dailyFoodCost;
    const familyOrders = this.state.orders.filter(o => o.buyerName === u.name || o.buyerEmail === u.email || o.buyerRole === "Family");

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
        <h2>${this.t('roleFamilyTitle')}</h2>
        <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Family')">
          🧾 Download My Statement (PDF/CSV)
        </button>
      </div>

      <div class="banner-notice ${isLate ? 'danger' : 'info'}">
        <div style="font-size: 24px;">${isLate ? '🚨' : '✅'}</div>
        <div>
          <b>${isLate ? `Disbursement Delay: Payment is ${u.daysLate} days late.` : 'Payment on schedule.'}</b>
          <div style="font-size: 13px; margin-top: 2px;">
            ${isLate 
              ? `Your emergency Bridge Credit is active. Order nutritious staple food now; the pool pays the farmer first, and the credit is repaid when your VUP transfer arrives.` 
              : `VUP assistance is up to date. You can purchase fresh produce with cash.`}
          </div>
        </div>
      </div>

      <div class="card">
        <h3>My VUP payment</h3>
        <div class="grid grid-cols-3" style="margin-bottom:0;">
          <div>
            <label class="form-label">Programme</label>
            <select class="form-control" onchange="window.app.state.currentUser.programme = this.value; window.app.saveState(); window.app.render();">
              ${NISR_DATA.programmes.map(p => `
                <option value="${p.name}" ${u.programme === p.name ? 'selected' : ''}>${p.name}</option>
              `).join("")}
            </select>
          </div>
          <div>
            <label class="form-label">People at home</label>
            <input type="number" min="1" max="15" class="form-control" value="${u.householdSize || 5}" 
              onchange="window.app.state.currentUser.householdSize = +this.value || 1; window.app.saveState(); window.app.render();">
          </div>
          <div>
            <label class="form-label">Days late (${u.daysLate} d)</label>
            <input type="range" min="0" max="30" value="${u.daysLate}" 
              oninput="window.app.state.currentUser.daysLate = +this.value; window.app.saveState(); window.app.render();" style="width:100%;">
          </div>
        </div>

        <div class="stats" style="margin-top:14px;">
          <div class="stat"><b>${isLate ? 'Late' : 'On time'}</b><span>payment status</span></div>
          <div class="stat"><b style="color:var(--primary);">${remaining.toLocaleString()} RWF</b><span>bridge credit left</span></div>
          <div class="stat"><b>${dailyCost.toLocaleString()} RWF</b><span>basket cost per day</span></div>
        </div>
      </div>

      <!-- Budget Meal Ideas (Section 6.2: cost only, no calorie claims) -->
      <div class="card" style="background:var(--bg);">
        <h4 style="font-size:14px; margin-bottom:6px;">🍲 Budget Meal Ideas (NISR Cost Guide)</h4>
        <div style="font-size:12.5px; color:var(--text-muted); line-height:1.5;">
          Based on 261 RWF/person/day: 120g dry beans (96 RWF), 300g sweet potato (75 RWF), 80g tomato (40 RWF), 30g onion (50 RWF). Cost per household of 5: <b>${(dailyCost).toLocaleString()} RWF / day</b>.
        </div>
      </div>

      <!-- Proximity Locator -->
      ${this.renderNearbyBar()}

      <!-- Produce Market -->
      <div class="card">
        <h3>🛒 Buy Food</h3>
        ${this.renderGroceryCatalog(isLate ? 'credit' : 'cash')}
      </div>

      <!-- Orders -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3>📋 My Orders & Credit</h3>
          <button class="btn btn-sm btn-ghost" onclick="window.app.openStatementModal('Family')">Download CSV / PDF</button>
        </div>
        ${this.renderOrdersTable(familyOrders)}
      </div>
    `;
  }

  // =========================================================================
  // 11. PLANNER DASHBOARD (ICON-FIRST, ONLY VUP FAMILIES, 3 QUEUES, ALERTS)
  // =========================================================================
  renderPlannerView() {
    const vupOrders = this.state.orders.filter(o => o.buyerRole === "Family" || o.mode === "credit");
    const creditOrders = vupOrders.filter(x => x.mode === "credit");
    const totalCredit = creditOrders.reduce((sum, x) => sum + x.total, 0);
    const outstanding = this.getOutstandingCredit();

    const tf = this.state.timeframe || "month";
    const tfMult = tf === "week" ? 0.25 : tf === "year" ? 12 : 1;

    // Approvals queue
    const pendingMembers = [];
    for (const u of Object.values(this.state.users?.member || [])) {
      if (u.status === "pending") pendingMembers.push(u);
    }

    return `
      <!-- Vertix Dashboard Header -->
      <div class="head">
        <div>
          <h1>Good morning, ${this.state.currentUser.name || 'Planner One'}</h1>
          <p class="sub">District Evidence Cockpit · 30-District Household Microdata & Credit Liquidity Oversight</p>
        </div>
        
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <!-- Vertix Segmented Timeframe Switcher -->
          <div class="seg">
            <button class="${tf === 'week' ? 'on' : ''}" onclick="window.app.setTimeframe('week')" title="1 week timeframe">1 Week</button>
            <button class="${tf === 'month' ? 'on' : ''}" onclick="window.app.setTimeframe('month')" title="1 month timeframe">1 Month</button>
            <button class="${tf === 'year' ? 'on' : ''}" onclick="window.app.setTimeframe('year')" title="1 year timeframe">1 Year</button>
          </div>

          <button class="btn btn-sm btn-acc" onclick="window.app.openAnalysisReportModal()" title="Generate analysis report">
            📄 Make Analysis Report
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Planner')">
            📥 Export VUP Report
          </button>
        </div>
      </div>

      <!-- Vertix Prominent Mandatory Banner (Section 2 Hard Rule) -->
      <div class="card" style="background:var(--accsoft); border:1px solid rgba(14,99,94,0.3); padding:12px 18px; border-radius:18px; display:flex; align-items:center; gap:12px; margin-bottom:18px;">
        <span style="font-size:22px; flex:none;">💡</span>
        <div>
          <b style="font-size:13px; color:var(--acc);">The NISR data shows patterns. It cannot show why a payment was late.</b>
          <div style="font-size:11.5px; color:var(--mute);">Delays reflect administrative muster roll audits, SACCO clearance cycles, or local capacity. Investigate before acting.</div>
        </div>
      </div>

      <!-- Vertix Top KPI Row: 5 Cards (Section 6.5) -->
      <div class="kpis">
        <div class="card kp" title="VUP families in the app. Tap to see the list">
          <span class="ki">👥</span>
          <small>VUP Families</small>
          <b>${Math.round(6 * tfMult)}</b>
          <em>verified & pending</em>
        </div>
        <div class="card kp" title="Families whose VUP payment is late today">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);">⏰</span>
          <small>Late Payments</small>
          <b style="color:var(--bad);">${Math.round(4 * tfMult)}</b>
          <em>avg 9.2 days late</em>
        </div>
        <div class="card kp" title="Food credit families have used. Tap to open the credit desk">
          <span class="ki">💳</span>
          <small>Bridge Credit</small>
          <b style="color:var(--acc);">${Math.round(totalCredit * tfMult).toLocaleString()} RWF</b>
          <em>${outstanding.toLocaleString()} RWF open</em>
        </div>
        <div class="card kp" title="Money available to pay sellers while payments are late">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);">🏦</span>
          <small>Revolving Pool</small>
          <b>${this.state.pool.balance.toLocaleString()} RWF</b>
          <em>${Math.round(this.state.pool.balance / (5 * 261))} days food cover</em>
        </div>
        <div class="card kp" title="Things that are not going well">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);">🚨</span>
          <small>Active Alerts</small>
          <b style="color:var(--bad);">3 Alerts</b>
          <em>attention needed</em>
        </div>
      </div>

      <!-- Vertix Interactive Rwandan Delay Bar Chart -->
      <section class="card" style="margin-bottom:20px;">
        <div class="ch">
          <div>
            <h3>Average VUP Disbursement Delay by Province</h3>
            <p class="sub" style="margin-top:4px;">Empirical microdata from NISR household survey ($N = 3,399$ records · National average: 9.2 days)</p>
          </div>
          <span class="tag y">52% Wait &gt; 7 Days</span>
        </div>
        <div class="bars">
          <button class="bc on" title="Southern Province: 10.7 days delay">
            <span class="tip">10.7 days</span>
            <i style="height: 67%;"></i>
            <em>Southern (10.7d)</em>
          </button>
          <button class="bc on" title="Eastern Province: 10.7 days delay">
            <span class="tip">10.7 days</span>
            <i style="height: 67%;"></i>
            <em>Eastern (10.7d)</em>
          </button>
          <button class="bc" title="Western Province: 9.4 days delay">
            <span class="tip">9.4 days</span>
            <i style="height: 58%;"></i>
            <em>Western (9.4d)</em>
          </button>
          <button class="bc" title="City of Kigali: 8.3 days delay">
            <span class="tip">8.3 days</span>
            <i style="height: 52%;"></i>
            <em>Kigali (8.3d)</em>
          </button>
          <button class="bc" title="Northern Province: 6.6 days delay">
            <span class="tip">6.6 days</span>
            <i style="height: 41%;"></i>
            <em>Northern (6.6d)</em>
          </button>
        </div>
      </section>

      <!-- Vertix Two-Column Layout -->
      <div class="grid g2">
        <div class="left">
          <!-- The Credit Desk with 3 Queues -->
          <div id="creditdeskSection">
            ${this.renderCreditDesk()}
          </div>

          <!-- Problem Cases Queue -->
          <div id="casesSection">
            ${this.renderCasesQueue()}
          </div>

          <!-- VUP Families Orders Table -->
          <div class="card">
            <div class="ch">
              <h3>VUP Beneficiary Orders (${vupOrders.length})</h3>
              <small>Only VUP families shown (Section 6.2)</small>
            </div>
            ${this.renderOrdersTable(vupOrders)}
          </div>
        </div>

        <div class="left">
          <!-- "What is not going well" Alerts Box -->
          ${this.renderAlertsBox()}

          <!-- Gemini AI Explainer Card -->
          ${this.renderAiHelperCard()}

          <!-- Member Approvals Queue for Judges -->
          <div class="card" style="border-left: 4px solid var(--acc);">
            <div class="ch">
              <div>
                <h3 style="font-size:16px;">✅ Member Approvals Queue (${pendingMembers.length} pending)</h3>
                <small>New VUP family verification requests</small>
              </div>
              <span class="tag y">Live Judge Action</span>
            </div>

            ${pendingMembers.length ? `
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr><th>Family</th><th>District</th><th>Household</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    ${pendingMembers.map(m => `
                      <tr>
                        <td><b>${m.name}</b><br><small style="color:var(--mute);">${m.programme}</small></td>
                        <td>${m.district}</td>
                        <td>${m.householdSize} people</td>
                        <td>
                          <button class="btn btn-sm btn-primary" onclick="window.app.approveMember('${m.email}')">
                            ✓ Approve
                          </button>
                        </td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            ` : '<p class="small" style="color:var(--mute); text-align:center; padding:16px 0;">✓ All member applications verified</p>'}
          </div>
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
    const u = this.state.currentUser;
    const myOrders = this.state.orders.filter(o => o.farmer === u.name || o.farmer === "Mukamana Farm" || o.farmerEmail === u.email);
    const mySales = myOrders.filter(o => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
        <h2>${this.t('roleFarmerTitle')}</h2>
        <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Farmer')">
          🧾 Download Sales Statement (PDF/CSV)
        </button>
      </div>

      <div class="stats">
        <div class="stat"><b>${myOrders.length}</b><span>orders placed</span></div>
        <div class="stat"><b style="color:var(--success);">${mySales.toLocaleString()} RWF</b><span>completed sales</span></div>
        <div class="stat"><b>${u.payoutMethod || 'MTN Mobile Money'}</b><span>payout account</span></div>
      </div>

      <div class="card">
        <h3>Add a listing</h3>
        <p class="small" style="margin-bottom:10px;">List your harvest produce with photo upload, camera, or verified gallery:</p>
        <div class="f">
          <select id="new_food" onchange="window.app.onProduceSelected(this.value)">
            ${Object.keys(NISR_DATA.foodPrices).map(k => `<option value="${k}">${k} (${HARVEST_GALLERY[k] ? HARVEST_GALLERY[k].kiny : ''})</option>`).join("")}
          </select>
          <select id="new_district">
            ${NISR_DATA.districts.map(d => `<option value="${d.name}">${d.name} (${d.province})</option>`).join("")}
          </select>
          <input id="new_price" type="number" placeholder="RWF per kg" value="780" oninput="window.app.updatePriceGuidePreview()">
          <input id="new_qty" type="number" placeholder="kg available" value="100">
          <button class="btn btn-primary btn-sm" onclick="window.app.addListing(event)">Add listing</button>
        </div>

        <div style="margin-top:10px; display:flex; align-items:center; gap:10px;">
          <img id="listingPhotoPreview" src="assets/produce/dry_beans.jpg" style="width:48px; height:48px; object-fit:cover; border-radius:8px; border:1px solid var(--card-border);" alt="Preview">
          <input type="file" id="cameraUploadInput" accept="image/*" capture="environment" style="display:none;" onchange="window.app.handleCustomPhotoUpload(this)">
          <button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('cameraUploadInput').click()">
            📸 Take Photo / Upload File
          </button>
          <input type="hidden" id="new_photo_url" value="assets/produce/dry_beans.jpg">
          <span id="priceGuidePreview" style="font-size:12.5px; color:var(--text-muted);"></span>
        </div>
      </div>

      <div class="card">
        <h3>Orders to deliver</h3>
        ${this.renderOrdersTable(this.state.orders, true)}
        <p class="small" style="margin-top:8px; color:var(--text-muted);">Credit orders are paid by the pool on delivery via Mobile Money float.</p>
      </div>

      <div class="card">
        <h3>My Listings</h3>
        ${this.renderGroceryCatalog('cash')}
      </div>
    `;
  }

  // =========================================================================
  // 16. SHOPPER SCREEN (Ethical Shopper)
  // =========================================================================
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
          <p class="sub">Central audit cockpit · Revolving pool velocity & system-wide transparency</p>
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
  renderAnalysisView() {
    return `
      <h2>🗺️ Analysis & 30-District Geospatial Observatory</h2>
      <p class="sub">The NISR data shows patterns. It cannot show why a payment was late. Grounded in EICV7 VUP survey microdata ($N = 3,399$ beneficiaries).</p>

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
        <p class="small" style="margin-top:8px;">Umurenge SACCOs disburse fastest because funds remain locally within the administrative sector.</p>
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
        return cat === this.state.activeCategory;
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

    const lang = this.state.lang || "en";

    return `
      <div class="grocery-grid">
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

          const discountPct = l.retailPrice ? Math.round((1 - l.price / l.retailPrice) * 100) : 15;
          const dist = l.dynamicDistanceKm;
          const mins = l.dynamicDeliveryMins;

          return `
            <div class="grocery-card">
              <div class="grocery-img-box">
                <span class="proximity-badge">
                  📍 ${dist <= 1.0 ? '0.8 km (' + this.t('nearYouText') + ')' : dist + ' km ' + this.t('awayText')}
                </span>
                <button class="favorite-btn" onclick="window.app.toggleFavorite(${l.id})" title="Favorite">
                  ${l.isFav ? '❤️' : '🤍'}
                </button>
                <img src="${photo}" alt="${l.food}" onerror="this.onerror=null; this.src='assets/produce/dry_beans.jpg';">
                <span class="grocery-price-pill ${guide.class}" style="position:absolute; bottom:8px; right:8px;">${guide.label}</span>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; align-items:baseline;">
                  <h4>${displayName}</h4>
                  ${kinyName ? `<small style="font-weight:700; color:var(--text-muted); font-size:11px;">${kinyName}</small>` : ''}
                </div>
                <div class="produce-origin-strip">
                  <span>🏪 <b>${l.farmer}</b></span>
                  <span>${this.t('stockLabel')} <b>${l.quantity} kg</b></span>
                </div>
                <div class="produce-origin-strip" style="margin-top:2px;">
                  <span>📍 ${this.t('originLabel')} ${l.district} District</span>
                  ${l.isLocalDistrict ? `<span class="pill pill-fair" style="padding:1px 6px; font-size:9px;">${this.t('inDistrictBadge')}</span>` : ''}
                </div>
                <div class="delivery-eta-badge">
                  ⚡ ${mins <= 20 ? mins + ' min ' + this.t('expressMoto') : mins + ' mins ' + this.t('transit')} · 🚶 ${this.t('saccoWalkin')}
                </div>
              </div>

              <div class="grocery-card-footer">
                <div>
                  <div class="grocery-cost">
                    ${l.price.toLocaleString()} <small>RWF/kg</small>
                  </div>
                  ${l.retailPrice ? `
                    <div class="grocery-retail-strike">
                      ${this.t('marketLabel')} ${l.retailPrice.toLocaleString()} RWF <span style="color:var(--success); font-weight:700;">(-${discountPct}%)</span>
                    </div>
                  ` : ''}
                </div>

                <div style="display:flex; align-items:center; gap:6px;">
                  <input id="qty_${l.id}" type="number" min="1" max="${l.quantity}" value="5" class="form-control" style="width:48px; padding:4px 6px; text-align:center;" aria-label="kg">
                  <button class="btn btn-sm ${mode === 'credit' ? 'btn-accent' : 'btn-primary'}" onclick="window.app.startBuyProduce(${l.id}, '${mode}')">
                    ${mode === 'credit' ? this.t('creditBtn') : this.t('buyBtn')}
                  </button>
                </div>
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
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new IsokoApp();
  window.app.init();
});
"""

full_content = top_code + "\n" + app_class_code

with open("js/app.js", "w", encoding="utf-8") as f:
    f.write(full_content)

with open("app/js/app.js", "w", encoding="utf-8") as f:
    f.write(full_content)

print("Generated comprehensive app.js and app/js/app.js matching all 26 pages of the brief!")
