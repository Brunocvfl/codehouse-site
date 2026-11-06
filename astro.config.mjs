// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://codehouse.tec.br',
  integrations: [sitemap()],
  // CSS embutido no HTML: evita a requisição que bloqueava a primeira pintura.
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
  },
});
