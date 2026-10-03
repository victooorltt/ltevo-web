import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SEO_UPDATED_AT } from "@/lib/seo";

const staticDates: Record<string, string> = {
  "/": SEO_UPDATED_AT, "/blog": SEO_UPDATED_AT, "/contacto": SEO_UPDATED_AT,
  "/servicios/diseno-web": SEO_UPDATED_AT, "/servicios/seo": SEO_UPDATED_AT,
  "/servicios/mantenimiento-web": SEO_UPDATED_AT, "/servicios/hosting": SEO_UPDATED_AT,
  "/servicios/desarrollo-web": SEO_UPDATED_AT, "/servicios/tiendas-online": SEO_UPDATED_AT,
  "/proyectos": SEO_UPDATED_AT, "/proyectos/autocaravanas-bahia": SEO_UPDATED_AT,
  "/proyectos/jardineria-el-cuetu": SEO_UPDATED_AT, "/sobre-nosotros": SEO_UPDATED_AT,
  "/privacidad": "2026-10-03", "/terminos": "2026-06-20", "/cookies": "2026-10-03",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestContentDate = posts.reduce((latest, post) => [latest, post.updatedAt ?? post.date].sort().at(-1)!, SEO_UPDATED_AT);
  return [
    ...Object.entries(staticDates).map(([pathname, modified]) => ({
      url: `${SITE_URL}${pathname === "/" ? "" : pathname}`,
      lastModified: new Date(["/", "/blog"].includes(pathname) ? latestContentDate : modified),
    })),
    ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: new Date(post.updatedAt ?? post.date) })),
  ];
}
