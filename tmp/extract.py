import urllib.request
import re

req = urllib.request.Request('https://admisiones.unipol.edu.bo/assets/index-p4UgULnx.js', headers={'User-Agent': 'Mozilla/5.0'})
content = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

l5e_matches = set(re.findall(r'/__l5e/assets-v1/[^"\'\s)]+', content))
print("--- L5E ASSETS ---")
for m in sorted(l5e_matches):
    print(m)

assets_matches = set(re.findall(r'/assets/[^"\'\s)]+\.(?:png|jpg|jpeg|svg|webp)', content))
print("--- ASSETS DIR ---")
for m in sorted(assets_matches):
    print(m)
