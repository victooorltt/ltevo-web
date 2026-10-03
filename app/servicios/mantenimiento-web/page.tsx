import { pageMetadata, servicePageSchema, jsonLdString, SITE_URL } from "@/lib/seo";
import { contactHref, maintenancePlans } from "@/lib/services";
import { MantenimientoWebContent } from "@/components/servicios/mantenimiento-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const path = "/servicios/mantenimiento-web";
const description = "Mantenimiento web en Oviedo y Asturias desde 29,99 €/mes más IVA. Compara copias, actualizaciones y soporte y consulta la cobertura para tu web.";
export const metadata = pageMetadata("Mantenimiento web en Asturias desde 29,99 €/mes", description, path);

const schema = servicePageSchema({
  path,
  name: "Mantenimiento web en Asturias y Oviedo",
  description,
  serviceType: "Mantenimiento web y soporte técnico",
  offers: maintenancePlans.map((name, index) => ({
    "@type": "Offer" as const,
    name,
    url: `${SITE_URL}${contactHref("mantenimiento-web", name)}`,
    priceSpecification: {
      "@type": "UnitPriceSpecification" as const,
      price: ["29.99", "39.99", "49.99"][index],
      priceCurrency: "EUR" as const,
      unitText: "mes" as const,
      valueAddedTaxIncluded: false as const,
    },
  })),
});

export default function MantenimientoWebPage() {
  return (
    <main id="contenido" className="relative min-h-[100dvh] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      <Navigation />
      <MantenimientoWebContent />
      <FooterSection />
    </main>
  );
}
