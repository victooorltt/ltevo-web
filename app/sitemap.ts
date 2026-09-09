import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/blog";

/**
 * Última edición real de cada página estática, obtenida con
 * `git log -1 --format=%cs -- <ruta>` (comentada la ruta de origen).
 * Se hardcodean para que el sitemap no emita la fecha de build en cada deploy.
 */
const pageLastModified = {
  "/": "2026-06-19",                            // app/page.tsx
  "/blog": "2026-06-21",                        // app/blog/page.tsx
  "/contacto": "2026-06-20",                    // app/contacto/page.tsx
  "/servicios/diseno-web": "2026-06-20",        // app/servicios/diseno-web/page.tsx
  "/servicios/seo": "2026-06-20",               // app/servicios/seo/page.tsx
  "/servicios/mantenimiento-web": "2026-06-20", // app/servicios/mantenimiento-web/page.tsx
  "/privacidad": "2026-06-20",                  // app/privacidad/page.tsx
  "/terminos": "2026-06-20",                    // app/terminos/page.tsx
  "/cookies": "2026-06-20",                     // app/cookies/page.tsx
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: "https://ltevo.com", lastModified: new Date(pageLastModified["/"]) },
    { url: "https://ltevo.com/blog", lastModified: new Date(pageLastModified["/blog"]) },
    // Artículos del blog: lastModified = fecha de publicación
    ...posts.map((p) => ({
      url: `https://ltevo.com/blog/${p.slug}`,
      lastModified: new Date(p.date),
    })),
    { url: "https://ltevo.com/servicios/diseno-web", lastModified: new Date(pageLastModified["/servicios/diseno-web"]) },
    { url: "https://ltevo.com/servicios/seo", lastModified: new Date(pageLastModified["/servicios/seo"]) },
    { url: "https://ltevo.com/servicios/mantenimiento-web", lastModified: new Date(pageLastModified["/servicios/mantenimiento-web"]) },
    { url: "https://ltevo.com/contacto", lastModified: new Date(pageLastModified["/contacto"]) },
    { url: "https://ltevo.com/privacidad", lastModified: new Date(pageLastModified["/privacidad"]) },
    { url: "https://ltevo.com/terminos", lastModified: new Date(pageLastModified["/terminos"]) },
    { url: "https://ltevo.com/cookies", lastModified: new Date(pageLastModified["/cookies"]) },
  ];
}
