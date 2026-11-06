import { describe, expect, it } from 'vitest';
import { filtrarDestaques, montarProjetos } from './portfolio-regras';

const entrada = (id: string, dados: Partial<{ draft: boolean; featured: boolean; order: number; year: number }> = {}) => ({
  id,
  data: { draft: false, featured: false, order: 100, year: 2026, type: 'Landing page', client: 'Padaria Pão Quente', ...dados },
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

  it('monta href e rótulo de cada projeto', () => {
    const [p] = montarProjetos([entrada('loja-da-ana')]);
    expect(p.href).toBe('/portfolio/loja-da-ana');
    expect(p.rotulo).toBe('Landing page para Padaria Pão Quente');
  });

  it('não altera a lista recebida', () => {
    const lista = [entrada('b', { order: 2 }), entrada('a', { order: 1 })];
    montarProjetos(lista);
    expect(lista.map((e) => e.id)).toEqual(['b', 'a']);
  });
});

describe('filtrarDestaques', () => {
  it('pega só os featured, até o limite, mantendo a ordem', () => {
    const projetos = montarProjetos([
      entrada('x', { featured: true, order: 3 }),
      entrada('y', { order: 1 }),
      entrada('z', { featured: true, order: 2 }),
      entrada('w', { featured: true, order: 4 }),
    ]);
    expect(filtrarDestaques(projetos, 2).map((p) => p.id)).toEqual(['z', 'x']);
  });
});
