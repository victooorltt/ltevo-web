import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BarChart3, Search, Code, TrendingUp, Link as LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { FaqSection } from "@/components/landing/faq-section";

/* Nota: componente de servidor. El reveal es CSS scroll-driven y las FAQs
   usan <details>/<summary> nativos, sin JS. */

/* Fuente única de las FAQs: se renderizan aquí (details/summary) y alimentan
   el JSON-LD FAQPage de app/servicios/seo/page.tsx para que el schema
   nunca se desincronice de lo visible. El campo opcional `more` añade un
   enlace contextual al blog SOLO en el render; el schema usa question/answer. */
type Faq = {
  question: string;
  answer: string;
  more?: { text: string; href: string };
};

export const faqs: Faq[] = [
  {
    question: "¿Cuánto cuesta contratar SEO en Oviedo o Asturias?",
    answer: "El presupuesto depende del estado de tu web, tus servicios, la competencia y el trabajo de implementación y contenidos necesario. Tras una primera revisión, definimos prioridades, tareas y seguimiento. La propuesta concreta lo incluido y cualquier coste externo antes de empezar.",
  },
  {
    question: "¿Cuándo podemos empezar a ver resultados?",
    answer: "El SEO requiere tiempo para que los buscadores rastreen los cambios y para competir con otras webs. Algunas correcciones técnicas pueden reflejarse antes que el trabajo de contenidos o autoridad. Revisamos tendencias durante varios meses y ajustamos el plan a partir de los datos; no prometemos una fecha ni una posición concreta.",
    more: { text: "Entender qué es el SEO", href: "/blog/que-es-el-seo" },
  },
  {
    question: "¿Garantizáis la primera posición en Google?",
    answer: "No. Las posiciones dependen del buscador, la competencia y la consulta de cada usuario. Acordamos acciones, prioridades y métricas verificables para evaluar el trabajo: visibilidad de búsquedas comerciales, clics y contactos recibidos cuando se dispone de medición.",
  },
  {
    question: "¿Qué recibo en una auditoría SEO?",
    answer: "Un diagnóstico de los problemas técnicos, de contenido y de estructura que afectan a la web, junto con las oportunidades de búsqueda y un plan priorizado. La implementación, los contenidos nuevos y el seguimiento se detallan en la propuesta para saber qué se ejecuta y quién se encarga de cada tarea.",
  },
  {
    question: "¿Trabajáis el SEO local y el Perfil de Empresa de Google?",
    answer: "Sí. Revisamos páginas de servicio, zonas de atención, datos de contacto y el Perfil de Empresa cuando corresponde y disponemos de acceso. El objetivo es facilitar que clientes de tu zona encuentren una oferta relevante y puedan contactar. La ubicación y la competencia también influyen en los resultados locales.",
  },
  {
    question: "¿Podéis mejorar una web que ya está publicada?",
    answer: "Sí. Primero revisamos su tecnología, contenido y accesos disponibles. Priorizamos los cambios útiles sobre la web existente; si una función, integración o rediseño requiere un desarrollo independiente, te explicamos el alcance y su presupuesto antes de realizarlo.",
    more: { text: "Consultar desarrollo web a medida", href: "/servicios/desarrollo-web" },
  },
  {
    question: "¿Cómo sabré si el SEO me está trayendo clientes?",
    answer: "Comparamos consultas y páginas en Search Console y, con los permisos y la medición adecuados, solicitudes de contacto y llamadas. Para conocer la rentabilidad también necesitamos distinguir contactos cualificados, presupuestos y ventas. Una subida de visitas por sí sola no demuestra que la captación esté mejorando.",
  },
  {
    question: "¿El presupuesto SEO incluye anuncios, enlaces pagados o un rediseño?",
    answer: "Esos trabajos y costes no se incluyen automáticamente. La propuesta distingue auditoría, implementación, contenidos y seguimiento, y especifica cualquier servicio adicional. Los anuncios de Google tienen una inversión y una gestión propias, distintas del posicionamiento orgánico.",
  },
];

