import { getCollection } from 'astro:content';

/** Projetos publicados (draft: false), ordenados por "order" e depois pelo ano mais recente. */
export async function getProjetos() {
  const todos = await getCollection('portfolio', ({ data }) => !data.draft);
  return todos.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export async function getDestaques(limite = 3) {
  return (await getProjetos()).filter((p) => p.data.featured).slice(0, limite);
}
