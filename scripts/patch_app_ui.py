# -*- coding: utf-8 -*-
import sys
import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update renderDashboardTopbar to return ""
code = re.sub(
    r'renderDashboardTopbar\(\)\s*\{[\s\S]*?return\s*`[\s\S]*?`;\s*\}',
    'renderDashboardTopbar() {\n    return "";\n  }',
    code
)

# 2. Update renderWhoAreYouView roles to use SVG icons
old_roles = """    const rolesList = [
      { code: "member", key: "Family", icon: "👨‍👩‍👧", title: "VUP member", line: "I receive VUP support", kinyTitle: "Umuryango wa VUP", kinyLine: "Mpagarariye umuryango ufashwa na VUP", frTitle: "Bénéficiaire VUP", frLine: "Je reçois les allocations VUP" },
      { code: "planner", key: "Planner", icon: "📊", title: "Planner", line: "I manage VUP families and their credit", kinyTitle: "Umugenzuzi wa VUP", kinyLine: "Ngenzura imiryango ifashwa na VUP n'inguzanyo", frTitle: "Planificateur", frLine: "Je gère les familles VUP et leur crédit" },
      { code: "seller", key: "Farmer", icon: "🌾", title: "Seller", line: "I sell food", kinyTitle: "Umucuruzi w'Umusaruro", kinyLine: "Ngurisha umusaruro w'ubuhinzi", frTitle: "Vendeur Agricole", frLine: "Je vends des produits vivriers" },
      { code: "shopper", key: "Shopper", icon: "🛒", title: "Shopper", line: "I buy food and help the pool", kinyTitle: "Umuguzi", kinyLine: "Ngura ibiribwa kandi ngaterera inkunga ikigega", frTitle: "Acheteur Solidaire", frLine: "J'achète des vivres et soutiens le fonds" },
      { code: "admin", key: "Admin", icon: "🏛️", title: "Government worker (optional)", line: "I see the whole system", kinyTitle: "Umukozi wa Leta (Ibyifuzo)", kinyLine: "Mbona imikorere yose ya gahunda", frTitle: "Agent Gouvernemental (optionnel)", frLine: "J'ai une vue globale sur tout le système" }
    ];"""

new_roles = """    const rolesList = [
      { code: "member", key: "Family", icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: "VUP member", line: "I receive VUP support", kinyTitle: "Umuryango wa VUP", kinyLine: "Mpagarariye umuryango ufashwa na VUP", frTitle: "Bénéficiaire VUP", frLine: "Je reçois les allocations VUP" },
      { code: "planner", key: "Planner", icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: "Planner", line: "I manage VUP families and their credit", kinyTitle: "Umugenzuzi wa VUP", kinyLine: "Ngenzura imiryango ifashwa na VUP n'inguzanyo", frTitle: "Planificateur", frLine: "Je gère les familles VUP et leur crédit" },
      { code: "seller", key: "Farmer", icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>', title: "Seller", line: "I sell food", kinyTitle: "Umucuruzi w'Umusaruro", kinyLine: "Ngurisha umusaruro w'ubuhinzi", frTitle: "Vendeur Agricole", frLine: "Je vends des produits vivriers" },
      { code: "shopper", key: "Shopper", icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>', title: "Shopper", line: "I buy food and help the pool", kinyTitle: "Umuguzi", kinyLine: "Ngura ibiribwa kandi ngaterera inkunga ikigega", frTitle: "Acheteur Solidaire", frLine: "J'achète des vivres et soutiens le fonds" },
      { code: "admin", key: "Admin", icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', title: "Government worker (optional)", line: "I see the whole system", kinyTitle: "Umukozi wa Leta (Ibyifuzo)", kinyLine: "Mbona imikorere yose ya gahunda", frTitle: "Agent Gouvernemental (optionnel)", frLine: "J'ai une vue globale sur tout le système" }
    ];"""

if old_roles in code:
    code = code.replace(old_roles, new_roles)
    print("Replaced role emojis with real SVGs!")
else:
    print("Could not match old_roles")

# 3. Add VeggieMart search and categories in renderWhoAreYouView
old_who = "${this.renderGroceryCatalog()}"
new_who = """<!-- VeggieMart Top Search & Category Pills -->
      <div class="vm-search-bar" style="margin-top: 24px;">
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

      <!-- VeggieMart Fresh Produce Catalog -->
      ${this.renderGroceryCatalog()}"""

