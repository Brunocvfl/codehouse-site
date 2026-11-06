// Dados centrais do site. Troque aqui e todos os botões/links são atualizados.

export const SITE = {
  name: 'Code House',
  domain: 'codehouse.tec.br',
  url: 'https://codehouse.tec.br',
  description:
    'A Code House cria sites institucionais, landing pages de alta conversão, sistemas web sob medida e aplicações completas, com tecnologia moderna, performance e design funcional.',
  instagram: 'code.housetech',
  instagramUrl: 'https://www.instagram.com/code.housetech/',
};

// WhatsApp com DDI + DDD, só dígitos: +55 11 95374-4237
export const WHATSAPP_NUMBER = '5511953744237';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Code House! Vim pelo site e quero conversar sobre um projeto.';

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#processo', label: 'Processo' },
  { href: '/#portfolio', label: 'Portfólio' },
  { href: '/#contato', label: 'Contato' },
];
