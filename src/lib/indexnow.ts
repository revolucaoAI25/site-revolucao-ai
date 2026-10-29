import "server-only";
import { getPublishedPosts } from "@/lib/blog";

/**
 * IndexNow: protocolo aberto usado pelo Bing (e Yandex, Seznam, Naver…) pra
 * avisar na hora que uma página foi publicada ou mudou, em vez de esperar o
 * robô passar. O Bing é o índice que o ChatGPT (busca) e o Copilot usam, então
 * isso acelera o site aparecer por lá.
 *
 * A chave abaixo é pública por definição: o arquivo public/<chave>.txt com o
 * mesmo conteúdo prova pro Bing que somos donos do domínio. Pra trocar a
 * chave, troque os dois juntos.
 */
export const INDEXNOW_KEY = "35033f57d13f8c7e61010312e8571ab0";

const HOST = "www.revolucao-ai.com";
const SITE_URL = `https://${HOST}`;

/**
 * Páginas da agência (venda de agentes de IA) — o foco do SEO no Bing.
 * Formação, Lead Extractor e Plataforma ficam de fora de propósito.
 */
export const AGENCY_PAGES = ["/", "/agentes-de-ia", "/blog"];

export function agencyPageUrls(): string[] {
  return AGENCY_PAGES.map((path) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`));
}

export function blogPostUrls(options: { sinceDays?: number } = {}): string[] {
  const posts = getPublishedPosts();
  const since =
    options.sinceDays === undefined
      ? null
      : new Date(Date.now() - options.sinceDays * 86_400_000).toISOString().slice(0, 10);
  const filtered = since ? posts.filter((post) => post.date >= since) : posts;
  return filtered.map((post) => `${SITE_URL}/blog/${post.slug}`);
}

export type IndexNowResult = { ok: boolean; status: number; submitted: number; detail?: string };

/** Envia uma lista de URLs pro IndexNow (o Bing recebe e repassa aos outros buscadores). */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const unique = [...new Set(urls)].slice(0, 10_000);
  if (unique.length === 0) return { ok: true, status: 204, submitted: 0, detail: "nada pra enviar" };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: unique,
      }),
    });
    // 200 = recebido; 202 = recebido, chave ainda sendo validada.
    const ok = res.status === 200 || res.status === 202;
    return { ok, status: res.status, submitted: ok ? unique.length : 0, detail: ok ? undefined : await res.text() };
  } catch (error) {
    return { ok: false, status: 0, submitted: 0, detail: error instanceof Error ? error.message : String(error) };
  }
}
