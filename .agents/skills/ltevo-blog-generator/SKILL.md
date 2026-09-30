---
name: ltevo-blog-generator
description: Guía paso a paso para redactar y publicar artículos de blog optimizados para SEO y captación de clientes en LTEvo, generando la imagen destacada con IA (sin watermark), validando el post antes de publicarlo y haciendo push al repositorio.
---

# Skill de Redacción SEO, Generación de Imágenes y Publicación para LTEvo

Procedimiento estandarizado para publicar artículos de blog orientados a posicionamiento orgánico (SEO) y a conversión, con la imagen destacada generada por IA, optimizada a WebP y validada antes de desplegar.

---

## 📋 Flujo de Trabajo

```
1. Blog-web.txt ──> 2. Keyword sin canibalizar + elegir post sin "X"
                              │
4. Portada IA        3. Redactar .mdx (answer-first)
   1200x630                 │
                              v
          5. VALIDAR (validate-post.mjs) ── falla --> arreglar
                              │ pasa
                    6. Marcar "X" + llms.txt + commit + push
```

---

## Paso 1: Elección del Artículo

1. Abrir `Blog-web.txt` y localizar la primera fila sin `X` en la columna `Publicado`.
2. Extraer: **Semana**, **Idea de Titular**, **Palabra Clave Principal**, **Volumen**, **KD**, **Competidor**, **Estructura H2 sugerida** y **Slug**.
3. **Antes de redactar, comprobar dos cosas:**

   - **Canibalización:** que ningún post ya publicado ataque la misma keyword o el mismo clúster. Si ocurre, no se escribe un post nuevo: se amplía el existente.
   - **Intención:** ¿es *qué es X* (TOFU), *cómo hago X* (MOFU) o comparativa/comercial (BOFU)? Una agencia no puede llenar el blog solo de definiciones: cada cuatro TOFU debería haber un BOFU.

> ⚠️ `Blog-web.txt` puede marcar como publicado un post cuyo fichero no existe. **El fichero manda**, no la `X`.

## Paso 2: Reglas de Contenido

### 🎯 La regla que manda sobre todas las demás: **respuesta primero**

La primera frase del artículo **responde a la duda y contiene la keyword exacta**. Después viene el resto.

Esto no es una preferencia estilística: Google y los asistentes de IA extraen la respuesta del bloque inicial. Un artículo que tarda 150 palabras en llegar a ella pierde la cita y el snippet.

**Estructura de la apertura:**

1. `## Título de la sección` — primer encabezado, nunca `#` (ver nota abajo).
2. **Respuesta directa en 1-2 frases, con la keyword exacta de forma natural.**
3. *Opcional:* analogía de 1-2 frases como enganche, **después** de la respuesta.
4. Desarrollo.

- La keyword debe aparecer **en el H1**, **en las primeras 100 palabras** y **en al menos un H2**.
- ⚠️ **El `.mdx` NO lleva `#`**: el template ya renderiza `title` como único `<h1>`. Si el MDX añade otro, la página tiene dos H1.

### 📚 Fuentes y enlazado (obligatorio)

- **Mínimo 2 enlaces externos** a fuentes de autoridad: `developers.google.com/search`, `schema.org`, `boe.es`, `nngroup.com`, `ayuda del producto`. Elegir 2-3, no 18.
- **Toda estadística lleva su fuente enlazada.** Prohibido escribir "el 95% de los usuarios…" o "mejora el CTR un 30%" sin un enlace que lo sostenga. En temas financieros, legales o del sector público, citar además la norma concreta (ley, real decreto) y enlazarla.
- **1-3 enlaces internos** a servicios o posts publicados, con anchor descriptivo que contenga la keyword del destino. Verificar que existe.

### 🧠 Señales de experiencia (E-E-A-T)

- **Un bloque de experiencia propia:** datos observados en proyectos reales, un error típico con nombre, un antes/después. Si no hay cifras, se escribe el criterio ("lo que vemos en auditorías"), nunca un número inventado.
- **Autor real con nombre y rol**, no una entidad.
- Tono riguroso y cercano, para dueños de negocio y marketing. Nada de relleno.

### 🚫 Prohibiciones

