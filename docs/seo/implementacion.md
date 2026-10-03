# Preparación SEO y captación · 2 de octubre de 2026

Revisión posterior: [mejoras locales del 3 de octubre](revision-local-2026-10-03.md), preparadas sobre el rediseño del usuario y pendientes de su comprobación en Windows. Esa revisión no se ha publicado; la fecha y las comprobaciones de producción que figuran a continuación corresponden al lanzamiento anterior.

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

Código publicado en producción el 2 de octubre de 2026, commit `ad7d2f6`, deployment `dpl_Ey2LBdjMyFpDDjSoVuxDg5Xcfuv3`, confirmado READY y alias ltevo.com sin errores. Workflow Web and blog quality de GitHub: run 37002322985, success. La referencia GSC es anterior al lanzamiento; no atribuir el histórico a estos cambios.

GSC Wizard no permite ejecutar nuevas inspecciones en esta sesión porque la herramienta guarda historial y requiere aprobación externa. También se rechazó el reenvío de sitemap por requerir aprobación, aunque el sitemap ya estaba registrado. La respuesta `indexed: 0` del sitemap es un campo obsoleto, no un diagnóstico de desindexación.

La conexión Vercel permite listar proyectos, pero su herramienta `get_project` devuelve un error de parámetros (`idOrName` ausente) aun usando los parámetros publicados. El certificado de www requiere comprobar la configuración efectiva del dominio en Vercel antes de declarar la corrección.

## Acciones de cuenta que necesitan acceso

1. Instalar la skill v2 con `skill-updates/ltevo-blog-generator/INSTALL.md`: `.agents` está protegida en esta sesión.
2. Conectar GA4 con GSC Wizard y marcar generate_lead como evento clave en GA4. Se ha comprobado la etiqueta Google existente; los eventos utilizan sus comandos gtag.
3. Inspeccionar diseño web, nuevas páginas, índice del blog y último artículo en Search Console. Confirmar canonical elegida e indexación; enviar el sitemap actualizado tras publicar.
4. Verificar certificado y redirección www en la configuración del proyecto, así como la coherencia del Perfil de Empresa. El enlace de reseñas ha sido facilitado por el propietario.

## Verificación

Validación completada en una copia aislada en /tmp para respetar .git y .agents protegidos: 19 artículos con MDX válido; 11 pruebas de herramientas y 3 de contacto pasan; ESLint y TypeScript/build de producción correctos; 35 páginas del sitemap con 200, canonical propio y un H1; 404 reales. Navegación comprobada en móvil390px/tablet768px y escritorio1440px. Formulario con servicio/plan y evento generate_lead comprobados con respuesta simulada; el proveedor se prueba por separado con un mock. Consentimiento inicial denegado y revocación actualiza analytics_storage a denied. La verificación del navegador podrá simular una respuesta de éxito para comprobar la UI y el evento sin enviar un correo no solicitado; esa simulación no demuestra entrega de Resend.


## Sincronizar la copia de trabajo

`.git` está protegida en la sesión: publicación y commits se realizaron desde una copia aislada, sin modificar el índice local. Los archivos originales conservan todos los cambios. Para alinear Git sin borrar archivos, desde tu terminal de Windows en este repositorio:

```powershell
git fetch origin
git reset --mixed origin/main
```

`--mixed` actualiza la referencia/índice y conserva el contenido de los archivos de trabajo; no utilices `--hard`. Instala después la skill con su INSTALL.md. El calendario Blog-web.txt y los snapshots GSC continúan locales e ignorados por Git.
