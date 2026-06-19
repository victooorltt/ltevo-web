"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ------------------------------------------------------------------ */
/*  FadeIn                                                            */
/* ------------------------------------------------------------------ */
function FadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export function ContactoContent() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
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
    "w-full bg-transparent border border-foreground/10 px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors duration-200 rounded-sm";

  /* ---- contact details ------------------------------------------- */
  const contactDetails = [
    { label: "Email", value: "info@ltevo.com" },
    { label: "Teléfono", value: "+34 634 25 55 41" },
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
          <FadeIn delay={0.1}>
            <h1 className="text-4xl lg:text-6xl font-display italic tracking-tight leading-[0.95] mb-6 text-center">
              Contacta con Nosotros
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg lg:text-xl text-background/60 max-w-2xl leading-relaxed text-center mx-auto">
              Cuéntanos tu proyecto y te respondemos en menos de 24 horas
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT SECTION                                             */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* ---- Left: info ---- */}
            <FadeIn>
              <div>
                <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
                  Hablemos de{" "}
                  <br />
                  <span className="text-muted-foreground">tu proyecto.</span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
                  Cuéntanos qué necesitas y te respondemos en menos de 24 horas
                  con una propuesta sin compromiso.
                </p>

                <div className="space-y-4">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-baseline gap-4">
                      <span className="text-sm font-mono text-muted-foreground/50 uppercase tracking-wider w-24 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-lg text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* ---- Right: form ---- */}
            <FadeIn delay={0.2}>
              <div>
                {status === "success" ? (
                  <div className="border border-foreground/10 p-12 flex flex-col items-start gap-4 h-full justify-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      — Recibido —
                    </span>
                    <h3 className="text-3xl font-display">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Gracias por contactarnos. Te responderemos en menos de 24
                      horas.
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre y Teléfono */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs text-muted-foreground">
                          Nombre{" "}
                          <span className="text-foreground">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Tu nombre"
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass}
                          suppressHydrationWarning
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs text-muted-foreground">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+34 600 000 000"
                          value={form.phone}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-muted-foreground">
                        Email <span className="text-foreground">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Servicio */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-muted-foreground">
                        Servicio que te interesa
                      </label>
                      <Select
                        value={form.service}
                        onValueChange={(val) => setForm((prev) => ({ ...prev, service: val }))}
                      >
                        <SelectTrigger
                          id="service"
                          className={`${inputClass} w-full h-[46px] flex items-center justify-between text-left`}
                        >
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-foreground/10 text-foreground">
                          <SelectItem value="diseno-web">Diseño Web</SelectItem>
                          <SelectItem value="seo">SEO y Posicionamiento</SelectItem>
                          <SelectItem value="ecommerce">Tienda Online</SelectItem>
                          <SelectItem value="mantenimiento">Mantenimiento Web</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mensaje */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-muted-foreground">
                        Mensaje{" "}
                        <span className="text-foreground">*</span>
                      </label>
                      <textarea
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
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono rounded">
                        {errorMessage ||
                          "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."}
                      </div>
                    )}

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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  UBICACIÓN & MAP                                             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <FadeIn>
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
            </FadeIn>

            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <div className="relative w-full h-[350px] md:h-[400px] rounded-2xl overflow-hidden border border-foreground/10 dark:border-zinc-800 bg-muted/30 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                  <iframe
                    src="https://maps.google.com/maps?q=Calle%20Ur%C3%ADa,%20Oviedo,%20Asturias&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[10%] contrast-[105%] dark:invert-[90%] dark:hue-rotate-180 dark:brightness-[90%] dark:contrast-[110%] transition-all duration-300"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
