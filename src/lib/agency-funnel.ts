/**
 * Funil de conversa da agência (/apresentacao): perguntas, regras de
 * qualificação e estágios do kanban. Arquivo compartilhado entre a página
 * (navegador), as rotas de API (servidor) e o painel /admin/agencia, pra
 * a regra de "quem vai pra onde" existir num lugar só.
 */

import { CALENDLY_AGENTE_LINK, OUTRO_PRODUTO_LINK, WHATSAPP_LINK } from "./links";

export const AGENCY_PAGE = "apresentacao" as const;

/** Pra onde cada faixa de volume de leads leva no final da conversa. */
export type AgencyDestination = "plataforma" | "whatsapp" | "agendar";

export const VOLUME_OPTIONS = [
  { key: "nenhum", label: "Nenhum", destination: "plataforma", qualified: false },
  { key: "ate-50", label: "De 1 a 50 leads", destination: "whatsapp", qualified: false },
  { key: "51-300", label: "De 51 a 300 leads", destination: "agendar", qualified: true },
  { key: "300-mais", label: "Mais de 300 leads", destination: "agendar", qualified: true },
] as const satisfies readonly {
  key: string;
  label: string;
  destination: AgencyDestination;
  qualified: boolean;
}[];

export type VolumeKey = (typeof VOLUME_OPTIONS)[number]["key"];

export function findVolumeOption(label: string | null | undefined) {
  return VOLUME_OPTIONS.find((o) => o.label === label) ?? null;
}

export const DESTINATION_CTA: Record<
  AgencyDestination,
  { label: string; href: string }
> = {
  agendar: { label: "Agendar minha apresentação", href: CALENDLY_AGENTE_LINK },
  whatsapp: { label: "Falar no WhatsApp", href: WHATSAPP_LINK },
  plataforma: { label: "Conhecer a Plataforma", href: OUTRO_PRODUTO_LINK },
};

export type ChatStep = {
  id: string;
  messages: string[];
  inputType: "hook" | "text" | "buttons";
  /** Nome do campo salvo no lead. */
  variable?: "nome" | "area_atuacao" | "problema" | "volume_leads" | "whatsapp" | "instagram";
  options?: string[];
};

/** `{nome}` nas mensagens é trocado pelo nome que a pessoa informou. */
export const CHAT_STEPS: ChatStep[] = [
  {
    id: "hook_intro",
    messages: [
      "Vou te mostrar como gerar de 40 a 100 novas consultas por mês com um sistema que qualifica e atende seus leads no automático. Sem precisar de equipe extra.",
    ],
    inputType: "hook",
  },
  {
    id: "hook_proof",
    messages: ["Nossos sistemas já atendem mais de 25.000 leads todos os meses para +100 empresas."],
    inputType: "hook",
  },
  {
    id: "hook_case_medico",
    messages: [
      "💆 Uma clínica de estética gerou 71 consultas no primeiro mês de IA, com conversão constante acima de 25%.",
      "👨‍⚕️ Outro médico recebe 80 leads por semana e hoje a IA agenda 20 novos pacientes por semana (antes eram 5), com faturamento na casa dos R$ 200.000. 🚀",
      "Com mais consistência e previsibilidade na operação.",
    ],
    inputType: "hook",
  },
  {
    id: "nome",
    messages: ["Esse resultado é possível para sua clínica também. Qual seu nome?"],
    inputType: "text",
    variable: "nome",
  },
  {
    id: "area_atuacao",
    messages: ["Prazer, {nome}! Em qual área você atua?"],
    inputType: "text",
    variable: "area_atuacao",
  },
  {
    id: "problema",
    messages: ["O que mais trava o seu comercial hoje, {nome}?"],
    inputType: "buttons",
    variable: "problema",
    options: ["Demora no atendimento", "Falta de follow-up", "Time não dá conta", "Leads desqualificados"],
  },
  {
    id: "hook_pilares",
    messages: [
      "Nossa solução trabalha com 3 pilares centrais visando performance comercial:",
      "1️⃣ Agente de IA para atendimento e vendas: eficiência, escala e mais conversão de leads.",
      "2️⃣ Infraestrutura tecnológica: CRM interno, central de mensagens e dashboard com dados reais da operação.",
      "3️⃣ Inteligência Comercial: funis estratégicos e scripts otimizados com técnicas de vendas para máxima performance.",
    ],
    inputType: "hook",
  },
  {
    id: "volume_leads",
    messages: ["Quantos leads você recebe por mês em média?"],
    inputType: "buttons",
    variable: "volume_leads",
    options: VOLUME_OPTIONS.map((o) => o.label),
  },
  {
    id: "whatsapp",
    messages: ["Pra eu te mostrar algo mais personalizado, me passa seu WhatsApp:"],
    inputType: "text",
    variable: "whatsapp",
  },
  {
    id: "instagram",
    messages: ["Qual o @ da sua empresa no Instagram?"],
    inputType: "text",
    variable: "instagram",
  },
  {
    id: "hook_benefits",
    messages: [
      "Disponibilidade 24/7, follow-ups automáticos, integração com CRM, WhatsApp e Instagram.",
      "Desenvolvimento e implementação, 100% personalizado para as necessidades da sua operação. ✏️",
    ],
    inputType: "hook",
  },
];

