import { describe, expect, it } from 'vitest';
import {
  DEGRAUS,
  DENSIDADE_DESKTOP,
  DENSIDADE_MOBILE,
  PERFIS,
  TELA_MOBILE,
  larguras,
  opcoesDaImagem,
  pluginImagensDoTexto,
  sizes,
  variaveisDoSlide,
} from './imagens';

describe('larguras', () => {
  it('vai pelos degraus até o primeiro que cobre 2× o desktop ou 3× o celular', () => {
    expect(larguras({ largura: 672, aPartirDe: 736, fracaoMobile: 1 })).toEqual([480, 640, 960, 1280, 1920]);
    // 3 × 412 = 1236 no celular passa dos 2 × 300 do desktop
    expect(larguras({ largura: 300, aPartirDe: 1024, fracaoMobile: 1 })).toEqual([480, 640, 960, 1280]);
  });

  it('para no maior degrau quando nenhum cobre', () => {
    expect(larguras({ largura: 2000, aPartirDe: 2000, fracaoMobile: 1 })).toEqual([...DEGRAUS]);
  });
});

describe('perfis', () => {
  it.each(Object.entries(PERFIS))('%s: a maior versão cobre 2× no desktop e 3× no celular', (_, perfil) => {
    const maior = Math.max(...larguras(perfil));
    expect(maior).toBeGreaterThanOrEqual(perfil.largura * DENSIDADE_DESKTOP);
    expect(maior).toBeGreaterThanOrEqual(perfil.fracaoMobile * TELA_MOBILE * DENSIDADE_MOBILE);
  });

  it('sizes de cada perfil', () => {
    expect(sizes(PERFIS.capa)).toBe('(min-width: 1280px) 1216px, 100vw');
    expect(sizes(PERFIS.card)).toBe('(min-width: 1024px) 390px, 100vw');
    expect(sizes(PERFIS.slide)).toBe('(min-width: 579px) 440px, 76vw');
    expect(sizes(PERFIS.texto)).toBe('(min-width: 736px) 672px, 100vw');
  });

  it('slide: a partir de aPartirDe, a fração da tela já passa da largura fixa', () => {
    const { largura, aPartirDe, fracaoMobile } = PERFIS.slide;
    expect(aPartirDe * fracaoMobile).toBeGreaterThanOrEqual(largura);
    expect((aPartirDe - 1) * fracaoMobile).toBeLessThan(largura);
  });

  it('opções prontas para o <Image> e variáveis CSS do slide', () => {
    expect(opcoesDaImagem('texto')).toEqual({ widths: larguras(PERFIS.texto), sizes: sizes(PERFIS.texto) });
    expect(variaveisDoSlide()).toBe('--largura-slide:440px;--fracao-slide:76vw');
  });
});

describe('pluginImagensDoTexto', () => {
  const rodar = (src: string, locais: string[]) => {
    const props: Record<string, unknown> = {};
    const no = { properties: { src } };
    const ctx = {
      data: { astro: { localImagePaths: new Set(locais) } },
      setProperty: (_: unknown, nome: string, valor: unknown) => (props[nome] = valor),
    };
    pluginImagensDoTexto().element.visit(no, ctx);
    return props;
  };

  it('aplica o perfil texto às imagens locais', () => {
    expect(rodar('./imagens/a%20b.webp', ['./imagens/a b.webp'])).toEqual(opcoesDaImagem('texto'));
  });

  it('não mexe em imagens que não são locais', () => {
    expect(rodar('https://exemplo.com/a.webp', [])).toEqual({});
    expect(rodar('/favicon.png', [])).toEqual({});
  });
});
