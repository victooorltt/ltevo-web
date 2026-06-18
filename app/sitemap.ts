import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ltevo.com", lastModified: new Date() },
    { url: "https://ltevo.com/servicios/diseno-web", lastModified: new Date() },
    { url: "https://ltevo.com/servicios/seo", lastModified: new Date() },
    { url: "https://ltevo.com/servicios/mantenimiento-web", lastModified: new Date() },
    { url: "https://ltevo.com/contacto", lastModified: new Date() },
    { url: "https://ltevo.com/privacidad", lastModified: new Date() },
    { url: "https://ltevo.com/terminos", lastModified: new Date() },
    { url: "https://ltevo.com/cookies", lastModified: new Date() },
  ];
}