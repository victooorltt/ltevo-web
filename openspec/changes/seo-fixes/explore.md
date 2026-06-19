# Exploration: SEO Fixes for LTEvo

This document details the exploration of the codebase regarding the issues identified in the SEO Performance Audit for `ltevo.com`.

## Current State
1. **Canonical Tags on Legal Pages**: The legal pages (`/privacidad`, `/terminos`, and `/cookies`) inherit the default canonical tag (`https://ltevo.com`) defined in `app/layout.tsx` because their page-level `metadata` configurations do not specify an `alternates.canonical` property.
2. **Header Spacing/Concatenation**: Heading elements (H1 and H2) in components use `<br />` or inline block `<span>` elements without surrounding spaces (e.g. `Webs` and `modernas` in separate `block` spans, or `Diseño Web Profesional<br />a Medida`). When parsed as text by search engines or screen readers, the words are glued together (resulting in `Websmodernas`, `Diseño Web Profesionala Medida`, `Resultados quehablan`, etc.).
3. **Thin Content on Service Pages**: The Design Web service page (`/servicios/diseno-web`) has 401 words, and the SEO service page (`/servicios/seo`) has 460 words. This is thin content for high-intent competitive keywords.
4. **Missing Image Dimensions**: 8 key WebP images on the site are rendered inside standard HTML `<img>` tags (or `<picture>` wrappers) without explicit `width` and `height` properties. This triggers Cumulative Layout Shift (CLS) warnings and prevents optimization of Largest Contentful Paint (LCP) since above-the-fold images lack priority configuration.
5. **No AI Search Engine Context**: The site lacks a `/llms.txt` file which is the emerging standard to guide generative AI bots (ChatGPT, Claude, Perplexity) when summarizing, indexing, or referencing the website services.

