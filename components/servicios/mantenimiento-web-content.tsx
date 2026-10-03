import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Shield,
  Zap,
  Database,
  Lock,
  TrendingUp,
  RefreshCw,
  Edit3,
  LifeBuoy,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { FaqSection } from "@/components/landing/faq-section";

/* Nota: componente de servidor. El reveal es CSS scroll-driven y las FAQs
   usan <details>/<summary> nativos, sin JS. */

/* FAQs visibles con <details>/<summary>. El campo `more` añade un enlace
   contextual al servicio o artículo que amplía la respuesta. */
type Faq = {
  question: string;
  answer: string;
  more?: { text: string; href: string };
};

export const faqs: Faq[] = [
  {
    question: "¿Podéis mantener una web que no ha desarrollado LTEvo?",
    answer: "Sí, primero revisamos tecnología, estado, accesos y copias existentes para confirmar la cobertura. En WordPress y WooCommerce valoramos sistema, temas, plugins y funciones de venta; en una web de código, dependencias, despliegue y datos. Los problemas previos o una puesta a punto se valoran aparte antes del alta.",
  },
  {
    question: "¿Qué diferencia hay entre los planes de mantenimiento?",
    answer: "Básico contempla copias semanales y actualizaciones mensuales. Profesional añade copias diarias, revisiones semanales y una hora de cambios de contenido al mes. Premium amplía la cobertura para tiendas y webs con más necesidades, con monitorización de caídas y tres horas de cambios de contenido al mes. Confirmamos la compatibilidad de estas tareas con tu web antes de contratar.",
  },
  {
    question: "¿Puedo cambiar de plan o cancelar?",
    answer: "Los planes son mensuales y sin permanencia. Puedes solicitar un cambio de cobertura o cancelar por email antes del siguiente ciclo de facturación, según las condiciones acordadas.",
  },
  {
    question: "¿Qué ocurre si necesito más horas o una función nueva?",
    answer: "Las horas de contenido cubren los cambios acordados; funciones nuevas, rediseños y redacción se valoran aparte. La propuesta concreta cómo solicitar tareas y las condiciones de acumulación de horas. Si una petición supera la cobertura, te informamos antes de ejecutarla y acordamos su presupuesto o programación.",
    more: { text: "Consultar desarrollo web a medida", href: "/servicios/desarrollo-web" },
  },
  {
    question: "¿Incluye hosting, dominio o una campaña SEO?",
    answer: "Hosting y dominio se presupuestan por separado según las necesidades de tu proyecto. El mantenimiento cubre las tareas técnicas acordadas; una estrategia de posicionamiento, la redacción de artículos o un rediseño no se incluyen automáticamente.",
    more: { text: "Ver hosting gestionado", href: "/servicios/hosting" },
  },
  {
    question: "¿Qué hacéis si mi web sufre un ataque o se cae?",
    answer: "Revisamos la incidencia y las copias disponibles para decidir qué se puede recuperar. La propuesta concreta restauración y costes adicionales; Premium incluye limpieza de malware según sus condiciones. En una tienda valoramos también pedidos y datos posteriores a la copia antes de restaurar. Te informamos del alcance de la intervención.",
  },
  {
    question: "¿Cuándo tengo soporte y cómo se atienden las incidencias?",
    answer: "La atención y los canales dependen del plan: email en Básico, email o chat prioritario en Profesional y atención telefónica y prioritaria en Premium. Antes de contratar, concretamos horarios, prioridades y condiciones de respuesta. Monitorizar una web no equivale a disponibilidad permanente de atención humana.",
  },
];

