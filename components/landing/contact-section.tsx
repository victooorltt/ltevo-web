"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { contactContext, trackEvent } from "@/lib/analytics";
import { ConsentCheckbox, HoneypotField } from "@/components/landing/consent-checkbox";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      /* El checkbox de consentimiento y el honeypot no son controlados: no
         viven en `form` y se perderían con JSON.stringify(form). El backend
         exige `consent`, así que se leen del propio formulario. */
      const formEl = e.currentTarget;
      const consentEl = formEl.elements.namedItem("consent");
      const websiteEl = formEl.elements.namedItem("website");
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        // Este formulario no tiene selector de servicio, así que lo declara
        // vacío y el correo mostrará "No indicado".
        service: "",
        message: form.message,
        ...contactContext(),
        sourcePath: "/",
        plan: "",
        consent: consentEl instanceof HTMLInputElement && consentEl.checked,
        website:
          websiteEl instanceof HTMLInputElement ? websiteEl.value : "",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        trackEvent("generate_lead", { service: "otro", page_path: "/", form_location: "home" });
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Ocurrió un error inesperado al enviar el mensaje.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
      setErrorMessage("No se pudo conectar con el servidor. Revisa tu conexión a internet.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-base md:text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-200 focus:outline-none focus:border-foreground/40 focus:bg-foreground/[0.04]";

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — texto */}
          <div className="reveal">

            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
              Hablemos de <br /> <span className="text-muted-foreground">tu proyecto.</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
              Cuéntanos qué necesitas. Revisamos tu proyecto para definir alcance, calendario y presupuesto sin compromiso.
            </p>

            <div className="space-y-4">
              {[
                { label: "Email",     value: "info@ltevo.com"   },
                { label: "Teléfono",  value: "+34 634 25 55 41" },
                { label: "Ubicación", value: "Oviedo, Asturias" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted-foreground w-20 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-sm text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — formulario */}
          <div className="reveal" style={{ animationDelay: "200ms" }}>
            <div role="status" aria-live="polite" className="sr-only">
              {status === "success" &&
                "Mensaje enviado. Revisaremos tu consulta y te responderemos por email."}
              {status === "error" &&
                (errorMessage || "Hubo un error al enviar el mensaje.")}
            </div>
            {status === "success" ? (
              <div className="rounded-xl border border-foreground/10 p-12 flex flex-col items-start gap-4 h-full justify-center">
                <span className="font-mono text-xs text-muted-foreground">— Recibido —</span>
                <h3 className="text-3xl font-display">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gracias por contactarnos. Revisaremos tu consulta y te responderemos por email.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setErrorMessage(null);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mt-4"
                >
                  ← Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Nombre y teléfono */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nombre-home" className="text-sm font-medium text-foreground/85">
                      Nombre <span className="text-foreground">*</span>
                    </label>
                    <input
                      id="nombre-home"
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
                    <label htmlFor="telefono-home" className="text-sm font-medium text-foreground/85">
                      Teléfono
                    </label>
                    <input
                      id="telefono-home"
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

                {/* Email — ancho completo */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email-home" className="text-sm font-medium text-foreground/85">
                    Email <span className="text-foreground">*</span>
                  </label>
                  <input
                    id="email-home"
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

                {/* Mensaje — igual que antes */}

                {/* Mensaje */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="mensaje-home" className="text-sm font-medium text-foreground/85">
                    Mensaje <span className="text-foreground">*</span>
                  </label>
                  <textarea
                    id="mensaje-home"
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntanos tu proyecto..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Mensaje de error */}
                {status === "error" && (
                  <div role="alert" className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
                    {errorMessage || "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."}
                  </div>
                )}

                <ConsentCheckbox id="consentimiento-home" />

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

                <p className="text-xs text-foreground/75 font-mono text-center">
                  Te respondemos en menos de 24h · Sin compromiso
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
