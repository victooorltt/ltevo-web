import Image from "next/image";

/*
 * Marquee "estilo Apple": tarjetas finas y muy redondeadas (icono + nombre)
 * con logos en su color de marca oficial (cdn.simpleicons.org/{slug}).
 *
 * Reglas del bucle seamless (las dos mitades del track son idénticas y cada
 * mitad termina con padding-right = gap interno, de modo que translateX(-50%)
 * recorre exactamente una mitad — ver .marquee-track en globals.css):
 *  1. El track lleva w-max (si no, el -50% se calcula sobre el ancho del
 *     viewport y el bucle "salta" al reiniciarse).
 *  2. Ningún gap a nivel de track: el espacio entre mitades es el pr de
 *     cada mitad, igual al gap interno entre tarjetas (por breakpoint:
 *     gap-4/pr-4 en móvil, gap-6/pr-6 en md+).
 *  3. Cada mitad repite la lista REPEATS veces para que una mitad sea más
 *     ancha que cualquier viewport real (4K incluido); si la mitad fuera
 *     más estrecha que la pantalla, al terminar el ciclo se vería el borde.
 */
const REPEATS = 3;

const technologies = [
  { name: "Next.js",      slug: "nextdotjs"   },
  { name: "React",        slug: "react"       },
  { name: "TypeScript",   slug: "typescript"  },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Figma",        slug: "figma"       },
  { name: "Framer",       slug: "framer"      },
  { name: "WordPress",    slug: "wordpress"   },
  { name: "Shopify",      slug: "shopify"     },
  { name: "WooCommerce",  slug: "woocommerce" },
  { name: "Vercel",       slug: "vercel"      },
  { name: "Stripe",       slug: "stripe"      },
  { name: "PostgreSQL",   slug: "postgresql"  },
];

function LogoTrack({ reverse, className = "" }: { reverse?: boolean; className?: string }) {
  const items = reverse ? [...technologies].reverse() : technologies;

  return (
    <div className={`marquee-fade ${className}`}>
      <div className={`flex w-max ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {[false, true].map((clone) => (
          <ul
            key={clone ? "clone" : "base"}
            aria-hidden={clone || undefined}
            className="flex w-max shrink-0 items-center gap-4 pr-4 md:gap-6 md:pr-6"
          >
            {Array.from({ length: REPEATS }).flatMap((_, copy) =>
              items.map((tech) => (
                <li
                  key={`${copy}-${tech.slug}`}
                  className="group flex shrink-0 items-center gap-2.5 rounded-[20px] border border-foreground/10 bg-foreground/[0.03] px-4 py-2.5 shadow-xs transition-colors duration-300 hover:bg-foreground/[0.06] md:px-5 md:py-3"
                >
                  {/* SVG externo de CDN: el optimizador de next/image no procesa
                      SVG, se sirve directo con unoptimized. Cada logo viaja en
                      su color de marca oficial (sin sufijo de tinte). */}
                  <Image
                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="shrink-0"
                    unoptimized
                  />
                  <span className="whitespace-nowrap text-sm font-medium tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {tech.name}
                  </span>
                </li>
              )),
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function TechSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Herramientas del <br /> más alto nivel.
          </h2>
          <p className="text-xl text-muted-foreground">
            Trabajamos con el stack moderno más sólido para garantizar
            webs rápidas, escalables y fáciles de mantener.
          </p>
        </div>
      </div>

      {/* Fila 1: hacia la izquierda */}
      <LogoTrack className="mb-8 lg:mb-12" />

      {/* Fila 2: hacia la derecha, mismo ancho → misma duración */}
      <LogoTrack reverse />
    </section>
  );
}
