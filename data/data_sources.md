# Data Sources and Provenance

## 1. Primary Dataset: NISR VUP Household Survey Microdata
- **Source Authority:** National Institute of Statistics of Rwanda (NISR)
- **Portal Catalog:** [NISR Microdata Portal](https://microdata.statistics.gov.rw/index.php/catalog)
- **Scope & Population:** 3,771 households, 15,039 individuals across 20 survey data modules.
- **Analyzed Cohort:** 3,399 VUP beneficiary household records across four key social protection programmes:
  1. **Direct Support (DS):** Unconditional cash transfers for labor-constrained extremely poor households.
  2. **Classic Public Works (cPW):** Public infrastructure wage labor.
  3. **Expanded Public Works (ePW):** Year-round flexible community and home-based public works for caring responsibilities.
  4. **Nutrition-Sensitive Direct Support (NSDS):** Targeted co-responsibility cash transfers for pregnant women and mothers with infants under 2 years.

### Data Privacy & Anonymization Notice
In strict accordance with Rwanda's Personal Data Protection and Privacy Law (**Law No. 058/2021**) and NISR Microdata dissemination standards:
- **No raw individual or household-level microdata records are committed to this repository or published publicly.**
- Only aggregated summary indicators, frequency matrices, group medians, and model parameters are distributed in `data/*.csv`.
- Researchers seeking the raw microdata must register and apply directly via the [NISR Microdata Portal](https://microdata.statistics.gov.rw/index.php/catalog).

---

## 2. Geospatial Dataset: Rwanda District Boundaries (ADM2)
- **Source:** geoBoundaries Global Administrative Database / NISR Geodata Portal
- **Format:** GeoJSON (Simplified Topology, EPSG:4326)
- **Units:** 30 Districts across 5 Provinces (Kigali City, Southern, Western, Northern, Eastern).
- **File:** `data/rwanda_districts.geojson`

---

## 3. Data Dictionary & Key Operational Definitions
- **Payment Delay (Days):** The self-reported number of calendar days elapsed past the scheduled disbursement date for the latest payment cycle.
- **Over 7 Days Late (%):** Percentage of beneficiaries experiencing acute delays exceeding 1 week.
- **Small-Sample Reliability Rule:**
  - Cells with **$N \ge 100$ records** are deemed robust.
  - Cells with **$25 \le N < 100$ records** are explicitly flagged with caution warnings in all visualisations.
  - Cells with **$N < 25$ records** are suppressed or pooled to prevent statistical misrepresentation.
- **NISR Benchmark Median Price:** Median retail price per kilogram for staple food commodities recorded in the NISR food expenditure surveys.
- **Fairness Price Guide:**
  - **Low (Below Market):** $< 85\%$ of NISR median price.
  - **Fair (Market Aligned):** Between $85\%$ and $115\%$ of NISR median price.
  - **High (Above Market):** $> 115\%$ of NISR median price.
- **Analytical Governance Principle:** *The data illustrates patterns, correlations, and disbursement bottlenecks; it cannot infer individual administrative causality.*
