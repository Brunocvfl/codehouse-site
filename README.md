# Code House — codehouse.tec.br

Site institucional da Code House, feito com Astro 7 + Tailwind 4.
Títulos em Russo One, texto em IBM Plex Sans, código em JetBrains Mono.

## Rodar localmente
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera a pasta dist/
npm run preview   # serve a dist/ localmente
npm test          # roda os testes
```

## Onde mexer
| O quê | Arquivo |
|---|---|
| Número do WhatsApp e saudação das mensagens | `src/lib/whatsapp.ts` |
| Instagram, domínio, menu | `src/lib/site.ts` |
| Cores e fontes | `src/styles/global.css` (bloco `@theme`) |
| Serviços oferecidos (nomes, descrições, o que o cliente recebe) | `src/lib/servicos.ts` |
| Textos das seções | `src/components/*.astro` |
| Texto da primeira tela | `src/components/Hero.astro` |
| Animação da primeira tela (partículas que formam a casa) | `src/lib/particulas.ts` |
| Logo e ícones | `npm run icons` regenera a partir de `static/img/` |
| Imagem de compartilhamento (WhatsApp/Instagram) | `public/og-image.png` (1200×630) |

## Adicionar um projeto ao portfólio
1. Copie `src/content/portfolio/_exemplo.md` para um novo arquivo, ex.: `loja-da-ana.md`.
2. Preencha os campos. Coloque a imagem em `src/content/portfolio/imagens/` e aponte em `cover`.
3. Mude `draft` para `false`. Com `featured: true` o projeto também aparece na home.
4. A página fica em `/portfolio/loja-da-ana`.

## Publicar na Vercel + Registro.br
1. Suba este repositório para o GitHub.
2. Na Vercel: **Add New Project** > importe o repositório (o preset Astro é detectado sozinho).
3. Em **Settings > Domains**, adicione `codehouse.tec.br` e `www.codehouse.tec.br`.
4. No Registro.br (codehouse.tec.br > DNS > Editar zona), crie os registros que a Vercel mostrar.
   Normalmente: `A` na raiz apontando para `76.76.21.21` e `CNAME` `www` para `cname.vercel-dns.com`.
5. Aguarde a propagação; o SSL é emitido automaticamente.
