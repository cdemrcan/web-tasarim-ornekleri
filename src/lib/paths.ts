/**
 * Builds an internal URL that respects Astro's `base` (GitHub Pages project path).
 * Always returns a path ending in "/" for pages, so links match `trailingSlash: 'always'`.
 */
export function href(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const [rawPath = '', hash] = path.replace(/^\/+/, '').split('#', 2);
  const fragment = hash !== undefined ? `#${hash}` : '';
  if (rawPath === '') return `${base}/${fragment}`;
  const hasExtension = /\.[a-z0-9]+$/i.test(rawPath);
  // Pages need the trailing slash before any #fragment ("tedaviler/#implant").
  const withSlash = hasExtension || rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  return `${base}/${withSlash}${fragment}`;
}

/** Absolute URL for canonical / Open Graph tags. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) return path;
  return new URL(path, site).toString();
}
