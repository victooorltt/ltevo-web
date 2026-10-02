import type { Metadata } from "next";

export const SITE_URL = "https://ltevo.com";
export const SEO_UPDATED_AT = "2026-10-02";

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
