import type { UnsplashPhoto } from '../../lib/unsplash';

/** Stock photos from Unsplash (Unsplash License). None show the fictional business itself. */
export const photos = {
  salon: {
    id: 'g007c15pvho',
    path: 'photo-1736059057120-d24888d4d7d5',
    width: 7283,
    height: 5504,
    alt: 'Loş ışıklı, ahşap çıtalarla bölünmüş bir restoran salonu; raflar ve masalar sıcak bir ışıkla aydınlanıyor.',
    author: 'Declan Sun',
    username: 'declansun',
  },
  tezgah: {
    id: 'I55URoqDTz0',
    path: 'photo-1787462160120-9d018028c245',
    width: 5120,
    height: 2125,
    alt: 'Ahşap bir suşi tezgâhının arkasında, beyaz önlüklü iki şef balıkları hazırlıyor.',
    author: 'Michael Pointner',
    username: 'pino_rumbero',
  },
  nigiri: {
    id: 'zali_zGDWo8',
    path: 'photo-1615361200141-f45040f367be',
    width: 4912,
    height: 6140,
    alt: 'Siyah zemin üzerinde, yemek çubuklarıyla tutulan tek bir somon nigiri.',
    author: 'Tamas Pap',
    username: 'tamasp',
  },
  maguro: {
    id: 'Jm5uc0Z-5MQ',
    path: 'photo-1763943431214-275e64002f90',
    width: 3215,
    height: 4801,
    alt: 'Tezgâhta, ahşap bir altlığın üzerinde ton balığı nigiri, zencefil turşusu ve vasabi.',
    author: 'HANVIN CHEONG',
    username: 'hktram0311',
  },
  bogaz: {
    id: 'Vwb41l3MTjE',
    path: 'photo-1779806786906-396680367cf7',
    width: 6663,
    height: 4442,
    alt: 'Gün batımında Boğaz; uzakta asma köprü ve kıyıda manzarayı izleyen insanlar.',
    author: 'Berat Cakirca',
    username: 'ermngldzgn',
  },
} satisfies Record<string, UnsplashPhoto>;

export const photoList: UnsplashPhoto[] = Object.values(photos);
