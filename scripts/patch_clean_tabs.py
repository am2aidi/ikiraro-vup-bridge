# -*- coding: utf-8 -*-
import sys
import re

print("Starting clean tab refactor...")

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update setNavTab
old_set_nav = """  setNavTab(tabId) {
    if (tabId === "analysis" || tabId === "nisr_facts") {
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
  }"""

new_set_nav = """  setNavTab(tabId) {
    this.state.activeSubView = tabId;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setPublicTab(tabId) {
    this.state.publicTab = tabId;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }"""

assert old_set_nav in code, "old_set_nav not found!"
code = code.replace(old_set_nav, new_set_nav)
print("1. Updated setNavTab and setPublicTab!")

# 2. Update renderHeaderNavActions for Planner and Guest
old_planner_nav = """        if (role === "Planner") {
          navItems = [
            { id: "dashboard", label: "📊 Overview" },
            { id: "creditdesk", label: "💳 Credit Desk" },
            { id: "nisr_facts", label: "📑 NISR Facts" },
            { id: "analysis", label: "🗺️ Delays & GIS" },
            { id: "cases", label: "🛟 Disputes" },
            { id: "reports", label: "📄 Reports" }
          ];"""

new_planner_nav = """        if (role === "Planner") {
          navItems = [
            { id: "dashboard", label: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg> Overview' },
            { id: "creditdesk", label: '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Credit Desk' },
            { id: "nisr_facts", label: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> NISR Facts' },
            { id: "analysis", label: '<svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> Delays & GIS' },
            { id: "cases", label: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Disputes' },
            { id: "reports", label: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Reports' }
          ];"""

if old_planner_nav in code:
    code = code.replace(old_planner_nav, new_planner_nav)
    print("2. Updated planner nav items with SVGs!")

# Update guest nav
old_guest_nav = """        topNavPill.innerHTML = `
          <button class="${!this.state.pickRole ? 'on' : ''}" onclick="window.app.cancelPickRole()">👥 Roles</button>
          <button onclick="document.getElementById('vupDateCard')?.scrollIntoView({behavior:'smooth'})">📅 VUP Schedule</button>
          <button onclick="document.getElementById('nearbyStoreSection')?.scrollIntoView({behavior:'smooth'})">🛒 Fresh Produce</button>
        `;"""

new_guest_nav = """        const pTab = this.state.publicTab || 'market';
        topNavPill.innerHTML = `
          <button class="${pTab === 'market' ? 'on' : ''}" onclick="window.app.setPublicTab('market')"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Fresh Market</button>
          <button class="${pTab === 'roles' ? 'on' : ''}" onclick="window.app.setPublicTab('roles')"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Roles & Portals</button>
          <button class="${pTab === 'schedule' ? 'on' : ''}" onclick="window.app.setPublicTab('schedule')"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> VUP Schedule</button>
        `;"""

if old_guest_nav in code:
    code = code.replace(old_guest_nav, new_guest_nav)
    print("3. Updated guest nav items with SVGs and publicTab!")

# 3. Surgical replacement of renderWhoAreYouView
start_who = code.find("  renderWhoAreYouView() {")
end_who = code.find("  renderLoginView() {")
assert start_who != -1 and end_who != -1, "renderWhoAreYouView boundaries not found!"

modular_who = """  renderWhoAreYouView() {
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
    return `
      <!-- VeggieMart Top Search & Category Filter Header -->
      <div class="head" style="margin-bottom: 16px;">
        <div>
          <h1>Fresh Farm Produce Market</h1>
          <p class="sub">Direct from Rwandan cooperative smallholder farmers. Fast SACCO pickup or express delivery.</p>
        </div>
      </div>

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

      <!-- Produce Grid -->
      ${this.renderGroceryCatalog('cash')}
    `;
  }

  renderPublicRolesView() {
    const rolesList = [
      { code: "member", key: "Family", icon: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: "VUP Member", line: "I receive VUP support and need food bridge credit during disbursement delays." },
      { code: "planner", key: "Planner", icon: '<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: "Sector Planner", line: "I oversee 30-district microdata, manage delay patterns, and approve credit liquidity." },
      { code: "seller", key: "Farmer", icon: '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>', title: "Cooperative Farmer (Seller)", line: "I supply fresh harvest produce and receive instant Mobile Money float payouts." },
      { code: "shopper", key: "Shopper", icon: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>', title: "Ethical Shopper", line: "I buy fresh food for my household and support the 2% revolving community bridge pool." },
      { code: "admin", key: "Admin", icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', title: "Government Auditor", line: "I audit system solvency, reconciliation records, and test payment resilience." }
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

"""

code = code[:start_who] + modular_who + code[end_who:]
print("4. Replaced renderWhoAreYouView cleanly!")

# 4. Surgical replacement of renderFamilyView
start_fam = code.find("  renderFamilyView() {")
end_fam = code.find("  renderPlannerView() {")
assert start_fam != -1 and end_fam != -1, "renderFamilyView boundaries not found!"

