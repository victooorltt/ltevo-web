import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, SlidersHorizontal, Search, Feather, Compass, Palette, Code2, Rocket, ChevronDown } from "lucide-react";
import Link from "next/link";

/* Nota: componente de servidor; el reveal es CSS scroll-driven. */

/* Fuente única de las FAQs: se renderizan aquí (details/summary) y alimentan
   el JSON-LD FAQPage de app/servicios/diseno-web/page.tsx para que el schema
   nunca se desincronice de lo visible. El campo opcional `more` añade un
   enlace contextual al blog SOLO en el render; el schema usa question/answer. */
type Faq = {
  question: string;
  answer: string;
  more?: { text: string; href: string };
};

export const faqs: Faq[] = [
  {
    question: "¿Cuánto tiempo se tarda en diseñar y desarrollar una web?",
    answer: "El plazo de entrega habitual varía entre 3 y 6 semanas. Proyectos más complejos o integraciones avanzadas pueden requerir más tiempo, el cual se detallará y acordará en la fase inicial de planificación.",
  },
  {
    question: "¿La web será totalmente autogestionable?",
    answer: "Sí. Integramos sistemas gestores de contenido visuales para que puedas modificar de forma sencilla textos, imágenes, testimonios o añadir artículos al blog sin necesidad de conocimientos de programación.",
    more: { text: "Aprende cómo crear un blog corporativo paso a paso", href: "/blog/como-crear-un-blog-corporativo" },
  },
  {
    question: "¿Se adaptará correctamente a dispositivos móviles?",
    answer: "Absolutamente. Todas nuestras webs se diseñan con filosofía Mobile-First. Probamos el comportamiento y el rendimiento en múltiples tamaños de pantalla para garantizar una experiencia óptima para todos tus usuarios.",
  },
  {
    question: "¿Incluye soporte y mantenimiento posterior?",
    answer: "Sí. Tras el lanzamiento incluimos 30 días de soporte de garantía gratuito. Posteriormente, ofrecemos planes opcionales de mantenimiento que cubren actualizaciones, copias de seguridad diarias, optimización periódica de velocidad y soporte telefónico/email.",
  },
  {
    question: "¿Qué tecnologías utilizáis para el desarrollo?",
    answer: "Evitamos plantillas lentas o pesadas. Utilizamos Next.js (App Router), React, TypeScript y Tailwind CSS. Esto garantiza la máxima velocidad de carga posible, alta seguridad contra ataques, y una adaptabilidad total a lo que exija el crecimiento de tu negocio.",
  },
  {
    question: "¿Por qué es mejor Next.js que WordPress para el SEO?",
    answer: "Next.js sobresale porque genera páginas HTML estáticas ultra ligeras directamente durante la compilación. A diferencia de WordPress, que requiere ejecutar código PHP en el servidor y realizar consultas complejas a la base de datos para cada visitante, Next.js entrega contenido inmediato a Googlebot. Además, incluye optimizaciones avanzadas de imágenes de forma nativa y una gestión del enrutado que garantiza una velocidad de carga inigualable, uno de los factores de posicionamiento móvil clave hoy en día.",
  },
  {
    question: "¿Es posible integrar sistemas externos en el desarrollo a medida?",
    answer: "Sí. Al no estar limitados por la arquitectura rígida de una plantilla o un CMS tradicional, podemos integrar cualquier servicio mediante APIs: desde sistemas de reserva, ERPs, CRMs (como Salesforce o HubSpot), pasarelas de pago avanzadas (Stripe, PayPal, Bizum) hasta herramientas personalizadas de automatización e inteligencia artificial. Esto permite que tu web escale sin límites técnicos conforme crezca tu empresa.",
  },
];

