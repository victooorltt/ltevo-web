import type { Metadata } from "next";
import { ContactoContent } from "@/components/servicios/contacto-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { maintenancePlans, normalizeContactService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contacta con LTEvo · Presupuesto web y SEO en Oviedo",
  description:
    "Solicita una propuesta de diseño, desarrollo, SEO, hosting o mantenimiento. Cuéntanos tu proyecto y definimos alcance y presupuesto desde Oviedo.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacta con LTEvo · Presupuesto web y SEO en Oviedo",
    description:
      "Solicita una propuesta de diseño, desarrollo, SEO, hosting o mantenimiento. Cuéntanos tu proyecto y definimos alcance y presupuesto desde Oviedo.",
    url: "https://ltevo.com/contacto",
    siteName: "LTEvo",
    locale: "es_ES",
    type: "website",
    // Al definir openGraph propio se pierde el og:image heredado del raíz
    // (app/opengraph-image.jpg por convención de fichero): lo restauramos,
    // incluyendo el alt para no perder el de app/opengraph-image.alt.txt.
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "LTEvo - Agencia de Diseño Web en Oviedo",
      },
    ],
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

export default async function ContactoPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const service = normalizeContactService(typeof params.servicio === "string" ? params.servicio : "");
  const plan = typeof params.plan === "string" && maintenancePlans.some((item) => item === params.plan) ? params.plan : "";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      {/* /contacto era la única página sin landmark <main>: es el destino de
          todos los CTA del sitio y el skip-link necesita un destino. */}
      <main id="contenido">
        <ContactoContent key={`${service}:${plan}`} initialService={service} initialPlan={plan} />
      </main>
      <FooterSection />
    </>
  );
}
