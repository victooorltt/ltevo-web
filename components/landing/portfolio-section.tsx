"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "CAO",
    description: "Diseño web corporativo con identidad visual moderna y experiencia de usuario optimizada para conversión.",
    url: "https://cao-brown.vercel.app/",
    image: "/portfolio/cao.png",
    tags: ["Diseño Web", "Identidad Visual"],
  },
  {
    number: "02",
    title: "Jardinería El Cuetu",
    description: "Web para empresa de jardinería local con diseño orgánico, galería de trabajos y formulario de contacto integrado.",
    url: "https://jardineria-elcuetu.vercel.app/",
    image: "/portfolio/cuetu.png",
    tags: ["Diseño Web", "SEO Local"],
  },
];

export function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Portafolio
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Proyectos reales.
            <br />
            <span className="text-muted-foreground">Resultados que se ven.</span>
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
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-foreground/10 hover:border-foreground/30 transition-all duration-500 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid lg:grid-cols-2">

          {/* Imagen */}
          <div className="relative overflow-hidden bg-foreground/[0.03] aspect-video lg:aspect-auto lg:min-h-[380px]">
            <img
              src={project.image}
              alt={`Proyecto ${project.title}`}
              className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
            {/* Overlay sutil */}
            <div className={`absolute inset-0 bg-foreground transition-opacity duration-500 ${
              isHovered ? "opacity-0" : "opacity-[0.04]"
            }`} />
          </div>

          {/* Contenido */}
          <div className="flex flex-col justify-between p-8 lg:p-12">
            <div>
              {/* Número y flecha */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-muted-foreground">{project.number}</span>
                <div className={`w-10 h-10 border border-foreground/10 flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "bg-foreground border-foreground" : ""
                }`}>
                  <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${
                    isHovered ? "text-background" : "text-foreground/40"
                  }`} />
                </div>
              </div>

              {/* Título */}
              <h3 className={`text-4xl lg:text-5xl font-display tracking-tight mb-4 transition-transform duration-500 ${
                isHovered ? "translate-x-2" : "translate-x-0"
              }`}>
                {project.title}
              </h3>

              {/* Descripción */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-muted-foreground border border-foreground/10 px-3 py-1 rounded-full"
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