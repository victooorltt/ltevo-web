import { pageMetadata, breadcrumbs, jsonLdString, SITE_URL } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { DesarrolloWebContent } from "@/components/servicios/desarrollo-web-content";

const service = servicePages["desarrollo-web"];
export const metadata = pageMetadata(service.title, service.description, "/servicios/desarrollo-web");

export default function Page() {
  const path = "/servicios/desarrollo-web";
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
        <DesarrolloWebContent service={service} />
      </main>
      <FooterSection />
    </>
  );
}
