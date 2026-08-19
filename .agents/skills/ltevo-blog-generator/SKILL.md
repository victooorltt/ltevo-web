---
name: ltevo-blog-generator
description: Guía paso a paso para redactar y publicar artículos de blog optimizados para SEO y captación de clientes en LTEvo, generando la imagen destacada con IA (sin watermark), optimizándola a WebP, actualizando Blog-web.txt y haciendo push al repositorio.
---

# Skill de Redacción SEO, Generación de Imágenes y Publicación para LTEvo

Esta skill define el procedimiento estandarizado y automatizado para generar artículos de blog de máxima calidad para la web de **LTEvo**, orientados tanto a posicionamiento orgánico en buscadores (SEO) como a la conversión de lectores en clientes, incluyendo la generación de la imagen destacada, su optimización a WebP y el despliegue al repositorio.

---

## 📋 Flujo de Trabajo (Workflow)

```
1. Consultar Blog-web.txt  ──>  2. Extraer el primer post sin marca "X"
                                           │
4. Generar Imagen IA (nanobanana) <── 3. Redactar el post (.mdx) 100% Producción
   especificando "no watermark"
             │
5. Optimizar a WebP y          ──>  6. Marcar "X" en Blog-web.txt y
   guardar en public/blog/             Git Commit + Push al repositorio
```

---

## Paso 1: Identificación del Artículo Pendiente

1. Abrir `Blog-web.txt` en la raíz del proyecto.
2. Localizar la primera fila que tenga la columna `Publicado` vacía (inmediatamente después del último marcado con `X`).
3. Extraer los siguientes datos:
   - **Semana:** Identificador de la entrega (ej: `Semana 12`).
   - **Idea de Titular:** Título propuesto (ej: `Qué es el Link Juice...`).
   - **Palabra Clave Principal:** Término a posicionar (ej: `qué es el link juice`).
   - **Volumen y KD:** Datos métricos para el frontmatter.
   - **Competidor:** Referencia de mercado.
   - **Estructura sugerida (H2):** Secciones obligatorias separadas por `·`.
   - **Slug:** Ruta URL del post (ej: `/blog/que-es-el-link-juice`).

---

## Paso 2: Reglas de Contenido y Tono Editorial

