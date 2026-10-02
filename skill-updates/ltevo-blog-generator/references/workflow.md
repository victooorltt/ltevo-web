# Workflow editorial LTEvo

## Selección para captar clientes

Lee `Blog-web.txt` como propuestas, no una cola automática. El calendario puede marcar publicada una fila sin fichero: verifica `content/blog/`. Prioriza:

1. Corregir errores, información caducada y enlaces rotos en contenido publicado útil.
2. Apoyar servicios con impresiones comerciales y posiciones cerca del top 10/top 3.
3. Ayudar a comparar proveedores, precios, alcance y riesgos antes de contratar.
4. Introducir temas informativos con utilidad propia y conexión real con servicios.

Obtén mediante GSC Wizard consultas, páginas, clics, impresiones, CTR y posición para periodos completos comparables. Separa marca/comercial; las posiciones son promedios, no puestos estables. No tomes volumen/KD del calendario como evidencia sin fuente y fecha. Declara si falta demanda comprobada para una propuesta.

Define intención, lector, servicio/URL de destino, evidencia propia y próxima decisión del lector. Inspecciona SERP actual y artículos existentes. Un cluster admite intenciones distintas. Si coinciden, actualiza primero; una fusión exige revisar consultas, contenidos que conservar y redirección, no una decisión automática.

## Investigación y redacción

Consulta fuentes primarias: documentación Google, ayuda oficial de producto, BOE/entidad pública, especificaciones o investigación original. Verifica vigencia y condiciones. Cita cerca de cada cifra o afirmación sensible. Dos fuentes útiles suelen bastar; el número de enlaces no es un factor SEO ni prueba automática de rigor.

Responde en 1–2 frases al empezar; puedes poner después una analogía. Usa variantes naturales en título, apertura y headings; keyword exacta no es requisito universal. Ajusta extensión a la intención sin cuotas por KD ni relleno. No existe número de palabras preferido de Google ni garantía de snippets por empezar antes de 150 palabras.

Aporta experiencia propia solo documentada en información de LTEvo. Si falta, explica un criterio técnico como criterio o un ejemplo hipotético expresamente etiquetado. No atribuyas «lo vemos en auditorías» sin evidencia interna. Autoría conocida no autoriza inventar experiencia del autor.

Enlaza páginas publicadas con anchors descriptivos y relevantes. Cierra con `<CtaService service="..." />` correspondiente al problema tratado; no elijas contacto por inercia. Evita promesas de ventas o posiciones sin alcance/evidencia. Usa tablas y visuales si ayudan a decidir, sin forzar cuotas; no ASCII. La jerarquía de secciones pertenece al MDX.

## Portada IA

Genera fotografía realista, limpia, relacionada con el tema: herramientas del sector, escritorio minimalista, luz natural/de estudio. Evita robots cartoon, fantasía y neón. Incluye: `no watermark, clean background, high resolution photograph, professional studio lighting, realistic details, no text overlays, no artifacts`. Usa herramienta de generación disponible, no elimines marcas de imágenes ajenas.

Origen de suficiente tamaño; estándar editorial/social 1200×630, no factor de ranking:

```bash
node scripts/optimize-image.js <ruta-generada> --width 1200 --height 630 --fit cover --format webp --quality 78 --force
```

El script no amplía por defecto; `--force` sobrescribe sin ganancia de peso, no aumenta resolución. Regenera un origen mayor o elige explícitamente `--allow-enlargement` tras revisar calidad. Guarda `public/blog/<slug>.webp`; comprueba coincidencia con `coverImage` y dimensiones reales.

No todas las redes rechazan WebP. Si la plataforma comprobada necesita JPG, genera derivado y úsalo en metadatos; añadir un fichero sin referencia no cambia preview. Comprueba el preview real.

Genera una variante JPG 1200×630 cuando se use para compartir y declara `/blog/<slug>-og.jpg` en `socialImage`. La plantilla la utiliza en Open Graph/Twitter y el validador comprueba sus dimensiones. Incluye la variante en el commit.

## Validación y publicación

1. Completa texto/portada/fuentes/autor/CTA. Revisa hechos, experiencia, intención y duplicidad manualmente.
2. El generador crea `draft: true` y un marcador. `lib/blog.ts` debe excluir borradores de listado, rutas, acceso y sitemap. Quita marcador y draft solo tras terminar revisión.
3. Ejecuta validador: `--all` revisa publicados; `--update` exige `updatedAt` y fecha original de HEAD. Corrige errores y documenta avisos.
4. Exige build y preview reales con TSX del proyecto: consola, un H1, jerarquía, imágenes, enlaces, CTA y móvil. Si WSL es lento, ejecuta desde Windows o CI; un build sin ejecutar no cuenta como aprobado.
5. Marca la fila del calendario cuando exista artículo válido. `Blog-web.txt` está ignorado por Git: mantenimiento local.
6. Mantén `llms.txt` coherente si existe, sin priorizarlo sobre sitemap/landings/enlaces. No mejora demostrablemente Google.
7. Revisa rama y diff. Commit solo de MDX/portada/derivados/índices relacionados, sin atribuciones de IA. Evita push directo a main salvo autorización expresa. Si el usuario limitó a preparar, respétalo; si autorizó publicar, no repitas aprobación.
8. Verifica URL/HTML tras publicar; registra fecha para seguimiento.

## Seguimiento quincenal

Compara periodos completos iguales, omitiendo últimos días incompletos. Observa consultas comerciales, URL por intención, clics, impresiones, CTR por posición y contactos/presupuestos. Con pocos clics, no atribuyas causalidad a variaciones pequeñas ni cambies slugs por ruido. Anota cambios y espera suficientes datos.
