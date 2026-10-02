/**
 * Consentimiento de cookies (RGPD art. 6.1.a y 7; LSSI art. 22.2).
 *
 * Hay dos categorías opcionales porque son las dos únicas que instalan
 * cookies o hacen peticiones a terceros:
 *
 *   analytics  → Google Tag Manager / GA4 (`_ga`, `_ga_*`, `_gid`, `_gat*`…)
 *   maps       → iframe de Google Maps en /contacto
 *
 * `necessary` nunca se apaga: sostiene la memoria de la propia decisión y
 * queda exenta de consentimiento bajo el art. 22.2 LSSI.
 *
 * La decisión se guarda en localStorage y no en una cookie. Así el
 * documento `cookie_consent` que declaraba la política de cookies deja de
 * ser una afirmación falsa: ahora la política describe exactamente lo que
 * hace el código, y el sitio no vuelve a escribir cookies antes de que el
 * usuario acepte.
 */

export type ConsentCategory = "necessary" | "analytics" | "maps";

export interface Consent {
  necessary: true;
  analytics: boolean;
  maps: boolean;
  /** Fecha ISO de la decisión, para poder auditarla. */
  date: string;
  /**
   * Versión del esquema. Si algún día cambian las categorías, subirla
   * invalida las decisiones antiguas y obliga a volver a preguntar
   * (art. 7.3 RGPD: el consentimiento debe poder revocarse y renovarse).
   */
  version: number;
}

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "ltevo-consent-v1";

/**
 * Categorías que requieren consentimiento previo. Tipado como solo esas
 * dos para que el mapa de textos y de flags del banner no pueda incluir
 * `necessary` por error.
 */
export const OPTIONAL_CATEGORIES = ["analytics", "maps"] as const;

export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];

/**
 * Estado por defecto antes de que el usuario decida: todo denegado salvo
 * lo estrictamente necesario. Es lo que se envía a Google Consent Mode
 * antes de cargar GTM.
 */
export const DEFAULT_CONSENT: Consent = {
  necessary: true,
  analytics: false,
  maps: false,
  date: "",
  version: CONSENT_VERSION,
};

/**
 * localStorage puede lanzar (modo privado de Safari, cookies de terceros
 * bloqueadas, contextos embebidos). Cualquier fallo se trata como "sin
 * decisión tomada", que es el estado prudente.
 */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      maps: parsed.maps === true,
      date: typeof parsed.date === "string" ? parsed.date : "",
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function saveConsent(next: { analytics: boolean; maps: boolean }): Consent {
  const consent: Consent = {
    necessary: true,
    analytics: next.analytics,
    maps: next.maps,
    date: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Si no se puede persistir, la decisión sigue valiendo en memoria
    // durante esta sesión, pero no se recordará al recargar.
  }
  return consent;
}

/* ------------------------------------------------------------------ */
/*  Store observable                                                  */
/* ------------------------------------------------------------------ */

/**
 * El consentimiento es estado externo (vive en localStorage), no estado de
 * React. Leerlo con useState + useEffect provoca un setState síncrono en el
 * efecto, que React marca como cascada de renders y que además produce un
 * primer render con el banner oculto y luego visible.
 *
 * `useSyncExternalStore` es la primitiva que existe justo para esto:
 * snapshot estable en el servidor, suscripción a los cambios y sin cascadas.
 */

/** Evento que el banner dispara en cada decisión. */
export const CONSENT_EVENT = "ltevo:consent";

/**
 * Caché del valor leído. `useSyncExternalStore` exige que getSnapshot
 * devuelva SIEMPRE la misma referencia si el estado no ha cambiado, así que
 * no se puede devolver un objeto recién parseado en cada llamada.
 */
let snapshot: Consent | null = null;
let snapshotLoaded = false;

const listeners = new Set<() => void>();

/** Valor en servidor: nunca hay consentimiento durante el prerender. */
export function getServerConsent(): null {
  return null;
}

export function getConsent(): Consent | null {
  if (!snapshotLoaded) {
    snapshot = readConsent();
    snapshotLoaded = true;
  }
  return snapshot;
}

export function subscribeConsent(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

/**
 * Registra una decisión y notifica a todos los suscriptores. Sustituye a
 * `saveConsent` en los componentes: además de persistir, actualiza la caché
 * del store y emite el evento, así que el mapa y el banner se sincronizan.
 */
export function decideConsent(next: { analytics: boolean; maps: boolean }): void {
  snapshot = saveConsent(next);
  snapshotLoaded = true;
  const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: next.analytics ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  window.dispatchEvent(new Event(CONSENT_EVENT));
  for (const listener of listeners) listener();
}
