# Hallazgos de Auditoría: Schema Markup & Datos Estructurados
**Puntuación de Schema: 85/100**

## 1. Esquemas Detectados

El sitio cuenta con una sólida base de marcado estructurado en JSON-LD (formato preferido por Google).

| Página | Tipos de Esquema Habilitados | Estado | Observación |
| :--- | :--- | :---: | :--- |
| Home | `ProfessionalService` | ✅ Válido | Información completa de Oviedo, contacto y catálogo de servicios. |
| Diseño Web | `ProfessionalService`, `Service`, `FAQPage` | ✅ Válido | FAQPage estructurado con 5 preguntas frecuentes. |
| SEO | `ProfessionalService`, `Service`, `FAQPage` | ✅ Válido | FAQPage estructurado con 5 preguntas frecuentes. |
| Mantenimiento | `ProfessionalService`, `Service`, `FAQPage` | ✅ Válido | FAQPage estructurado con 5 preguntas frecuentes. Agrega AggregateOffer. |
| Contacto | `ProfessionalService`, `ContactPage` | ✅ Válido | ContactPage estructurado incluyendo LocalBusiness alternativo. |
| Legales | `ProfessionalService` | ⚠️ Redundante | Heredado del root layout de Next.js. |

---

## 2. Puntos de Mejora y Cambios de Algoritmo

### ⚠️ Retiro de resultados enriquecidos de FAQPage en Google
* **Contexto Importante (Mayo 2026):** Google ha retirado formalmente la visualización de Rich Results para esquemas de tipo `FAQPage` en todas las páginas de resultados de búsqueda (SERP) a nivel mundial.
* **Impacto en LTEvo:** Los bloques FAQPage en las páginas de servicios de diseño web, SEO y mantenimiento web ya no generarán desplegables de preguntas bajo el enlace orgánico de Google.
* **Recomendación:** No es necesario eliminar este marcado, ya que continúa ayudando a la resolución de entidades y la extracción de información por parte de los rastreadores de Inteligencia Artificial (AI Mode / Gemini / ChatGPT), pero se debe ajustar el KPI del sitio para no esperar clics extra desde la SERP por esta vía.

### Redundancia del bloque ProfessionalService
* **Problema:** En Next.js `app/layout.tsx` se define el marcado `ProfessionalService` de forma estática, inyectándose en el HTML final de **todas** las subpáginas (incluyendo las páginas de cookies, términos y privacidad). Esto es redundante y añade peso innecesario al DOM.
* **Recomendación:** Cargar este bloque únicamente en la página de inicio (`/`) y la página de contacto. Para el resto de páginas de servicio, basta con referenciar a LTEvo como el `provider` en el esquema de tipo `Service` utilizando la sintaxis de ID:
  ```json
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://ltevo.com/#business"
  }
  ```
