"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Navegación: [
    { name: "Servicios",  href: "#servicios"    },
    { name: "Proceso",    href: "#how-it-works" },
    { name: "Portafolio", href: "#portfolio"    },
    { name: "Resultados", href: "#contacto"     },
  ],
  Servicios: [
    { name: "Diseño Web",  href: "#servicios" },
    { name: "SEO",         href: "#servicios" },
    { name: "eCommerce",   href: "#servicios" },
    { name: "Rendimiento", href: "#servicios" },
  ],
  Legal: [
    { name: "Privacidad",          href: "/privacidad" },
    { name: "Términos de uso",     href: "/terminos"   },
    { name: "Política de cookies", href: "/cookies"    },
  ],
};


export function FooterSection() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">

            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display text-white">LTEvo</span>
                <span className="text-xs text-white/30 font-mono">™</span>
              </Link>

              <p className="text-white/70 leading-relaxed mb-8 max-w-xs">
                Agencia de diseño web en Oviedo. Creamos webs que convierten visitas en clientes.
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith("#") ? (
                        <a
                          href={link.href}
                          className="text-sm text-white/40 hover:text-white transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-white/40 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30 font-mono">
            © 2026 LTEvo. Todos los derechos reservados.
          </p>
          <p className="text-sm text-white/30 font-mono">
            Diseñado y desarrollado en Oviedo, Asturias.
          </p>
        </div>

      </div>
    </footer>
  );
}