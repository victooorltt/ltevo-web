import type { Metadata } from "next";
import { MantenimientoWebContent, faqs } from "@/components/servicios/mantenimiento-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Mantenimiento Web Profesional en Oviedo y Asturias",
  description:
    "Soporte técnico y mantenimiento web en Oviedo y Asturias. Protegemos tu web con copias de seguridad, actualizaciones y optimización de velocidad continua.",
  alternates: { canonical: "/servicios/mantenimiento-web" },
  openGraph: {
    title: "Mantenimiento Web Profesional en Oviedo y Asturias",
    description:
      "Soporte técnico y mantenimiento web en Oviedo y Asturias. Protegemos tu web con copias de seguridad, actualizaciones y optimización de velocidad continua.",
    url: "https://ltevo.com/servicios/mantenimiento-web",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/mantenimiento-web#service",
      "name": "Mantenimiento Web y Soporte Técnico",
      "description": "Mantenimiento preventivo y soporte técnico continuo para sitios web. Copias de seguridad diarias, optimización de velocidad, actualizaciones de seguridad y resolución rápida de incidencias en España.",
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
      "serviceType": "Web Maintenance and Support",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "29.99",
        "highPrice": "49.99",
        "offerCount": "3"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltevo.com/servicios/mantenimiento-web#faq",
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
      "@id": "https://ltevo.com/servicios/mantenimiento-web#breadcrumb",
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
          name: "Mantenimiento Web y Soporte Técnico",
          item: "https://ltevo.com/servicios/mantenimiento-web"
        }
      ]
    }
  ]
};

export default function MantenimientoWebPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <MantenimientoWebContent />
      <FooterSection />
    </main>
  );
}
