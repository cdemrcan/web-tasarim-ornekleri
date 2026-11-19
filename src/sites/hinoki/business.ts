/**
 * Sample details for the fictional Hinoki. Contact values are deliberately
 * unreachable (no real street number, all-zero phone, reserved .example domain)
 * and are never rendered as tel:/mailto: links.
 */
export const business = {
  name: 'Hinoki',
  address: 'Arnavutköy Cad. No: 00, Beşiktaş / İstanbul',
  district: 'Arnavutköy',
  phone: '0 (212) 000 00 00',
  email: 'masa@hinoki.example',
  eventsEmail: 'davet@hinoki.example',
  hours: [
    { days: 'Salı – Perşembe', time: '18.00 – 24.00' },
    { days: 'Cuma – Cumartesi', time: '18.00 – 01.00' },
    { days: 'Pazar', time: '13.00 – 23.00' },
    { days: 'Pazartesi', time: 'Kapalı' },
  ],
  /** OpenStreetMap view of the Arnavutköy waterfront (the neighbourhood, not a real venue). */
  map: {
    embed:
      'https://www.openstreetmap.org/export/embed.html?bbox=29.0335%2C41.0645%2C29.0505%2C41.0725&layer=mapnik',
    link: 'https://www.openstreetmap.org/?mlat=41.0686&mlon=29.0428#map=16/41.0686/29.0428',
  },
} as const;
