"""
Isoko Bridge - Root Python Entrypoint
Compatible with Vercel Serverless / WSGI / ASGI / Local HTTP Server
"""
import os
import json

def app(environ, start_response):
    """WSGI standard application entrypoint for cloud deployment."""
    status = '200 OK'
    headers = [('Content-type', 'application/json; charset=utf-8'), ('Access-Control-Allow-Origin', '*')]
    start_response(status, headers)
    body = {
        "project": "Isoko Bridge (Ikiraro cya VUP)",
        "status": "active",
        "competition": "NISR 2026 Big Data Hackathon",
        "web_app_url": "/app/index.html",
        "nisr_summary": {
            "average_delay_days": 9.2,
            "pct_over_7_days": 52.0,
            "records": 3399
        }
    }
    return [json.dumps(body).encode('utf-8')]

if __name__ == "__main__":
    import http.server
    import socketserver
    PORT = int(os.environ.get("PORT", 8085))
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()
