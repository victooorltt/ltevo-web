# Preparación SEO y captación · 2 de octubre de 2026

La intervención conserva las URLs existentes y añade servicios diferenciados, casos de proyecto y autoría. Los datos iniciales están en `baseline-2026-10-02.json`; las revisiones quincenales siguen `seguimiento.md`.

## Cambios preparados

- Home: servicio y ubicación en el H1, enlaces a presupuesto/proyectos y criterios verificables en lugar de métricas no documentadas.
- Servicios: diseño, SEO y mantenimiento revisados; nuevas páginas de hosting, desarrollo a medida y tiendas online. Mantenimiento muestra precios mensuales más IVA.
- Proyectos: índice y casos de Autocaravanas Bahía y Jardinería El Cuetu, limitados a alcance documentado.
- Blog: 17 artículos revisados y dos guías comerciales nuevas; fuentes, CTA y relaciones explícitas. Fechas originales conservadas, revisión del 2 de octubre.
- Plantilla: autor Víctor Lasheras con perfil, marcado Person, fechas coherentes, imágenes sociales de tamaño real y títulos semánticos. Borradores excluidos de listados, rutas y sitemap.
- Contacto: selección de servicio y plan, contexto en correo y eventos sujetos a consentimiento. Newsletter inoperante sustituida por contacto.
- Publicación: validador real de MDX, borrador seguro, pruebas y skill v2 instalable en `skill-updates/ltevo-blog-generator/`.

## Datos externos y publicación

Fecha de despliegue: pendiente de comprobación del resultado del despliegue. El documento se actualizará cuando exista evidencia; no se toma la fecha de preparación como lanzamiento.

GSC Wizard no permite ejecutar nuevas inspecciones en esta sesión porque la herramienta guarda historial y requiere aprobación externa. La respuesta `indexed: 0` del sitemap es un campo obsoleto, no un diagnóstico de desindexación.

La conexión Vercel permite listar proyectos, pero su herramienta `get_project` devuelve un error de parámetros (`idOrName` ausente) aun usando los parámetros publicados. El certificado de www requiere comprobar la configuración efectiva del dominio en Vercel antes de declarar la corrección.

## Acciones de cuenta que necesitan acceso

1. Instalar la skill v2 con `skill-updates/ltevo-blog-generator/INSTALL.md`: `.agents` está protegida en esta sesión.
2. Conectar GA4 con GSC Wizard y marcar generate_lead como evento clave en GA4. Se ha comprobado la etiqueta Google existente; los eventos utilizan sus comandos gtag.
3. Inspeccionar diseño web, nuevas páginas, índice del blog y último artículo en Search Console. Confirmar canonical elegida e indexación; enviar el sitemap actualizado tras publicar.
4. Verificar certificado y redirección www en la configuración del proyecto, así como la coherencia del Perfil de Empresa. El enlace de reseñas ha sido facilitado por el propietario.

## Verificación

Validación completada en una copia aislada en /tmp para respetar .git y .agents protegidos: 19 artículos con MDX válido; 11 pruebas de herramientas y 3 de contacto pasan; ESLint y TypeScript/build de producción correctos; 35 páginas del sitemap con 200, canonical propio y un H1; 404 reales. Navegación comprobada en móvil390px/tablet768px y escritorio1440px. Formulario con servicio/plan y evento generate_lead comprobados con respuesta simulada; el proveedor se prueba por separado con un mock. Consentimiento inicial denegado y revocación actualiza analytics_storage a denied. La verificación del navegador podrá simular una respuesta de éxito para comprobar la UI y el evento sin enviar un correo no solicitado; esa simulación no demuestra entrega de Resend.
