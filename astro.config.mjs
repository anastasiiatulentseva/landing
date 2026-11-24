// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { copyFile } from 'node:fs/promises';

const sitemapPaths = new Set(['/', '/cv/', '/cv-swe/', '/privacy/']);

// https://astro.build/config
export default defineConfig({
  site: 'https://anastasia.tulentsev.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => sitemapPaths.has(new URL(page).pathname),
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
