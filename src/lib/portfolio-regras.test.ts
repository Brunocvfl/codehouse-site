import { describe, expect, it } from 'vitest';
import { ORDEM_PADRAO, montarProjetos } from './portfolio-regras';

const entrada = (id: string, dados: Partial<{ draft: boolean; order: number; year: number }> = {}) => ({
  id,
  data: { draft: false, order: ORDEM_PADRAO, year: 2026, type: 'Landing page' as const, client: 'Padaria Pão Quente', ...dados },
});

describe('montarProjetos', () => {
  it('deixa de fora os rascunhos', () => {
    const ids = montarProjetos([entrada('a'), entrada('b', { draft: true })]).map((p) => p.id);
    expect(ids).toEqual(['a']);
  });

  it('ordena por order e, no empate, pelo ano mais recente', () => {
    const ids = montarProjetos([
      entrada('antigo', { order: 1, year: 2024 }),
      entrada('depois', { order: 2, year: 2026 }),
      entrada('novo', { order: 1, year: 2026 }),
    ]).map((p) => p.id);
    expect(ids).toEqual(['novo', 'antigo', 'depois']);
  });

  it('monta href e as duas formas do rótulo de cada projeto', () => {
    const [p] = montarProjetos([entrada('loja-da-ana')]);
    expect(p.href).toBe('/portfolio/loja-da-ana');
    expect(p.rotulo).toBe('Landing page para Padaria Pão Quente');
    expect(p.rotuloComAno).toBe('Landing page para Padaria Pão Quente, 2026');
  });

  it('não altera a lista recebida', () => {
    const lista = [entrada('b', { order: 2 }), entrada('a', { order: 1 })];
    montarProjetos(lista);
    expect(lista.map((e) => e.id)).toEqual(['b', 'a']);
  });
});
