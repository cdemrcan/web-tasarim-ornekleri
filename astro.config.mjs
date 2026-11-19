// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed to GitHub Pages as a project site:
// https://cdemrcan.github.io/web-tasarim-ornekleri/
// Override both values with env vars if the repository or domain changes.
const site = process.env.SITE_URL ?? 'https://cdemrcan.github.io';
const base = process.env.BASE_PATH ?? '/web-tasarim-ornekleri';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
