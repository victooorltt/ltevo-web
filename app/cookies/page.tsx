import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CookiePreferencesButton } from "@/components/landing/cookie-preferences-button";

export const metadata = pageMetadata("Política de cookies", "Consulta las cookies de LTEvo, sus finalidades y cómo gestionar tus preferencias de analítica y mapas en la web.", "/cookies");

export default function CookiesPage() {
  return (
    <main id="contenido" className="bg-black text-white min-h-[100dvh]">
      <div className="max-w-3xl mx-auto px-6 py-32 lg:py-40">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12">
          ← Volver al inicio
        </Link>
        <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
          Última actualización: 3 de octubre de 2026
        </p>
        <h1 className="text-4xl lg:text-5xl font-display text-white mb-12 leading-tight">
          Política de Cookies
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Tu elección, siempre accesible</h2>
            <p>
              Puedes navegar y contactar con LTEvo sin aceptar analítica ni mapas.
              Estos servicios de Google solo se activan con tu permiso. El botón
              «Configurar cookies», disponible en el pie de página, permite
              revisar o retirar tu elección.
            </p>
            <CookiePreferencesButton className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Qué son las cookies y el almacenamiento local</h2>
            <p>
              Las cookies son pequeños archivos que un sitio o un servicio guarda
              en tu navegador. Pueden recordar preferencias o identificar un
              navegador para medir visitas. El almacenamiento local cumple una
              función similar, pero sus datos no se envían automáticamente con
              cada petición: LTEvo lo utiliza para recordar tu decisión.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Qué utiliza esta web</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <caption className="sr-only">Almacenamiento y servicios de cookies de LTEvo, con su finalidad y duración</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Nombre o servicio</th>
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Proveedor</th>
                    <th scope="col" className="text-left py-3 pr-4 text-white font-medium">Finalidad</th>
                    <th scope="col" className="text-left py-3 text-white font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody className="text-white/50">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">ltevo-consent-v1</td>
                    <td className="py-3 pr-4">LTEvo</td>
                    <td className="py-3 pr-4">Recuerda en localStorage las categorías elegidas y la fecha de tu decisión.</td>
                    <td className="py-3">La elección se renueva a los 12 meses, o antes si cambia la configuración.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_ga</td>
                    <td className="py-3 pr-4">Google Analytics</td>
                    <td className="py-3 pr-4">Distingue navegadores para elaborar estadísticas de uso. Solo con permiso de analítica.</td>
                    <td className="py-3">Hasta 2 años, según la configuración de Google Analytics.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs">_ga_*</td>
                    <td className="py-3 pr-4">Google Analytics</td>
                    <td className="py-3 pr-4">Mantiene información de la sesión de medición. Solo con permiso de analítica.</td>
                    <td className="py-3">Hasta 2 años, según la configuración de Google Analytics.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Google Maps</td>
                    <td className="py-3 pr-4">Google</td>
                    <td className="py-3 pr-4">Carga el mapa interactivo de Contacto. Puede utilizar cookies propias de Google para sus preferencias y funcionamiento.</td>
                    <td className="py-3">Nombres y duración según Google, el navegador y la sesión del usuario.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Google Tag Manager carga la etiqueta de Analytics cuando aceptas la
              analítica. La web mantiene denegadas las opciones de publicidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Las categorías que puedes elegir</h2>
            <div className="space-y-4">
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">Necesarias</h3>
                <p className="text-sm text-white/50">
                  Conservan tu elección en el almacenamiento local de este
                  navegador. No activan analítica ni mapas y permanecen habilitadas
                  para recordar las preferencias.
                </p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">Analítica de la web</h3>
                <p className="text-sm text-white/50">
                  Google Analytics mide páginas e interacciones para elaborar
                  estadísticas de uso. Puede tratar identificadores del navegador
                  y datos técnicos. El formulario no envía nombre, email, teléfono ni mensaje
                  a los eventos de analítica.
                </p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium text-white mb-1">Mapa de Google</h3>
                <p className="text-sm text-white/50">
                  Permite cargar un mapa de Google Maps en Contacto. Sin este
                  permiso mostramos la dirección y un enlace para abrir Google Maps
                  en otra pestaña, donde se aplican las preferencias y políticas de Google.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Cómo cambiar o retirar tu elección</h2>
            <p>
              «Aceptar todas» activa las dos categorías opcionales. «Rechazar»
              mantiene ambas desactivadas. En «Configurar cookies» puedes elegir
              cada una por separado y pulsar «Guardar mi selección». Cerrar el
              panel o pulsar Escape descarta los cambios sin guardarlos.
            </p>
            <p className="mt-3">
              Al retirar el permiso de analítica, desactivamos la medición de
              Analytics y eliminamos las cookies de Analytics accesibles en nuestro
              dominio. Al retirar el de mapas, dejamos de mostrar el mapa integrado.
              LTEvo no puede borrar desde su dominio las cookies que Google haya
              guardado en el suyo: puedes eliminarlas desde los ajustes del navegador.
            </p>
            <p className="mt-3">
              Recordamos la elección durante 12 meses. Si borras los datos de la
              web, usas otro navegador o cambian las categorías, volveremos a
              pedirte una decisión. Si el navegador bloquea el almacenamiento,
              la elección solo se conserva durante la sesión de esta página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Información de Google</h2>
            <p>
              Analytics y Maps son servicios de Google. Para conocer su tratamiento
              de datos, sus cookies y la información sobre transferencias
              internacionales, consulta su{" "}
              <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">política de privacidad</a>{" "}
              y su explicación sobre{" "}
              <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">el uso de cookies</a>.
            </p>
            <p className="mt-3">
              Las imágenes y los logotipos de esta web se sirven desde nuestro
              propio dominio. Abrir enlaces a sitios externos no modifica la
              elección de cookies que has guardado en LTEvo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Actualizaciones y contacto</h2>
            <p>
              Actualizamos esta información cuando cambian los servicios o su
              configuración. Si tienes dudas, escríbenos a{" "}
              <a href="mailto:info@ltevo.com" className="text-white underline underline-offset-4">info@ltevo.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-white/30">
          <CookiePreferencesButton className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" />
          <Link href="/privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
          <Link href="/terminos" className="hover:text-white transition-colors">Términos de uso</Link>
          <Link href="/" className="hover:text-white transition-colors">ltevo.com</Link>
        </div>
      </div>
    </main>
  );
}
