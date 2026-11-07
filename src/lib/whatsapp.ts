// Contato pelo WhatsApp. Número, saudação e formato do link ficam só aqui:
// troque o número abaixo e todos os botões, o formulário e o rodapé são atualizados.
// Todo Assunto passa por aqui: o padrão, o de cada Serviço e o da ideia digitada.
import { SERVICOS } from './servicos';

/** DDI + DDD + número, só dígitos. */
const NUMERO = '5511953744237';

const SAUDACAO = 'Olá, Code House! Vim pelo site.';
const ASSUNTO_PADRAO = 'Quero conversar sobre um projeto.';

/**
 * Link que abre o WhatsApp com a mensagem pronta: a saudação + o assunto.
 * Sem assunto (ou com assunto vazio), usa o assunto padrão.
 */
export function whatsappLink(assunto: string = ASSUNTO_PADRAO): string {
  const mensagem = `${SAUDACAO} ${assunto.trim() || ASSUNTO_PADRAO}`;
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

/** Sugestões do formulário "Conte sua ideia", uma por Serviço, na ordem do Catálogo. */
export const SUGESTOES: readonly string[] = SERVICOS.map((s) => s.sugestao);

/** Menor ideia aceita, em caracteres (sem espaços nas pontas). */
const MINIMO_DA_IDEIA = 5;
export const ERRO_IDEIA_CURTA = 'Escreva sua ideia em pelo menos uma frase curta para enviarmos.';

export type AssuntoDaIdeia = { ok: true; assunto: string } | { ok: false; erro: string };

/**
 * Assunto a partir do que o visitante digitou no formulário.
 * Texto livre vira "Minha ideia: …". Se começa com uma sugestão, a sugestão já diz
 * o que ele quer e o texto vai como está. Dois-pontos sobrando no fim saem.
 */
export function assuntoDaIdeia(texto: string): AssuntoDaIdeia {
  const ideia = texto.trim().replace(/\s*:+$/, '');
  if (ideia.length < MINIMO_DA_IDEIA) return { ok: false, erro: ERRO_IDEIA_CURTA };
  const comSugestao = SUGESTOES.some((s) => ideia.startsWith(s));
  return { ok: true, assunto: comSugestao ? ideia : `Minha ideia: ${ideia}` };
}

/** Número para mostrar na tela, ex.: +55 11 95374-4237. */
export const whatsappExibicao = formatar(NUMERO);

function formatar(digitos: string): string {
  const m = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/.exec(digitos);
  return m ? `+${m[1]} ${m[2]} ${m[3]}-${m[4]}` : `+${digitos}`;
}
