---
title: Atelier BP Print & Crafts
client: Atelier BP
type: Site institucional
summary: Site de um ateliê de impressão 3D e bottons, com um configurador em que o cliente monta o botton, vê frente e verso e já recebe a estimativa de preço.
cover: ./imagens/atelier-bp/hero.webp
stack: [HTML, CSS, JavaScript, Canvas]
year: 2026
featured: false
order: 4
draft: false
---

## Contexto

O Atelier BP é um ateliê de **impressão 3D e bottons personalizados**: peças sob medida em filamento ou resina e bottons prensados um a um. O site, ainda em desenvolvimento, apresenta os dois serviços e leva o cliente a pedir orçamento pelo WhatsApp.

## Desafio

- **Mostrar o produto antes de existir.** Quem encomenda um botton quer ver como a própria arte vai ficar, com o corte e a dobra da borda.
- **Orçamento sem ida e volta.** Preço por tamanho, quantidade e tipo de verso precisava aparecer na hora, e o pedido tinha que chegar ao ateliê já completo.
- **Peças 3D são abertas demais para um configurador.** Para elas, o caminho é um formulário que organize a ideia do cliente.

## Solução

Um site estático, sem framework, com a identidade colorida do ateliê. No topo, o emblema do Atelier BP é "impresso" camada por camada, com o bico de uma impressora 3D subindo junto, como acontece numa impressão de verdade.

![Emblema sendo impresso camada por camada na abertura do site](./imagens/atelier-bp/hero-imprimindo.webp)

### Monte seu botton

O configurador desenha o botton num **canvas**: a arte enviada pelo cliente, a área que dobra para trás, o brilho do acetato e a sombra. Dá para arrastar e dar zoom na imagem, escrever um texto, trocar a cor de fundo e escolher tamanho (25 a 55 mm), acabamento (brilho ou fosco) e quantidade. A estimativa de preço se atualiza a cada mudança, com desconto por faixa de quantidade.

![Configurador com a prévia do botton e a estimativa de preço](./imagens/atelier-bp/configurador.webp)

Ao escolher o verso, a prévia vira e mostra o acabamento: alfinete, ímã de geladeira, chaveiro ou espelho de bolso.

![Verso do botton com chaveiro, em 55 mm](./imagens/atelier-bp/configurador-verso.webp)

A imagem do cliente é processada só no navegador: ela não sai do aparelho até ele decidir enviar. O botão de pedido abre o WhatsApp com tudo já escrito (tamanho, verso, acabamento, quantidade e valor), e a prévia pode ser baixada em PNG para anexar à conversa.

### Portfólio e orçamento 3D

A galeria tem filtro entre impressão 3D e bottons. As ilustrações abaixo guardam o lugar das fotos reais das peças, que entram quando o site for publicado. O orçamento de peças 3D é um formulário curto (o que imprimir, uso, material, tamanho, cor e link do modelo) que também vira uma mensagem de WhatsApp.

![Galeria de trabalhos com filtro por tipo](./imagens/atelier-bp/portfolio.webp)

### No celular

O layout se reorganiza em uma coluna no celular, e o configurador aceita arrastar e pinçar para ajustar a arte.

![Abertura do site e configurador no celular](./imagens/atelier-bp/mobile.webp)

## Situação

O site está em desenvolvimento. A estrutura, o configurador e os formulários estão prontos. Faltam os dados de contato definitivos, as fotos reais do portfólio e a publicação.
