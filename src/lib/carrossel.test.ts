import { describe, expect, it } from 'vitest';
import { atributosDoSlide, contador, estadoDoSlide, normalizar } from './carrossel';

const distancias = (atual: number, total: number) =>
  Array.from({ length: total }, (_, i) => estadoDoSlide(i, atual, total).distancia);

describe('normalizar', () => {
  it('dá a volta pelos dois lados', () => {
    expect(normalizar(-1, 4)).toBe(3);
    expect(normalizar(4, 4)).toBe(0);
    expect(normalizar(9, 4)).toBe(1);
    expect(normalizar(-5, 4)).toBe(3);
    expect(normalizar(2, 4)).toBe(2);
  });
});

describe('estadoDoSlide', () => {
  it('põe o ativo no centro e os vizinhos dos dois lados, dando a volta', () => {
    expect(distancias(0, 4)).toEqual([0, 1, -2, -1]);
    expect(distancias(3, 4)).toEqual([1, -2, -1, 0]);
    expect(distancias(2, 5)).toEqual([-2, -1, 0, 1, 2]);
    expect(distancias(0, 3)).toEqual([0, 1, -1]);
  });

  it('funciona com 1 e 2 slides', () => {
    expect(distancias(0, 1)).toEqual([0]);
    expect(distancias(0, 2)).toEqual([0, -1]);
    expect(distancias(1, 2)).toEqual([-1, 0]);
  });

  it('tem exatamente um slide ativo, qualquer que seja o atual', () => {
    for (let total = 1; total <= 6; total++) {
      for (let atual = 0; atual < total; atual++) {
        const ativos = Array.from({ length: total }, (_, i) => estadoDoSlide(i, atual, total)).filter((e) => e.ativo);
        expect(ativos).toHaveLength(1);
        expect(estadoDoSlide(atual, atual, total).ativo).toBe(true);
      }
    }
  });

  it('mostra só um vizinho de cada lado; o resto fica oculto', () => {
    const ocultos = (atual: number, total: number) =>
      Array.from({ length: total }, (_, i) => estadoDoSlide(i, atual, total).oculto);
    expect(ocultos(0, 3)).toEqual([false, false, false]);
    expect(ocultos(0, 4)).toEqual([false, false, true, false]);
    expect(ocultos(2, 5)).toEqual([true, false, false, false, true]);
  });
});

describe('atributosDoSlide', () => {
  it('slide ativo: data-ativo, visível e com a posição no style', () => {
    expect(atributosDoSlide(estadoDoSlide(0, 0, 4))).toEqual({
      'data-ativo': '',
      'data-oculto': undefined,
      'aria-hidden': undefined,
      style: '--d:0;--ad:0',
    });
  });

  it('vizinho: escondido do leitor de tela, mas não oculto', () => {
    expect(atributosDoSlide(estadoDoSlide(3, 0, 4))).toEqual({
      'data-ativo': undefined,
      'data-oculto': undefined,
      'aria-hidden': 'true',
      style: '--d:-1;--ad:1',
    });
  });

  it('além dos vizinhos: oculto', () => {
    expect(atributosDoSlide(estadoDoSlide(2, 0, 4))).toEqual({
      'data-ativo': undefined,
      'data-oculto': '',
      'aria-hidden': 'true',
      style: '--d:-2;--ad:2',
    });
  });
});

describe('contador', () => {
  it('mostra posição e total com dois dígitos, contando a partir de 1', () => {
    expect(contador(0, 4)).toEqual({ atual: '01', total: '04' });
    expect(contador(11, 12)).toEqual({ atual: '12', total: '12' });
  });
});
