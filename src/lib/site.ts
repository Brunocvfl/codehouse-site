// Dados centrais do site. Troque aqui e todos os botões/links são atualizados.
// A URL abaixo também é a "site" do Astro (astro.config.mjs) e entra no robots.txt e no sitemap.

const url = 'https://codehouse.tec.br';

export const SITE = {
  name: 'Code House',
  url,
  domain: new URL(url).host,
  description:
    'A Code House cria sites institucionais, landing pages de alta conversão, sistemas web sob medida e aplicações completas, com tecnologia moderna, performance e design funcional.',
  instagram: 'code.housetech',
  instagramUrl: 'https://www.instagram.com/code.housetech/',
};

// O WhatsApp (número e mensagens) fica em ./whatsapp.ts.

export const NAV = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#processo', label: 'Processo' },
  { href: '/#portfolio', label: 'Portfólio' },
  { href: '/#contato', label: 'Contato' },
];
