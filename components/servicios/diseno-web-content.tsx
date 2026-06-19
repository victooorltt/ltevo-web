"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight, Zap, SlidersHorizontal, Search, Feather, Compass, Palette, Code2, Rocket } from "lucide-react";
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

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                           */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/diseno-web#service",
      "name": "Diseño Web Profesional a Medida",
      "description": "Diseño y desarrollo de páginas web profesionales a medida. Sitios web rápidos, intuitivos, optimizados para SEO y 100% autogestionables.",
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
      "serviceType": "Web Design and Development"
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltevo.com/servicios/diseno-web#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo se tarda en diseñar y desarrollar una web?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El plazo de entrega habitual varía entre 3 y 6 semanas, dependiendo de la envergadura y complejidad del proyecto."
          }
        },
        {
          "@type": "Question",
          "name": "¿La web será totalmente autogestionable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Integramos sistemas gestores de contenido sencillos y modernos para que puedas modificar textos, imágenes y crear nuevos apartados sin depender de nosotros."
          }
        },
        {
          "@type": "Question",
          "name": "¿Se adaptará correctamente a dispositivos móviles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutamente. Diseñamos con filosofía 'Mobile-First', garantizando una visualización impecable y un rendimiento excepcional en smartphones, tablets y ordenadores."
          }
        },
        {
          "@type": "Question",
          "name": "¿Incluye soporte y mantenimiento posterior?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, ofrecemos planes opcionales de mantenimiento preventivo, actualizaciones periódicas, copias de seguridad de seguridad diarias y soporte prioritario."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué tecnologías utilizáis para el desarrollo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trabajamos principalmente con Next.js (App Router), React, TypeScript y Tailwind CSS, garantizando así la máxima velocidad de carga del mercado y la mejor base técnica para el SEO."
          }
        }
      ]
    }
  ]
};