export function MantenimientoWebContent() {
  type Benefit = {
    title: string;
    description: string;
    icon: typeof Shield;
    iconColor: string;
    bgColor: string;
    borderColor: string;
    link?: { text: string; href: string };
  };

  const benefits: Benefit[] = [
    {
      title: "Un responsable técnico",
      description: "Nos convertimos en tu departamento técnico. Delegas las tareas complejas de actualización, monitorización y seguridad para enfocarte en tu negocio.",
      icon: Shield,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/10"
    },
    {
      title: "Velocidad y Rendimiento",
      description: "Revisamos tiempos de carga y recursos según tu plan para detectar problemas de rendimiento y valorar mejoras.",
      icon: Zap,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-500/5",
      borderColor: "border-sky-500/10"
    },
    {
      title: "Prevención y seguridad",
      description: "Revisamos actualizaciones y medidas de seguridad compatibles con tu web. La frecuencia de escaneo y la cobertura dependen del plan contratado.",
      icon: Lock,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/10"
    },
    {
      title: "Copias de Seguridad (Backups)",
      description: "Programamos copias semanales o diarias según el plan. Acordamos qué datos se guardan, su retención y cómo se valorará una restauración ante una incidencia.",
      icon: Database,
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-500/5",
      borderColor: "border-indigo-500/10"
    },
    {
      title: "Estabilidad y SEO",
      description: "Revisamos errores y enlaces según la cobertura contratada. El mantenimiento técnico ayuda a conservar una web usable; la estrategia SEO se contrata aparte.",
      icon: TrendingUp,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/5",
      borderColor: "border-rose-500/10",
      link: { text: "¿Tu web no aparece en Google? Revisa estas causas", href: "/blog/por-que-mi-web-no-aparece-en-google" },
    }
  ];

  type WhyNeeded = {
    title: string;
    description: string;
    icon: typeof AlertTriangle;
    iconColor: string;
    link?: { text: string; href: string };
  };

  const whyNeeded: WhyNeeded[] = [
    {
      title: "Prevención Activa de Hackeos",
      description: "Mantener el sistema y sus dependencias actualizados ayuda a corregir vulnerabilidades conocidas. Combinamos revisiones y copias de seguridad para reducir riesgos y facilitar la recuperación.",
      icon: AlertTriangle,
      iconColor: "text-amber-400"
    },
    {
      title: "Compatibilidad de Actualizaciones",
      description: "Antes de actualizar, revisamos compatibilidad y copias disponibles. Después comprobamos las funciones acordadas, como formularios o compra, según la tecnología y la cobertura del plan.",
      icon: RefreshCw,
      iconColor: "text-sky-400"
    },
    {
      title: "Ediciones y Cambios de Contenido",
      description: "Aplicamos cambios de textos, precios, imágenes o artículos dentro de las horas y tareas incluidas. Las funciones nuevas y la redacción de contenido requieren un alcance propio.",
      icon: Edit3,
      iconColor: "text-emerald-400",
      link: { text: "Qué incluye el mantenimiento web y cómo comparar planes", href: "/blog/que-incluye-mantenimiento-web" },
    },
    {
      title: "Soporte Técnico Especializado",
      description: "Dispones de un canal de contacto para comunicar incidencias y dudas técnicas. La prioridad y la cobertura se concretan en las condiciones de tu plan.",
      icon: LifeBuoy,
      iconColor: "text-indigo-400"
    }
  ];

  const pricingPlans = [
    {
      name: "Básico",
      price: "29,99",
      period: "mes",
      description: "Ideal para blogs personales o webs corporativas con bajo volumen de actualización.",
      features: [
        "Copias de seguridad semanales",
        "Actualización mensual de plugins y core",
        "Firewall y seguridad perimetral básica",
        "Monitorización mensual de enlaces rotos",
        "Soporte por email",
        "Sin permanencia contractual"
      ],
      popular: false,
      buttonText: "Consultar este plan"
    },
    {
      name: "Profesional",
      price: "39,99",
      period: "mes",
      description: "El plan recomendado para negocios digitales y pymes que dependen de su web.",
      features: [
        "Copias de seguridad diarias",
        "Actualización semanal de plugins y core",
        "Escaneo activo de seguridad y malware semanal",
        "1 hora mensual de contenido, acumulable según propuesta",
        "Optimización de base de datos y velocidad básica",
        "Soporte prioritario por email/chat"
      ],
      popular: true,
      buttonText: "Consultar este plan"
    },
    {
      name: "Premium",
      price: "49,99",
      period: "mes",
      description: "Diseñado para tiendas online (WooCommerce) y plataformas web críticas.",
      features: [
        "Monitorización de caídas en tiempo real (Uptime 24/7)",
        "Limpieza de malware según condiciones del plan",
        "Copias de seguridad diarias (almacenamiento externo dual)",
        "Atención prioritaria a actualizaciones críticas",
        "3 horas de cambios de contenido al mes",
        "Soporte telefónico y prioritario"
      ],
      popular: false,
      buttonText: "Consultar este plan"
    }
  ];

  return (
    <>

      {/* ============================================================ */}
      {/*  HERO: Fondo oscuro con foto a la derecha y texto a la izq   */}
      {/* ============================================================ */}
      <section className="relative bg-zinc-950 text-white pt-36 pb-24 lg:pt-48 lg:pb-36 overflow-hidden min-h-[75vh] flex items-center">
        {/* Foto a la derecha con fundido a la izquierda */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[54%] h-full">
            <Image
              src="/Hero-servicios-mantenimiento-v2.webp"
              alt="Mantenimiento web en Asturias y Oviedo"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-center lg:object-right opacity-70 lg:opacity-90"
            />
            {/* Degradados suaves para fundir la imagen hacia el texto a la izquierda */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 via-30% to-transparent hidden lg:block" />
          </div>
        </div>

        {/* Contenido a la izquierda */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <div className="reveal" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight leading-[1.05] text-white">
                Mantenimiento web <br /> en Asturias y Oviedo
              </h1>
            </div>

            <div className="reveal" style={{ animationDelay: "0.2s" }}>
              <p className="mt-8 text-lg lg:text-xl text-white/75 max-w-xl leading-relaxed">
                Actualizaciones, copias de seguridad y soporte para empresas que quieren delegar el cuidado de su web. Desde Oviedo, atendemos negocios de Asturias y del resto de España con planes desde 29,99 € al mes más IVA, sin permanencia.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 h-14 text-base font-semibold">
                <a href="#planes-mantenimiento">Comparar planes</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-14 text-base">
                <Link href="/contacto?servicio=mantenimiento-web">Consultar mi web</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 1: BENEFICIOS                                       */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background border-b border-foreground/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal mb-16 lg:mb-24">
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase block mb-3">Ventajas del soporte</span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
              Beneficios del Soporte Técnico <br /> <span className="text-muted-foreground italic">en tu Mantenimiento Web</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="reveal" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className={`p-8 border rounded-lg h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-foreground/3 ${benefit.borderColor} ${benefit.bgColor}`}>
                    <div>
                      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-background border border-foreground/5 shadow-sm text-foreground">
                        <Icon className={`w-5 h-5 ${benefit.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-display mb-3 text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-xs">
                        {benefit.description}
                        {benefit.link && (
                          <>
                            {" "}
                            <Link
                              href={benefit.link.href}
                              className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                            >
                              {benefit.link.text}
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
      {/*  SECTION 2: ¿POR QUÉ NECESITAS UN PLAN?                      */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(24, 24, 27, 0.4) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <div className="reveal mb-16 lg:mb-24">
            <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase block mb-3">Cuidado técnico periódico</span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
              ¿Por qué necesitas un plan <br /> <span className="text-zinc-400 italic">de Mantenimiento Web?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyNeeded.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="reveal" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="group relative bg-zinc-900/20 border border-zinc-900/80 p-8 rounded-lg transition-all duration-300 hover:bg-zinc-900/40 hover:border-zinc-800 hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-900/60 text-zinc-400 group-hover:text-white transition-colors duration-300">
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-display text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors">
                        {item.description}
                        {item.link && (
                          <>
                            {" "}
                            <Link
                              href={item.link.href}
                              className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-colors"
                            >
                              {item.link.text}
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
      {/*  SECTION 3: PRECIOS                                          */}
      {/* ============================================================ */}
      <section id="planes-mantenimiento" className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16 lg:mb-24">
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase block mb-3">Planes adaptables</span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
              Precios de Mantenimiento Web
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Planes mensuales desde 29,99 € más IVA. Elige la cobertura según las necesidades de tu web, sin permanencia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {pricingPlans.map((plan, index) => {
              return (
                <div key={plan.name} className="reveal h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div
                    className={`relative rounded-2xl h-full flex flex-col justify-between border transition-all duration-300 hover:-translate-y-2 ${
                      plan.popular
                        ? "bg-zinc-950 text-white border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:scale-105 z-10"
                        : "bg-background text-foreground border-foreground/10 shadow-sm"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 font-mono text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recomendado
                      </span>
                    )}

                    <div className="p-8 lg:p-10 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Name and description */}
                        <div className="mb-6">
                          <h3 className={`text-2xl font-display ${plan.popular ? "text-white" : "text-foreground"}`}>
                            {plan.name}
                          </h3>
                          <p className={`mt-2 text-xs leading-relaxed ${plan.popular ? "text-zinc-400" : "text-muted-foreground"}`}>
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline mb-8">
                          <span className="text-5xl font-display tracking-tight">
                            {plan.price} €
                          </span>
                          <span className={`text-sm ml-2 font-mono ${plan.popular ? "text-zinc-500" : "text-muted-foreground"}`}>
                            /{plan.period}
                          </span>
                        </div>
                        <p className={`-mt-5 mb-8 text-sm ${plan.popular ? "text-zinc-400" : "text-muted-foreground"}`}>Más IVA. Consulta condiciones y alcance.</p>

                        {/* Features list */}
                        <ul className="space-y-4">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start text-xs leading-relaxed">
                              <Check className={`w-4 h-4 mr-3 shrink-0 ${plan.popular ? "text-amber-500" : "text-emerald-600"}`} />
                              <span className={plan.popular ? "text-zinc-300" : "text-foreground/90"}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-8 pt-6 border-t border-dashed border-foreground/10">
                        <Button
                          asChild
                          className={`w-full py-6 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                            plan.popular
                              ? "bg-white text-zinc-950 hover:bg-zinc-200"
                              : "bg-zinc-950 hover:bg-zinc-800 text-white"
                          }`}
                        >
                          <Link href={`/contacto?servicio=mantenimiento-web&plan=${encodeURIComponent(plan.name)}`}>
                            {plan.buttonText}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-foreground/10 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-display mb-4">Antes de contratar el mantenimiento</h2>
            <p className="text-muted-foreground leading-relaxed">Antes del alta revisamos tecnología, accesos, estado y copias. En WordPress y WooCommerce concretamos actualizaciones de sistema, temas, plugins y funciones de venta. En webs de código revisamos dependencias, despliegue y datos para confirmar tareas y cobertura; cada plataforma requiere un alcance propio.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">La propuesta concreta frecuencia y retención de copias, restauración, atención y cambios de contenido. La puesta a punto de problemas previos y los trabajos que superen el plan se valoran aparte, con tu aceptación. Puedes usar nuestra <Link className="underline underline-offset-4" href="/blog/que-incluye-mantenimiento-web">guía para comparar mantenimiento web</Link> al revisar la cobertura.</p>
          </div>
          <div>
            <h3 className="text-2xl font-display mb-4">Qué se contrata por separado</h3>
            <p className="text-muted-foreground leading-relaxed">El <Link className="underline underline-offset-4" href="/servicios/hosting">hosting y el dominio</Link>, los <Link className="underline underline-offset-4" href="/servicios/desarrollo-web">desarrollos nuevos</Link>, un rediseño y la <Link className="underline underline-offset-4" href="/servicios/seo">estrategia SEO</Link> requieren presupuesto propio. Si gestionas una <Link className="underline underline-offset-4" href="/servicios/tiendas-online">tienda online</Link>, revisamos también las funciones de venta para acordar su cobertura.</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                 */}
      {/* ============================================================ */}
      <FaqSection title="Preguntas frecuentes sobre mantenimiento web" faqs={faqs} includeJsonLd={false} />

      {/* ============================================================ */}
      {/*  CTA SECTION                                                 */}
      {/* ============================================================ */}
      <section className="bg-foreground text-background py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="reveal">
            <h2 className="text-4xl lg:text-7xl font-display italic tracking-tight mb-8">
              ¿Qué mantenimiento necesita tu web?
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
              Envíanos la dirección de tu web y cuéntanos qué necesitas. Revisamos su situación y te orientamos sobre la cobertura y las tareas que conviene priorizar.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-full group inline-flex items-center"
            >
              <Link href="/contacto?servicio=mantenimiento-web">
                Consultar mantenimiento
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
