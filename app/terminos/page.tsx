import Link from "next/link";

export const metadata = {
  title: "Términos de Uso | LTEvo",
  description: "Términos y condiciones de uso del sitio web y servicios de LTEvo.",
};

export default function TerminosPage() {
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
          Términos de Uso
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Objeto y aceptación</h2>
            <p>
              Los presentes Términos de Uso regulan el acceso y la utilización del sitio web{" "}
              <strong className="text-white">ltevo.com</strong> (en adelante, "el Sitio"), titularidad de LTEvo,
              con domicilio en Oviedo, Asturias, España. El acceso al Sitio implica la aceptación plena y sin reservas
              de estos términos. Si no estás de acuerdo, te rogamos que no utilices el Sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Servicios ofrecidos</h2>
            <p>LTEvo ofrece servicios profesionales de tecnología e inteligencia artificial para empresas:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-white/50">
              <li>Consultoría sobre IA y plan de aplicación</li>
              <li>Automatización de procesos inteligente</li>
              <li>Chatbots y agentes de voz con IA</li>
              <li>Diseño y desarrollo de sitios web</li>
            </ul>
            <p className="mt-3">
              Las condiciones específicas de cada servicio contratado se detallarán en el presupuesto u
              oferta comercial correspondiente, que prevalecerá sobre estos Términos en caso de contradicción.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Uso correcto del Sitio</h2>
            <p>El usuario se compromete a hacer un uso lícito del Sitio y, en particular, a no:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-white/50">
              <li>Reproducir, distribuir o modificar los contenidos sin autorización expresa de LTEvo</li>
              <li>Utilizar el Sitio para actividades ilícitas, fraudulentas o lesivas para terceros</li>
              <li>Introducir virus, malware u otros elementos dañinos</li>
              <li>Realizar accesos no autorizados a sistemas o redes conectadas al Sitio</li>
              <li>Suplantar la identidad de LTEvo o de terceros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del Sitio — incluyendo textos, imágenes, logotipos, diseños, código fuente
              y cualquier otro elemento — son propiedad exclusiva de LTEvo o de sus licenciantes, y están
              protegidos por la legislación española e internacional de propiedad intelectual e industrial.
            </p>
            <p className="mt-3">
              Queda prohibida su reproducción, distribución, comunicación pública o transformación sin la
              autorización previa y por escrito de LTEvo, salvo para uso personal y no comercial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Limitación de responsabilidad</h2>
            <p>
              LTEvo no garantiza la disponibilidad continua del Sitio ni la ausencia de errores en sus contenidos.
              En ningún caso LTEvo será responsable de daños directos, indirectos, incidentales o consecuentes
              derivados del uso o imposibilidad de uso del Sitio, salvo en los casos en que la ley no lo permita.
            </p>
            <p className="mt-3">
              El Sitio puede contener enlaces a sitios web de terceros. LTEvo no controla ni es responsable
              del contenido de dichos sitios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Modificaciones</h2>
            <p>
              LTEvo se reserva el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios
              serán efectivos desde su publicación en el Sitio. El uso continuado del Sitio tras la publicación
              de cambios implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Legislación aplicable y jurisdicción</h2>
            <p>
              Estos Términos se rigen por la legislación española. Para la resolución de cualquier controversia
              derivada del uso del Sitio, las partes se someten a los Juzgados y Tribunales de Oviedo (Asturias),
              con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estos Términos, puedes contactarnos en{" "}
              <strong className="text-white">contacto@ltevo.com</strong>.
            </p>
          </section>

        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-white/30">
          <Link href="/privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Política de cookies</Link>
          <Link href="/" className="hover:text-white transition-colors">ltevo.com</Link>
        </div>

      </div>
    </main>
  );
}