export function DisenoWebContent() {
  const steps = [
    {
      number: "01",
      title: "Estrategia y Planificación",
      description: "Analizamos tu modelo de negocio, competencia y objetivos. Definimos la estructura del sitio y el mapa web estratégico para maximizar la conversión.",
      icon: Compass,
      iconColor: "text-amber-400",
      glowColor: "rgba(251, 191, 36, 0.08)",
    },
    {
      number: "02",
      title: "Diseño Visual de Experiencia (UI/UX)",
      description: "Diseñamos un prototipo a medida único para tu marca. Cuidamos la navegación, tipografías y el recorrido de los usuarios para lograr una experiencia impecable.",
      icon: Palette,
      iconColor: "text-sky-400",
      glowColor: "rgba(56, 189, 248, 0.08)",
    },
    {
      number: "03",
      title: "Desarrollo de Alta Performance",
      description: "Programamos tu web utilizando Next.js, TypeScript y Tailwind CSS. El resultado es un código limpio, seguro, de carga ultrarrápida y preparado para el futuro.",
      icon: Code2,
      iconColor: "text-emerald-400",
      glowColor: "rgba(52, 211, 153, 0.08)",
    },
    {
      number: "04",
      title: "Optimización SEO y Lanzamiento",
      description: "Configuramos los metatítulos, meta descripciones y datos estructurados. Revisamos el rendimiento en buscadores y publicamos tu web sin interrupción del servicio.",
      icon: Rocket,
      iconColor: "text-indigo-400",
      glowColor: "rgba(129, 140, 248, 0.08)",
    }
  ];

  const typesOfWebs = [
    {
      title: "Webs Corporativas",
      description: "Páginas profesionales diseñadas para transmitir confianza, detallar servicios y captar nuevos clientes cualificados."
    },
    {
      title: "Landing Pages de Conversión",
      description: "Monopáginas ultra optimizadas para campañas de marketing digital enfocadas a obtener registros o ventas específicas."
    },
    {
      title: "Tiendas Online (eCommerce)",
      description: "Soluciones completas de comercio electrónico con catálogos fluidos, gestión ágil de stock y pasarelas de pago seguras."
    },
    {
      title: "Portafolios Creativos",
      description: "Presentaciones visualmente impecables para agencias, arquitectos, fotógrafos y profesionales que venden con el impacto visual."
    },
    {
      title: "Aplicaciones Web a Medida",
      description: "Desarrollos a medida con paneles de administración personalizados, integraciones API y funcionalidades dinámicas específicas."
    },
    {
      title: "Plataformas Inmobiliarias / Directorios",
      description: "Sistemas complejos con buscadores avanzados, filtrado dinámico en tiempo real y bases de datos robustas."
    }
  ];

  const valueProps = [
    {
      title: "Velocidad Extrema",
      description: "Desarrollamos con Next.js logrando puntuaciones de 95+ en Google PageSpeed, reduciendo el rebote de usuarios de inmediato.",
      icon: Zap,
      iconColor: "text-amber-400/90"
    },
    {
      title: "Autogestionable",
      description: "Administra todo de forma visual e intuitiva. Sin necesidad de tocar una sola línea de código.",
      icon: SlidersHorizontal,
      iconColor: "text-sky-400/90"
    },
    {
      title: "Preparado para SEO",
      description: "Código semántico e indexación limpia estructurada desde el primer día para ponérselo fácil a Google.",
      icon: Search,
      iconColor: "text-emerald-400/90"
    },
    {
      title: "Enfoque Editorial",
      description: "Combinamos tipografía sofisticada, espacio en blanco generoso y colores minimalistas para lograr un diseño premium.",
      icon: Feather,
      iconColor: "text-indigo-400/90"
    }
  ];

  const techStack = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Resend SDK", "PostgreSQL", "Node.js", "Vercel"
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
      <section className="relative bg-background text-foreground pt-36 pb-28 lg:pt-48 lg:pb-50 overflow-hidden flex items-center min-h-[75vh]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={`grid-h-${i}`}
              className="absolute h-px bg-foreground"
              style={{ top: `${16.6 * (i + 1)}%`, left: 0, right: 0 }}
            />
          ))}
        </div>

        {/* Absolute Image Container on the right */}
        <FadeIn
          delay={0.2}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="relative w-full h-full">
            {/* Gradient overlay element positioned over the image */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/65 lg:to-transparent z-[1]" />
            
            <picture>
              <source media="(min-width: 1024px)" srcSet="/Hero-servicios-diseno-web.webp" />
              <img
                src="/Hero-servicios-diseno-web-mobile.webp"
                alt="Diseño Web Profesional a Medida"
                className="w-full h-full object-cover lg:object-contain object-center lg:object-right z-0 opacity-80 lg:opacity-100 transition-opacity duration-500"
              />
            </picture>
          </div>
        </FadeIn>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          {/* Left/center section constrained to lg:max-w-[55%] to prevent overlap */}
          <div className="w-full lg:max-w-[55%] flex flex-col justify-center items-center lg:items-start">
            
            <FadeIn delay={0.1} className="w-full">
              <h1 className="text-[3.5rem] sm:text-5xl lg:text-6xl xl:text-6xl font-display italic tracking-tight leading-[0.95] mb-8 text-foreground text-center lg:text-left">
                Diseño Web Profesional<br />a Medida
              </h1>
            </FadeIn>

            <FadeIn delay={0.2} className="w-full">
              <p className="text-[1.15rem] md:text-[1.2rem] lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 text-center lg:text-left mx-auto lg:mx-0">
                Desarrollamos páginas web premium, rápidas y orientadas a resultados. Diseñadas para transmitir autoridad y convertir visitas en clientes.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-center lg:justify-start gap-4 w-full max-w-md mx-auto lg:mx-0 lg:w-auto">
                <Button
                  size="lg"
                  asChild
                  className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-9 h-[3.75rem] text-[1.05rem] sm:px-8 sm:h-14 sm:text-base w-full sm:w-auto justify-center"
                >
                  <Link href="/contacto">Solicitar presupuesto</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full px-9 h-[3.75rem] text-[1.05rem] sm:px-8 sm:h-14 sm:text-base border-foreground/20 hover:bg-foreground/5 bg-transparent w-full sm:w-auto justify-center"
                >
                  <a href="#proceso" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("proceso")?.scrollIntoView({ behavior: "smooth" });
                  }}>
                    Nuestro proceso
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY CHOOSE US / VALUE PROPS                                 */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-neutral-950 border-t border-b border-neutral-900/60 overflow-hidden">
        {/* Premium ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(38, 38, 38, 0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(23, 23, 23, 0.1) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
                ¿Por qué una web<br /><span className="text-zinc-400 italic">a medida con nosotros?</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.1}>
                  <div className="group bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 p-8 hover-lift h-full flex flex-col justify-between rounded-sm transition-all duration-300">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800/60 mb-6 group-hover:border-zinc-700/80 transition-colors">
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-display text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TYPES OF WEBS                                               */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                Modelos web que<br /><span className="text-muted-foreground italic">impulsan tu negocio.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {typesOfWebs.map((web, index) => (
              <FadeIn key={web.title} delay={index * 0.05}>
                <div className="bg-background border border-foreground/10 p-8 rounded-sm hover-lift h-full">
                  <h3 className="text-2xl font-display mb-3">{web.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{web.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  OUR PROCESS                                                 */}
      {/* ============================================================ */}
      <section id="proceso" className="relative py-28 lg:py-40 bg-neutral-950 border-t border-b border-neutral-900/60 overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)" }} />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          {/* Section header */}
          <FadeIn>
            <div className="mb-16 lg:mb-20">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
                Metodología en<br /><span className="text-zinc-400 italic">cuatro etapas claras.</span>
              </h2>
            </div>
          </FadeIn>

          {/* Methodology cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={0.15 + index * 0.1}>
                  <div className="group relative h-full">
                    {/* Card glow on hover */}
                    <div
                      className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${step.glowColor.replace("0.08", "0.2")}, transparent 60%)` }}
                    />

                    {/* Card body */}
                    <div className="relative bg-zinc-900/80 border border-zinc-800/80 rounded-lg p-6 lg:p-8 h-full flex flex-col group-hover:border-zinc-700/80 transition-all duration-500">
                      {/* Icon Container in the top-left */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950/80 border border-zinc-800/60 group-hover:border-zinc-700 transition-colors duration-300 mb-6 self-start">
                        <Icon className={`w-5 h-5 ${step.iconColor} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-display text-white mb-3 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
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
                Preguntas frecuentes
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Cuánto tiempo se tarda en diseñar y desarrollar una web?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  El plazo de entrega habitual varía entre 3 y 6 semanas. Proyectos más complejos o integraciones avanzadas pueden requerir más tiempo, el cual se detallará y acordará en la fase inicial de planificación.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿La web será totalmente autogestionable?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Sí. Integramos sistemas gestores de contenido visuales para que puedas modificar de forma sencilla textos, imágenes, testimonios o añadir artículos al blog sin necesidad de conocimientos de programación.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Se adaptará correctamente a dispositivos móviles?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Absolutamente. Todas nuestras webs se diseñan con filosofía Mobile-First. Probamos el comportamiento y el rendimiento en múltiples tamaños de pantalla para garantizar una experiencia óptima para todos tus usuarios.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Incluye soporte y mantenimiento posterior?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Sí. Tras el lanzamiento incluimos 30 días de soporte de garantía gratuito. Posteriormente, ofrecemos planes opcionales de mantenimiento que cubren actualizaciones, copias de seguridad de seguridad diarias, optimización periódica de velocidad y soporte telefónico/email.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Qué tecnologías utilizáis para el desarrollo?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Evitamos plantillas lentas o pesadas. Utilizamos Next.js (App Router), React, TypeScript y Tailwind CSS. Esto garantiza la máxima velocidad de carga posible, alta seguridad contra ataques, y una adaptabilidad total a lo que exija el crecimiento de tu negocio.
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
              ¿Listo para impulsar tu presencia digital?
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
              Consigue una propuesta a medida sin compromiso. Cuéntanos qué necesitas y trazaremos el mejor camino tecnológico para conseguirlo.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-full group inline-flex items-center"
            >
              <Link href="/contacto">
                Solicitar presupuesto gratis
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
