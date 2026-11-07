import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TIPOS_DE_SERVICO } from './lib/servicos';
import { ORDEM_PADRAO } from './lib/portfolio-regras';

// Cada projeto do portfólio é um arquivo .md em src/content/portfolio/.
// O nome do arquivo vira o endereço: meu-projeto.md -> /portfolio/meu-projeto
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      type: z.enum(TIPOS_DE_SERVICO), // um dos tipos do Catálogo de Serviços
      summary: z.string().max(180),
      cover: image().optional(),
      url: z.string().url().optional(),
      stack: z.array(z.string()).default([]),
      year: z.number().int(),
      order: z.number().default(ORDEM_PADRAO),
      draft: z.boolean().default(false),
    }),
});

export const collections = { portfolio };
