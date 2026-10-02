# Revisión SEO cada dos semanas

Compara periodos completos de Search Console y contactos cualificados. La referencia inicial es `baseline-2026-10-02.json`, capturada antes de publicar esta intervención. Los snapshots se guardan localmente y están excluidos de Git para conservar la privacidad de los datos de negocio. En otra máquina, trasládalos por un canal privado o vuelve a obtener el corte con GSC Wizard. El retraso de GSC significa que la fecha de revisión y la fecha final de datos son distintas.

## Primera revisión y siguientes

Revisiones orientativas: 16 y 30 de octubre, 13 y 27 de noviembre, 11 y 25 de diciembre. Ajusta las fechas a tu disponibilidad. No son tareas ni recordatorios automáticos.

Pide al agente: «Revisa el SEO de LTEvo siguiendo docs/seo/seguimiento.md, compara con el último snapshot y recomienda ajustes sin implementar todavía».

1. Lee la fecha real de despliegue en `implementacion.md`; no atribuyas datos anteriores al cambio.
2. Usa GSC Wizard `get_site_summary` con `siteUrl: sc-domain:ltevo.com`, `days: 14`. Conserva fechas, fuente y metadatos de madurez.
3. Usa las mismas fechas completas en `query_search_analytics`, dimensiones `query`, `query/page` y `page`, con `rowLimit: 25000`. Pagina si quedan filas; nunca compare una descarga truncada.
4. Guarda las respuestas JSON del contenido del MCP en un snapshot `revision-YYYY-MM-DD.json`, con `siteUrl`, `capturedAt`, `summary14`, `queries14`, `pairs14`, `pages14`. Usa el formato de la referencia inicial.
5. Ejecuta `pnpm seo:compare docs/seo/revision-YYYY-MM-DD.json docs/seo/<snapshot-anterior>.json`. Revisa también 28 días para no decidir solo por una quincena pequeña.
6. Contrasta en GA4 y en los correos las solicitudes reales, su servicio, cualificación, presupuestos y clientes. Si no hay datos, marca «no medido».

## Qué cuenta como avance

| Señal | Decisión |
|---|---|
| Impresiones y posiciones comerciales mejoran | Mantener el trabajo y comprobar si llegan clics y consultas |
| La URL adecuada gana visibilidad | Confirmar que esa página satisface la intención |
| Posición estable con suficientes impresiones y pocos clics | Revisar el resultado de búsqueda y su oferta; cambiar una variable a la vez |
| Más clics sin contactos | Revisar confianza, propuesta, formulario y seguimiento |
| Caída de una página o servicio | Comprobar indexación, cambios publicados, errores y consultas concretas |
| Pocas impresiones o un solo clic cambia el porcentaje | Marcar como señal insuficiente; ampliar periodo |

Sigue diseño/desarrollo, hosting, mantenimiento y SEO de Oviedo/Asturias por separado. La posición media global puede empeorar al aparecer en consultas nuevas; no la uses como objetivo aislado. Distingue marca de captación nueva. Dos URLs para una consulta no demuestran por sí solas canibalización.

## Medición de contactos

El código emite `generate_lead` tras una respuesta correcta del formulario, `contact_click` para teléfono/correo y `contact_cta_click` para enlaces a contacto. No envía nombre, email, teléfono ni mensaje a analítica. Solo emite con consentimiento de analítica.

Los eventos utilizan la etiqueta de Google ya publicada en GTM (`G-NWCDHBY9Z1`), comprobada en el contenedor público. El código usa comandos gtag con `send_to`, por lo que no requiere etiquetas de evento adicionales en GTM. Si cambia la propiedad, define `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. Marca solo `generate_lead` como evento clave en GA4; el clic en contacto es una interacción, no un cliente. Vincula GA4 a esta propiedad en GSC Wizard y comprueba DebugView después de una prueba controlada. Evita duplicar el envío con otras etiquetas. Las pruebas locales se marcan `debug_mode` y pueden interceptar la petición para no contaminar analítica.

Los correos incluyen servicio, plan, página de origen y página de entrada sin parámetros personales. Anota aparte fecha, servicio, cualificación, presupuesto y estado de contratación. Nunca vuelques esos datos personales en los snapshots del repositorio.

## Orden de iteración de 90 días

Primero conserva y mejora las páginas comerciales y los enlaces del lanzamiento. Durante el primer mes observa descubrimiento, indexación y CTR. En el segundo, desarrolla contenido comercial y pruebas de proyectos verificadas. En el tercero, amplía solo los servicios o sectores que demuestren demanda. El calendario local de blogs es orientativo: no elegir automáticamente la primera fila pendiente.

Prioriza después: presupuesto de web, hosting gestionado frente a servidor, alcance de auditoría SEO y mejorar una web del Kit Digital. Valida intención y fuentes antes de redactar. Revisa antes de duplicar la intención de un artículo existente.
