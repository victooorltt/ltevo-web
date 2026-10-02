import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FaqSection } from "@/components/landing/faq-section";
import type { ServicePage } from "@/lib/service-pages";
import { contactHref } from "@/lib/services";
import { breadcrumbs, jsonLdString, SITE_URL } from "@/lib/seo";

export function ServiceLanding({ service }: { service: ServicePage }) {
  const path = `/servicios/${service.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${SITE_URL}${path}#service`, name: service.heading, description: service.description, url: `${SITE_URL}${path}`, provider: { "@id": `${SITE_URL}/#business` }, areaServed: [{ "@type": "City", name: "Oviedo" }, { "@type": "AdministrativeArea", name: "Asturias" }, { "@type": "Country", name: "España" }] },
      breadcrumbs([{ name: "Inicio", path: "/" }, { name: service.heading, path }]),
    ],
  };
  return (
    <>
      <Navigation />
      <main id="contenido">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
        <section className="relative bg-zinc-950 text-white pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          <Image src={service.image} alt="" fill sizes="100vw" priority className="object-cover opacity-20" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
            <Link href="/" className="text-sm text-white/60 hover:text-white">Inicio</Link>
            <p className="font-mono text-xs uppercase tracking-widest text-white/60 mt-12 mb-5">LTEvo · Oviedo, Asturias</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl">{service.heading}</h1>
            <p className="mt-8 text-lg lg:text-xl leading-relaxed text-white/75 max-w-3xl">{service.intro}</p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href={contactHref(service.slug)} className="inline-flex items-center gap-3 rounded-full bg-white text-zinc-950 px-7 py-4 font-semibold">Solicitar presupuesto <ArrowUpRight className="size-4" /></Link>
              <Link href="#alcance" className="rounded-full border border-white/25 px-7 py-4">Qué incluye el servicio</Link>
            </div>
          </div>
        </section>
        <section id="alcance" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl tracking-tight">Una propuesta que encaje con tu negocio.</h2>
              <ul className="mt-8 space-y-5 text-muted-foreground">
                {service.audience.map((text) => <li key={text} className="flex gap-3 leading-relaxed"><Check className="size-4 mt-1 shrink-0" />{text}</li>)}
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {service.inclusions.map((item) => <div key={item.title} className="border-t border-foreground/15 pt-6"><h3 className="text-xl font-semibold mb-4">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p></div>)}
            </div>
          </div>
        </section>
        <section className="bg-stone-100 border-y border-foreground/10 py-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-3xl lg:text-5xl tracking-tight mb-12">Antes de contratar.</h2>
            <div className="grid md:grid-cols-3 gap-10">{service.decisions.map((item) => <div key={item.title}><h3 className="font-semibold text-xl mb-4">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p></div>)}</div>
          </div>
        </section>
        <FaqSection faqs={service.faqs} includeJsonLd={false} />
        <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div><h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-5">Cuéntanos qué necesitas resolver.</h2><p className="text-muted-foreground leading-relaxed mb-8">Revisamos tu situación y definimos alcance, condiciones y presupuesto antes de empezar. La primera conversación es sin compromiso.</p><Link href={contactHref(service.slug)} className="inline-flex rounded-full bg-foreground text-background px-7 py-4 font-semibold">Pedir una propuesta</Link></div>
            <div className="md:pl-10 md:border-l border-foreground/10"><h3 className="font-semibold mb-5">Para seguir valorando tu proyecto</h3><ul className="space-y-4">{service.related.map((item) => <li key={item.href}><Link href={item.href} className="underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground">{item.title}</Link></li>)}<li><Link href="/proyectos" className="underline underline-offset-4">Ver proyectos de LTEvo</Link></li></ul></div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
