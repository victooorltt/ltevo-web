"use client";

import React, { useState } from "react";

const testimonials = [
  {
    quote: "Renovaron nuestra web por completo. El primer mes duplicamos los contactos recibidos.",
    author: "Carlos Martínez",
    role: "Gerente",
    company: "de inmobiliaria",
  },
  {
    quote: "Nuestra tienda era lenta y perdíamos ventas. Tras la optimización, convertimos mucho más.",
    author: "Laura Gómez",
    role: "Propietaria",
    company: "de e-commerce",
  },
  {
    quote: "Empezamos a aparecer en Google para búsquedas clave. El tráfico no para de crecer.",
    author: "Alejandro Torres",
    role: "Dueño",
    company: "de clínica",
  },
  {
    quote: "Proceso muy transparente y resultado por encima de lo esperado. Totalmente recomendable.",
    author: "Marta Iglesias",
    role: "CEO",
    company: "Estudio Iglesias",
  },
];

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(160deg, #ffffff 0%, #f3f3f3 100%)",
  boxShadow: `
    inset 0 1px 0 0 rgba(255,255,255,1),
    inset 0 -1px 0 0 rgba(0,0,0,0.06),
    0 4px 6px rgba(0,0,0,0.06),
    0 12px 28px rgba(0,0,0,0.1)
  `,
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.08)",
};

const cardHoverStyle: React.CSSProperties = {
  ...cardStyle,
  transform: "translateY(-4px)",
  boxShadow: `
    inset 0 1px 0 0 rgba(255,255,255,1),
    inset 0 -1px 0 0 rgba(0,0,0,0.06),
    0 8px 16px rgba(0,0,0,0.1),
    0 20px 48px rgba(0,0,0,0.15)
  `,
};

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-amber-400"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...(hovered ? cardHoverStyle : cardStyle),
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      className="flex flex-col gap-6 p-8 snap-center shrink-0 w-[85vw] sm:w-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StarRating />

      <p className="text-base leading-relaxed flex-1" style={{ color: "rgba(0,0,0,0.75)" }}>
        "{t.quote}"
      </p>

      <div
        className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03))",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <span className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.8)" }}>
            {t.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.85)" }}>
            {t.author}
          </p>
          <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
            {t.role} {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Lo que dicen nuestros clientes
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-6 px-6 py-8 -my-8 scroll-px-6 sm:mx-0 sm:px-0 sm:py-0 sm:my-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}