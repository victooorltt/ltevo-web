import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Autocaravanas Bahía",
    description: "Web bilingüe para empresa de alquiler de autocaravanas en Alicante, con flota, mapa interactivo de rutas y solicitud de reserva.",
    url: "https://www.autocaravanasbahia.es/",
    image: "/portfolio/Autocaravanasbahia.webp",
    tags: ["Diseño Web", "Multiidioma"],
  },
  {
    number: "02",
    title: "CAO",
    description: "Diseño web corporativo con identidad visual moderna y experiencia de usuario optimizada para conversión.",
    url: "https://cao-brown.vercel.app/",
    image: "/portfolio/cao.webp",
    tags: ["Diseño Web", "Identidad Visual"],
  },
  {
    number: "03",
    title: "Jardinería El Cuetu",
    description: "Web para empresa de jardinería local con diseño orgánico, galería de trabajos y formulario de contacto integrado.",
    url: "https://jardineria-elcuetu.vercel.app/",
    image: "/portfolio/cuetu.webp",
    tags: ["Diseño Web", "SEO Local"],
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="reveal text-4xl lg:text-6xl font-display tracking-tight">
            Proyectos reales. <br /> <span className="text-muted-foreground">Resultados que se ven.</span>
          </h2>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div
      className="reveal"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-3xl border border-foreground/[0.08] bg-card/60 hover:bg-card hover:border-foreground/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] transition-all duration-500 overflow-hidden"
      >
        <div className="grid lg:grid-cols-2">

          {/* Imagen con marco redondeado */}
          <div className="p-3 lg:p-4 pb-0 lg:pb-4">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] lg:min-h-[380px] relative bg-foreground/[0.03]">
              <Image
                src={project.image}
                alt={`Proyecto ${project.title}`}
                fill
                sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)"
                className="object-cover object-top transition-transform duration-700 scale-100 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-foreground transition-opacity duration-500 opacity-[0.04] group-hover:opacity-0" />
            </div>
          </div>

          {/* Contenido */}
          <div className="flex flex-col justify-between p-8 lg:p-12">
            <div>
              {/* Flecha circular estilo Apple */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-11 h-11 rounded-full border border-foreground/10 flex items-center justify-center bg-foreground/[0.03] group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transition-colors duration-300 text-foreground/60 group-hover:text-background" />
                </div>
              </div>

              {/* Título */}
              <h3 className="text-3xl lg:text-5xl font-display tracking-tight mb-4 transition-transform duration-500 translate-x-0 group-hover:translate-x-1.5">
                {project.title}
              </h3>

              {/* Descripción */}
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full text-xs font-sans font-medium px-3.5 py-1 bg-foreground/[0.04] border border-foreground/[0.08] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </a>
    </div>
  );
}