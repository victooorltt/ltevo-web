import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { HostingContent } from "@/components/servicios/hosting-content";

const service = servicePages["hosting"];
const path = "/servicios/hosting";
const description = "Hosting gestionado y alojamiento web en Oviedo y Asturias: servidor, migración, copias de seguridad y soporte técnico. Solicita una propuesta a medida.";
export const metadata = pageMetadata(service.title, description, path);

const schema = servicePageSchema({
  path,
  name: service.heading,
  description,
  serviceType: "Hosting gestionado y alojamiento web para empresas",
  subjectOf: [
    { name: "Qué incluye el mantenimiento web y cómo elegir plan", path: "/blog/que-incluye-mantenimiento-web" },
    { name: "Qué es el Crawl Budget y Cómo Optimizarlo en tu Web", path: "/blog/que-es-el-crawl-budget" },
    { name: "PrestaShop vs WooCommerce: Cuál Elegir para tu Tienda Online", path: "/blog/prestashop-vs-woocommerce" },
  ],
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
