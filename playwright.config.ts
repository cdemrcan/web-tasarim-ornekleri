import { defineConfig } from '@playwright/test';

// QA runs against the production build served by `astro preview`,
// so it exercises the same base path and assets GitHub Pages will serve.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4321/web-tasarim-ornekleri/',
  },
  webServer: {
    command: 'pnpm exec astro preview --port 4321',
    url: 'http://localhost:4321/web-tasarim-ornekleri/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
