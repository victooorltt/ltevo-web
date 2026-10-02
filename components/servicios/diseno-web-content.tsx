import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, SlidersHorizontal, Search, Feather, Compass, Palette, Code2, Rocket, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FaqSection } from "@/components/landing/faq-section";

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
    question: "¿Cuánto cuesta una página web para mi empresa?",
    answer: "Presupuestamos cada proyecto según el número de páginas, el contenido disponible, el diseño y las funciones necesarias. Tras una primera conversación sin coste, recibirás una propuesta con alcance, entregables y plazo. El hosting, el mantenimiento y el trabajo SEO continuo se detallan por separado cuando los necesitas.",
  },
  {
    question: "¿Cuánto tarda el diseño de una web y qué tengo que aportar?",
    answer: "El plazo habitual es de 3 a 6 semanas, una vez acordado el alcance y disponible el material necesario. Te pediremos información sobre tus servicios, marca, fotografías y objetivos. Si necesitas ayuda con contenidos o integraciones, lo incluimos en la planificación y el presupuesto.",
  },
  {
    question: "¿Podré modificar el contenido de mi web?",
    answer: "Si necesitas gestionar textos, imágenes o un blog, acordamos un sistema de edición y qué partes podrás modificar. Esa necesidad se define antes del desarrollo; no todas las webs requieren el mismo panel de gestión.",
    more: { text: "Cómo preparar un blog corporativo", href: "/blog/como-crear-un-blog-corporativo" },
  },
  {
    question: "¿Incluye diseño para móvil y configuración SEO?",
    answer: "El diseño contempla móvil, tablet y ordenador. Configuramos títulos, descripciones, estructura de encabezados y los elementos técnicos acordados para que los buscadores puedan interpretar la web. Conseguir posiciones competitivas requiere analizar la demanda, la competencia y el trabajo SEO posterior.",
    more: { text: "Consulta nuestro servicio de SEO en Asturias", href: "/servicios/seo" },
  },
  {
    question: "¿Qué soporte tengo después del lanzamiento?",
    answer: "Incluimos 30 días de soporte de garantía tras el lanzamiento. Para actualizaciones, copias de seguridad y asistencia continuada puedes contratar un plan de mantenimiento desde 29,99 € al mes más IVA. El alcance de la garantía y del plan se recoge en la propuesta.",
    more: { text: "Comparar planes de mantenimiento web", href: "/servicios/mantenimiento-web" },
  },
  {
    question: "¿Usáis WordPress o desarrolláis la web a medida?",
    answer: "Trabajamos con Next.js, React, TypeScript y Tailwind CSS para desarrollar webs a medida. Elegimos la solución según tus funciones, edición de contenidos y presupuesto. La tecnología por sí sola no garantiza velocidad, seguridad ni posiciones en Google: también cuentan el diseño, la implementación y el mantenimiento.",
  },
  {
    question: "¿Puedo contratar una tienda online o integrar reservas y pagos?",
    answer: "Sí. Una tienda online, un sistema de reservas o una integración con herramientas de tu empresa requiere definir procesos, proveedores y permisos. Lo valoramos como un proyecto con alcance propio, en lugar de incluirlo automáticamente en una web corporativa.",
    more: { text: "Ver desarrollo web a medida", href: "/servicios/desarrollo-web" },
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
      title: "Desarrollo y adaptación móvil",
      description: "Desarrollamos las páginas y funciones acordadas, adaptamos el diseño a móvil y ordenador y revisamos navegación, formularios y tiempos de carga.",
      icon: Code2,
      iconColor: "text-emerald-400",
      glowColor: "rgba(52, 211, 153, 0.08)",
    },
    {
      number: "04",
      title: "Optimización SEO y Lanzamiento",
      description: "Configuramos títulos, descripciones y datos estructurados pertinentes. Revisamos formularios y acceso a las páginas antes de publicar y acordamos cómo mantener la web.",
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
      description: "Páginas centradas en un servicio o campaña, con un mensaje claro y una llamada a solicitar información o presupuesto."
    },
    {
      title: "Tiendas Online (eCommerce)",
      description: "Soluciones completas de comercio electrónico con catálogos fluidos, gestión ágil de stock y pasarelas de pago seguras.",
      link: { text: "Consulta el servicio de tiendas online", href: "/servicios/tiendas-online" },
    },
    {
      title: "Portafolios Creativos",
      description: "Presentaciones visualmente impecables para agencias, arquitectos, fotógrafos y profesionales que venden con el impacto visual."
    },
    {
      title: "Aplicaciones Web a Medida",
      description: "Desarrollos con paneles de administración, integraciones y funciones específicas, definidos y presupuestados como un proyecto propio.",
      link: { text: "Ver desarrollo web a medida", href: "/servicios/desarrollo-web" }
    },
    {
      title: "Plataformas Inmobiliarias / Directorios",
      description: "Sistemas complejos con buscadores avanzados, filtrado dinámico en tiempo real y bases de datos robustas."
    }
  ];

  const valueProps = [
    {
      title: "Rendimiento cuidado",
      description: "Revisamos imágenes, recursos y tiempos de carga para facilitar el uso de tu web desde móvil y ordenador.",
      icon: Zap,
      iconColor: "text-amber-400/90"
    },
    {
      title: "Edición de contenido",
      description: "Acordamos qué contenido necesitas editar y el sistema de gestión que encaja con el día a día de tu empresa.",
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
      title: "Diseño para tu marca",
      description: "Organizamos servicios, imágenes y llamadas a la acción con una identidad visual coherente con tu negocio.",
      icon: Feather,
      iconColor: "text-indigo-400/90"
    }
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
                Diseño web en Oviedo <br /> y Asturias
              </h1>
            </div>

            <div className="reveal w-full" style={{ animationDelay: "0.2s" }}>
              <p className="text-[1.15rem] md:text-[1.2rem] lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 text-center lg:text-left mx-auto lg:mx-0">
                Diseñamos páginas web para empresas y profesionales que necesitan explicar sus servicios y recibir solicitudes de presupuesto. Desde Oviedo, trabajamos con negocios de Asturias y del resto de España.
              </p>
            </div>

            <div className="reveal w-full" style={{ animationDelay: "0.3s" }}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-center lg:justify-start gap-4 w-full max-w-md mx-auto lg:mx-0 lg:w-auto">
                <Button
                  size="lg"
                  asChild
                  className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-9 h-[3.75rem] text-[1.05rem] sm:px-8 sm:h-14 sm:text-base w-full sm:w-auto justify-center"
                >
                  <Link href="/contacto?servicio=diseno-web">Solicitar presupuesto</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full px-9 h-[3.75rem] text-[1.05rem] sm:px-8 sm:h-14 sm:text-base border-foreground/20 hover:bg-foreground/5 bg-transparent w-full sm:w-auto justify-center"
                >
                  <Link href="/proyectos">Ver proyectos</Link>
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
      {/*  INGENIERÍA WEB: Editorial 2 columnas con imagen             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10 bg-background font-display">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Columna editorial */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-foreground/70 bg-foreground/[0.04] border border-foreground/[0.08] tracking-wide mb-4">
                  Web corporativa
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight leading-[1.1] mb-6">
                  Una web que explica <br />
                  <span className="text-muted-foreground italic">por qué contratarte.</span>
                </h2>
              </div>

              <div className="text-muted-foreground leading-relaxed space-y-4 text-base lg:text-lg mb-8 font-light">
                <p>
                  Una web corporativa debe explicar qué haces, a quién ayudas y cómo puede contactar contigo quien necesita tus servicios. Empezamos por esa estructura y por el material que demuestra tu trabajo.
                </p>
                <p>
                  En LTEvo conectamos el diseño visual con páginas de servicio claras, navegación sencilla y formularios útiles. El presupuesto concreta páginas, funciones y revisiones para que sepas qué recibirás antes de empezar.
                </p>
              </div>

              {/* Puntos clave orientados a negocio */}
              <div className="space-y-4 pt-6 border-t border-foreground/[0.08] mb-8">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                  <p className="text-sm lg:text-base text-foreground/90 leading-snug">
                    <strong>Diseño adaptable:</strong> Navegación, lectura y contacto pensados para móvil y ordenador.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                  <p className="text-sm lg:text-base text-foreground/90 leading-snug">
                    <strong>Servicios y trabajo real:</strong> Una presentación de tu oferta con ejemplos, proyectos o testimonios verificables.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                  <p className="text-sm lg:text-base text-foreground/90 leading-snug">
                    <strong>Lanzamiento y soporte:</strong> Revisión de la web y 30 días de soporte de garantía, con mantenimiento posterior opcional.
                  </p>
                </div>
              </div>

              {/* Enlace contextual al blog */}
              <div>
                <Link
                  href="/servicios/desarrollo-web"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors inline-flex items-center gap-1.5 font-medium text-sm group"
                >
                  ¿Necesitas una aplicación o integraciones a medida?
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Columna visual con fotografía */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-foreground/[0.08] aspect-[4/3] lg:aspect-[4/5] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.06)] bg-foreground/[0.03]">
                <Image
                  src="/desarrollo-web-medida.webp"
                  alt="Estudio de diseño y desarrollo web a medida en LTEvo"
                  fill
                  sizes="(min-width: 1024px) 45vw, calc(100vw - 48px)"
                  className="object-cover"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 border-t border-foreground/10 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-display mb-4">Qué incluye la propuesta de diseño web</h2>
            <p className="text-muted-foreground leading-relaxed">Estructura de páginas, diseño visual, adaptación a dispositivos, desarrollo de las funciones acordadas y configuración SEO inicial. La propuesta define también quién aporta textos e imágenes, las revisiones y el calendario de lanzamiento.</p>
          </div>
          <div>
            <h3 className="text-2xl font-display mb-4">Servicios que puedes añadir</h3>
            <p className="text-muted-foreground leading-relaxed">El <Link className="underline underline-offset-4" href="/servicios/hosting">hosting gestionado</Link>, el <Link className="underline underline-offset-4" href="/servicios/mantenimiento-web">mantenimiento</Link> y la <Link className="underline underline-offset-4" href="/servicios/seo">estrategia SEO continua</Link> se valoran según tus necesidades. Una <Link className="underline underline-offset-4" href="/servicios/tiendas-online">tienda online</Link> o una integración requiere un alcance específico.</p>
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
                Diseño web para empresas de <br /> <span className="text-zinc-400 italic">Oviedo y toda Asturias</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base mt-6">
                Trabajamos desde Oviedo con empresas y profesionales de Asturias. Si vendes servicios en tu zona, organizamos la web para explicar tu actividad, tus áreas de atención y cómo solicitar presupuesto.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                Atendemos proyectos en Oviedo, Gijón, Avilés y otras localidades del Principado mediante reuniones online. Si también necesitas captar clientes desde Google, podemos valorar una estrategia SEO como servicio complementario.
              </p>
            </div>

            <div className="reveal" style={{ animationDelay: "0.2s" }}>
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
                <h3 className="text-2xl font-display text-white mb-4">Cómo trabajamos contigo</h3>
                <ul className="space-y-4 text-zinc-400 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Reuniones online:</strong> Nos gusta reunirnos y entender a fondo tu proyecto en videollamadas donde podamos definir objetivos y planes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Contacto directo:</strong> Acordamos contigo el alcance y resolvemos las dudas sobre diseño, contenido y publicación.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Objetivos definidos:</strong> Priorizamos las páginas y acciones que ayudan a presentar tus servicios y facilitar el contacto.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                 */}
      {/* ============================================================ */}
      <FaqSection title="Preguntas frecuentes sobre diseño web" faqs={faqs} includeJsonLd={false} />

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
              <Link href="/contacto?servicio=diseno-web">
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
