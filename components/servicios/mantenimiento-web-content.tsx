"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  Activity,
  AlertTriangle
} from "lucide-react";
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

export function MantenimientoWebContent() {
  const benefits = [
    {
      title: "Tranquilidad Absoluta",
      description: "Nos convertimos en tu departamento técnico. Delegas las tareas complejas de actualización, monitorización y seguridad para enfocarte en tu negocio.",
      icon: Shield,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/10"
    },
    {
      title: "Velocidad y Rendimiento",
      description: "Analizamos de forma periódica los tiempos de respuesta del servidor y la optimización de caché, asegurando que tu web cargue al instante.",
      icon: Zap,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-500/5",
      borderColor: "border-sky-500/10"
    },
    {
      title: "Seguridad Blindada",
      description: "Configuramos firewalls avanzados y realizamos monitorización activa. Protegemos tu base de datos y tus archivos frente a ataques de fuerza bruta.",
      icon: Lock,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/10"
    },
    {
      title: "Copias de Seguridad (Backups)",
      description: "Respaldamos tu sitio por completo periódicamente y almacenamos las copias de seguridad en servidores externos cifrados para una restauración inmediata.",
      icon: Database,
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-500/5",
      borderColor: "border-indigo-500/10"
    },
    {
      title: "Estabilidad y SEO",
      description: "Detectamos fallos en tiempo real, enlaces rotos o caídas que puedan afectar negativamente a tu indexación y posicionamiento en Google.",
      icon: TrendingUp,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/5",
      borderColor: "border-rose-500/10"
    }
  ];

  const whyNeeded = [
    {
      title: "Prevención Activa de Hackeos",
      description: "Los sistemas web desactualizados son el blanco principal de los ciberataques. Mantener el núcleo y los plugins al día reduce el riesgo de intrusión en un 95%.",
      icon: AlertTriangle,
      iconColor: "text-amber-400"
    },
    {
      title: "Compatibilidad de Actualizaciones",
      description: "Actualizar sin supervisión profesional puede provocar que los plugins entren en conflicto e inhabiliten la web. Hacemos pruebas previas controladas.",
      icon: RefreshCw,
      iconColor: "text-sky-400"
    },
    {
      title: "Ediciones y Cambios de Contenido",
      description: "Actualizar textos, subir nuevos posts de blog, modificar precios o banners requiere tiempo. Lo procesamos de forma limpia y rápida por ti.",
      icon: Edit3,
      iconColor: "text-emerald-400"
    },
    {
      title: "Soporte Técnico Especializado",
      description: "Ante cualquier imprevisto, caída del servidor o duda de configuración, dispones de una línea directa de comunicación con ingenieros de soporte.",
      icon: LifeBuoy,
      iconColor: "text-indigo-400"
    }
  ];

  const pricingPlans = [
    {
      name: "Básico",
      price: "29.99",
      period: "mes",
      description: "Ideal para blogs personales o webs corporativas con bajo volumen de actualización.",
      features: [
        "Copias de seguridad semanales",
        "Actualización mensual de plugins y core",
        "Firewall y seguridad perimetral básica",
        "Monitorización mensual de enlaces rotos",
        "Soporte por email (resolución en 48h)",
        "Sin permanencia contractual"
      ],
      popular: false,
      buttonText: "MÁS INFO"
    },
    {
      name: "Profesional",
      price: "39.99",
      period: "mes",
      description: "El plan recomendado para negocios digitales y pymes que dependen de su web.",
      features: [
        "Copias de seguridad diarias",
        "Actualización semanal de plugins y core",
        "Escaneo activo de seguridad y malware semanal",
        "1 hora de cambios de contenido al mes (acumulable)",
        "Optimización de base de datos y velocidad básica",
        "Soporte prioritario por email/chat (resolución en 24h)"
      ],
      popular: true,
      buttonText: "MÁS INFO"
    },
    {
      name: "Premium",
      price: "49.99",
      period: "mes",
      description: "Diseñado para tiendas online (WooCommerce) y plataformas web críticas.",
      features: [
        "Monitorización de caídas en tiempo real (Uptime 24/7)",
        "Garantía de limpieza y desinfección de malware gratuita",
        "Copias de seguridad diarias (almacenamiento externo dual)",
        "Actualizaciones de seguridad críticas inmediatas",
        "3 horas de cambios de contenido al mes (prioridad total)",
        "Soporte telefónico y prioritario (<4h de respuesta)"
      ],
      popular: false,
      buttonText: "MÁS INFO"
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
          src="/Hero-servicios-mantenimiento.webp"
          width={2752}
          height={1536}
          alt="Mantenimiento Web Profesional"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-75"
          fetchPriority="high"
        />

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        {/* Optional decorative layout lines/grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`grid-h-${i}`}
              className="absolute h-px bg-white"
              style={{ top: `${16.6 * (i + 1)}%`, left: 0, right: 0 }}
            />
          ))}
        </div>

        {/* Outer ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(39, 39, 42, 0.1) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center z-10">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-display italic tracking-tight leading-[0.95] mb-6 text-white text-center">
              Mantenimiento Web <br /> Profesional
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl lg:text-2xl text-white/80 max-w-2xl leading-relaxed text-center mx-auto">
              Protege tu inversión digital. Asegura la máxima velocidad, estabilidad y seguridad para tu sitio web con el respaldo técnico que tu negocio merece.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 1: BENEFICIOS                                       */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background border-b border-foreground/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase block mb-3">Ventajas del soporte</span>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                Beneficios del Soporte Técnico <br /> <span className="text-muted-foreground italic">en tu Mantenimiento Web</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <FadeIn key={benefit.title} delay={index * 0.08}>
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
      {/*  SECTION 2: ¿POR QUÉ NECESITAS UN PLAN?                      */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32 bg-zinc-950 text-white overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(24, 24, 27, 0.4) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 z-10">
          <FadeIn>
            <div className="mb-16 lg:mb-24">
              <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase block mb-3">Prevención correctiva</span>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white">
                ¿Por qué necesitas un plan <br /> <span className="text-zinc-400 italic">de Mantenimiento Web?</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyNeeded.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.05}>
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
      {/*  SECTION 3: PRECIOS                                          */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16 lg:mb-24">
              <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase block mb-3">Planes adaptables</span>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                Precios de Mantenimiento Web
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Elige la cobertura que mejor se adapte al volumen de tu sitio web. Sin contratos de permanencia.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {pricingPlans.map((plan, index) => {
              return (
                <FadeIn key={plan.name} delay={index * 0.1} className="h-full">
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
                            {plan.price}€
                          </span>
                          <span className={`text-sm ml-2 font-mono ${plan.popular ? "text-zinc-500" : "text-muted-foreground"}`}>
                            /{plan.period}
                          </span>
                        </div>

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
                              : "bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                          }`}
                        >
                          <Link href="/contacto">
                            {plan.buttonText}
                          </Link>
                        </Button>
                      </div>
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
      <section className="py-24 lg:py-32 bg-zinc-200 text-zinc-950">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase block mb-3">Resolvemos tus dudas</span>
              <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
                Preguntas Frecuentes
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="faq-1" className="border border-zinc-300 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6 text-zinc-900">
                  ¿Qué es el mantenimiento web y por qué es necesario?
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed pb-6 text-sm">
                  El mantenimiento web es un proceso de optimización constante y preventivo. Consiste en mantener actualizados el core del CMS (por ejemplo, WordPress), las librerías de desarrollo, los plugins de funciones y las configuraciones de seguridad. Sin este proceso, tu web se vuelve vulnerable a fallos técnicos y ataques externos, además de ralentizarse progresivamente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border border-zinc-300 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6 text-zinc-900">
                  ¿Puedo cambiar de plan o cancelar cuando quiera?
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed pb-6 text-sm">
                  Sí. No imponemos contratos de permanencia a largo plazo. Puedes solicitar un cambio de plan (escalar o reducir) o cancelar tu suscripción mensual notificándolo por email antes de que empiece el nuevo ciclo de facturación mensual.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border border-zinc-300 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6 text-zinc-900">
                  ¿Qué sucede si necesito cambios que requieran más horas?
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed pb-6 text-sm">
                  Si las tareas del mes superan el tiempo disponible en tu plan contratado, te lo comunicaremos con antelación para ofrecerte dos opciones: realizar los cambios en el siguiente ciclo o presupuestar las horas extras requeridas bajo una tarifa especial con descuento por ser cliente habitual de mantenimiento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border border-zinc-300 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6 text-zinc-900">
                  ¿El mantenimiento incluye el coste del hosting y dominio?
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed pb-6 text-sm">
                  No está incluido directamente en estos precios estándar, ya que cada proyecto tiene necesidades de servidor muy distintas. Sin embargo, ofrecemos servicios de alojamiento de alto rendimiento gestionados para nuestros clientes. Consúltanos y te facilitaremos un presupuesto unificado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border border-zinc-300 px-6 rounded-sm bg-background">
                <AccordionTrigger className="text-lg font-display hover:no-underline py-6 text-zinc-900">
                  ¿Ofrecéis garantía de limpieza ante virus o hackeos?
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed pb-6 text-sm">
                  Sí, en nuestro plan Premium incluimos una garantía total de limpieza y desinfección en caso de hackeo sin ningún coste añadido. En los planes Básico y Profesional, nos encargaremos de restaurar inmediatamente tu copia de seguridad más reciente y limpia de forma gratuita, y si es necesario desinfectar ficheros manualmente te presentaremos una tarifa especial.
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
              ¿Listo para mantener tu web siempre a punto?
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
              Elige el plan que mejor se adapte a tu estructura o habla con uno de nuestros técnicos para resolver tus necesidades personalizadas.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-full group inline-flex items-center"
            >
              <Link href="/contacto">
                Contactar con soporte
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
