# -*- coding: utf-8 -*-
import sys
import re

print("Reading js/app.js...")
with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace renderPublicMarketView with @uxui_faran layout
start_mkt = code.find("  renderPublicMarketView() {")
end_mkt = code.find("  renderPublicRolesView() {")
assert start_mkt != -1 and end_mkt != -1, "renderPublicMarketView not found!"

uxui_faran_market = """  renderPublicMarketView() {
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
            <span class="tag g" style="margin-bottom:6px;">Co-op Fresh Harvest</span>
            <h2 style="font-size:22px; font-weight:800; line-height:1.15; margin:4px 0 6px; color:var(--ink);">
              20% Below Market Prices
            </h2>
            <p style="font-size:12px; color:var(--mute); margin-bottom:12px; line-height:1.4;">
              Zero middlemen. Direct farm-to-table cooperative produce with NISR microdata price protection.
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
          <b style="font-size:14px; font-weight:700;">Top Farmer Cooperatives</b>
          <small style="color:var(--primary); font-weight:600; cursor:pointer;" onclick="window.app.setProximityFilter('all')">View all</small>
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
        <h3 style="font-size:16px; font-weight:800;">Top Produce Items</h3>
        <small style="color:var(--mute); font-size:11.5px;">18 verified cooperative listings</small>
      </div>

      <!-- Produce Grid -->
      ${this.renderGroceryCatalog('cash')}
    `;
  }

"""

code = code[:start_mkt] + uxui_faran_market + code[end_mkt:]
print("Injected @uxui_faran market layout with pure SVG logo!")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved js/app.js successfully!")
