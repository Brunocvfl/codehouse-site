import { getCollection, type CollectionEntry } from 'astro:content';
import { filtrarDestaques, montarProjetos, type ComRota } from './portfolio-regras';

/** Projeto publicado: a entrada do Astro + href e rotulo prontos. */
export type Projeto = ComRota<CollectionEntry<'portfolio'>>;

/** Projetos publicados, na ordem do portfólio. */
export async function getProjetos(): Promise<Projeto[]> {
  return montarProjetos(await getCollection('portfolio'));
}

export async function getDestaques(limite = 3): Promise<Projeto[]> {
  return filtrarDestaques(await getProjetos(), limite);
}

/** Caminhos para o getStaticPaths de /portfolio/[slug]. */
export async function getCaminhos() {
  return (await getProjetos()).map((projeto) => ({ params: { slug: projeto.id }, props: { projeto } }));
}
