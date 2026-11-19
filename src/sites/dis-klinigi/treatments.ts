/**
 * Treatment information for the fictional Mavera clinic.
 *
 * Health-sector advertising in Turkey is regulated, so the copy is strictly
 * informational: no guarantees, no "painless" or "best" claims, no prices,
 * no before/after material. Durations are typical ranges, framed as such.
 */
export interface Treatment {
  id: string;
  name: string;
  summary: string;
  when: string;
  how: string;
  /** Typical number of visits, e.g. "1 seans". */
  visits: string;
}

export interface Concern {
  id: string;
  label: string;
  /** Short guidance shown above the matching treatments. */
  note: string;
  treatments: string[];
}

export const treatments: Treatment[] = [
  {
    id: 'muayene',
    name: 'Muayene ve diş taşı temizliği',
    summary: 'Ağız içinin incelenmesi, gerekirse röntgen ve diş taşlarının temizlenmesi.',
    when: 'Şikâyetiniz olmasa da yılda bir ya da iki kez önerilir.',
    how: 'Hekim dişleri ve diş etlerini inceler, gerekirse röntgen çeker. Diş taşları ultrasonik aletle temizlenir.',
    visits: 'Genellikle 1 seans',
  },
  {
    id: 'dolgu',
    name: 'Dolgu',
    summary: 'Çürükle kaybedilen diş dokusunun diş rengi malzemeyle tamamlanması.',
    when: 'Çürük, kırık ya da aşınmış dişlerde.',
    how: 'Bölge uyuşturulur, çürük temizlenir ve diş, renk uyumlu kompozit malzemeyle katman katman doldurulur.',
    visits: 'Genellikle 1 seans',
  },
  {
    id: 'kanal',
    name: 'Kanal tedavisi',
    summary: 'Dişin içindeki iltihaplı ya da zarar görmüş sinir dokusunun temizlenmesi.',
    when: 'Sıcağa, soğuğa uzun süren hassasiyet, zonklayan ağrı ya da apse olduğunda.',
    how: 'Bölge uyuşturulur, kanallar temizlenip şekillendirilir ve dolgu maddesiyle kapatılır.',
    visits: '1 – 3 seans',
  },
  {
    id: 'dis-eti',
    name: 'Diş eti tedavisi',
    summary: 'Diş eti iltihabının ve diş eti çekilmesinin tedavisi.',
    when: 'Fırçalarken kanama, diş etlerinde şişlik, kızarıklık ya da ağız kokusu varsa.',
    how: 'Diş taşları ve kökteki birikintiler temizlenir; hastalığın derecesine göre ek tedavi planlanır.',
    visits: '1 – 4 seans',
  },
  {
    id: 'implant',
    name: 'İmplant',
    summary: 'Eksik dişin yerine çene kemiğine yerleştirilen titanyum vida ve üzerine yapılan diş.',
    when: 'Bir ya da daha fazla diş eksik olduğunda ve kemik yapısı uygunsa.',
    how: 'Muayene ve tomografiyle planlanır. İmplant yerleştirilir, iyileşme süresinin ardından üst yapı takılır.',
    visits: 'Birkaç ay içinde 3 – 5 seans',
  },
  {
    id: 'protez',
    name: 'Köprü ve protez',
    summary: 'Eksik dişlerin sabit köprüyle ya da hareketli protezle tamamlanması.',
    when: 'Eksik diş varsa ve implant uygun değilse ya da tercih edilmiyorsa.',
    how: 'Ölçü alınır, laboratuvarda hazırlanan köprü ya da protez provalarla ayarlanıp teslim edilir.',
    visits: '3 – 5 seans',
  },
  {
    id: 'ortodonti',
    name: 'Ortodonti',
    summary: 'Çapraşık ya da aralıklı dişlerin tel ya da şeffaf plaklarla düzenlenmesi.',
    when: 'Dişler çapraşık, aralıklı ya da kapanışta sorun varsa; çocuklarda ve yetişkinlerde.',
    how: 'Ölçü ve röntgenlerle tedavi planlanır. Tel ya da şeffaf plak, düzenli kontrollerle ayarlanır.',
    visits: 'Tedavi süresince ayda bir kontrol',
  },
  {
    id: 'beyazlatma',
    name: 'Diş beyazlatma',
    summary: 'Diş renginin hekim kontrolünde açılması.',
    when: 'Dişler sağlıklıysa ve renk değişikliği dış etkenlerden kaynaklanıyorsa. Önce muayene gerekir.',
    how: 'Klinikte uygulanan jel ya da evde kullanılan kişiye özel plaklarla yapılır.',
    visits: '1 – 2 seans ya da evde birkaç hafta',
  },
  {
    id: 'pedodonti',
    name: 'Çocuk diş hekimliği',
    summary: 'Süt ve daimi dişlerin korunması, çocuklara özel muayene ve tedavi.',
    when: 'İlk diş çıktığında ilk kontrol, sonrasında altı ayda bir.',
    how: 'Tanışma ve alıştırma görüşmesiyle başlar; koruyucu uygulamalar ve gerekirse dolgu yapılır.',
    visits: 'İhtiyaca göre',
  },
];

export const concerns: Concern[] = [
  {
    id: 'agri',
    label: 'Dişim ağrıyor',
    note: 'Ağrının nedeni muayenede anlaşılır. Şiddetli ağrı ya da şişlik varsa aynı gün randevu isteyin.',
    treatments: ['muayene', 'dolgu', 'kanal'],
  },
  {
    id: 'kanama',
    label: 'Diş etim kanıyor',
    note: 'Fırçalarken kanama çoğunlukla diş eti iltihabının ilk işaretidir.',
    treatments: ['dis-eti', 'muayene'],
  },
  {
    id: 'eksik',
    label: 'Eksik dişim var',
    note: 'Hangi seçeneğin uygun olduğuna muayene ve röntgenden sonra birlikte karar verilir.',
    treatments: ['implant', 'protez'],
  },
  {
    id: 'capraz',
    label: 'Dişlerim çapraşık',
    note: 'Ortodontik tedavi her yaşta mümkündür; önce bir değerlendirme görüşmesi yapılır.',
    treatments: ['ortodonti'],
  },
  {
    id: 'renk',
    label: 'Dişlerimin rengi değişti',
    note: 'Renk değişikliğinin nedeni önce muayeneyle anlaşılmalıdır.',
    treatments: ['muayene', 'beyazlatma'],
  },
  {
    id: 'cocuk',
    label: 'Çocuğum için',
    note: 'İlk ziyaret tanışma odaklıdır; çocuğunuz ortamı tanıyarak başlar.',
    treatments: ['pedodonti'],
  },
  {
    id: 'kontrol',
    label: 'Sadece kontrol',
    note: 'Belirli bir şikâyetiniz yoksa yıllık muayene ve temizlikle başlayabilirsiniz.',
    treatments: ['muayene'],
  },
];

export function treatmentById(id: string): Treatment {
  const t = treatments.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown treatment: ${id}`);
  return t;
}