if old_who in code:
    code = code.replace(old_who, new_who, 1)
    print("Injected VeggieMart search bar and category pills!")
else:
    print("Could not match old_who")

# 4. Update renderGroceryCatalog to output .vm-product-card
vm_catalog_func = """  renderGroceryCatalog(mode) {
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
  }"""

code = re.sub(
    r'renderGroceryCatalog\(mode\)\s*\{[\s\S]*?toggleFavorite\(id\)',
    vm_catalog_func + '\n\n  toggleFavorite(id)',
    code
)
print("Updated renderGroceryCatalog with VeggieMart styling!")

# 5. Add mobile navigation and filter helper methods if not present
helpers = """
  filterProduceByName(query) {
    const q = (query || "").toLowerCase().trim();
    const cards = document.querySelectorAll('.vm-product-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  openCreditTab() {
    this.state.role = "Family";
    this.state.roleCode = "member";
    this.state.user = this.state.user || "amina@kirehe.vup.rw";
    this.state.currentUser = this.state.users.member[0];
    this.state.activeSubView = "credit";
    this.updateBottomNavState("mbNavCredit");
    this.render();
  }

  openOrdersTab() {
    this.state.role = "Family";
    this.state.roleCode = "member";
    this.state.user = this.state.user || "amina@kirehe.vup.rw";
    this.state.currentUser = this.state.users.member[0];
    this.state.activeSubView = "orders";
    this.updateBottomNavState("mbNavOrders");
    this.render();
  }

  openPlannerTab() {
    this.state.role = "Planner";
    this.state.roleCode = "planner";
    this.state.user = "planner@gov.rw";
    this.state.currentUser = this.state.users.planner[0];
    this.state.activeSubView = "dashboard";
    this.updateBottomNavState("mbNavPlanner");
    this.render();
  }

  openRoleModal() {
    this.cancelPickRole();
    this.updateBottomNavState("mbNavProfile");
  }

  updateBottomNavState(activeId) {
    document.querySelectorAll('.mb-nav-btn').forEach(btn => {
      btn.classList.toggle('on', btn.id === activeId);
    });
  }
"""

if "filterProduceByName" not in code:
    code = code.replace("toggleFavorite(id) {", helpers + "\n  toggleFavorite(id) {")
    print("Added mobile navigation helper methods!")

# 6. Replace emojis in Planner KPI cards
planner_old = """      <div class="kpis">
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
      </div>"""

planner_new = """      <div class="kpis">
        <div class="card kp" title="VUP families in the app. Tap to see the list">
          <span class="ki"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 4.5a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-5-5.5"/></svg></span>
          <small>VUP Families</small>
          <b>${Math.round(6 * tfMult)}</b>
          <em>verified & pending</em>
        </div>
        <div class="card kp" title="Families whose VUP payment is late today">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          <small>Late Payments</small>
          <b style="color:var(--bad);">${Math.round(4 * tfMult)}</b>
          <em>avg 9.2 days late</em>
        </div>
        <div class="card kp" title="Food credit families have used. Tap to open the credit desk">
          <span class="ki"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
          <small>Bridge Credit</small>
          <b style="color:var(--acc);">${Math.round(totalCredit * tfMult).toLocaleString()} RWF</b>
          <em>${outstanding.toLocaleString()} RWF open</em>
        </div>
        <div class="card kp" title="Money available to pay sellers while payments are late">
          <span class="ki" style="background:var(--ok-soft); color:var(--ok);"><svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18"/></svg></span>
          <small>Revolving Pool</small>
          <b>${this.state.pool.balance.toLocaleString()} RWF</b>
          <em>${Math.round(this.state.pool.balance / (5 * 261))} days food cover</em>
        </div>
        <div class="card kp" title="Things that are not going well">
          <span class="ki" style="background:var(--bad-soft); color:var(--bad);"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>
          <small>Active Alerts</small>
          <b style="color:var(--bad);">3 Alerts</b>
          <em>attention needed</em>
        </div>
      </div>"""

if planner_old in code:
    code = code.replace(planner_old, planner_new)
    print("Replaced Planner KPI emojis with SVGs!")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("js/app.js successfully updated!")
