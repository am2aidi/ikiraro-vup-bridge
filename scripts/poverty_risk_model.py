"""
Experimental poverty-risk heuristic (not a validated statistical model).
The function returns a number in probability-like form and a risk band, but its
weights have no documented training or validation evidence. It is not connected
to the app and must not be used to rank or decide support for real households.
"""
import math

def calculate_poverty_risk(household_size, num_children, floor_material, estimated_monthly_rent_rwf, wall_material="mud_brick"):
    """
    Computes an experimental heuristic score. The weights are not calibrated
    or validated against NISR microdata; this helper is not connected to the app
    and must not be used for eligibility or household decisions.
    """
    # Baseline log-odds
    log_odds = -1.25

    # Demographic weights
    log_odds += 0.28 * (household_size - 4.0)
    log_odds += 0.35 * num_children

    # Dwelling conditions (Floor)
    floor_weights = {
        "earth": 0.85,      # Dirt / beaten earth floor
        "wood": 0.10,       # Planks
        "cement": -0.65,    # Cement screed
        "tile": -1.40       # Ceramic / modern tiles
    }
    log_odds += floor_weights.get(floor_material.lower(), 0.0)

    # Dwelling conditions (Walls)
    wall_weights = {
        "mud_poles": 0.70,
        "mud_brick": 0.20,
        "burnt_brick": -0.40,
        "cement_blocks": -1.10
    }
    log_odds += wall_weights.get(wall_material.lower(), 0.0)

    # Imputed / Estimated Rent Proxy
    if estimated_monthly_rent_rwf <= 5000:
        log_odds += 0.60
    elif estimated_monthly_rent_rwf <= 15000:
        log_odds += 0.10
    elif estimated_monthly_rent_rwf <= 30000:
        log_odds -= 0.50
    else:
        log_odds -= 1.30

    # Sigmoid probability
    prob = 1.0 / (1.0 + math.exp(-log_odds))
    prob_pct = round(prob * 100, 1)

    if prob >= 0.70:
        band = "High Risk (Likely Extremely Poor)"
        color = "red"
    elif prob >= 0.45:
        band = "Moderate Risk (Vulnerable Household)"
        color = "amber"
    else:
        band = "Low Risk (Relatively Resilient)"
        color = "green"

    return {
        "poverty_probability_pct": prob_pct,
        "risk_band": band,
        "color": color,
        "inputs": {
            "household_size": household_size,
            "children": num_children,
            "floor": floor_material,
            "rent_rwf": estimated_monthly_rent_rwf
        }
    }

if __name__ == "__main__":
    print("=" * 65)
    print("ISOKO BRIDGE: POVERTY RISK PROXY MODEL (NISR SURVEY BENCHMARK)")
    print("=" * 65)
    
    test_cases = [
        {"name": "Rural Family A (Gisagara)", "size": 6, "children": 4, "floor": "earth", "rent": 3000},
        {"name": "Peri-urban Family B (Karongi)", "size": 4, "children": 2, "floor": "cement", "rent": 12000},
        {"name": "Urban Household C (Kigali)", "size": 3, "children": 1, "floor": "tile", "rent": 45000}
    ]

    for tc in test_cases:
        res = calculate_poverty_risk(tc["size"], tc["children"], tc["floor"], tc["rent"])
        print(f"Profile: {tc['name']}")
        print(f"  Inputs: Size={tc['size']}, Children={tc['children']}, Floor={tc['floor']}, Rent={tc['rent']} RWF")
        print(f"  Estimated Poverty Probability: {res['poverty_probability_pct']}%")
        print(f"  Categorical Risk Band:        {res['risk_band']}")
        print("-" * 65)
