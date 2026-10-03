import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { SeoContent } from "@/components/servicios/seo-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const path = "/servicios/seo";
const description = "SEO para empresas de Oviedo y Asturias: auditoría, implementación, SEO local y seguimiento de contactos. Solicita una revisión inicial sin coste.";
export const metadata = pageMetadata("Agencia SEO en Oviedo y Asturias", description, path);

const schema = servicePageSchema({
  path,
  name: "SEO para empresas en Oviedo y Asturias",
  description,
  serviceType: "Auditoría SEO, posicionamiento orgánico y SEO local",
});

export default function SeoPage() {
  return (
    <main id="contenido" className="relative min-h-[100dvh] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      <Navigation />
      <SeoContent />
      <FooterSection />
    </main>
  );
}
