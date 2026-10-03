import { ChevronDown } from "lucide-react";
import Link from "next/link";

/* Sección FAQ reutilizable. Server component: <details>/<summary> nativos con
   acordeón animado estilo Apple. Si no se pasan props, usa las FAQs de la home.
   El marcado FAQ es opcional: Google retiró ese resultado enriquecido en 2026. */
export type FaqItem = {
  question: string;
  answer: string;
  more?: { text: string; href: string };
};

export const homeFaqs: FaqItem[] = [
  {
    question: "¿Cuánto cuesta una página web?",
    answer: "El precio depende de las páginas, contenidos y funciones. Tras una primera conversación sin coste, preparamos una propuesta con entregables, revisiones y calendario. Hosting, dominio y SEO continuo se detallan por separado; el mantenimiento comienza en 29,99 € al mes más IVA.",
    more: { text: "Consultar diseño de páginas web", href: "/servicios/diseno-web" },
  },
  {
    question: "¿Cuánto tardáis en tener mi web lista?",
    answer: "El calendario se fija después de definir las páginas y funciones. También depende de los textos, imágenes, accesos y revisiones necesarios. Una tienda o una aplicación con integraciones requiere su propia planificación, que se recoge en la propuesta.",
  },
  {
    question: "¿Incluye soporte y mantenimiento una vez lanzada la web?",
    answer: "Incluimos 30 días de soporte de garantía tras el lanzamiento, con el alcance definido en la propuesta. Para atención continuada puedes contratar mantenimiento mensual sin permanencia: las copias, actualizaciones y canales de soporte dependen del plan y la tecnología de tu web.",
    more: { text: "Comparar mantenimiento y precios", href: "/servicios/mantenimiento-web" },
  },
  {
    question: "¿Mi web va a aparecer en Google?",
    answer: "Preparamos la estructura, los títulos y la configuración técnica acordados para facilitar el rastreo y la comprensión de la web. La indexación y las posiciones las decide Google. Para competir por búsquedas de contratación, el SEO continuo trabaja contenidos, técnica, enlaces y seguimiento de contactos.",
    more: { text: "Conocer el servicio SEO", href: "/servicios/seo" },
  },
  {
    question: "¿Con qué tecnologías desarrolláis?",
    answer: "Desarrollamos a medida con Next.js, React y TypeScript cuando encajan con el proyecto. Para una tienda valoramos la plataforma según catálogo y operativa. Acordamos qué contenido podrás editar, los accesos y la formación; la elección de tecnología depende de tus necesidades.",
    more: { text: "Ver desarrollo web e integraciones", href: "/servicios/desarrollo-web" },
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
  includeJsonLd = false,
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
                {/* <span> y no <div>: summary solo admite phrasing content.
                    Mismas clases exactas, así que el render es idéntico. */}
                <span className="size-8 rounded-full bg-foreground/[0.04] flex items-center justify-center text-muted-foreground group-open:bg-foreground group-open:text-background transition-all duration-300 shrink-0">
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 pointer-events-none transition-transform duration-300 group-open:rotate-180"
                  />
                </span>
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
