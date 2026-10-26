with open('index.html', 'r', encoding='utf-8') as f:
    c_html = f.read()
with open('css/style.css', 'r', encoding='utf-8') as f:
    c_css = f.read()
with open('js/app.js', 'r', encoding='utf-8') as f:
    c_js = f.read()

checks = {
    'devbar in html': 'devbar' in c_html,
    'id="dev" in html': 'id="dev"' in c_html,
    'toast in html': 'id="toast"' in c_html,
    'nisr_pdf_data.js script in html': 'nisr_pdf_data.js' in c_html,
    'Bricolage in html': 'Bricolage' in c_html,
    'devbar styles in css': '.devbar' in c_css,
    'bask styles in css': '.bask' in c_css,
    'toast styles in css': '.toast' in c_css,
    'nisrdoc styles in css': '.doc' in c_css,
    'bask in app.js': 'bask' in c_js,
    'nisrdoc in app.js': 'nisrdoc' in c_js,
    'downloadNisrPdf in app.js': 'downloadNisrPdf' in c_js,
    'renderSummaryCard in app.js': 'renderSummaryCard' in c_js,
}

for k, v in checks.items():
    print(f'{k}: {v}')
