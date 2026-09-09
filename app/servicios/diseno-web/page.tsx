import type { Metadata } from "next";
import { DisenoWebContent, faqs } from "@/components/servicios/diseno-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web en Oviedo y Asturias",
  description:
    "Creamos páginas web profesionales, rápidas y a medida en Oviedo y Asturias. Diseño web adaptado a móviles y optimizado para SEO. ¡Pide presupuesto!",
  alternates: { canonical: "/servicios/diseno-web" },
  openGraph: {
    title: "Diseño de Páginas Web en Oviedo y Asturias",
    description:
      "Creamos páginas web profesionales, rápidas y a medida en Oviedo y Asturias. Diseño web adaptado a móviles y optimizado para SEO. ¡Pide presupuesto!",
    url: "https://ltevo.com/servicios/diseno-web",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/diseno-web#service",
      "name": "Diseño Web Profesional a Medida",
      "description": "Diseño y desarrollo web a medida con Next.js y React. Creamos páginas web corporativas de alto rendimiento, optimizadas para SEO, veloces y enfocadas a maximizar la conversión en España.",
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
      "serviceType": "Web Design and Development"
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltevo.com/servicios/diseno-web#faq",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ltevo.com/servicios/diseno-web#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://ltevo.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Diseño Web Profesional a Medida",
          item: "https://ltevo.com/servicios/diseno-web"
        }
      ]
    }
  ]
};

export default function DisenoWebPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <DisenoWebContent />
      <FooterSection />
    </main>
  );
}
