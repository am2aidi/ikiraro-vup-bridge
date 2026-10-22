# Isoko Bridge (Ikiraro VUP Bridge)

> **A direct food market, emergency social payment bridge, and decision-support planner tool for Rwandan households receiving Vision 2020 Umurenge Programme (VUP) support.**

**NISR 2026 Big Data Hackathon Submission**  
**Track:** Track 3: Open Innovation *(or Track 2: Financial Inclusion and Poverty Reduction)*  
**Lead Author:** Zaidi (Reg. No: 223008014), Year 3 Information Systems, University of Rwanda (CST)  
**Co-Author:** ____________________, University of Rwanda  
**Repository:** [github.com/am2aidi/ikiraro-vup-bridge](https://github.com/am2aidi/ikiraro-vup-bridge)  

---

## 1. Executive Summary & Problem Statement

Many low-income families across Rwanda depend on regular VUP social protection transfers to purchase food and essential sustenance. However, National Institute of Statistics of Rwanda (NISR) household survey data demonstrates that disbursements frequently encounter administrative delays:
- **Average disbursement delay:** **9.2 days**, with over **52%** of recipient families waiting more than one week.
- In severe hotspot zones—such as Expanded Public Works in the Southern Province—delays climb to **14.6 days**, with **79%** paid over 7 days late.
- During these acute delay gaps, vulnerable households face acute food insecurity or are forced into informal high-interest debt. Simultaneously, local smallholder farmers often struggle with post-harvest market access and fair pricing.

**Isoko Bridge** solves this through three integrated pillars:
1. **Direct Agricultural Market:** Smallholder farmers list harvest produce with real-time fair price benchmarks anchored directly to official NISR median market prices.
2. **Emergency Social Payment Bridge:** When a family's VUP disbursement is late, a zero-interest emergency bridge credit line automatically opens based on family size and delay days (`people × daily_food_cost × days_late`). The family buys food immediately; a community-backed revolving social pool pays the farmer upon delivery; and when the government VUP payment subsequently arrives, the credit is reimbursed back to the pool.
3. **Evidence-Based Planner Intelligence:** District and central government planners access real-time dashboards mapping provincial/district disbursement delays, smallholder price gaps, poverty risk distributions, and a 30-district composite "Help Here First" priority index.

---

## 2. Real, Simulated, and Assumed Components

In strict transparency according to Section 8 of the project specification:

| Component Type | Included Elements | Data Source & Treatment |
| :--- | :--- | :--- |
| **Real NISR Analysis** | Disbursement delays, provincial & district hotspots, demographic breakdowns, poverty proxy model, financial access channels, baseline commodity prices. | Derived directly from NISR VUP household survey microdata ($N = 3,399$ beneficiaries). |
| **Simulated (Demo)** | Farmers, cooperative product listings, consumer orders, bridge credit issuance, donation pool balances, and currency transfers. | Functional local prototype with state persistence (fake money; no real currency is moved). |
| **Assumed Parameters** | Daily adult food consumption (e.g. 120g beans, 300g potatoes, etc. $\approx$ 261 RWF/person/day), regular shopper donation share (1%–5%), monthly consumer budget. | Calibrated to Rwanda household consumption benchmarks. |

---

## 3. Account Roles & Demo Credentials

The platform features role-based access control with four specialized interfaces. For demonstration and judging, pre-configured accounts are provided below:

| Role | Name | Username | Password | Context / Details |
| :--- | :--- | :--- | :--- | :--- |
| **VUP Member** | Amina Uwase | `amina_family` | `Amina#2026` | Direct Support, 5 people, Kirehe District (active 8-day delay) |
| **VUP Member** | Jean Bosco | `bosco_family` | `Bosco#2026` | Expanded Public Works, 6 people, Gisagara District |
| **Seller / Farmer** | Mukamana Farm | `mukamana_seller` | `Farm#2026` | Dry beans seller, Kirehe District, MoMo account linked |
| **Seller / Farmer** | Nyabihu Potato Coop | `nyabihu_seller` | `Coop#2026` | Irish potato cooperative, Nyabihu District |
| **Ethical Shopper** | Grace Ingabire | `grace_shopper` | `Grace#2026` | Urban consumer donating 2% of cart to the bridge pool |
| **Ethical Shopper** | Eric Mugisha | `eric_shopper` | `Eric#2026` | Urban consumer donating 3% of cart to the bridge pool |
| **Government Planner** | Planner Demo | `planner_demo` | `Plan#2026` | Full administrative, analytical, and policy planning access |

> **Note:** A one-click role switcher is provided on the login page for rapid review without manual password typing.

---

## 4. System Architecture & Features by Role

### A. VUP Beneficiary Family View
- **Payment Status Tracker:** Displays enrolled programme (Direct Support, cPW, ePW, NSDS), reported payment delay, and real-time status.
- **Dynamic Bridge Credit:** Automatically calculates available emergency credit balance.
- **Fair-Price Market:** Enables ordering staple produce on bridge credit during active delays or cash when payments are on schedule.
- **Affordable Meal Guide:** Practical recipe cost estimations aligned with NISR food price indices.

### B. Smallholder Farmer / Seller View
- **Produce Listing Management:** Quick entry of available crops (beans, potatoes, maize, bananas, vegetables) with quantity and pricing.
- **NISR Price Guidance Indicator:** Visual badge flagging whether the farmer's price is **Fair** (within $\pm15\%$ of NISR median), **Low**, or **High**.
- **Delivery Fulfillment:** One-click confirmation of produce delivery; triggers instantaneous guaranteed payment from the social bridge pool.

### C. Ethical Shopper View
- **Direct Local Farm Produce:** High-quality food purchase at transparent farm-gate prices.
- **Micro-Donation Slider:** Allows shoppers to allocate $1\%$ to $5\%$ of their basket value directly into the VUP social bridge pool.
- **Impact Metrics:** Real-time calculation showing how many family-days of food nutrition their purchases have subsidized.

### D. Government & District Planner View
- **Interactive Rwanda 30-District Choropleth Map:** Visualizes payment delays, poverty prevalence, and priority scores across all 30 districts.
- **Hotspot Heatmap:** Two-way cross-tabulation of average delay and percentage waiting $>7$ days across programmes and provinces.
- **District Priority Ranking:** Composite multi-criteria decision tool identifying which districts require urgent payment logistics interventions.
- **Poverty Risk Proxy Tool:** Interactive simulator predicting household poverty vulnerability based on dwelling facts without income bias.
- **VUP Payment Simulation:** Allows planners to simulate treasury disbursement waves, automatically liquidating outstanding credit and replenishing the revolving pool.

---

## 5. Repository File Structure

```text
ikiraro-vup-bridge/
├── README.md                           # Master project documentation, user guide, and methodologies
├── DECLARATION.md                      # Official declaration of originality, citations, and AI disclosure
├── requirements.txt                    # Python environment requirements
├── package.json                        # Node.js dependencies for local PWA runtime
├── app/                                # Complete web application source code
│   ├── index.html                      # Single-page application entry point (all 4 roles + map)
│   ├── css/                            # Responsive styling (light/dark mode, mobile-first)
│   ├── js/                             # State management, data analytics visualizers, simulation engine
│   └── manifest.json                   # Progressive Web App (PWA) configuration
├── data/                               # Aggregated NISR summary data (Zero PII)
│   ├── data_sources.md                 # Full provenance and NISR Microdata links
│   ├── rwanda_districts.geojson        # 30-district geospatial boundaries (geoBoundaries ADM2)
│   ├── summary_delays_by_programme.csv # Programme delay statistics
│   ├── summary_delays_by_province.csv  # Provincial delay statistics
│   ├── summary_district_priority_scores.csv # 30-district composite priority rankings
│   ├── summary_beneficiary_groups.csv  # Socioeconomic & channel delay breakdowns
│   ├── summary_hotspots_programme_province.csv # Hotspot cross-tabulations
│   ├── summary_food_prices.csv         # NISR benchmark commodity prices
│   └── summary_finance_access.csv      # Financial inclusion and credit constraints
├── docs/                               # Competition briefs and reference specifications
│   ├── VUP_Bridge_Full_Project.pdf     # Full 13-page project specification
│   └── 2026_NISR_Hackathon_Webinar.pdf # NISR preparatory webinar guidelines
├── scripts/                            # Data processing and analytical model pipelines
│   ├── generate_summaries.py           # Generates all summary CSVs from survey benchmarks
│   ├── delay_tables.py                 # Formatted delay and hotspot reporting
│   ├── district_priority_score.py      # Composite prioritization index calculator
│   └── poverty_risk_model.py           # Household poverty risk proxy classifier
└── demo/                               # Demonstration video asset directory
    └── README.md                       # Demo video script and walkthrough notes
```

---

## 6. How to Run Locally

The application is completely self-contained, lightweight, and requires no complex build tools or database configuration.

### Option 1: Standalone Web Browser (Zero Installation)
Simply open `app/index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

### Option 2: Local Python Server
```bash
# Clone the repository
git clone https://github.com/am2aidi/ikiraro-vup-bridge.git
cd ikiraro-vup-bridge

# Run lightweight HTTP server
python -m http.server 8000
```
Then visit `http://localhost:8000/app` in your browser.

### Option 3: Run Analysis Scripts
```bash
# Optional: install dependencies
pip install -r requirements.txt

# Run delay & hotspot analysis
python scripts/delay_tables.py

# Run 30-district priority model
python scripts/district_priority_score.py

# Run poverty risk proxy evaluation
python scripts/poverty_risk_model.py
```

---

## 7. Analytical Methodology & Limitations

1. **Patterns, Not Reasons:** As emphasized throughout the application, survey delays are self-reported by beneficiary households reflecting their experienced waiting period. The data highlights *where* systemic friction occurs; administrative audits by LODA and local government are necessary to diagnose exact root causes.
2. **Post-Support Poverty Measurement:** In the survey sample, poverty status is classified after social assistance transfers are delivered. Consequently, observed correlations between poverty depth and delay duration denote structural vulnerability, not unidirectional causality.
3. **Small Sample Warnings:** Any geographical or cross-tabulated cohort with fewer than 100 survey responses is highlighted with a statistical caution badge, and cohorts under 25 are suppressed from automated ranking.
4. **Proxy Means Testing Ethics:** The poverty risk estimation model is strictly intended for macroscopic district and sector planning. It is explicitly not designed to mechanically determine individual eligibility.

---

## 8. Alignment with National Development Priorities

- **NST2 (Second National Strategy for Transformation):** Directly advances the Social Transformation pillar by reinforcing social safety nets, accelerating graduation from poverty, and mitigating food vulnerability during administrative transitions.
- **Rwanda Vision 2050:** Supports the *Human Capital Development* and *High Quality and Standards of Life* targets by ensuring zero hunger among vulnerable children and pregnant mothers (NSDS).
- **Financial Inclusion Strategy:** Fosters informal-to-formal financial bridging, integrating Umurenge SACCOs and Mobile Money mechanisms into responsive social protection.

---

## 9. Submission Checklist Verification

- [x] Public GitHub repository configured: `https://github.com/am2aidi/ikiraro-vup-bridge`
- [x] Standard repository layout matching webinar specifications (`README.md`, `scripts/`, `data/`, `app/`, `demo/`, `requirements.txt`)
- [x] Deployed web application accessible without login barriers
- [x] Sample credentials and 1-click role switcher provided
- [x] `DECLARATION.md` completed with originality, citations, and AI-use disclosures
- [x] Data privacy compliant: only aggregated tables published, raw PII omitted
- [x] Script verified to execute reliably on clean machines
