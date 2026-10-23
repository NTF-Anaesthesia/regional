// worker/sites.js with a stand-in for the static assets. Run: node --test 'worker/test/*.test.mjs'
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../sites.js';

const FILES = { '/regional.html': '<h1>hi</h1>', '/blocks/index.html': '<h1>blocks</h1>', '/regional-sw.js': '//' };
const env = { ASSETS: { fetch: async req => {
  const p = new URL(req.url).pathname;
  return p in FILES ? new Response(FILES[p], { status: 200 }) : new Response('', { status: 404 });
} } };
const get = (url, method = 'GET') => worker.fetch(new Request(url, { method }), env);

test('serves the home page, noindex', async () => {
  const r = await get('https://regional.anantf.com/');
  assert.equal(r.status, 200);
  assert.equal(await r.text(), '<h1>hi</h1>');
  assert.equal(r.headers.get('X-Robots-Tag'), 'noindex, nofollow');
});

test('a folder serves its index; without a slash it redirects; missing and unlisted files 404; unknown hosts 404', async () => {
  assert.equal(await (await get('https://regional.anantf.com/blocks/')).text(), '<h1>blocks</h1>');
  assert.equal((await get('https://regional.anantf.com/blocks')).status, 301);
  assert.equal((await get('https://regional.anantf.com/blocks/nope.js')).status, 404);
  assert.equal((await get('https://regional.anantf.com/wrangler.jsonc')).status, 404);
  assert.equal((await get('https://x.workers.dev/blocks/')).status, 404);
});

test('only GET and HEAD', async () => {
  assert.equal((await get('https://regional.anantf.com/', 'POST')).status, 405);
});
