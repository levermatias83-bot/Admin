import urllib.request
import re

req = urllib.request.Request('https://admisiones.unipol.edu.bo/assets/index-p4UgULnx.js', headers={'User-Agent': 'Mozilla/5.0'})
js = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Let's search for Landing or Home component definition or text in route '/'
# In react router, path: "/" often maps to an element
m = re.findall(r'path:\s*["\']\/["\']\s*,\s*element:\s*([A-Za-z0-9_\$]+)', js)
print("Root route elements:", m)

# Let's search for footer texts
print("\n--- Footer search ---")
idx = js.find("admisiones.unipol.edu.bo")
while idx != -1:
    print("Found admisiones.unipol.edu.bo around:", idx)
    print(js[max(0, idx-200):min(len(js), idx+300)])
    idx = js.find("admisiones.unipol.edu.bo", idx+1)
    if idx > 2000000: # just sample first few
        break
