# Reporte de Auditoría SEO Completo: ltevo.com
**Fecha del Análisis:** 19 de junio de 2026  
**Localización del Proyecto:** C:/Users/anate/Desktop/ltevo-web  
**Puntuación SEO Health Score:** 83/100

---

## Índice del Reporte
1. [Resumen Ejecutivo y Puntuación](#1-resumen-ejecutivo-y-puntuaci%C3%B3n)
2. [Desglose de Categorías de Auditoría](#2-desglose-de-categor%C3%ADas-de-auditor%C3%ADa)
3. [Hallazgos Técnicos y Bloqueos de Indexación](#3-hallazgos-t%C3%A9cnicos-y-bloqueos-de-indexaci%C3%B3n)
4. [Calidad del Contenido y Problemas Semánticos](#4-calidad-del-contenido-y-problemas-sem%C3%A1nticos)
5. [Estructura de Datos (Schema)](#5-estructura-de-datos-schema)
6. [Rendimiento y Optimización de Imágenes](#6-rendimiento-y-optimizaci%C3%B3n-de-im%C3%A1genes)
7. [Preparación para Búsquedas de Inteligencia Artificial (GEO)](#7-preparaci%C3%B3n-para-b%C3%BAsquedas-de-inteligencia-artificial-geo)
8. [Search Experience Optimization (SXO)](#8-search-experience-optimization-sxo)
9. [Conclusión e Implementación](#9-conclusi%C3%B3n-e-implementaci%C3%B3n)

---

## 1. Resumen Ejecutivo y Puntuación

La auditoría realizada sobre el dominio `https://ltevo.com/` revela un sitio con un **rendimiento técnico muy alto y excelente velocidad de carga**, estructurado sobre una base Next.js de primer nivel. Cuenta con un uso ideal de canonicals en subpáginas y una impecable cobertura del 100% en textos alternativos de imágenes.

Sin embargo, se han detectado **dos errores de severidad crítica** que limitan su potencial orgánico: un error de configuración en las etiquetas canonical de las páginas legales (apuntando a la home en lugar de ser autorreferenciales) y un problema recurrente de unión de palabras (concatenación por saltos de línea/etiquetas de bloque) en los encabezados principales (H1/H2) de las páginas más importantes.

### Puntuación General: 83/100

---

## 2. Desglose de Categorías de Auditoría

| Categoría | Estado | Puntuación | Peso |
| :--- | :---: | :---: | :---: |
| [Technical SEO](#3-hallazgos-t%C3%A9cnicos-y-bloqueos-de-indexaci%C3%B3n) | ⚠️ Advertencia | 78/100 | 22% |
| [Content Quality](#4-calidad-del-contenido-y-problemas-sem%C3%A1nticos) | ⚠️ Advertencia | 82/100 | 23% |
| On-Page SEO | ✅ Excelente | 88/100 | 20% |
| [Schema / Structured Data](#5-estructura-de-datos-schema) | ✅ Excelente | 85/100 | 10% |
| [Performance (Core Web Vitals)](#6-rendimiento-y-optimizaci%C3%B3n-de-im%C3%A1genes) | ✅ Excelente | 92/100 | 10% |
| [AI Search Readiness (GEO)](#7-preparaci%C3%B3n-para-b%C3%BAsquedas-de-inteligencia-artificial-geo) | ⚠️ Advertencia | 75/100 | 10% |
| [Images](#6-rendimiento-y-optimizaci%C3%B3n-de-im%C3%A1genes) | ✅ Excelente | 88/100 | 5% |

---

## 3. Hallazgos Técnicos y Bloqueos de Indexación
*Hallazgo detallado disponible en: [findings/technical.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/technical.md)*

### Errores Críticos (Corregir de Inmediato)
1. **Canonicals erróneos en páginas de cookies, privacidad y términos de uso:** Apuntan de forma incorrecta a la página de inicio. Esto impide a Google indexar individualmente estas páginas legales requeridas para la seguridad del dominio.
2. **Cabeceras HTTP de seguridad ausentes:** Ausencia de CSP, X-Frame-Options y X-Content-Type-Options en las respuestas de Vercel.

---

## 4. Calidad del Contenido y Problemas Semánticos
*Hallazgo detallado disponible en: [findings/content.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/content.md)*

### Error de concatenación de texto en encabezados (H1/H2)
Por la forma de maquetación móvil ( Next.js / Tailwind CSS / Spans ), los motores de búsqueda extraen palabras juntas en los encabezados principales del sitio, por ejemplo:
* `Websmodernas` (H1 Inicio)
* `Diseño Web Profesionala Medida` (H1 Diseño Web)
* `Posicionamiento SEOProfesional` (H1 SEO)
* `Mantenimiento WebProfesional` (H1 Mantenimiento)
* `¿Por qué una weba medida con nosotros?` (H2 Diseño Web)

*Acción:* Modificar el código fuente de los componentes en Next.js para asegurar que las palabras separadas por etiquetas de salto de línea (`<br/>`) o spans en bloque contengan espacios físicos delimitadores.

### Longitud de contenido
Las páginas de Diseño Web (401 palabras) y SEO (460 palabras) son delgadas. Deben expandirse por encima de las 800 palabras para mejorar la riqueza de términos semánticos de cobertura.

---

## 5. Estructura de Datos (Schema)
*Hallazgo detallado disponible en: [findings/schema.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/schema.md)*

* El marcado JSON-LD está bien implementado en general (`ProfessionalService`, `Service`, `ContactPage`).
* **Nota sobre FAQPage:** Se detecta FAQPage en las subpáginas de servicios. Es importante advertir que a partir del **7 de mayo de 2026**, Google ha retirado formalmente la visualización de preguntas frecuentes enriquecidas en las SERP tradicionales. No obstante, se recomienda mantener este marcado ya que facilita la citación en sistemas de IA (ChatGPT, Perplexity).

---

## 6. Rendimiento y Optimización de Imágenes
*Hallazgo detallado disponible en: [findings/performance.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/performance.md) e [findings/images.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/images.md)*

* **Velocidad:** El TTFB del servidor Vercel es sobresaliente (<200ms).
* **Desplazamiento visual (CLS):** Se han identificado 9 imágenes sin ancho y alto declarados (incluidas las portadas y portfolio). Esto provoca saltos en la maquetación durante la carga del sitio.
* **LCP (Above the fold):** Falta la etiqueta `fetchpriority="high"` en las imágenes hero de Next.js para mejorar la prioridad de carga visual del navegador.

---

## 7. Preparación para Búsquedas de Inteligencia Artificial (GEO)
*Hallazgo detallado disponible en: [findings/geo.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/geo.md)*

* **Acceso de bots:** Abierto de forma correcta en robots.txt.
* **Recomendación:** Crear el archivo `/llms.txt` en formato Markdown en la carpeta `public/` para estructurar la lectura a herramientas de Inteligencia Artificial.

---

## 8. Search Experience Optimization (SXO)
*Hallazgo detallado disponible en: [findings/sxo.md](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/findings/sxo.md)*

* **Veredicto de Intención:** **ALINEADO.** El tipo de página de LTEvo (Landing de agencia local) coincide perfectamente con la tipología premiada en la primera página de Google en Oviedo para el término clave "diseño web oviedo".
* **Plan de mejora:** Resolver las concatenaciones gramaticales de los H1/H2 y añadir tablas comparativas claras sobre las tarifas de mantenimiento y desarrollo de servicios.

---

## 9. Conclusión e Implementación

El sitio web de LTEvo cuenta con una base de desarrollo excelente y alto rendimiento técnico. Aplicar las correcciones priorizadas en el [PLAN DE ACCIÓN](file:///C:/Users/anate/Desktop/ltevo-web/ltevo.com-audit/ACTION-PLAN.md) aumentará significativamente el rendimiento semántico de sus encabezados clave, solucionará problemas latentes de indexación en páginas legales y estabilizará su renderizado visual (CLS) eliminando riesgos de penalización en los Core Web Vitals de Google.
