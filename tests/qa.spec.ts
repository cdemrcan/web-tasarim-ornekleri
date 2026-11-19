import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Pages to check, relative to the site base. */
const pages = [
  '',
  'john-remy/',
  'john-remy/eserler/',
  'john-remy/eserler/untitled-834769/',
  'john-remy/eserler/screaming-mug/',
  'john-remy/eserler/untitled-271503/',
  'john-remy/eserler/untitled-590118/',
  'john-remy/hakkinda/',
  'john-remy/iletisim/',
  'john-remy/kvkk/',
  'restoran/',
  'restoran/menu/',
  'restoran/rezervasyon/',
  'restoran/iletisim/',
  'restoran/kvkk/',
  'hinoki/',
  'hinoki/menu/',
  'hinoki/rezervasyon/',
  'hinoki/iletisim/',
  'hinoki/kvkk/',
  'dis-klinigi/',
  'dis-klinigi/tedaviler/',
  'dis-klinigi/ekibimiz/',
  'dis-klinigi/randevu/',
  'dis-klinigi/kvkk/',
];

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
];

async function open(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response?.status(), `HTTP status for ${path}`).toBe(200);
  await page.waitForLoadState('networkidle');
}

for (const vp of viewports) {
  test.describe(`viewport ${vp.name}px`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const path of pages) {
      test(`${path || '/'}: no horizontal overflow, no axe violations`, async ({ page }) => {
        await open(page, path);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);

        // Axe once per page is enough at desktop and at the smallest mobile width.
        if (vp.name === '1440' || vp.name === '375') {
          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
            .analyze();
          const summary = results.violations.map(
            (v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
          );
          expect(summary, 'axe violations').toEqual([]);
        }
      });
    }
  });
}

test('every internal link and image resolves', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of pages) {
    await open(page, path);
    const urls = await page.evaluate(() => [
      ...Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]')).map((a) => a.href),
      ...Array.from(document.querySelectorAll<HTMLImageElement>('img')).map((i) => i.currentSrc || i.src),
      ...Array.from(document.querySelectorAll<HTMLSourceElement>('source[srcset]')).flatMap((s) =>
        s.srcset.split(',').map((part) => new URL(part.trim().split(' ')[0]!, location.href).href),
      ),
    ]);
    for (const url of urls) {
      const clean = url.split('#')[0]!;
      if (!clean.startsWith('http://localhost') || seen.has(clean)) continue;
      seen.add(clean);
      const res = await request.get(clean);
      expect(res.status(), `${clean} (linked from /${path})`).toBe(200);
    }
  }
  expect(seen.size).toBeGreaterThan(20);
});

test('images are not broken', async ({ page }) => {
  for (const path of pages) {
    await open(page, path);
    const broken = await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      imgs.forEach((img) => (img.loading = 'eager'));
      await Promise.all(imgs.map((img) => (img.complete ? null : img.decode().catch(() => null))));
      return imgs.filter((img) => img.naturalWidth === 0).map((img) => img.currentSrc || img.src);
    });
    expect(broken, `broken images on /${path}`).toEqual([]);
  }
});

test.describe('contact form', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('shows accessible errors, then an honest not-sent result', async ({ page }) => {
    await open(page, 'john-remy/iletisim/');
    const form = page.locator('#contact-form');

    // Empty submit: summary gets focus and lists every required field.
    await form.getByRole('button', { name: 'Mesajı kontrol et' }).click();
    const summary = page.locator('[data-error-summary]');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary.locator('li')).toHaveCount(4);
    await expect(page.locator('#eposta')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#eposta')).toHaveAttribute('aria-describedby', /eposta-hata/);

    // Invalid email and short message are named precisely.
    await page.fill('#ad', 'Deneme Kişi');
    await page.fill('#eposta', 'gecersiz-adres');
    await page.fill('#mesaj', 'Kısa');
    await form.getByRole('button', { name: 'Mesajı kontrol et' }).click();
    await expect(page.locator('#eposta-hata')).toContainText('Geçerli bir e-posta');
    await expect(page.locator('#mesaj-hata')).toContainText('en az 20 karakter');
    // The hint stays linked when the error is added.
    await expect(page.locator('#mesaj')).toHaveAttribute('aria-describedby', /mesaj-ipucu/);

    // Valid submit: result says nothing was sent and echoes values as text, not HTML.
    await page.fill('#eposta', 'deneme@ornek.com');
    await page.fill('#mesaj', 'Screaming Mug hakkında bilgi almak istiyorum. <b>kalın</b>');
    await page.check('#onay');
    await form.getByRole('button', { name: 'Mesajı kontrol et' }).click();
    const result = page.locator('#form-result');
    await expect(result).toBeVisible();
    await expect(result).toBeFocused();
    await expect(result.getByRole('heading')).toHaveText('Mesajınız gönderilmedi');
    await expect(result.locator('dd b')).toHaveCount(0);
    await expect(result).toContainText('<b>kalın</b>');

    // Returning keeps the entered values.
    await page.getByRole('button', { name: 'Forma geri dön' }).click();
    await expect(form).toBeVisible();
    await expect(page.locator('#ad')).toHaveValue('Deneme Kişi');
  });
});

