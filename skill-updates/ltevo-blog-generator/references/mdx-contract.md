# Contrato MDX y controles

## Frontmatter

Usa YAML real (`gray-matter`): admite comentarios y listas multilínea. Fechas ISO entre comillas. Requeridos: `title`, `date`, `author`, `authorProfile`, `excerpt`, `keyword`, `coverImage`, `tags`. Recomendados: `seoTitle`, `authorRole`, `relatedSlugs`.

- `draft: true`: oculto de listado, rutas, acceso y sitemap hasta revisión.
- `date`: publicación original inmutable, sin falsa frescura.
- `updatedAt`: fecha real de revisión sustantiva, no futura ni anterior a publicación; no añadir por cambios cosméticos.
- `author`: Víctor Lasheras confirmado; perfil `/sobre-nosotros` y rol basado en hechos. El validador coteja autor/perfil con `lib/business.ts`. Antes de añadir otro autor, amplía la fuente de identidades confirmadas y su perfil; un equipo debe figurar como organización honesta, sin fingir persona.
- `seoTitle`: fiel y claro; la app añade LTEvo. 60 caracteres es aviso de ancho, no límite universal.
- `excerpt`: razón concreta para leer; aviso fuera de 80–180, sin garantía de aparición en Google.
- `keyword`: propósito editorial, sin coincidencia exacta obligatoria.
- `coverImage`: local y legible; la plantilla lee dimensiones reales cuando se usa como imagen social.
- `socialImage`: variante local JPG de 1200×630 para Open Graph/Twitter; si se declara, el validador exige existencia y dimensiones correctas.
- `relatedSlugs`: destinos existentes y pertinentes; no solo tags amplios.
- `semana`, `volumen`, `kd`, `competidor`: notas opcionales que no se imprimen; generador no añade métricas no verificadas.

Tags: `SEO`, `SEO Técnico`, `Diseño Web`, `E-commerce`, `WooCommerce`, `Marketing`, `Kit Digital`, `Estrategia Web`. Cambios de taxonomía necesitan actualizar consumidores y validador.

## MDX

`title` genera H1; empieza con texto/H2, no `#`/`<h1>`. H3 bajo H2. Markdown GFM para tablas, sin diagramas ASCII.

```mdx
<FlowDiagram>
  <FlowStep title="Diagnóstico" subtitle="Estado actual" badge="1">Qué comprobar.</FlowStep>
  <FlowStep title="Decisión" badge="2">Siguiente acción.</FlowStep>
</FlowDiagram>
<TopicSilo pillar={{ title: "Servicio", desc: "Objetivo" }}>
  <SiloCluster title="Guía de apoyo">Relación.</SiloCluster>
</TopicSilo>
<Callout type="tip" title="Comprobación útil">Contenido.</Callout>
<CtaService service="seo" title="Revisa las oportunidades de tu web" />
```

`FlowDiagram`: title opcional, steps con title/subtitle/badge/description o hijos FlowStep. `TopicSilo`: pillar con title/badge/desc, clusters en ese formato o hijos SiloCluster. `Callout.type`: tip|info|warning|success. `CtaService.service`: seo|diseno-web|mantenimiento-web|hosting|desarrollo-web|tiendas-online|contacto; destino debe existir.

No imports/exports, código ejecutable, spreads ni handlers. Objetos/listas de atributos contienen datos literales; no componentes/props desconocidos. Enlaces Markdown, referencias y JSX resuelven rutas publicadas/assets/anchors. Imágenes locales legibles con alt; img JSX con width/height.

## Alcance de las puertas

| Control automático | Revisión necesaria |
| --- | --- |
| YAML, campos, fechas, draft | Veracidad de fecha y autoría |
| Compilación MDX/render con adaptadores React | Build/preview con componentes TSX reales |
| H1 adicional, nombres/props | Jerarquía y utilidad visual |
| Rutas/assets/anchors y CTA | Relevancia y fuentes externas vigentes |
| Existencia/metadata de portada | Composición/derechos/preview social |
| Avisos title/excerpt/longitud/fuentes | Claridad, intención, respaldo por afirmación |
| Patrones de borrador | Lectura editorial completa |

Canibalización, experiencia y utilidad comercial no las demuestra el script.

```bash
node scripts/validate-post.mjs <slug>
node scripts/validate-post.mjs <slug> --update
node scripts/validate-post.mjs --all
node --test scripts/validate-post.test.mjs scripts/blog-tools.test.mjs
pnpm build
```

Los errores impiden publicar. Los avisos requieren criterio/documentación, no relleno. OK local sigue necesitando revisión editorial, build y prueba real.
