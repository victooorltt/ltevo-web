import Image from "next/image";

/*
 * Marquee "estilo Apple": tarjetas finas y muy redondeadas (icono + nombre)
 * con logos en su color de marca oficial (SVG de simpleicons, autoalojados
 * en /public/logos: así no dependemos de ningún CDN externo).
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
const REPEATS = 1;

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
                  /* La 1ª copia de cada mitad es la que se anuncia. Las copias
                     2 y 3 son puro relleno visual del bucle: sin esto un
                     lector de pantalla oye cada tecnología 6 veces. No cambia
                     nada del render. */
                  aria-hidden={copy > 0 || undefined}
                  className="group flex shrink-0 items-center gap-2.5 rounded-[20px] border border-foreground/10 bg-white px-4 py-2.5 shadow-xs transition-colors duration-300 hover:border-foreground/20 md:px-5 md:py-3"
                >
                  {/* Logos autoalojados en /public/logos (SVG original de simpleicons).
                      Antes venían de cdn.simpleicons.org, que es una petición a
                      un tercero sin control: obligaba a declararlo en la
                      política de cookies y dependíamos de un CDN externo para
                      pintar la sección. Al servirse desde el propio dominio
                      desaparece esa categoría entera y con ella el problema. */}
                  <Image
                    src={`/logos/${tech.slug}.svg`}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="shrink-0"
                    unoptimized
                  />
                  <span className="whitespace-nowrap text-sm font-medium font-display tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
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
            Elegimos las herramientas según las funciones y la gestión que necesita tu negocio.
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
