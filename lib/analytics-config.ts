/** Shared identifiers for the consent gate and first-party event helper. */
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NWCDHBY9Z1";
export const GA4_DISABLE_KEY = `ga-disable-${GA4_MEASUREMENT_ID}` as const;
export const GTM_CONTAINER_ID = "GTM-MG6KCK8C";

export type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
} & Partial<Record<`ga-disable-${string}`, boolean>>;
