import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | LTEvo",
  description: "Política de privacidad de LTEvo. Información sobre el tratamiento de datos personales conforme al RGPD.",
};

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>
              En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
              Personales (LOPDGDD), te informamos que el responsable del tratamiento de tus datos es:
            </p>
            <ul className="mt-4 space-y-1 text-white/50 text-sm font-mono">
              <li><span className="text-white/70">Nombre:</span> LTEvo</li>
              <li><span className="text-white/70">Localidad:</span> Oviedo, Asturias, España</li>
              <li><span className="text-white/70">Email:</span> contacto@ltevo.com</li>
              <li><span className="text-white/70">Web:</span> ltevo.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Datos que recopilamos</h2>
            <p>A través del formulario de contacto de nuestra web, podemos recopilar los siguientes datos:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-white/50">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Nombre de empresa (opcional)</li>
              <li>Contenido del mensaje</li>
            </ul>
            <p className="mt-3">
              También podemos recopilar datos de navegación de forma anónima mediante cookies técnicas y analíticas,
              tal como se detalla en nuestra Política de Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Finalidad del tratamiento</h2>
            <p>Tratamos tus datos personales con las siguientes finalidades:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-white/50">
              <li>Responder a tus consultas y solicitudes de información</li>
              <li>Gestionar la relación comercial y prestación de servicios contratados</li>
              <li>Enviarte información sobre nuestros servicios, si lo has solicitado</li>
              <li>Cumplir con obligaciones legales aplicables</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Base jurídica</h2>
            <p>
              La base jurídica para el tratamiento de tus datos es el consentimiento otorgado al completar el formulario
              de contacto (art. 6.1.a RGPD) y, en su caso, la ejecución de un contrato de servicios (art. 6.1.b RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Conservación de datos</h2>
            <p>
              Conservaremos tus datos personales durante el tiempo necesario para cumplir la finalidad para la que
              fueron recabados. Los datos de contacto se conservan durante un máximo de <strong className="text-white">3 años</strong> desde
              el último contacto, salvo que hayas solicitado su supresión antes o la ley exija un plazo distinto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Destinatarios</h2>
            <p>
              No cedemos tus datos a terceros salvo obligación legal. Podemos utilizar proveedores de servicios
              (como plataformas de email o CRM) que actúan como encargados del tratamiento, con los que firmamos
              los acuerdos exigidos por el RGPD y que ofrecen las garantías adecuadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a <span className="text-white">contacto@ltevo.com</span>:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-white/50">
              <li><strong className="text-white/70">Acceso:</strong> conocer qué datos tuyos tratamos</li>
              <li><strong className="text-white/70">Rectificación:</strong> corregir datos inexactos</li>
              <li><strong className="text-white/70">Supresión:</strong> solicitar la eliminación de tus datos</li>
              <li><strong className="text-white/70">Oposición:</strong> oponerte al tratamiento en determinadas circunstancias</li>
              <li><strong className="text-white/70">Limitación:</strong> solicitar la restricción del tratamiento</li>
              <li><strong className="text-white/70">Portabilidad:</strong> recibir tus datos en formato estructurado</li>
            </ul>
            <p className="mt-3">
              Si consideras que el tratamiento no es conforme a la normativa, tienes derecho a presentar una reclamación
              ante la <strong className="text-white">Agencia Española de Protección de Datos (AEPD)</strong> en{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
                aepd.es
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Seguridad</h2>
            <p>
              Adoptamos medidas técnicas y organizativas apropiadas para proteger tus datos frente a accesos no
              autorizados, pérdida, destrucción o alteración, conforme al artículo 32 del RGPD.
            </p>
          </section>

        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-white/30">
          <Link href="/terminos" className="hover:text-white transition-colors">Términos de uso</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Política de cookies</Link>
          <Link href="/" className="hover:text-white transition-colors">ltevo.com</Link>
        </div>

      </div>
    </main>
  );
}
