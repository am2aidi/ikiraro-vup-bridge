"""
Isoko Bridge - Production WSGI Entrypoint for Vercel & Local Deployment
Serves the web application HTML, CSS, JS, and data assets seamlessly.
"""
import os
import mimetypes

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def app(environ, start_response):
    """
    WSGI Entrypoint: Resolves routes and serves static web app files.
    Satisfies Vercel Python runtime while delivering full visual HTML UI.
    """
    path = environ.get('PATH_INFO', '/').lstrip('/')
    if not path or path == '':
        path = 'index.html'
    
    # 1. Check root directory
    file_path = os.path.join(BASE_DIR, path)
    
    # 2. Check app/ subdirectory fallback
    if not os.path.exists(file_path):
        file_path = os.path.join(BASE_DIR, 'app', path)
        
    # 3. Handle directory index
    if os.path.isdir(file_path):
        file_path = os.path.join(file_path, 'index.html')
        
    # 4. Fallback to root index.html for SPA routing
    if not os.path.exists(file_path):
        file_path = os.path.join(BASE_DIR, 'index.html')
        
    mime, _ = mimetypes.guess_type(file_path)
    mime = mime or 'application/octet-stream'
    if file_path.endswith('.html'):
        mime = 'text/html; charset=utf-8'
    elif file_path.endswith('.css'):
        mime = 'text/css; charset=utf-8'
    elif file_path.endswith('.js'):
        mime = 'application/javascript; charset=utf-8'
    elif file_path.endswith('.json') or file_path.endswith('.geojson'):
        mime = 'application/json; charset=utf-8'
    elif file_path.endswith('.svg'):
        mime = 'image/svg+xml'
    elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
        mime = 'image/jpeg'
    elif file_path.endswith('.png'):
        mime = 'image/png'
    elif file_path.endswith('.webp'):
        mime = 'image/webp'
        
    try:
        with open(file_path, 'rb') as f:
            content = f.read()
            
        status = '200 OK'
        headers = [
            ('Content-Type', mime),
            ('Content-Length', str(len(content))),
            ('Cache-Control', 'public, max-age=3600'),
            ('Access-Control-Allow-Origin', '*')
        ]
        start_response(status, headers)
        return [content]
    except Exception as e:
        status = '500 Internal Server Error'
        headers = [('Content-Type', 'text/plain; charset=utf-8')]
        start_response(status, headers)
        return [f"Server Error: {str(e)}".encode('utf-8')]

if __name__ == "__main__":
    import http.server
    import socketserver
    PORT = int(os.environ.get("PORT", 8085))
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Isoko Bridge running at http://localhost:{PORT}")
        httpd.serve_forever()
