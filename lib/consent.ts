import { GA4_DISABLE_KEY, type AnalyticsWindow } from "@/lib/analytics-config";

export type ConsentCategory = "necessary" | "analytics" | "maps";
export interface Consent {
  necessary: true;
  analytics: boolean;
  maps: boolean;
  date: string;
  version: number;
}

// Keep valid v1 decisions; only invalid, expired or changed-purpose records need renewal.
export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "ltevo-consent-v1";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const OPTIONAL_CATEGORIES = ["analytics", "maps"] as const;
export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];
export const DEFAULT_CONSENT: Consent = {
  necessary: true, analytics: false, maps: false, date: "", version: CONSENT_VERSION,
};
export const CONSENT_EVENT = "ltevo:consent";
export const CONSENT_PREFERENCES_EVENT = "ltevo:consent-preferences";
let memoryOnlyDecision = false;

function validDecision(value: unknown, now = Date.now()): value is Consent {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Partial<Consent>;
  if (record.necessary !== true || record.version !== CONSENT_VERSION ||
      typeof record.analytics !== "boolean" || typeof record.maps !== "boolean" ||
      typeof record.date !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(record.date)) return false;
  const timestamp = Date.parse(record.date);
  if (!Number.isFinite(timestamp) || timestamp > now || now - timestamp >= CONSENT_MAX_AGE_MS) return false;
  // Date.parse normalizes impossible calendar dates; reject those rather than keeping consent.
  const canonicalDate = record.date.includes(".") ? record.date : record.date.replace("Z", ".000Z");
  return new Date(timestamp).toISOString() === canonicalDate;
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!validDecision(parsed)) return null;
    return {
      necessary: true, analytics: parsed.analytics, maps: parsed.maps,
      date: parsed.date, version: CONSENT_VERSION,
    };
  } catch { return null; }
}

export function saveConsent(next: { analytics: boolean; maps: boolean }): Consent {
  const consent: Consent = {
    necessary: true, analytics: next.analytics === true, maps: next.maps === true,
    date: new Date().toISOString(), version: CONSENT_VERSION,
  };
  memoryOnlyDecision = false;
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent)); }
    catch { memoryOnlyDecision = true; /* Keep the decision in this tab when persistence fails. */ }
  }
  return consent;
}

/** Delete only visible first-party Analytics cookies, never form/consent storage or third-party cookies. */
function clearAnalyticsCookies() {
  const hostname = window.location.hostname;
  const domains = new Set(["", hostname, `.${hostname}`]);
  if (hostname === "ltevo.com" || hostname.endsWith(".ltevo.com")) {
    domains.add("ltevo.com"); domains.add(".ltevo.com");
  }
  const paths = new Set(["/"]);
  const segments = window.location.pathname.split("/").filter(Boolean);
  for (let index = 1; index <= segments.length; index++) {
    const pathname = `/${segments.slice(0, index).join("/")}`;
    paths.add(pathname); paths.add(`${pathname}/`);
  }
  try {
    const names = document.cookie.split(";").map((cookie) => cookie.split("=")[0].trim())
      .filter((name) => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));
    for (const name of names) for (const domain of domains) for (const pathname of paths) {
      document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${pathname}${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
    }
  } catch { /* Cookie access can be blocked; the runtime opt-out remains active. */ }
}

/** Apply immediately, before any render/load/event can use the new state. GTM itself cannot be unloaded. */
function applyConsentRuntime(consent: Consent | null) {
  if (typeof window === "undefined") return;
  const analytics = consent?.analytics === true && validDecision(consent);
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow[GA4_DISABLE_KEY] = !analytics;
  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  if (!analytics) clearAnalyticsCookies();
}

let snapshot: Consent | null = null;
let snapshotLoaded = false;
let expiryTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
export function getServerConsent(): null { return null; }
export function getConsent(): Consent | null {
  if (!snapshotLoaded) { snapshot = readConsent(); snapshotLoaded = true; }
  return snapshot;
}

/** Event senders also check age directly, including after a background tab resumes. */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return consent?.analytics === true && validDecision(consent);
}

function notifyConsent() {
  // React subscribers use the set once; the public event is for other integrations.
  for (const listener of listeners) listener();
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
function scheduleExpiry() {
  if (expiryTimer !== undefined) clearTimeout(expiryTimer);
  expiryTimer = undefined;
  if (!snapshot || listeners.size === 0) return;
  const remaining = Date.parse(snapshot.date) + CONSENT_MAX_AGE_MS - Date.now();
  expiryTimer = setTimeout(() => {
    if (snapshot && !validDecision(snapshot)) {
      snapshot = null;
      applyConsentRuntime(null);
      notifyConsent();
    }
    scheduleExpiry();
  }, Math.max(0, Math.min(remaining, 2_147_483_647)));
}
function adoptSnapshot(next: Consent | null) {
  if (snapshot === next || (snapshot && next && snapshot.date === next.date &&
      snapshot.analytics === next.analytics && snapshot.maps === next.maps && snapshot.version === next.version)) return false;
  snapshot = next;
  snapshotLoaded = true;
  return true;
}
function onResume() {
  if (document.visibilityState === "hidden") return;
  const next = memoryOnlyDecision ? (validDecision(snapshot) ? snapshot : null) : readConsent();
  if (adoptSnapshot(next)) {
    applyConsentRuntime(snapshot);
    notifyConsent();
  }
  scheduleExpiry();
}
function onStorageChange(event: StorageEvent) {
  if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
  try { if (event.storageArea !== window.localStorage) return; } catch { return; }
  memoryOnlyDecision = false;
  if (adoptSnapshot(readConsent())) {
    applyConsentRuntime(snapshot);
    notifyConsent();
  }
  scheduleExpiry();
}
export function subscribeConsent(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStorageChange);
    window.addEventListener("pageshow", onResume);
    window.addEventListener("focus", onResume);
    document.addEventListener("visibilitychange", onResume);
    const current = getConsent();
    const changed = adoptSnapshot(memoryOnlyDecision ? (validDecision(current) ? current : null) : readConsent());
    applyConsentRuntime(snapshot);
    scheduleExpiry();
    if (changed) onStoreChange();
  }
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("pageshow", onResume);
      window.removeEventListener("focus", onResume);
      document.removeEventListener("visibilitychange", onResume);
      if (expiryTimer !== undefined) clearTimeout(expiryTimer);
      expiryTimer = undefined;
    }
  };
}
export function decideConsent(next: { analytics: boolean; maps: boolean }): void {
  snapshot = saveConsent(next);
  snapshotLoaded = true;
  applyConsentRuntime(snapshot);
  scheduleExpiry();
  notifyConsent();
}
export function openConsentPreferences(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CONSENT_PREFERENCES_EVENT));
}
