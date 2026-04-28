'use strict';

const PIXEL_ID = '2190799084462246';
const CURRENCY = 'ARS';
const EDIFIER_STORE_ID = 3;

function cleanPrice(input) {
  if (input === null || input === undefined || input === '') return 0;

  if (typeof input === 'number') {
    if (!Number.isFinite(input)) return 0;
    return Math.round(input);
  }

  let s = String(input).trim();
  if (!s) return 0;
  s = s.replace(/[^\d.,-]/g, '');
  if (!s) return 0;

  const isNegative = s.startsWith('-');
  if (isNegative) s = s.slice(1);
  if (!s) return 0;

  const hasComma = s.indexOf(',') !== -1;
  const hasDot = s.indexOf('.') !== -1;

  let normalized;
  if (hasComma && hasDot) {
    normalized = s.replace(/\./g, '').replace(',', '.');
  } else if (hasComma) {
    normalized = s.replace(',', '.');
  } else if (hasDot) {
    const dots = s.match(/\./g) || [];
    const afterLast = s.length - s.lastIndexOf('.') - 1;
    if (dots.length > 1 || afterLast === 3) {
      normalized = s.replace(/\./g, '');
    } else {
      normalized = s;
    }
  } else {
    normalized = s;
  }

  const num = parseFloat(normalized);
  if (!Number.isFinite(num)) return 0;
  return (isNegative ? -1 : 1) * Math.round(num);
}

function fbqAvailable() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function trackStandard(eventName, data, options) {
  if (!fbqAvailable()) return;
  const payload = Object.assign({ currency: CURRENCY }, data || {});
  if (options && options.eventID) {
    window.fbq('track', eventName, payload, { eventID: options.eventID });
  } else {
    window.fbq('track', eventName, payload);
  }
}

function trackCustom(eventName, data) {
  if (!fbqAvailable()) return;
  if (data && Object.keys(data).length) {
    window.fbq('trackCustom', eventName, data);
  } else {
    window.fbq('trackCustom', eventName);
  }
}

async function sha256Hex(text) {
  const subtle =
    (typeof globalThis !== 'undefined' &&
      globalThis.crypto &&
      globalThis.crypto.subtle) ||
    null;
  if (!subtle) return null;
  try {
    const buf = new TextEncoder().encode(text);
    const digest = await subtle.digest('SHA-256', buf);
    const bytes = new Uint8Array(digest);
    let out = '';
    for (let i = 0; i < bytes.length; i++) {
      const h = bytes[i].toString(16);
      out += h.length === 1 ? '0' + h : h;
    }
    return out;
  } catch (e) {
    return null;
  }
}

async function initWithEmail(email) {
  if (!fbqAvailable()) return;
  if (!email || typeof email !== 'string') return;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return;
  const em = await sha256Hex(trimmed);
  if (!em) return;
  window.fbq('init', PIXEL_ID, { em });
}

module.exports = {
  PIXEL_ID,
  CURRENCY,
  EDIFIER_STORE_ID,
  cleanPrice,
  trackStandard,
  trackCustom,
  initWithEmail,
  sha256Hex,
};
module.exports.cleanPrice = cleanPrice;
module.exports.trackStandard = trackStandard;
module.exports.trackCustom = trackCustom;
module.exports.initWithEmail = initWithEmail;
module.exports.sha256Hex = sha256Hex;
