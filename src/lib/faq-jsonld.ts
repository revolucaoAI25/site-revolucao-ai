import type { FAQItem } from "@/components/ui/FAQAccordion";

/**
 * JSON-LD FAQPage a partir dos mesmos itens já exibidos no FAQAccordion da
 * página — nenhum conteúdo novo, só a mesma pergunta/resposta anotada de
 * forma que buscadores e mecanismos de IA generativa (Google AI Overviews,
 * ChatGPT, Perplexity etc.) consigam extrair e citar diretamente.
 */
export function faqPageJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
