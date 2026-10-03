import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TiendasOnlineContent } from "@/components/servicios/tiendas-online-content";

const service = servicePages["tiendas-online"];
const path = "/servicios/tiendas-online";
export const metadata = pageMetadata(service.title, service.description, path);

const schema = servicePageSchema({
  path,
  name: service.heading,
  description: service.description,
  serviceType: "Diseño y desarrollo de tiendas online",
});

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="contenido">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
        <TiendasOnlineContent service={service} />
      </main>
      <FooterSection />
    </>
  );
}
