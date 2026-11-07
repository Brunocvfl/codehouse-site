// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { SITE } from './src/lib/site.ts';
import { DEGRAUS, pluginImagensDoTexto } from './src/lib/imagens.ts';

export default defineConfig({
  site: SITE.url,
  integrations: [sitemap()],
  // CSS embutido no HTML: evita a requisição que bloqueava a primeira pintura.
  build: { inlineStylesheets: 'always' },
  // Imagens do markdown ganham srcset: o navegador baixa só o tamanho necessário.
  // Larguras e sizes de cada imagem vêm dos perfis em src/lib/imagens.ts.
  image: {
    layout: 'constrained',
    breakpoints: [...DEGRAUS],
    // Capturas de tela com texto: qualidade 90 (ver src/lib/servico-imagem.ts) e cor sem
    // subamostragem grosseira, para as letras não borrarem.
    service: {
      entrypoint: './src/lib/servico-imagem.ts',
      config: { webp: { smartSubsample: true } },
    },
  },
  // As imagens do texto dos estudos de caso recebem o perfil `texto`.
  markdown: {
    processor: satteri({ hastPlugins: [pluginImagensDoTexto()] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
