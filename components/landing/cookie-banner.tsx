"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  CONSENT_PREFERENCES_EVENT,
  OPTIONAL_CATEGORIES,
  decideConsent,
  getConsent,
  getServerConsent,
  subscribeConsent,
  type OptionalCategory,
} from "@/lib/consent";

type Draft = { analytics: boolean; maps: boolean };

const COPY: Record<OptionalCategory, { label: string; detail: string }> = {
  analytics: {
    label: "Analítica de la web",
    detail: "Google Analytics nos ayuda a entender qué páginas se visitan y a mejorar la web.",
  },
  maps: {
    label: "Mapa de Google",
    detail: "Permite cargar el mapa interactivo en Contacto. Si lo desactivas, seguimos mostrando la dirección.",
  },
};

const choiceButton = "min-h-11 rounded-full border border-foreground/20 bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none";
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<Draft>({ analytics: false, maps: false });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openPreferences = useCallback(() => {
    const current = getConsent();
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDraft({ analytics: current?.analytics ?? false, maps: current?.maps ?? false });
    setShowPreferences(true);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
  }, []);

  const decide = useCallback((next: Draft) => {
    decideConsent(next);
    setShowPreferences(false);
  }, []);

  useEffect(() => {
    window.addEventListener(CONSENT_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(CONSENT_PREFERENCES_EVENT, openPreferences);
  }, [openPreferences]);

  // El diálogo nativo gestiona el foco, Tab y Escape. Cerrar nunca guarda el borrador.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!showPreferences) {
      if (dialog.open) dialog.close();
      if (openerRef.current?.isConnected) openerRef.current.focus({ preventScroll: true });
      return;
    }

    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [showPreferences]);

  return (
    <>
      {hydrated && consent === null && (
        <aside
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-h-[calc(100dvh_-_2rem)] max-w-[1120px] overflow-y-auto rounded-3xl border border-foreground/10 bg-background p-6 text-foreground shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:inset-x-6 sm:p-7 lg:bottom-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="min-w-0 flex-1">
              <h2 id="cookie-banner-title" className="font-display text-xl tracking-tight sm:text-2xl">
                Tú decides qué cookies usar.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Recordamos tu elección. Con tu permiso, usamos Google Analytics
                para mejorar la web y Google Maps para mostrar la ubicación.
                Puedes rechazarlos y seguir navegando.{" "}
                <Link href="/cookies" className="underline underline-offset-4 decoration-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
                  Más información
                </Link>
                .
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 lg:w-[430px] lg:shrink-0 lg:grid-cols-3">
              <button type="button" onClick={() => decide({ analytics: false, maps: false })} className={choiceButton}>
                Rechazar
              </button>
              <button type="button" onClick={() => decide({ analytics: true, maps: true })} className={choiceButton}>
                Aceptar todas
              </button>
              <button
                type="button"
                onClick={openPreferences}
                aria-haspopup="dialog"
                aria-controls="cookie-preferences"
                className="col-span-2 min-h-11 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none lg:col-span-1"
              >
                Configurar
              </button>
            </div>
          </div>
        </aside>
      )}

      <dialog
        ref={dialogRef}
        id="cookie-preferences"
        aria-labelledby="cookie-preferences-title"
        aria-describedby="cookie-preferences-description"
        onCancel={closePreferences}
        onClose={closePreferences}
        className="m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-[560px] overflow-y-auto overscroll-contain rounded-3xl border border-foreground/10 bg-background p-0 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">LTEvo · Privacidad</p>
              <h2 ref={titleRef} id="cookie-preferences-title" tabIndex={-1} className="font-display text-2xl tracking-tight outline-none sm:text-3xl">
                Tus preferencias de cookies
              </h2>
            </div>
            <button
              type="button"
              onClick={closePreferences}
              aria-label="Cerrar configuración sin guardar"
              className="-mr-1 flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <p id="cookie-preferences-description" className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Activa solo lo que quieras permitir. Puedes cambiar tu elección
            desde «Configurar cookies» en el pie de página.
          </p>

          <div className="mt-7 divide-y divide-foreground/10 border-y border-foreground/10">
            <div className="flex items-start justify-between gap-5 py-5">
              <div>
                <h3 className="text-sm font-semibold">Necesarias</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Guardamos tu elección en este navegador para recordar tus preferencias.
                </p>
              </div>
              <span className="shrink-0 pt-0.5 text-xs font-medium text-muted-foreground">Siempre activas</span>
            </div>
            {OPTIONAL_CATEGORIES.map((category) => (
              <label key={category} htmlFor={`cookie-${category}`} className="flex cursor-pointer items-start justify-between gap-5 py-5">
                <span>
                  <span id={`cookie-${category}-label`} className="block text-sm font-semibold">{COPY[category].label}</span>
                  <span id={`cookie-${category}-detail`} className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{COPY[category].detail}</span>
                </span>
                <span className="relative mt-0.5 shrink-0">
                  <input
                    id={`cookie-${category}`}
                    type="checkbox"
                    role="switch"
                    checked={draft[category]}
                    aria-checked={draft[category]}
                    aria-labelledby={`cookie-${category}-label`}
                    aria-describedby={`cookie-${category}-detail`}
                    onChange={(event) => {
                      const checked = event.currentTarget.checked;
                      setDraft((previous) => ({ ...previous, [category]: checked }));
                    }}
                    className="peer sr-only"
                  />
                  <span aria-hidden="true" className="block h-6 w-11 rounded-full border border-foreground/45 bg-foreground/10 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-foreground/65 after:transition-transform peer-checked:bg-foreground peer-checked:after:translate-x-5 peer-checked:after:bg-card peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:after:transition-none" />
                </span>
              </label>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => decide({ analytics: false, maps: false })} className={choiceButton}>Rechazar todas</button>
            <button type="button" onClick={() => decide({ analytics: true, maps: true })} className={choiceButton}>Aceptar todas</button>
            <button
              type="button"
              onClick={() => decide(draft)}
              className="col-span-2 mt-1 min-h-11 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none"
            >
              Guardar mi selección
            </button>
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            Los cambios se aplican al guardar.{" "}
            <Link href="/cookies" onClick={closePreferences} className="underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
              Política de cookies
            </Link>
          </p>
        </div>
      </dialog>
    </>
  );
}
