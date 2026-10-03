import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { DesarrolloWebContent } from "@/components/servicios/desarrollo-web-content";

const service = servicePages["desarrollo-web"];
const path = "/servicios/desarrollo-web";
export const metadata = pageMetadata(service.title, service.description, path);

const schema = servicePageSchema({
  path,
  name: service.heading,
  description: service.description,
  serviceType: "Desarrollo de aplicaciones web e integraciones a medida",
});

export default function Page() {
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
