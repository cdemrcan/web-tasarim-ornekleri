/**
 * Unsplash photos are hotlinked from images.unsplash.com, as the Unsplash API
 * guidelines require. Sizes and formats come from the imgix URL parameters,
 * so responsive images need no local processing.
 */
export interface UnsplashPhoto {
  /** Unsplash photo id (used for the photo page link). */
  id: string;
  /** Path on images.unsplash.com, e.g. "photo-1730082460730-573793ec7c8f". */
  path: string;
  width: number;
  height: number;
  /** Turkish description of what the photo shows. */
  alt: string;
  author: string;
  /** Unsplash username, for the attribution link. */
  username: string;
}

const UTM = 'utm_source=web_tasarim_ornekleri&utm_medium=referral';

export function photoUrl(photo: UnsplashPhoto, width: number, aspect?: number): string {
  const params = new URLSearchParams({ ixlib: 'rb-4.1.0', auto: 'format', fit: 'crop', w: String(width), q: '72' });
  if (aspect) params.set('h', String(Math.round(width / aspect)));
  return `https://images.unsplash.com/${photo.path}?${params.toString()}`;
}

export function photoSrcset(photo: UnsplashPhoto, widths: number[], aspect?: number): string {
  return widths
    .filter((w) => w <= photo.width)
    .map((w) => `${photoUrl(photo, w, aspect)} ${w}w`)
    .join(', ');
}

export function authorLink(photo: UnsplashPhoto): string {
  return `https://unsplash.com/@${photo.username}?${UTM}`;
}

export const unsplashLink = `https://unsplash.com/?${UTM}`;
