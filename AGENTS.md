# regional

Instructions for every AI assistant working here (Claude Code reads this through `CLAUDE.md`).

The regional anaesthesia teaching app of NTF Anaesthesia, served at https://regional.anantf.com by its own Cloudflare
Worker (`regional`). Used on phones in theatre, so it works offline. Split out of the `anantf-site` repo (Oct 2026),
which keeps the landing page and the other teaching apps.

## Public here, private elsewhere

Anything merged here is public. Keep only code, docs, general rules and **made-up** sample data. Never commit
secrets, tokens, personal data, real names or patient details. Private notes belong in the owner's private notes
repo; never copy anything from there into this repo, a PR or an issue (neutral pointers like "ask the owner" are fine).

## Rules that bite

- Regional pages are one app (app bar, credit line at the foot, MO · Resident · Consultant levels). Doses, the LAST
  line and the safety tiers are clinical content: change them only when asked, and never to fit a test.
- Keep the credits to Dr Chew Shi Hao and the links to https://chewshihao.com/ (Dr Chew may remove his own).
- One service worker, `regional-sw.js` at the root (scope `/`). After changing anything in the regional folders or the
  shared site files they use, run `node shared/regional/tools/stamp.mjs`; `shared/regional/test/version.test.mjs` fails
  when it is stale.
- Links to the landing and the other teaching apps (home, resources, POCUS, exams, BIS, airway, EEG) are absolute
  `https://anantf.com/...`: those pages live in `anantf-site`.
- The Worker serves only what `worker/routes.js` lists (`SITES.allow`); a new top-level folder or page needs a line
  there, in `regional-sw.js` (`PREFIXES`, via `stamp.mjs` `DIRS`) and in `worker/test/routes.test.mjs`.
- The app kit comes from https://design.anantf.com/v1/ (stylesheet and fonts); `shared/regional/css/skin-app.css` holds
  a copy of its tokens.
- Start at `shared/regional/INDEX.md`; open only the piece you need.

## App defaults

- Installable web apps cancel the browser's automatic install prompt: add
  `<script>addEventListener('beforeinstallprompt', e => e.preventDefault());</script>` to the `<head>` of every page
  that links a manifest. Keep the manifest, icons and service worker: installable, never prompted. No install buttons.

## Checks before merging

```
node tools/check.mjs        # repo checks + Worker tests
node shared/regional/test/run-all.mjs --gate=main   # regional suites (static server on the repo root:
                            # python3 -m http.server 8765; global Playwright)
```

## Working with the owner

- Instructions mostly come from a phone. Work through a request to the end; ask only when a decision is genuinely
  the owner's. When asked to plan, plan and wait.
- Keep each PR small and finished on its own. Start PR titles with the app: "<App>: …".
- Merge your own PRs once the checks pass, then report with the PR link (merge by the number the PR creation
  returned) and call `unsubscribe_pr_activity`: each PR event re-sends the whole context.
- Push once per finished step, not after every small commit (limited build minutes).
- Each app keeps `NOTES.md` (lasting decisions, how to test) and `STATUS.md` (now, waiting on the owner, next,
  dated decisions). Read them before starting; update them when a task finishes. Cheap end of session: `quick-save`.
- Plain words, short; explain technical terms briefly the first time.

## Token savers

- `.claude/settings.json` is only read when a session has exactly one repo attached. Sessions usually attach the
  owner's notes repo as well; then the environment's shared settings apply instead, so keep both in step.
- `.claude/settings.json` denies reading `__/` and `vendor/` folders. Add generated files and very large files to its
  `deny` list (edit their build scripts instead), and say so here. Ask the owner if one is really needed.
- Run only the touched app's tests while iterating and the full run once before merge. Screenshots only for visual
  changes (one, viewport-sized); debug logic with text.

## Private notes and repo layout

Private notes: `NTF-Anaesthesia/ntf-hub-attach-always` (private, org members only). At the start of a session attach it
(`add_repo`) and read its `AGENTS.md`; save lasting notes there, never here. Repo layout: one repo per app or app
group, public code plus a `-private` pair; a new app gets its own repo (test in ntf-hub-attach-always `hub/new-repo.md`),
never a folder here.
