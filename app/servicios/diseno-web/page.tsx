import type { Metadata } from "next";
import { DisenoWebContent } from "@/components/servicios/diseno-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Diseño Web Profesional a Medida | LTEvo",
  description:
    "Diseño y desarrollo de páginas web profesionales a medida en España. Sitios web rápidos, optimizados para SEO y adaptados a dispositivos móviles.",
  alternates: { canonical: "/servicios/diseno-web" },
  openGraph: {
    title: "Diseño Web Profesional a Medida | LTEvo",
    description:
      "Diseño y desarrollo de páginas web profesionales a medida en España. Sitios web rápidos, optimizados para SEO y adaptados a dispositivos móviles.",
    url: "https://ltevo.com/servicios/diseno-web",
    type: "website",
  },
};

export default function DisenoWebPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <DisenoWebContent />
      <FooterSection />
    </main>
  );
}
