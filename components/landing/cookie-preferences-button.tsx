"use client";

import type { ReactNode } from "react";
import { openConsentPreferences } from "@/lib/consent";

export function CookiePreferencesButton({
  className,
  children = "Configurar cookies",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      aria-haspopup="dialog"
      aria-controls="cookie-preferences"
      className={className}
    >
      {children}
    </button>
  );
}
