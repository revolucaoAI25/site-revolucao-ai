import type { BlogPost } from "./types";

const siteUrl = "https://www.revolucao-ai.com";

/** JSON-LD BlogPosting — mesmo padrão do faqPageJsonLd, só que pro artigo em si (autoria, data, etc). */
export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Lucas Magalhães",
      url: `${siteUrl}/formacao`,
    },
    publisher: {
      "@type": "Organization",
      name: "Revolução AI",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };
}
