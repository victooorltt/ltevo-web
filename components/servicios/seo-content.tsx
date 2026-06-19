"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BarChart3, Search, Code, TrendingUp, Link as LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

/* ------------------------------------------------------------------ */
/*  FadeIn Component                                                  */
/* ------------------------------------------------------------------ */
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
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
      className={className}
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

export function SeoContent() {
  const seoServices = [
    {
      title: "Auditoría SEO Técnica",
      description: "Analizamos el código de tu web, enlazado interno, velocidad LCP, rastreabilidad e indexación. Detectamos y resolvemos cualquier obstáculo para los rastreadores de Google.",
      icon: Code
    },
    {
      title: "Estudio de Palabras Clave (Keyword Research)",
      description: "Identificamos qué términos y preguntas reales busca tu cliente objetivo en Google. Enfocamos la estrategia en palabras clave con alta intención de compra.",
      icon: Search
    },
    {
      title: "SEO On-Page y Contenidos",
      description: "Optimizamos metatítulos, encabezados H1-H3, atributos alt de imágenes y creamos contenidos enfocados a satisfacer la intención de búsqueda con rigor (E-E-A-T).",
      icon: TrendingUp
    },
    {
      title: "Link Building de Calidad",
      description: "Mejoramos la autoridad de tu dominio mediante la obtención de enlaces naturales y relevantes en medios digitales e industriales de prestigio.",
      icon: LinkIcon
    },
    {
      title: "SEO Local y Maps",
      description: "Optimizamos tu ficha de Google Business Profile y geolocalizamos tu web para capturar el tráfico local en las ciudades donde operas.",
      icon: MapPin
    },
    {
      title: "Analítica y Monitorización",
      description: "Configuramos herramientas como Google Search Console y Analytics. Hacemos seguimiento continuo de posiciones y te entregamos informes mensuales detallados.",
      icon: BarChart3
    }
  ];

  const methodology = [
    {
      number: "01",
      title: "Diagnóstico Inicial",
      description: "Realizamos una auditoría exhaustiva de la situación técnica actual y del histórico de visibilidad de tu web para entender de dónde partimos."
    },
    {
      number: "02",
      title: "Planificación Estratégica",
      description: "Definimos un plan de optimización priorizando las acciones técnicas que tendrán mayor y más rápido impacto en tu volumen de negocio."
    },
    {
      number: "03",
      title: "Ejecución y Enlaces",
      description: "Implementamos los cambios directamente en tu CMS o código, reescribimos contenidos clave e iniciamos la captación de backlinks estratégicos."
    },
    {
      number: "04",
      title: "Medición y Ajustes",
      description: "Revisamos los datos de rendimiento semanalmente. Adaptamos la estrategia ante actualizaciones de algoritmo o movimientos de la competencia."
    }
  ];

  const valueProps = [
    {
      title: "Más Visitas Orgánicas",
      description: "Multiplicamos la visibilidad de tu negocio atrayendo a personas que ya están buscando activamente lo que vendes."
    },
    {
      title: "Inversión Sostenible",
      description: "A diferencia de la publicidad pagada (PPC), el tráfico que consigues con el SEO no desaparece cuando dejas de invertir."
    },
    {
      title: "Mejora de Conversión",
      description: "Atraer visitas no basta. Optimizamos la experiencia de usuario y la claridad de tu web para transformar las visitas en llamadas o ventas."
    },
    {
      title: "Autoridad de Marca",
      description: "Estar en las primeras posiciones de Google proyecta una imagen de líder de mercado, construyendo confianza de manera natural."
    }
  ];

  return (
    <>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-zinc-950 text-white py-48 lg:py-52 overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <img
          src="/Hero-servicios-seo.webp"
          width={2752}
          height={1536}
          alt="Posicionamiento SEO Profesional"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100"
          fetchPriority="high"
        />

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`grid-h-${i}`}
              className="absolute h-px bg-white"
              style={{ top: `${16.6 * (i + 1)}%`, left: 0, right: 0 }}
            />
          ))}
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center z-10">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-display italic tracking-tight leading-[0.95] mb-6 text-white text-center">
              Posicionamiento SEO{" "}<br />Profesional
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl lg:text-2xl text-white/80 max-w-2xl leading-relaxed text-center mx-auto">
              Optimizamos tu web técnica y estratégicamente para dominar las búsquedas de Google. Atrae leads cualificados sin pagar por cada clic.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHAT IS SEO & VALUE PROPS                                    */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                ¿Qué aporta el SEO{" "}<br /><span className="text-muted-foreground italic">a tu estrategia digital?</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="border border-foreground/10 p-8 hover-lift h-full flex flex-col justify-between rounded-sm">
                  <div>
                    <h3 className="text-2xl font-display mb-4">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEEP-DIVE: E-E-A-T & ESTRATEGIA DE CONTENIDOS               */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10 bg-background relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <FadeIn>
            <div className="mb-16 lg:mb-20 text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                Estrategia basada en E-E-A-T{" "}<br />
                <span className="text-muted-foreground italic">y Captura del Intento de Búsqueda Real</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mt-6 leading-relaxed text-base">
                El posicionamiento orgánico moderno va mucho más allá de rellenar una página con palabras clave repetitivas. Google premia la autoridad real, la experiencia contrastada y la utilidad para el usuario.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <FadeIn delay={0.1} className="h-full">
              <div className="group relative bg-zinc-50/20 dark:bg-zinc-950/30 border border-foreground/10 hover:border-foreground/35 p-8 rounded-lg transition-all duration-500 ease-out h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1">
                {/* Corner ornaments */}
                <span className="absolute top-2 left-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute top-2 right-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>

                {/* Radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.015),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
                
                {/* Dot mesh background */}
                <div 
                  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
                    backgroundSize: '16px 16px' 
                  }} 
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Index indicator */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs tracking-wider text-foreground/30 select-none">01</span>
                    </div>
                    <h3 className="text-2xl font-display mb-4 text-foreground">¿Qué es el E-E-A-T?</h3>
                    {/* Dashed divider */}
                    <div className="w-full border-t border-dashed border-foreground/10 my-4" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Corresponde a las siglas en inglés de Experiencia, Conocimiento, Autoridad y Fiabilidad (Experience, Expertise, Authoritativeness, Trustworthiness). Nos aseguramos de que el contenido de tu web demuestre de forma inequívoca estos pilares. Para ello, estructuramos páginas que presenten casos de estudio reales, certificaciones, perfiles profesionales de los autores de los contenidos y fuentes verificables que transmitan a Google y a los usuarios que tu negocio es de total confianza.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="h-full">
              <div className="group relative bg-zinc-50/20 dark:bg-zinc-950/30 border border-foreground/10 hover:border-foreground/35 p-8 rounded-lg transition-all duration-500 ease-out h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1">
                {/* Corner ornaments */}
                <span className="absolute top-2 left-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute top-2 right-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>

                {/* Radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.015),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
                
                {/* Dot mesh background */}
                <div 
                  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
                    backgroundSize: '16px 16px' 
                  }} 
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Index indicator */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs tracking-wider text-foreground/30 select-none">02</span>
                    </div>
                    <h3 className="text-2xl font-display mb-4 text-foreground">Keyword Research Avanzado</h3>
                    {/* Dashed divider */}
                    <div className="w-full border-t border-dashed border-foreground/10 my-4" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    No buscamos simplemente atraer tráfico de forma masiva e inútil, sino captar visitas transaccionales con alta intención de compra. Analizamos la semántica de búsqueda de tu público y filtramos palabras clave informativas, comparativas y de conversión. Entendiendo qué busca exactamente tu cliente potencial en cada fase de su decisión de compra, diseñamos una arquitectura de contenidos que responde a sus dudas y lo guía de manera fluida hacia el formulario de contacto o llamada telefónica.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="md:col-span-2 h-full">
              <div className="group relative bg-zinc-50/20 dark:bg-zinc-950/30 border border-foreground/10 hover:border-foreground/35 p-8 rounded-lg transition-all duration-500 ease-out h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1">
                {/* Corner ornaments */}
                <span className="absolute top-2 left-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute top-2 right-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>
                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-foreground/15 pointer-events-none select-none">+</span>

                {/* Radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.015),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
                
                {/* Dot mesh background */}
                <div 
                  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
                    backgroundSize: '16px 16px' 
                  }} 
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Index indicator */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs tracking-wider text-foreground/30 select-none">03</span>
                    </div>
                  </div>
                  
                  {/* Content layout: horizontal on desktop, vertical on mobile */}
                  <div className="flex flex-col md:flex-row md:items-stretch md:gap-8 justify-between mt-2">
                    <div className="md:w-1/3 shrink-0">
                      <h3 className="text-2xl font-display text-foreground">Optimización On-Page y Semántica</h3>
                    </div>
                    
                    {/* Dividers */}
                    <div className="block md:hidden w-full border-t border-dashed border-foreground/10 my-4" />
                    <div className="hidden md:block w-px border-l border-dashed border-foreground/10 self-stretch my-1" />

                    <p className="text-muted-foreground leading-relaxed text-sm md:w-2/3">
                      Google procesa el contenido mediante modelos de procesamiento del lenguaje natural (PLN) avanzados. Por ello, optimizamos el contenido utilizando entidades semánticas y jerarquías claras de etiquetado (H1, H2, H3), microdatos en formato JSON-LD, y optimización de densidad léxica natural. Cada artículo, servicio o página de destino se diseña para responder de manera exhaustiva y superior a cualquier otro competidor del sector en el buscador.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEO SERVICES LIST (PREMIUM DARK SECTION)                    */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden border-t border-zinc-900">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(24, 24, 27, 0.1) 0%, transparent 70%)" }} />
        
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
                Estrategias de SEO{" "}<br />
                <span className="text-zinc-400 italic">que marcan la diferencia.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <FadeIn key={service.title} delay={index * 0.05}>
                  <div className="group relative bg-zinc-900/20 border border-zinc-900/80 p-8 rounded-lg transition-all duration-300 hover:bg-zinc-900/40 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 overflow-hidden flex flex-col justify-between h-full">
                    {/* Top hover border glow */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div>
                      {/* Icon Container */}
                      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-400 group-hover:text-white group-hover:border-zinc-800 group-hover:bg-zinc-900 transition-all duration-300">
                        <IconComponent className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <h3 className="text-2xl font-display text-white mb-3 group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  OUR METHODOLOGY                                             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-white text-zinc-900 border-t border-zinc-200 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-zinc-900">
                Nuestro proceso de{" "}<br />
                <span className="text-zinc-500 italic">posicionamiento orgánico.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative max-w-5xl mx-auto mt-20">
            {/* Central vertical line for desktop, left-aligned for mobile */}
            <div className="absolute left-4 lg:left-1/2 top-4 lg:top-5 bottom-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent lg:-translate-x-1/2" />

            <div className="space-y-16 lg:space-y-24">
              {methodology.map((step, index) => {
                const isRight = index % 2 === 0;
                return (
                  <FadeIn key={step.number} delay={index * 0.1}>
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-x-24 items-start">
                      {/* Timeline circle */}
                      <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-zinc-900 border border-zinc-200/50 flex items-center justify-center z-10 shadow-sm">
                        <span className="font-mono text-xs lg:text-sm font-semibold text-white">
                          {parseInt(step.number)}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className={`pl-12 lg:pl-0 ${isRight ? "lg:col-start-2 lg:text-left lg:pl-4" : "lg:col-start-1 lg:text-right lg:pr-4"}`}>
                        <h3 className="text-xl lg:text-2xl font-display text-zinc-900 mb-2 lg:mb-3">
                          {step.title}
                        </h3>
                        <p className={`text-zinc-600 leading-relaxed text-sm max-w-md ${isRight ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN LOCAL: SEO LOCAL EN ASTURIAS                        */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white leading-tight">
                Posicionamiento SEO Local en Asturias:{" "}<br />
                <span className="text-zinc-400 italic">Oviedo, Gijón y Avilés</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base mt-6">
                Si tu negocio opera en el ámbito geográfico del Principado de Asturias, el SEO local es la herramienta más potente y rentable para capturar clientes en tu zona de influencia directa. Millones de búsquedas diarias contienen intención geográfica explícita e implícita.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                En LTEvo nos especializamos en dominar el mercado asturiano. Optimizamos tu arquitectura web para posicionar en palabras clave locales clave y configuramos de forma experta tu perfil de Google Business Profile (antiguo Google My Business) para lograr la máxima visibilidad en el Mapa Local (Local Pack) de Google. Esto sitúa a tu negocio frente a los usuarios de Oviedo, Gijón y Avilés justo en el momento exacto en el que necesitan tus servicios.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
                <h3 className="text-2xl font-display text-white mb-4">Pilares del SEO Local</h3>
                <ul className="space-y-4 text-zinc-400 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Consistencia NAP:</strong> Aseguramos que tu nombre, dirección y teléfono (Name, Address, Phone) sean 100% idénticos y coherentes en toda la web para ganar la confianza del buscador.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Reseñas y Señales Sociales:</strong> Implementamos estrategias para captar de forma legítima valoraciones positivas de cinco estrellas de tus clientes locales, aumentando drásticamente la conversión.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Contenido Geolocalizado:</strong> Redactamos y optimizamos páginas específicas de servicio geolocalizadas que responden a la perfección al interés del usuario asturiano.</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                 */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-gray-200">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
                Preguntas frecuentes sobre SEO
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Cuánto se tarda en ver los resultados del SEO?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  El SEO es una estrategia a medio y largo plazo. Por lo general, los primeros cambios en visibilidad se empiezan a notar a partir del tercer mes, y los resultados significativos en captación de leads consolidados se aprecian a partir del sexto mes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Qué diferencia hay entre SEO y SEM (Google Ads)?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Con el SEM pagas a Google directamente por cada persona que hace clic en tus anuncios. Si dejas de pagar, tu visibilidad desaparece inmediatamente. Con el SEO, optimizas tu web para aparecer de forma orgánica. Requiere tiempo de optimización inicial, pero crea un flujo constante y gratuito de visitas cualificadas en el tiempo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Garantizáis la primera posición en Google?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Ninguna agencia honesta puede garantizar la primera posición exacta en Google ya que los algoritmos de clasificación dependen al 100% de Google y cambian constantemente. Lo que sí garantizamos es un aumento sólido y contrastable en la visibilidad orgánica de palabras clave estratégicas para captar clientes de valor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Qué es el SEO local y por qué lo necesito?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Consiste en optimizar tu presencia para búsquedas geolocalizadas (como 'agencia web en Oviedo'). Es imprescindible para negocios físicos o proveedores que ofrecen servicios en áreas geográficas concretas, ya que les permite aparecer directamente en Google Maps cuando los usuarios de su zona les buscan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Es necesario realizar optimizaciones constantes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Sí. Google introduce constantes actualizaciones en su algoritmo y tus competidores siguen optimizando su web. Para proteger los rankings conseguidos, adaptar los contenidos a nuevas tendencias de búsqueda y seguir creciendo, el SEO requiere monitorización y mejoras continuas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Cómo ayuda el marcado de Schema.org / JSON-LD al posicionamiento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Los datos estructurados (Schema) son fragmentos de código estandarizados que se añaden a tu web para ayudar a Google a comprender el contexto y significado preciso del contenido (por ejemplo, si una página es un servicio, una empresa local, una receta o una pregunta frecuente). Al implementarlo de forma correcta, aumentamos las probabilidades de que tu sitio web muestre fragmentos enriquecidos (Rich Snippets) en las páginas de resultados de Google, lo que incrementa el CTR y atrae más clics con el mismo posicionamiento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿En qué consiste una campaña de Link Building ético y seguro?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  El enlazado externo es uno de los factores de clasificación más potentes de Google, pero también uno de los más sensibles. Huimos de la compra masiva de enlaces en granjas de spam que podrían provocar penalizaciones algorítmicas severas. En su lugar, diseñamos campañas de relaciones públicas digitales para conseguir menciones y enlaces editoriales en periódicos digitales relevantes, blogs especializados y portales de tu sector con tráfico orgánico real, garantizando un crecimiento seguro y duradero de la autoridad de tu marca.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA SECTION                                                 */}
      {/* ============================================================ */}
      <section className="bg-foreground text-background py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-4xl lg:text-7xl font-display italic tracking-tight mb-8">
              ¿Listo para dominar las búsquedas de tu sector?
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
              Analizamos tu web actual sin coste y te mostramos dónde están tus principales oportunidades de crecimiento en Google.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-full group inline-flex items-center"
            >
              <Link href="/contacto">
                Solicitar auditoría gratuita
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
