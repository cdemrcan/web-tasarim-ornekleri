/**
 * Sample details for the fictional Mavera clinic. Contact values are deliberately
 * unreachable and never rendered as tel:/mailto: links.
 *
 * Team members are fictional: name, field of practice and initials only.
 * No portraits (a stock photo would put a real person's face on an invented
 * dentist) and no invented degrees, titles beyond "Dt." or credentials.
 */
export const business = {
  name: 'Mavera Ağız ve Diş Sağlığı',
  shortName: 'Mavera',
  address: 'Atatürk Mah. Örnek Sok. No: 00, Ataşehir / İstanbul',
  district: 'Ataşehir',
  phone: '0 (216) 000 00 00',
  email: 'randevu@mavera.example',
  hours: [
    { days: 'Pazartesi – Cuma', time: '09.00 – 19.00' },
    { days: 'Cumartesi', time: '09.00 – 15.00' },
    { days: 'Pazar', time: 'Kapalı' },
  ],
} as const;

export interface TeamMember {
  name: string;
  field: string;
  /** Treatment ids this person mainly handles (links to the treatments page). */
  focus: string[];
}

export const team: TeamMember[] = [
  { name: 'Dt. Elif Aksoy', field: 'Genel diş hekimliği', focus: ['muayene', 'dolgu', 'beyazlatma'] },
  { name: 'Dt. Kerem Yalçın', field: 'Ortodonti', focus: ['ortodonti'] },
  { name: 'Dt. Selin Arıkan', field: 'Çocuk diş hekimliği', focus: ['pedodonti'] },
  { name: 'Dt. Murat Çelebi', field: 'Ağız, diş ve çene cerrahisi', focus: ['implant', 'protez', 'kanal'] },
];

export function initials(name: string): string {
  return name
    .replace(/^Dt\.\s*/, '')
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .toLocaleUpperCase('tr-TR');
}