/** Mensagens finais, depois da última pergunta. */
export function finalMessages(nome: string): string[] {
  return [
    `${nome}, você está no perfil ideal para o nosso sistema. 🚀`,
    "Vagas limitadas.",
    "Em 60 minutos vamos te mostrar um sistema que gera resultados todos os dias.",
    "Vamos agendar uma apresentação rápida para mostrar como funciona na prática?",
  ];
}

export type AnswerKind = "nome" | "whatsapp" | "instagram" | "obrigatorio";

/** Mesmas validações (e mensagens) do funil original. Devolve o erro ou null. */
export function validateAnswer(value: string, kind: AnswerKind): string | null {
  const v = value.trim();
  if (!v) return "Por favor, preencha esse campo.";
  if (kind === "nome" && v.length < 2) return "Digite seu nome completo.";
  if (kind === "whatsapp") {
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) return "Digite um WhatsApp válido com DDD.";
  }
  if (kind === "instagram" && v.replace(/^@/, "").length < 2) return "Digite o @ da sua empresa.";
  if (kind === "obrigatorio" && v.length < 2) return "Escreva uma resposta válida.";
  return null;
}

/** Ids dos eventos do Meta — iguais no navegador e no servidor, pra contar uma vez só. */
export const leadEventId = (leadId: string) => `lead-${leadId}`;
export const scheduleEventId = (leadId: string) => `schedule-${leadId}`;

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

// ---------------------------------------------------------------------------
// Kanban (/admin/agencia)
// ---------------------------------------------------------------------------

export const AGENCY_STAGES = [
  { stage: "iniciou", label: "Em conversa", hint: "Começou o chat, ainda sem faixa de leads" },
  { stage: "qualificado", label: "Qualificado", hint: "Mais de 50 leads por mês, ainda sem agendar" },
  { stage: "agendou", label: "Agendou", hint: "Marcou horário na agenda" },
  { stage: "nao-agendou", label: "Não agendou", hint: "Qualificado que não marcou (ou cancelou)" },
  { stage: "whatsapp", label: "Foi pro WhatsApp", hint: "De 1 a 50 leads por mês" },
  { stage: "plataforma", label: "Foi pra Plataforma", hint: "Ainda não recebe leads" },
] as const;

export type AgencyStage = (typeof AGENCY_STAGES)[number]["stage"];

export const AGENCY_STAGE_SET: ReadonlySet<string> = new Set(AGENCY_STAGES.map((s) => s.stage));

export function stageForDestination(destination: AgencyDestination): AgencyStage {
  return destination === "agendar" ? "qualificado" : destination;
}

export type AgencyLeadRow = {
  id: string;
  created_at: string;
  updated_at: string;
  nome: string | null;
  area_atuacao: string | null;
  problema: string | null;
  volume_leads: string | null;
  volume_faixa: string | null;
  qualified: boolean;
  destination: string | null;
  whatsapp: string | null;
  instagram: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  device: string | null;
  in_app: string | null;
  session_id: string | null;
  last_step: string | null;
  etapa_funil: string;
  status: string;
  stage: string;
  final_at: string | null;
  cta_clicked_at: string | null;
  calendly_opened_at: string | null;
  scheduled_at: string | null;
  canceled_at: string | null;
};
