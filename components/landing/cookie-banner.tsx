"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  OPTIONAL_CATEGORIES,
  decideConsent,
  getConsent,
  getServerConsent,
  subscribeConsent,
  type OptionalCategory,
} from "@/lib/consent";

/**
 * Banner de consentimiento de cookies.
 *
 * Diseño: barra inferior a ancho completo sobre fondo blanco, alineada con
 * la rejilla del sitio (`max-w-[1400px]`). Sin tarjeta, sin sombra grande,
 * sin degradados y sin esquinas: una sola barra, una sola línea de texto y
 * los botones. Todo el banner usa la sans y `font-display` (la tipografía de
 * los titulares del sitio); no queda ninguna etiqueta monoespaciada.
 *
 * Comportamiento: las preferencias viven en un borrador. Las casillas solo
 * modifican ese borrador y nada se persiste hasta pulsar Guardar, Aceptar o
 * Rechazar. Antes, tocar una casilla guardaba la decisión y cerraba el panel,
 * lo que además dejaba los interruptores muertos en la primera visita.
 *
 * Cumplimiento: art. 7 RGPD (libre, informado, específico, inequívoco y
 * revocable) y LSSI art. 22.2. Rechazar pesa lo mismo que aceptar. En la
 * primera visita no hay botón de cerrar: descartar sin elegir sería
 * consentimiento ambiguo, así que la barra solo desaparece al decidir.
 *
 * El estado se lee con `useSyncExternalStore` en lugar de `useState` +
 * `useEffect`, porque el consentimiento vive fuera de React (localStorage).
 */

interface Draft {
  analytics: boolean;
  maps: boolean;
}

const COPY: Record<OptionalCategory, { label: string; detail: string }> = {
  analytics: {
    label: "Analítica",
    detail: "Medir qué páginas funcionan.",
  },
  maps: {
    label: "Mapa",
    detail: "Mostrar el mapa de ubicación.",
  },
};

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getServerConsent,
  );
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<Draft>({ analytics: false, maps: false });

  const firstVisit = consent === null;

  const openPreferences = useCallback(() => {
    setDraft({
      analytics: consent?.analytics ?? false,
      maps: consent?.maps ?? false,
    });
    setShowPreferences(true);
  }, [consent]);

  const close = useCallback(() => {
    setShowPreferences(false);
    setDraft({ analytics: false, maps: false });
  }, []);

  /* Escape cierra las preferencias. En la primera visita no se cierra: sin
     decisión no puede aceptarse el consentimiento, y descartarla en silencio
     equivaldría a dejar las cookies de terceros sin que nadie las hubiera
     rechazado ni aceptado. */
  useEffect(() => {
    if (!showPreferences || firstVisit) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPreferences, firstVisit, close]);

  const decide = useCallback(
    (next: Draft) => {
      decideConsent(next);
      close();
    },
    [close],
  );

  /* Ya hay decisión y no se están viendo preferencias: botón de reapertura.
     Sin esto, revocar el consentimiento sería imposible (art. 7.3 RGPD). */
  if (!firstVisit && !showPreferences) {
    return (
      <div className="fixed bottom-4 left-4 z-[120]">
        <button
          type="button"
          onClick={openPreferences}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 bg-white border border-foreground/10 rounded-full px-3.5 py-2 shadow-xs"
        >
          Cookies
        </button>
      </div>
    );
  }

  const draftValues: Record<OptionalCategory, boolean> = {
    analytics: draft.analytics,
    maps: draft.maps,
  };

  return (
    <div
      role="region"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-[120] border-t border-foreground/10 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
          {/* Texto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-lg font-medium tracking-tight text-foreground">
                Cookies
              </h2>
              {/* Solo al reabrir: cerrar descarta el borrador sin guardar. */}
              {!firstVisit && (
                <button
                  type="button"
                  onClick={close}
                  aria-label="Cerrar preferencias de cookies"
                  className="-mt-0.5 -mr-1 shrink-0 size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors duration-300"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              Usamos las esenciales para que todo funcione. Las de analítica y
              mapa, solo si aceptas.{" "}
              <Link
                href="/cookies"
                className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
              >
                Política de cookies
              </Link>
              .
            </p>
          </div>

          {/* Acciones: se sustituyen por las preferencias al abrirlas */}
          {!showPreferences ? (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => decide({ analytics: true, maps: true })}
                className="h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors duration-300"
              >
                Aceptar
              </button>
              <button
                type="button"
                onClick={() => decide({ analytics: false, maps: false })}
                className="h-11 px-6 rounded-full border border-foreground/15 text-foreground text-sm font-medium hover:border-foreground/40 hover:bg-foreground/[0.03] transition-colors duration-300"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="h-11 px-6 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Personalizar
              </button>
            </div>
          ) : (
            <div className="shrink-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                {OPTIONAL_CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={category}
                      checked={draftValues[category]}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          [category]: e.target.checked,
                        }))
                      }
                      className="size-4 shrink-0 accent-foreground"
                    />
                    <span className="text-sm text-foreground leading-none">
                      {COPY[category].label}
                    </span>
                    <span className="text-xs text-muted-foreground leading-none">
                      {COPY[category].detail}
                    </span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={() => decide(draft)}
                className="mt-4 h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors duration-300"
              >
                Guardar selección
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
