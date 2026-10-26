# VUP Bridge (Isoko Bridge · Ikiraro cya VUP)

> **"Eat while you wait."**  
> *A direct food market, emergency social payment bridge, and decision-support intelligence platform for Rwandan households receiving Vision 2020 Umurenge Programme (VUP) support.*

**NISR 2026 Big Data Hackathon Submission**  
- **Track:** Track 3: Open Innovation *(Alternate: Track 2: Financial Inclusion and Poverty Reduction)*  
- **Lead Author:** Zaidi (Final Year, Information Systems, University of Rwanda - CST)  
- **Team Member 2:** KAYUMBA TETA Aela Greta (Final Year, University of Rwanda - CST)  
- **Official Repository:** [github.com/am2aidi/ikiraro-vup-bridge](https://github.com/am2aidi/ikiraro-vup-bridge)  
- **Live Deployment:** [ikiraro-vup-bridge.vercel.app](https://ikiraro-vup-bridge.vercel.app)

---

## ⚠️ Mandatory Hackathon Principles & Hard Rules

1. **Prototype. Fake money.**  
   *All monetary numbers, revolving pools, mobile money transactions, and user balances are simulated for demonstration. No real currency is transferred.*
2. **Patterns, not reasons.**  
   *The NISR microdata shows empirical patterns of disbursement delays, demographic distributions, and vulnerability across Rwanda's 30 districts. It cannot explain why any individual payment was delayed (administrative audit, bank clearance, or attendance reconciliation).*
3. **Families are never punished.**  
   *If a family is unable to repay bridge credit due to hardship or illness, the revolving pool absorbs the write-off without penalizing the household.*

---

## 1. Executive Summary & Problem Statement

National Institute of Statistics of Rwanda (NISR) household survey microdata ($N = 3,399$ VUP beneficiaries) reveals that monthly social protection cash transfers encounter systemic operational delays:
- **National Average Delay:** **9.2 days**, with **52%** of recipient families waiting more than one week past the scheduled 15th disbursement date.
- **Hotspot Severity:** In Expanded Public Works in the Southern Province, delays reach **14.6 days**, with **79%** of households paid more than 7 days late.
- **The Acute Delay Gap:** When government payments are late, low-income families face severe food insecurity or predatory informal loans. Simultaneously, local smallholder farmers lack direct urban and peri-urban market access.

**VUP Bridge** bridges this exact gap:
1. **Direct Rwandan Harvest Market:** Farmers list produce with photos and GPS proximity, benchmarked against official NISR median market prices.
2. **Emergency Social Bridge Credit:** When VUP cash transfers are late, eligible families receive instant zero-interest credit (`people × daily_food_cost × days_late`) to purchase staple food.
3. **Revolving Social Pool:** Community shoppers donate 1%–5% with each grocery purchase. The pool pays farmers immediately upon delivery; when government VUP transfers arrive, the credit is reimbursed back to the pool.
4. **Planner & Judicial Cockpit:** Planners monitor 30-district interactive delay maps, the 3 Credit Desk queues, problem disputes, and downloadable official statements.

---

## 2. Real vs. Simulated vs. Assumed Components (Section 2 Compliance)

| Component Type | Included Elements | Data Source & Treatment |
| :--- | :--- | :--- |
| **Real (NISR Microdata)** | 30-district delay statistics, provincial hotspots, demographic breakdowns, poverty proxy model, baseline commodity median prices. | Derived directly from NISR VUP household survey microdata ($N = 3,399$ beneficiaries). |
| **Simulated (Demo)** | Farmers, cooperative listings, consumer orders, bridge credit issuance, revolving pool ledger, audit log, and cases. | Fully functional prototype with local browser state persistence (`Prototype. Fake money.`). |
| **Assumed Parameters** | Daily adult food consumption basket ($\approx$ 261 RWF/person/day: 120g beans, 300g sweet potato, 80g tomato, 30g onion), shopper donation rate (1%–5%). | Calibrated to Rwandan national nutrition guidelines and market price indices. |

---

## 3. Five Roles & Sample Login Accounts (Section 17 Catalog)

The platform opens with **"Who are you?"** featuring 5 clear role buttons with one-line descriptions. Any email and password can be entered (`Prototype: type any email and any password. Nothing is checked.`):

| Role | Sample User | Email | Password | Context & State |
| :--- | :--- | :--- | :--- | :--- |
| **VUP member** | **Amina Uwase** | `amina.uwase@vupbridge.rw` | `demo1234` | Credit-ready (8 days late, 5 people, Kirehe) |
| VUP member | Jean Bosco Habimana | `jean.bosco@vupbridge.rw` | `demo1234` | Overdue credit alert (12 days late, Gisagara) |
| VUP member | Claudine Mukamana | `claudine.mukamana@vupbridge.rw` | `demo1234` | Verified, needs payment account (6 days late) |
| VUP member | Emmanuel Niyonsenga | `emmanuel.niyonsenga@vupbridge.rw` | `demo1234` | **Pending verification** (test live approval flow) |
| VUP member | Beatrice Uwimana | `beatrice.uwimana@vupbridge.rw` | `demo1234` | Pending verification (Direct Support) |
| VUP member | Theogene Habiyaremye | `theogene.habiyaremye@vupbridge.rw` | `demo1234` | Pending verification (Classic Public Works) |
| **Planner** | **Planner One** | `planner1@vupbridge.rw` | `demo1234` | Lead District Social Protection Planner |
| Planner | Planner Two | `planner2@vupbridge.rw` | `demo1234` | Secondary Regional Planner |
| **Seller** | **Mukamana Farm** | `mukamana@vupbridge.rw` | `demo1234` | Dry beans seller, Kirehe District |
| Seller | Nyabihu Potato Coop | `nyabihu@vupbridge.rw` | `demo1234` | Kinigi Irish potato cooperative, Nyabihu |
| Seller | Kamonyi Veg Growers | `kamonyi@vupbridge.rw` | `demo1234` | Fresh tomato & greens grower, Kamonyi |
| Seller | Gisagara Sweet Potato | `gisagara@vupbridge.rw` | `demo1234` | Sweet potato grower group, Gisagara |
| **Shopper** | **Grace Ingabire** | `grace.ingabire@vupbridge.rw` | `demo1234` | Kigali ethical consumer (2% pool donor) |
| Shopper | Eric Mugisha | `eric.mugisha@vupbridge.rw` | `demo1234` | Kigali ethical consumer (3% pool donor) |
| Shopper | Aline Uwase | `aline.uwase@vupbridge.rw` | `demo1234` | Kigali ethical consumer (5% pool donor) |
| Shopper | Patrick Nkurunziza | `patrick.nkurunziza@vupbridge.rw` | `demo1234` | Kigali ethical consumer (1% pool donor) |
| **Government worker** | **Admin Demo** | `admin@vupbridge.rw` | `demo1234` | System auditor (sees all users, orders, failure switch) |

---

## 4. Key Architectural Modules

### A. The Credit Desk with 3 Queues
Track every bridge credit order through its financial lifecycle:
1. **To Approve:** Verifies family eligibility, NISR delay days, and enforces the 14-day credit cap (first credit capped at 3 days; one open credit at a time).
2. **To Pay Sellers:** Displays delivered credit orders. The planner clicks **"Pay Seller from Pool"** to disburse mobile money to the farmer immediately.
3. **To Repay:** Tracks outstanding credit owed back to the pool. When the government VUP transfer wave clears, click **"Settle from VUP Transfer"** or **"Write Off"** (absorbed by pool).

### B. Member Verification Lifecycle
- Unverified members start as `pending`.
- Planners view the **Member Approvals Queue** and click **"Approve Member"**.
- Approved members transition to `verified`, add payment details (MoMo / SACCO), and become `credit-ready`.

### C. Trilingual Support & Gemini AI Engine
- Complete native translation across all 3 official languages of Rwanda: **English (`EN`)**, **Ikinyarwanda (`RW`)**, and **Français (`FR`)**.
- Built-in **Google Gemini AI Assistant** translates produce listings, answers agricultural/fintech queries, and explains system metrics in easy words.
- Strict Section 8 compliance: Gemini explanations are formatted in **four parts**, use short sentences, under 150 words, never invent numbers, and state *"Possible reason:"* when explaining payment delays.

### D. Single Immutable Ledger & Problem Dispute Cases
- **Immutable Financial Ledger:** Transactions are never edited or deleted. Errors are corrected via linked reversal entries.
- **🚩 Report a Problem:** Available on every order and ledger transaction. Creates an open Case in the Planner and Admin dispute queues.
- **Admin Failure Switch:** Toggle `"Make the next payment fail"` to simulate a mobile money float failure and test problem resolution.

### E. Statements & Analysis Reports
- Downloadable **PDF / CSV Statements** for every role (statement number, period, itemized transactions, credit, repaid balance).
- **Official Executive Analysis Report:** Printable report containing NISR delay baseline comparisons, revolving pool velocity, and district breakdown.

---

## 5. Verification & Acceptance Testing (Tests 1–29)

To run the automated Node.js test suite covering all 29 acceptance criteria:

```bash
node scripts/test_runtime.js
```

Expected output:
```text
App loaded successfully!
Testing render():
Rendered successfully.
--- TEST 1: Role picking & Member Login ---
Logged in as: amina uwase | Role: Family
--- TEST 2: Timeframe switching ---
Timeframe set to: month, year, week
--- TEST 3: Trilingual localization ---
Language rw, fr, en passed.
--- TEST 4: Gemini AI translation & query engine ---
Offline Kinyarwanda & French translations passed.
--- TEST 5: Planner Login & Credit Desk Queues ---
Logged in as: Planner One | Role: Planner
Credit Desk "To approve": 1 | "To pay sellers": 1 | "To repay": 2
Alerts box, AI Helper, Credit Desk rendered successfully.
--- TEST 6: Admin Login & Demo Failure Switch ---
makeNextPaymentFail toggle passed.
--- TEST 7: Farmer & Shopper Views ---
Passed.
--- TEST 8: Problem Case Reporting & Reversals ---
Initial cases verified.
=========================================
✅ ALL ACCEPTANCE TESTS SUCCESSFULLY PASSED!
=========================================
```

---

## 6. How to Run Locally

### Option 1: Python HTTP Server (Windows / Mac / Linux)
```bash
python -m http.server 8085
```
Open [http://localhost:8085](http://localhost:8085) in your web browser.

### Option 2: Windows 1-Click Launcher
Double-click `start_local.bat` in the project root.

---

## 7. Authors & Academic Affiliation

- **Zaidi**  
  *Final Year, Information Systems*  
  *School of ICT, College of Science and Technology (CST), University of Rwanda*
- **KAYUMBA TETA Aela Greta**  
  *Final Year, College of Science and Technology (CST), University of Rwanda*

*Built with pride for Rwandan smallholder farmers and VUP beneficiary households · NISR 2026 Big Data Hackathon.*
