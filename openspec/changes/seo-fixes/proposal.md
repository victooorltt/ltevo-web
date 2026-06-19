# Proposal: SEO Fixes for LTEvo

## Intent
Improve search engine rankings, accessibility, Core Web Vitals (CLS/LCP), and AI crawler context by fixing canonical pages, text rendering bugs, thin content, and image sizing.

## Scope
### In Scope
- **Canonicals**: Add self-referencing canonical tags to legal pages.
- **Header Spacing**: Fix word concatenation in 13 heading blocks by adding spaces (e.g. `{" "}`).
- **Content Expansion**: Expand `/servicios/diseno-web` and `/servicios/seo` to 800+ words with structured helpful sections (FAQs, technical descriptions).
- **Image Dimensions**: Add explicit dimensions (`width`/`height`) and priority configs for 8 WebP images.
- **AI Context**: Deploy `public/llms.txt` with formatted site metadata.

### Out of Scope
- Modifying styles or design system tokens.
- Backlink updates or off-site SEO.

## Approach
- Add `alternates` metadata fields to Next.js page metadata.
- Wrap spacing segments inside JSX tags directly.
- Add detailed Next.js vs template comparison, Asturias local SEO content, and FAQs to services pages.
- Set explicit `width`/`height` on images using natural sizes, applying `fetchpriority="high"` and disabling `loading="lazy"` on above-the-fold heros.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/privacidad/page.tsx` | Modified | Add canonical metadata override. |
| `app/terminos/page.tsx` | Modified | Add canonical metadata override. |
| `app/cookies/page.tsx` | Modified | Add canonical metadata override. |
| `components/landing/` | Modified | Fix heading spacing and image CLS in `hero-section.tsx`, `metrics-section.tsx`, `portfolio-section.tsx`. |
| `components/servicios/` | Modified | Expand content, fix headings, and set image dimensions in `diseno-web-content.tsx`, `seo-content.tsx`, `mantenimiento-web-content.tsx`, `contacto-content.tsx`. |
| `public/llms.txt` | New | Add AI bot context file. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Responsive image layout skew | Low | Use Tailwind classes to maintain aspect ratio responsive sizing. |
| Static compilation error | Low | Verify clean production builds with `npm run build` after modifications. |

## Rollback Plan
Revert changes using git commands:
`git checkout -- app/ components/ public/llms.txt`

## Dependencies
- None

## Success Criteria
- [ ] No word concatenation in search crawls.
- [ ] Canonical tags on legal pages point to their own path.
- [ ] Service pages exceed 800 words.
- [ ] Zero CLS layout shifts from the 8 images.
- [ ] `/llms.txt` is fetchable.
