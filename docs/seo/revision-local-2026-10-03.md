# Mejoras SEO para revisión local · 3 de octubre de 2026

Estado: cambios locales preparados sobre el rediseño `c70f320`, pendientes de revisión en Windows. Esta intervención no se ha publicado ni enviado al remoto. No se ha ejecutado build, lint, servidor de desarrollo ni pruebas.

Intervención posterior del mismo día: [banner y preferencias de cookies](../cookies-revision-local-2026-10-03.md). Esa revisión modifica además la política y los textos sobre cookies, también pendientes de comprobación local.

## Diseño conservado

Se mantienen las imágenes, los colores, las tipografías, las clases de estilo, las secciones y la maquetación existente. Las mejoras visibles son textos y enlaces integrados en los bloques actuales. No se añaden imágenes ni se reutilizan fotografías en nuevas secciones.

## Qué revisar

| Página | Cambio principal |
|---|---|
| `/` | Oferta concreta por servicio, FAQs coherentes con precios y cobertura, enlaces al autor y a proyectos; metadatos propios de inicio. |
| `/servicios/diseno-web` | Webs corporativas diferenciadas de aplicaciones; casos reales y entregables dentro de las secciones existentes. |
| `/servicios/seo` | Diagnóstico, plan y registro de tareas más concretos; ejemplo de entregable identificado como ilustrativo y perfil de Víctor. |
| `/servicios/mantenimiento-web` | Cobertura por tecnología, revisión de alta, copias/restauración y condiciones de horas; enlace a la guía de mantenimiento. Precios conservados, más IVA. |
| `/servicios/desarrollo-web` | Funciones, integraciones, entrega de código y dependencias; enlace al caso documentado de Autocaravanas Bahía. |
| `/servicios/tiendas-online` | Catálogo, plataforma, formación, pagos, pruebas y costes de lanzamiento más concretos. |
| `/servicios/hosting` | Gestión de infraestructura y migración con cobertura definida; sin promesas universales de respuesta inmediata, recursos o ausencia de caídas. |
| `/blog` y artículos | Enlaces de autoría y servicios, contacto con servicio preseleccionado y orden editorial de artículos relacionados. Fechas originales de artículos conservadas. |
| `/proyectos` y casos | Servicios realizados enlazados a sus ofertas, sin resultados comerciales o métricas añadidas. |
| `/sobre-nosotros` | Perfil del autor y conexiones con los servicios. |
| `/contacto` | Teléfono y correo de la información principal pulsables; metadatos completos y mensaje de respuesta sin un plazo universal. |
| `/privacidad`, `/cookies`, `/terminos` | Metadatos específicos de cada documento; contenido legal conservado. |

Las seis páginas de servicios comparten un generador de datos estructurados para conectar WebPage, Service, empresa y breadcrumbs. Las preguntas frecuentes siguen visibles, pero el marcado FAQ retirado de los resultados enriquecidos de Google no se emite en estas páginas. Las ofertas de mantenimiento conservan moneda, periodicidad y exclusión de IVA.

## Comprobación pendiente en Windows

Revisa las páginas anteriores en tu servidor local, especialmente móvil y escritorio, longitud de títulos, botones y textos. En mantenimiento comprueba que cada botón preseleccione su plan; en artículos que el contacto conserve el servicio correspondiente. Teléfono y correo deben abrir la aplicación adecuada.

La revisión realizada aquí ha sido estática: lectura de fuentes, cambios y destinos internos, además de `git diff --check`. Esto no sustituye la compilación ni una comprobación visual o funcional. No se han enviado formularios ni correos de prueba.

## Publicación y seguimiento

La fecha de esta revisión local no es una nueva fecha de despliegue. Cuando se publique, registra la fecha real y el commit en `implementacion.md` antes de interpretar Search Console. La referencia del 2 de octubre y el seguimiento de `seguimiento.md` siguen siendo válidos; no atribuir datos anteriores a cambios pendientes de publicación.

El certificado de `www.ltevo.com` y su redirección deben resolverse en Vercel. Esta intervención local no modifica esa configuración ni las cuentas de Google. Los resultados SEO y la captación se evalúan tras publicar, con periodos consolidados y contactos cualificados.

Referencia técnica consultada: [API de metadatos de Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).
