export type BlogCluster =
  | "whatsapp"
  | "atendimento"
  | "vendas"
  | "verticais"
  | "comercial"
  | "definicional"
  | "ferramentas"
  | "como-criar"
  | "autoridade"
  | "cauda-longa"
  | "termos";

export const CLUSTER_LABELS: Record<BlogCluster, string> = {
  whatsapp: "Agente de IA no WhatsApp",
  atendimento: "Atendimento com IA",
  vendas: "Vendas e SDR",
  verticais: "Por segmento",
  comercial: "Preço e comparativos",
  definicional: "Conceitos",
  ferramentas: "Ferramentas de IA",
  "como-criar": "Como criar",
  autoridade: "Mercado e tendências",
  "cauda-longa": "Outros temas",
  termos: "Chatbot e assistente de IA",
};

/**
 * Um trecho de texto simples, em negrito (destaque de termo/ideia-chave), ou
 * com link embutido — usado com moderação, só onde ajuda a leitura ou faz
 * sentido linkar.
 */
export type InlineRun =
  | string
  | { text: string; bold: true }
  | { text: string; href: string; external?: boolean };

export type BlogBlock =
  | { type: "p"; content: string | InlineRun[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: (string | InlineRun[])[] }
  | {
      /** Destaque visual pra um dado, definição curta ou virada de chave — não é o CTA final, é uma pausa no meio do texto. */
      type: "callout";
      text: string;
    }
  | {
      type: "cta";
      /** Texto curto acima do botão — não é headline de venda, é só a ponte natural pro próximo passo. */
      lead: string;
      label: string;
      href: string;
      external?: boolean;
    };

export type BlogFAQ = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  cluster: BlogCluster;
  title: string;
  metaDescription: string;
  keyword: string;
  /** ISO yyyy-mm-dd — data de publicação. Posts com data futura ficam ocultos até lá (ver src/lib/blog/index.ts). */
  date: string;
  destino: { label: string; href: string };
  /** Slugs de outros posts já publicados (ou a publicar) pra seção "Leia também" — reforça o silo temático. */
  relatedSlugs: string[];
  faq: BlogFAQ[];
  intro: string;
  body: BlogBlock[];
};
