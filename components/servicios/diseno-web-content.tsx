"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight, Zap, SlidersHorizontal, Search, Feather, Compass, Palette, Code2, Rocket, Lock, AlertTriangle } from "lucide-react";
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

export function DisenoWebContent() {
  const [isCustomActive, setIsCustomActive] = useState(true);

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
              <source media="(min-width: 1024px)" srcSet="/Hero-servicios-diseno-web.webp" width={2752} height={1536} />
              <img
                src="/Hero-servicios-diseno-web-mobile.webp"
                width={1200}
                height={2150}
                alt="Diseño Web Profesional a Medida"
                className="w-full h-full object-cover lg:object-contain object-center lg:object-right z-0 opacity-80 lg:opacity-100 transition-opacity duration-500"
                fetchPriority="high"
              />
            </picture>
          </div>
        </FadeIn>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          {/* Left/center section constrained to lg:max-w-[55%] to prevent overlap */}
          <div className="w-full lg:max-w-[55%] flex flex-col justify-center items-center lg:items-start">
            
            <FadeIn delay={0.1} className="w-full">
              <h1 className="text-[3.5rem] sm:text-5xl lg:text-6xl xl:text-6xl font-display italic tracking-tight leading-[0.95] mb-8 text-foreground text-center lg:text-left">
                Diseño Web Profesional <br /> a Medida
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
                ¿Por qué una web <br /> <span className="text-zinc-400 italic">a medida con nosotros?</span>
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
      {/*  COMPARATIVA: NEXT.JS VS PLANTILLAS (WORDPRESS/WIX)          */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10 bg-background relative overflow-hidden">
        {/* Subtle grid pattern inside */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute h-full w-px bg-foreground left-1/4" />
          <div className="absolute h-full w-px bg-foreground left-2/4" />
          <div className="absolute h-full w-px bg-foreground left-3/4" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 z-10 relative">
          <FadeIn>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                Desarrollo a Medida frente a <br /> 
                <span className="text-muted-foreground italic">Plantillas Genéricas (WordPress o Wix)</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mt-6 leading-relaxed text-base mx-auto">
                Para destacar en el entorno digital altamente competitivo de hoy, depender de sistemas monolíticos y plantillas preconstruidas suele ser un obstáculo silencioso. Analiza la diferencia interactiva de rendimiento entre ambos mundos.
              </p>
            </div>
          </FadeIn>

          {/* Elegant Interactive Switcher */}
          <FadeIn delay={0.1}>
            <div className="flex justify-center mb-16">
              <div className="relative flex p-1.5 bg-neutral-100 dark:bg-neutral-900/50 border border-foreground/10 rounded-full w-full max-w-md">
                <div
                  className="absolute top-1.5 bottom-1.5 rounded-full bg-foreground transition-all duration-300 ease-out shadow-sm"
                  style={{
                    left: isCustomActive ? "6px" : "50%",
                    width: "calc(50% - 9px)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setIsCustomActive(true)}
                  className={`relative z-10 w-1/2 py-3 text-sm font-medium rounded-full transition-colors duration-305 ${
                    isCustomActive ? "text-background font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Desarrollo a Medida (LTEvo)
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomActive(false)}
                  className={`relative z-10 w-1/2 py-3 text-sm font-medium rounded-full transition-colors duration-305 ${
                    !isCustomActive ? "text-background font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Plantilla Genérica
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* CARD 1: RENDIMIENTO & OPTIMIZACIÓN (7 Columns) */}
            <FadeIn delay={0.15} className="lg:col-span-7">
              <div className="group relative border border-foreground/10 p-8 lg:p-10 h-full flex flex-col justify-between hover:border-foreground/30 bg-neutral-900/5 dark:bg-neutral-950/20 transition-all duration-305 overflow-hidden rounded-sm">
                
                {/* Visual Glow */}
                <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
                  isCustomActive ? "bg-emerald-400" : "bg-amber-400"
                }`} />

                <div className="relative z-10">
                  <span className="text-[10px] tracking-wider font-mono text-muted-foreground uppercase">Rendimiento</span>
                  <h3 className="text-2xl lg:text-3xl font-display mt-2 mb-4">
                    Rendimiento y Carga Instantánea
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xl transition-all duration-500">
                    {isCustomActive 
                      ? "Con Next.js pre-renderizamos cada página en HTML estático servido desde servidores CDN globales. La web carga en milisegundos y optimiza los Core Web Vitals al máximo, reduciendo el rebote de usuarios."
                      : "Las plantillas tradicionales arrastran bases de datos lentas y decenas de plugins pesados de terceros. Esto causa retrasos en la carga, pérdida de clientes potenciales y penalizaciones de Google."
                    }
                  </p>
                </div>

                {/* Speed Visualizer Element */}
                <div className="relative z-10 mt-8 p-6 bg-neutral-100/50 dark:bg-black/40 border border-foreground/10 flex flex-col md:flex-row items-center gap-6 rounded-sm backdrop-blur-sm transition-all duration-500">
                  
                  {/* Circular Radial Speedometer SVG */}
                  <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className="stroke-neutral-200 dark:stroke-neutral-800"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className={`transition-all duration-1000 ease-out-quad ${
                          isCustomActive ? "stroke-emerald-400" : "stroke-amber-500"
                        }`}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 - ((isCustomActive ? 99 : 42) / 100) * (2 * Math.PI * 48)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-bold font-mono tracking-tighter transition-all duration-500">
                        {isCustomActive ? "99" : "42"}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Score</span>
                    </div>
                  </div>

                  {/* Speed stats and bar */}
                  <div className="w-full space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground font-mono text-[10px] uppercase">Velocidad de Carga</span>
                      <span className={`font-mono font-bold text-sm transition-colors duration-500 ${isCustomActive ? "text-emerald-400" : "text-amber-500"}`}>
                        {isCustomActive ? "0.2 segundos" : "3.8 segundos"}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                          isCustomActive ? "from-emerald-400 to-cyan-400" : "from-amber-500 to-rose-500"
                        }`}
                        style={{ width: isCustomActive ? "99%" : "42%" }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>Límite ideal Google: 0.5s</span>
                      <span className={`font-semibold transition-colors duration-500 ${isCustomActive ? "text-emerald-400" : "text-amber-500"}`}>
                        {isCustomActive ? "Excepcional" : "Rebote Alto (+50%)"}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </FadeIn>

            {/* CARD 2: SEGURIDAD (5 Columns) */}
            <FadeIn delay={0.25} className="lg:col-span-5">
              <div className="group relative border border-foreground/10 p-8 lg:p-10 h-full flex flex-col justify-between hover:border-foreground/30 bg-neutral-900/5 dark:bg-neutral-950/20 transition-all duration-305 overflow-hidden rounded-sm">
                
                {/* Visual Glow */}
                <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
                  isCustomActive ? "bg-cyan-500" : "bg-rose-500"
                }`} />

                <div className="relative z-10">
                  <span className="text-[10px] tracking-wider font-mono text-muted-foreground uppercase">Seguridad</span>
                  <h3 className="text-2xl lg:text-3xl font-display mt-2 mb-4">
                    Seguridad Blindada
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm transition-all duration-500">
                    {isCustomActive 
                      ? "Con Next.js eliminamos los servidores web activos convencionales y bases de datos expuestas. No hay área de administración pública (wp-admin) vulnerable, neutralizando ataques inyectados."
                      : "Los CMS tradicionales son el blanco del 90% de los hackeos web. Dependen de plugins de terceros que frecuentemente quedan obsoletos o presentan fallos de seguridad críticos."
                    }
                  </p>
                </div>

                {/* Security High-Fidelity Element */}
                <div className="relative z-10 mt-8 flex flex-col justify-center items-center p-6 bg-neutral-100/50 dark:bg-black/40 border border-foreground/10 rounded-sm backdrop-blur-sm transition-all duration-500 min-h-[148px]">
                  
                  {/* Scanning Radar effect with Icon */}
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full border transition-all duration-500 bg-background shadow-lg mb-4">
                    
                    {/* Radar sweep lines (only for custom dev) */}
                    {isCustomActive && (
                      <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[ping_2s_infinite]" />
                    )}

                    <div className={`flex items-center justify-center w-full h-full rounded-full transition-all duration-500 ${
                      isCustomActive 
                        ? "border-emerald-500/20 text-emerald-400 shadow-emerald-500/5" 
                        : "border-amber-500/20 text-amber-500 shadow-amber-500/5"
                    }`}>
                      {isCustomActive ? (
                        <Lock className="w-7 h-7" />
                      ) : (
                        <AlertTriangle className="w-7 h-7 animate-pulse text-amber-500" />
                      )}
                    </div>
                  </div>

                  <span className={`text-xs font-mono tracking-wider font-semibold uppercase px-3 py-1 rounded-full border transition-all duration-500 ${
                    isCustomActive 
                      ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" 
                      : "border-amber-500/20 text-amber-500 bg-amber-500/5"
                  }`}>
                    {isCustomActive ? "Servidor Estático Seguro" : "Vulnerabilidades Expuestas"}
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* CARD 3: SEO TÉCNICO (5 Columns) */}
            <FadeIn delay={0.3} className="lg:col-span-5">
              <div className="group relative border border-foreground/10 p-8 lg:p-10 h-full flex flex-col justify-between hover:border-foreground/30 bg-neutral-900/5 dark:bg-neutral-950/20 transition-all duration-305 overflow-hidden rounded-sm">
                
                {/* Visual Glow */}
                <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
                  isCustomActive ? "bg-indigo-500" : "bg-amber-500"
                }`} />

                <div className="relative z-10">
                  <span className="text-[10px] tracking-wider font-mono text-muted-foreground uppercase">Posicionamiento</span>
                  <h3 className="text-2xl lg:text-3xl font-display mt-2 mb-4">
                    SEO y Estructura Limpia
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm transition-all duration-500">
                    {isCustomActive
                      ? "Next.js estructura tus metadatos dinámicamente y pre-renderiza el HTML de forma óptima en el servidor (SSR), entregando código limpio e indexable sin demoras. Los datos estructurados (Schema.org) se integran de forma nativa."
                      : "Las plantillas dependen de plugins pesados para el SEO que inyectan scripts lentos. El código HTML suele ser redundante y anidado en exceso (divitis), dificultando el rastreo de Google."
                    }
                  </p>
                </div>

                {/* Structured Data Visual Element */}
                <div className="relative z-10 mt-8 p-5 bg-neutral-100/70 dark:bg-black/40 border border-foreground/10 rounded-sm backdrop-blur-sm text-left space-y-3 transition-colors duration-500">
                  {/* Search Header */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 font-sans">
                      G
                    </div>
                    <div className="text-[10px] font-mono truncate text-neutral-400">
                      {isCustomActive ? "https://ltevo.com › servicios › diseno-web" : "https://un-sitio-con-plantilla.es"}
                    </div>
                  </div>

                  {/* Search Title */}
                  <h4 className={`text-base font-semibold leading-tight hover:underline cursor-pointer transition-colors duration-500 ${
                    isCustomActive ? "text-blue-600 dark:text-blue-400" : "text-neutral-600 dark:text-neutral-400"
                  }`}>
                    {isCustomActive ? "Diseño Web Profesional a Medida | LTEvo" : "Sitio web genérico | Mi Negocio"}
                  </h4>

                  {/* Search Snippet */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors duration-500">
                    {isCustomActive 
                      ? "Creamos páginas web premium, rápidas y a medida en Oviedo y Asturias. Totalmente autogestionables y preparadas para posicionar en los primeros puestos..."
                      : "Inicio - Contacto - Servicios. Web creada con plantilla genérica. Puede tardar un poco en cargar. Por favor, espere..."
                    }
                  </p>

                  {/* Rich Snippets (Only for Custom) */}
                  <div className={`pt-2 border-t border-foreground/5 space-y-2 transition-all duration-500 overflow-hidden ${
                    isCustomActive ? "max-h-[80px] opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-medium">
                      <span className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-500 font-semibold">5.0 (18 opiniones) · Datos Estructurados Activos</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* CARD 4: CÓDIGO LIMPIO VS BLOAT (7 Columns) */}
            <FadeIn delay={0.35} className="lg:col-span-7">
              <div className="group relative border border-foreground/10 p-8 lg:p-10 h-full flex flex-col justify-between hover:border-foreground/30 bg-neutral-900/5 dark:bg-neutral-950/20 transition-all duration-305 overflow-hidden rounded-sm">
                
                {/* Visual Glow */}
                <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
                  isCustomActive ? "bg-teal-400" : "bg-rose-400"
                }`} />

                <div className="relative z-10">
                  <span className="text-[10px] tracking-wider font-mono text-muted-foreground uppercase">Optimización</span>
                  <h3 className="text-2xl lg:text-3xl font-display mt-2 mb-4">
                    Sin Código Basura (Bloatware)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xl transition-all duration-500">
                    {isCustomActive 
                      ? "Cada línea de código está escrita y optimizada para servir exclusivamente a tu sitio web. No cargamos librerías innecesarias, asegurando un peso mínimo, estabilidad a largo plazo y velocidad extrema."
                      : "Las plantillas prefabricadas cargan megabytes de CSS y JavaScript no utilizados provenientes de constructores visuales, temas sobrecargados y plugins mal integrados, ralentizando el navegador del usuario."
                    }
                  </p>
                </div>

                {/* Code weight comparison bar */}
                <div className="relative z-10 mt-8 p-5 bg-neutral-100/50 dark:bg-black/40 border border-foreground/10 rounded-sm backdrop-blur-sm transition-all duration-500 space-y-4">
                  
                  <div className="flex justify-between items-end">
                    <div className="text-left font-mono">
                      <span className="text-[9px] tracking-wider uppercase text-muted-foreground">Peso de la web (Datos)</span>
                      <h4 className="text-3xl font-display font-bold leading-none mt-1 transition-all duration-500">
                        {isCustomActive ? "85 KB" : "2.4 MB"}
                      </h4>
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors duration-500 ${
                      isCustomActive ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-amber-500/20 text-amber-500 bg-amber-500/5"
                    }`}>
                      {isCustomActive ? "Ultra ligera" : "Muy pesada"}
                    </span>
                  </div>

                  {/* Stack stats details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background/40 border border-foreground/5 p-2 rounded text-center">
                      <div className="text-[10px] text-muted-foreground">Plugins y añadidos</div>
                      <div className="text-xs font-mono font-semibold mt-1">
                        {isCustomActive ? "0 innecesarios" : "Decenas (Lentitud)"}
                      </div>
                    </div>
                    <div className="bg-background/40 border border-foreground/5 p-2 rounded text-center">
                      <div className="text-[10px] text-muted-foreground">Código desperdiciado</div>
                      <div className="text-xs font-mono font-semibold mt-1">
                        {isCustomActive ? "0% (100% útil)" : "78% sin usar"}
                      </div>
                    </div>
                    <div className="bg-background/40 border border-foreground/5 p-2 rounded text-center">
                      <div className="text-[10px] text-muted-foreground">Estabilidad y Orden</div>
                      <div className="text-xs font-mono font-semibold mt-1">
                        {isCustomActive ? "Estable y Limpia" : "Frágil / Desordenada"}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </FadeIn>

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
                Modelos web que <br /> <span className="text-muted-foreground italic">impulsan tu negocio.</span>
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
                Metodología en <br /> <span className="text-zinc-400 italic">cuatro etapas claras.</span>
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
      {/*  SECCIÓN LOCAL: ASTURIAS                                     */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white leading-tight">
                Desarrollo web local en <br /> <span className="text-zinc-400 italic">Oviedo y toda Asturias</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base mt-6">
                Como agencia afincada en Oviedo, entendemos las particularidades del mercado en el Principado de Asturias. Diseñar una web para el público asturiano requiere combinar una estética moderna y funcional con una optimización específica para los buscadores de la región.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                Ya sea que tu negocio se encuentre en Oviedo, Gijón, Avilés o en las zonas de las cuencas y el oriente, creamos una plataforma a tu medida que conecta directamente con tus clientes locales. Nos encargamos de estructurar tus servicios geográficamente, potenciando tu visibilidad local y asegurando que tu negocio lidere los resultados de búsqueda de Google Maps y las búsquedas locales de alta intención.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
                <h3 className="text-2xl font-display text-white mb-4">Cercanía y Garantía</h3>
                <ul className="space-y-4 text-zinc-400 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Reuniones online:</strong> Nos gusta reunirnos y entender a fondo tu proyecto en videollamadas dónde podamos definir objetivos y planes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Soporte inmediato:</strong> Olvídate de los tickets de soporte impersonales. Respondemos directamente con soluciones rápidas y eficaces.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Especialistas en SEO de Asturias:</strong> Conocemos el volumen de búsqueda y las palabras clave más rentables para captar clientes en el territorio regional.</span>
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

              <AccordionItem value="item-6" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Por qué es mejor Next.js que WordPress para el SEO?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Next.js sobresale porque genera páginas HTML estáticas ultra ligeras directamente durante la compilación. A diferencia de WordPress, que requiere ejecutar código PHP en el servidor y realizar consultas complejas a la base de datos para cada visitante, Next.js entrega contenido inmediato a Googlebot. Además, incluye optimizaciones avanzadas de imágenes de forma nativa y una gestión del enrutado que garantiza una velocidad de carga inigualable, uno de los factores de posicionamiento móvil clave hoy en día.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border border-foreground/10 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                  ¿Es posible integrar sistemas externos en el desarrollo a medida?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  Sí. Al no estar limitados por la arquitectura rígida de una plantilla o un CMS tradicional, podemos integrar cualquier servicio mediante APIs: desde sistemas de reserva, ERPs, CRMs (como Salesforce o HubSpot), pasarelas de pago avanzadas (Stripe, PayPal, Bizum) hasta herramientas personalizadas de automatización e inteligencia artificial. Esto permite que tu web escale sin límites técnicos conforme crezca tu empresa.
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
