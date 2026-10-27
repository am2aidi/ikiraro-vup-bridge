# Data Sources and Provenance

## 1. Primary Dataset: NISR VUP Household Survey Microdata
- **Source Authority:** National Institute of Statistics of Rwanda (NISR)
- **Portal Catalog:** [NISR Microdata Portal](https://microdata.statistics.gov.rw/index.php/catalog)
- **Scope & Population:** 3,771 households, 15,039 individuals across 20 survey data modules.
- **Prepared baseline count:** 3,399 VUP programme rows across four programme modules. This is not a count of unique households; a household may appear in more than one module, and some module rows have no delay answer:
  1. **Direct Support (DS):** Unconditional cash transfers for labor-constrained extremely poor households.
  2. **Classic Public Works (cPW):** Public infrastructure wage labor.
  3. **Expanded Public Works (ePW):** Year-round flexible community and home-based public works for caring responsibilities.
  4. **Nutrition-Sensitive Direct Support (NSDS):** Targeted co-responsibility cash transfers for pregnant women and mothers with infants under 2 years.

### Repository sharing note
- **No raw individual or household-level microdata records are committed to this repository or published publicly.**
- The repository contains prepared summary indicators in `data/*.csv`; this note does not claim that the project has completed a legal or privacy compliance review.
- Researchers seeking the raw microdata must register and apply directly via the [NISR Microdata Portal](https://microdata.statistics.gov.rw/index.php/catalog).

---

## 2. Geospatial Dataset: Rwanda District Boundaries (ADM2)
- **Source:** geoBoundaries Global Administrative Database / NISR Geodata Portal
- **Format:** GeoJSON (Simplified Topology, EPSG:4326)
- **Units:** 30 Districts across 5 Provinces (Kigali City, Southern, Western, Northern, Eastern).
- **File:** `data/rwanda_districts.geojson`

---

## 3. Data Dictionary & Key Operational Definitions
- **Payment Delay (Days):** The survey response to the relevant payment-delay question, in days. Confirm the exact reference payment and question interpretation with the questionnaire before final reporting.
- **Over 7 Days Late (%):** Percentage of included survey records whose defined delay measure exceeds 7 days. The aggregation method must be stated with any published result.
- **Small-Sample Reliability Rule:**
  - Cells with **$N \ge 100$ records** are shown without the prototype's small-sample warning; this is not a guarantee of statistical precision.
  - Cells with **$25 \le N < 100$ records** are flagged with caution warnings in the prototype.
  - Cells with **$N < 25$ records** are suppressed or pooled to prevent statistical misrepresentation.
- **Prototype Food Price Guide:** The bundled price values and price bands are prepared inputs. They have not been reproduced from the raw NISR food-expenditure module by the current summary-generation script.
- **Prototype Price Bands:**
  - **Low (Below Market):** $< 85\%$ of NISR median price.
  - **Fair (Market Aligned):** Between $85\%$ and $115\%$ of NISR median price.
  - **High (Above Market):** $> 115\%$ of NISR median price.
- **Analytical Governance Principle:** *The data illustrates patterns, correlations, and disbursement bottlenecks; it cannot infer individual administrative causality.*

## Current prototype processing status

The repository contains prepared grouped values, not the source household records. The current `scripts/generate_summaries.py` writes values defined in the script; it does not open or calculate results from NISR Stata (`.dta`) files. The local audit confirms 3,399 rows across the four programme modules, but rows may repeat a household across modules and some rows have no delay response. The current delay and price figures are described by the project brief as early and unweighted. Confirm the source variables, survey weights, filters, missing-value rules, and totals with NISR documentation and the team’s authorized microdata before presenting them as final estimates.

The prepared district priority score is a prototype ranking. It combines normalized delay (45%), poverty (40%), and food-price index (15%). These weights are design choices for exploration, not NISR policy and not a validated model. They should not be used to make decisions about an individual household.

## Local VUP delay audit

The repository now includes [`scripts/audit_vup_microdata.py`](../scripts/audit_vup_microdata.py), which reads only the four VUP programme modules from a separately obtained `Microdata.zip`: Direct Support (`s9d1q8a`–`s9d1q8c`), Classic Public Works (`s9d2q7a`–`s9d2q7c`), Expanded Public Works (`s9d3q6a`–`s9d3q6c`), and NSDS (`s9d4q9a`–`s9d4q9c`). For each module row, it averages available answers to the three delay questions, then reports row-level unweighted and household-weighted averages and the percentage of rows whose average exceeds seven days. It can also group those summaries by province.

This is a transparent comparison method for reviewing the prepared figures, not a confirmed reproduction of an official NISR estimate. The script does not apply a full complex-survey variance estimator, infer why a payment was late, or combine potentially overlapping programme cohorts into one national estimate. A qualified reviewer should confirm the questionnaire meaning, eligible cohort, survey design, and final reporting method before replacing dashboard figures. The script writes only aggregate output when an output path is requested; it does not write household identifiers or raw records.

Run locally with: `python scripts/audit_vup_microdata.py --input "path/to/Microdata.zip"`. Use `--output` only for an aggregate CSV saved outside the repository.

- [NST2 2024–2029 abridged strategy (MINECOFIN)](https://www.minecofin.gov.rw/fileadmin/user_upload/Minecofin/Publications/STRATEGIES/NST_2/NST2_2024-2029_Abridged.pdf) — national context for poverty graduation, social security, and income support; the prototype is not an official government programme.

- [NISR catalogue entry for the EICV7 VUP survey](https://microdata.statistics.gov.rw/index.php/catalog/121)
- [geoBoundaries Rwanda data](https://www.geoboundaries.org/countryDownloads.html)
