# Status

## Now
- Split out of `anantf-site` (23 Oct 2026): files copied with no history, links to the landing and other apps made
  absolute, own Worker `regional` for regional.anantf.com. Regional suites pass here.

## Waiting on the owner
- Connect Workers Builds (or the deploy secrets) for this repo; the Cloudflare deploy that moves regional.anantf.com
  onto it is a separate step.

## Next (in order)
1. After the deploy: check https://regional.anantf.com/ and a few block pages, then merge the redirect-stub PR in `anantf-site`.
2. Backlog of the app itself: `shared/regional/STATUS.md` (scan view on phones, 44 px targets on the brachial diagram,
   structured dose fields, more animations).

## Recently done
- 23 Oct 2026: repo created from the public template and filled from `anantf-site`.

## Decisions (dated, one line each)
- 23 Oct 2026: own subdomain and Worker for the regional app; old `anantf.com` paths forward by stub pages.
- 23 Oct 2026: `edit.html` and the page-editor test stay with the editor, not here.