test('keyboard: skip link moves focus to main content', async ({ page }) => {
  await open(page, 'john-remy/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'İçeriğe geç' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#icerik')).toBeFocused();
});

test.describe('restaurant menu tabs', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('tabs switch panels by click and arrow keys, and honour the URL hash', async ({ page }) => {
    await open(page, 'restoran/menu/');
    const tabs = page.getByRole('tab');
    await expect(tabs).toHaveCount(5);
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(page.locator('#mezeler')).toBeVisible();
    await expect(page.locator('#kebaplar')).toBeHidden();

    await page.getByRole('tab', { name: 'Kebaplar' }).click();
    await expect(page.locator('#kebaplar')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Kebaplar' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Adana kebap')).toBeVisible();
    expect(page.url()).toContain('#kebaplar');

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Tatlılar' })).toBeFocused();
    await expect(page.locator('#tatlilar')).toBeVisible();
    await page.keyboard.press('End');
    await expect(page.getByRole('tab', { name: 'İçecekler' })).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Mezeler' })).toBeFocused();

    // A fresh page load (not a same-page hash change) must open the linked category.
    await page.goto('about:blank');
    await open(page, 'restoran/menu/#tatlilar');
    await expect(page.locator('#tatlilar')).toBeVisible();
    await expect(page.locator('#mezeler')).toBeHidden();
  });

  test('without JavaScript every category is visible', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto('restoran/menu/');
    for (const id of ['mezeler', 'ara-sicaklar', 'kebaplar', 'tatlilar', 'icecekler']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await context.close();
  });
});

test.describe('restaurant reservation form', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('validates every rule and never claims a booking was made', async ({ page }) => {
    await open(page, 'restoran/rezervasyon/');
    const submit = page.getByRole('button', { name: 'Rezervasyon talebini kontrol et' });

    await submit.click();
    const summary = page.locator('[data-error-summary]');
    await expect(summary).toBeFocused();
    // tarih, saat, kişi, masa tercihi, ad, telefon, onay
    await expect(summary.locator('li')).toHaveCount(7);
    await expect(page.locator('#alan-hata')).toContainText('Masa tercihi');
    await expect(page.locator('fieldset[data-name="Masa tercihi"]')).toHaveAttribute('aria-describedby', /alan-hata/);

    // Past date and bad phone get precise messages.
    const past = new Date(Date.now() - 2 * 86_400_000).toISOString().slice(0, 10);
    await page.fill('#tarih', past);
    await page.fill('#telefon', '12345');
    await submit.click();
    await expect(page.locator('#tarih-hata')).toContainText('Geçmiş bir tarih');
    await expect(page.locator('#telefon-hata')).toContainText('05XX XXX XX XX');

    // Valid booking request.
    const soon = new Date(Date.now() + 3 * 86_400_000);
    const iso = `${soon.getFullYear()}-${String(soon.getMonth() + 1).padStart(2, '0')}-${String(soon.getDate()).padStart(2, '0')}`;
    await page.fill('#tarih', iso);
    await page.selectOption('#saat', '20.00');
    await page.selectOption('#kisi', '4');
    await page.getByText('Ocakbaşı (mangalın çevresi)').click();
    await expect(page.locator('#alan-hata')).toBeHidden();
    await page.fill('#ad', 'Deneme Kişi');
    await page.fill('#telefon', '0532 000 00 00');
    await page.check('#onay');
    await submit.click();

    const result = page.locator('#form-result');
    await expect(result).toBeFocused();
    await expect(result.getByRole('heading')).toHaveText('Rezervasyon oluşturulmadı');
    await expect(result).toContainText('4 kişi');
    await expect(result).toContainText('Ocakbaşı (mangalın çevresi)');
    await expect(result).toContainText('20.00');
  });
});

test.describe('hinoki', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('menu index marks the course in view', async ({ page }) => {
    await open(page, 'hinoki/menu/');
    await page.locator('#tatlilar').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.querySelector('#tatlilar')!.scrollIntoView({ block: 'start' }));
    await expect(page.locator('a[href="#tatlilar"]')).toHaveAttribute('aria-current', 'location');
  });

  test('reservation validates and never claims a booking', async ({ page }) => {
    await open(page, 'hinoki/rezervasyon/');
    const submit = page.getByRole('button', { name: 'Rezervasyon talebini kontrol et' });
    await submit.click();
    await expect(page.locator('[data-error-summary]')).toBeFocused();
    await expect(page.locator('[data-error-summary] li')).toHaveCount(7);

    // More than 30 days ahead is rejected.
    const far = new Date(Date.now() + 40 * 86_400_000);
    const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    await page.fill('#tarih', iso(far));
    await submit.click();
    await expect(page.locator('#tarih-hata')).toContainText('30 gün');

    await page.getByText('Suşi tezgâhı').click();
    await page.fill('#tarih', iso(new Date(Date.now() + 5 * 86_400_000)));
    await page.selectOption('#saat', '19.00');
    await page.selectOption('#kisi', '2');
    await page.fill('#ad', 'Deneme Kişi');
    await page.fill('#telefon', '+90 532 000 00 00');
    await page.check('#onay');
    await submit.click();
    const result = page.locator('#form-result');
    await expect(result).toBeFocused();
    await expect(result.getByRole('heading')).toHaveText('Rezervasyon oluşturulmadı');
    await expect(result).toContainText('Suşi tezgâhı');
  });
});

