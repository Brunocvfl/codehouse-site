// Contato pelo WhatsApp. Número, saudação e formato do link ficam só aqui:
// troque o número abaixo e todos os botões, o formulário e o rodapé são atualizados.

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

/** Número para mostrar na tela, ex.: +55 11 95374-4237. */
export const whatsappExibicao = formatar(NUMERO);

function formatar(digitos: string): string {
  const m = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/.exec(digitos);
  return m ? `+${m[1]} ${m[2]} ${m[3]}-${m[4]}` : `+${digitos}`;
}