## Affected Areas
- [app/layout.tsx](file:///C:/Users/anate/Desktop/ltevo-web/app/layout.tsx) — Contains global metadata defaults.
- [app/privacidad/page.tsx](file:///C:/Users/anate/Desktop/ltevo-web/app/privacidad/page.tsx) — Needs self-referencing canonical.
- [app/terminos/page.tsx](file:///C:/Users/anate/Desktop/ltevo-web/app/terminos/page.tsx) — Needs self-referencing canonical.
- [app/cookies/page.tsx](file:///C:/Users/anate/Desktop/ltevo-web/app/cookies/page.tsx) — Needs self-referencing canonical.
- [components/landing/hero-section.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/landing/hero-section.tsx) — H1 spacing issue and hero image dimension/priority.
- [components/landing/metrics-section.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/landing/metrics-section.tsx) — H2 spacing issue.
- [components/landing/portfolio-section.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/landing/portfolio-section.tsx) — Loop renders CAO and El Cuetu images without dimensions.
- [components/servicios/diseno-web-content.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/servicios/diseno-web-content.tsx) — Heading spacing issues, thin content expansion (from 401 to 800+ words), hero image dimension/priority.
- [components/servicios/seo-content.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/servicios/seo-content.tsx) — Heading spacing issues, thin content expansion (from 460 to 800+ words), hero image dimension/priority.
- [components/servicios/mantenimiento-web-content.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/servicios/mantenimiento-web-content.tsx) — Heading spacing issues and hero image dimension/priority.
- [components/servicios/contacto-content.tsx](file:///C:/Users/anate/Desktop/ltevo-web/components/servicios/contacto-content.tsx) — H2 spacing issue.
- `public/llms.txt` — New file to be added in the public assets directory.

---

## Approaches

### 1. Legal Pages Canonical Fix
- **Option A (Centralized)**: Dynamic resolution in `app/layout.tsx` based on the path.
  - *Pros*: Single change.
  - *Cons*: Next.js App Router static optimization makes header-based path inspection difficult without custom middleware or request hooks.
- **Option B (Page-specific overrides - Recommended)**: Override alternates in metadata of each legal page file.
  - *Pros*: Follows standard Next.js metadata guidelines, supports static rendering, easy implementation.
  - *Cons*: Requires editing three separate page files.
  - *Effort*: Low

### 2. Spacing and Concatenation Fix
- **Option A (Adding whitespace characters directly - Recommended)**: Inject standard spaces inside the JSX text or insert a `{" "}` spacing segment before `<br />` or inside block tags.
  - *Pros*: Completely fixes search crawler text extraction without affecting visual margins or display.
  - *Cons*: Must be manually applied to all affected sections.
  - *Effort*: Low
- **Option B (CSS-only spacing adjustments)**: Use CSS margins or pseudo-elements to force spacing.
  - *Pros*: No text edits.
  - *Cons*: Does not solve raw HTML text extraction for bots that strip styles, nor screen reader concatenation.
  - *Effort*: Medium

### 3. Content Expansion to 800+ Words
- **Option A (Adding dummy/fluff copy)**: Expand existing sections with generic SEO copy.
  - *Pros*: Fast.
  - *Cons*: Low quality, hurts user conversion, violates Google's E-E-A-T helpful content guidelines.
  - *Effort*: Low
- **Option B (Adding helpful sections and Q&As - Recommended)**: Write rich, structured sections detailing:
  - Technical reasons to choose Next.js and custom development over templates (WordPress/Wix).
  - Deeper descriptions of services and deliverables.
  - Expanded FAQ questions targeting search intent (e.g. "What is our optimization process?", "How do we secure the web?").
  - Practical benefits of local SEO in Oviedo/Asturias.
  - *Pros*: Enhances real value, conforms to E-E-A-T standards, maintains clean aesthetic.
  - *Cons*: Requires writing thorough content.
  - *Effort*: Medium

### 4. Image Dimensions (CLS & LCP Fix)
We extracted the exact natural dimensions of the WebP assets in the `public` directory:
- `Hero-inicio-mobile.webp` (Home mobile hero): **3072 x 5504**
- `Hero.webp` (Home desktop hero): **2816 x 1536**
- `portfolio/cao.webp` (CAO project image): **1782 x 861**
- `portfolio/cuetu.webp` (El Cuetu project image): **1340 x 845**
- `Hero-servicios-diseno-web-mobile.webp` (Design mobile hero): **1200 x 2150**
- `Hero-servicios-diseno-web.webp` (Design desktop hero): **2752 x 1536**
- `Hero-servicios-seo.webp` (SEO hero): **2752 x 1536**
- `Hero-servicios-mantenimiento.webp` (Mantenimiento hero): **2752 x 1536**

- **Option A (Declare inline dimensions on `<img>` tags - Recommended)**: Add `width` and `height` properties matching the native values. Enable `fetchpriority="high"` and disable `loading="lazy"` on hero above-the-fold images.
  - *Pros*: Solves CLS immediately since the browser can pre-compute aspect ratio. Easy to configure.
  - *Cons*: None. Tailwind's standard classes like `w-full h-full object-cover` or `h-auto` will still scale the image responsively while using the aspect ratio.
  - *Effort*: Low

### 5. Structure for `llms.txt`
We will introduce a `public/llms.txt` file with:
- `# LTEvo — Agencia de Diseño Web y SEO`
- Concise summaries of our expertise, stack (Next.js, React, Tailwind CSS, TypeScript), and offerings.
- Links to services (`/servicios/diseno-web`, `/servicios/seo`, `/servicios/mantenimiento-web`).
- Core Q&A/definitions designed in the **134 to 167 words** range to optimize citation rates in LLM generation engines (GEO).

---

## Recommendation
We recommend implementing:
1. **Option B for Canonicals**: Add the `alternates` metadata fields to `app/privacidad/page.tsx`, `app/terminos/page.tsx`, and `app/cookies/page.tsx`.
2. **Option A for Header Spacing**: Correct all 13 heading blocks by placing a standard space `{" "}` before line breaks or inside spans.
3. **Option B for Content**: Expand `/servicios/diseno-web` and `/servicios/seo` with clear structured blocks:
   - High-performance technical stack descriptions.
   - Comprehensive service features.
   - Local SEO specifics for Asturias.
   - Broadened FAQs.
4. **Option A for Image Dimensions**: Declare layout dimensions (`width` and `height`) on the 8 WebP assets using their natural sizes. Set priority flags for Above-the-fold banners.
5. **Standardized `/llms.txt`**: Deploy the file into `public/llms.txt` with formatted Markdown and GEO citations.

---

## Risks
- **Design Shift/Aesthetic Alterations**: If width/height dimensions conflict with custom CSS classes (e.g. Tailwind `w-full h-full`), it could skew the visual rendering. We must test the responsive layout carefully to make sure Tailwind styles take priority over the HTML width/height properties.
- **Static Compilation Impact**: Content changes inside `seo-content.tsx` and `diseno-web-content.tsx` should compile statically. We must verify that no runtime-only dependencies are broken.

---

## Ready for Proposal
**Yes**. The locations, code issues, exact image dimensions, and solutions have been mapped. We are ready to proceed to the spec phase.
