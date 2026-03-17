const DEFAULT_CHECKOUT_BASE_URL = "https://edifier.com.ar";
const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1", "0.0.0.0"];

function normalizeBaseUrl(value) {
  if (!value || value === "undefined") {
    return "";
  }

  try {
    const parsedUrl = new URL(value);
    if (!/^https?:$/.test(parsedUrl.protocol)) {
      return "";
    }

    if (LOCAL_HOSTNAMES.includes(parsedUrl.hostname)) {
      return "";
    }

    return `${parsedUrl.origin}${parsedUrl.pathname}`.replace(/\/$/, "");
  } catch (error) {
    return "";
  }
}

export function getCheckoutBaseUrl() {
  const envUrl = normalizeBaseUrl(process.env.VUE_APP_CHECKOUT);
  if (envUrl) {
    return envUrl;
  }

  if (typeof window !== "undefined") {
    const runtimeUrl = normalizeBaseUrl(window.location.origin);
    if (runtimeUrl) {
      return runtimeUrl;
    }
  }

  return DEFAULT_CHECKOUT_BASE_URL;
}

export function buildCheckoutUrl(path = "") {
  const normalizedPath = path ? `/${String(path).replace(/^\/+/, "")}` : "";
  return `${getCheckoutBaseUrl()}${normalizedPath}`;
}

export function buildMercadoPagoReturnConfig() {
  const notificationUrl = buildCheckoutUrl("checkout_notification");

  return {
    notificationUrl,
    autoReturn: "approved",
    backUrls: {
      success: notificationUrl,
      failure: notificationUrl,
      pending: notificationUrl
    }
  };
}
