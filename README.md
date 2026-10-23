# regional

Regional anaesthesia teaching app (nerve blocks, plexus anatomy, spinal, ultrasound scan teacher) of NTF Anaesthesia,
live at https://regional.anantf.com. Plain HTML, CSS and JavaScript with a small Cloudflare Worker; no build step.

- App folders: `blocks/` (block finder, calculator, safety, settings), `plexus/`, `brachial-plexus/`, `spinal/`,
  `truncal/`, `head-neck/`, `upper-limb/`, `lower-limb/`, `popliteal/`, `popliteal-animation/`. Shared engine, data and
  3D files: `shared/` (`shared/regional/INDEX.md` is the map).
- `regional-sw.js`: offline copy of the app (one service worker, scope `/`).
- `worker/`: the Worker (`routes.js` lists what the address serves), `wrangler.jsonc`, tests in `worker/test/`.
- `tools/`: `check.mjs` (repo checks + Worker tests), `stamp-versions.mjs`, `shots.mjs`,
  `app-kit.mjs`.
- Checks: `node tools/check.mjs`; app suites: `node shared/regional/test/run-all.mjs` (see `AGENTS.md`).
- Landing page and the other apps: https://anantf.com (`anantf-site`). Kit: https://design.anantf.com/v1/.
- Old addresses `anantf.com/blocks/`, `anantf.com/spinal/` and so on forward here.
