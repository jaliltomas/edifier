'use strict';

/**
 * Capture and persist Google Ads click identifiers (gclid / gbraid / wbraid)
 * and read the GA4 client_id from the `_ga` cookie. These identifiers are the
 * input for Google Ads conversion attribution and the GA4 Measurement
 * Protocol (Path B/C backend events).
 *
 * Storage strategy: localStorage with a 90-day TTL on each ID — Google's
 * default cookie lifetime is 90 days for `_gcl_aw` (gclid). We keep TTLs per
 * key so a fresher click overwrites an older one cleanly.
 */

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const KEYS = ['gclid', 'gbraid', 'wbraid'];
const STORAGE_PREFIX = 'edifier_ads_';

function storageAvailable() {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch (e) {
    return false;
  }
}

function readQueryParam(name) {
  try {
    const params = new URLSearchParams(window.location.search);
    const v = params.get(name);
    return v ? String(v).trim() : '';
  } catch (e) {
    return '';
  }
}

function writeStored(key, value) {
  if (!storageAvailable() || !value) return;
  try {
    const payload = JSON.stringify({ value: String(value), ts: Date.now() });
    window.localStorage.setItem(STORAGE_PREFIX + key, payload);
  } catch (e) {
    // ignore quota / disabled storage
  }
}

function readStored(key) {
  if (!storageAvailable()) return '';
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.value || !parsed.ts) return '';
    if (Date.now() - parsed.ts > NINETY_DAYS_MS) {
      window.localStorage.removeItem(STORAGE_PREFIX + key);
      return '';
    }
    return String(parsed.value);
  } catch (e) {
    return '';
  }
}

/**
 * Read the GA4 client_id from the `_ga` cookie. The cookie has the shape
 * `GA1.1.<client_id>.<timestamp>` where client_id is `<int>.<int>`.
 * Returns '' when the cookie is missing or malformed.
 */
function readGaClientId() {
  try {
    if (typeof document === 'undefined') return '';
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    for (let i = 0; i < cookies.length; i++) {
      const [name, ...rest] = cookies[i].split('=');
      if (name === '_ga') {
        const value = rest.join('=');
        // GA1.1.123456789.1700000000 -> "123456789.1700000000"
        const parts = value.split('.');
        if (parts.length >= 4) {
          return parts.slice(2).join('.');
        }
      }
    }
    return '';
  } catch (e) {
    return '';
  }
}

/**
 * Idempotent: call once on app boot. Reads click IDs from the current URL and
 * persists each (only if present) with its capture timestamp.
 */
function captureClickIds() {
  if (typeof window === 'undefined') return;
  for (let i = 0; i < KEYS.length; i++) {
    const k = KEYS[i];
    const v = readQueryParam(k);
    if (v) writeStored(k, v);
  }
}

/**
 * Returns the most recent persisted click IDs plus the GA4 client_id. Empty
 * string for any field that is unknown — never null/undefined so the backend
 * can store consistently.
 */
function getStoredClickIds() {
  return {
    gclid: readStored('gclid'),
    gbraid: readStored('gbraid'),
    wbraid: readStored('wbraid'),
    ga_client_id: readGaClientId(),
  };
}

module.exports = {
  captureClickIds,
  getStoredClickIds,
};
module.exports.captureClickIds = captureClickIds;
module.exports.getStoredClickIds = getStoredClickIds;
