import Link from "next/link";

const commitments = [
  { title: "Alcance antes de empezar", text: "Definimos funciones, contenidos y condiciones para que puedas valorar la propuesta.", href: "/servicios/diseno-web", link: "Cómo planteamos una web" },
  { title: "Proyectos que puedes ver", text: "Conoce webs realizadas y las necesidades que resuelve cada proyecto.", href: "/proyectos", link: "Ver proyectos de LTEvo" },
  { title: "Continuidad después del lanzamiento", text: "Elige un mantenimiento con tareas y coberturas concretas, según tu web.", href: "/servicios/mantenimiento-web", link: "Comparar los planes" },
  { title: "SEO con seguimiento", text: "Revisamos consultas, páginas y contactos para decidir qué conviene mejorar.", href: "/servicios/seo", link: "Conocer el servicio SEO" },
];

export function MetricsSection() {
  return <section className="py-24 lg:py-32 border-y border-foreground/10"><div className="max-w-[1400px] mx-auto px-6 lg:px-12"><h2 className="reveal text-4xl lg:text-6xl font-display tracking-tight mb-16">Criterios claros.<br /><span className="text-muted-foreground">Trabajo que puedes valorar.</span></h2><div className="grid md:grid-cols-2 gap-px bg-foreground/10">{commitments.map((item) => <div key={item.title} className="bg-background p-8 lg:p-12"><h3 className="text-2xl lg:text-3xl font-display mb-5">{item.title}</h3><p className="text-muted-foreground leading-relaxed mb-6">{item.text}</p><Link href={item.href} className="underline underline-offset-4 decoration-foreground/30">{item.link} →</Link></div>)}</div></div></section>;
}
