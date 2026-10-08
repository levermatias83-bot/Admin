import urllib.request
import re

req = urllib.request.Request('https://admisiones.unipol.edu.bo/assets/index-p4UgULnx.js', headers={'User-Agent': 'Mozilla/5.0'})
js = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Search for routes
routes = re.findall(r'path:"([^"]+)"', js)
print("ROUTES:", set(routes))

# Search for Supabase tables
tables = re.findall(r'\.from\("([^"]+)"\)', js)
print("SUPABASE TABLES:", set(tables))

# Let's search for text around 'expediente'
print("\nEXPEDIENTE OCCURRENCES:")
for m in re.finditer(r'/admision/expediente/|/expediente|Tu etapa actual', js):
    start = max(0, m.start() - 100)
    end = min(len(js), m.end() + 200)
    print("--- SNIPPET ---")
    print(js[start:end])
