# Delta Specifications: SEO Fixes (touching Legal, Landing, Servicios, Public)

## 1. Legal Canonical URLs
All legal pages MUST have self-referencing canonical URLs.

| Page | URL Path | Required Metadata Canonical |
|---|---|---|
| Privacy | `/privacidad` | `https://ltevo.com/privacidad` |
| Terms | `/terminos` | `https://ltevo.com/terminos` |
| Cookies | `/cookies` | `https://ltevo.com/cookies` |

#### Scenario: Metadata validation
- GIVEN the Privacy, Terms, and Cookies page metadata exports
- WHEN the static pages compile
- THEN each page contains alternates.canonical matching its URL path

## 2. Heading Spacing (Word Gluing Fix)
Word concatenation from `<br />` or `<span>` blocks MUST be resolved by inserting a space segment `{" "}` before the tag.

| File | Tag | Concatenated (Glued) Crawl | Expected Correct Crawl |
|---|---|---|---|
| `metrics-section.tsx` | h2 | `Resultados quehablan por sí solos.` | `Resultados que hablan por sí solos.` |
| `portfolio-section.tsx` | h2 | `Proyectos reales.Resultados que se ven.` | `Proyectos reales. Resultados que se ven.` |
| `diseno-web-content.tsx` | h1 | `Diseño Web Profesionala Medida` | `Diseño Web Profesional a Medida` |
| `diseno-web-content.tsx` | h2 | `¿Por qué una weba medida con nosotros?` | `¿Por qué una web a medida con nosotros?` |
| `diseno-web-content.tsx` | h2 | `Modelos web queimpulsan tu negocio.` | `Modelos web que impulsan tu negocio.` |
| `diseno-web-content.tsx` | h2 | `Metodología Encuatro etapas claras.` | `Metodología en cuatro etapas claras.` |
| `diseno-web-content.tsx` | h2 | `¿Listo para crearalgo extraordinario?` | `¿Listo para crear algo extraordinario?` |
| `seo-content.tsx` | h1 | `Posicionamiento SEOProfesional` | `Posicionamiento SEO Profesional` |
| `seo-content.tsx` | h2 | `¿Qué aporta el SEOa tu estrategia digital?` | `¿Qué aporta el SEO a tu estrategia digital?` |
| `seo-content.tsx` | h2 | `Estrategias de SEOque marcan la diferencia.` | `Estrategias de SEO que marcan la diferencia.` |
| `seo-content.tsx` | h2 | `Optimización integralen tres fases continuas.` | `Optimización integral en tres fases continuas.` |
| `seo-content.tsx` | h2 | `¿Quieres captar clientessin depender de anuncios?` | `¿Quieres captar clientes sin depender de anuncios?` |
| `contacto-content.tsx` | h1 | `¿Tienes un proyecto?Hablemos de él.` | `¿Tienes un proyecto? Hablemos de él.` |

#### Scenario: Heading spacing crawl
- GIVEN a heading element with a `<br />` tag
- WHEN crawled by a flat text browser
- THEN a space exists between words adjacent to the line break

## 3. Content Expansion (800+ Words)
Service pages MUST exceed 800 words.

- **Diseño Web**: Include Next.js vs CMS/templates (WordPress/Shopify/Webflow) comparison table (comparing performance, speed, SEO, cost, security), local Asturias/Oviedo market context, and 5 detailed FAQ items.
- **Posicionamiento SEO**: Include detailed technical SEO phase definitions (audit, keyword research, on-page content, link building), local Asturias business context, and 5 detailed FAQ items.

#### Scenario: Page word count validation
- GIVEN the compiled services pages
- WHEN counting raw words in main layout
- THEN count exceeds 800 words per page

## 4. Image Dimensions (CLS Optimization)
All WebP images MUST specify explicit dimensions. Above-the-fold images MUST use high priority.

| Image Source | File | Width | Height | Priority (fetchpriority) | Lazy Load |
|---|---|---|---|---|---|
| `/Hero.webp` | `hero-section.tsx` | 2816 | 1536 | `high` | Disabled |
| `/Hero-inicio-mobile.webp` | `hero-section.tsx` | 3072 | 5504 | `high` | Disabled |
| `/portfolio/cao.webp` | `portfolio-section.tsx` | 1782 | 861 | Default | Enabled |
| `/portfolio/cuetu.webp` | `portfolio-section.tsx` | 1340 | 845 | Default | Enabled |
| `/Hero-servicios-diseno-web.webp` | `diseno-web-content.tsx` | 2752 | 1536 | `high` | Disabled |
| `/Hero-servicios-diseno-web-mobile.webp` | `diseno-web-content.tsx` | 1200 | 2150 | `high` | Disabled |
| `/Hero-servicios-mantenimiento.webp` | `mantenimiento-web-content.tsx` | 2752 | 1536 | `high` | Disabled |
| `/Hero-servicios-seo.webp` | `seo-content.tsx` | 2752 | 1536 | `high` | Disabled |

#### Scenario: Image loading attributes
- GIVEN above-the-fold images in the DOM
- WHEN loaded by the browser
- THEN no CLS shifts occur and they load with fetchpriority high

## 5. llms.txt and AI Citability
Deploy a public markdown context file at `/llms.txt` and front-load AI-citable definition blocks (134-167 words) in service headers.

#### Scenario: llms.txt availability
- GIVEN the build output
- WHEN requesting `https://ltevo.com/llms.txt`
- THEN the file is served with status 200 and formatted markdown content
