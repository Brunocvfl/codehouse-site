// Regras do portfólio, sem depender do Astro (por isso dá para testar direto).
// Quem usa o portfólio importa de ./portfolio.ts, não daqui.
// O formato dos campos vem do schema (src/content.config.ts); aqui só o tipo é importado,
// e o import some na compilação: os testes rodam sem o Astro.
import type { CollectionEntry } from 'astro:content';

/** Posição de um Projeto sem "order": depois dos que têm. */
export const ORDEM_PADRAO = 100;

type Dados = Pick<CollectionEntry<'portfolio'>['data'], 'draft' | 'order' | 'year' | 'type' | 'client'>;

/** Uma entrada do portfólio com o endereço e as duas formas do Rótulo já prontos. */
export type ComRota<E> = E & {
  href: string;
  /** "Landing page para Padaria X" (cards e Carrossel). */
  rotulo: string;
  /** "Landing page para Padaria X, 2026" (topo do estudo de caso). */
  rotuloComAno: string;
};

/** Só publicados (draft: false), ordenados por "order" e depois pelo ano mais recente. */
export function montarProjetos<E extends { id: string; data: Dados }>(entradas: readonly E[]): ComRota<E>[] {
  return entradas
    .filter((e) => !e.data.draft)
    .sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year)
    .map((e) => {
      const rotulo = `${e.data.type} para ${e.data.client}`;
      return { ...e, href: `/portfolio/${e.id}`, rotulo, rotuloComAno: `${rotulo}, ${e.data.year}` };
    });
}
