import { GA4_DISABLE_KEY } from "@/lib/analytics-config";
import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { AnalyticsConsent } from "@/components/landing/analytics-consent";
import { CookieBanner } from "@/components/landing/cookie-banner";
import { ConversionTracking } from "@/components/landing/conversion-tracking";
import { business } from "@/lib/business";
import { HOME_TITLE, HOME_DESCRIPTION, jsonLdString } from "@/lib/seo";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  /* No se precarga: solo se usa para el "™" de la nav y chips de 10px.
     Precargarla competía con la imagen LCP por ancho de banda. */
  preload: false,
});

/* Variable font (wght 100-900, sin limitar pesos).
   `preload` es por instancia, no por estilo: para precargar solo el estilo
   normal (el que usa el H1 del hero, y por tanto el LCP) hay que separar
   normal e italic en dos instancias apuntando a la misma variable CSS. */
const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-inter",
});

/* La cursiva solo aparece en titulares de páginas de servicio, nunca
   above-the-fold: no compite con el LCP, así que no se precarga. */
const interItalic = Inter({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-inter",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${HOME_TITLE} | LTEvo`,
    template: "%s | LTEvo",
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: "LTEvo" }],
  creator: "LTEvo",
  metadataBase: new URL("https://ltevo.com"),
  openGraph: {
    title: `${HOME_TITLE} | LTEvo`,
    description: HOME_DESCRIPTION,
    url: "https://ltevo.com",
    siteName: "LTEvo",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    // summary_large_image sin `images` produce una tarjeta vacía: Next no
    // deriva twitter:image de og:image. Reutilizamos la OG de raíz.
    card: "summary_large_image",
    title: `${HOME_TITLE} | LTEvo`,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "LTEvo - Agencia de Diseño Web en Oviedo",
      },
    ],
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
      "logo": "https://ltevo.com/logo.svg",
      "image": {
        "@type": "ImageObject",
        "url": "https://ltevo.com/opengraph-image.jpg",
        "width": 1200,
        "height": 630
      },
      "email": "info@ltevo.com",
      "telephone": "+34634255541",
      "taxID": "71742225G",
      "priceRange": "€€",
      "areaServed": [
        { "@type": "City", "name": "Oviedo" },
        { "@type": "City", "name": "Gijón" },
        { "@type": "City", "name": "Avilés" },
        { "@type": "AdministrativeArea", "name": "Asturias" },
        { "@type": "Country", "name": "España" }
      ],
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
        business.reviewUrl,
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
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${inter.variable} ${interItalic.variable} antialiased`}
      >
        {/*
          Inicializa Consent Mode y el bloqueo GA antes de cualquier etiqueta.
          AnalyticsConsent carga GTM únicamente tras una decisión válida;
          la revocación mantiene GA bloqueado sin recargar la página.
        */}
        <script
          id="gtm-consent-default"
          dangerouslySetInnerHTML={{
            __html: `window[${JSON.stringify(GA4_DISABLE_KEY)}]=true;
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
  analytics_storage:'denied',functionality_storage:'granted',
  security_storage:'granted',wait_for_update:500
});`,
          }}
        />
        <AnalyticsConsent />
        <ConversionTracking />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
        {/* Skip to content (WCAG 2.4.1): invisible hasta que se navega con
            teclado, momento en que aparece arriba a la izquierda. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