- **Cero contenido borrador:** nada de prompts, notas internas ni placeholders en el `.mdx`.
- **Cero métricas internas filtradas al texto:** volúmenes, KD o nombres de competidores solo van al frontmatter. *También* comprobar que no se impriman en la UI del blog.
- ⛔ **Cero diagramas ASCII ni "tablas" dibujadas con caracteres de caja** (`│ ├ └ ─ ┌`) dentro de bloques de código. En `prose` se renderizan como un terminal oscuro con scrollbar horizontal fijo, y en móvil hay que arrastrar para leerlos. Para un diagrama: `<FlowDiagram>` o `<TopicSilo>`. Para una tabla: **tabla Markdown de verdad**. El validador del Paso 5 bloquea la publicación si detecta este patrón, así que no es una recomendación: es una puerta.

---

## Paso 3: Estructura del `.mdx`

### Frontmatter

```yaml
---
title: "[Idea de Titular]"                # para el <h1> y la tarjeta
seoTitle: "[≤52 chars]"                   # para el <title> de la SERP
date: "YYYY-MM-DD"                        # publicación, nunca se cambia
updatedAt: "YYYY-MM-DD"                   # SOLO al revisar un post ya publicado
author: "[Nombre real]"
semana: "Semana X"
keyword: "[keyword exacta a posicionar]"
volumen: "[Volumen]"
kd: [KD]
competidor: "[Competidor]"
coverImage: "/blog/[slug].webp"
excerpt: "[120-158 chars, con la keyword y una razón para clicar]"
tags: ["SEO", "Diseño Web"]               # solo del vocabulario cerrado (Paso 3bis)
---
```

`seoTitle` ≤52 caracteres (el template añade `" | LTEvo"`; a partir de ~60 Google trunca). `excerpt` entre 120 y 158.

### Vocabulario cerrado de `tags`

Usar **solo** estos: `SEO`, `SEO Técnico`, `Diseño Web`, `E-commerce`, `WooCommerce`, `Marketing`, `Kit Digital`, `Estrategia Web`.

Los tags libres rompen el módulo de artículos relacionados: con 32 tags distintos y 26 usados una sola vez, el emparejamiento deja de significar nada. Si el tema no encaja, se elige el más cercano.

### Cuerpo

1. **Apertura answer-first** (ver Paso 2).
2. Cada H2 de `Blog-web.txt`, desarrollado con H3, viñetas y negritas.
3. **≥1 tabla** comparativa o de resumen, y **≥2 visuales** en el cuerpo. Para las imágenes hay que registrar `img`/`figure` en `mdx-components.tsx` con `next/image` y dimensiones obligatorias; sin registro, un `![](…)` sale como `<img>` crudo y provoca CLS.
4. **Profundidad según dificultad:** a más KD y volumen, más contenido. Un KD 50 pide ≥2.000 palabras con datos propios; un KD 15 se resuelve en 1.200. Escribir corto es una decisión, no un descuido.
5. **Conclusión con CTA** a los servicios de LTEvo.

### Componentes visuales MDX disponibles

```mdx
<FlowDiagram><FlowStep title="Paso 1" subtitle="…" badge="…">Descripción.</FlowStep></FlowDiagram>
<TopicSilo pillar={{ title: "Pilar", badge: "Pilar", desc: "…" }}>
  <SiloCluster title="Satélite" badge="Soporte">Chanaliza tráfico al pilar.</SiloCluster>
</TopicSilo>
<Callout type="tip|info|warning|success" title="Consejo">Texto.</Callout>
<CtaService />   <!-- CTA a la página de servicio que corresponda al clúster -->
```

> ⚠️ Estos componentes emiten `<h5>`/`<h6>`. Como el MDX nunca pasa de H3, saltan dos niveles. Si se usan bajo un H2 que ya tiene H3, ese bloque debe ir como contenido del H2, no como sección hermana.

## Paso 4: Imagen Destacada

**Estilo fotográfico realista y limpio** (monitores con herramientas del sector, escritorio minimalista, luz natural de estudio). Prohibidos robots 3D cartoon, renders fantásticos y neón.

**Prompt obligatorio:** incluir `no watermark, clean background, high resolution photograph, professional studio lighting, realistic details, no text overlays, no artifacts`.

**Formato: exactamente 1200×630 px.** Es la medida que declara `og:image` y la que esperan las plataformas sociales. Sin recortar, la portada queda deformada o mal recortada al compartir.

Usar la herramienta del repo (no un one-liner de Pillow: aquí no está instalado):

```bash
node scripts/optimize-image.js <ruta-generada> --width 1200 --height 630 --fit cover --format webp --quality 78 --force
```

