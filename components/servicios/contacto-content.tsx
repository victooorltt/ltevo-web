"use client";

import { useSyncExternalStore, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { contactContext, trackEvent } from "@/lib/analytics";
import { business } from "@/lib/business";
import { CookiePreferencesButton } from "@/components/landing/cookie-preferences-button";
import {
  getConsent,
  getServerConsent,
  subscribeConsent,
} from "@/lib/consent";
import { ConsentCheckbox, HoneypotField } from "@/components/landing/consent-checkbox";

/* ------------------------------------------------------------------ */
/*  Mapa de ubicación                                                 */
/* ------------------------------------------------------------------ */

/**
 * El iframe de Google Maps se montaba siempre, con lo que Google escribía
 * cookies de terceros en la primera visita y sin que nadie
 * hubiera dado permiso. Ahora el iframe solo existe si hay consentimiento;
 * sin él se muestra un aviso con un enlace a la dirección, que además es
 * mejor para SEO local que un mapa dentro de un iframe.
 */
function MapConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getServerConsent,
  );

  /* En el servidor no hay consentimiento, así que el mapa no se prerenderiza:
     el iframe de Google no puede aparecer en el HTML estático. Si el
     usuario acepta, se monta; si no, se muestra la dirección con enlace. */
  if (consent?.maps !== true) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6">
        <MapPin className="size-5 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          El mapa interactivo lo carga Google y usaría cookies. Puedes{" "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Calle+Ur%C3%ADa+19%2C+33003+Oviedo%2C+Asturias"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
          >
            abrir la ubicación en Google Maps
          </a>{" "}
          en una pestaña nueva, o activar el mapa en{" "}
          <CookiePreferencesButton className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-4" />
          .
        </p>
      </div>
    );
  }

  return (
    <iframe
      src="https://maps.google.com/maps?q=Calle%20Ur%C3%ADa,%20Oviedo,%20Asturias&t=&z=15&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Mapa de la ubicación de LTEvo en Calle Uría, Oviedo"
      className="w-full h-full grayscale-[10%] contrast-[105%] transition-all duration-300"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export function ContactoContent({ initialService = "", initialPlan = "" }: { initialService?: string; initialPlan?: string }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    message: "",
  });

  /* ---- handlers -------------------------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      /* FormData en lugar de JSON.stringify(form): el checkbox de
         consentimiento y el honeypot no son controlados, así que no están
         en el estado `form` y se perderían. El backend exige `consent`. */
      const formEl = e.currentTarget;
      const consentEl = formEl.elements.namedItem("consent");
      const websiteEl = formEl.elements.namedItem("website");
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
        ...contactContext(),
        plan: form.service === "mantenimiento" ? initialPlan : "",
        consent: consentEl instanceof HTMLInputElement && consentEl.checked,
        website: websiteEl instanceof HTMLInputElement ? websiteEl.value : "",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        trackEvent("generate_lead", { service: form.service || "otro", plan: form.service === "mantenimiento" ? initialPlan : "", page_path: "/contacto", form_location: "contacto" });
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Ocurrió un error inesperado al enviar el mensaje."
        );
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
      setErrorMessage(
        "No se pudo conectar con el servidor. Revisa tu conexión a internet."
      );
    }
  };

  const inputClass =
    "w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-base md:text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-200 focus:outline-none focus:border-foreground/40 focus:bg-foreground/[0.04]";

  /* ---- contact details ------------------------------------------- */
  const contactDetails: { label: string; value: string; href?: string }[] = [
    { label: "Email", value: business.email, href: `mailto:${business.email}` },
    { label: "Teléfono", value: "+34 634 25 55 41", href: `tel:${business.telephone}` },
    { label: "Ubicación", value: "Oviedo, Asturias" },
    { label: "Horario", value: "Lunes - Viernes, 9:00 - 18:00" },
  ];

  return (
    <>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-foreground text-background py-32 lg:py-40 overflow-hidden">
        {/* subtle grain overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/[0.03] to-background/[0.06] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl lg:text-6xl font-display italic tracking-tight leading-[0.95] mb-6 text-center">
              Contacta con LTEvo
            </h1>
          </div>

          <div className="reveal" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg lg:text-xl text-background/60 max-w-2xl leading-relaxed text-center mx-auto">
              Cuéntanos tu proyecto y preparemos una propuesta sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT SECTION                                             */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* ---- Left: info ---- */}
            <div className="reveal">
              <div>
                <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
                  Hablemos de <br /> <span className="text-muted-foreground">tu proyecto.</span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
                  Comparte tu web y el servicio que necesitas. Revisamos tu situación
                  para definir alcance, calendario y presupuesto contigo.
                </p>

                <div className="space-y-4">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-baseline gap-4">
                      <span className="text-sm font-mono text-muted-foreground/50 uppercase tracking-wider w-24 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-lg text-foreground">
                        {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Right: form ---- */}
            <div className="reveal" style={{ animationDelay: "0.2s" }}>
              <div>
                {/* Región de estado para lectores de pantalla: sin esto, al
                    enviar el formulario el DOM cambiaba en silencio y no
                    había ningún aviso. Visualmente no añade nada. */}
                <div role="status" aria-live="polite" className="sr-only">
                  {status === "success" &&
                    "Mensaje enviado. Revisaremos tu consulta y te responderemos por email."}
                  {status === "error" &&
                    (errorMessage ?? "No hemos podido enviar tu mensaje.")}
                </div>
                {status === "success" ? (
                  <div className="rounded-xl border border-foreground/10 p-12 flex flex-col items-start gap-4 h-full justify-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      — Recibido —
                    </span>
                    <h3 className="text-3xl font-display">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Gracias por contactarnos. Revisaremos tu consulta y te
                      responderemos por email para concretar el siguiente paso.
                    </p>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setErrorMessage(null);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mt-4"
                    >
                      ← Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nombre y Teléfono */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="nombre" className="text-sm font-medium text-foreground/70">
                          Nombre{""}
                          <span className="text-foreground">*</span>
                        </label>
                        <input
                          id="nombre"
                          type="text"
                          name="name"
                          autoComplete="name"
                          required
                          placeholder="Tu nombre"
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="telefono" className="text-sm font-medium text-foreground/70">
                          Teléfono
                        </label>
                        <input
                          id="telefono"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="+34 600 000 000"
                          value={form.phone}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                        Email <span className="text-foreground">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Servicio */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="text-sm font-medium text-foreground/70">
                        Servicio que te interesa
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none cursor-pointer pr-10`}
                        >
                          <option value="" disabled>
                            Selecciona un servicio
                          </option>
                          <option value="diseno-web">Diseño Web</option>
                          <option value="seo">SEO y Posicionamiento</option>
                          <option value="desarrollo-web">Desarrollo web a medida</option>
                          <option value="hosting">Hosting gestionado</option>
                          <option value="ecommerce">Tienda Online</option>
                          <option value="mantenimiento">Mantenimiento Web</option>
                          <option value="otro">Otro</option>
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Mensaje */}
                    {initialPlan && form.service === "mantenimiento" && <p className="text-sm text-muted-foreground">Solicitas información sobre el plan <strong>{initialPlan}</strong>. Concretaremos alcance y condiciones antes de contratar.</p>}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="mensaje" className="text-sm font-medium text-foreground/70">
                        Mensaje{""}
                        <span className="text-foreground">*</span>
                      </label>
                      <textarea
                        id="mensaje"
                        name="message"
                        required
                        rows={5}
                        placeholder="Cuéntanos tu proyecto..."
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <div
                        role="alert"
                        className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl"
                      >
                        {errorMessage ||
                          "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."}
                      </div>
                    )}

                    <ConsentCheckbox id="consentimiento-contacto" />

                    {/* Honeypot: invisible para personas, trampa para bots. */}
                    <HoneypotField />

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full bg-foreground hover:bg-foreground/90 text-background h-14 text-base rounded-full group transition-all duration-300"
                    >
                      {status === "loading" ? (
                        <span className="font-mono text-sm">Enviando...</span>
                      ) : (
                        <>
                          Enviar mensaje
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground font-mono text-center">
                      Te respondemos en menos de 24h · Sin compromiso
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  UBICACIÓN & MAP                                             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="reveal">
              <div className="lg:col-span-1">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  — Dónde estamos
                </span>
                <h2 className="text-3xl lg:text-5xl font-display italic tracking-tight mb-6">
                  Ubicación
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-display italic text-foreground mb-1">
                      Oviedo, Asturias
                    </h3>
                    <p className="text-sm font-mono text-muted-foreground">Calle Uría</p>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed pt-2">
                    Estamos localizados en Asturias, en pleno centro de Oviedo, pero diseñamos y desarrollamos soluciones web para empresas en toda España y el mundo. Creemos en una comunicación transparente y cercana, superando cualquier frontera para llevar tu presencia digital al siguiente nivel.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="reveal" style={{ animationDelay: "0.1s" }}>
                <div className="relative w-full h-[350px] md:h-[400px] rounded-2xl overflow-hidden border border-foreground/10 bg-muted/30 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                  <MapConsent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
