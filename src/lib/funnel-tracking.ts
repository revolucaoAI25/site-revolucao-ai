/**
 * Constantes compartilhadas entre o que registra as métricas dos funis
 * (QuizFunnel, LP v2, /api/track) e o painel que mostra (/admin/funis).
 * Fica num arquivo só pra o painel nunca divergir do que o funil registra.
 */

export const FUNNEL_PAGES = [
  { id: "funil-10k", label: "Funil de quiz", path: "/funil-10k" },
  { id: "zero-aos-10k-v2", label: "LP do curso", path: "/zero-aos-10k-v2" },
] as const;

export type FunnelPage = (typeof FUNNEL_PAGES)[number]["id"];

export const FUNNEL_EVENTS = [
  "page_view",
  "step_view",
  "answer",
  "contact_submit",
  "checkout_click",
  "scroll_depth",
  "section_view",
] as const;

export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

/** Etapas do quiz, na ordem em que aparecem. O índice é gravado em cada evento. */
export const FUNIL_STEPS = [
  { id: "intro", label: "Abertura" },
  { id: "desejo", label: "Pergunta 1 · Momento" },
  { id: "motivacao", label: "Pergunta 2 · Motivação" },
  { id: "obstaculo", label: "Pergunta 3 · Obstáculo" },
  { id: "breather", label: "Pausa (metade do caminho)" },
  { id: "tempo", label: "Pergunta 4 · Tempo" },
  { id: "urgencia", label: "Pergunta 5 · Urgência" },
  { id: "name", label: "Pediu o nome" },
  { id: "phone", label: "Pediu o WhatsApp" },
  { id: "loading", label: "Calculando o diagnóstico" },
  { id: "result", label: "Diagnóstico" },
  { id: "autoridade", label: "Apresentação do Lucas" },
  { id: "curriculo", label: "O que tem no curso" },
  { id: "social", label: "Clientes e depoimentos" },
  { id: "offer", label: "Oferta (preço)" },
] as const;

export type FunilStepId = (typeof FUNIL_STEPS)[number]["id"];

/** Seções da LP v2, na ordem da página (o id é o `id` da <section>). */
export const V2_SECTIONS = [
  { id: "hero", label: "Topo e carta de abertura" },
  { id: "bio", label: "Apresentação do Lucas" },
  { id: "obstaculo", label: "Por que tanta gente trava" },
  { id: "premissas", label: "As 2 premissas" },
  { id: "aprendizado", label: "O que vai aprender" },
  { id: "clientes", label: "Clientes atendidos" },
  { id: "depoimentos", label: "Depoimentos de alunos" },
  { id: "decisao", label: "A bifurcação" },
  { id: "oferta", label: "Oferta (preço)" },
  { id: "fechamento", label: "Fechamento" },
] as const;

export const CTA_LOCATIONS: Record<string, string> = {
  header: "Cabeçalho",
  hero: "Topo",
  oferta: "Oferta",
  fechamento: "Fechamento",
  offer: "Tela de oferta do quiz",
};

export const QUESTION_LABELS: Record<string, string> = {
  desejo: "Pergunta 1 · Qual frase parece com você",
  motivacao: "Pergunta 2 · O que mais atrai",
  obstaculo: "Pergunta 3 · O que mais trava",
  tempo: "Pergunta 4 · Tempo por semana",
  urgencia: "Pergunta 5 · Prazo pros R$10 mil",
};
