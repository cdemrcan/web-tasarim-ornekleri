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
