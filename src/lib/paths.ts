/**
 * Builds an internal URL that respects Astro's `base` (GitHub Pages project path).
 * Always returns a path ending in "/" for pages, so links match `trailingSlash: 'always'`.
 */
export function href(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  if (clean === '') return `${base}/`;
  const hasExtension = /\.[a-z0-9]+$/i.test(clean);
  const withSlash = hasExtension || clean.endsWith('/') || clean.includes('#') ? clean : `${clean}/`;
  return `${base}/${withSlash}`;
}

/** Absolute URL for canonical / Open Graph tags. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) return path;
  return new URL(path, site).toString();
}
