# Cookies: revisión local del 3 de octubre de 2026

Banner, preferencias y consentimiento preparados en local, pendientes de comprobación en Windows. Sin push, commit, build, lint, servidor de desarrollo ni pruebas ejecutadas.

## Interfaz

- Tarjeta inferior compacta con la tipografía y los colores existentes; aceptar y rechazar usan el mismo estilo y nivel de visibilidad, siguiendo la [orientación de la AEPD](https://www.aepd.es/preguntas-frecuentes/17-internet-y-redes-sociales/FAQ-1707-importancia-de-las-cookies-en-la-proteccion-de-datos).
- Configuración mediante un diálogo nativo: foco de teclado, interruptores independientes y cierre con Escape o el botón de cerrar. Cerrar descarta el borrador; guardar, aceptar o rechazar aplica la decisión.
- Sin píldora flotante después de decidir. «Configurar cookies» abre el panel desde el pie general, las páginas legales, la política y el aviso del mapa.
- Se evita mostrar brevemente el banner a quienes ya tienen una elección válida mientras se hidrata la página.

## Comportamiento

La decisión se mantiene en `ltevo-consent-v1`; las elecciones existentes válidas se conservan. Registros inválidos o de más de 365 días requieren renovación. Las categorías opcionales empiezan desactivadas y el borrador no cambia la medición ni el mapa.

La revocación actualiza Consent Mode y activa el bloqueo de la propiedad GA, conforme al [mecanismo de Google](https://developers.google.com/tag-platform/security/guides/privacy). También intenta borrar las cookies Analytics propias accesibles. No recarga la página ni borra formularios. El código GTM ya ejecutado no se puede descargar de memoria; cualquier etiqueta nueva del contenedor debe respetar su propio consentimiento. No se borran desde LTEvo las cookies del dominio de Google.

El store escucha cambios entre pestañas y revisa la decisión cuando se recuperan foco o visibilidad. Si localStorage está bloqueado, la elección se conserva en memoria mientras sigue abierta la página. Una sola notificación por cambio evita actualizaciones duplicadas.

La política describe las categorías, los identificadores GA4, los servicios de Google y la renovación. Se retiraron entradas de versiones antiguas de Analytics, Google Ads y YouTube que no correspondían al funcionamiento descrito. Privacidad, texto del mapa y fechas del sitemap se han ajustado en consecuencia.

## Comprobación antes de publicar

En Windows, revisa en móvil y escritorio:

1. Primera visita en una ventana privada: banner legible; aceptar, rechazar y configurar accesibles. Analytics y el mapa no deben cargarse antes de elegir.
2. Rechazar y navegar: la píldora no aparece; el pie permite reabrir el panel con ambas opciones desactivadas.
3. Cambiar interruptores y cerrar con X o Escape: se conserva la elección anterior. Tab permanece dentro del diálogo mientras está abierto y el foco vuelve al control de apertura al cerrar.
4. Guardar solo mapas: el mapa aparece en Contacto y Analytics sigue desactivado. Guardar solo analítica produce la combinación contraria.
5. Retirar permisos después de aceptar: el mapa desaparece y GA queda desactivado, sin perder texto ya introducido en el formulario. Comprueba red y cookies de primera parte.
6. Cambiar la elección en otra pestaña: ambas actualizan la configuración. Volver a la web y la política permite consultar y modificar la elección guardada.

La lectura de fuentes y `git diff --check` han terminado sin incidencias de formato. Estos checks estáticos no acreditan la compilación, el aspecto visual ni el comportamiento real del navegador; esa comprobación queda pendiente por la instrucción del usuario de probar desde Windows.
