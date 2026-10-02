import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { projects } from "@/lib/projects";
import { contactHref } from "@/lib/services";
import { breadcrumbs, jsonLdString, SITE_URL } from "@/lib/seo";

export function ProjectCase({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug)!;
  const path = `/proyectos/${project.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CreativeWork", "@id": `${SITE_URL}${path}#project`, name: project.title, description: project.description, url: `${SITE_URL}${path}`, image: `${SITE_URL}${project.image}`, creator: { "@id": `${SITE_URL}/#business` } },
    breadcrumbs([{ name: "Inicio", path: "/" }, { name: "Proyectos", path: "/proyectos" }, { name: project.title, path }]),
  ] };
  return <><Navigation /><main id="contenido" className="pt-36 lg:pt-44 pb-24"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} /><div className="max-w-[1100px] mx-auto px-6 lg:px-12">
    <Link href="/proyectos" className="text-sm text-muted-foreground underline underline-offset-4">Todos los proyectos</Link>
    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-12 mb-5">{project.sector}</p>
    <h1 className="font-display text-5xl lg:text-7xl tracking-tight">{project.title}</h1><p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mt-6">{project.description}</p>
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-foreground/10 my-12"><Image src={project.image} alt={`Diseño de la web de ${project.title}`} fill priority sizes="(min-width: 1100px) 1000px, 100vw" className="object-cover" /></div>
    <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20"><aside><h2 className="font-semibold mb-4">Trabajo realizado</h2><ul className="space-y-3 text-muted-foreground">{project.services.map((service) => <li key={service}>{service}</li>)}</ul><a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block underline underline-offset-4 mt-7">Visitar la web del proyecto ↗</a></aside><div className="space-y-10"><section><h2 className="font-display text-3xl mb-5">El punto de partida</h2><p className="text-muted-foreground leading-relaxed">{project.challenge}</p></section><section><h2 className="font-display text-3xl mb-5">La solución</h2><ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed">{project.work.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2 className="font-display text-3xl mb-5">Qué aporta la web</h2><p className="text-muted-foreground leading-relaxed">{project.value}</p></section></div></div>
    <section className="border-t border-foreground/10 mt-16 pt-12"><h2 className="font-display text-3xl lg:text-4xl mb-5">¿Necesitas una web para tu negocio?</h2><p className="text-muted-foreground mb-7">Trabajamos desde Oviedo para empresas de Asturias y de toda España. Cuéntanos qué quieres resolver y definimos una propuesta.</p><div className="flex flex-wrap gap-5"><Link href={contactHref(project.service)} className="rounded-full bg-foreground text-background px-7 py-4 font-semibold">Solicitar presupuesto</Link><Link href={`/servicios/${project.service}`} className="rounded-full border border-foreground/15 px-7 py-4">Conocer el servicio</Link></div></section>
  </div></main><FooterSection /></>;
}
