# -*- coding: utf-8 -*-
import sys

print("Reading js/app.js...")
with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

helpers = """  goHome() {
    this.state.user = "";
    this.state.role = "";
    this.state.roleCode = "";
    this.state.pickRole = "";
    this.state.publicTab = "market";
    this.state.activeSubView = "dashboard";
    this.updateBottomNavState("mbNavHome");
    this.render();
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  openCreditTab() {
    this.state.role = "Family";
    this.state.roleCode = "member";
    this.state.user = this.state.user || "amina@kirehe.vup.rw";
    this.state.currentUser = (this.state.users && this.state.users.member && this.state.users.member[0]) || {
      name: "Amina Uwase",
      district: "Kirehe",
      householdSize: 5,
      daysLate: 8,
      status: "credit_active"
    };
    this.state.activeSubView = "credit";
    this.updateBottomNavState("mbNavCredit");
    this.render();
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  openOrdersTab() {
    this.state.role = "Family";
    this.state.roleCode = "member";
    this.state.user = this.state.user || "amina@kirehe.vup.rw";
    this.state.currentUser = (this.state.users && this.state.users.member && this.state.users.member[0]) || {
      name: "Amina Uwase",
      district: "Kirehe",
      householdSize: 5,
      daysLate: 8,
      status: "credit_active"
    };
    this.state.activeSubView = "orders";
    this.updateBottomNavState("mbNavOrders");
    this.render();
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  openPlannerTab() {
    this.state.role = "Planner";
    this.state.roleCode = "planner";
    this.state.user = "planner@gov.rw";
    this.state.currentUser = (this.state.users && this.state.users.planner && this.state.users.planner[0]) || {
      name: "Planner One",
      role: "Planner"
    };
    this.state.activeSubView = "dashboard";
    this.updateBottomNavState("mbNavPlanner");
    this.render();
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  openRoleModal() {
    this.cancelPickRole();
    this.state.publicTab = "roles";
    this.updateBottomNavState("mbNavProfile");
    this.render();
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  updateBottomNavState(activeId) {
    if (typeof document === 'undefined') return;
    const btns = document.querySelectorAll('.mb-nav-btn');
    if (btns && btns.forEach) {
      btns.forEach(btn => {
        if (btn.classList && btn.classList.toggle) {
          btn.classList.toggle('on', btn.id === activeId);
        }
      });
    }
  }
"""

target = "  toggleFavorite(id) {"
assert target in code, "toggleFavorite not found!"
code = code.replace(target, helpers + "\n" + target)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Added mobile bottom nav handlers to js/app.js!")
