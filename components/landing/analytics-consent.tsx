"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getConsent, getServerConsent, hasAnalyticsConsent, subscribeConsent } from "@/lib/consent";
import { GA4_DISABLE_KEY, GTM_CONTAINER_ID, type AnalyticsWindow } from "@/lib/analytics-config";

let gtmRequested = false;

/** Basic consent gate. Revocation disables GA synchronously; removing a script cannot unload GTM. */
export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  useEffect(() => {
    // Read current state instead of a consent value captured before a delayed effect.
    const analyticsWindow = window as AnalyticsWindow;
    if (!hasAnalyticsConsent() || analyticsWindow[GA4_DISABLE_KEY] !== false || gtmRequested) return;
    const existing = document.getElementById("gtm-container");
    if (existing) { gtmRequested = true; return; }
    analyticsWindow.dataLayer ??= [];
    analyticsWindow.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "gtm-container";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
    script.onerror = () => { gtmRequested = false; script.remove(); };
    // No onload grant: a user can revoke while this request is in flight.
    gtmRequested = true;
    document.head.appendChild(script);
  }, [consent]);
  return null;
}
