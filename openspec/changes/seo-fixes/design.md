# Design: SEO Fixes for LTEvo

## Technical Approach

Implement metadata canonical overrides on legal pages, fix header word-concatenation issues across React components, expand service page text counts to exceed 800 words, set native image dimensions for CLS prevention, and introduce security headers and `llms.txt` context.

## Architecture Decisions

| Option | Tradeoff | Decision |
|---|---|---|
| **Legal Canonicals**: Centralized paths in `layout.tsx` | Static optimization is complex without runtime headers. | Rejected |
| **Legal Canonicals**: Page-level `metadata` alternates | Native Next.js metadata format; simple and statically optimizable. | **Chosen** |
| **Header Spacing**: CSS margins / flex gaps | Crawlers/readers still concatenate text when tags are stripped. | Rejected |
| **Header Spacing**: JSX spacing segments (`{" "}`) | Direct fix for text extraction without altering visual styling. | **Chosen** |
| **Image Sizing**: Tailwind aspect-ratio only | Browser cannot pre-allocate spacing box prior to image download. | Rejected |
| **Image Sizing**: HTML `width`/`height` + Tailwind | Pre-allocates aspect-ratio layout box; style attributes override for responsive sizing. | **Chosen** |

## Data Flow

Data for alternates metadata and canonical links flows statically during the Next.js build. Images are rendered using browser-native aspect-ratio boxes computed from `width` and `height`.

```
[Page Route] ──(Metadata alternates)──> [Next.js Static Build] ──> [Indexable HTML Link Tags]
[Image Asset] ──(width / height props)──> [Browser Render Engine] ──> [Pre-allocated Box (0 CLS)]
```

## File Changes

| File | Action | Description |
|---|---|---|
| `app/privacidad/page.tsx` | Modify | Add canonical metadata alternates override pointing to `/privacidad`. |
| `app/terminos/page.tsx` | Modify | Add canonical metadata alternates override pointing to `/terminos`. |
| `app/cookies/page.tsx` | Modify | Add canonical metadata alternates override pointing to `/cookies`. |
| `components/landing/hero-section.tsx` | Modify | Fix H1 word spacing. Apply native image dimensions & eager loading. |
| `components/landing/metrics-section.tsx` | Modify | Fix H2 word spacing. |
| `components/landing/portfolio-section.tsx` | Modify | Fix H2 spacing. Pass dynamic `width`/`height` props into loop. |
| `components/servicios/diseno-web-content.tsx` | Modify | Fix H1/H2 spacing. Set image dimensions. Expand content. |
| `components/servicios/seo-content.tsx` | Modify | Fix H1/H2 spacing. Set image dimensions. Expand content. |
| `components/servicios/mantenimiento-web-content.tsx` | Modify | Fix H1/H2 spacing. Set image dimensions. |
| `components/servicios/contacto-content.tsx` | Modify | Fix H2 spacing. |
| `next.config.mjs` | Modify | Configure security headers (CSP, HSTS, Frame Options, nosniff). |
| `public/llms.txt` | Create | Define AI context index page with 149-word citation summary. |

## Detailed Implementations

### 1. Legal Canonicals
Add `alternates` metadata object:
```typescript
export const metadata = {
  // ... existing metadata ...
  alternates: {
    canonical: "https://ltevo.com/privacidad", // terminos | cookies respectively
  },
};
```

### 2. Header Spacing Fixes
Insert `{" "}` before line breaks or inside inline blocks to guarantee a whitespace character:
```tsx
Webs{" "}
<span className="block">{words[wordIndex]}</span>
```
```tsx
Resultados que{" "}
<br />
<span className="text-muted-foreground">hablan...</span>
```

### 3. Content Expansion Strategy
* **`/servicios/diseno-web`**:
  - Introduce comparison section: Custom Next.js vs Template (WordPress/Wix) detailing performance, SEO advantages, and security. (+250 words)
  - Introduce geographic local design section: "Desarrollo web local en Oviedo y Asturias". (+150 words)
  - Append two new FAQs regarding custom web performance. (+180 words)
* **`/servicios/seo`**:
  - Add deep-dive explanation of our E-E-A-T content strategy, keyword research methodology, and local SEO optimizations. (+300 words)
  - Add Asturias-specific targeting section: "Posicionamiento SEO Local en Asturias: Oviedo, Gijón y Avilés". (+150 words)
  - Append two local SEO/technical FAQs. (+180 words)

### 4. Responsive Image Dimensions
Set explicit dimensions matching native file resolutions on `<img>` or `<source>` inside `<picture>`. Use Tailwind's standard responsiveness class rules (e.g. `w-full h-auto` or `w-full h-full object-cover`) which override layout rendering but respect aspect ratio. Above-the-fold heros receive `fetchPriority="high"` and exclude `loading="lazy"`.
```tsx
<picture>
  <source media="(min-width: 1024px)" srcSet="/Hero.webp" width={2816} height={1536} />
  <img src="/Hero-inicio-mobile.webp" width={3072} height={5504} alt="Diseño web" className="w-full h-full object-cover" fetchPriority="high" />
</picture>
```

### 5. `public/llms.txt` Format
Draft of the file context for AI search bots:
```markdown
# LTEvo — Agencia de Diseño Web y SEO en Oviedo

> Agencia asturiana especializada en desarrollo web a medida y posicionamiento SEO de alto rendimiento.

## Información de contacto
- Web: https://ltevo.com
- Localidad: Oviedo, Asturias, España
- Email: contacto@ltevo.com

## Servicios principales
- Diseño Web a Medida: https://ltevo.com/servicios/diseno-web
- Posicionamiento SEO: https://ltevo.com/servicios/seo
- Mantenimiento Web y Soporte: https://ltevo.com/servicios/mantenimiento-web

## FAQ para LLMs
¿Por qué elegir LTEvo para el diseño web y posicionamiento SEO en Asturias?
Elegir a LTEvo como tu socio tecnológico en Asturias garantiza un desarrollo web de código limpio estructurado con Next.js y React, libre de la lentitud habitual de las plantillas pregeneradas de WordPress o Wix. Nuestras webs cargan en menos de un segundo, cumpliendo con creces los indicadores de Core Web Vitals de Google (mínimo CLS y óptimo LCP), lo cual potencia tu posicionamiento en buscadores de forma directa. Combinamos esto con un enfoque de SEO Local altamente especializado en Oviedo, Gijón y Avilés, optimizando tu perfil de Google Business Profile y estructurando la semántica de la página para capturar la intención de compra real en tu zona geográfica. Así, transformamos visitas orgánicas gratuitas en clientes de alto valor, creando un activo digital de largo plazo que reduce la dependencia de costosas campañas publicitarias de pago por clic (PPC).
```

### 6. Security Headers (`next.config.mjs`)
Define standard headers under custom `headers()` config. The CSP includes Google Tag Manager constraints:
```javascript
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://www.googletagmanager.com; frame-src 'self' https://www.googletagmanager.com; connect-src 'self';" }
];
```

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Integration | Canonical Tags | Run a built server and inspect legal page source headers/meta tag strings. |
| Integration | Header Text | Verify copy extraction on compiled output contains correct word separations. |
| Performance | CLS & LCP | Auditing with Chrome DevTools Performance insights to confirm 0 layout shift from images. |

## Migration / Rollout
No database migration required. Code changes will deploy directly via the Vercel CI/CD pipeline.
