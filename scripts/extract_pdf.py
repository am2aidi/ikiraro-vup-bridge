import re

with open(r'C:\Users\zaidi\Downloads\VUP Bridge – Eat while you wait (1).html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

m = re.search(r"const NISR_PDF='([^']+)';", c)
if m:
    pdf_b64 = m.group(1)
    print('Found PDF b64, len:', len(pdf_b64))
    with open('js/nisr_pdf_data.js', 'w', encoding='utf-8') as out:
        out.write('// Embedded Authentic NISR Analytical Report PDF (Base64)\n')
        out.write('const NISR_PDF = "' + pdf_b64 + '";\n')
        out.write('if (typeof window !== "undefined") window.NISR_PDF = NISR_PDF;\n')
        out.write('if (typeof module !== "undefined") module.exports = { NISR_PDF };\n')
    print('Successfully wrote js/nisr_pdf_data.js')
else:
    print('NISR_PDF not found!')
