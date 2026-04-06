import Link from "next/link";

export const metadata = {
  title: "Política de Cookies | LTEvo",
  description: "Información sobre el uso de cookies en ltevo.com conforme a la normativa europea.",
};

export default function CookiesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
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

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-white font-medium">Nombre</th>
                    <th className="text-left py-3 pr-4 text-white font-medium">Tipo</th>
                    <th className="text-left py-3 pr-4 text-white font-medium">Finalidad</th>
                    <th className="text-left py-3 text-white font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody className="text-white/50">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_ga</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Google Analytics — distingue usuarios únicos</td>
                    <td className="py-3">2 años</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_ga_*</td>
                    <td className="py-3 pr-4">Analítica</td>
                    <td className="py-3 pr-4">Google Analytics — mantiene el estado de sesión</td>
                    <td className="py-3">2 años</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">cookie_consent</td>
                    <td className="py-3 pr-4">Técnica</td>
                    <td className="py-3 pr-4">Recuerda tu preferencia sobre cookies</td>
                    <td className="py-3">1 año</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-white/40">
              * Solo se cargan cookies analíticas si aceptas el uso de cookies no esenciales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Clasificación de cookies</h2>

            <div className="space-y-4">
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">🔒 Cookies técnicas (necesarias)</h3>
                <p className="text-sm text-white/50">
                  Imprescindibles para el funcionamiento del sitio. No requieren consentimiento.
                  Se usan para recordar tu elección de cookies.
                </p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">📊 Cookies analíticas</h3>
                <p className="text-sm text-white/50">
                  Nos permiten conocer cómo los usuarios interactúan con el sitio de forma anónima y agregada,
                  para mejorar su funcionamiento. Requieren tu consentimiento previo.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Gestión y desactivación</h2>
            <p>
              Puedes aceptar o rechazar cookies no esenciales a través del banner que aparece en tu primera
              visita. Además, puedes configurar tu navegador para bloquear o eliminar cookies:
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
            <h2 className="text-xl font-semibold text-white mb-3">5. Cookies de terceros</h2>
            <p>
              Utilizamos Google Analytics, un servicio de análisis web de Google LLC. Google puede transferir
              los datos recopilados a terceros cuando así lo exija la ley o cuando dichos terceros procesen
              los datos en nombre de Google. Para más información, consulta la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4"
              >
                política de privacidad de Google
              </a>
              .
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
              <strong className="text-white">contacto@ltevo.com</strong>.
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
