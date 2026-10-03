import type { Metadata } from "next";

export const SITE_URL = "https://ltevo.com";
// Actualizar solo al cambiar el contenido de las páginas estáticas.
export const SEO_UPDATED_AT = "2026-10-03";
export const HOME_TITLE = "Diseño y desarrollo web en Oviedo y Asturias";
export const HOME_DESCRIPTION = "Diseño y desarrollo web para empresas de Oviedo y Asturias. Webs corporativas, tiendas online, SEO y mantenimiento. Consulta proyectos y pide presupuesto.";

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title, description, url: pathname, siteName: "LTEvo", locale: "es_ES", type: "website",
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "LTEvo · Diseño y desarrollo web en Oviedo" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.jpg"] },
  };
}

export function jsonLdString(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${item.path}`,
    })),
  };
}

type ServicePageSchemaOptions = {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  offers?: {
    "@type": "Offer";
    name: string;
    url: string;
    priceSpecification: {
      "@type": "UnitPriceSpecification";
      price: string;
      priceCurrency: "EUR";
      unitText: "mes";
      valueAddedTaxIncluded: false;
    };
  }[];
};

export function servicePageSchema({ path, name, description, serviceType, offers }: ServicePageSchemaOptions) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "es-ES",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name,
        description,
        serviceType,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          { "@type": "City", name: "Oviedo" },
          { "@type": "City", name: "Gijón" },
          { "@type": "City", name: "Avilés" },
          { "@type": "AdministrativeArea", name: "Asturias" },
          { "@type": "Country", name: "España" },
        ],
        ...(offers ? { offers } : {}),
      },
      {
        ...breadcrumbs([{ name: "Inicio", path: "/" }, { name, path }]),
        "@id": `${url}#breadcrumb`,
      },
    ],
  };
}
