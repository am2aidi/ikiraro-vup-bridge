# Isoko Bridge

> **Eat while you wait.**
>
> Isoko Bridge (Ikiraro cya VUP) is a student-built prototype that connects VUP households to local food sellers while they wait for a social support payment. It also gives planners and administrators a simple way to explore prepared NISR survey findings and review demo activity.

**NISR 2026 Big Data Hackathon · Track 3: Open Innovation**
**Live prototype:** [ikiraro-vup-bridge.vercel.app](https://ikiraro-vup-bridge.vercel.app/) · **Source code:** [github.com/am2aidi/ikiraro-vup-bridge](https://github.com/am2aidi/ikiraro-vup-bridge)

## The idea

A delayed social payment can make it hard for a household to buy food on time. At the same time, local farmers need a clear way to reach buyers. Isoko Bridge explores one way to help both sides:

1. A household or shopper browses food listed by local sellers.
2. At checkout, the buyer chooses cash, a simulated digital payment, or—when signed in as a VUP member—an available VUP food wallet or automatic food credit.
3. The prototype records the order, payment status, and related activity so users can follow what happened.
4. Planners can review survey patterns and help with reported problems. Admins manage the demo work records and money controls.

This is a **prototype for learning and discussion**. It is not a VUP service and must not be used to decide who receives a government benefit.

## What you can explore

- **Food market:** Browse and search demo food listings, see seller and district information, add products to a cart, and change quantities.
- **Checkout:** Choose cash on delivery or pickup, or choose a simulated MTN MoMo, Airtel Money, or bank/SACCO option. No digital payment is actually sent.
- **VUP member wallet and food credit:** Use a demo wallet balance or automatic food credit based on the member's recorded demo amount owed. Available food credit is calculated as **recorded amount owed − open food credit**. There is no planner approval step.
- **Planner workspace:** Read the bundled NISR analysis, view the district map, filter simulated activity by date, and help members report and resolve cases.
- **Admin workspace:** Review all demo accounts, update a member's work days and unpaid VUP amount, record a simulated VUP payment, manage demo money actions, review the ledger, and download records.
- **Reports:** Read summaries on screen, print or save a report as PDF, and download NISR analysis, work records, or selected-period transactions as CSV.
- **Accessibility and preferences:** Use English (EN), Kinyarwanda (RW), or French (FR); switch between light and dark themes; and use the labeled icon menu.

### Demo credit rule

An admin enters a member's work days, when applicable, and an unpaid VUP amount confirmed for the demonstration. The prototype makes the amount left after open food credit available at checkout. When an admin records a demo VUP payment, the app applies it to open food credit first and puts any remaining amount in the member's demo food wallet.

All example balances and work records in the app are **made-up demonstration values**. They are not payment promises, official VUP balances, or amounts calculated from NISR survey data. In a real service, only verified records from authorized government systems could be used.

## Roles

| Role | What the role can do in this prototype |
| --- | --- |
| **VUP member** | Browse and order food, choose an available payment option, view food credit and wallet examples, and report a problem. |
| **Shopper** | Browse and order food, choose a payment option, and see the demo community-pool contribution. |
| **Seller** | View demo orders and manage produce listings. |
| **Planner** | View the NISR workspace and activity, help with cases, and send money-related problems to an admin. Planners cannot change balances, grant credit, or record payments. |
| **Admin** | Review the full demo system, edit work records, and manage simulated payments, seller payouts, repayments, and write-offs. |

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

The current analysis tells this story from the prepared summary: **reported VUP payment waits are not the same across every programme, province, district, or payment channel.** It shows a 9.2-day average wait across 3,399 beneficiary records, a 7.5-day median, and 52% of records reporting a wait longer than 7 days. Expanded Public Works averages 11.0 days in the programme table; Southern and Eastern provinces each average 10.7 days. The longest programme-by-province result in the bundle is Expanded Public Works in Southern Province: 14.6 days, 79% over 7 days, and 140 records. These are descriptive comparisons, not proof that a location or payment channel caused the delay.

The dashboard presents the findings with summary cards, a programme comparison, expandable province/district/group tables, and a 30-district map. The map can show the bundled delay, poverty, or priority measure. Food listings can be compared with a bundled NISR price benchmark. A min–max rule-based district priority index is calculated as **45% normalized delay + 40% normalized poverty rate + 15% normalized food-price index**. The weights and bands are prototype choices, not an NISR policy rule or a tested prediction. The date controls apply to simulated orders only. Analysis and transaction data can be printed/saved as PDF or downloaded as CSV.

The summary CSVs are included so people can inspect the values. However, [`scripts/generate_summaries.py`](scripts/generate_summaries.py) currently writes values stored as lists in the script; it does **not** read the raw `.dta` microdata or recalculate the survey statistics. The raw-file extraction, variable definitions, weighting, missing-value handling, and final checks therefore cannot be reproduced from that script alone. The project labels the current summary as early and unweighted. A separate experimental proxy model in [`scripts/poverty_risk_model.py`](scripts/poverty_risk_model.py) is not connected to the app and has not been validated for real decisions. The dashboard does not run a predictive or AI model.

The separate `Microdata.zip` supplied to the project contains raw survey modules. It is not included in this repository, and the browser app does not read the raw Stata files. This prototype does not contain every survey variable or household record, and the grouped figures do not verify a person's current payment or eligibility.

The repository does include the prepared CSV summaries and a data-source note at [`data/data_sources.md`](data/data_sources.md). Rwanda district boundaries are in [`data/rwanda_districts.geojson`](data/rwanda_districts.geojson); the source note attributes them to geoBoundaries / NISR geodata. The raw survey files remain available only through the [NISR catalogue](https://microdata.statistics.gov.rw/index.php/catalog/121), subject to its access process.

**Read the findings carefully:** survey patterns can show that reported delays differ between groups. They cannot explain why one person's payment was late, prove the cause of a delay, or identify who should receive support. Small groups also need caution; very small samples should be suppressed or combined.

The app's activity date filter applies only to **simulated prototype orders**. It does not change the survey period or turn the NISR baseline into live data. Reports label these two kinds of information separately.

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
| `scripts/` | Data preparation and development helper scripts. |
| `api/`, `app.py` | Python static-file serving entry point; no live VUP or payment API. |

## Hackathon submission checklist

The webinar asks for a public repository, a public deployed app, clear documentation, working code, a data file and its source link, and a screen recording of **no more than 3 minutes**. The README, source code, prepared CSV/GeoJSON data, source notes, and live prototype link are present in this project. The repository currently has **no demo video file**. A time-coded recording guide is in [`docs/DEMO_VIDEO_SCRIPT.md`](docs/DEMO_VIDEO_SCRIPT.md); the team still needs to record and add the actual video. The webinar lists **30 October 2026** as its deadline; check the event page for any later update.

The webinar also says entrants agree to transfer intellectual-property rights in submitted work to NISR. The student team must read and confirm the current competition terms before submitting; this README does not make that legal decision for the team.

## Responsible-use rules

- **Prototype money is fake.** No real payment, credit, wallet balance, pool contribution, payout, or repayment is created.
- **Survey patterns are not individual explanations.** Do not use this dashboard to judge a household or make an eligibility decision.
- **Example records are not official records.** Replace demo balances with verified, authorized records before any real-world service is considered.
- **Protect people's information.** This browser prototype is not built to store real household, identity, or financial data.

---

*Built by the Isoko Bridge student team for the NISR 2026 Big Data Hackathon. “Eat while you wait” is a design idea being explored, not a promise of government payment or food support.*
