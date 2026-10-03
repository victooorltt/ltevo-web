import { pageMetadata, breadcrumbs, jsonLdString, SITE_URL } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { HostingContent } from "@/components/servicios/hosting-content";

const service = servicePages["hosting"];
export const metadata = pageMetadata(service.title, service.description, "/servicios/hosting");

export default function Page() {
  const path = "/servicios/hosting";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}${path}#service`,
        name: service.heading,
        description: service.description,
        url: `${SITE_URL}${path}`,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          { "@type": "City", name: "Oviedo" },
          { "@type": "AdministrativeArea", name: "Asturias" },
          { "@type": "Country", name: "España" },
        ],
      },
      breadcrumbs([{ name: "Inicio", path: "/" }, { name: service.heading, path }]),
    ],
  };

  return (
    <>
      <Navigation />
      <main id="contenido">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
        <HostingContent service={service} />
      </main>
      <FooterSection />
    </>
  );
}
