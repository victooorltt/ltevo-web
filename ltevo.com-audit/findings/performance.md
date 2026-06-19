# Hallazgos de Auditoría: Rendimiento y Core Web Vitals
**Puntuación de Rendimiento: 92/100**

## 1. Velocidad de Entrega del Servidor (Server Response Time)

* **Tiempo de respuesta promedio (TTFB estimado):** **0.052 segundos** (52ms) en páginas internas y **0.195 segundos** (195ms) en la home.
* **Hosting e Infraestructura:** El sitio se encuentra alojado en la red global de **Vercel** y utiliza Next.js con pre-renderizado estático (`X-Nextjs-Prerender: 1`).
* **Impacto SEO:** La velocidad de descarga inicial del servidor se encuentra en un rango de nivel de élite. Cumple con holgura el objetivo de Google de un TTFB inferior a 800ms.

---

## 2. Core Web Vitals (CWV) Heurísticas

### Largest Contentful Paint (LCP)
* **Estado:** ✅ Aceptable
* **Observación:** El renderizado inicial es extremadamente rápido debido al poco peso del HTML compilado. Sin embargo, no se detectan optimizaciones específicas de prioridad para las imágenes que ocupan la cabecera.
* **Recomendación:** Aplicar la propiedad `priority` en el componente Image de Next.js (que compila como `fetchpriority="high"`) para forzar al navegador a descargar las imágenes hero en la primera cola de red.

### Interaction to Next Paint (INP)
* **Estado:** ✅ Aceptable
* **Observación:** Al ser una página corporativa liviana con escaso código JS del lado del cliente, la interacción es fluida y el hilo principal del navegador se encuentra libre de bloqueos de tareas largas.

### Cumulative Layout Shift (CLS)
* **Estado:** ⚠️ Riesgo de Desplazamiento de Diseño
* **Observación:** La falta de dimensiones definidas en varias imágenes puede causar que el contenido inferior de la página salte repentinamente cuando las imágenes terminan de cargarse, afectando negativamente la métrica CLS en entornos móviles reales.
* **Recomendación:** Definir obligatoriamente `width` y `height` en todas las imágenes.
