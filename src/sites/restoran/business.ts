/**
 * Sample business details for the fictional Közde Ocakbaşı.
 * Every contact value is deliberately unreachable: the address has no real
 * number, the phone is all zeros, and the email uses the reserved .example domain.
 * None of them are rendered as tel:/mailto: links.
 */
export const business = {
  name: 'Közde Ocakbaşı',
  address: 'Moda Caddesi No: 00, Kadıköy / İstanbul',
  district: 'Moda, Kadıköy',
  phone: '0 (216) 000 00 00',
  email: 'rezervasyon@kozde.example',
  hours: [
    { days: 'Pazartesi – Perşembe', time: '12.00 – 24.00' },
    { days: 'Cuma – Cumartesi', time: '12.00 – 01.00' },
    { days: 'Pazar', time: '12.00 – 23.00' },
  ],
  kitchenNote: 'Mutfak, kapanıştan yarım saat önce sipariş almayı bırakır.',
} as const;
