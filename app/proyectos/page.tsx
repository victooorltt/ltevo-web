import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Proyectos de diseño y desarrollo web", "Conoce proyectos de LTEvo: diseño, desarrollo y decisiones para facilitar reservas y consultas. Un estudio web en Oviedo para empresas de Asturias y España.", "/proyectos");

export default function ProjectsPage() {
  return <><Navigation /><main id="contenido" className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-36 lg:pt-44 pb-24"><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">Trabajo de LTEvo</p><h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-3xl">Proyectos que puedes conocer.</h1><p className="mt-7 text-xl text-muted-foreground max-w-3xl leading-relaxed">De la presentación de un servicio a la solicitud de una reserva. Estas webs muestran cómo aplicamos diseño y desarrollo a necesidades concretas.</p><div className="grid md:grid-cols-2 gap-12 mt-16">{projects.map((project) => <article key={project.slug}><Link href={`/proyectos/${project.slug}`}><div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-foreground/10"><Image src={project.image} alt={`Web de ${project.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><h2 className="font-display text-3xl mt-6 mb-3">{project.title}</h2></Link><p className="text-muted-foreground leading-relaxed mb-5">{project.description}</p><Link href={`/proyectos/${project.slug}`} className="underline underline-offset-4">Conocer el proyecto →</Link></article>)}</div><section className="mt-20 border-t border-foreground/10 pt-12"><h2 className="font-display text-3xl mb-5">Hablemos de tu proyecto.</h2><Link href="/contacto" className="inline-flex rounded-full bg-foreground text-background px-7 py-4 font-semibold">Solicitar una propuesta</Link></section></main><FooterSection /></>;
}
