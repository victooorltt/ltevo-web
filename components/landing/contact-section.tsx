"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  const inputClass =
    "w-full bg-transparent border border-foreground/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors duration-200";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — texto */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >

            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
              Hablemos de
              <br />
              <span className="text-muted-foreground">tu proyecto.</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
              Cuéntanos qué necesitas y te respondemos en menos de 24 horas con una propuesta sin compromiso.
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
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {status === "success" ? (
              <div className="border border-foreground/10 p-12 flex flex-col items-start gap-4 h-full justify-center">
                <span className="font-mono text-xs text-muted-foreground">— Recibido —</span>
                <h3 className="text-3xl font-display">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gracias por contactarnos. Te responderemos en menos de 24 horas.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mt-4"
                >
                  ← Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Nombre y teléfono */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-muted-foreground">
                      Nombre <span className="text-foreground">*</span>
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

                {/* Email — ancho completo */}
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

                {/* Mensaje — igual que antes */}

                {/* Mensaje */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-muted-foreground">
                    Mensaje <span className="text-foreground">*</span>
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
    </section>
  );
}