### 🎯 Enfoque Estratégico (SEO + Conversión)
- **Cero contenido borrador en producción:** El archivo `.mdx` generado debe estar 100% limpio y listo para desplegar en producción. NUNCA incluir prompts de imágenes, placeholders de texto ni anotaciones internas dentro del código `.mdx`.
- **Cero fugas de métricas:** NUNCA mencionar en el texto del artículo frases como "esta palabra clave tiene un volumen de 90" o "superar al competidor X". Esos datos son solo para el frontmatter.
- **Tono Profesional y Autoritario:** Escribir desde la perspectiva del **Equipo LTEvo**, combinando cercanía con rigor técnico (pensado para dueños de negocios, directores de marketing y emprendedores).
- **Hooks con Analogías:** Iniciar el artículo con una historia o analogía del mundo real que enganche al lector en los primeros 10 segundos.
- **Intención de Búsqueda Satisfecha:** Responder directamente a la duda principal antes de profundizar en los aspectos técnicos.
- **Prohibido diagramas en bloques de código ASCII:** NUNCA utilizar bloques de código (```) para dibujar esquemas o diagramas con texto/flechas. En Next.js / Tailwind `prose`, estos bloques se renderizan como ventanas de código terminal oscuro con scrollbar horizontal fijo. En su lugar, utilizar **tablas Markdown nativas**, **citas tipográficas (`>`)** o **listas numeradas jerárquicas**, que son 100% responsivas y accesibles.

---

## Paso 3: Estructura Estándar del Archivo `.mdx` (100% Producción)

Crear el archivo en `content/blog/<nombre-del-slug>.mdx` respetando el siguiente esquema:

### 1. Frontmatter YAML
```yaml
---
title: "[Idea de Titular]"
date: "YYYY-MM-DD"
author: "Equipo LTEvo"
semana: "[Semana X]"
keyword: "[Palabra Clave Principal]"
volumen: "[Volumen]"
kd: [KD]
competidor: "[Competidor]"
coverImage: "/blog/[slug-sin-prefijo].webp"
excerpt: "Resumen atractivo de 1-2 frases orientado a clic."
tags: ["SEO", "Categoría Relevante", "Tema Específico"]
---
```

### 2. Introducción con Hook y Analogía
- Párrafo 1: Analogía visual o situación cotidiana relacionada con el problema.
- Párrafo 2: Explicación de cómo este problema afecta al negocio en el entorno digital.
- Párrafo 3: Presentación de la guía y promesa de valor.

### 3. Secciones Principales (H2 y H3)
- Desarrollar cada H2 indicado en `Blog-web.txt` añadiendo subsecciones (H3) con viñetas y negritas para mejorar la legibilidad escaneable.
- Incluir **al menos una tabla comparativa o de resumen** en Markdown para sintetizar conceptos técnicos complejos.

### 4. Componentes Visuales React Disponibles para MDX
Utilizar estos componentes para esquemas visuales limpios, tecnológicos y minimalistas (integrados directamente en el lienzo, sin contenedores ni títulos pesados):

* **`<FlowDiagram />` y `<FlowStep />`**: Flujos secuenciales y circuitos (tarjetas conectadas con flechas adaptativas).
```mdx
<FlowDiagram>
  <FlowStep title="Paso 1" subtitle="Subtítulo opcional" badge="Badge">
    Descripción clara del paso.
  </FlowStep>
  <FlowStep title="Paso 2" badge="Badge 2">
    Descripción del segundo paso.
  </FlowStep>
</FlowDiagram>
```

* **`<TopicSilo />` y `<SiloCluster />`**: Diagramas de arquitectura en silo, Topic Clusters y jerarquías web integradas.
```mdx
<TopicSilo
  pillar={{ title: "Página de Servicio Principal", badge: "Pilar", desc: "Página transaccional" }}
>
  <SiloCluster title="Post Satélite 1" badge="Soporte">
    Canaliza tráfico al pilar.
  </SiloCluster>
  <SiloCluster title="Post Satélite 2" badge="Soporte">
    Resuelve dudas específicas.
  </SiloCluster>
</TopicSilo>
```

* **`<Callout />`**: Cajas de aviso editorial sutiles y elegantes (`tip` | `info` | `warning` | `success`).
```mdx
<Callout type="tip" title="Consejo Clave">
  Texto del consejo destacado para el usuario.
</Callout>
```

### 5. Conclusión y Llamada a la Acción (CTA de Conversión)
Finalizar siempre con un cierre que reconecte con el beneficio para el negocio y una llamada a la acción clara hacia los servicios de **LTEvo**:

```markdown
## Conclusión y Próximos Pasos

[Resumen de valor de 2 párrafos]

¿Quieres [beneficio clave del artículo] en tu sitio web? Contacta con el equipo de **LTEvo** y te asesoraremos sin compromiso para impulsar tu presencia digital.
```

---

## Paso 4: Generación y Optimización de la Imagen Destacada con IA

### 🎨 1. Reglas de Estilo Fotográfico Realista
⚠️ **NO ILUSTRACIONES NI DIBUJOS DE IA FANTASIOSOS.**
- **Estilo fotográfico profesional y limpio:** Monitores y pantallas reales con herramientas del sector (Google Search Console, Screaming Frog, analytics, editores de código, dashboards), escritorios minimalistas de oficina moderna con iluminación natural de estudio.
- **Prohibido:** Mascotas o robots de IA tipo 3D cartoon, renders ilustrados fantásticos o gráficos futuristas recargados de neón desenfocado.

### 🚫 2. Regla Crítica del Prompt: "no watermark"
En el prompt de generación, **es obligatorio especificar explícitamente que la imagen no debe contener marcas de agua**:
- Añadir cláusulas como: `no watermark, clean background, high resolution photograph, 8k, professional studio lighting, realistic details, no text overlays, no artifacts`.

### ⚡ 3. Generación con nanobanana / generate_image
- Invocar la herramienta de generación de imágenes (`generate_image` / nanobanana) configurando el aspect ratio horizontal `16:9` (ideal para cover de blog).

### 🛠️ 4. Conversión y Optimización a WebP
- Convertir la imagen generada a formato `.webp` optimizado (calidad recomendada: 75) y guardarla en:
  `public/blog/<slug-sin-prefijo>.webp`
- Comando de conversión rápida mediante Python (Pillow):
  ```bash
  python -c "from PIL import Image; Image.open(r'<ruta_imagen_generada>').convert('RGB').save(r'public/blog/<slug-sin-prefijo>.webp', 'WEBP', quality=75)"
  ```
- Verificar que el archivo existe en `public/blog/<slug-sin-prefijo>.webp` y coincide con la propiedad `coverImage` del frontmatter.

---

## Paso 5: Marcado de Finalización en `Blog-web.txt`

Una vez guardados el archivo `.mdx` y la imagen `.webp`:
1. Editar `Blog-web.txt`.
2. Insertar una `X` en la columna `Publicado` de la fila correspondiente.
3. Verificar que el formato de tabla en `Blog-web.txt` se mantenga perfectamente alineado.

---

## Paso 6: Commit y Push al Repositorio Git

Sincronizar los cambios con el repositorio remoto de forma limpia mediante Conventional Commits:

1. Añadir los archivos modificados y creados:
   ```bash
   git add content/blog/<slug-sin-prefijo>.mdx public/blog/<slug-sin-prefijo>.webp Blog-web.txt
   ```
2. Realizar el commit (sin menciones de IA ni `Co-Authored-By`):
   ```bash
   git commit -m "feat(blog): add post <slug-sin-prefijo> and cover image"
   ```
3. Enviar los cambios al repositorio remoto:
   ```bash
   git push
   ```

---

## 📊 Checklist de Control de Calidad
- [ ] ¿El archivo tiene la extensión `.mdx` y la ruta correcta en `content/blog/`?
- [ ] ¿El archivo `.mdx` está 100% limpio sin prompts o borradores?
- [ ] ¿El frontmatter contiene todos los metadatos requeridos y la ruta `coverImage: "/blog/[slug].webp"`?
- [ ] ¿El prompt de la imagen solicita estilo FOTOGRÁFICO REALISTA e incluye explícitamente `no watermark`?
- [ ] ¿Se generó la imagen con la herramienta de IA (`generate_image` / nanobanana)?
- [ ] ¿La imagen fue optimizada y guardada en formato WebP en `public/blog/[slug].webp`?
- [ ] ¿El CTA final conduce hacia la contratación de servicios con LTEvo?
- [ ] ¿Se marcó con una `X` la fila correspondiente en `Blog-web.txt` manteniendo el alineado?
- [ ] ¿Se realizaron el commit (`feat(blog): ...`) y el push (`git push`) al repositorio?
