import type { Metadata } from "next";
import {
  Instrument_Sans,
  JetBrains_Mono,
  Instrument_Serif,
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
      "logo": "https://ltevo.com/logo.png",
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
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="gtm-script"
          strategy="afterInteractive"
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