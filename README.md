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

The prepared NISR EICV7 VUP survey summary in this prototype reports delays in monthly social protection transfers. These figures are early, unweighted estimates from the supplied project materials, not a live feed:
- **National average delay:** **9.2 days**; **52%** of records report a wait longer than 7 days.
- **Example hotspot:** Expanded Public Works in the Southern Province shows **14.6 days** average delay and **79%** waiting more than 7 days in the provided summary.
- **The Acute Delay Gap:** When government payments are late, low-income families face severe food insecurity or predatory informal loans. Simultaneously, local smallholder farmers lack direct urban and peri-urban market access.

**VUP Bridge** bridges this exact gap:
1. **Direct Rwandan Harvest Market:** Farmers list produce with photos and GPS proximity, benchmarked against official NISR median market prices.
2. **Emergency Social Bridge Credit:** When VUP cash transfers are late, eligible families receive instant zero-interest credit (`people × daily_food_cost × days_late`) to purchase staple food.
3. **Revolving Social Pool:** Community shoppers donate 1%–5% with each grocery purchase. The pool pays farmers immediately upon delivery; when government VUP transfers arrive, the credit is reimbursed back to the pool.
4. **Planner & Admin dashboards:** Users can explore the bundled district summaries, the 3 Credit Desk queues, problem reports, and downloadable prototype records.

---

## 2. Real vs. Simulated vs. Assumed Components (Section 2 Compliance)

| Component Type | Included Elements | Data Source & Treatment |
| :--- | :--- | :--- |
| **Bundled NISR survey summaries** | National, programme, province, programme-by-province, district, group, and commodity-price summaries. | Included in `js/nisr_data.js`; fixed 2023–24 EICV7 VUP survey baseline. The supplied build brief labels the provided summary figures early and unweighted. Treat them as provisional until the final weighted analysis is confirmed. |
| **Simulated (Demo)** | Accounts, listings, orders, checkout, VUP wallet, bridge credit, pool ledger, audit log, and cases. | Stored in browser `localStorage`. `Prototype. Fake money.` No real payment or VUP transfer is made. |
| **Assumed Parameters** | Example daily food basket and shopper pool gift rate. | Demo settings, not live NISR measurements. Check the source and units before using a benchmark for real pricing or policy. |

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

### C. Language Support
- The language selector uses translations bundled with the app in English (EN), Kinyarwanda (RW), and French (FR).
- No Gemini translator or other translation API is connected.

### D. Single Immutable Ledger & Problem Dispute Cases
- **Immutable Financial Ledger:** Transactions are never edited or deleted. Errors are corrected via linked reversal entries.
- **🚩 Report a Problem:** Available on every order and ledger transaction. Creates an open Case in the Planner and Admin dispute queues.
- **Admin Failure Switch:** Toggle `"Make the next payment fail"` to simulate a mobile money float failure and test problem resolution.

### E. Statements & Analysis Reports
- Downloadable **PDF / CSV Statements** for every role (statement number, period, itemized transactions, credit, repaid balance).
- **Analysis report:** Printable report containing the provisional NISR baseline, simulated pool activity, and district summaries.

### F. Planner/Admin NISR Analysis Workspace
- The overview dashboard links to a plain-language NISR analysis with national, programme, province, district, payment-method, demographic, and sample-size comparisons.
- The EICV7 baseline is fixed to the **2023–24 survey period**. The activity filter (Today, last 7 days, last 30 days, last 12 months, or custom dates) applies only to simulated prototype orders; it never changes or re-dates NISR results.
- Download the NISR analysis as CSV, print/save a combined NISR and selected-period activity report as PDF, or download the selected-period transactions as CSV.
- The report labels simulated activity and provisional survey summaries. It explains that the survey shows patterns, not individual causes, and does not establish a household's current payment status.


### NISR data source, coverage, and limits

The dashboard reads prepared summary values from `js/nisr_data.js`; it does not download current data from NISR. The values identify an EICV7 VUP survey baseline, and the supplied build brief describes them as early, unweighted estimates. They are provisional and have not been independently recalculated from raw survey records for this prototype.

The bundled summaries cover national totals and delays; VUP programme and province comparisons; programme-by-province hotspots; group comparisons for poverty level, payment channel, rural or urban area, gender, and age; district delay, poverty, price index, priority score, and sample count; and food price benchmarks. Rwanda district boundaries are bundled in `js/rwanda_geo_data.js`. The map can show the bundled district measures, but the district data does not include a district-level share of households waiting over seven days.

The separate `Microdata.zip` supplied for the project contains raw NISR Stata (`.dta`) survey modules. The ZIP is not in this repository, and the browser does not read those files. So the dashboard does **not** include every detail or personal record from the raw survey. It shows only the prepared, grouped values listed above. Survey patterns cannot explain a particular family's delay or confirm its current payment or eligibility.

### Live API and external services

- **NISR API:** None is connected. Survey figures stay fixed until the bundled summary file is changed. Date filters apply only to simulated prototype activity.
- **Payments and login:** No real bank, SACCO, MTN MoMo, Airtel Money, or identity service is connected. Demo accounts, balances, orders, and payments are saved in browser storage and are not real transactions.
- **Map:** District boundaries are local. Leaflet, fonts, and icons may load from external CDNs; CARTO may provide background map tiles when available. These services do not provide NISR survey data. The map has a local SVG fallback.
- **Languages:** English, Kinyarwanda, and French text is bundled. The translation helper works offline and does not send text to Gemini or another translation API.

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
--- TEST 4: Offline language helper ---
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