export function SeoContent() {
  const seoServices = [
    {
      title: "Auditoría SEO Técnica",
      description: "Revisamos rastreo, indexación, velocidad y enlaces. Recibes un diagnóstico con problemas, páginas afectadas y prioridades de implementación.",
      icon: Code
    },
    {
      title: "Búsquedas con intención de contratar",
      description: "Relacionamos las búsquedas de tu público con tus servicios y páginas. Priorizamos oportunidades comerciales y consultas próximas a posiciones competitivas.",
      icon: Search
    },
    {
      title: "SEO On-Page y Contenidos",
      description: "Revisamos títulos, encabezados, enlaces y contenido de servicios. Proponemos mejoras y artículos que ayuden a resolver dudas antes de contratar.",
      icon: TrendingUp
    },
    {
      title: "Autoridad y referencias relevantes",
      description: "Identificamos oportunidades de menciones y referencias de clientes, colaboradores y sitios de tu sector. Cualquier acción externa y su coste se acuerdan contigo.",
      icon: LinkIcon
    },
    {
      title: "SEO Local y Maps",
      description: "Revisamos tu Perfil de Empresa y las páginas de servicio según las zonas donde atiendes, con datos de contacto coherentes y contenido útil para clientes locales.",
      icon: MapPin
    },
    {
      title: "Analítica y Monitorización",
      description: "Utilizamos Search Console y, cuando existe una configuración adecuada, Analytics. El seguimiento relaciona consultas, páginas y contactos para orientar las siguientes mejoras.",
      icon: BarChart3
    }
  ];

  type MethodologyStep = {
    number: string;
    title: string;
    description: string;
    link?: { text: string; href: string };
  };

  const methodology: MethodologyStep[] = [
    {
      number: "01",
      title: "Diagnóstico Inicial",
      description: "Revisamos la web y sus datos disponibles. Identificamos fallos técnicos y búsquedas comerciales para establecer un punto de partida verificable.",
      link: { text: "Qué revisar si tu web no aparece en Google", href: "/blog/por-que-mi-web-no-aparece-en-google" }
    },
    {
      number: "02",
      title: "Planificación Estratégica",
      description: "Definimos un plan de optimización priorizando las acciones técnicas que tendrán mayor y más rápido impacto en tu volumen de negocio."
    },
    {
      number: "03",
      title: "Ejecución y Enlaces",
      description: "Implementamos las tareas acordadas en tu CMS o código y mejoramos páginas clave. Dejamos constancia de los cambios para poder valorar sus resultados."
    },
    {
      number: "04",
      title: "Medición y Ajustes",
      description: "Comparamos el rendimiento por consultas y páginas, revisamos la captación cuando existe medición y acordamos las siguientes prioridades."
    }
  ];

  const valueProps = [
    {
      title: "Consultas comerciales",
      description: "Priorizamos búsquedas de tus servicios y áreas de atención para llegar a personas que pueden convertirse en clientes."
    },
    {
      title: "Cambios priorizados",
      description: "Ordenamos las tareas según los datos, el esfuerzo y su relación con tus objetivos comerciales."
    },
    {
      title: "Recorrido hacia el contacto",
      description: "Revisamos cómo se presentan tus servicios y qué necesita el visitante para decidir y solicitar información."
    },
    {
      title: "Trabajo verificable",
      description: "Explicamos qué se ha cambiado y qué muestran los datos para que puedas valorar la evolución del servicio."
    }
  ];

  return (
    <>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-zinc-950 text-white py-48 lg:py-52 overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <Image
          src="/Hero-servicios-seo.webp"
          alt="Posicionamiento SEO Profesional"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0"
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
          <div className="reveal" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-5xl lg:text-7xl font-display italic tracking-tight leading-[0.95] mb-6 text-white text-center">
              SEO en Oviedo <br /> y Asturias
            </h1>
          </div>

          <div className="reveal" style={{ animationDelay: "0.2s" }}>
            <p className="text-xl lg:text-2xl text-white/80 max-w-2xl leading-relaxed text-center mx-auto">
              Ayudamos a empresas y profesionales a mejorar su visibilidad cuando alguien busca contratar sus servicios. Auditoría, mejoras de la web, SEO local y seguimiento centrado en contactos y oportunidades de negocio.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8">
              <Link href="/contacto?servicio=seo">Solicitar revisión inicial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-8">
              <a href="#alcance-seo">Ver qué incluye</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHAT IS SEO & VALUE PROPS                                    */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
              ¿Qué aporta el SEO <br /> <span className="text-muted-foreground italic">a tu estrategia digital?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((item, index) => (
              <div key={item.title} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-foreground/10 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-display mb-6">Una propuesta SEO con alcance claro</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Empezamos por tus servicios, tu web y los datos disponibles. La propuesta detalla las páginas a trabajar, las tareas de auditoría e implementación, los contenidos acordados y cómo revisaremos la evolución.</p>
            <p className="text-muted-foreground leading-relaxed">Así puedes comparar qué se hará, qué accesos necesitamos y qué depende de ti. Un rediseño, campañas de anuncios o costes de terceros requieren una valoración específica.</p>
          </div>
          <div>
            <h3 className="text-2xl font-display mb-6">Para empresas que necesitan captar contactos</h3>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              <li>Tu web ya existe, pero no aparece para tus servicios o las visitas no llegan al formulario.</li>
              <li>Necesitas mejorar la visibilidad en tu zona y presentar una oferta más clara.</li>
              <li>Quieres priorizar cambios a partir de consultas, páginas y oportunidades reales.</li>
            </ul>
            <p className="mt-6 text-muted-foreground leading-relaxed">Si la web necesita funciones nuevas, valoramos el <Link className="underline underline-offset-4" href="/servicios/desarrollo-web">desarrollo a medida</Link>. Para cambios técnicos recurrentes, puedes consultar el <Link className="underline underline-offset-4" href="/servicios/mantenimiento-web">mantenimiento web</Link>.</p>
            <Link href="/proyectos" className="inline-flex items-center gap-2 mt-6 underline underline-offset-4">Ver proyectos de LTEvo <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEO SERVICES LIST (PREMIUM DARK SECTION)                    */}
      {/* ============================================================ */}
      <section id="alcance-seo" className="relative py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden border-t border-zinc-900">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(24, 24, 27, 0.1) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <div className="reveal mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
              Qué podemos trabajar <br /> <span className="text-zinc-400 italic">en tu estrategia SEO.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.title} className="reveal" style={{ animationDelay: `${index * 0.05}s` }}>
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
                </div>
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
          <div className="reveal mb-16 lg:mb-24 text-center">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-zinc-900">
              Nuestro proceso de <br /> <span className="text-zinc-500 italic">posicionamiento orgánico.</span>
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto mt-20">
            {/* Central vertical line for desktop, left-aligned for mobile */}
            <div className="absolute left-4 lg:left-1/2 top-4 lg:top-5 bottom-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent lg:-translate-x-1/2" />

            <div className="space-y-16 lg:space-y-24">
              {methodology.map((step, index) => {
                const isRight = index % 2 === 0;
                return (
                  <div key={step.number} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
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
                          {step.link && (
                            <>
                              {" "}
                              <Link
                                href={step.link.href}
                                className="text-zinc-900 underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-900 transition-colors"
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
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN LOCAL: SEO LOCAL EN ASTURIAS                        */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white leading-tight">
                Posicionamiento SEO Local en Asturias: <br /> <span className="text-zinc-400 italic">Oviedo, Gijón y Avilés</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base mt-6">
                Si atiendes a clientes en Asturias, conviene que tus páginas expliquen tus servicios y tus áreas de atención. Revisamos qué consultas locales tienen sentido para tu actividad y cuál es la página adecuada para responderlas.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base mt-4">
                Desde Oviedo trabajamos el contenido de servicios, el enlazado y el Perfil de Empresa de Google cuando corresponde a tu negocio. Para empresas que atienden en Gijón, Avilés u otras localidades, reflejamos las zonas reales y evitamos repetir páginas sin contenido propio.
              </p>
            </div>

            <div className="reveal" style={{ animationDelay: "0.2s" }}>
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
                <h3 className="text-2xl font-display text-white mb-4">Pilares del SEO Local</h3>
                <ul className="space-y-4 text-zinc-400 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Datos de contacto coherentes:</strong> Revisamos nombre, dirección, teléfono y horarios en la web y en los perfiles accesibles.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Reseñas auténticas:</strong> Facilitamos que tus clientes compartan su experiencia y que los visitantes puedan comprobar las valoraciones existentes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Servicios y zonas reales:</strong> Mejoramos las páginas que explican tu oferta y dónde atiendes a tus clientes.</span>
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
      <FaqSection title="Preguntas frecuentes sobre SEO" faqs={faqs} includeJsonLd={false} />

      {/* ============================================================ */}
      {/*  CTA SECTION                                                 */}
      {/* ============================================================ */}
      <section className="bg-foreground text-background py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="reveal">
            <h2 className="text-4xl lg:text-7xl font-display italic tracking-tight mb-8">
              ¿Quieres saber qué mejorar en tu web?
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
              Cuéntanos qué servicios quieres vender y comparte tu web. Hacemos una primera revisión sin coste para valorar tu situación y proponerte el alcance del trabajo SEO.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-full group inline-flex items-center"
            >
              <Link href="/contacto?servicio=seo">
                Solicitar revisión inicial
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
