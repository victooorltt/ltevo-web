"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getConsent,
  getServerConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Carga de Google Tag Manager sujeta a consentimiento.
 *
 * Antes de este cambio, `app/layout.tsx` insertaba el snippet de GTM con
 * `strategy="lazyOnload"` de forma incondicional en todas las páginas: se
 * instalaban cookies de analítica en la primera visita sin haber pedido
 * permiso, y la política de cookies afirmaba que sí lo había.
 *
 * Aquí se hace al revés, en el orden que exige Google Consent Mode v2:
 *
 *   1. `app/layout.tsx` declara, con un `<script>` plano en el servidor, el
 *      estado por defecto TODO DENEGADO. Va ahí porque debe ejecutarse
 *      siempre y antes de que se cargue cualquier otra cosa.
 *   2. Solo si hay consentimiento para `analytics` se inyecta gtm.js.
 *   3. Si el usuario revoca, el store notifica a los suscriptores y el
 *      script se desmonta, con lo que Google deja de recibir datos.
 *
 * GTM-MG6KCK8C es el mismo container que ya tenías, sin cambios de medición.
 */

const GTM_ID = "GTM-MG6KCK8C";

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getServerConsent,
  );

  /* Durante el render del servidor `getServerConsent` devuelve null, así
     que esto nunca monta el script en el HTML prerenderizado: no hay
     ninguna posibilidad de que GTM se cargue sin consentimiento. */
  if (consent?.analytics !== true) return null;

  return (
    <Script id="gtm-container" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('consent','update',{
  ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
  analytics_storage:'granted'
});`}
    </Script>
  );
}
