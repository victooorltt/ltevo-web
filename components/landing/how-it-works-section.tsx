"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Descubrimiento",
    description:
      "Nos reunimos contigo para entender tu negocio, tus objetivos y tu audiencia. Sin tecnicismos, solo escuchamos y tomamos nota de lo que necesitas.",
    tag: "Kickoff",
    side: "left",
  },
  {
    number: "II",
    title: "Exploración",
    description:
      "Analizamos tu sector y tu competencia. Definimos la arquitectura, el diseño y la estrategia antes de escribir una sola línea de código.",
    tag: "Estrategia & Diseño",
    side: "right",
  },
  {
    number: "III",
    title: "Implementación",
    description:
      "Desarrollamos tu web con precisión. Puedes dar feedback en tiempo real hasta que el resultado sea exactamente lo que imaginabas.",
    tag: "Desarrollo",
    side: "left",
  },
  {
    number: "IV",
    title: "Despliegue",
    description:
      "Lanzamos tu web al mundo. Dominio, hosting, rendimiento y ajustes finales para que salga perfecta desde el primer día.",
    tag: "Lanzamiento",
    side: "right",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="border border-background/10 p-8 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-display text-5xl text-background/20">{step.number}</span>
          <span className="text-xs font-mono text-background/40 border border-background/15 rounded-full px-3 py-1">
            {step.tag}
          </span>
        </div>
        {/* Content */}
        <div>
          <h3 className="text-2xl lg:text-3xl font-display mb-3">{step.title}</h3>
          <p className="text-background/60 leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
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

  const leftSteps  = steps.filter((s) => s.side === "left");
  const rightSteps = steps.filter((s) => s.side === "right");

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Así trabajamos contigo.
            <br />
            <span className="text-background/50">Sin sorpresas, sin rodeos.</span>
          </h2>
        </div>

        {/* Grid de dos columnas */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Columna izquierda: I y III */}
          <div className="flex flex-col gap-6">
            {leftSteps.map((step) => (
              <StepCard
                key={step.number}
                step={step}
                index={steps.indexOf(step)}
              />
            ))}
          </div>

          {/* Columna derecha: II y IV — desplazada hacia abajo */}
          <div className="flex flex-col gap-6 lg:mt-24">
            {rightSteps.map((step) => (
              <StepCard
                key={step.number}
                step={step}
                index={steps.indexOf(step)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}