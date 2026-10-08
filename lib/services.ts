export const contactServices = {
  "diseno-web": "Diseño web",
  "desarrollo-web": "Desarrollo web a medida",
  seo: "SEO y posicionamiento",
  ecommerce: "Tienda online",
  mantenimiento: "Mantenimiento web",
  hosting: "Hosting gestionado",
  "agentes-ia": "Agentes de IA y automatización",
  otro: "Otro",
} as const;

export type ContactService = keyof typeof contactServices;

export function normalizeContactService(value: string): ContactService | "" {
  const normalized = value === "mantenimiento-web" ? "mantenimiento" : value === "tiendas-online" ? "ecommerce" : value;
  return normalized in contactServices ? normalized as ContactService : "";
}

export const maintenancePlans = ["Básico", "Profesional", "Premium"] as const;

export function contactHref(service: string, plan?: string) {
  const query = new URLSearchParams({ servicio: service });
  if (plan) query.set("plan", plan);
  return `/contacto?${query.toString()}`;
}
