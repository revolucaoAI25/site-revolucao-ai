import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

const siteUrl = "https://www.revolucao-ai.com";

// Dinâmico (não cacheado no build) pra que os posts do blog apareçam no
// sitemap assim que a data de publicação chega, sem precisar de um redeploy.
export const dynamic = "force-dynamic";

/**
 * Data da última mudança real de conteúdo de cada página. O Bing usa o
 * lastmod pra decidir quando voltar a rastrear — se ele mudar a cada visita
 * (como acontecia com new Date()), o Bing passa a ignorar. Atualize a data
 * da página quando mudar o conteúdo dela.
 */
const PAGE_UPDATED_AT: Record<string, string> = {
  "/": "2026-10-29",
  "/agentes-de-ia": "2026-10-29",
  "/formacao": "2026-10-09",
  "/lead-extractor": "2026-10-09",
  "/plataforma": "2026-10-09",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  const page = (path: string) => new Date(`${PAGE_UPDATED_AT[path]}T12:00:00-03:00`);
  const lastPost = posts[0] ? new Date(`${posts[0].date}T12:00:00-03:00`) : page("/");

  return [
    { url: siteUrl, lastModified: page("/"), changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/agentes-de-ia`,
      lastModified: page("/agentes-de-ia"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/formacao`,
      lastModified: page("/formacao"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/lead-extractor`,
      lastModified: page("/lead-extractor"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/plataforma`,
      lastModified: page("/plataforma"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: lastPost,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T12:00:00-03:00`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
