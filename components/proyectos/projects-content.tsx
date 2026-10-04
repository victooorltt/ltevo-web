import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Code2, Gauge, Layers, ShieldCheck } from "lucide-react";
import { projects } from "@/lib/projects";

const deliveryStandards = [
  {
    icon: Layers,
    title: "Diseño visual exclusivo",
    description:
      "Cada interfaz se diseña desde cero adaptada a tu sector e identidad corporativa. Sin plantillas genéricas ni limitaciones prediseñadas.",
  },
  {
    icon: Gauge,
    title: "Rendimiento y velocidad real",
    description:
      "Desarrollamos con Next.js y React para lograr tiempos de carga por debajo del segundo y optimización máxima de Core Web Vitals.",
  },
  {
    icon: Code2,
    title: "SEO técnico estructurado",
    description:
      "Estructura semántica, microdatos Schema.org y metadatos dinámicos integrados en el código para que los buscadores clasifiquen tu web.",
  },
  {
    icon: ShieldCheck,
    title: "Propiedad total del código",
    description:
      "Tu proyecto te pertenece al 100%. Sin plataformas cautivas ni costes ocultos: tienes acceso completo al repositorio y a tus activos.",
  },
];

export function ProjectsContent() {
  return (
    <>
      {/* ============================================================ */}
      {/*  HERO: Fondo oscuro inmersivo con foto a la derecha          */}
      {/* ============================================================ */}
      <section className="relative bg-zinc-950 text-white pt-32 pb-16 lg:pt-36 lg:pb-24 min-h-[54vh] overflow-hidden flex items-center">

        {/* Foto a la derecha con fundido hacia el texto */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[54%] h-full">
            <Image
              src="/Hero-proyectos.webp"
              alt="Proyectos y casos de éxito desarrollados por LTEvo"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-center lg:object-right opacity-70 lg:opacity-90"
            />
            {/* Degradados de fundido */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 via-30% to-transparent hidden lg:block" />
          </div>
        </div>

        {/* Contenido a la izquierda */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.05] tracking-tight text-white">
              Proyectos web con propósito y resultados.
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white/75 max-w-xl">
              Desde webs corporativas elegantes hasta plataformas con reservas y sistemas a medida. Diseñamos con identidad visual propia y desarrollamos con el máximo rigor técnico.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#proyectos-grid"
                className="inline-flex items-center gap-3 rounded-full bg-white text-zinc-950 px-7 py-4 font-semibold hover:bg-white/90 transition-colors"
              >
                Ver proyectos <ArrowDown className="size-4" />
              </a>
              <Link
                href="/contacto"
                className="rounded-full border border-white/25 px-7 py-4 hover:bg-white/10 text-white transition-colors"
              >
                Solicitar propuesta
              </Link>
            </div>

            {/* Métricas limpias en Hero */}
            <div className="grid grid-cols-3 gap-8 pt-8 mt-8 border-t border-white/10 max-w-md">
              <div>
                <p className="text-2xl lg:text-3xl font-display tracking-tight text-white font-light">100%</p>
                <p className="text-sm text-white/60 mt-1">A medida</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-display tracking-tight text-white font-light">&lt; 1s</p>
                <p className="text-sm text-white/60 mt-1">Carga media</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-display tracking-tight text-white font-light">95+</p>
                <p className="text-sm text-white/60 mt-1">Lighthouse</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN DE PROYECTOS: Showcase limpio y directo             */}
      {/* ============================================================ */}
      <section id="proyectos-grid" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
            Casos reales en producción.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4">
            Cada empresa tiene necesidades comerciales específicas. Estas soluciones muestran cómo aplicamos diseño UI/UX y arquitectura web a medida para resolverlas.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {projects.map((project) => (
            <article key={project.slug}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-foreground/[0.08] bg-card/60 hover:bg-card hover:border-foreground/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] transition-all duration-500 overflow-hidden"
              >
                <div className="grid lg:grid-cols-12 items-stretch">
                  {/* Imagen del proyecto con marco y zoom suave */}
                  <div className="lg:col-span-6 p-4 lg:p-6 pb-0 lg:pb-6">
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] lg:min-h-[380px] bg-foreground/[0.03]">
                      <Image
                        src={project.image}
                        alt={`Diseño de la web de ${project.title}`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 scale-100 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground opacity-[0.03] group-hover:opacity-0 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Contenido descriptivo del proyecto */}
                  <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      {/* Cabecera con título y botón flecha estilo Apple */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                          {project.title}
                        </h3>

                        <div
                          aria-hidden="true"
                          className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center bg-foreground/[0.03] group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm shrink-0"
                        >
                          <ArrowUpRight className="w-4 h-4 text-foreground/70 group-hover:text-background transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Aportaciones clave */}
                      <ul className="space-y-2 mb-8 text-sm text-foreground/80">
                        {project.work.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check className="size-4 text-foreground/60 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer de la tarjeta: Tags */}
                    <div className="pt-6 border-t border-foreground/[0.08] flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full text-xs font-sans font-medium px-3 py-1 bg-foreground/[0.04] border border-foreground/[0.08] text-muted-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN DE ESTÁNDARES: Cómo construimos cada web            */}
      {/* ============================================================ */}
      <section className="border-y border-foreground/10 py-20 lg:py-28 bg-stone-50/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight">
              Lo que define cada proyecto en LTEvo.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              La calidad de una web se comprueba en su velocidad, su facilidad de uso y la seguridad técnica que ofrece a largo plazo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryStandards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-foreground/[0.08] bg-card p-6 lg:p-8 flex flex-col justify-between shadow-[0_10px_25px_-10px_rgba(0,0,0,0.04)]"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-display text-xl tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN FINAL: CTA para nuevos proyectos                    */}
      {/* ============================================================ */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
          {/* Luz ambiental sutil */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-stone-700/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6">
              ¿Hablamos sobre tu próximo proyecto?
            </h2>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              Analizamos tus objetivos, te asesoramos sobre la mejor arquitectura técnica y te entregamos un presupuesto cerrado con alcance y plazos detallados antes de empezar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 rounded-full bg-white text-zinc-950 px-8 py-4 font-semibold hover:bg-white/90 transition-colors"
              >
                Solicitar una propuesta <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/servicios/desarrollo-web"
                className="rounded-full border border-white/20 px-8 py-4 hover:bg-white/10 text-white transition-colors"
              >
                Ver servicios a medida
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
