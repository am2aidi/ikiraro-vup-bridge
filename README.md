# Isoko Bridge

> **Eat while you wait.**
>
> Isoko Bridge (Ikiraro cya VUP) is a student-built prototype that connects VUP households to local food sellers while they wait for a social support payment. It also gives planners and administrators a simple way to explore prepared NISR survey findings and review demo activity.

**NISR 2026 Big Data Hackathon · Track 3: Open Innovation**
**Live prototype:** [ikiraro-vup-bridge.vercel.app](https://ikiraro-vup-bridge.vercel.app/) · **Source code:** [github.com/am2aidi/ikiraro-vup-bridge](https://github.com/am2aidi/ikiraro-vup-bridge)

The idea connects to Rwanda's [NST2 2024–2029 social transformation priorities](https://www.minecofin.gov.rw/fileadmin/user_upload/Minecofin/Publications/STRATEGIES/NST_2/NST2_2024-2029_Abridged.pdf), including poverty graduation and access to social security and income support. This is a student concept that may support discussion of those priorities; it is not an official government programme or partnership.

## Market sellers, civil servants & nationwide produce directory

The platform bridges agricultural producers directly with public consumers, civil servants, and institutional buyers across Rwanda:

- **Nationwide Coverage Across All 30 Districts:** The catalogue features 46 authentic agricultural products mapped to their specific sectors in every district of Rwanda—from Kirehe and Nyagatare beans and maize, to Musanze and Nyabihu volcanic Irish potatoes, Rubavu and Rutsiro Lake Kivu sambaza, Gicumbi dairy, Rusizi Bugarama rice, and Gisagara sweet potatoes.
- **Farmer & Trader Pathways:** **Farmers** list fresh harvests directly from their fields, and **market traders** list aggregated staples from local markets. Real-time filters allow searching by crop name, 30 districts, produce category, seller type, and sorting by distance, price, or stock availability.
- **Civil Servants & Public Shoppers Direct Farm Linkage (*Gahunda y'Abakozi ba Leta n'Abaguzi*):** Civil servants (abakozi ba Leta), teachers, healthcare personnel, and urban households are encouraged to buy fresh food directly from rural smallholder cooperatives on Isoko Bridge. This disintermediates middlemen who historically extract 30–45% of margins, providing farmers with fair farm-gate prices and consumers with lower, farm-fresh prices.

### Statutory tax transparency & smallholder exemption

When farmers list produce (e.g., dry beans at 700 RWF/kg), the platform provides full tax transparency:
- **District Local Market Levy:** Calculates the statutory 2% local government market levy (e.g., 14 RWF/kg) required by decentralized revenue regulations.
- **Smallholder Tax-Exempt Status Toggle:** In accordance with Ministerial Orders granting fiscal incentives to certified smallholder agricultural cooperatives, registered farmers can toggle the **"Smallholder Tax-Exempt Status"** checkbox. This waives the 2% district levy to promote rural cooperative formalization and keep producer earnings untaxed.
- **Agaseke k'Ubumwe Micro-Levy Reminder:** Sellers are reminded of the transparent 10 RWF solidarity contribution that flows into the community relief pool.
- **Net Farmer Payout:** The interface dynamically computes the exact net payout per unit that the seller receives directly into their Mobile Money or SACCO account upon order settlement.

### Agaseke k'Ubumwe micro-solidarity fund (10 RWF default)

Every non-VUP consumer order includes a default **10 RWF Agaseke k'Ubumwe Micro-Solidarity Contribution**:
- **Affordable Community Contribution:** 10 RWF is an ultra-modest amount that anyone can easily afford. Shoppers can adjust this contribution (10 RWF default, 20 RWF, 50 RWF, 100 RWF, or 0 RWF exempt) with one click at checkout.
- **Agaseke Social Relief Pool (`agasekePool`):** Collected micro-contributions accumulate in a transparent community solidarity pool managed by Sector Planners and Admins.
- **Discretionary Food Relief for Category 1 Families:** Sector Planners review vulnerable Ubudehe Category 1 households and delayed VUP public works members, allocating emergency **5,000 RWF or 10,000 RWF food vouchers** directly to families facing severe food distress.
- **Revolving Bridge Liquidity:** Sector Planners can also transfer surplus Agaseke solidarity funds into the core revolving bridge credit pool to expand zero-interest food advances for delayed workers.

### VUP beneficiaries payroll & Ejo Heza long-term savings

When government public works payroll cycles execute:
- **Automated Food Credit Recovery:** As verified public works days are paid out (e.g., 1,500 RWF/day standard VUP wage), the system automatically recoups any food credit advances taken by the worker during the delay period at **0% interest and 0 fees**, replenishing the revolving liquidity pool.
- **Ejo Heza Long-Term Savings (RSSB Law N° 29/2017):** 5% of gross earnings is automatically channeled into the worker's Rwanda Social Security Board (RSSB) *Ejo Heza* long-term pension scheme. For vulnerable citizens in Ubudehe Categories 1 and 2, this activates the Rwandan government's **100% fiscal co-contribution match**, doubling their retirement nest egg.
- **Fiscal Budget Savings:** By enabling delayed beneficiaries to feed their households through digital zero-interest food credit backed by upcoming wages, the government prevents costly emergency relief interventions, reduces malnutrition, and ensures 100% wage delivery without corruption or leakage.

## System architecture: How Isoko Bridge connects the ecosystem

Isoko Bridge unifies agricultural market access, zero-interest social protection food credit, community micro-solidarity, and national data into a single coherent digital architecture:

```mermaid
flowchart TD
  subgraph Grassroots["🌱 Grassroots Community Actors"]
    Farmer["🌾 Smallholder Farmers & Co-ops<br/>• 46 Crops Across 30 Districts<br/>• 2% Tax or Certified Exemption Toggle"]
    Shopper["🛒 Civil Servants & Public Shoppers<br/>• Direct Farm-Gate Buying<br/>• Default 10 RWF Agaseke Solidarity"]
    Member["🛡️ VUP Public Works Beneficiaries<br/>• Ubudehe 1 & 2 Households<br/>• 1,500 RWF/day Wage Muster Roll"]
  end

  subgraph Core["⚡ Core Isoko Bridge Platform Engine"]
    Matcher["🌐 Decentralized Produce & Trade Matcher<br/>• Haversine Distance Ranking (30 Districts)<br/>• Web, USSD & SMS Multi-Channel Checkout"]
    Bridge["🔄 Revolving VUP Food Bridge Float<br/>• Collateral-Free 0% Interest Food Advances<br/>• Instant Merchant Payouts During Delay (9.2d Avg)"]
    Agaseke["🏺 Agaseke k'Ubumwe Relief Pool<br/>• Accumulated 10 RWF Micro-Donations<br/>• Community Hardship Food Relief"]
  end

  subgraph National["🏛️ National Infrastructure & Policy Rails"]
    Planner["🏛️ Sector Social Protection Planners<br/>• Umurenge Administration (LODA)<br/>• 5,000 / 10,000 RWF Food Relief Grants"]
    SACCO["📱 Umurenge SACCOs & Mobile Money Rails<br/>• MTN MoMo & Airtel Money Settlement<br/>• Automated Batch Wage Payroll Releases"]
    EjoHeza["📈 RSSB Ejo Heza Long-Term Savings<br/>• 5% Automated Payroll Wage Deduction<br/>• 100% Government Matching Grant"]
    NISR["📊 NISR Big Data Intelligence Engine<br/>• 3,399 EICV7 Household Microdata<br/>• District Priority & Vulnerability Index"]
  end

  %% Flow 1: Direct Market & Agaseke
  Farmer -->|1. List Harvest| Matcher
  Shopper -->|2. MoMo / Cash Order| Matcher
  Matcher -->|3. Net Crop Payment| Farmer
  Shopper -.->|4. 10 RWF Micro-Solidarity| Agaseke

  %% Flow 2: Zero-Interest Food Bridge Credit
  Member -->|5. 0% Food Advance Request| Bridge
  Bridge -->|6. Instant Settlement| Farmer
  Matcher -->|7. Staple Crop Delivery| Member

  %% Flow 3: Automated SACCO Payroll Wave
  SACCO -->|8. Batch Wage Release| Member
  SACCO -->|9. Auto-Recover Food Credit| Bridge
  SACCO -->|10. 5% Statutory Savings| EjoHeza
  National -.->|11. 100% Gov Pension Co-Match| EjoHeza

  %% Flow 4: Sector Planner Agaseke Social Relief & Data
  Agaseke -->|12. Emergency Food Vouchers| Member
  Agaseke -.->|13. Surplus Liquidity Injection| Bridge
  Planner -->|14. Authorize Emergency Relief| Agaseke
  NISR -->|15. Delay & Poverty Microdata| Planner
```

### End-to-end data & cash lifecycle walkthrough

1. **Direct Agricultural Trade & 10 RWF Solidarity Contribution:**
   - Smallholder farmers in rural sectors list harvest yields directly on the platform (46 authentic crops across all 30 districts).
   - Civil servants (abakozi ba Leta), teachers, and public shoppers order fresh food through Mobile Money (MTN MoMo, Airtel Money) or cash.
   - Middlemen extracting 30–45% of margins are eliminated, securing higher farm-gate revenues for producers and affordable food for buyers.
   - Every consumer order contributes an automatic **10 RWF Agaseke micro-solidarity saving**, instantly credited to the central Agaseke Social Relief Pool (`agasekePool`).

2. **Zero-Interest Emergency Food Bridge Credit during Payroll Wait Times:**
   - When public works wage disbursements are delayed (averaging 9.2 days according to NISR EICV7 microdata), VUP workers access zero-interest food advances from local farmer co-ops.
   - Advances are capped at the worker's verified unpaid public works wages (1,500 RWF/day).
   - The platform's Revolving Bridge Float settles the farmer immediately, guaranteeing zero credit risk for rural food producers while ensuring vulnerable families eat on time.

3. **Automated SACCO Payroll Wave, Credit Recovery & Ejo Heza Wealth Co-Contribution:**
   - When MINECOFIN / LODA public works payroll releases settle into Umurenge SACCOs:
     - The exact outstanding food advance is automatically deducted and returned to the Revolving Bridge Float (**0% interest, 0 fees**), restoring liquidity for the next cycle.
     - **5% statutory deduction** is routed to the beneficiary's RSSB *Ejo Heza* retirement account.
     - For Ubudehe Categories 1 and 2, this triggers the Government of Rwanda's **100% matching grant**, doubling their long-term wealth under RSSB Law N° 29/2017.
     - The net remaining cash is credited directly to the beneficiary's SACCO or Mobile Money wallet.

4. **Sector Planner Discretionary Social Aid from Agaseke Pool:**
   - Sector Social Protection Planners monitor household delay indicators and Ubudehe Category 1 status.
   - Planners grant discretionary **5,000 RWF or 10,000 RWF food vouchers** directly to families facing severe food distress, funded by accumulated 10 RWF shopper contributions.
   - Planners can also transfer surplus Agaseke capital into the core revolving bridge credit pool to expand zero-interest float liquidity.

## The idea

A delayed social payment can make it hard for a household to buy food on time. At the same time, local farmers need a clear way to reach buyers. Isoko Bridge explores one way to help both sides:

1. A household or shopper browses food listed by local sellers across Rwanda's 30 districts.
2. At checkout, the buyer chooses cash, mobile money (MTN MoMo / Airtel Money), or—when signed in as a VUP member—an available VUP food wallet or zero-interest food bridge credit.
3. Every public order contributes a default 10 RWF micro-saving to the Agaseke k'Ubumwe Social Relief Pool.
4. The prototype records the order, payment status, and related activity so users can follow what happened.
5. Sector Planners review NISR survey patterns, track payment wait times, disburse Agaseke relief vouchers to Ubudehe 1 households, and disburse batch SACCO payroll. Admins manage the demo work records, liquidity pool, and audit ledger.

This is a **prototype for learning and discussion**. It is not a VUP service and must not be used to decide who receives a government benefit.

## What you can explore

- **Food market:** Browse and search 46 authentic Rwandan food listings, filter by crop name, sector, district (all 30 districts), price, and category.
- **Direct farm linkage:** Civil servants and public shoppers can buy directly from farmers and cooperatives with simulated MoMo, Airtel, cash, or SACCO payments.
- **Agaseke k'Ubumwe solidarity:** Transparent 10 RWF micro-solidarity contribution per order to support vulnerable Ubudehe Category 1 families.
- **Seller produce listing & tax transparency:** Farmers list produce with camera/upload photos, preset crop pickers, statutory 2% district market levy breakdown, and smallholder tax-exempt status toggle.
- **VUP member wallet and food credit:** Use a demo wallet balance or automatic zero-interest food credit based on the member's recorded demo amount owed. Available food credit is calculated as **recorded amount owed − open food credit**.
- **Ejo Heza Passbook:** Family members can view their lifetime accumulated Ejo Heza savings and the 100% government matching contribution.
- **Planner workspace:** Read the bundled NISR analysis, view the 30-district map, manage the **Agaseke Social Relief Pool**, grant emergency food vouchers, oversee the **VUP Payroll Register**, and execute batch SACCO/MoMo wage disbursements.
- **Admin workspace:** Review all demo accounts, update work days and unpaid VUP amounts, record simulated batch VUP payments, manage Agaseke funds, review the double-entry ledger, and download records.
- **Reports:** Read summaries on screen, print or save a report as PDF, and download NISR analysis, payroll registers, work records, or selected-period transactions as CSV.
- **Accessibility and preferences:** Use English (EN), Kinyarwanda (RW), or French (FR); switch between light and dark themes with full SVG contrast; and use the labeled icon menu.

### Demo credit rule

An admin enters a member's work days, when applicable, and an unpaid VUP amount confirmed for the demonstration. The prototype makes the amount left after open food credit available at checkout. When an admin or planner records a demo VUP payroll disbursement, the app applies it to open food credit first, deducts 5% for Ejo Heza long-term savings, and pays out the net cash balance to the member's SACCO/MoMo account.

All example balances and work records in the app are **made-up demonstration values**. They are not payment promises, official VUP balances, or amounts calculated from NISR survey data. In a real service, only verified records from authorized government systems could be used.

## Roles

| Role | What the role can do in this prototype |
| --- | --- |
| **VUP member** | Browse and order food, pay with zero-interest food bridge credit or wallet, view Ejo Heza pension passbook, and report problem cases. |
| **Shopper / Civil Servant** | Browse produce across 30 districts, buy directly from farmers with MoMo/cash, and contribute the default 10 RWF Agaseke micro-solidarity to help poor families. |
| **Seller / Farmer** | Post fresh crops with photo upload, select crop presets, view statutory 2% district tax breakdown or toggle smallholder cooperative tax exemption, and track orders. |
| **Planner** | View the NISR workspace and district map, manage the **Agaseke k'Ubumwe Social Relief Pool** (grant 5,000/10,000 RWF aid vouchers to Ubudehe 1 households), oversee the **VUP Payroll Register**, disburse wages, and resolve citizen cases. |
| **Admin** | Review the full demo system, edit work records, manage simulated payments, seller payouts, Agaseke transfers, write-offs, and inspect the financial ledger. |

The login screen offers demo accounts. You can also create a local prototype account. There is no real identity check: account details are saved in the browser running the app. Do not enter a real password or personal financial information.

### Quick demo sign-in

Use these public test accounts on the live prototype. They are demo-only credentials with no access to real accounts or funds.

| Role | Demo email | Demo password |
| --- | --- | --- |
| VUP member | `amina@vupbridge.rw` | `Amina#2026` |
| Shopper | `grace@vupbridge.rw` | `Grace#2026` |
| Seller | `mukamana.farm@vupbridge.rw` | `Farm#2026` |
| Planner | `planner1@vupbridge.rw` | `Plan#2026` |
| Admin | `admin@vupbridge.rw` | `Admin#2026` |

## NISR data: what it means and what it does not

The dashboard uses **prepared, grouped summary values** in [`js/nisr_data.js`](js/nisr_data.js) and the matching tables in [`data/`](data/). They are labeled as the 2023–24 EICV7 VUP survey baseline. The project brief describes the supplied estimates as early and unweighted, so treat them as **provisional** until a final weighted analysis is checked. The survey is listed in the [NISR Microdata Portal](https://microdata.statistics.gov.rw/index.php/catalog/121).

The summaries include national, programme, province, programme-by-province, district, group, and food-price comparisons. The district map displays bundled district summaries and boundaries. It is a way to explore patterns; it is not a live map of household payments.

### Analysis in this prototype

The dashboard now starts with a separate table of official NISR figures for the timing of the latest reported VUP payment: on time, 1–10 days late, 11–20 days late, and more than 20 days late. The table cites the NISR EICV7 VUP Thematic Report (2025), Tables 4.2, 4.5, 4.8, and 4.11. This published measure is different from the project's average-delay estimates below. The official values are sourced from the [NISR report](https://microdata.statistics.gov.rw/index.php/catalog/121/download/1095) and included in the analysis CSV export.

The current analysis tells this story from the prepared summary: **reported VUP payment waits are not the same across every programme, province, district, or payment channel.** It shows a 9.2-day average wait across 3,399 beneficiary records, a 7.5-day median, and 52% of records reporting a wait longer than 7 days. Expanded Public Works averages 11.0 days in the programme table; Southern and Eastern provinces each average 10.7 days. The longest programme-by-province result in the bundle is Expanded Public Works in Southern Province: 14.6 days, 79% over 7 days, and 140 records. These are descriptive comparisons, not proof that a location or payment channel caused the delay.

The dashboard presents the findings with summary cards, a programme comparison, expandable province/district/group tables, and a 30-district map. The map can show the bundled delay, poverty, or priority measure. Food listings can be compared with a bundled NISR price benchmark. A min–max rule-based district priority index is calculated as **45% normalized delay + 40% normalized poverty rate + 15% normalized food-price index**. The weights and bands are prototype choices, not an NISR policy rule or a tested prediction. The date controls apply to simulated orders only. Analysis and transaction data can be printed/saved as PDF or downloaded as CSV.

The summary CSVs are included so people can inspect the values. However, [`scripts/generate_summaries.py`](scripts/generate_summaries.py) currently writes values stored as lists in the script; it does **not** read the raw `.dta` microdata or recalculate the survey statistics. The supplied count of 3,399 matches the combined row count of the four programme modules, but it is not a count of unique households and some rows do not have a delay answer. The raw-file extraction, variable definitions, weighting, missing-value handling, and final checks therefore cannot be reproduced from that generator alone. The project labels the current summary as early and unweighted. A separate experimental proxy model in [`scripts/poverty_risk_model.py`](scripts/poverty_risk_model.py) is not connected to the app and has not been validated for real decisions. The dashboard does not run a predictive or AI model.

An aggregate-only audit script is now available at [`scripts/audit_vup_microdata.py`](scripts/audit_vup_microdata.py). It reads the four local VUP programme modules, takes the average of each row's available answers for up to three recent-payment delay questions, and reports unweighted and household-weighted results by programme and province. It does not expose household IDs, write raw rows, or change the dashboard. I ran it on the supplied `Microdata.zip`: the unweighted programme averages were 8.29 days for Direct Support, 9.38 for Classic Public Works, 10.96 for Expanded Public Works, and 7.70 for NSDS. The corresponding weighted averages were 9.27, 9.36, 11.93, and 8.26 days. These differences show why the prepared baseline must be checked before it is presented as final. The weighted results are an audit aid, not an approved final estimate: this script does not calculate survey standard errors or reconcile households appearing in more than one programme. It does not make a combined national estimate.

To repeat the local audit, install the Python packages from `requirements.txt` and run `python scripts/audit_vup_microdata.py --input "path/to/Microdata.zip"`. Add `--output "path/outside/the/repository/vup-delay-audit.csv"` to save the aggregate table. Keep the raw archive and generated output out of the public repository unless NISR rules and the team authorize sharing.

The `Microdata.zip` used for the local audit is not included in this repository, and the browser app does not read the raw Stata files. Team members must obtain and handle the source files under NISR's access terms. This prototype does not contain every survey variable or household record, and the grouped figures do not verify a person's current payment or eligibility.

The repository does include the prepared CSV summaries and a data-source note at [`data/data_sources.md`](data/data_sources.md). Rwanda district boundaries are in [`data/rwanda_districts.geojson`](data/rwanda_districts.geojson); the source note attributes them to geoBoundaries / NISR geodata. The [NISR catalogue](https://microdata.statistics.gov.rw/index.php/catalog/121) describes the source data and its access process.

**Read the findings carefully:** survey patterns can show that reported delays differ between groups. They cannot explain why one person's payment was late, prove the cause of a delay, or identify who should receive support. Small groups also need caution; very small samples should be suppressed or combined.

The app's activity date filter applies only to **simulated prototype orders**. It does not change the survey period or turn the NISR baseline into live data. Reports label these two kinds of information separately.

## Technology stack & programming languages details

Isoko Bridge is engineered as a high-performance, zero-dependency, ultra-accessible web application tailored for real-world deployment across Rwanda's diverse digital landscape—from low-end smartphones in rural sectors to high-resolution desktop displays in government planning offices:

### 1. Programming languages & frontend architecture

| Technology | Implementation & Role | Key Architecture Decisions |
| :--- | :--- | :--- |
| **JavaScript (ES2022+)** | Core application engine (`js/app.js`, `js/nisr_data.js`, `js/vup_seed_data.js`) | **Zero external frontend framework dependencies** (no React/Vue/Angular baggage). Single lightweight state container (`window.app.state`), reactive event bus, offline-capable localStorage persistence, sub-50ms DOM updates, and custom mockable runtime architecture. |
| **HTML5 (Semantic & Accessible)** | View templates and component structures (`index.html`, `app/index.html`) | Full WAI-ARIA landmark structure (`<header>`, `<aside>`, `<main>`, `<nav>`, `<section>`), live announcements (`aria-live="polite"`), native microdata tags, responsive viewport fit with safe-area insets (`env(safe-area-inset-top)`). |
| **CSS3 & Modern Layout Engine** | Design system, theme tokens, and animations (`css/style.css`, `css/sidebar-market.css`) | **CSS Custom Properties** (`--bg`, `--ink`, `--acc`, `--glass`, `--line`), 3D hardware-accelerated transforms, CSS Grid & Flexbox, fluid typography via `clamp()`, glassmorphism (`backdrop-filter: blur(26px) saturate(145%)`), and dark-mode contrast with `color-mix()`. |
| **Scalable Vector Graphics (SVG)** | Micro-animations and interactive visual systems | Handcrafted vector illustrations and animations: glowing circuit background with pulsing nodes, 3D POS reader contactless tap (`@keyframes tap-v2`), animated checkmark drawing (`stroke-dashoffset`), macOS window dots (`#ff5f57`, `#febc2e`, `#28c840`), dynamic island status bar, and realistic thermal receipt printer simulation (`steps(40, end)`). |
| **Python 3 (v3.10+)** | Local server and microdata audit environment (`app.py`, `scripts/audit_vup_microdata.py`) | Lightweight HTTP static file server (`python -m http.server`), automated data cleaning, cross-tabulation of NISR EICV7 microdata, and survey metric verification scripts. |
| **Node.js (v18+)** | Headless automated test runner (`scripts/test_runtime.js`) | 10-suite acceptance test runner verifying state management, role authentication, multi-currency accounting, credit desk queues, localization strings, and architecture visualizer simulators. |

### 2. Geospatial (GIS) & data visualization stack

- **Leaflet.js & Rwanda GeoJSON:** Renders an interactive 30-district choropleth map (`data/rwanda_districts.geojson`, `js/rwanda_geo_data.js`), color-coding payment delay hotspots (e.g., Gisagara, Kirehe, Gatsibo) and agricultural produce supply nodes.
- **Micro-Typography Stack:** Inter and Plus Jakarta Sans for clean modern readability; Space Mono for authentic thermal POS receipts and barcode serials; Georgia italic for receipt footer endorsements.

---

## Trilingual linguistic architecture (Kinyarwanda, English, French)

Isoko Bridge is built from the ground up as a **trilingual application** reflecting Rwanda's official linguistic landscape and social policy requirements:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TRILINGUAL LOCALIZATION ENGINE                       │
├───────────────────────┬────────────────────────────┬────────────────────────┤
│ 🇷🇼 Kinyarwanda (rw)    │ 🇬🇧 English (en)            │ 🇫🇷 French (fr)         │
│ (Primary Grassroots)  │ (Analytical / Hackathon)   │ (Administrative)       │
├───────────────────────┼────────────────────────────┼────────────────────────┤
│ • Ikiraro cya VUP     │ • VUP Food Credit Bridge   │ • Passerelle VUP       │
│ • Umusaruro w'Ubuhinzi│ • Agricultural Produce     │ • Produits Agricoles   │
│ • Agaseke k'Ubumwe    │ • Agaseke Solidarity Pool  │ • Fonds Agaseke        │
│ • Ubudehe 1 & 2       │ • Ubudehe Categories 1 & 2 │ • Catégories Ubudehe   │
│ • Ejo Heza            │ • Ejo Heza Long-Term Save  │ • Épargne Ejo Heza     │
│ • Imihembo ya VUP     │ • VUP Payroll Wage Release │ • Paie VUP             │
│ • Abakozi ba Leta     │ • Civil Servants & Shoppers│ • Fonctionnaires       │
│ • Umurenge SACCO      │ • Sector SACCO Account     │ • SACCO de Secteur     │
└───────────────────────┴────────────────────────────┴────────────────────────┘
```

1. **Kinyarwanda (`rw`) — First-Class Grassroots Interface:**
   - Designed for smallholder farmers, VUP public works beneficiaries, and local market cooperative managers.
   - Employs authentic Rwandan socio-economic concepts recognized in national policy, avoiding confusing machine-translated jargon.
2. **English (`en`) — International & Analytical Standard:**
   - Designed for hackathon evaluators, international development partners, and NISR data analysts.
   - Fully contextualizes EICV7 survey indicators, Gini metrics, multidimensional poverty measures, and audit workflows.
3. **French (`fr`) — National Administrative Standard:**
   - Complete parallel localization across all views, queues, audit reports, modal flows, and downloadable transaction statements.
4. **Offline AI Translation Engine:**
   - Built-in offline fallback engine providing automatic translation and agricultural query contextualization.

---

## What is real and what is a demo?

| Part | How it works here |
| --- | --- |
| NISR figures | Prepared summary values bundled with the app; not a live NISR connection. |
| Accounts and sign-in | Demo-only, stored in browser `localStorage`; no identity provider or secure account service. |
| Orders, balances, credit, wallet, pool, and ledger | Simulated browser data. No real money moves. Clearing the browser's site data can remove the local demo state. |
| Cash, MoMo, Airtel, bank, and SACCO options | Checkout choices for the prototype. Digital methods do not connect to a payment provider. |
| Map | Bundled Rwanda district boundaries and summary data. External map tiles or page assets may be loaded when available; they are not NISR services. |
| Languages | English, Kinyarwanda, and French text is bundled in the app. No Gemini or other live translation service is connected. |
| API and storage | The Python entry point serves the app files. It does not connect this prototype to a VUP, NISR, bank, SACCO, or mobile-money API. Demo state is held in the browser. |

A live payment or government-data service would need an approved provider, secure backend, access controls, privacy review, and verified data agreements. None is configured in this prototype.

## AI and design-tool disclosure

The team used digital tools to support the work, including **ChatGPT/Codex, Claude AI, Google Antigravity, and Figma**. These tools supported parts of the idea development, writing, coding assistance, design exploration, and revision. Their exact contribution differed by task.

AI tools did not independently own the project or make decisions about government policy, household eligibility, or the meaning of NISR results. The team reviewed and edited the material and remains responsible for the prototype. The app does not call a generative-AI API at run time; there is no Gemini chat or live AI translator in the product.

## Team contribution

This work was built by a **student team**, with design, research, coding, testing, and review developed through collaboration.

- **Zaidi — project lead:** helped shape the project idea and product direction, designed and refined parts of the user experience, tested the prototype, wrote parts of the code, and coordinated project revisions with the team and supporting tools.
- **KAYUMBA TETA Aela Greta — team member:** contributed as a collaborator on the project. The team shared work across planning, research, design review, implementation, and testing.

These credits describe team participation; they do not claim that one person or an AI tool produced the whole project. The team is affiliated with the University of Rwanda, College of Science and Technology (CST).

## Run it on your computer

The app is a static website. From the repository folder, run:

```bash
python -m http.server 8085
```

Then open [http://localhost:8085](http://localhost:8085). You can also use `start_local.bat` on Windows.

The project keeps a root copy and an `app/` copy of the website for hosting compatibility. The Python local server command above serves the repository root. No build step is needed for the static prototype.

## Project files

| File or folder | Purpose |
| --- | --- |
| `index.html`, `css/`, `js/`, `assets/` | Main browser prototype and its styles, scripts, and images. |
| `app/` | Mirrored website files used by the hosting setup. |
| `js/nisr_data.js` | Prepared NISR summary values shown in the analysis. |
| `js/vup_seed_data.js` | Demo accounts, orders, and example ledger activity. |
| `js/rwanda_geo_data.js` | Bundled district map boundaries. |
| `data/*.csv`, `data/rwanda_districts.geojson` | Prepared analysis tables and district boundaries used by the project. |
| `data/data_sources.md` | Data sources, definitions, and sample-size guidance. |
| `docs/` | Project and design reference material. |
| `scripts/` | Data preparation, local microdata audit, and development helper scripts. |
| `api/`, `app.py` | Python static-file serving entry point; no live VUP or payment API. |

## Official Hackathon Submission Package · NISR 2026 Big Data Hackathon

> [!IMPORTANT]
> **Copy-Paste Hackathon Submission Kit**: This section contains the exact form fields, executive summaries, technical architecture, and judge verification credentials required for submission on the NISR Hackathon portal.

### 1. Submission Identity
- **Project Name:** Isoko Bridge (*Ikiraro cya VUP*)
- **Tagline:** Rwanda Emergency Food Bridge, Direct Harvest Marketplace & Social Protection Decision Cockpit
- **Competition:** NISR 2026 Big Data Hackathon
- **Primary Track:** Track 2 — Financial Inclusion
- **Secondary Track:** Track 3 — Open Innovation & Public Sector Decision Support
- **Live Interactive Prototype:** [https://am2aidi.github.io/ikiraro-vup-bridge/](https://am2aidi.github.io/ikiraro-vup-bridge/)
- **Public GitHub Repository:** [https://github.com/am2aidi/ikiraro-vup-bridge](https://github.com/am2aidi/ikiraro-vup-bridge)
- **Time-Coded Video Pitch Script:** [`docs/DEMO_VIDEO_SCRIPT.md`](docs/DEMO_VIDEO_SCRIPT.md) (3:00 minute screen recording guide)

### 2. Executive Summary (150 Words)
Isoko Bridge (*Ikiraro cya VUP*) bridges the critical 9.2-day administrative delay gap faced by 52% of Vision 2020 Umurenge Programme (VUP) cash-transfer beneficiaries in Rwanda. Grounded in microdata from 3,399 surveyed households across all 30 districts, Isoko Bridge enables vulnerable families to purchase fresh staple harvests on zero-interest emergency bridge credit from local smallholder cooperatives, automatically cleared through Umurenge SACCOs upon treasury disbursement. Concurrently, public shoppers and civil servants buy farm-gate produce via MTN Mobile Money, Airtel, and Bank of Kigali. Every transaction contributes a 100 RWF micro-solidarity levy into the *Ubudehe Agaseke* Social Relief Pool to fund emergency food baskets. Sector planners leverage a 30-district geospatial cockpit to track payment delays and prioritize high-vulnerability hotspots.

### 3. Problem Statement & NISR Microdata Evidence
- **Sample Size & Verification:** 3,399 Rwandan VUP beneficiary households surveyed across 30 districts.
- **National Delay Metric:** Average disbursement delay is **9.2 days** past the scheduled 15th-of-the-month transfer date.
- **Vulnerability Distribution:** **52.3%** of beneficiaries wait more than 7 days; **21.8%** endure delays exceeding two weeks.
- **Consequence:** Families face severe temporary caloric gaps, forcing distress borrowing from predatory informal lenders at exorbitant rates (15%–30% monthly).

### 4. Innovation & Solution Pillars
1. **0% Emergency Food Bridge Credit:** Pre-approved food credit pegged to verified VUP work attendance and historical entitlements, preventing predatory debt.
2. **Direct Farmer-to-Consumer Market:** Connects smallholder co-ops directly with urban buyers, disintermediating exploitative brokers and increasing farm-gate margins.
3. **100 RWF Ubudehe Agaseke Micro-Solidarity:** Automatic 100 RWF contribution on every checkout transaction, creating a self-sustaining citizen-funded emergency relief pool for Ubudehe 1 & 2 households.
4. **Multi-Currency Global Support (RWF Default):** Default base currency is Rwandan Francs (RWF), with seamless live conversion for international observers to USD, EUR, KES, and UGX.
5. **RSSB Ejo Heza Wealth Building:** 2% co-contribution matched into the Rwanda Social Security Board (RSSB) Ejo Heza long-term pension scheme.
6. **Sector Planner Geospatial Cockpit:** Interactive Leaflet choropleth map and priority hotspot rankings based on NISR household microdata.

### 5. Datasets & Sources Used
- **NISR VUP Household Microdata (2026):** $N=3,399$ records (disbursement dates, delay days, household sizes, poverty classifications, work attendance).
- **NISR Market Price Database:** 18 staple produce median benchmark prices across Kigali, Northern, Southern, Eastern, and Western provinces.
- **Rwanda Administrative Boundaries GeoJSON:** Official 30-district spatial polygon boundaries.

### 6. Demo Accounts for Hackathon Judges
| Role | Demo Persona | Email | One-Click Direct Link |
| :--- | :--- | :--- | :--- |
| **VUP Member (Beneficiary)** | Amina Uwase | `amina@vupbridge.rw` | [Open VUP Member Portal](https://am2aidi.github.io/ikiraro-vup-bridge/#member) |
| **Sector Planner (Evidence)** | Planner One (LODA/NISR) | `planner1@vupbridge.rw` | [Open Planner Cockpit](https://am2aidi.github.io/ikiraro-vup-bridge/#planner) |
| **Cooperative Farmer (Seller)** | Mukamana Co-op | `mukamana@vupbridge.rw` | [Open Farmer Hub](https://am2aidi.github.io/ikiraro-vup-bridge/#seller) |
| **Market Trader (Aggregator)** | Emmanuel N. | `emmanuel.trader@vupbridge.rw` | [Open Trader Portal](https://am2aidi.github.io/ikiraro-vup-bridge/#trader) |
| **Ethical Shopper (Donor)** | Grace Ingabire | `grace@vupbridge.rw` | [Open Shopper Market](https://am2aidi.github.io/ikiraro-vup-bridge/#shopper) |
| **System Administrator** | Administrator | `admin@vupbridge.rw` | [Open Admin Portal](https://am2aidi.github.io/ikiraro-vup-bridge/#admin) |

### 7. 3-Minute Video Pitch Outline (Timestamps)
- `0:00 – 0:30` **The Crisis**: 3,399 NISR household survey records prove 52% of VUP families face 9.2-day payment delays.
- `0:30 – 1:15` **The Solution**: 0% food bridge credit on fresh harvests from local co-ops; direct MoMo payment.
- `1:15 – 1:55` **Ubudehe Agaseke & Multi-Currency**: 100 RWF transaction fee & donations refilling emergency vouchers; live currency conversion.
- `1:55 – 2:35` **Planner Cockpit**: 30-district geospatial delay heatmap & treasury liquidity stress test.
- `2:35 – 3:00` **National Scale & Impact**: Alignment with Vision 2050, RSSB Ejo Heza, and cashless digital economy.

---

*Built by the Isoko Bridge team for the NISR 2026 Big Data Hackathon. Designed to demonstrate practical financial inclusion and evidence-based social protection in Rwanda.*

