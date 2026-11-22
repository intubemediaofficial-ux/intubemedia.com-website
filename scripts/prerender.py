"""Snapshot every public route into dist/<route>/index.html and write sitemap.xml + robots.txt.

Usage: npm run build && npx vite preview --port 4173 & python3 scripts/prerender.py
"""
import json, pathlib, re, sys
from datetime import date
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
BASE = 'https://intubemedia.com'
PREVIEW = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173'

services = re.findall(r"^    id: '([a-z0-9-]+)',", (ROOT / 'src/data/company.ts').read_text(), re.M)
locations = [l['slug'] for l in json.loads((ROOT / 'src/data/seo-locations.json').read_text())]
routes = ['/', '/services', '/about', '/contact', '/artists', '/platforms', '/network/bainsla-music', '/partner/apply', '/partner/login']
routes += [f'/{s}' for s in locations] + [f'/services/{s}' for s in services]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    for r in routes:
        page.goto(PREVIEW + r, wait_until='load')
        page.wait_for_timeout(2500)
        html = '<!doctype html>\n' + page.evaluate('document.documentElement.outerHTML')
        if '/@vite/client' in html or '/assets/index-' not in html:
            sys.exit(f'{PREVIEW} is a dev server, not `vite preview` of dist/')
        out = DIST / r.strip('/') / 'index.html' if r != '/' else DIST / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html)
        print('ok', r, page.title())
    browser.close()

today = date.today().isoformat()
def prio(r):
    return '1.0' if r == '/' else '0.9' if r.strip('/') in locations or r.startswith('/services') else '0.7'
urls = [r for r in routes if not r.startswith('/partner/login')]
(DIST / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(
    f'  <url><loc>{BASE}{r if r == "/" else r + "/"}</loc><lastmod>{today}</lastmod><priority>{prio(r)}</priority></url>\n' for r in urls) + '</urlset>\n')
(DIST / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /partner/dashboard\nDisallow: /partner/reset-password\n\nSitemap: {BASE}/sitemap.xml\n')
print(len(urls), 'urls in sitemap')
