import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ProjectsContent } from "@/components/proyectos/projects-content";
import { projects } from "@/lib/projects";
import { breadcrumbs, jsonLdString, pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata(
  "Proyectos web: diseño y desarrollo a medida",
  "Explora los proyectos de diseño web y desarrollo a medida de LTEvo. Soluciones reales enfocadas en rendimiento, identidad de marca y captación de clientes.",
  "/proyectos"
);

export default function ProjectsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/proyectos#page`,
        url: `${SITE_URL}/proyectos`,
        name: "Proyectos web de LTEvo",
        description: "Portfolio de proyectos de diseño web y desarrollo a medida por LTEvo.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              "@id": `${SITE_URL}/proyectos#${project.slug}`,
              name: project.title,
              url: project.url,
            },
          })),
        },
      },
      breadcrumbs([
        { name: "Inicio", path: "/" },
        { name: "Proyectos", path: "/proyectos" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
      />
      <Navigation />
      <main id="contenido">
        <ProjectsContent />
      </main>
      <FooterSection />
    </>
  );
}
