import { describe, expect, it } from 'vitest';
import { whatsappExibicao, whatsappLink } from './whatsapp';

const mensagem = (link: string) => new URL(link).searchParams.get('text');

describe('whatsappLink', () => {
  it('aponta para o número da Code House no wa.me', () => {
    expect(whatsappLink()).toMatch(/^https:\/\/wa\.me\/5511953744237\?text=/);
  });

  it('sem assunto, usa a saudação e o assunto padrão', () => {
    expect(mensagem(whatsappLink())).toBe(
      'Olá, Code House! Vim pelo site. Quero conversar sobre um projeto.',
    );
  });

  it('com assunto, coloca a saudação antes', () => {
    expect(mensagem(whatsappLink('Quero uma landing page para uma oferta.'))).toBe(
      'Olá, Code House! Vim pelo site. Quero uma landing page para uma oferta.',
    );
  });

  it('assunto vazio ou só espaços cai no padrão', () => {
    expect(whatsappLink('   ')).toBe(whatsappLink());
  });

  it('codifica acentos, quebras de linha e símbolos', () => {
    const link = whatsappLink('Minha ideia: loja & app\n50% off?');
    expect(link.split('?text=')[1]).not.toMatch(/[ \n&]/);
    expect(mensagem(link)).toBe('Olá, Code House! Vim pelo site. Minha ideia: loja & app\n50% off?');
  });
});

describe('whatsappExibicao', () => {
  it('mostra o número formatado', () => {
    expect(whatsappExibicao).toBe('+55 11 95374-4237');
  });
});
