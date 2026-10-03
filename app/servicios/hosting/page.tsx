import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { HostingContent } from "@/components/servicios/hosting-content";

const service = servicePages["hosting"];
const path = "/servicios/hosting";
export const metadata = pageMetadata(service.title, service.description, path);

const schema = servicePageSchema({
  path,
  name: service.heading,
  description: service.description,
  serviceType: "Alojamiento web gestionado",
});

export default function Page() {
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
