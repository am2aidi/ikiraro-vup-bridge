"""
Vercel Serverless Function & Python API Entrypoint
Provides health status and summary statistics from NISR VUP analysis.
"""
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response_data = {
            "status": "online",
            "app": "Isoko Bridge (Ikiraro cya VUP)",
            "competition": "NISR 2026 Big Data Hackathon",
            "authors": ["Zaidi", "KAYUMBA TETA Aela Greta"],
            "institution": "University of Rwanda (UR-CST)",
            "nisr_survey_metrics": {
                "total_beneficiaries_analyzed": 3399,
                "overall_average_delay_days": 9.2,
                "pct_paid_over_7_days_late": 52.0,
                "highest_friction_hotspot": "Expanded Public Works, Southern Province (14.6 days, 79% late)"
            }
        }
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return
