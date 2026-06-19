# Hallazgos de Auditoría: Optimización de Imágenes
**Puntuación de Imágenes: 88/100**

## 1. Estado General de las Imágenes

* **Total de imágenes rastreadas:** 105
* **Imágenes con texto alternativo (Alt) faltante:** **0 (100% de cumplimiento)**. ✅ EXCELENTE. Todas las imágenes analizadas, incluyendo iconos de tecnologías y capturas del portafolio, cuentan con etiquetas alt descriptivas de forma consistente.
* **Formatos de archivo utilizados:** ✅ WebP utilizado de forma predeterminada para el contenido local del sitio, garantizando un tamaño de archivo reducido y compresión moderna. Los iconos se cargan mediante un CDN externo de Simple Icons.

---

## 2. Puntos de Mejora Detectados

### ⚠️ Ausencia de dimensiones de maquetación (width y height)
* **Imágenes Afectadas (9 en total):**
  1. `https://ltevo.com/Hero-inicio-mobile.webp` (Home Mobile Banner)
  2. `https://ltevo.com/portfolio/cao.webp` (Portafolio CAO)
  3. `https://ltevo.com/portfolio/cuetu.webp` (Portafolio El Cuetu)
  4. `https://ltevo.com/servicios/diseno-web/Hero-servicios-diseno-web-mobile.webp`
  5. `https://ltevo.com/servicios/seo/Hero-servicios-seo.webp`
  6. `https://ltevo.com/servicios/mantenimiento-web/Hero-servicios-mantenimiento.webp`
* **Explicación técnica:** Si las imágenes no informan al navegador sobre su relación de aspecto antes de descargarse, el navegador no reservará el espacio correspondiente en la página. Esto provoca que el texto y los botones 'salten' repentinamente hacia abajo en la pantalla al renderizarse la imagen (Cumulative Layout Shift - CLS).
* **Solución:** Declarar explícitamente las dimensiones `width` y `height` proporcionales en el código fuente.

### Falta de prioridad de carga para imágenes principales
Las imágenes principales de portada (above-the-fold) deben cargarse con la máxima prioridad posible para optimizar la velocidad visual.
* **Recomendación:** Añadir `fetchpriority="high"` y la etiqueta de precarga correspondiente para la imagen hero de cada página, asegurando que **nunca** tengan el atributo `loading="lazy"`.
