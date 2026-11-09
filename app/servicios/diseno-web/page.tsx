import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { DisenoWebContent } from "@/components/servicios/diseno-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const path = "/servicios/diseno-web";
const description = "Diseño de páginas web para empresas en Oviedo y Asturias: webs corporativas, adaptación móvil y SEO inicial. Consulta proyectos y pide presupuesto.";
export const metadata = pageMetadata("Diseño de páginas web en Oviedo y Asturias", description, path);

const schema = servicePageSchema({
  path,
  name: "Diseño de páginas web para empresas en Oviedo y Asturias",
  description,
  serviceType: "Diseño de páginas web y webs corporativas",
  subjectOf: [
    { name: "Cómo elegir una agencia de diseño web", path: "/blog/como-elegir-agencia-de-diseno-web" },
    { name: "UX y UI: Qué Son y Por Qué tu Web los Necesita para Vender Más", path: "/blog/que-es-ux-y-ui" },
    { name: "Cómo Crear un Blog Corporativo Paso a Paso (Sin Morir en el Intento)", path: "/blog/como-crear-un-blog-corporativo" },
    { name: "Diseño Web vs Desarrollo Web: La Guía para Entender la Diferencia", path: "/blog/diseno-web-vs-desarrollo-web" },
    { name: "Kit Digital en 2026: Preguntas Frecuentes, Plazos y Errores", path: "/blog/kit-digital-preguntas-frecuentes" },
    { name: "Inteligencia Artificial en Diseño Web: Cómo Está Cambiando el Sector", path: "/blog/inteligencia-artificial-en-diseno-web" },
  ],
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
