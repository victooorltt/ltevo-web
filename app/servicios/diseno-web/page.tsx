import type { Metadata } from "next";
import { DisenoWebContent } from "@/components/servicios/diseno-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web en Oviedo y Asturias | LTEvo",
  description:
    "Creamos páginas web profesionales, rápidas y a medida en Oviedo y Asturias. Diseño web adaptado a móviles y optimizado para SEO. ¡Pide presupuesto!",
  alternates: { canonical: "/servicios/diseno-web" },
  openGraph: {
    title: "Diseño de Páginas Web en Oviedo y Asturias | LTEvo",
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
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo se tarda en diseñar y desarrollar una web?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El plazo de entrega habitual varía entre 3 y 6 semanas, dependiendo de la envergadura y complejidad del proyecto."
          }
        },
        {
          "@type": "Question",
          "name": "¿La web será totalmente autogestionable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Integramos sistemas gestores de contenido sencillos y modernos para que puedas modificar textos, imágenes y crear nuevos apartados sin depender de nosotros."
          }
        },
        {
          "@type": "Question",
          "name": "¿Se adaptará correctamente a dispositivos móviles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutamente. Diseñamos con filosofía 'Mobile-First', garantizando una visualización impecable y un rendimiento excepcional en smartphones, tablets y ordenadores."
          }
        },
        {
          "@type": "Question",
          "name": "¿Incluye soporte y mantenimiento posterior?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, ofrecemos planes opcionales de mantenimiento preventivo, actualizaciones periódicas, copias de seguridad de seguridad diarias y soporte prioritario."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué tecnologías utilizáis para el desarrollo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trabajamos principalmente con Next.js (App Router), React, TypeScript y Tailwind CSS, garantizando así la máxima velocidad de carga del mercado y la mejor base técnica para el SEO."
          }
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
