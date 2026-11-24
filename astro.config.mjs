// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { copyFile } from 'node:fs/promises';

// https://astro.build/config
export default defineConfig({
  site: 'https://anastasia.tulentsev.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/cv/') &&
        !page.includes('/cv-swe'),
    }),
    {
      name: 'sitemap-alias',
      hooks: {
        'astro:build:done': ({ dir }) =>
          copyFile(new URL('sitemap-index.xml', dir), new URL('sitemap.xml', dir)),
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
