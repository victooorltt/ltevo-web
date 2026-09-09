import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

/* Variable font (wght 100-900, sin limitar pesos). Se cargan normal + italic
   porque varios titulares display usan `italic` (secciones de servicios). */
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Diseño Web Profesional en Oviedo y Asturias | LTEvo",
    template: "%s | LTEvo",
  },
  description: "¿Buscas una web profesional que venda? Agencia de diseño web en Oviedo y Asturias. Creamos páginas web, tiendas online y SEO para hacer crecer tu negocio.",
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
    title: "Diseño Web Profesional en Oviedo y Asturias | LTEvo",
    description: "¿Buscas una web profesional que venda? Agencia de diseño web en Oviedo y Asturias. Creamos páginas web, tiendas online y SEO para hacer crecer tu negocio.",
    url: "https://ltevo.com",
    siteName: "LTEvo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  // Color de fondo real del sitio (--background en globals.css: oklch(0.985 0.002 90))
  themeColor: "#faf9f7",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ltevo.com/#website",
      "name": "LTEvo",
      "url": "https://ltevo.com",
      "publisher": {
        "@id": "https://ltevo.com/#business"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://ltevo.com/#business",
      "name": "LTEvo",
      "url": "https://ltevo.com",
      "logo": "https://ltevo.com/icon.png",
      "image": "https://ltevo.com/icon.png",
      "email": "info@ltevo.com",
      "telephone": "+34 634 25 55 41",
      "priceRange": "€€",
      "areaServed": "España",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Uría, 19",
        "postalCode": "33003",
        "addressLocality": "Oviedo",
        "addressRegion": "Asturias",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.3603,
        "longitude": -5.8448
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.linkedin.com/company/ltevo",
        "https://www.instagram.com/ltevo.web/",
        "https://x.com/ltevo_web",
        "https://www.facebook.com/ltevo.web/"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MG6KCK8C');
            `,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MG6KCK8C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}