export function DisenoWebContent() {
  type Step = {
    number: string;
    title: string;
    description: string;
    icon: typeof Compass;
    iconColor: string;
    glowColor: string;
    link?: { text: string; href: string };
  };

  const steps: Step[] = [
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
      link: { text: "Descubre qué es UX y UI y por qué tu web los necesita", href: "/blog/que-es-ux-y-ui" },
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

  const typesOfWebs: { title: string; description: string; link?: { text: string; href: string } }[] = [
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
      description: "Soluciones completas de comercio electrónico con catálogos fluidos, gestión ágil de stock y pasarelas de pago seguras.",
      link: { text: "¿PrestaShop o WooCommerce? Te ayudamos a elegir plataforma", href: "/blog/prestashop-vs-woocommerce" },
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

  /* Regleta de mediciones del stack: valores estáticos (spec), sin interacción. */
  const perfMetrics = [
    { value: "0.2", unit: "s", label: "Carga media" },
    { value: "85", prefix: "~", unit: "KB", label: "Peso inicial" },
    { value: "0", unit: "%", label: "Código sin usar" },
    { value: "100", unit: "%", label: "HTML pre-renderizado" }
  ];

  const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

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
        <div className="reveal absolute inset-0 z-0 pointer-events-none" style={{ animationDelay: "0.2s" }}>
          <div className="relative w-full h-full">
            {/* Gradient overlay element positioned over the image */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/65 lg:to-transparent z-[1]" />

            {/* Art direction: variante mobile <1024px, desktop >=1024px. <picture>
                garantiza una sola descarga; los webp ya van optimizados en estático. */}
            <picture>
              <source media="(min-width: 1024px)" srcSet="/Hero-servicios-diseno-web.webp" width={1600} height={893} />
              <img
                src="/Hero-servicios-diseno-web-mobile.webp"
                width={800}
                height={1433}
                alt="Diseño Web Profesional a Medida"
                className="w-full h-full object-cover lg:object-contain object-center lg:object-right z-0 opacity-80 lg:opacity-100 transition-opacity duration-500"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          {/* Left/center section constrained to lg:max-w-[55%] to prevent overlap */}
          <div className="w-full lg:max-w-[55%] flex flex-col justify-center items-center lg:items-start">

            <div className="reveal w-full" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-[3.5rem] sm:text-5xl lg:text-6xl xl:text-6xl font-display italic tracking-tight leading-[0.95] mb-8 text-foreground text-center lg:text-left">
                Diseño Web Profesional <br /> a Medida
              </h1>
            </div>

            <div className="reveal w-full" style={{ animationDelay: "0.2s" }}>
              <p className="text-[1.15rem] md:text-[1.2rem] lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 text-center lg:text-left mx-auto lg:mx-0">
                Desarrollamos páginas web premium, rápidas y orientadas a resultados. Diseñadas para transmitir autoridad y convertir visitas en clientes.
              </p>
            </div>

            <div className="reveal w-full" style={{ animationDelay: "0.3s" }}>
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
                  <a href="#proceso">Nuestro proceso</a>
                </Button>
              </div>
            </div>
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
          <div className="reveal mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
              ¿Por qué una web <br /> <span className="text-zinc-400 italic">a medida con nosotros?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STACK TECNOLÓGICO: ficha técnica editorial                  */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Cabecera editorial: eyebrow + titular / párrafo técnico */}
          <div className="reveal mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Stack tecnológico
              </span>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight mt-5">
                Ingeniería que se nota <br />
                <span className="text-muted-foreground italic">en cada carga.</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base max-w-md lg:pb-2">
              Cada web se programa desde cero, sin temas heredados ni capas de
              plugins: únicamente el código que tu proyecto necesita,
              pre-renderizado en HTML estático y servido desde una red global de CDN.
            </p>
          </div>

          {/* Regleta de mediciones: hairlines vía gap-px (patrón metrics-section) */}
          <div
            className="reveal grid grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10"
            style={{ animationDelay: "0.1s" }}
          >
            {perfMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="bg-background px-6 py-10 lg:px-10 lg:py-14"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 lg:mb-6">
                  {metric.label}
                </div>
                <div className="font-mono text-4xl lg:text-[3.25rem] leading-none tracking-tighter">
                  {metric.prefix}
                  {metric.value}
                  {metric.unit && (
                    <span className="text-muted-foreground text-[0.55em] ml-1">{metric.unit}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Anotación de medición */}
          <p className="reveal mt-4 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Medias Lighthouse · proyectos en producción
          </p>

          {/* Fila inferior: chips del stack + enlace contextual al blog */}
          <div
            className="reveal mt-10 lg:mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs border border-foreground/15 rounded-full px-4 py-2 text-foreground/70"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ¿Vienes de una plantilla?{" "}
              <Link
                href="/blog/diseno-web-vs-desarrollo-web"
                className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
              >
                Esto es lo que cambia.
              </Link>
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/*  TYPES OF WEBS                                               */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
              Modelos web que <br /> <span className="text-muted-foreground italic">impulsan tu negocio.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {typesOfWebs.map((web, index) => (
              <div key={web.title} className="reveal" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="bg-background border border-foreground/10 p-8 rounded-sm hover-lift h-full">
                  <h3 className="text-2xl font-display mb-3">{web.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {web.description}
                    {web.link && (
                      <>
                        {" "}
                        <Link
                          href={web.link.href}
                          className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                        >
                          {web.link.text}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
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
          <div className="reveal mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
              Metodología en <br /> <span className="text-zinc-400 italic">cuatro etapas claras.</span>
            </h2>
          </div>

          {/* Methodology cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="reveal" style={{ animationDelay: `${0.15 + index * 0.1}s` }}>
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
                        {step.link && (
                          <>
                            {" "}
                            <Link
                              href={step.link.href}
                              className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-colors"
                            >
                              {step.link.text}
                            </Link>
                            .
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
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
            <div className="reveal">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white leading-tight">
                Desarrollo web local en <br /> <span className="text-zinc-400 italic">Oviedo y toda Asturias</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base mt-6">
                Como agencia afincada en Oviedo, entendemos las particularidades del mercado en el Principado de Asturias. Diseñar una web para el público asturiano requiere combinar una estética moderna y funcional con una optimización específica para los buscadores de la región.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                Ya sea que tu negocio se encuentre en Oviedo, Gijón, Avilés o en las zonas de las cuencas y el oriente, creamos una plataforma a tu medida que conecta directamente con tus clientes locales. Nos encargamos de estructurar tus servicios geográficamente, potenciando tu visibilidad local y asegurando que tu negocio lidere los resultados de búsqueda de Google Maps y las búsquedas locales de alta intención.
              </p>
            </div>

            <div className="reveal" style={{ animationDelay: "0.2s" }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION  (details/summary nativo, sin JS)               */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-gray-200">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="reveal w-full space-y-4" style={{ animationDelay: "0.1s" }}>
            {faqs.map((faq) => (
              <details key={faq.question} className="group border border-foreground/10 px-6 rounded-sm bg-background">
                <summary className="flex items-start justify-between gap-4 py-6 text-left text-lg font-display cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="text-muted-foreground leading-relaxed pb-6 text-sm">
                  {faq.answer}
                  {faq.more && (
                    <>
                      {" "}
                      <Link
                        href={faq.more.href}
                        className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                      >
                        {faq.more.text}
                      </Link>
                      .
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA SECTION                                                 */}
      {/* ============================================================ */}
      <section className="bg-foreground text-background py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="reveal">
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
          </div>
        </div>
      </section>
    </>
  );
}
