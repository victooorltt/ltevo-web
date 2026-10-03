import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const commitments = [
  {
    title: "Alcance antes de empezar",
    text: "Definimos funciones, contenidos y condiciones para que puedas valorar la propuesta con claridad antes de empezar.",
    href: "/servicios/diseno-web",
    link: "Cómo planteamos una web",
  },
  {
    title: "Proyectos que puedes ver",
    text: "Conoce webs realizadas en producción y las necesidades comerciales que resuelve cada proyecto.",
    href: "/proyectos",
    link: "Ver proyectos de LTEvo",
  },
  {
    title: "Continuidad después del lanzamiento",
    text: "Elige un mantenimiento con tareas y coberturas concretas, según las necesidades de tu web.",
    href: "/servicios/mantenimiento-web",
    link: "Comparar los planes",
  },
  {
    title: "SEO con seguimiento",
    text: "Revisamos consultas, páginas y contactos para decidir qué optimizaciones conviene priorizar.",
    href: "/servicios/seo",
    link: "Conocer el servicio SEO",
  },
];

export function MetricsSection() {
  return (
    <section id="criterios" className="relative py-24 lg:py-32 border-y border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Cabecera limpia y directa */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <h2 className="reveal text-4xl lg:text-6xl font-display tracking-tight">
            Criterios claros. <br />
            <span className="text-muted-foreground">Trabajo que puedes valorar.</span>
          </h2>
        </div>

        {/* Tarjetas limpias de compromisos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {commitments.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="reveal group flex flex-col justify-between p-8 lg:p-12 rounded-3xl border border-foreground/[0.08] bg-card/60 hover:bg-card hover:border-foreground/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <h3 className="text-2xl lg:text-3xl font-display tracking-tight text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-foreground/[0.06] flex items-center justify-between">
                <span className="text-sm lg:text-base font-medium font-display text-foreground/80 group-hover:text-foreground transition-colors">
                  {item.link}
                </span>
                <div className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center bg-foreground/[0.02] group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-foreground/60 group-hover:text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
