import { breadcrumbs, jsonLdString, pageMetadata, SITE_URL } from "@/lib/seo";
import { ContactoContent } from "@/components/servicios/contacto-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { maintenancePlans, normalizeContactService } from "@/lib/services";

const description = "Solicita una propuesta de diseño, desarrollo web, SEO, hosting o mantenimiento. Cuéntanos tu proyecto y definimos alcance y presupuesto desde Oviedo.";
export const metadata = pageMetadata("Contacto y presupuesto de web o SEO en Oviedo", description, "/contacto");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contacto#webpage`,
      "name": "Contacto — LTEvo",
      description,
      "url": `${SITE_URL}/contacto`,
      "inLanguage": "es-ES",
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "mainEntity": {
        "@id": `${SITE_URL}/#business`
      }
    },
    breadcrumbs([{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto" }]),
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
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
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
