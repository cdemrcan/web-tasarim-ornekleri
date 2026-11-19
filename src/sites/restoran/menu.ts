/**
 * Sample menu for the fictional Közde Ocakbaşı. Dishes are standard ocakbaşı fare;
 * prices are illustrative (Turkish lira, 2026) and labeled as samples on the site.
 */
export type Tag = 'acili' | 'vejetaryen' | 'paylasimlik';

export interface Dish {
  name: string;
  description: string;
  /** Price in TL. */
  price: number;
  tags?: Tag[];
}

export interface MenuCategory {
  id: string;
  title: string;
  note?: string;
  dishes: Dish[];
}

export const tagLabels: Record<Tag, string> = {
  acili: 'Acılı',
  vejetaryen: 'Vejetaryen',
  paylasimlik: 'Paylaşımlık',
};

export const menu: MenuCategory[] = [
  {
    id: 'mezeler',
    title: 'Mezeler',
    note: 'Mezeler her sabah hazırlanır; gün içinde tükenen olabilir.',
    dishes: [
      { name: 'Acılı ezme', description: 'Domates, biber, soğan ve maydanoz; nar ekşisi ve pul biberle.', price: 160, tags: ['acili', 'vejetaryen'] },
      { name: 'Haydari', description: 'Süzme yoğurt, dereotu, nane ve sarımsak.', price: 180, tags: ['vejetaryen'] },
      { name: 'Babagannuş', description: 'Közde pişmiş patlıcan, tahin, limon ve sarımsak.', price: 210, tags: ['vejetaryen'] },
      { name: 'Humus', description: 'Nohut ve tahin; üzerine kızdırılmış tereyağı ve pastırma.', price: 220 },
      { name: 'Közlenmiş kırmızı biber', description: 'Zeytinyağı, sarımsak ve sirkeyle.', price: 170, tags: ['vejetaryen'] },
      { name: 'Cacık', description: 'Yoğurt, salatalık ve kuru nane.', price: 150, tags: ['vejetaryen'] },
    ],
  },
  {
    id: 'ara-sicaklar',
    title: 'Ara sıcaklar',
    dishes: [
      { name: 'İçli köfte', description: 'Bulgur kabuk, cevizli kıyma iç. Adet fiyatıdır.', price: 140 },
      { name: 'Fındık lahmacun', description: 'Taş fırında, ince hamurda; altı adet.', price: 240, tags: ['paylasimlik'] },
      { name: 'Paçanga böreği', description: 'Pastırma, kaşar ve domates; yufkada kızartılmış.', price: 260 },
      { name: 'Kaşarlı mantar', description: 'Güveçte, tereyağı ve kaşarla.', price: 280, tags: ['vejetaryen'] },
    ],
  },
  {
    id: 'kebaplar',
    title: 'Kebaplar',
    note: 'Kebaplar lavaş, közlenmiş domates ve biber, sumaklı soğanla gelir.',
    dishes: [
      { name: 'Adana kebap', description: 'Elde çekilmiş kuzu kıyma, kuyruk yağı ve pul biber.', price: 980, tags: ['acili'] },
      { name: 'Urfa kebap', description: 'Adana ile aynı hazırlanır, acısızdır.', price: 980 },
      { name: 'Beyti', description: 'Lavaşa sarılı kıyma kebabı; yoğurt ve tereyağlı domates sosuyla.', price: 1080 },
      { name: 'Kuzu şiş', description: 'Kuzu but, sütte ve soğan suyunda dinlendirilmiş.', price: 1150 },
      { name: 'Ciğer şiş', description: 'Kuzu ciğeri, kuyruk yağıyla dizilir.', price: 820 },
      { name: 'Patlıcan kebabı', description: 'Patlıcan ve kıyma sırayla şişe dizilir; mevsiminde.', price: 1050 },
      { name: 'Tavuk kanat', description: 'Pul biber ve yoğurtlu marinasyonla.', price: 690 },
      { name: 'Karışık ızgara', description: 'Adana, kuzu şiş, ciğer ve kanat; iki kişiliktir.', price: 2450, tags: ['paylasimlik'] },
    ],
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    dishes: [
      { name: 'Künefe', description: 'Hatay peyniri ve tel kadayıf; mangalda, bakır tavada.', price: 340 },
      { name: 'Katmer', description: 'İnce açılmış hamur, Antep fıstığı ve kaymak.', price: 380, tags: ['paylasimlik'] },
      { name: 'İrmik helvası', description: 'Tereyağında kavrulmuş irmik; dondurmayla.', price: 220 },
    ],
  },
  {
    id: 'icecekler',
    title: 'İçecekler',
    dishes: [
      { name: 'Ayran', description: 'Bakır tasta, köpüklü.', price: 70 },
      { name: 'Şalgam', description: 'Acılı ya da acısız.', price: 70 },
      { name: 'Çay', description: 'İnce belli bardakta.', price: 35 },
      { name: 'Türk kahvesi', description: 'Közde, cezvede pişer.', price: 110 },
      { name: 'Su', description: '0,5 litre.', price: 30 },
    ],
  },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString('tr-TR')} TL`;
}

/** Dishes highlighted on the home page. */
export const signatureDishes = ['Adana kebap', 'Kuzu şiş', 'Künefe']
  .map((name) => menu.flatMap((c) => c.dishes).find((d) => d.name === name))
  .filter((d): d is Dish => Boolean(d));
