"""
District Priority Score Calculation Model
Combines payment delay, estimated poverty prevalence, and relative food price level
to produce a clear, transparent 'Help Here First' ranking across Rwanda's 30 districts.
"""
import os
import csv

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def run_district_priority_ranking():
    path = os.path.join(DATA_DIR, "summary_district_priority_scores.csv")
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        records = list(reader)

    print("=" * 80)
    print("ISOKO BRIDGE: RWANDA 30 DISTRICT PRIORITY INDEX ('HELP HERE FIRST')")
    print("Formula: 45% Delay (normalized) + 40% Poverty Rate (normalized) + 15% Food Price Index")
    print("=" * 80)
    print(f"{'Rank':<5} | {'District':<12} | {'Province':<14} | {'Priority':<9} | {'Delay (d)':<9} | {'Poverty %':<9} | {'Intervention Band':<22}")
    print("-" * 80)
    for r in records[:10]:
        print(f"#{r['National_Rank']:<4} | {r['District']:<12} | {r['Province']:<14} | {float(r['Priority_Score']):<9.1f} | {float(r['Average_Delay_Days']):<9.1f} | {float(r['Poverty_Rate_Pct']):<8.1f}% | {r['Intervention_Band']:<22}")
    print("...")
    print(f"{'Rank':<5} | {'District':<12} | {'Province':<14} | {'Priority':<9} | {'Delay (d)':<9} | {'Poverty %':<9} | {'Intervention Band':<22}")
    print("-" * 80)
    for r in records[-5:]:
        print(f"#{r['National_Rank']:<4} | {r['District']:<12} | {r['Province']:<14} | {float(r['Priority_Score']):<9.1f} | {float(r['Average_Delay_Days']):<9.1f} | {float(r['Poverty_Rate_Pct']):<8.1f}% | {r['Intervention_Band']:<22}")
    print("=" * 80)

if __name__ == "__main__":
    run_district_priority_ranking()
