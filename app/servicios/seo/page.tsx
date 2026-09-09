import type { Metadata } from "next";
import { SeoContent, faqs } from "@/components/servicios/seo-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Posicionamiento SEO Profesional en Oviedo y Asturias",
  description:
    "Agencia de posicionamiento SEO en Oviedo y Asturias. Optimizamos tu web para captar tráfico orgánico de calidad y multiplicar tus ventas en Google.",
  alternates: { canonical: "/servicios/seo" },
  openGraph: {
    title: "Posicionamiento SEO Profesional en Oviedo y Asturias",
    description:
      "Agencia de posicionamiento SEO en Oviedo y Asturias. Optimizamos tu web para captar tráfico orgánico de calidad y multiplicar tus ventas en Google.",
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
      "@id": "https://ltevo.com/servicios/seo#breadcrumb",
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
          name: "Posicionamiento SEO Profesional",
          item: "https://ltevo.com/servicios/seo"
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
