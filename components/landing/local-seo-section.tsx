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
                alt="Espacio de trabajo para diseño y desarrollo web"
                fill
                sizes="(min-width: 1024px) 40vw, calc(100vw - 48px)"
                className="object-cover"
                priority={false}
                loading="lazy"
              />
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
                que trabaja con negocios de toda Asturias y del resto de España. Creamos webs corporativas con una oferta clara, navegación adaptada al móvil y formularios para solicitar presupuesto.
              </p>
              <p>
                Para funciones propias e integraciones de CRM, reservas o pagos, ofrecemos <Link href="/servicios/desarrollo-web" className="text-foreground underline underline-offset-4">desarrollo web a medida</Link>. También creamos{" "}
                <Link
                  href="/servicios/tiendas-online"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                >
                  tiendas online
                </Link>{" "}
                con catálogo, pagos y gestión de pedidos. Para mejorar la visibilidad de tus servicios en Google, puedes complementar tu web con{" "}
                <Link
                  href="/servicios/seo"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
                >
                  posicionamiento SEO
                </Link>{" "}
                y seguimiento. También puedes delegar el <Link href="/servicios/hosting" className="text-foreground underline underline-offset-4">hosting gestionado</Link> y el <Link href="/servicios/mantenimiento-web" className="text-foreground underline underline-offset-4">mantenimiento de tu web</Link>.
              </p>
              <p>
                Hablas directamente con quien trabaja en tu proyecto. Conoce a <Link href="/sobre-nosotros" className="text-foreground underline underline-offset-4">Víctor Lasheras y LTEvo</Link>, consulta nuestros <Link href="/proyectos" className="text-foreground underline underline-offset-4">proyectos de diseño y desarrollo</Link> y compara el alcance antes de contratar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
