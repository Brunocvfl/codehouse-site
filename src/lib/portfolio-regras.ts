// Regras do portfólio, sem depender do Astro (por isso dá para testar direto).
// Quem usa o portfólio importa de ./portfolio.ts, não daqui.

interface Dados {
  draft: boolean;
  order: number;
  year: number;
  type: string;
  client: string;
}

/** Uma entrada do portfólio com o endereço e o rótulo já prontos. */
export type ComRota<E> = E & { href: string; rotulo: string };

/** Só publicados (draft: false), ordenados por "order" e depois pelo ano mais recente. */
export function montarProjetos<E extends { id: string; data: Dados }>(entradas: readonly E[]): ComRota<E>[] {
  return entradas
    .filter((e) => !e.data.draft)
    .sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year)
    .map((e) => ({ ...e, href: `/portfolio/${e.id}`, rotulo: `${e.data.type} para ${e.data.client}` }));
}
