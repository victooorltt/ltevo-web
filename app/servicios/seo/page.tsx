import type { Metadata } from "next";
import { SeoContent } from "@/components/servicios/seo-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Posicionamiento SEO Profesional | LTEvo",
  description:
    "Agencia de posicionamiento SEO en España. Optimizamos tu presencia online para destacar en buscadores, captar tráfico de calidad y multiplicar tus clientes orgánicos.",
  alternates: { canonical: "/servicios/seo" },
  openGraph: {
    title: "Posicionamiento SEO Profesional | LTEvo",
    description:
      "Agencia de posicionamiento SEO en España. Optimizamos tu presencia online para destacar en buscadores, captar tráfico de calidad y multiplicar tus clientes orgánicos.",
    url: "https://ltevo.com/servicios/seo",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/seo#service",
      "name": "Posicionamiento SEO Profesional",
      "description": "Servicios de posicionamiento SEO técnico, consultoría SEO y optimización on-page/off-page. Multiplicamos la visibilidad orgánica de tu negocio en España para captar clientes cualificados y mejorar el retorno de inversión.",
      "provider": {
        "@type": "ProfessionalService",
        "@id": "https://ltevo.com/#business",
        "name": "LTEvo",
        "url": "https://ltevo.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "serviceType": "Search Engine Optimization"
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltevo.com/servicios/seo#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto se tarda en ver los resultados del SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los resultados en SEO suelen comenzar a ser significativos entre el tercer y sexto mes de trabajo estable. Es una inversión de medio y largo plazo que genera retornos crecientes de forma sostenible."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué diferencia hay entre SEO y SEM (Google Ads)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El SEM consiste en pagar por cada clic en anuncios de pago de forma inmediata. El SEO se enfoca en posicionar orgánicamente tu web sin pagar por clic, lo que construye un activo a largo plazo de visitas gratuitas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Garantizáis el primer puesto en Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ninguna agencia seria puede garantizar la primera posición absoluta porque los algoritmos de Google cambian constantemente y no les pertenecen. Sin embargo, garantizamos una mejora drástica en el tráfico cualificado y en la visibilidad de tus palabras clave clave."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué es el SEO local y por qué lo necesito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El SEO local optimiza tu web y tu perfil de Google Business Profile para que aparezcas cuando los usuarios de tu zona geográfica busquen tus servicios. Es clave para tiendas físicas y servicios de proximidad."
          }
        },
        {
          "@type": "Question",
          "name": "¿Es necesario realizar optimizaciones constantes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Tu competencia también trabaja su SEO, y Google actualiza sus algoritmos cientos de veces al año. Para mantener y mejorar los rankings, es necesario analizar métricas, actualizar contenidos y resolver problemas técnicos de forma recurrente."
          }
        }
      ]
    }
  ]
};

export default function SeoPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <SeoContent />
      <FooterSection />
    </main>
  );
}
