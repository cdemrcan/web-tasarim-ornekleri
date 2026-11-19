# Implementation Plan

## Technical approach

**Stack:** [Astro](https://astro.build) (static output) + TypeScript (strict) + plain modern CSS with per-site custom-property tokens.

Why Astro rather than hand-written HTML:

- Seven sites and about 30 pages share head and SEO logic, the concept notice, image handling and form validation. Astro components remove that duplication without shipping a framework to the browser: pages ship zero JavaScript by default.
- Content (menus, listings, treatments, projects) lives in typed data files, separate from presentation (master prompt §7).
- Static output deploys to GitHub Pages for free, with no server to secure.
- Built-in sitemap integration; small, well-maintained dependency set.

The only browser JavaScript is for real interactions: menu tabs, the treatment finder, listing filters, the service basket, project filters, form validation and the mobile navigation. Each is a small TypeScript module scoped to its page.

### Dependencies (each justified)

| Package | Why |
|---|---|
| `astro` | Static site generator (above). |
| `@astrojs/sitemap` | Generates `sitemap-index.xml`. |
| `@astrojs/check`, `typescript` | Type checking (`astro check`). |
| `@fontsource/*` (one per typeface) | Self-hosted OFL fonts with the `latin-ext` subset. No Google Fonts requests, no third-party tracking. |
| `@playwright/test`, `@axe-core/playwright` (dev only) | Automated browser QA: accessibility scans, horizontal-overflow checks and broken-link checks at 375 / 390 / 768 / 1024 / 1440 px. |

No UI framework, CSS framework or animation library.

### Images

Unsplash photos are hotlinked from `images.unsplash.com`, as the Unsplash API guidelines require, with size parameters (`w`, `q`, `auto=format`) to build a responsive `srcset` that serves WebP or AVIF. Every image has explicit `width`/`height` (no layout shift), `loading="lazy"` below the fold, meaningful Turkish alt text, and photographer credit on the site's "Görseller" credits section.

### Project structure

```
src/
  components/shared/   SeoHead, ConceptNotice, ResponsiveImage, FormField, SkipLink
  layouts/             BaseLayout (shared head + a11y skeleton)
  lib/                 unsplash.ts (srcset builder), validation.ts, types.ts
  sites/<site>/        tokens.css, data.ts, site-specific components, scripts
  pages/
    index.astro        hub
    restoran/ ...      one folder per site (Turkish URLs)
public/                robots.txt, favicons, OG images
tests/                 Playwright QA specs
.github/workflows/     deploy.yml (GitHub Pages)
```

## Pages per site

| Site | URL base | Pages |
|---|---|---|
| Hub | `/` | Portfolio index |
| Közde Ocakbaşı | `/restoran/` | Ana sayfa · Menü · Rezervasyon · İletişim |
| Mavera Diş | `/dis-klinigi/` | Ana sayfa · Tedaviler · Ekibimiz · Randevu |
| Kıyı Gayrimenkul | `/emlak/` | Ana sayfa · Portföy (filter) · İlan detayı (about 8 generated) · Hakkımızda ve İletişim |
| Arslan & Ekinci | `/hukuk/` | Ana sayfa · Çalışma alanları · Süreç · Ekip · Ön görüşme |
| Defne Güzellik | `/guzellik/` | Ana sayfa · Hizmetler ve fiyatlar (basket) · Randevu |
| Temel Yapı | `/insaat/` | Ana sayfa · Projeler (filter) · Proje detayı (about 5 generated) · Kurumsal · İletişim |

Every site with a form also gets a sample KVKK aydınlatma metni page, clearly marked as a template and not legal advice.

## SEO per page

Unique `<title>` and meta description, canonical URL, Open Graph and Twitter tags, one `h1`, logical heading order, `lang="tr"`, a sitemap and `robots.txt`.

Because the businesses are fictional, the concept pages carry **no** `LocalBusiness` structured data, since that would publish false business facts to search engines. The hub gets `Person`/`WebSite` data only once you provide real details.

## Forms

Each form gets client-side validation with accessible inline errors (`aria-describedby`, an error summary, focus moved to the first error) and a KVKK consent checkbox.

A valid submission shows an honest result: "Bu bir konsept sitedir; talebiniz gönderilmedi" ("This is a concept site; your request was not sent"), with a summary of what would have been sent. Swapping in a real handler later is one function per form.

## Phases

1. **Foundation:** Astro setup, shared layout, SEO component, concept notice, image helper, validation library, QA harness, deploy workflow.
2. **Hub page.**
3. **Sites**, one at a time, each through design, build, refinement and per-site QA: restaurant → dental → real estate → law → salon → construction.
4. **Full QA:** `astro check`, production build, Playwright + axe at five widths, link check, manual browser inspection of every page, Lighthouse spot checks.
5. **Delivery:** push to a GitHub repository, deploy to GitHub Pages, verify the live URLs, write the README with limitations and handoff notes.

## Verification commands

```bash
pnpm install
pnpm dev          # local preview
pnpm check        # astro check (types)
pnpm build        # production build
pnpm test:qa      # Playwright + axe across viewports
```

## Risks

| Risk | Mitigation |
|---|---|
| Unsplash photos don't match a concept's art direction | Curate per site; fall back to SVG and typographic treatments rather than off-brand photos. |
| Six distinct identities take a lot of time | Shared infrastructure is built once; review after the first site to lock the quality bar before the other five. |
| GitHub Pages base path (`/repo-name/`) breaks links | All internal links go through Astro's `base` config; Playwright link checks run against the production build. |
