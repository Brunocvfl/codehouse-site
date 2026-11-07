// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/lib/site.ts';

export default defineConfig({
  site: SITE.url,
  integrations: [sitemap()],
  // CSS embutido no HTML: evita a requisição que bloqueava a primeira pintura.
  build: { inlineStylesheets: 'always' },
  // Imagens do markdown ganham srcset (o navegador baixa só o tamanho necessário;
  // a lupa do estudo de caso pede a maior versão sob demanda).
  image: { layout: 'constrained', breakpoints: [640, 960, 1280, 1920, 2560, 3200] },
  vite: {
    plugins: [tailwindcss()],
  },
});
