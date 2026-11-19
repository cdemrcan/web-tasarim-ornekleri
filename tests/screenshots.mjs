// Captures Bionluk-ready screenshots of a site from the local preview server.
// Usage: node tests/screenshots.mjs [sitePath]   (default: john-remy)
// Output: screenshots/<site>/  (desktop 1440x900 and mobile 390x844, 2x pixel density)
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const site = process.argv[2] ?? 'john-remy';
const base = `http://localhost:4321/web-tasarim-ornekleri/${site}/`;
const pages = {
  'john-remy': ['', 'eserler/', 'eserler/screaming-mug/', 'hakkinda/', 'iletisim/'],
  restoran: ['', 'menu/', 'rezervasyon/', 'iletisim/'],
  hinoki: ['', 'menu/', 'rezervasyon/', 'iletisim/'],
}[site] ?? [''];

const shots = [
  { name: 'masaustu', viewport: { width: 1440, height: 900 } },
  { name: 'mobil', viewport: { width: 390, height: 844 } },
];

const outDir = `screenshots/${site}`;
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const shot of shots) {
  const context = await browser.newContext({ viewport: shot.viewport, deviceScaleFactor: 2 });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    // Load lazy images so full-page captures have no blanks.
    await page.evaluate(async () => {
      for (const img of Array.from(document.images)) img.loading = 'eager';
      await Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => {})));
    });
    const slug = path.replace(/\/$/, '').replace(/\//g, '-') || 'anasayfa';
    await page.screenshot({ path: `${outDir}/${shot.name}-${slug}.png` });
    await page.screenshot({ path: `${outDir}/${shot.name}-${slug}-tam.png`, fullPage: true });
    console.log(`saved ${shot.name}-${slug}`);
  }
  await context.close();
}
await browser.close();
