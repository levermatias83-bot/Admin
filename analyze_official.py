import urllib.request
import re
import json

req = urllib.request.Request('https://admisiones.unipol.edu.bo/assets/index-p4UgULnx.js', headers={'User-Agent': 'Mozilla/5.0'})
js = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

print(f"Bundle size: {len(js)} bytes")

# Find route paths
paths = re.findall(r'path:\s*["\']([^"\']+)["\']', js)
print("Routes:", sorted(set(paths)))

# Find page titles / main headings
print("\n--- Key sections and texts in bundle ---")
for phrase in ["Admisión UNIPOL", "Prospecto Digital", "Resultados de admisión", "Reportes de admisión", "Cuadro general de prelación", "Cuadro de evaluación", "Embudo", "Condición de edad", "Portal de conceptos", "Pago rápido", "Acceso administrativo"]:
    count = js.count(phrase)
    print(f"{phrase}: {count} occurrences")
