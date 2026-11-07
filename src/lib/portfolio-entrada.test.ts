// Um Rascunho não aparece em nenhuma página porque todo Projeto passa por
// getProjetos (src/lib/portfolio.ts), que aplica a regra. Este teste garante que
// ninguém lê a coleção do portfólio por outro caminho.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = join(import.meta.dirname, '..');
const PORTA = join('lib', 'portfolio.ts');

function arquivos(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? arquivos(join(dir, e.name)) : /\.(astro|ts|mjs|js)$/.test(e.name) ? [join(dir, e.name)] : [],
  );
}

describe('porta de entrada do portfólio', () => {
  it('só src/lib/portfolio.ts lê a coleção (getCollection / getEntry)', () => {
    const fora = arquivos(SRC)
      .filter((f) => !f.endsWith('.test.ts'))
      .filter((f) => /\bget(Collection|Entry|Entries)\s*\(/.test(readFileSync(f, 'utf-8')))
      .map((f) => relative(SRC, f));
    expect(fora).toEqual([PORTA]);
  });
});
