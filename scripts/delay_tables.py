"""
Delay Tables Analysis Script
Reproduces the delay summary tables and identifies critical disbursement hotspots across Rwanda.
"""
import os
import csv

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def show_programme_delays():
    print("=" * 65)
    print("VUP DISBURSEMENT DELAYS BY PROGRAMME (NISR SURVEY DATA)")
    print("=" * 65)
    path = os.path.join(DATA_DIR, "summary_delays_by_programme.csv")
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        print(f"{header[0]:<25} | {header[1]:<12} | {header[2]:<12} | {header[3]:<10}")
        print("-" * 65)
        for row in reader:
            print(f"{row[0]:<25} | {float(row[1]):<12.1f} | {float(row[2]):<11.1f}% | {row[3]:<10}")
    print()

def show_hotspots():
    print("=" * 75)
    print("DISBURSEMENT BOTTLENECK HOTSPOTS (PROGRAMME x PROVINCE)")
    print("=" * 75)
    path = os.path.join(DATA_DIR, "summary_hotspots_programme_province.csv")
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        print(f"{header[0]:<24} | {header[1]:<14} | {header[2]:<10} | {header[3]:<10} | {header[4]:<8}")
        print("-" * 75)
        for row in reader:
            if row[2]:
                print(f"{row[0]:<24} | {row[1]:<14} | {float(row[2]):<10.1f} | {float(row[3]):<9.1f}% | {row[4]:<8}")
    print("\n* Flag: Expanded Public Works in Southern Province experiences the highest average delay (14.6 days, 79% >7d late).")
    print("=" * 75)

if __name__ == "__main__":
    show_programme_delays()
    show_hotspots()
