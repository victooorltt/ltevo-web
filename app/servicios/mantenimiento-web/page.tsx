import type { Metadata } from "next";
import { MantenimientoWebContent } from "@/components/servicios/mantenimiento-web-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Mantenimiento Web Profesional y Soporte Técnico | LTEvo",
  description:
    "Asegura la seguridad, velocidad y estabilidad de tu sitio web. Planes de mantenimiento web a medida, actualizaciones y backups semanales/diarios en España.",
  alternates: { canonical: "/servicios/mantenimiento-web" },
  openGraph: {
    title: "Mantenimiento Web Profesional y Soporte Técnico | LTEvo",
    description:
      "Asegura la seguridad, velocidad y estabilidad de tu sitio web. Planes de mantenimiento web a medida, actualizaciones y backups semanales/diarios en España.",
    url: "https://ltevo.com/servicios/mantenimiento-web",
    type: "website",
  },
};

export default function MantenimientoWebPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <Navigation />
      <MantenimientoWebContent />
      <FooterSection />
    </main>
  );
}
