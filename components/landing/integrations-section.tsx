"use client";

import { useEffect, useState, useRef } from "react";

const technologies = [
  { name: "Next.js",      category: "Framework",      icon: "https://cdn.simpleicons.org/nextdotjs"    },
  { name: "React",        category: "UI Library",     icon: "https://cdn.simpleicons.org/react"        },
  { name: "TypeScript",   category: "Lenguaje",       icon: "https://cdn.simpleicons.org/typescript"   },
  { name: "Tailwind CSS", category: "Estilos",        icon: "https://cdn.simpleicons.org/tailwindcss"  },
  { name: "Figma",        category: "Diseño",         icon: "https://cdn.simpleicons.org/figma"        },
  { name: "Framer",       category: "Prototipado",    icon: "https://cdn.simpleicons.org/framer"       },
  { name: "WordPress",    category: "CMS",            icon: "https://cdn.simpleicons.org/wordpress"    },
  { name: "Shopify",      category: "eCommerce",      icon: "https://cdn.simpleicons.org/shopify"      },
  { name: "WooCommerce",  category: "eCommerce",      icon: "https://cdn.simpleicons.org/woocommerce"  },
  { name: "Vercel",       category: "Hosting",        icon: "https://cdn.simpleicons.org/vercel"       },
  { name: "Stripe",       category: "Pagos",          icon: "https://cdn.simpleicons.org/stripe"       },
  { name: "PostgreSQL",   category: "Base de datos",  icon: "https://cdn.simpleicons.org/postgresql"   },
];

export function TechSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Herramientas del
            <br />
            más alto nivel.
          </h2>
          <p className="text-xl text-muted-foreground">
            Trabajamos con el stack moderno más sólido para garantizar
            webs rápidas, escalables y fáciles de mantener.
          </p>
        </div>
      </div>

      {/* Marquee 1 */}
      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {technologies.map((tech) => (
                <div
                  key={`${tech.name}-${setIndex}`}
                  className="shrink-0 px-8 py-5 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={24}
                      height={24}
                      className="tech-logo shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-lg font-medium group-hover:translate-x-1 transition-transform leading-tight">
                        {tech.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{tech.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee 2 inverso */}
      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...technologies].reverse().map((tech) => (
                <div
                  key={`${tech.name}-reverse-${setIndex}`}
                  className="shrink-0 px-8 py-5 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={24}
                      height={24}
                      className="tech-logo shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-lg font-medium group-hover:translate-x-1 transition-transform leading-tight">
                        {tech.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{tech.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}