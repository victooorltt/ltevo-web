import { pageMetadata } from "@/lib/seo";
import { SeoContent, faqs } from "@/components/servicios/seo-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata = pageMetadata("Agencia SEO en Oviedo y Asturias", "SEO para empresas en Oviedo y Asturias: diagnóstico, mejoras técnicas, contenidos y seguimiento. Define un plan para captar clientes con LTEvo.", "/servicios/seo");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://ltevo.com/servicios/seo#service",
      "name": "Posicionamiento SEO Profesional",
      "description": "Servicios SEO para empresas de Oviedo y Asturias: diagnóstico, mejoras técnicas, contenidos y seguimiento de consultas y contactos según el alcance acordado.",
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
    <main id="contenido" className="relative min-h-[100dvh] overflow-x-hidden">
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
