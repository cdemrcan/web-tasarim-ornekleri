import type { UnsplashPhoto } from '../../lib/unsplash';

/** Stock photos from Unsplash (Unsplash License). None show the fictional business itself. */
export const photos = {
  mangal: {
    id: 'iQ7GHpJ6fCw',
    path: 'photo-1730082460730-573793ec7c8f',
    width: 6240,
    height: 4160,
    alt: 'Kömür ateşinin üzerinde sıra sıra dizilmiş kebap şişleri; usta maşayla şişleri çeviriyor.',
    author: 'Cemrecan Yurtman',
    username: 'cmrcn_',
  },
  kor: {
    id: 'chDD2VVwPjE',
    path: 'photo-1730082311706-b6525f2febfd',
    width: 6240,
    height: 4160,
    alt: 'Uzun bir mangalda kızarmış kömürler; usta közü karıştırırken kıvılcımlar havaya sıçrıyor.',
    author: 'Cemrecan Yurtman',
    username: 'cmrcn_',
  },
  adana: {
    id: '1JSLIlFFvCY',
    path: 'photo-1644364935906-792b2245a2c0',
    width: 4272,
    height: 2856,
    alt: 'Beyaz tabakta lavaş üzerinde Adana kebap; yanında közlenmiş domates, biber, sumaklı soğan ve bulgur pilavı.',
    author: 'Vitaly Mazur',
    username: 'vitalymazur',
  },
  sofra: {
    id: 'cwuGQc5Rvkk',
    path: 'photo-1785734290864-eca98549d0b6',
    width: 5472,
    height: 3648,
    alt: 'Loş ışıkta kurulmuş kalabalık bir sofra: pide, humus, salata, ızgara et ve sahanda yemekler.',
    author: 'Zion C',
    username: 'jcs_chen',
  },
  caydanlik: {
    id: '715vGgtYxoQ',
    path: 'photo-1789109392443-02ec2369d3d8',
    width: 10633,
    height: 7975,
    alt: 'Ahşap masanın üzerinde turuncu ve lacivert çiçek desenli seramik bir çaydanlık.',
    author: 'engin akyurt',
    username: 'enginakyurt',
  },
} satisfies Record<string, UnsplashPhoto>;

export const photoList: UnsplashPhoto[] = Object.values(photos);