test.describe('dental clinic', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('finder shows only the matching treatments and announces them', async ({ page }) => {
    await open(page, 'dis-klinigi/');
    await expect(page.locator('[data-for="eksik"]')).toBeHidden();
    await page.getByText('Eksik dişim var').click();
    await expect(page.locator('[data-for="eksik"]')).toBeVisible();
    await expect(page.locator('[data-for="agri"]')).toBeHidden();
    await expect(page.locator('[data-for="eksik"]')).toContainText('İmplant');
    await expect(page.locator('[data-finder-status]')).toContainText('2 tedavi');
    await page.getByText('Dişim ağrıyor').click();
    await expect(page.locator('[data-for="agri"]')).toBeVisible();
    await expect(page.locator('[data-for="eksik"]')).toBeHidden();
  });

  test('appointment: topic from URL, day then slot, honest result', async ({ page }) => {
    await open(page, 'dis-klinigi/randevu/?konu=capraz');
    await expect(page.locator('#konu')).toHaveValue('capraz');
    const submit = page.getByRole('button', { name: 'Randevu talebini kontrol et' });

    await submit.click();
    await expect(page.locator('[data-error-summary]')).toBeFocused();
    // gün, saat, ad, telefon, ilk ziyaret, onay
    await expect(page.locator('[data-error-summary] li')).toHaveCount(6);

    // Slots appear only after a day is picked; taken slots are disabled.
    await expect(page.locator('[data-slots] .slots:visible')).toHaveCount(0);
    await page.locator('label[for="gun-0"]').click();
    const visibleSlots = page.locator('[data-slots] .slots:visible input');
    await expect(page.locator('[data-slots] .slots:visible')).toHaveCount(1);
    const free = page.locator('[data-slots] .slots:visible input:not(:disabled)').first();
    const freeId = await free.getAttribute('id');
    await page.locator(`label[for="${freeId}"]`).click();
    await expect(free).toBeChecked();

    // Switching day clears the time.
    await page.locator('label[for="gun-1"]').click();
    await expect(page.locator('[data-slots] input:checked')).toHaveCount(0);
    const free2 = page.locator('[data-slots] .slots:visible input:not(:disabled)').first();
    await page.locator(`label[for="${await free2.getAttribute('id')}"]`).click();

    await page.fill('#ad', 'Deneme Kişi');
    await page.fill('#telefon', '0532 000 00 00');
    await page.locator('label[for="ilk-hayir"]').click();
    await page.check('#onay');
    await submit.click();
    const result = page.locator('#form-result');
    await expect(result).toBeFocused();
    await expect(result.getByRole('heading')).toHaveText('Randevu oluşturulmadı');
    await expect(result).toContainText('Dişlerim çapraşık');
    await expect(result).toContainText('İlk kez geliyorum');
    expect(await visibleSlots.count()).toBeGreaterThan(0);
  });
});

for (const formPage of ['restoran/rezervasyon/', 'hinoki/rezervasyon/', 'dis-klinigi/randevu/']) {
  test(`phone field accepts only a real number: ${formPage}`, async ({ page }) => {
    await open(page, formPage);
    const phone = page.locator('#telefon');

    // Letters typed after the number never appear (the reported bug).
    await phone.pressSequentially('05345566545bn');
    await expect(phone).toHaveValue('05345566545');

    // Extra digits beyond a full number are not accepted.
    await phone.fill('');
    await phone.pressSequentially('0534556654512345');
    await expect(phone).toHaveValue('05345566545');

    // With the country code a number has 12 digits; spaces and + are kept.
    await phone.fill('');
    await phone.pressSequentially('+90 532 000 00 00 99');
    await expect(phone).toHaveValue('+90 532 000 00 00');

    // Pasted text is cleaned too.
    await phone.fill('');
    await phone.focus();
    await page.evaluate(() => {
      const el = document.querySelector<HTMLInputElement>('#telefon')!;
      el.value = 'tel: 0532-000-00-00 (ev)';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await expect(phone).toHaveValue(' 0532-000-00-00 ()');

    // A value that bypasses typing (e.g. autofill) is still rejected on submit.
    await page.evaluate(() => {
      document.querySelector<HTMLInputElement>('#telefon')!.value = '0534abc0000';
    });
    await page.getByRole('button', { name: /talebini kontrol et/ }).click();
    await expect(page.locator('#telefon-hata')).toContainText('yalnızca rakam');

    // Too short is rejected with the format hint.
    await phone.fill('0532 000');
    await page.getByRole('button', { name: /talebini kontrol et/ }).click();
    await expect(page.locator('#telefon-hata')).toContainText('05XX XXX XX XX');
  });
}
