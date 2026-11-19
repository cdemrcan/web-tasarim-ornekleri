import type { UnsplashPhoto } from '../../lib/unsplash';

/** Stock photos from Unsplash (Unsplash License). None show the fictional clinic itself. */
export const photos = {
  oda: {
    id: 'Fdku_oMrDvk',
    path: 'photo-1704455306251-b4634215d98f',
    width: 6147,
    height: 4098,
    alt: 'Ahşap zeminli, aydınlık bir muayene odası; ortada diş ünitesi, yanda dolaplar ve masa.',
    author: 'Kari Bjorn Photography',
    username: 'karibjorn',
  },
  koltuk: {
    id: '44jaETSVX2I',
    path: 'photo-1728342057953-94bfad8f0e7e',
    width: 3477,
    height: 5215,
    alt: 'Pencere kenarında beyaz bir diş ünitesi ve muayene lambası.',
    author: 'Katarzyna Zygnerska',
    username: 'katasha',
  },
  muayene: {
    id: '98eodnv1abo',
    path: 'photo-1771442873038-dda05b6ca447',
    width: 3761,
    height: 5642,
    alt: 'Eldivenli bir el, ayna ve sondadan oluşan muayene aletlerini tutuyor.',
    author: 'Katarzyna Zygnerska',
    username: 'katasha',
  },
  ayna: {
    id: 'ux18C551ghI',
    path: 'photo-1606811856475-5e6fcdc6e509',
    width: 3479,
    height: 4638,
    alt: 'Beyaz bir yüzeyde diş hekimi aynası ve sonda.',
    author: 'Caroline LM',
    username: 'carocaro1987',
  },
} satisfies Record<string, UnsplashPhoto>;

export const photoList: UnsplashPhoto[] = Object.values(photos);
