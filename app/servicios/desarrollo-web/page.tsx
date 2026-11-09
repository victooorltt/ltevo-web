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
  serviceType: "Desarrollo web a medida, aplicaciones web e integraciones",
  subjectOf: [
    { name: "Qué es un Framework de Desarrollo Web (y Por Qué lo Usamos en Cada Proyecto)", path: "/blog/que-es-un-framework-de-desarrollo-web" },
    { name: "Las Mejores Herramientas de Desarrollo Web que Usan los Profesionales", path: "/blog/herramientas-de-desarrollo-web" },
    { name: "Diseño Web vs Desarrollo Web: La Guía para Entender la Diferencia", path: "/blog/diseno-web-vs-desarrollo-web" },
  ],
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
