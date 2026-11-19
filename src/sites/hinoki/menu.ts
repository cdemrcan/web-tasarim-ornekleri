/**
 * Sample menu for the fictional Hinoki. Dishes are standard modern-Japanese fare;
 * prices (TL, 2026) are illustrative and labeled as samples on the site.
 */
export interface Dish {
  name: string;
  /** Japanese name in Latin letters, when it differs from the Turkish one. */
  romaji?: string;
  description: string;
  price: number;
  /** Price unit shown after the amount, e.g. "2 parça". */
  unit?: string;
}

export interface Course {
  id: string;
  title: string;
  note?: string;
  dishes: Dish[];
}

export interface TastingMenu {
  name: string;
  summary: string;
  courses: string[];
  price: number;
  note: string;
}

export const tastingMenus: TastingMenu[] = [
  {
    name: 'Tezgâh omakase',
    summary: 'Şefin önünde, parça parça servis edilen 14 aşamalı menü. Yalnızca suşi tezgâhında.',
    courses: ['Sakizuke (açılış)', 'Mevsim sashimisi', 'Sıcak tabak', '10 parça nigiri', 'Miso çorbası', 'Tatlı'],
    price: 6500,
    note: 'Akşamları 19.00 ve 21.15 olmak üzere iki oturum.',
  },
  {
    name: 'Akşam menüsü',
    summary: 'Salon ve terasta, paylaşarak yenen 8 aşamalı menü.',
    courses: ['İki soğuk tabak', 'Sashimi tabağı', 'Robata ızgara', 'Ana yemek', 'Nigiri seçkisi', 'Tatlı'],
    price: 4800,
    note: 'Masadaki herkes için sipariş edilir.',
  },
];

export const courses: Course[] = [
  {
    id: 'soguklar',
    title: 'Soğuklar',
    dishes: [
      { name: 'Levrek usuzukuri', description: 'İnce dilimlenmiş levrek, yuzu ponzu ve frenk soğanı.', price: 780 },
      { name: 'Ton balığı tataki', description: 'Kenarları mühürlenmiş ton, susamlı soya ve turp rendesi.', price: 920 },
      { name: 'Wakame salatası', description: 'Deniz yosunu, salatalık ve susam soslu.', price: 420 },
      { name: 'Edamame', description: 'Deniz tuzuyla ya da acılı sarımsaklı.', price: 290 },
    ],
  },
  {
    id: 'sicaklar',
    title: 'Sıcaklar',
    dishes: [
      { name: 'Miso soslu morina', romaji: 'Gindara saikyo-yaki', description: 'Üç gün beyaz misoda bekletilip fırınlanmış morina.', price: 1650 },
      { name: 'Karides tempura', description: 'Hafif hamurda; tentsuyu ve turp rendesiyle.', price: 980 },
      { name: 'Tavuk yakitori', description: 'Robata ızgarada, tare sosuyla. İki şiş.', price: 620 },
      { name: 'Wagyu kaburga', description: 'Kömür ızgarada; yuzu koşo ve deniz tuzuyla.', price: 2900 },
      { name: 'Agedashi tofu', description: 'Kızarmış tofu, dashi suyu ve bonito.', price: 480 },
    ],
  },
  {
    id: 'susi',
    title: 'Suşi ve sashimi',
    note: 'Nigiri fiyatları iki parça içindir. Balıklar günlük gelir; tükenen olabilir.',
    dishes: [
      { name: 'Ton, sırt', romaji: 'Akami', description: 'Yağsız ton balığı.', price: 520, unit: '2 parça' },
      { name: 'Ton, karın', romaji: 'Otoro', description: 'Ton balığının en yağlı bölümü.', price: 950, unit: '2 parça' },
      { name: 'Somon', romaji: 'Sake', description: 'Hafif yakılmış ya da çiğ.', price: 420, unit: '2 parça' },
      { name: 'Sarıkuyruk', romaji: 'Hamachi', description: 'Yuzu kabuğu ile.', price: 560, unit: '2 parça' },
      { name: 'Yılan balığı', romaji: 'Unagi', description: 'Tatlı soya sosuyla ızgara.', price: 640, unit: '2 parça' },
      { name: 'Sashimi seçkisi', description: 'Şefin seçtiği üç balık, on iki dilim.', price: 2200 },
    ],
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    dishes: [
      { name: 'Matcha krem brüle', description: 'Yeşil çay kreması, karamelize şeker.', price: 480 },
      { name: 'Mochi dondurma', description: 'Üç parça; yuzu, susam ve frambuaz.', price: 450 },
      { name: 'Mevsim meyveleri', description: 'Hafif şurupla.', price: 420 },
    ],
  },
  {
    id: 'icecekler',
    title: 'İçecekler',
    dishes: [
      { name: 'Junmai sake', description: 'Kadeh; soğuk ya da ılık.', price: 650 },
      { name: 'Japon viskisi', description: 'Tek içim, buzlu ya da sade.', price: 980 },
      { name: 'Genmaicha', description: 'Kavrulmuş pirinçli yeşil çay, demlik.', price: 220 },
      { name: 'Yuzu limonata', description: 'Alkolsüz.', price: 260 },
    ],
  },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString('tr-TR')} TL`;
}
