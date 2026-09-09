import { ChevronDown } from "lucide-react";
import Link from "next/link";

/* Sección FAQ reutilizable. Server component: <details>/<summary> nativos con
   acordeón animado estilo Apple. Si no se pasan props, usa las FAQs de la home
   y genera el JSON-LD de schema.org. */
export type FaqItem = {
  question: string;
  answer: string;
  more?: { text: string; href: string };
};

export const homeFaqs: FaqItem[] = [
  {
    question: "¿Cuánto cuesta una página web?",
    answer: "Depende del alcance del proyecto: cada web se presupuesta a medida tras una primera conversación sin coste, con una propuesta cerrada y sin sorpresas. Para el mantenimiento posterior dispones de planes mensuales desde 29,99 € al mes, sin permanencia.",
  },
  {
    question: "¿Cuánto tardáis en tener mi web lista?",
    answer: "El plazo habitual de entrega es de entre 3 y 6 semanas. Los proyectos con integraciones avanzadas pueden requerir más tiempo, y lo acordamos contigo en la fase inicial de planificación.",
  },
  {
    question: "¿Incluye soporte y mantenimiento una vez lanzada la web?",
    answer: "Sí. Tras el lanzamiento incluimos 30 días de soporte de garantía gratuito. Después puedes contratar un plan de mantenimiento mensual con copias de seguridad, actualizaciones y soporte prioritario, siempre sin permanencia.",
  },
  {
    question: "¿Mi web va a aparecer en Google?",
    answer: "Todas nuestras webs se entregan con una base SEO técnica sólida: código semántico, datos estructurados y carga ultrarrápida. Para posicionar de forma competitiva acompañamos el proyecto con una estrategia SEO continua; los primeros resultados suelen notarse a partir del tercer mes.",
  },
  {
    question: "¿Con qué tecnologías desarrolláis?",
    answer: "Trabajamos con Next.js, React, TypeScript y Tailwind CSS. Evitamos plantillas lentas: así garantizamos la máxima velocidad de carga, seguridad y una web totalmente autogestionable que crece con tu negocio.",
  },
];

export interface FaqSectionProps {
  badge?: string;
  title?: string;
  faqs?: FaqItem[];
  includeJsonLd?: boolean;
}

export function FaqSection({
  badge = "Resolvemos tus dudas",
  title = "Preguntas frecuentes",
  faqs = homeFaqs,
  includeJsonLd = true,
}: FaqSectionProps = {}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 lg:py-32 bg-stone-50 border-t border-b border-foreground/5 font-display">
      {includeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="reveal text-center mb-16">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium text-foreground/75 bg-foreground/[0.04] border border-foreground/[0.08] tracking-wide mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
            {title}
          </h2>
        </div>

        <div className="reveal w-full space-y-4" style={{ animationDelay: "0.1s" }}>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-foreground/[0.08] px-6 lg:px-8 py-1 bg-background hover:border-foreground/20 hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              <summary className="flex items-center justify-between gap-4 py-5 text-left text-lg font-display cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="pr-2">{faq.question}</span>
                <div className="size-8 rounded-full bg-foreground/[0.04] flex items-center justify-center text-muted-foreground group-open:bg-foreground group-open:text-background transition-all duration-300 shrink-0">
                  <ChevronDown className="size-4 pointer-events-none transition-transform duration-300 group-open:rotate-180" />
                </div>
              </summary>
              <p className="text-muted-foreground leading-relaxed pb-6 text-sm lg:text-base">
                {faq.answer}
                {faq.more && (
                  <>
                    {" "}
                    <Link
                      href={faq.more.href}
                      className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                    >
                      {faq.more.text}
                    </Link>
                    .
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
