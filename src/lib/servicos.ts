// Catálogo de Serviços: o que a Code House entrega.
// A seção "O que construímos" é montada daqui, e o campo "type" de cada Projeto
// do portfólio só aceita um dos tipos abaixo.

interface Servico {
  /** Identificador estável (abas da seção de serviços e desenho da planta). */
  id: string;
  /** Nome no plural, como aparece na seção de serviços. */
  nome: string;
  /** Nome no singular, usado no campo "type" dos Projetos. */
  tipo: string;
  resumo: string;
  descricao: string;
  recebe: readonly string[];
  /** Assunto da mensagem de WhatsApp de "Pedir orçamento". */
  assunto: string;
  /** Texto curto do botão de sugestão no formulário "Conte sua ideia". */
  sugestao: string;
}

export const SERVICOS = [
  {
    id: 'institucional',
    nome: 'Sites institucionais',
    tipo: 'Site institucional',
    resumo: 'A presença oficial da sua empresa',
    descricao:
      'Quem vocês são, o que fazem e como falar com vocês, num site que passa confiança e aparece no Google.',
    recebe: ['Domínio e hospedagem configurados', 'Layout próprio, adaptado ao celular', 'SEO básico e Google Analytics'],
    assunto: 'Quero um site institucional para o meu negócio.',
    sugestao: 'Quero um site para minha empresa',
  },
  {
    id: 'landing',
    nome: 'Landing pages',
    tipo: 'Landing page',
    resumo: 'Uma oferta, uma ação, alta conversão',
    descricao:
      'Uma página focada em vender, captar contatos ou agendar. Cada bloco existe para levar o visitante até o botão.',
    recebe: ['Texto orientado à conversão', 'Carregamento rápido no celular', 'WhatsApp, pixel e analytics integrados'],
    assunto: 'Quero uma landing page para uma oferta.',
    sugestao: 'Preciso de uma landing page',
  },
  {
    id: 'sistemas',
    nome: 'Sistemas web',
    tipo: 'Sistema web',
    resumo: 'Sob medida para a sua operação',
    descricao:
      'Painéis, cadastros, agendamentos, pedidos e relatórios que substituem planilhas e processos manuais.',
    recebe: ['Login com níveis de acesso', 'Banco de dados e backups', 'Relatórios e exportação'],
    assunto: 'Preciso de um sistema web sob medida.',
    sugestao: 'Quero um sistema para organizar meu negócio',
  },
  {
    id: 'aplicacoes',
    nome: 'Aplicações completas',
    tipo: 'Aplicação',
    resumo: 'Do protótipo ao produto no ar',
    descricao:
      'Front-end, back-end, integrações e infraestrutura para lançar uma plataforma, um SaaS ou um app web.',
    recebe: ['Arquitetura pronta para crescer', 'Pagamentos, e-mail e APIs', 'Deploy, monitoramento e suporte'],
    assunto: 'Quero tirar uma aplicação do papel.',
    sugestao: 'Tenho uma ideia de plataforma web',
  },
] as const satisfies readonly Servico[];

export type TipoDeServico = (typeof SERVICOS)[number]['tipo'];

/** Os tipos aceitos no campo "type" dos Projetos, na ordem do catálogo. */
export const TIPOS_DE_SERVICO = SERVICOS.map((s) => s.tipo) as [TipoDeServico, ...TipoDeServico[]];
