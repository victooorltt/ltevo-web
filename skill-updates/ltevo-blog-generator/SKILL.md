---
name: ltevo-blog-generator
description: "Trigger: redactar, revisar o publicar blogs LTEvo. Prioriza captación con GSC, fuentes verificadas, portada IA y validación antes del push."
license: Proprietary
metadata:
  author: LTEvo
  version: "2.0"
---

## Activation Contract

Aplica al crear, actualizar o publicar artículos MDX de LTEvo. Carga [workflow](references/workflow.md) y [contrato MDX](references/mdx-contract.md); consulta el [modelo](assets/post-template.mdx).

## Hard Rules

- Prioriza intención de contratar, oferta real y datos GSC; nunca la primera fila pendiente automáticamente.
- Conserva slugs y fechas publicados. Evalúa intención antes de ampliar, diferenciar o fusionar contenidos del mismo cluster.
- No inventes experiencia, identidad, métricas, reseñas, resultados ni actualidad. Verifica fuentes primarias vigentes; enlaza cifras y afirmaciones sensibles.
- Abre con respuesta directa y natural. No impongas keyword literal, longitud por KD ni garantías de ranking/snippets.
- Mantén `draft: true` hasta completar revisión. Cero placeholders, prompts, notas internas o métricas editoriales en el cuerpo; ningún H1 adicional.
- Atribuye autor/revisor conocido con perfil verificable. Víctor Lasheras está confirmado por LTEvo; no inventes biografía o proyectos.
- Usa CTA con `service` explícito y destinos publicados. Genera portada IA realista sin watermark; optimiza y declara dimensiones reales.
- Exige validador, revisión editorial, render real y build satisfactorios antes del push. El validador no demuestra verdad, intención ni experiencia.

## Decision Gates

| Situación | Acción |
| --- | --- |
| URL existente responde a misma intención | Actualiza conservando `date`, añade `updatedAt` |
| Mismo cluster, intención distinta | Diferencia contenido, título y enlaces; no fusiones automáticamente |
| Faltan hechos, oferta o prueba propia | Investiga; deja borrador, pide solo datos imprescindibles |
| WSL/build demasiado lento | Valida localmente; exige build Windows o CI y preview antes de publicar |
| Permiso de publicación limitado | Prepara y verifica dentro del alcance; respeta autorización vigente |

## Execution Steps

1. Lee calendario, artículos, landings y último corte GSC. Define consulta, intención, servicio y aportación propia.
2. Investiga fuentes oficiales; redacta con estructura útil, enlaces contextuales y CTA. Comprueba duplicidad por intención.
3. Genera/optimiza portada; completa autoría, tags y metadatos; revisa hechos y fechas.
4. Ejecuta `node scripts/validate-post.mjs <slug>`; añade `--update` para revisión. Corrige errores y evalúa avisos.
5. Verifica build y página real: headings, imágenes, enlaces, componentes y CTA. Solo entonces actualiza calendario/índices y publica cambios acotados.

## Output Contract

Entrega intención y servicio, fuentes/fechas, archivos, validación/build/preview y estado de publicación. Para seguimiento quincenal informa consultas comerciales, URLs y contactos cualificados; no prometas top 3.

## References

- [Workflow editorial y publicación](references/workflow.md)
- [Frontmatter, MDX y controles](references/mdx-contract.md)
- [Plantilla de borrador](assets/post-template.mdx)
