import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-black">

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

      {/* Foto derecha / Fondo en mobile.
          `fade-up-slow` arranca en opacity 0, y Chrome EXCLUYE del cálculo de
          LCP los elementos con opacidad 0: la imagen más grande de la home
          entraba tarde al ser descartada como candidata. Por eso solo se
          anima el transform (translateY) y la opacidad parte de 0.9, no de 0:
          el efecto visual es prácticamente idéntico y el LCP deja de esperar. */}
      <div
        className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[52%] h-full block fade-up-image"
        style={{ animationDelay: "0ms" }}
      >
        {/* Imagen (art direction: variante mobile <1024px, desktop >=1024px).
            <picture> garantiza que solo se descargue la variante que toca.
            next/image no soporta <source media> y duplicaría la precarga,
            por eso se usan los webp estáticos ya optimizados por scripts/optimize-image.js. */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/Hero.webp" width={1920} height={1047} />
          <img
            src="/Hero-inicio-mobile.webp"
            width={800}
            height={1433}
            alt="Diseño web profesional"
            className="w-full h-full object-cover object-center opacity-85 lg:opacity-100"
            fetchPriority="high"
          />
        </picture>
        {/* Fade/Overlay para legibilidad en mobile y fundido en desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-0% via-black/50 via-30% to-transparent to-65% hidden lg:block" />
        {/* Fade inferior sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 hidden lg:block" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40 w-full">

        {/* Headline */}
        <div className="mb-12 text-left pl-7">
          <h1 className="text-[clamp(2.75rem,9vw,4.5rem)] lg:text-[clamp(3.5rem,5.8vw,6.5rem)] font-display leading-[1.05] tracking-tight text-white max-w-4xl">
            Diseño y desarrollo web en Oviedo
          </h1>
        </div>

        {/* Descripción */}
        <p
          className="fade-up text-xl lg:text-2xl text-white/70 leading-relaxed max-w-xl mb-10 text-left pl-7"
          style={{ animationDelay: "200ms" }}
        >
          Webs corporativas, tiendas online y proyectos a medida para empresas de Asturias y toda España. Conoce nuestro trabajo y solicita una propuesta para tu negocio.
        </p>

        {/* CTAs */}
        <div
          className="fade-up flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-4 pl-7 pr-7 sm:pr-0"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-black px-8 h-14 text-base rounded-full group w-full sm:w-auto justify-center"
            asChild
          >
            <Link href="/contacto?servicio=diseno-web">Solicitar presupuesto <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto justify-center"
            asChild
          >
            <Link href="/proyectos">Ver proyectos</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}