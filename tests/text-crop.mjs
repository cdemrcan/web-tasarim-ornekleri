// 1x-DPR crop of a text block, to judge font rendering the way a typical monitor shows it.
// Usage: node tests/text-crop.mjs <url-path> <css-selector> <out.png>
import { chromium } from '@playwright/test';
const [path, selector, out] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(`http://localhost:4321/web-tasarim-ornekleri/${path}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await el.screenshot({ path: out });
await browser.close();
console.log('saved', out);