modular_family = """  renderFamilyView() {
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

"""

code = code[:start_fam] + modular_family + code[end_fam:]
print("5. Replaced renderFamilyView cleanly!")

# 5. Surgical replacement of renderPlannerView ONLY (not touching getToApproveQueue or renderCreditDesk!)
start_plan = code.find("  renderPlannerView() {")
end_plan = code.find("  getToApproveQueue() {")
assert start_plan != -1 and end_plan != -1, "renderPlannerView boundaries not found!"

modular_planner = """  renderPlannerView() {
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

    return `
      <!-- Vertix Dashboard Header -->
      <div class="head">
        <div>
          <h1>Good morning, ${this.state.currentUser.name || 'Planner One'}</h1>
          <p class="sub">District Evidence Cockpit · 30-District Household Microdata & Credit Liquidity Oversight</p>
        </div>
        
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <div class="seg">
            <button class="${tf === 'week' ? 'on' : ''}" onclick="window.app.setTimeframe('week')" title="1 week timeframe">1 Week</button>
            <button class="${tf === 'month' ? 'on' : ''}" onclick="window.app.setTimeframe('month')" title="1 month timeframe">1 Month</button>
            <button class="${tf === 'year' ? 'on' : ''}" onclick="window.app.setTimeframe('year')" title="1 year timeframe">1 Year</button>
          </div>

          <button class="btn btn-sm btn-primary" onclick="window.app.setNavTab('nisr_facts')" title="View official NISR document">
            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg> NISR Report & PDF
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.app.openStatementModal('Planner')">
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Export Data
          </button>
        </div>
      </div>

      <!-- Hard Rule 2 Banner -->
      <div class="card" style="background:var(--accsoft); border:1px solid rgba(14,99,94,0.3); padding:12px 18px; border-radius:18px; display:flex; align-items:center; gap:12px; margin-bottom:18px;">
        <span style="font-size:20px; flex:none;">💡</span>
        <div>
          <b style="font-size:13px; color:var(--acc);">The NISR data shows patterns. It cannot show why a payment was late.</b>
          <div style="font-size:11.5px; color:var(--mute);">Delays reflect administrative muster roll audits, SACCO clearance cycles, or local capacity. Investigate before acting.</div>
        </div>
      </div>

      <!-- Vertix 5 KPI Cards with Real SVG Stroke Icons -->
      <div class="kpis" style="margin-bottom:20px;">
        <div class="card kp" onclick="window.app.setNavTab('creditdesk')" style="cursor:pointer;" title="Tap to open Credit Desk">
          <span class="ki"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 4.5a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-5-5.5"/></svg></span>
          <small>VUP Families</small>
          <b>${Math.round(6 * tfMult)}</b>
          <em>verified households</em>
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
            <p class="sub" style="margin-top:4px;">Empirical microdata from NISR household survey ($N = 3,399$ records · National average: 9.2 days)</p>
          </div>
          <span class="tag y">52% Wait &gt; 7 Days</span>
        </div>
        <div class="bars">
          <button class="bc on" title="Southern Province: 10.7 days delay">
            <span class="tip">10.7 days (Nyamagabe/Huye)</span>
            <i style="height: 85%;"></i>
            <em>South</em>
          </button>
          <button class="bc on" title="Western Province: 10.7 days delay">
            <span class="tip">10.7 days (Rusizi/Karongi)</span>
            <i style="height: 85%;"></i>
            <em>West</em>
          </button>
          <button class="bc" title="Northern Province: 8.8 days delay">
            <span class="tip">8.8 days (Gicumbi/Musanze)</span>
            <i style="height: 70%;"></i>
            <em>North</em>
          </button>
          <button class="bc" title="Eastern Province: 8.4 days delay">
            <span class="tip">8.4 days (Kirehe/Nyagatare)</span>
            <i style="height: 67%;"></i>
            <em>East</em>
          </button>
          <button class="bc" title="Kigali City: 7.2 days delay">
            <span class="tip">7.2 days (Gasabo/Nyarugenge)</span>
            <i style="height: 57%;"></i>
            <em>Kigali</em>
          </button>
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
            <h4 style="font-size:15px; font-weight:700;">NISR 30-District Facts</h4>
            <span class="tag g">12 Sections</span>
          </div>
          <p style="font-size:12.5px; color:var(--mute); margin-bottom:14px; line-height:1.45;">
            Explore the official household survey data, statistical formulas, and download the compiled report PDF.
          </p>
          <button class="btn btn-sm btn-outline" style="margin-top:auto;" onclick="window.app.setNavTab('nisr_facts')">
            Read NISR Facts & PDF →
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
          <p class="sub">Three operational queues for VUP household credit verification, seller Mobile Money payouts, and SACCO loan recovery.</p>
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
"""

code = code[:start_plan] + modular_planner + code[end_plan:]
print("6. Replaced renderPlannerView cleanly while preserving getToApproveQueue and renderCreditDesk!")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("js/app.js updated successfully!")