Guardar como `public/blog/<slug>.webp` y comprobar que el nombre coincide con `coverImage`. Sin `--width/--height` la portada conserva el tamaño que devolvió la IA, y de ahí vienen las medidas dispares (900×491, 1376×768…) que luego no cuadran al compartir.

- ⚠️ Las plataformas sociales **no renderizan `.webp`** en `og:image`: los previews en redes necesitan un JPG. Con el mismo script: `--format jpg` (escribe un `.jpg` nuevo y conserva el original).

## Paso 5: Validación (obligatoria antes de marcar la `X`)

Publicar no es guardar: es guardar **y verificado**. Este paso es lo que evita publicar un 404 desde un artículo indexado, un `<title>` que Google trunca o una portada que no cuadra al compartir.

```bash
node scripts/validate-post.mjs <slug>
```

Un único comando, sin dependencias, que deriva las rutas reales de `app/` y de los posts ya publicados (así no hay lista que se quede obsoleta). **Sale con código 1 si falla cualquier puerta**, y entonces NO se continúa.

Puertas que comprueba:

| # | Puerta |
|---|---|
| 1 | Sin `[Photo Placeholder]`, `TODO`, `TBD` ni notas internas |
| 2 | Keyword en el H1, en las primeras 100 palabras y en algún H2/H3 |
| 3 | `title`+`" \| LTEvo"` ≤60 chars y `excerpt` entre 120 y 158 |
| 4 | Todos los enlaces internos resuelven a una ruta o post real |
| 5 | ≥2 enlaces externos y ≥300 palabras |
| 6 | `tags` del vocabulario cerrado |
| 7 | La portada existe y mide **1200×630** |

Si falla: corregir el post y volver a pasar el comando. Nunca marcar la `X` con el validador en rojo, y nunca dejar el slug de un post que no existe.

## Paso 6: Publicación

1. Insertar la `X` en la fila de `Blog-web.txt` manteniendo el alineado.
2. Añadir el post a `public/llms.txt` (título, resumen y fecha). Si no, ese índice se queda desfasado.
3. ⛔ **No compiles nada.** No `pnpm build`, ni `npx tsc --noEmit`, ni `next dev`, ni `pnpm lint`. Los agentes corren en WSL sobre el disco de Windows por `/mnt/c`, donde el doble arranque de Node lo multiplica por diez. **Se encarga quien escribe, desde su terminal de Windows.** El único comando que se ejecuta desde aquí es el validador del Paso 5 (menos de un segundo). Si el validador pasa, el post se da por bueno y el commit sale sin más comprobaciones.

4. `git branch --show-current` — nunca hacer push directo a `main`.
5. Commit y push (sin menciones de IA ni `Co-Authored-By`). Ojo: `Blog-web.txt` está en `.gitignore`, así que **no** se añade al commit; el calendario editorial es local:
   ```bash
   git add content/blog/$SLUG.mdx public/blog/$SLUG.webp public/llms.txt
   git commit -m "feat(blog): add post $SLUG and cover image"
   git push
   ```

---

## 📊 Checklist de Control de Calidad

Bloqueante si cualquiera falla:

- [ ] ¿El `.mdx` y la portada existen, y la portada mide **1200×630**?
- [ ] ¿Sin placeholders, TODOs ni notas internas?
- [ ] ¿**Sin diagramas ASCII ni tablas dibujadas con caracteres de caja**?
- [ ] ¿**Ningún enlace interno roto**? (Paso 5)
- [ ] ¿La keyword está en el **H1**, en las **primeras 100 palabras** y en **≥1 H2**?
- [ ] ¿`seoTitle` ≤52 y `excerpt` entre 120 y 158 caracteres?
- [ ] ¿**≥2 enlaces externos** de autoridad, y **toda estadística con su fuente**?
- [ ] ¿1-3 enlaces internos con anchor descriptivo hacia destinos existentes?
- [ ] ¿Hay un bloque de experiencia propia y autor con nombre real?
- [ ] ¿≥2 visuales en el cuerpo y ≥1 tabla?
- [ ] ¿Tags del vocabulario cerrado, sin inventar?
- [ ] ¿CTA final hacia los servicios de LTEvo?
- [ ] ¿Se validó el build (`tsc` + `build`) y se comprobó la rama?
- [ ] ¿Se marcó la `X`, se actualizó `llms.txt`, y se hizo commit + push?