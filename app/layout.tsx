import type { Metadata } from "next";
import {
  Instrument_Sans,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "LTEvo | Agencia de Diseño Web en Oviedo",
  description: "Agencia de diseño web en Oviedo. Creamos webs profesionales, tiendas eCommerce y optimización SEO para empresas y negocios de Asturias.",
  keywords: [
    "diseño web oviedo",
    "agencia web asturias",
    "seo oviedo",
    "tienda online asturias",
    "desarrollo web oviedo",
    "paginas web profesionales",
    "agencia diseño web oviedo",
    "ecommerce asturias",
  ],
  authors: [{ name: "LTEvo" }],
  creator: "LTEvo",
  metadataBase: new URL("https://ltevo.com"),
  openGraph: {
    title: "LTEvo | Agencia de Diseño Web en Oviedo",
    description: "Webs profesionales, eCommerce y SEO para empresas en Asturias.",
    url: "https://ltevo.com",
    siteName: "LTEvo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LTEvo | Agencia de Diseño Web en Oviedo",
    description: "Webs profesionales, eCommerce y SEO para empresas en Asturias.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://ltevo.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "LTEvo",
  description:
    "Agencia de diseño web en Oviedo especializada en webs profesionales, eCommerce y SEO.",
  url: "https://ltevo.com",
  logo: "https://ltevo.com/logo.png",
  email: "info@ltevo.com",
  telephone: "+34 634 25 55 41",
  priceRange: "€€",
  areaServed: "Asturias",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oviedo",
    addressRegion: "Asturias",
    addressCountry: "ES",
  },
  serviceType: [
    "Diseño Web",
    "SEO",
    "eCommerce",
    "Optimización Web",
    "Mantenimiento Web",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}