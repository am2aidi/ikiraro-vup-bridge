"""Create a local, aggregate-only audit of VUP payment-delay microdata.

The input archive is expected to be obtained separately from NISR. This script
reads only the four VUP programme modules and never writes household records.
It does not overwrite the dashboard's prepared summaries.

Example:
    python scripts/audit_vup_microdata.py --input "C:/data/Microdata.zip"
    python scripts/audit_vup_microdata.py --input "C:/data/Microdata.zip" \
        --output "C:/data/vup-delay-audit.csv"
"""

from __future__ import annotations

import argparse
import io
import zipfile
from pathlib import Path

import pandas as pd


PROGRAMMES = (
    ("Direct Support", "vup_s9d1_direct_support.dta", ("s9d1q8a", "s9d1q8b", "s9d1q8c")),
    ("Classic Public Works", "vup_s9d2_classic_public_work.dta", ("s9d2q7a", "s9d2q7b", "s9d2q7c")),
    ("Expanded Public Works", "vup_s9d3_expanded_public_work.dta", ("s9d3q6a", "s9d3q6b", "s9d3q6c")),
    ("NSDS", "vup_s9d4_nsds.dta", ("s9d4q9a", "s9d4q9b", "s9d4q9c")),
)
PROVINCES = {
    1: "City of Kigali",
    2: "Southern",
    3: "Western",
    4: "Northern",
    5: "Eastern",
}


def _weighted_mean(values: pd.Series, weights: pd.Series) -> float | None:
    valid = values.notna() & weights.notna() & (weights > 0)
    if not valid.any():
        return None
    return float((values[valid] * weights[valid]).sum() / weights[valid].sum())


def _summarize(group: pd.DataFrame, programme: str, province: str) -> dict[str, object]:
    valid = group.loc[group["row_mean_days"].notna() & group["weight"].gt(0)]
    if valid.empty:
        return {}
    weights = valid["weight"]
    late = valid["row_mean_days"].gt(7)
    weighted_late = float(weights[late].sum() / weights.sum() * 100)
    return {
        "Programme": programme,
        "Province": province,
        "Module_Rows": int(len(group)),
        "Rows_With_Delay": int(len(valid)),
        "Reported_Delay_Items": int(group["delay_item_count"].sum()),
        "Mean_Delay_Days_Unweighted": round(float(valid["row_mean_days"].mean()), 2),
        "Mean_Delay_Days_Weighted": round(_weighted_mean(valid["row_mean_days"], weights) or 0, 2),
        "Rows_Avg_Over_7_Days_Unweighted_Pct": round(float(late.mean() * 100), 1),
        "Rows_Avg_Over_7_Days_Weighted_Pct": round(weighted_late, 1),
        "Weight_Total": round(float(weights.sum()), 2),
    }


def audit_archive(archive_path: Path) -> pd.DataFrame:
    results: list[dict[str, object]] = []
    with zipfile.ZipFile(archive_path) as archive:
        members = {Path(name).name: name for name in archive.namelist() if name.lower().endswith(".dta")}
        for programme, filename, delay_columns in PROGRAMMES:
            if filename not in members:
                raise ValueError(f"Missing required NISR module in archive: {filename}")
            columns = ["province", "weight", *delay_columns]
            with archive.open(members[filename]) as member:
                frame = pd.read_stata(
                    io.BytesIO(member.read()),
                    columns=columns,
                    convert_categoricals=False,
                )
            frame["weight"] = pd.to_numeric(frame["weight"], errors="coerce")
            for column in delay_columns:
                frame[column] = pd.to_numeric(frame[column], errors="coerce")
                invalid = frame[column].notna() & (frame[column] < 0)
                if invalid.any():
                    raise ValueError(
                        f"{filename}:{column} contains negative delay values; review the source codes first."
                    )
            frame["delay_item_count"] = frame[list(delay_columns)].notna().sum(axis=1)
            frame["row_mean_days"] = frame[list(delay_columns)].mean(axis=1, skipna=True)
            frame["province_name"] = frame["province"].map(PROVINCES).fillna("Unmapped province")
            results.append(_summarize(frame, programme, "All provinces"))
            for province, group in frame.groupby("province_name", dropna=False, sort=True):
                summary = _summarize(group, programme, str(province))
                if summary:
                    results.append(summary)
    return pd.DataFrame(results)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="Path to the separately obtained NISR Microdata.zip")
    parser.add_argument("--output", type=Path, help="Optional path for aggregate-only CSV results")
    args = parser.parse_args()
    if not args.input.is_file():
        parser.error(f"Input archive does not exist: {args.input}")
    try:
        report = audit_archive(args.input)
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        parser.error(str(error))
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        report.to_csv(args.output, index=False)
        print(f"Saved aggregate-only results to: {args.output}")
    print(report.to_string(index=False))
    print("\nNo household identifiers or raw records are included in the report.")
    print("Weighted figures use the supplied household weight; this script does not calculate survey standard errors.")
    print("These results are an audit aid and do not replace the prepared dashboard summaries.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
