# edifier-frontend

## To Do list:
```
- Home View
- Log in / Sign up views
- Remove the hastag from URL
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run unit tests
```
npm test
```
Tests live in `tests/*.test.cjs` and use Node's built-in `node:test` runner
(no extra dev dependencies). Currently covers the Meta Pixel helpers
(`cleanPrice`, `trackStandard`, `trackCustom`, `initWithEmail`, `sha256Hex`).

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Meta Pixel + Conversions API

The browser-side Meta Pixel integration for `edifier.com.ar` lives in
`src/utils/metaPixel.js` and is wired into:

- `public/index.html` — base Pixel boot + `PageView`.
- `src/components/views/ProductDetails.vue` — `ViewContent` (on product
  load) and `AddToCart`.
- `src/components/cart/Cart.vue` — augmented `CartView` (with `value`,
  `num_items`, `content_ids`) and `InitiateCheckout` before the MP
  redirect.
- `src/components/views/CheckoutNotification.vue` — `Purchase` with
  deterministic `event_id = 'purchase_<payment_id>'` and
  sessionStorage idempotency. Reads the value/content_ids from the
  `meta_pixel` block on the `/api/auth_mercado_pago/answer` response.
- `src/store/modules/auth.js` — `SET_USER` upgrades the Pixel to
  Advanced Matching by calling `fbq('init', PIXEL_ID, { em: <sha256> })`.
  Hashing is done with `globalThis.crypto.subtle` so plain emails never
  reach the wire.

All `value` fields go through `cleanPrice()` so AR-formatted strings
(`$178.490`, `522.390,00`) become integer pesos. `currency` is always
`'ARS'`.

The server-side Conversions API counterpart lives in the
`ventas.flextd.com` repo. See `docs/meta-capi.md` over there for the
deduplication contract and the open Birch Signals review item.
