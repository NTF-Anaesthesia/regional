# Notes

Lasting rules, owner preferences and lessons (never task chatter), and how to test.

- The Worker serves only the files and folders listed in `worker/routes.js`; `/` is `regional.html`. Previews and
  workers.dev are off, so the only address is regional.anantf.com. Local check:
  `npx wrangler@4 dev --local --port 8799`, then `curl` each public path (200) and an unlisted one (404); stop wrangler
  and workerd by PID.
- Offline: `regional-sw.js` answers only the regional paths; other pages are left alone (tested in
  `shared/regional/test/offline.e2e.mjs`). Re-stamp after any change to the regional files.
- Browser suites need a static server on the repo root (`python3 -m http.server 8765`) and
  `PLAYWRIGHT_PATH=/opt/node22/lib/node_modules/playwright/index.mjs CHROMIUM_PATH=/opt/pw-browsers/chromium` in cloud sessions.
- Old copies of these pages stay at anantf.com only as redirect stubs (kept for good: teaching material and QR codes
  link them) and a `regional-sw.js` that removes itself.
