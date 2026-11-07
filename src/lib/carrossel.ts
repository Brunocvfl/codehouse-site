// Carrossel de Projetos: a regra de posição dos slides, sem DOM.
// O frontmatter (posição inicial, no servidor) e o script (navegação, no cliente)
// usam este módulo, para os dois lados nunca divergirem.

/** Tempo até trocar sozinho de projeto. Chega ao CSS da barra de progresso como --intervalo. */
export const INTERVALO_MS = 6000;

/** Quantos vizinhos aparecem de cada lado do slide ativo; os demais ficam ocultos. */
const VIZINHOS_VISIVEIS = 1;

export interface EstadoDoSlide {
  /** Distância circular até o slide ativo: 0 no centro, negativa à esquerda. */
  distancia: number;
  ativo: boolean;
  oculto: boolean;
}

/** Índice dentro de 0..total-1, dando a volta pelos dois lados (o anterior do primeiro é o último). */
export function normalizar(indice: number, total: number): number {
  return ((indice % total) + total) % total;
}

/** Posição do slide `indice` quando o ativo é `atual`, num carrossel de `total` slides. */
export function estadoDoSlide(indice: number, atual: number, total: number): EstadoDoSlide {
  const metade = Math.floor(total / 2);
  const distancia = normalizar(indice - atual + metade, total) - metade;
  return { distancia, ativo: distancia === 0, oculto: Math.abs(distancia) > VIZINHOS_VISIVEIS };
}

/**
 * Atributos do elemento do slide para um estado. `undefined` significa "sem o atributo":
 * o servidor espalha o objeto na tag e o cliente remove os que vierem `undefined`.
 * O CSS posiciona o slide com --d (distância) e --ad (distância absoluta).
 */
export function atributosDoSlide({ distancia, ativo, oculto }: EstadoDoSlide): Record<string, string | undefined> {
  return {
    'data-ativo': ativo ? '' : undefined,
    'data-oculto': oculto ? '' : undefined,
    'aria-hidden': ativo ? undefined : 'true',
    style: `--d:${distancia};--ad:${Math.abs(distancia)}`,
  };
}

/** Textos do contador, com dois dígitos: o slide `indice` (base 0) de `total` vira "02" / "04". */
export function contador(indice: number, total: number): { atual: string; total: string } {
  const dois = (x: number) => String(x).padStart(2, '0');
  return { atual: dois(indice + 1), total: dois(total) };
}
