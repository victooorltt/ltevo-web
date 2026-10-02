import Link from "next/link";

export const metadata = {
  title: "Política de Cookies - Agencia Web en Oviedo",
  description: "Consulta la política de cookies de LTEvo. Infórmate sobre cómo utilizamos las cookies en nuestra web de diseño y SEO en Oviedo y Asturias.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Política de Cookies - Agencia Web en Oviedo",
    description: "Consulta la política de cookies de LTEvo. Infórmate sobre cómo utilizamos las cookies en nuestra web de diseño y SEO en Oviedo y Asturias.",
    url: "/cookies",
    siteName: "LTEvo",
    locale: "es_ES",
    type: "website",
    // Al definir openGraph propio se pierde el og:image heredado del raíz
    // (app/opengraph-image.jpg por convención de fichero): lo restauramos.
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function CookiesPage() {
  return (
    <main id="contenido" className="bg-black text-white min-h-[100dvh]">
      <div className="max-w-3xl mx-auto px-6 py-32 lg:py-40">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12"
        >
          ← Volver al inicio
        </Link>

        <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
          Última actualización: abril 2026
        </p>

        <h1 className="text-4xl lg:text-5xl font-display text-white mb-12 leading-tight">
          Política de Cookies
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador o dispositivo
              cuando los visitas. Sirven para recordar tus preferencias, mejorar tu experiencia de navegación
              y recopilar información estadística anónima sobre el uso del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Cookies que utilizamos</h2>

            <p className="mb-4">
              Este es el inventario real de lo que este sitio puede instalar. Tu
              navegador puede mostrar además cookies de otros sitios si navegas
              desde esta página hacia un tercero.
            </p>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <caption className="sr-only">
                  Inventario de cookies instaladas por ltevo.com, su tipo, finalidad y duración
                </caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Nombre</th>
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Proveedor</th>
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Tipo</th>
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Finalidad</th>
                    <th scope="col" className="text-left py-3 text-white font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody className="text-white/50">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">ltevo-consent-v1</td>
                    <td className="py-3 pr-4">LTEvo</td>
                    <td className="py-3 pr-4">Técnica (localStorage)</td>
                    <td className="py-3 pr-4">Guarda en tu navegador qué categorías aceptaste y cuándo, para no volver a preguntarte</td>
                    <td className="py-3">Hasta que la borres</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_ga</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Distingue visitantes únicos y calcula páginas vistas</td>
                    <td className="py-3">2 años</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_ga_*</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Mantiene el estado de sesión de la medición</td>
                    <td className="py-3">2 años</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_gid</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Registra una visita única por ventana de 24 horas</td>
                    <td className="py-3">24 horas</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_gat, _gat_*</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Limita las peticiones al servidor de Google Analytics</td>
                    <td className="py-3">1 minuto</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_gcl_au, _gcl_aw</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Almacena y recupera eventos de conversión en Google Ads</td>
                    <td className="py-3">3 meses</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">NID</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Mapa (Google Maps)</td>
                    <td className="py-3 pr-4">Identifica al visitante y memoriza sus preferencias de mapas</td>
                    <td className="py-3">3 meses</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">VISITOR_INFO1_LIVE, YSC</td>
                    <td className="py-3 pr-4">Google LLC</td>
                    <td className="py-3 pr-4">Mapa (Google Maps)</td>
                    <td className="py-3 pr-4">Recoge el país, el idioma y su interacción con el mapa</td>
                    <td className="py-3">6 meses / 6 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-white/40">
              * Las cookies de Google Analytics y Google Maps no se descargan ni
              funcionan hasta que las aceptas. Si no aceptas, el sitio funciona
              con normalidad: en /contacto verás la dirección con un enlace a
              Google Maps en lugar del mapa incrustado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Clasificación de cookies</h2>

            <div className="space-y-4">
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">Cookies técnicas (necesarias)</h3>
                <p className="text-sm text-white/50">
                  Imprescindibles para el funcionamiento del sitio. No requieren
                  consentimiento porque sin ellas el sitio no podría funcionar o
                  no podría recordar tu elección. Se guardan en el almacenamiento
                  local de tu navegador, no como cookies.
                </p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">Cookies analíticas</h3>
                <p className="text-sm text-white/50">
                  Nos permiten conocer de forma anónima y agregada cómo se usa el
                  sitio, para mejorarlo. Son de Google Analytics y requieren tu
                  consentimiento previo.
                </p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">Cookies de mapas</h3>
                <p className="text-sm text-white/50">
                  Las establece Google Maps al mostrar el mapa interactivo de
                  nuestra ubicación en la página de contacto. Requieren tu
                  consentimiento previo.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Gestión y desactivación</h2>
            <p>
              Puedes aceptar, rechazar o cambiar tu decisión en cualquier momento
              desde el botón <strong className="text-white/70">Cookies</strong>{" "}
              que aparece en la esquina inferior izquierda de cualquier página.
              También puedes bloquear o eliminar cookies desde tu navegador:
            </p>
            <ul className="mt-3 space-y-2 text-white/50 text-sm">
              <li>
                <strong className="text-white/70">Chrome:</strong>{" "}
                Configuración → Privacidad y seguridad → Cookies
              </li>
              <li>
                <strong className="text-white/70">Firefox:</strong>{" "}
                Opciones → Privacidad y seguridad → Cookies y datos del sitio
              </li>
              <li>
                <strong className="text-white/70">Safari:</strong>{" "}
                Preferencias → Privacidad → Gestionar datos del sitio
              </li>
              <li>
                <strong className="text-white/70">Edge:</strong>{" "}
                Configuración → Privacidad, búsqueda y servicios → Cookies
              </li>
            </ul>
            <p className="mt-3">
              Ten en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Terceros y transferencias internacionales</h2>
            <p>
              Los dos únicos terceros con los que interactuamos son{" "}
              <strong className="text-white/70">Google LLC</strong>, a través de
              Google Tag Manager, Google Analytics y Google Maps. No utilizamos
              otras redes de publicidad ni perfiles de terceros.
            </p>
            <p className="mt-3">
              Google trata los datos conforme a su{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4"
              >
                política de privacidad
              </a>
              . Ambos servicios pueden procesar la información fuera del Espacio
              Económico Europeo, en Estados Unidos, con las garantías que la
              Comisión Europea ha aprobado para las transferencias internacionales
              (art. 45 y 46 del RGPD).
            </p>
            <p className="mt-3">
              Los logotipos de las tecnologías que usamos en ltevo.com se sirven
              desde nuestro propio dominio, sin peticiones a ninguna plataforma
              externa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Actualizaciones</h2>
            <p>
              Podemos actualizar esta Política de Cookies cuando sea necesario para reflejar cambios en las
              cookies que utilizamos o por otras razones operativas, legales o reglamentarias. Te recomendamos
              revisarla periódicamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contacto</h2>
            <p>
              Si tienes preguntas sobre el uso de cookies, escríbenos a{" "}
              <strong className="text-white">info@ltevo.com</strong>.
            </p>
          </section>

        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-white/30">
          <Link href="/privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
          <Link href="/terminos" className="hover:text-white transition-colors">Términos de uso</Link>
          <Link href="/" className="hover:text-white transition-colors">ltevo.com</Link>
        </div>

      </div>
    </main>
  );
}
