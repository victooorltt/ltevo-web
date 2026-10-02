import { pageMetadata } from "@/lib/seo";
import { MantenimientoWebContent, faqs } from "@/components/servicios/mantenimiento-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata = pageMetadata("Mantenimiento web en Asturias desde 29,99 €/mes", "Mantenimiento web en Oviedo y Asturias desde 29,99 €/mes más IVA. Compara planes, copias, actualizaciones y soporte y solicita una propuesta.", "/servicios/mantenimiento-web");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/mantenimiento-web#service",
      "name": "Mantenimiento Web y Soporte Técnico",
      "description": "Mantenimiento web en Oviedo y Asturias con copias de seguridad, actualizaciones y soporte. Frecuencias y tareas definidas por plan; precios mensuales más IVA.",
      "provider": {
        "@type": "ProfessionalService",
        "@id": "https://ltevo.com/#business",
        "name": "LTEvo",
        "url": "https://ltevo.com"
      },
      "areaServed": [
        { "@type": "City", "name": "Oviedo" },
        { "@type": "City", "name": "Gijón" },
        { "@type": "City", "name": "Avilés" },
        { "@type": "AdministrativeArea", "name": "Asturias" },
        { "@type": "Country", "name": "España" }
      ],
      "serviceType": "Web Maintenance and Support",
      "offers": ["29.99", "39.99", "49.99"].map((price, index) => ({
        "@type": "Offer", name: ["Básico", "Profesional", "Premium"][index],
        url: `https://ltevo.com/contacto?servicio=mantenimiento-web&plan=${encodeURIComponent(["Básico", "Profesional", "Premium"][index])}`,
        priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR", unitText: "mes", valueAddedTaxIncluded: false },
      }))
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
    <main id="contenido" className="relative min-h-[100dvh] overflow-x-hidden">
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
