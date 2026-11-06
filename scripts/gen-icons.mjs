// Gera os assets otimizados a partir dos originais em static/img.
// Uso: npm run icons
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'static/img';
const BRAND = 'src/assets/brand';
const PUB = 'public';

await mkdir(BRAND, { recursive: true });
await mkdir(PUB, { recursive: true });

// Logo horizontal (texto branco, fundo transparente) sem a margem extra.
await sharp(`${SRC}/logo/CodeHouse_transparente_4920px.png`)
  .trim()
  .resize({ width: 1200 })
  .png()
  .toFile(`${BRAND}/logo.png`);

// Ícone da casinha sem fundo, recortado.
const iconTrim = await sharp(`${SRC}/casinha/CodeHouse_icone_06_sem_fundo_4096.png`)
  .trim()
  .png()
  .toBuffer();
await sharp(iconTrim).resize({ width: 600 }).png().toFile(`${BRAND}/casinha.png`);

// Favicons: ícone com fundo degradê da marca (lê bem em abas claras e escuras).
const iconBg = `${SRC}/casinha/CodeHouse_icone_01_degrade_marca_4096.png`;
await sharp(iconBg).resize(32, 32).png().toFile(`${PUB}/favicon-32.png`);
await sharp(iconBg).resize(180, 180).png().toFile(`${PUB}/apple-touch-icon.png`);
await sharp(iconBg).resize(512, 512).png().toFile(`${PUB}/icon-512.png`);


// A imagem de compartilhamento (public/og-image.png) foi gerada a partir de uma página do site
// com a fonte Russo One e não é recriada por este script.

console.log('Assets gerados.');
