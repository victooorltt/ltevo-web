import type { Metadata } from "next";
import { MantenimientoWebContent } from "@/components/servicios/mantenimiento-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Mantenimiento Web Profesional en Oviedo y Asturias | LTEvo",
  description:
    "Soporte técnico y mantenimiento web en Oviedo y Asturias. Protegemos tu web con copias de seguridad, actualizaciones y optimización de velocidad continua.",
  alternates: { canonical: "/servicios/mantenimiento-web" },
  openGraph: {
    title: "Mantenimiento Web Profesional en Oviedo y Asturias | LTEvo",
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
        "offerCount": "3",
        "offers": [
          {
            "@type": "Offer",
            "name": "Plan Básico",
            "price": "29.99",
            "priceCurrency": "EUR",
            "url": "https://ltevo.com/servicios/mantenimiento-web"
          },
          {
            "@type": "Offer",
            "name": "Plan Profesional",
            "price": "39.99",
            "priceCurrency": "EUR",
            "url": "https://ltevo.com/servicios/mantenimiento-web"
          },
          {
            "@type": "Offer",
            "name": "Plan Premium",
            "price": "49.99",
            "priceCurrency": "EUR",
            "url": "https://ltevo.com/servicios/mantenimiento-web"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltevo.com/servicios/mantenimiento-web#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué es el mantenimiento web y por qué es necesario?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El mantenimiento web es el proceso preventivo y correctivo que garantiza que un sitio web funcione de forma óptima, segura y sin interrupciones. Es fundamental para evitar hackeos, errores de compatibilidad y pérdida de información."
          }
        },
        {
          "@type": "Question",
          "name": "¿Puedo cambiar de plan en cualquier momento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. No hay contratos de permanencia a largo plazo. Puedes subir o bajar de plan, o cancelar el servicio en cualquier momento notificándolo antes del inicio del siguiente ciclo de facturación."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa si consumo la hora de cambios de mi plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Si necesitas tareas de desarrollo o cambios que superen el tiempo asignado mensualmente en tu plan, te ofreceremos un presupuesto cerrado o tarificaremos el tiempo adicional a un precio por hora preferente para clientes de mantenimiento."
          }
        },
        {
          "@type": "Question",
          "name": "¿La cuota mensual incluye el alojamiento y dominio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No de forma predeterminada, pero podemos gestionar tu servidor actual o migrar tu sitio a nuestros servidores optimizados de alta performance si contratas un plan conjunto de alojamiento y mantenimiento."
          }
        },
        {
          "@type": "Question",
          "name": "¿Ofrecéis garantía de desinfección ante hackeos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En el plan Premium incluimos una garantía completa de desinfección y limpieza de malware sin costes adicionales. En los planes Básico y Profesional te ayudaremos a restaurar copias de seguridad limpias o presupuestaremos la desinfección manual."
          }
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
