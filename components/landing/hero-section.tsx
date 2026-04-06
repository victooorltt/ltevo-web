"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const words = ["modernas", "rápidas", "elegantes", "que venden"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">

      {/* Grid lines sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/20"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/20"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Foto derecha — solo visible en desktop */}
      <div
        className={`hidden lg:block absolute right-0 top-0 w-[52%] h-full transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Imagen */}
        <img
          src="/Hero.webp"
          alt="Diseño web profesional"
          className="w-full h-full object-cover object-center"
        />
        {/* Fade izquierda — se funde con el negro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        {/* Fade inferior sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40 w-full">

        {/* Headline */}
        <div className="mb-12 text-left pl-7">
          <h1
            className={`text-[clamp(3rem,11vw,9rem)] font-display leading-[0.95] tracking-tight text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Webs</span>
            <span
              className="block transition-all duration-300"
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {words[wordIndex]}
            </span>
          </h1>
        </div>

        {/* Descripción */}
        <p
          className={`text-xl lg:text-2xl text-white/70 leading-relaxed max-w-xl mb-10 text-left pl-7 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Desarrollamos webs que trabajan por ti.
          Estrategia, diseño y rendimiento para que tu negocio escale.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-row items-start justify-start gap-4 pl-7 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-black px-8 h-14 text-base rounded-full group"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contáctanos
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver proyectos
          </Button>
        </div>

      </div>
    </section>
  );
}