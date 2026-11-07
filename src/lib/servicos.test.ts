import { describe, expect, it } from 'vitest';
import { SERVICOS, TIPOS_DE_SERVICO } from './servicos';

describe('Catálogo de Serviços', () => {
  it('cada serviço tem um id único (as abas dependem disso)', () => {
    const ids = SERVICOS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada serviço tem um tipo único (o portfólio valida por ele)', () => {
    expect(new Set(TIPOS_DE_SERVICO).size).toBe(SERVICOS.length);
  });

  it('cada serviço tem uma sugestão única (o formulário reconhece por ela)', () => {
    const sugestoes = SERVICOS.map((s) => s.sugestao);
    expect(new Set(sugestoes).size).toBe(sugestoes.length);
  });

  it('os tipos aceitos no portfólio seguem a ordem do catálogo', () => {
    expect(TIPOS_DE_SERVICO).toEqual(['Site institucional', 'Landing page', 'Sistema web', 'Aplicação']);
  });
});
