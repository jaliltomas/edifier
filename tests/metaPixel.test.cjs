'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const nodeCrypto = require('node:crypto');

const { cleanPrice, trackStandard, trackCustom, initWithEmail, sha256Hex } = require(
  '../src/utils/metaPixel'
);

function expectedSha256(text) {
  return nodeCrypto.createHash('sha256').update(text).digest('hex');
}

test('cleanPrice: argentine formatted strings', () => {
  assert.equal(cleanPrice('$178.490'), 178490);
  assert.equal(cleanPrice('$ 522.390,00'), 522390);
  assert.equal(cleanPrice('587.970'), 587970);
  assert.equal(cleanPrice('$1.000.000,50'), 1000001);
  assert.equal(cleanPrice('$ 123.456.789'), 123456789);
});

test('cleanPrice: raw numbers pass through rounded', () => {
  assert.equal(cleanPrice(178490), 178490);
  assert.equal(cleanPrice(178490.4), 178490);
  assert.equal(cleanPrice(178490.6), 178491);
  assert.equal(cleanPrice(0), 0);
});

test('cleanPrice: empty / nullish inputs return 0', () => {
  assert.equal(cleanPrice(''), 0);
  assert.equal(cleanPrice(null), 0);
  assert.equal(cleanPrice(undefined), 0);
  assert.equal(cleanPrice('   '), 0);
  assert.equal(cleanPrice('$0'), 0);
});

test('cleanPrice: invalid / garbage inputs return 0', () => {
  assert.equal(cleanPrice('abc'), 0);
  assert.equal(cleanPrice(NaN), 0);
  assert.equal(cleanPrice(Infinity), 0);
  assert.equal(cleanPrice(-Infinity), 0);
  assert.equal(cleanPrice({}), 0);
});

test('cleanPrice: negative values', () => {
  assert.equal(cleanPrice('-178.490'), -178490);
  assert.equal(cleanPrice(-178490), -178490);
  assert.equal(cleanPrice('-$ 522.390,00'), -522390);
});

test('cleanPrice: ambiguous single-dot formats', () => {
  // Argentine: dot with 3 trailing digits == thousands separator.
  assert.equal(cleanPrice('1.000'), 1000);
  // Single dot with non-3 trailing digits is treated as decimal.
  assert.equal(cleanPrice('1.5'), 2);
  assert.equal(cleanPrice('1.50'), 2);
  // Comma-only is always decimal.
  assert.equal(cleanPrice('1,5'), 2);
  assert.equal(cleanPrice('1,50'), 2);
});

function withFakeFbq(t, run) {
  const calls = [];
  const originalWindow = global.window;
  global.window = { fbq: (...args) => calls.push(args) };
  try {
    return run(calls);
  } finally {
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  }
}

async function withFakeFbqAsync(t, run) {
  const calls = [];
  const originalWindow = global.window;
  global.window = { fbq: (...args) => calls.push(args) };
  try {
    await run(calls);
  } finally {
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  }
}

test('trackStandard: forwards to fbq with default ARS currency', () => {
  withFakeFbq(null, calls => {
    trackStandard('Purchase', { value: 178490, content_type: 'product' });
    assert.deepEqual(calls, [
      ['track', 'Purchase', { currency: 'ARS', value: 178490, content_type: 'product' }],
    ]);
  });
});

test('trackStandard: passes eventID for CAPI deduplication', () => {
  withFakeFbq(null, calls => {
    trackStandard(
      'Purchase',
      { value: 100, order_id: 'abc' },
      { eventID: 'purchase_abc' }
    );
    assert.equal(calls.length, 1);
    assert.equal(calls[0][3].eventID, 'purchase_abc');
  });
});

test('trackStandard: overriding currency is respected', () => {
  withFakeFbq(null, calls => {
    trackStandard('AddToCart', { value: 10, currency: 'USD' });
    assert.equal(calls[0][2].currency, 'USD');
  });
});

test('trackStandard / trackCustom: silent no-op when fbq absent', () => {
  const originalWindow = global.window;
  global.window = {};
  try {
    assert.doesNotThrow(() => trackStandard('Purchase', { value: 1 }));
    assert.doesNotThrow(() => trackCustom('CartView', { value: 1 }));
  } finally {
    if (originalWindow === undefined) delete global.window;
    else global.window = originalWindow;
  }
});

test('trackCustom: forwards event name and payload', () => {
  withFakeFbq(null, calls => {
    trackCustom('CartView', { value: 1000, num_items: 2 });
    assert.deepEqual(calls, [['trackCustom', 'CartView', { value: 1000, num_items: 2 }]]);
  });
});

test('trackCustom: omits payload arg when empty', () => {
  withFakeFbq(null, calls => {
    trackCustom('HomeView');
    assert.deepEqual(calls, [['trackCustom', 'HomeView']]);
  });
});

test('sha256Hex: matches node:crypto for canonical inputs', async () => {
  assert.equal(await sha256Hex('foo@example.com'), expectedSha256('foo@example.com'));
  assert.equal(await sha256Hex(''), expectedSha256(''));
});

test('initWithEmail: lowercases, trims, and sha256-hashes before fbq init', async () => {
  await withFakeFbqAsync(null, async calls => {
    await initWithEmail('  Foo@Example.COM  ');
    assert.deepEqual(calls, [
      ['init', '2190799084462246', { em: expectedSha256('foo@example.com') }],
    ]);
  });
});

test('initWithEmail: ignored when email is empty / invalid', async () => {
  await withFakeFbqAsync(null, async calls => {
    await initWithEmail('');
    await initWithEmail(null);
    await initWithEmail(undefined);
    await initWithEmail('   ');
    await initWithEmail(123);
    assert.deepEqual(calls, []);
  });
});
