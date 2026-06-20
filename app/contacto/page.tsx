import type { Metadata } from "next";
import { ContactoContent } from "@/components/servicios/contacto-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Contacto en Oviedo y Presupuesto SEO en Asturias | LTEvo",
  description:
    "¿Necesitas una web o SEO? Contacta con LTEvo en Oviedo y solicita tu presupuesto gratis. Te respondemos en menos de 24 horas en Asturias.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto en Oviedo y Presupuesto SEO en Asturias | LTEvo",
    description:
      "¿Necesitas una web o SEO? Contacta con LTEvo en Oviedo y solicita tu presupuesto gratis. Te respondemos en menos de 24 horas en Asturias.",
    url: "https://ltevo.com/contacto",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "name": "Contacto — LTEvo",
      "description": "Ponte en contacto con LTEvo para solicitar un presupuesto sin compromiso para tu proyecto de diseño web, SEO o mantenimiento.",
      "url": "https://ltevo.com/contacto",
      "mainEntity": {
        "@type": "ProfessionalService",
        "@id": "https://ltevo.com/#business"
      }
    }
  ]
};

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <ContactoContent />
      <FooterSection />
    </>
  );
}
