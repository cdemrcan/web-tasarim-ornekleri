# Web tasarım örnekleri

Portfolio sample websites by John Remy, built as one static Astro project and published on GitHub Pages. Each site lives under its own path with its own visual identity.

| Site | Path | Status |
|---|---|---|
| John Remy, artist portfolio | `/john-remy/` | MVP done, awaiting content (see below) |
| Six concept sites | (planned) | See `PROJECT_BRIEF.md` |

Planning documents: [PROJECT_BRIEF.md](PROJECT_BRIEF.md), [DESIGN_DIRECTION.md](DESIGN_DIRECTION.md), [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).

## Stack

- [Astro](https://astro.build) 7, static output, TypeScript strict
- Plain CSS with per-site custom-property tokens
- Self-hosted font: Bricolage Grotesque (OFL) via Fontsource
- Images optimized at build time by Astro (AVIF with a WebP fallback, responsive `srcset`)
- QA: Playwright + axe-core

No backend, no environment variables, no third-party scripts.

## Commands

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # astro check (types) + production build into dist/
pnpm preview    # serve dist/ on http://localhost:4321/web-tasarim-ornekleri/
pnpm test:qa    # Playwright + axe QA against the production build (run build first)
node tests/screenshots.mjs john-remy   # Bionluk screenshots into screenshots/ (preview must be running)
```

The first QA run needs a browser: `pnpm exec playwright install chromium`.

## Deployment

Live: **https://cdemrcan.github.io/web-tasarim-ornekleri/john-remy/**

GitHub Pages serves the `gh-pages` branch, which holds only the built `dist/` output plus a `.nojekyll` file (without it, Pages would hide the `_astro/` asset folder). To publish an update:

```bash
pnpm build
# copy dist/ into a clean folder, add .nojekyll, commit, then force-push that folder to the gh-pages branch
```

A GitHub Actions workflow could automate this, but pushing workflow files needs the `workflow` token scope (`gh auth refresh -s workflow`).

The base URL is set in `astro.config.mjs`. For another repository name or a custom domain, set `BASE_PATH` and `SITE_URL` at build time and update `public/robots.txt`.

## John Remy site

**Pages:** home (`/john-remy/`), works index, one page per artwork, about, contact, privacy notice (KVKK draft), plus a shared 404.

**Design:** the palette is sampled from the artworks: `#8B0B00` (the butterfly's ground) and pure black. Each artwork page takes on the ground color of its work. Text on red is always light (9.7:1 contrast), and red is never used for text on black.

**Tested:**
- `astro check`: 0 errors, 0 warnings.
- Playwright: no horizontal overflow on 10 pages at 375 / 390 / 768 / 1024 / 1440 px.
- axe (WCAG 2.2 AA rules) at 375 and 1440 px: 0 violations.
- All internal links and images resolve.
- Contact-form validation, error summary, focus handling and HTML escaping.
- Skip link.
- Manual browser review on desktop and mobile.

### Content still needed from the artist

| Item | Where it goes |
|---|---|
| Approve or replace the **sample** bio, then set `bioIsSample: false` | `src/sites/john-remy/artworks.ts` → `artist.bio` |
| Real email and/or Instagram, then set `isSample: false` (this turns them into links) | `artist.contact` in the same file |
| Year, medium and size of each work (optional) | Add fields to the `Artwork` data |
| Real titles for the three "Untitled" works (optional) | `title` in the same file |
| KVKK retention period and controller contact; legal review of the draft | `src/pages/john-remy/kvkk.astro` |

The bio and contact details are currently sample content, labeled "Örnek" on the page. The sample bio describes only what is visible in the works. The sample email uses the reserved `.example` domain and is not linked, so it can never reach anyone.

### Known limitations

- **The contact form is a demo.** It validates input and then states plainly that nothing was sent. To make it live, replace the marked block in `src/pages/john-remy/iletisim.astro` with a `fetch()` to a form service (for example Web3Forms or Formspree) and show success only on an OK response.
- The "Screaming Mug" statement is shown in the artist's original English, marked `lang="en"`.
