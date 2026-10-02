import { getConsent } from "@/lib/consent";

type EventParameters = Record<string, string | number | boolean>;
const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NWCDHBY9Z1";

/** No personal data; events are sent only after analytics consent. */
export function trackEvent(event: string, parameters: EventParameters = {}) {
  if (typeof window === "undefined" || getConsent()?.analytics !== true) return;
  const analyticsWindow = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  analyticsWindow.dataLayer ??= [];
  const payload = { ...parameters, send_to: measurementId, ...(window.location.hostname === "localhost" ? { debug_mode: true } : {}) };
  // Use the Google tag already published in GTM. A plain custom-event object
  // would require additional GTM tags and would not reach GA4 by itself.
  if (analyticsWindow.gtag) analyticsWindow.gtag("event", event, payload);
  else {
    const queue = function (...args: unknown[]) { analyticsWindow.dataLayer!.push(args); };
    queue("event", event, payload);
  }
}

export function contactContext() {
  if (typeof window === "undefined") return { sourcePath: "/", landingPath: "/", plan: "" };
  const params = new URLSearchParams(window.location.search);
  let landingPath = window.location.pathname;
  try { landingPath = sessionStorage.getItem("ltevo:landing-path") || landingPath; } catch { /* storage may be disabled */ }
  let sourcePath = window.location.pathname;
  try { sourcePath = sessionStorage.getItem("ltevo:contact-source") || sourcePath; } catch { /* storage may be disabled */ }
  return { sourcePath, landingPath, plan: params.get("plan") || "" };
}
