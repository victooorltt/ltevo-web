# Plan de Acción SEO para LTEvo
**Priorización de tareas basadas en impacto y esfuerzo**

Este documento detalla el plan de acción en fases para solucionar las deficiencias encontradas durante la auditoría SEO y maximizar la visibilidad en motores de búsqueda clásicos (Google) y generativos (IA Search: ChatGPT, Perplexity, Gemini).

---

## Resumen de Prioridades

| Tarea | Impacto | Esfuerzo | Prioridad | Estado |
| :--- | :---: | :---: | :---: | :---: |
| **Corregir canonicals** en páginas legales | Alto | Muy Bajo | **Crítica** | 🔴 Pendiente |
| **Solucionar espaciados** en encabezados (H1/H2) | Alto | Bajo | **Crítica** | 🔴 Pendiente |
| **Añadir dimensiones (width/height)** a imágenes | Medio | Bajo | **Alta** | 🔴 Pendiente |
| **Optimizar imágenes LCP** con fetchpriority | Medio | Bajo | **Alta** | 🔴 Pendiente |
| **Crear archivo /llms.txt** para IAs | Medio | Bajo | **Media** | 🔴 Pendiente |
| **Ampliar contenido** de Diseño Web y SEO | Alto | Medio | **Media** | 🔴 Pendiente |
| **Configurar cabeceras de seguridad** (next.config) | Bajo | Bajo | **Baja** | 🔴 Pendiente |
| **Optimizar esquema ProfessionalService** global | Bajo | Bajo | **Baja** | 🔴 Pendiente |

---

## Detalle de Fases de Implementación

### Fase 1: Correcciones Críticas (Semana 1)
*Objetivo: Solucionar los bloqueos de indexación y mejorar la legibilidad semántica de los rastreadores.*

#### 1. Corrección de etiquetas canonical en páginas legales
* **Qué:** Las páginas `/privacidad`, `/terminos` y `/cookies` heredan el canonical de la home en `app/layout.tsx` apuntando a `https://ltevo.com`.
* **Cómo:** Define metadatos explícitos en cada página para sobreescribir el canonical por defecto:
  ```typescript
  // En app/privacidad/page.tsx, app/terminos/page.tsx y app/cookies/page.tsx
  export const metadata = {
    title: "...",
    description: "...",
    alternates: {
      canonical: "/privacidad", // o el path correspondiente
    }
  };
  ```

#### 2. Corrección de espaciados en encabezados por etiquetas `<br/>` o spans
* **Qué:** Varias palabras clave y títulos de páginas se unen de forma incorrecta (ej. `Websmodernas` o `SEOProfesional`) en la extracción de texto debido a maquetaciones en bloque sin delimitador de espacio.
* **Cómo:** Añadir espacios literales antes o después de la etiqueta `<br/>` o de las etiquetas span en los componentes de Next.js:
  * *Incorrecto:* `<span class="block">Webs</span><span>modernas</span>`
  * *Correcto:* `<span class="block">Webs </span><span>modernas</span>` o añadir un espacio intermedio.
  * *Incorrecto:* `Diseño Web Profesional<br/>a Medida`
  * *Correcto:* `Diseño Web Profesional <br/>a Medida`

---

### Fase 2: Rendimiento y UX Visual (Semanas 2-3)
*Objetivo: Estabilizar el renderizado visual y acelerar el Largest Contentful Paint.*

#### 1. Añadir dimensiones explicitas width/height a imágenes del portafolio y hero
* **Qué:** Se han identificado 9 imágenes sin dimensiones especificadas (incluyendo la hero de mobile).
* **Cómo:** Modifica el componente Image de Next.js o las etiquetas `<img>` para que incluyan propiedades `width` y `height` proporcionales a su aspecto nativo para evitar saltos de página (CLS).

#### 2. Optimización de imágenes above-the-fold (LCP)
* **Qué:** Acelerar la carga de la imagen de portada.
* **Cómo:** Asegura que la imagen de hero de cada página cuente con el atributo `fetchpriority="high"` y la propiedad `priority` en Next.js para cargarse de inmediato. Asegúrate de que **no** use lazy loading.

---

### Fase 3: Contenido y Preparación para IA (Mes 1)
*Objetivo: Aumentar la relevancia semántica y posicionar como fuente de información para LLMs.*

#### 1. Ampliación de contenido en Diseño Web y SEO
* **Qué:** `/servicios/diseno-web` (401 palabras) y `/servicios/seo` (460 palabras) son delgadas.
* **Cómo:** Ampliar la redacción agregando FAQs estructuradas reales, detalles paso a paso de la metodología, testimonios de clientes locales y tablas comparativas de servicios.

#### 2. Creación del archivo `/llms.txt`
* **Qué:** Facilitar el análisis del sitio a los bots de IA de forma nativa.
* **Cómo:** Guardar un archivo `llms.txt` en el directorio `public/` con un mapa estructurado del sitio en formato Markdown.

---

### Fase 4: Seguridad y Ajustes Menores (Continuo)
*Objetivo: Fortalecer el perfil técnico y refinar el SEO semántico.*

#### 1. Configurar cabeceras de seguridad
* **Qué:** Agregar cabeceras CSP, HSTS, X-Frame-Options y X-Content-Type-Options.
* **Cómo:** Añadir la sección de configuración de cabeceras en `next.config.mjs` bajo la propiedad `headers()`.

#### 2. Centralización del esquema ProfessionalService
* **Qué:** Evitar la duplicación de 1.5KB de JSON-LD idéntico en cada subpágina.
* **Cómo:** Modificar el layout para cargar ProfessionalService condicionalmente solo en la página de inicio (`/`) y la página de contacto.
