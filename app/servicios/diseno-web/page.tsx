import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { DisenoWebContent } from "@/components/servicios/diseno-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const path = "/servicios/diseno-web";
const description = "Webs corporativas para empresas de Oviedo y Asturias: diseño, adaptación móvil y SEO inicial. Consulta proyectos reales y solicita presupuesto.";
export const metadata = pageMetadata("Diseño de páginas web en Oviedo y Asturias", description, path);

const schema = servicePageSchema({
  path,
  name: "Diseño de páginas web para empresas en Oviedo y Asturias",
  description,
  serviceType: "Diseño web corporativo",
});

export default function DisenoWebPage() {
  return (
    <main id="contenido" className="relative min-h-[100dvh] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      <Navigation />
      <DisenoWebContent />
      <FooterSection />
    </main>
  );
}
