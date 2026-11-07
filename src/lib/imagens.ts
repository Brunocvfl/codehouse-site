// Perfis de imagem dos Projetos: quanto cada imagem ocupa na tela e, a partir disso,
// quais versões gerar (widths) e como o navegador escolhe entre elas (sizes).
// Os quatro lugares que mostram imagens de Projeto leem daqui: a Capa no topo do
// estudo de caso, o card do portfólio, o slide do Carrossel e as imagens do texto.
//
// As medidas espelham o layout (Tailwind/CSS); se o layout mudar, mude aqui também:
// - .wrap: 1280px no máximo, com 2rem de cada lado → 1216px de conteúdo;
// - grade do portfólio: 3 colunas a partir de lg (1024px), espaço de 1.5rem → ~390px;
// - texto do estudo de caso: max-w-2xl → 672px (+ 2 × 2rem de margem = 736px de tela);
// - slide do Carrossel: a largura vem daqui, por CSS (--largura-slide e --fracao-slide).

/** Larguras que o Astro pode gerar. Também são os breakpoints padrão do astro.config. */
export const DEGRAUS = [480, 640, 960, 1280, 1920, 2560] as const;

/** Densidade de pixels que cada imagem deve cobrir: telas grandes e celulares. */
export const DENSIDADE_DESKTOP = 2;
export const DENSIDADE_MOBILE = 3;
/** Largura de tela (em px CSS) de referência para celular. */
export const TELA_MOBILE = 412;

export interface Perfil {
  /** Largura, em px CSS, que a imagem ocupa na tela larga. */
  largura: number;
  /** Largura de tela a partir da qual a imagem ocupa `largura`. */
  aPartirDe: number;
  /** Fração da largura da tela que a imagem ocupa abaixo de `aPartirDe` (1 = tela toda). */
  fracaoMobile: number;
}

export const PERFIS = {
  capa: { largura: 1216, aPartirDe: 1280, fracaoMobile: 1 },
  card: { largura: 390, aPartirDe: 1024, fracaoMobile: 1 },
  slide: { largura: 440, aPartirDe: 579, fracaoMobile: 0.76 },
  texto: { largura: 672, aPartirDe: 736, fracaoMobile: 1 },
} as const satisfies Record<string, Perfil>;

export type NomeDoPerfil = keyof typeof PERFIS;

/** Maior largura que o perfil precisa: 2× no desktop ou 3× no celular, o que for maior. */
export function larguraNecessaria(perfil: Perfil): number {
  return Math.max(perfil.largura * DENSIDADE_DESKTOP, perfil.fracaoMobile * TELA_MOBILE * DENSIDADE_MOBILE);
}

/** Degraus até o primeiro que cobre a largura necessária (ou todos, se nenhum cobrir). */
export function larguras(perfil: Perfil): number[] {
  const alvo = larguraNecessaria(perfil);
  const fim = DEGRAUS.findIndex((d) => d >= alvo);
  return DEGRAUS.slice(0, fim === -1 ? DEGRAUS.length : fim + 1);
}

/** Atributo sizes: a largura fixa a partir de `aPartirDe`; abaixo, a fração da tela. */
export function sizes(perfil: Perfil): string {
  return `(min-width: ${perfil.aPartirDe}px) ${perfil.largura}px, ${Math.round(perfil.fracaoMobile * 100)}vw`;
}

/** widths e sizes prontos para o <Image> do Astro. */
export function opcoesDaImagem(nome: NomeDoPerfil): { widths: number[]; sizes: string } {
  const perfil = PERFIS[nome];
  return { widths: larguras(perfil), sizes: sizes(perfil) };
}

/** Variáveis CSS do slide, para o Carrossel não repetir a largura. */
export function variaveisDoSlide(): string {
  const { largura, fracaoMobile } = PERFIS.slide;
  return `--largura-slide:${largura}px;--fracao-slide:${Math.round(fracaoMobile * 100)}vw`;
}

interface NoImg {
  properties?: Record<string, unknown>;
}
interface ContextoHast {
  data: { astro?: { localImagePaths: Set<string> } };
  setProperty(no: NoImg, nome: string, valor: unknown): void;
}

/**
 * Plugin hast do Sätteri (markdown.processor no astro.config): aplica o perfil `texto`
 * às imagens locais do markdown. Roda antes do Astro transformar a <img> em <Image>,
 * e as propriedades postas aqui chegam às opções da imagem.
 */
export function pluginImagensDoTexto() {
  const { widths, sizes } = opcoesDaImagem('texto');
  return {
    name: 'imagens-do-texto',
    element: {
      filter: ['img'],
      visit(no: NoImg, ctx: ContextoHast) {
        const src = no.properties?.src;
        if (typeof src !== 'string' || !ctx.data.astro?.localImagePaths.has(decodeURI(src))) return;
        ctx.setProperty(no, 'widths', widths);
        ctx.setProperty(no, 'sizes', sizes);
      },
    },
  };
}
