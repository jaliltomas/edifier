'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const STORAGE_PREFIX = 'edifier_ads_';

function loadFresh() {
  delete require.cache[require.resolve('../src/utils/googleAdsAttribution')];
  return require('../src/utils/googleAdsAttribution');
}

function makeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    clear: () => map.clear(),
    _map: map,
  };
}

function setupWindow(opts) {
  opts = opts || {};
  global.window = {
    location: { search: opts.search || '' },
    localStorage: opts.storage || makeStorage(),
  };
  global.document = { cookie: opts.cookie || '' };
}

function teardownWindow() {
  delete global.window;
  delete global.document;
}

test('captureClickIds: persists gclid/gbraid/wbraid from URL', () => {
  const storage = makeStorage();
  setupWindow({
    search: '?gclid=ABC123&gbraid=GB456&wbraid=WB789&utm_source=google',
    storage,
  });

  const { captureClickIds, getStoredClickIds } = loadFresh();
  captureClickIds();

  const stored = getStoredClickIds();
  assert.equal(stored.gclid, 'ABC123');
  assert.equal(stored.gbraid, 'GB456');
  assert.equal(stored.wbraid, 'WB789');
  assert.equal(stored.ga_client_id, '');

  teardownWindow();
});

test('captureClickIds: ignores missing params', () => {
  const storage = makeStorage();
  setupWindow({ search: '?utm_source=fb', storage });

  const { captureClickIds, getStoredClickIds } = loadFresh();
  captureClickIds();

  const stored = getStoredClickIds();
  assert.equal(stored.gclid, '');
  assert.equal(stored.gbraid, '');
  assert.equal(stored.wbraid, '');

  teardownWindow();
});

test('getStoredClickIds: parses _ga cookie into client_id', () => {
  setupWindow({
    cookie: '_ga=GA1.1.123456789.1700000000; other=foo',
  });

  const { getStoredClickIds } = loadFresh();
  const stored = getStoredClickIds();
  assert.equal(stored.ga_client_id, '123456789.1700000000');

  teardownWindow();
});

test('getStoredClickIds: returns empty when _ga cookie missing', () => {
  setupWindow({ cookie: 'foo=bar' });

  const { getStoredClickIds } = loadFresh();
  assert.equal(getStoredClickIds().ga_client_id, '');

  teardownWindow();
});

test('getStoredClickIds: expires entries older than 90 days', () => {
  const storage = makeStorage();
  const ninetyOneDaysAgo = Date.now() - 91 * 24 * 60 * 60 * 1000;
  storage.setItem(
    STORAGE_PREFIX + 'gclid',
    JSON.stringify({ value: 'STALE', ts: ninetyOneDaysAgo })
  );

  setupWindow({ storage });

  const { getStoredClickIds } = loadFresh();
  assert.equal(getStoredClickIds().gclid, '');
  assert.equal(storage.getItem(STORAGE_PREFIX + 'gclid'), null);

  teardownWindow();
});

test('captureClickIds: latest call wins (overwrites with fresh ts)', () => {
  const storage = makeStorage();

  setupWindow({ search: '?gclid=OLD', storage });
  let mod = loadFresh();
  mod.captureClickIds();
  const oldRaw = storage.getItem(STORAGE_PREFIX + 'gclid');
  assert.match(oldRaw, /"value":"OLD"/);

  setupWindow({ search: '?gclid=NEW', storage });
  mod = loadFresh();
  mod.captureClickIds();
  assert.equal(mod.getStoredClickIds().gclid, 'NEW');

  teardownWindow();
});

test('captureClickIds: silent no-op without window', () => {
  delete global.window;
  delete global.document;

  const { captureClickIds, getStoredClickIds } = loadFresh();
  assert.doesNotThrow(() => captureClickIds());
  // getStoredClickIds requires window for storage; it should still return shape
  setupWindow({});
  const out = getStoredClickIds();
  assert.deepEqual(Object.keys(out).sort(), [
    'ga_client_id',
    'gbraid',
    'gclid',
    'wbraid',
  ]);
  teardownWindow();
});
