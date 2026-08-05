---
name: ltevo-blog-generator
description: Guía paso a paso para redactar y publicar artículos de blog optimizados para SEO y captación de clientes en LTEvo, leyendo la planificación desde Blog-web.txt y actualizando el estado tras la publicación.
---

# Skill de Redacción SEO y Captación de Clientes para LTEvo

Esta skill define el procedimiento estandarizado para generar artículos de blog de máxima calidad para la web de **LTEvo**, orientados tanto a posicionamiento orgánico en buscadores (SEO) como a la conversión de lectores en clientes.

---

## 📋 Flujo de Trabajo (Workflow)

```
1. Consultar Blog-web.txt  ──>  2. Extraer el primer post sin marca "X"
                                           │
4. Entregar Prompt Realista <── 3. Redactar el post (.mdx) 100% Producción
     en Chat & Marcar "X"
```

---

## Paso 1: Identificación del Artículo Pendiente

1. Abrir `Blog-web.txt` en la raíz del proyecto.
2. Localizar la primera fila que tenga la columna `Publicado` vacía (inmediatamente después del último marcado con `X`).
3. Extraer los siguientes datos:
   - **Semana:** Identificador de la entrega (ej: `Semana 11`).
   - **Idea de Titular:** Título propuesto (ej: `Rich Snippets: Qué Son y Cómo Conseguirlos...`).
   - **Palabra Clave Principal:** Término a posicionar (ej: `qué son los rich snippets`).
   - **Volumen y KD:** Datos métricos para el frontmatter.
   - **Competidor:** Referencia de mercado.
   - **Estructura sugerida (H2):** Secciones obligatorias separadas por `·`.
   - **Slug:** Ruta URL del post (ej: `/blog/que-son-los-rich-snippets`).

---

## Paso 2: Reglas de Contenido y Tono Editorial

### 🎯 Enfoque Estratégico (SEO + Conversión)
- **Cero contenido borrador en producción:** El archivo `.mdx` generado debe estar 100% limpio y listo para desplegar en producción. NUNCA incluir prompts de imágenes, placeholders de texto ni anotaciones internas dentro del código `.mdx`.
- **Cero fugas de métricas:** NUNCA mencionar en el texto del artículo frases como "esta palabra clave tiene un volumen de 90" o "superar al competidor X". Esos datos son solo para el frontmatter.
- **Tono Profesional y Autoritario:** Escribir desde la perspectiva del **Equipo LTEvo**, combinando cercanía con rigor técnico (pensado para dueños de negocios, directores de marketing y emprendedores).
- **Hooks con Analogías:** Iniciar el artículo con una historia o analogía del mundo real que enganche al lector en los primeros 10 segundos.
- **Intención de Búsqueda Satisfecha:** Responder directamente a la duda principal antes de profundizar en los aspectos técnicos.

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

### 4. Conclusión y Llamada a la Acción (CTA de Conversión)
Finalizar siempre con un cierre que reconecte con el beneficio para el negocio y una llamada a la acción clara hacia los servicios de **LTEvo**:

```markdown
## Conclusión y Próximos Pasos

[Resumen de valor de 2 párrafos]

¿Quieres [beneficio clave del artículo] en tu sitio web? Contacta con el equipo de **LTEvo** y te asesoraremos sin compromiso para impulsar tu presencia digital.
```

---

## Paso 4: Estilo de Imágenes e IA (REGLA CRÍTICA DE ESTILO REALISTA)

⚠️ **NO ILUSTRACIONES NI DIBUJOS DE IA FANTASIOSOS.**

Los prompts deben solicitar imágenes con **estilo fotográfico realista, profesional y limpio**:
- **Monitores y pantallas reales:** Mostrar pantallas de trabajo con herramientas del sector (Google Search Console, Screaming Frog, analytics, editores de código, dashboards).
- **Anotaciones y esquemas técnicos:** En temas de UX/UI o arquitectura web, incluir bocetos, wireframes o esquemas anotados en entornos profesionales.
- **Gráficas y dashboards:** Gráficos de tendencias de tráfico orgánico, métricas limpias y ordenadas en un monitor sobre un escritorio de oficina moderna.
- **Entorno de oficina moderna:** Iluminación natural o de estudio limpia, escritorios minimalistas, portátiles profesionales (MacBook, monitores ultra-wide).
- **Prohibido:** Mascotas o robots de IA tipo 3D cartoon, renders ilustrados fantásticos o gráficos futuristas recargados de neón desenfocado.

### Formato de entrega:
El prompt se entrega **ÚNICAMENTE EN EL CHAT** para que el usuario lo copie y pegue en su generador de imágenes (Midjourney, DALL-E, Flux, etc.).

---

## Paso 5: Marcado de Finalización

Una vez guardado el archivo `.mdx` en `content/blog/`:
1. Editar `Blog-web.txt`.
2. Insertar una `X` en la columna `Publicado` de la fila correspondiente.
3. Verificar que el formato de tabla en `Blog-web.txt` se mantenga perfectamente alineado.

---

## 📊 Checklist de Control de Calidad
- [ ] ¿El archivo tiene la extensión `.mdx` y la ruta correcta en `content/blog/`?
- [ ] ¿El archivo `.mdx` está 100% limpio sin prompts o borradores?
- [ ] ¿El frontmatter contiene todos los metadatos requeridos?
- [ ] ¿El prompt para la imagen es FOTOGRÁFICO REALISTA (monitores, gráficas, herramientas reales)?
- [ ] ¿Se eliminaron robots/cartoons de IA del concepto visual?
- [ ] ¿Se entregó el Prompt de IA en el chat para el usuario?
- [ ] ¿El CTA final conduce hacia la contratación de servicios con LTEvo?
- [ ] ¿Se marcó con una `X` la fila correspondiente en `Blog-web.txt`?
