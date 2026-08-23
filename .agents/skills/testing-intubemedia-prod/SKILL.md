---
name: testing-intubemedia-prod
description: How to verify a deployed change on the live intubemedia.com site (Hostinger static Vite/React SPA) — confirm the right bundle is live, test SPA routes, and avoid false positives from the SPA 404 fallback.
---

# Testing intubemedia.com in production

The site is a Vite + React Router SPA built from this repo and uploaded as a static `dist/`
to Hostinger. There is no server-side rendering; all page content comes from
`/assets/index-<hash>.js`.

## 1. Confirm production is actually running the new code (do this first)

Stale uploads are the most common "the feature is missing" cause. Verify, don't assume:

```bash
curl -s https://intubemedia.com | grep -o 'assets/index-[^"]*'   # hash referenced by live index.html
ls dist/assets                                                    # hash of the local build
curl -s https://intubemedia.com/assets/index-<hash>.js -o /tmp/prod.js
cmp /tmp/prod.js dist/assets/index-<hash>.js && echo IDENTICAL
grep -c "<a new UI string>" /tmp/prod.js                          # e.g. "Quick View", "our-network"
```
If the hashes differ or the new strings are absent, the deploy is stale — stop and report that
instead of testing the old build.

## 2. The SPA fallback makes HTTP status codes useless for routing checks

Hostinger rewrites unknown paths to `index.html`, so **every** path returns `200`
(including `/network/nonexistent`). Never treat a 200 as proof a route exists — always load the
URL in the browser and assert on rendered text/screenshots. Do test a **hard reload**
(`ctrl+shift+r`) of deep routes such as `/network/bainsla-music`; that is the check that would
catch a missing rewrite rule (would show a Hostinger 404 page).

## 3. UI paths worth knowing

- Hash-scroll nav: navbar "Our Network" is `Link to="/#our-network"`; the scroll is done in
  `src/components/Layout.tsx` via `useLocation().hash` + `scrollIntoView`. Assert both the URL
  (`/#our-network`) and a screenshot showing the section, since a broken hash handler still
  changes the URL.
- The Bainsla Music card in `src/components/NetworkSection.tsx` is a `<button>` that opens an
  in-page quick-view modal; the outbound `bainslamusic.com` link is a separate CTA. To prove
  "no redirect", check the URL/tab is unchanged after the card click.
- Public routes are declared in `src/App.tsx`; footer also links `/network/bainsla-music`.

## 4. Mobile viewport testing without devtools

Prefer resizing the real window over opening devtools (cleaner recordings):
```bash
wmctrl -r :ACTIVE: -b remove,maximized_vert,maximized_horz
xdotool getactivewindow windowsize 460 900
```
Then click the hamburger button in the navbar. Restore with
`wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz`.

## 5. Local run (if you need to test pre-deploy)

`npm install && npm run dev -- --host 0.0.0.0` (already in the repo blueprint); the FastAPI admin
backend is only needed for `/admin` flows.

## Devin Secrets Needed

None for read-only verification of the public site. Hostinger panel access (used for uploading
`dist/`) is done by the user, not required for testing.
