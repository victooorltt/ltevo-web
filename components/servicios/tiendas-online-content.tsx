import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { FaqSection } from "@/components/landing/faq-section";
import type { ServicePage } from "@/lib/service-pages";
import { contactHref } from "@/lib/services";

export function TiendasOnlineContent({ service }: { service: ServicePage }) {
  return (
    <>
      {/* ============================================================ */}
      {/*  HERO: Fondo oscuro con foto a la derecha y texto a la izq   */}
      {/* ============================================================ */}
      <section className="relative bg-zinc-950 text-white pt-36 pb-24 lg:pt-48 lg:pb-36 overflow-hidden min-h-[75vh] flex items-center">
        {/* Foto a la derecha con fundido a la izquierda */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[54%] h-full">
            <Image
              src="/Hero-servicios-tiendas-online.webp"
              alt={service.heading}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-center lg:object-right opacity-70 lg:opacity-90"
            />
            {/* Degradados para fundir la imagen hacia el texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 via-30% to-transparent hidden lg:block" />
          </div>
        </div>

        {/* Contenido a la izquierda: sin Inicio ni LTEvo Oviedo */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              {service.heading}
            </h1>
            <p className="mt-8 text-lg lg:text-xl leading-relaxed text-white/75 max-w-xl">
              {service.intro}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href={contactHref(service.slug)}
                className="inline-flex items-center gap-3 rounded-full bg-white text-zinc-950 px-7 py-4 font-semibold hover:bg-white/90 transition-colors"
              >
                Presupuesto de tienda <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="#alcance"
                className="rounded-full border border-white/25 px-7 py-4 hover:bg-white/10 transition-colors"
              >
                Catálogo y compra
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN 1 (ORIGINAL): Alcance - Una propuesta que encaje    */}
      {/* ============================================================ */}
      <section id="alcance" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight">Catálogo, pagos y pedidos preparados para vender.</h2>
            <ul className="mt-8 space-y-5 text-muted-foreground">
              {service.audience.map((text) => (
                <li key={text} className="flex gap-3 leading-relaxed">
                  <Check className="size-4 mt-1 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {service.inclusions.map((item) => (
              <div key={item.title} className="border-t border-foreground/15 pt-6">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NUEVA SECCIÓN: Gestión de pedidos, pagos y logística        */}
      {/*  (Situada justo debajo de "Una propuesta que encaje")        */}
      {/* ============================================================ */}
      <section className="border-y border-foreground/10 py-20 lg:py-28 bg-stone-50/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-3xl border border-foreground/[0.08] overflow-hidden aspect-[16/10] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] bg-card">
              <Image
                src="/tiendas-online-gestion.webp"
                alt="Gestión de pedidos, pagos y logística en tiendas online"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-6">
                Del carrito al pedido: pagos y gestión conectados.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                La compra debe permitir elegir variantes, conocer precio y entrega y completar el pedido desde el móvil. Organizamos ese recorrido junto con las tareas de catálogo, stock y pedidos que necesita gestionar tu equipo.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Elegimos contigo pasarela y métodos de pago —como Stripe, Redsys, Bizum o PayPal— según plataforma y proveedor. Comprobamos confirmaciones y estados de pedido, y definimos notificaciones y reglas de envío. Las conexiones con transportistas o facturación se concretan en el alcance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN 2 (ORIGINAL): Antes de contratar                    */}
      {/* ============================================================ */}
      <section className="bg-stone-100 border-b border-foreground/10 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="font-display text-3xl lg:text-5xl tracking-tight mb-12">Plataforma, costes y lanzamiento de la tienda.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {service.decisions.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-xl mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECCIÓN 3 (ORIGINAL): FaqSection                            */}
      {/* ============================================================ */}
      <FaqSection title="Preguntas sobre crear una tienda online" faqs={service.faqs} includeJsonLd={false} />

      {/* ============================================================ */}
      {/*  SECCIÓN 4 (ORIGINAL): Cierre y enlaces relacionados        */}
      {/* ============================================================ */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-5">Preparemos el lanzamiento de tu tienda online.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cuéntanos qué vendes, cuántos productos y variantes tienes y cómo gestionas pedidos y envíos. Definiremos plataforma, contenido, integraciones y presupuesto para empezar.
            </p>
            <Link
              href={contactHref(service.slug)}
              className="inline-flex rounded-full bg-foreground text-background px-7 py-4 font-semibold"
            >
              Pedir presupuesto de tienda online
            </Link>
          </div>
          <div className="md:pl-10 md:border-l border-foreground/10">
            <h3 className="font-semibold mb-5">Para elegir y mantener tu tienda</h3>
            <ul className="space-y-4">
              {service.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/proyectos" className="underline underline-offset-4">
                  Ver proyectos de LTEvo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
