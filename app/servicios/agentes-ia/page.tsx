import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { AgentesIaContent } from "@/components/servicios/agentes-ia-content";

const service = servicePages["agentes-ia"];
const path = "/servicios/agentes-ia";
export const metadata = pageMetadata(service.title, service.description, path);

const schema = servicePageSchema({
  path,
  name: service.heading,
  description: service.description,
  serviceType: "Agentes de inteligencia artificial y automatización de procesos para empresas",
});

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="contenido">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
        <AgentesIaContent service={service} />
      </main>
      <FooterSection />
    </>
  );
}
