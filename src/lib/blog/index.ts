import type { BlogPost } from "./types";
import { clusterAPosts } from "./posts/cluster-a";

const allPosts: BlogPost[] = [...clusterAPosts];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

/** Só os posts cuja data de publicação já chegou — é isso que faz o "drip" funcionar sem redeploy. */
export function getPublishedPosts(): BlogPost[] {
  const today = todayIso();
  return allPosts
    .filter((post) => post.date <= today)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const today = todayIso();
  return allPosts.find((post) => post.slug === slug && post.date <= today);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const published = getPublishedPosts();
  return post.relatedSlugs
    .map((slug) => published.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));
}
