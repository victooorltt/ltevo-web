import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LTEvo | Agencia de Diseño Web en Oviedo",
    short_name: "LTEvo",
    description: "Agencia de diseño web en Oviedo. Webs profesionales, eCommerce y SEO.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00ccec",  // ← pon aquí el color principal de tu marca
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}