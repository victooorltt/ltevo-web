import Link from "next/link";

/**
 * Casilla de consentimiento del RGPD para los formularios de contacto.
 *
 * Antes no existía y, sin embargo, la política de privacidad declaraba como
 * base jurídica el "consentimiento otorgado al completar el formulario"
 * (art. 6.1.a RGPD). Eso la dejaba inoperante: el art. 13 de la LOPDGDD
 * obliga a informar en el momento de la recogida, no en una página aparte.
 *
 * El bloque de texto es un componente del sitio (mismo patrón visual que el
 * resto de formularios), no una línea escondida: el usuario tiene que poder
 * leer lo que acepta.
 */
export function ConsentCheckbox({ id = "consentimiento" }: { id?: string }) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        name="consent"
        required
        className="mt-0.5 size-4 shrink-0 accent-foreground"
      />
      <label htmlFor={id} className="text-xs text-muted-foreground leading-relaxed">
        He leído y acepto la{" "}
        <Link
          href="/privacidad"
          className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-colors"
        >
          política de privacidad
        </Link>{" "}
        y consiento al tratamiento de mis datos para responder a esta solicitud.
      </label>
    </div>
  );
}

/**
 * Campo trampa para bots (honeypot). Está oculto para personas pero los
 * autómatas de formulario lo rellenan. La API lo rechaza si llega con
 * contenido, así que el envío se descarta en silencio sin captcha y sin
 * molestar a las personas.
 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">No rellenes este campo</label>
      <input
        id="website"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
