import type { Metadata } from "next";
import { SeoContent } from "@/components/servicios/seo-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Posicionamiento SEO Profesional | LTEvo",
  description:
    "Agencia de posicionamiento SEO en España. Optimizamos tu presencia online para destacar en buscadores, captar tráfico de calidad y multiplicar tus clientes orgánicos.",
  alternates: { canonical: "/servicios/seo" },
  openGraph: {
    title: "Posicionamiento SEO Profesional | LTEvo",
    description:
      "Agencia de posicionamiento SEO en España. Optimizamos tu presencia online para destacar en buscadores, captar tráfico de calidad y multiplicar tus clientes orgánicos.",
    url: "https://ltevo.com/servicios/seo",
    type: "website",
  },
};

export default function SeoPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <Navigation />
      <SeoContent />
      <FooterSection />
    </main>
  );
}
