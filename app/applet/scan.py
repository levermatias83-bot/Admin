import urllib.request, re

req = urllib.request.Request('https://admisiones.unipol.edu.bo/assets/index-p4UgULnx.js', headers={'User-Agent': 'Mozilla/5.0'})
js = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
print("SCAN START! Total length:", len(js))

# Let's search for "Universidad Policial" occurrences
for match in re.finditer(r'Universidad Policial', js):
    pos = match.start()
    print("MATCH at", pos, ":", repr(js[max(0, pos-100):min(len(js), pos+150)]))
    break

# Let's search for what the Header and Navigation contains in the official bundle
for match in re.finditer(r'Ir a mi panel|Prospecto Digital|Iniciar sesión|Acceder|Cerrar sesión', js):
    pos = match.start()
    print("NAV MATCH at", pos, ":", repr(js[max(0, pos-80):min(len(js), pos+80)]))

