# Hallazgos de Auditoría: Preparación para Búsquedas de Inteligencia Artificial (GEO)
**Puntuación de GEO: 75/100**

GEO (Generative Engine Optimization) prepara el sitio web para ser citado e indexado de forma óptima por motores de búsqueda e interfaces de chat de IA, como ChatGPT Search, Perplexity y Google AI Overviews / AI Mode.

---

## 1. Accesibilidad Técnica para Crawlers de IA

* **Robots.txt:** ✅ Permite la entrada de todos los rastreadores legítimos de IA de forma nativa (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
* **Directiva Google-Extended:** Google-Extended no está bloqueado. Esto permite que el contenido sea utilizado en el entrenamiento del modelo de Gemini.
* **Server-Side Rendering (SSR):** ✅ Excelente. Las IAs de búsqueda rápida no ejecutan JavaScript para ahorrar recursos. Al usar Next.js con renderizado estático de servidor, el texto principal del sitio está inmediatamente disponible para su lectura y citación.

---

## 2. Errores y Áreas de Mejora

### ❌ Ausencia de archivo de especificación `/llms.txt`
* **Definición:** El estándar `/llms.txt` (archivo en formato Markdown ubicado en la raíz del sitio) proporciona un mapa semántico y resumen conciso de los contenidos del sitio web optimizado para LLMs.
* **Recomendación:** Crear el archivo en la raíz del dominio (`public/llms.txt`) para guiar a los bots de IA de forma estructurada.

### ⚠️ Estructura de respuestas y citabilidad
* **Longitud Óptima de Párrafo:** Los párrafos y definiciones de servicios deben ser auto-contenidos, estructurados con un formato de pregunta-respuesta y con un tamaño ideal de **134 a 167 palabras** para maximizar la citabilidad en herramientas como ChatGPT y Perplexity.
* **Recomendación:** Rediseñar la sección introductoria de cada página de servicios para incorporar respuestas concisas a preguntas frecuentes del usuario en este rango de tamaño.
