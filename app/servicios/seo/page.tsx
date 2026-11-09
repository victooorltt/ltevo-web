import { pageMetadata, servicePageSchema, jsonLdString } from "@/lib/seo";
import { SeoContent } from "@/components/servicios/seo-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const path = "/servicios/seo";
const description = "Agencia SEO y posicionamiento web en Oviedo y Asturias: auditoría, SEO local, contenidos y captación de contactos. Solicita una revisión inicial sin coste.";
export const metadata = pageMetadata("Agencia SEO en Oviedo y Asturias", description, path);

const schema = servicePageSchema({
  path,
  name: "SEO para empresas en Oviedo y Asturias",
  description,
  serviceType: "Agencia SEO, posicionamiento web orgánico y SEO local",
  subjectOf: [
    { name: "Por Qué mi Web no Aparece en Google (y Cómo Solucionarlo)", path: "/blog/por-que-mi-web-no-aparece-en-google" },
    { name: "Qué es el SEO y Para Qué Sirve Realmente (Guía 2026)", path: "/blog/que-es-el-seo" },
    { name: "12 Beneficios Reales de Tener un Blog Corporativo en tu Web", path: "/blog/beneficios-blog-corporativo" },
    { name: "Qué es el Crawl Budget y Cómo Optimizarlo en tu Web", path: "/blog/que-es-el-crawl-budget" },
    { name: "Qué es Google Search Console y Cómo Configurarlo desde Cero", path: "/blog/que-es-google-search-console" },
    { name: "Qué es el Link Juice y Cómo Aprovecharlo con tu Enlazado Interno", path: "/blog/que-es-el-link-juice" },
    { name: "Rich Snippets: Qué Son y Cómo Conseguirlos en tus Resultados de Google", path: "/blog/que-son-los-rich-snippets" },
    { name: "Qué es el Thin Content y Cómo Mejorar Contenido Poco Útil", path: "/blog/que-es-el-thin-content" },
    { name: "Las Mejores Herramientas SEO Gratuitas (y de Pago) en 2026", path: "/blog/mejores-herramientas-seo" },
    { name: "Cómo Atraer Más Clientes a tu Web sin Depender Solo de Anuncios", path: "/blog/como-attraer-clientes-a-mi-web" },
  ],
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
