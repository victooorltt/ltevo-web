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
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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
/*  JSON-LD structured data                                           */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/seo#service",
      "name": "Posicionamiento SEO Profesional",
      "description": "Agencia de posicionamiento SEO en España. Optimizamos tu web para multiplicar las visitas y captar clientes orgánicos cualificados.",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://ltevo.com/#business",
        "name": "LTEvo",
        "url": "https://ltevo.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "serviceType": "Search Engine Optimization"
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltevo.com/servicios/seo#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto se tarda en ver los resultados del SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los resultados en SEO suelen comenzar a ser significativos entre el tercer y sexto mes de trabajo estable. Es una inversión de medio y largo plazo que genera retornos crecientes de forma sostenible."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué diferencia hay entre SEO y SEM (Google Ads)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El SEM consiste en pagar por cada clic en anuncios de pago de forma inmediata. El SEO se enfoca en posicionar orgánicamente tu web sin pagar por clic, lo que construye un activo a largo plazo de visitas gratuitas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Garantizáis el primer puesto en Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ninguna agencia seria puede garantizar la primera posición absoluta porque los algoritmos de Google cambian constantemente y no les pertenecen. Sin embargo, garantizamos una mejora drástica en el tráfico cualificado y en la visibilidad de tus palabras clave clave."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué es el SEO local y por qué lo necesito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El SEO local optimiza tu web y tu perfil de Google Business Profile para que aparezcas cuando los usuarios de tu zona geográfica busquen tus servicios. Es clave para tiendas físicas y servicios de proximidad."
          }
        },
        {
          "@type": "Question",
          "name": "¿Es necesario realizar optimizaciones constantes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Tu competencia también trabaja su SEO, y Google actualiza sus algoritmos cientos de veces al año. Para mantener y mejorar los rankings, es necesario analizar métricas, actualizar contenidos y resolver problemas técnicos de forma recurrente."
          }
        }
      ]
    }
  ]
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-zinc-950 text-white py-48 lg:py-52 overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <img
          src="/Hero-servicios-seo.webp"
          alt="Posicionamiento SEO Profesional"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100"
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
              Posicionamiento SEO<br />Profesional
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
                ¿Qué aporta el SEO<br /><span className="text-muted-foreground italic">a tu estrategia digital?</span>
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
      {/*  SEO SERVICES LIST (PREMIUM DARK SECTION)                    */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden border-t border-zinc-900">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
                Estrategias de SEO<br />
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
                Nuestro proceso de<br />
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
