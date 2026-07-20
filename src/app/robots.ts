import type { MetadataRoute } from "next";

const siteUrl = "https://www.revolucao-ai.com";

const disallow = [
  "/admin",
  "/admin/",
  "/api/",
  "/*/assinar/obrigado",
  "/plataforma/onboarding",
];

/**
 * Rastreadores de mecanismos de IA generativa (ChatGPT, Perplexity, Claude,
 * Google AI Overviews etc.) — regras explícitas de permissão, além do "*"
 * abaixo, pra deixar claro que o site pode ser lido e citado por eles (GEO).
 */
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
