import Image from "next/image";
import Link from "next/link";

/* Bloque de texto local para SEO en la home: da contenido indexable a una
   home muy visual. Server component, reveal CSS scroll-driven, sin JS.
   Diseño bento de 2 columnas con fotografía del estudio en Oviedo,
   keywords locales enlazadas y píldoras de valor estilo Apple. */
export function LocalSeoSection() {
  return (
    <section className="py-20 lg:py-28 border-t border-foreground/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-foreground/[0.08] aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.06)] bg-foreground/[0.03]">
              <Image
                src="/oviedo-studio.webp"
                alt="Estudio de diseño web LTEvo en Oviedo, Asturias"
                fill
                sizes="(min-width: 1024px) 40vw, calc(100vw - 48px)"
                className="object-cover"
                priority={false}
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-background/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-foreground border border-foreground/10 shadow-sm flex items-center gap-2">
                📍 Estudio en Oviedo · Calle Uría
              </div>
            </div>
          </div>

          {/* Editorial Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-foreground/70 bg-foreground/[0.04] border border-foreground/[0.08] tracking-wide mb-4">
                Agencia web en Asturias
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display tracking-tight leading-[1.08] mb-6">
                Agencia de diseño y desarrollo web en Oviedo
              </h2>
            </div>

            <div className="text-muted-foreground leading-relaxed font-light space-y-4 text-base lg:text-lg">
              <p>
                LTEvo es un estudio de{" "}
                <Link
                  href="/servicios/diseno-web"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                >
                  diseño web en Oviedo
                </Link>{" "}
                que trabaja con negocios de toda Asturias y del resto de España. Diseñamos y desarrollamos webs a medida con Next.js: rápidas, seguras y pensadas para convertir visitas en clientes, no solo para verse bien.
              </p>
              <p>
                Más allá de la web corporativa, construimos desarrollo web a medida con integraciones de CRM, reservas o pagos, y{" "}
                <Link
                  href="/blog/prestashop-vs-woocommerce"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                >
                  tiendas online
                </Link>{" "}
                capaces de vender a cualquier hora. Y si quieres que tus clientes te encuentren en Google, acompañamos el proyecto con{" "}
                <Link
                  href="/servicios/seo"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                >
                  posicionamiento SEO
                </Link>{" "}
                continuo.
              </p>
              <p>
                Sin plantillas genéricas ni intermediarios: hablas directamente con el equipo que diseña, programa y posiciona tu web, de Oviedo para toda Asturias.
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-foreground/[0.06]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-foreground/[0.03] border border-foreground/[0.08] text-foreground/80">
                ⚡ Webs que cargan en &lt; 1s
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-foreground/[0.03] border border-foreground/[0.08] text-foreground/80">
                <span className="text-primary">✦</span> Next.js &amp; React a medida
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-foreground/[0.03] border border-foreground/[0.08] text-foreground/80">
                🛡️ Trato directo sin intermediarios
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
