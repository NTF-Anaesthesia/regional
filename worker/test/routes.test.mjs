// worker/routes.js: which files each address serves, and what it must never serve. Run: node --test 'worker/test/*.test.mjs'
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { resolve, SITES } from '../routes.js';

const H = 'regional.anantf.com';

test('the home page is regional.html; listed pages and folders are served', () => {
  assert.deepEqual(resolve(H, '/'), { file: 'regional.html' });
  assert.deepEqual(resolve('REGIONAL.anantf.com:443', '/'), { file: 'regional.html' });
  assert.deepEqual(resolve(H, '/regional.html'), { file: 'regional.html' });
  assert.deepEqual(resolve(H, '/regional-sw.js'), { file: 'regional-sw.js' });
  assert.deepEqual(resolve(H, '/blocks/'), { file: 'blocks/' });
  assert.deepEqual(resolve(H, '/blocks/blocks.js'), { file: 'blocks/blocks.js' });
  assert.deepEqual(resolve(H, '/shared/regional/js/ui.js'), { file: 'shared/regional/js/ui.js' });
  assert.deepEqual(resolve(H, '/assets/site-shell.css'), { file: 'assets/site-shell.css' });
  assert.deepEqual(resolve(H, '/lower-limb/knee/'), { file: 'lower-limb/knee/' });
});

test('a folder without a slash redirects', () => {
  for (const f of ['blocks', 'spinal', 'plexus', 'head-neck', 'popliteal-animation']) assert.deepEqual(resolve(H, '/' + f), { redirect: `/${f}/` });
});

test('anything not listed is not served', () => {
  for (const p of ['/index.html', '/worker/routes.js', '/wrangler.jsonc', '/tools/check.mjs', '/package.json', '/.github/workflows/deploy.yml', '/README.md', '/pocus/', '/regional.htm'])
    assert.deepEqual(resolve(H, p), { notFound: true }, p);
});

test('unknown hosts serve nothing; localhost serves the repo', () => {
  assert.deepEqual(resolve('x.workers.dev', '/blocks/'), { notFound: true });
  assert.deepEqual(resolve('anantf.com', '/'), { notFound: true });
  assert.deepEqual(resolve('localhost:8787', '/blocks/'), { file: 'blocks/' });
});

test('nothing escapes its folder', () => {
  for (const p of ['/blocks/../wrangler.jsonc', '/blocks/%2e%2e/x', '/blocks/a%2fb', '/blocks/a\\b', '/blocks/./x'])
    assert.deepEqual(resolve(H, p), { notFound: true }, p);
});

test('every listed folder and file exists', () => {
  for (const [host, s] of Object.entries(SITES))
    for (const f of [s.home, ...(s.allow || [])].filter(Boolean))
      assert.ok(fs.existsSync(new URL(`../../${f}`, import.meta.url)), `${host}: ${f}`);
});
