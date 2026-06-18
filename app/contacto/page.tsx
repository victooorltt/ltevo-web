import type { Metadata } from "next";
import { ContactoContent } from "@/components/servicios/contacto-content";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Contacto | Solicita tu Presupuesto Gratis | LTEvo",
  description:
    "Contacta con LTEvo para solicitar tu presupuesto de diseño web o posicionamiento SEO gratis y sin compromiso. Te respondemos en menos de 24 horas.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Solicita tu Presupuesto Gratis | LTEvo",
    description:
      "Contacta con LTEvo para solicitar tu presupuesto de diseño web o posicionamiento SEO gratis y sin compromiso. Te respondemos en menos de 24 horas.",
    url: "https://ltevo.com/contacto",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Navigation />
      <ContactoContent />
      <FooterSection />
    </>
  );
}
