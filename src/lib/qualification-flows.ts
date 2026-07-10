/**
 * Fluxo de qualificação do pop-up.
 *
 * `agentesFlow` e `formacaoFlow` refletem a lógica real de qualificação
 * combinada com o cliente.
 */

import {
  CALENDLY_AGENTE_LINK,
  CALENDLY_FORMACAO_LINK,
  FERRAMENTA_EXTRACAO_LINK,
  OUTRO_PRODUTO_LINK,
  PRODUTO_GRATUITO_LINK,
  PRODUTO_LOW_TICKET_LINK,
} from "./links";

export type FlowId = "agentes" | "formacao";

export type FlowResult = {
  kind: "result";
  title: string;
  description: string;
  /** Link de saída (abre em outra aba). Use quando não houver `embed`. */
  cta?: {
    label: string;
    href: string;
  };
  /** Agenda embutida direto no pop-up, sem sair do site. */
  embed?: {
    provider: "calendly";
    url: string;
  };
};

export type FlowOption = {
  label: string;
  next: string; // id of next step, or a result key prefixed with "result:"
};

export type FlowStep = {
  id: string;
  question: string;
  helper?: string;
  options: FlowOption[];
};

export type QualificationFlow = {
  id: FlowId;
  title: string;
  startStepId: string;
  steps: Record<string, FlowStep>;
  results: Record<string, FlowResult>;
};

export const agentesFlow: QualificationFlow = {
  id: "agentes",
  title: "Quero implementar IA no meu negócio",
  startStepId: "volume-leads",
  steps: {
    "volume-leads": {
      id: "volume-leads",
      question: "Você já recebe leads pelo WhatsApp atualmente?",
      options: [
        {
          label: "Não recebo leads, mas tenho tráfego pago rodando",
          next: "orcamento",
        },
        {
          label: "Não recebo leads, mas já tenho uma base de contatos pra disparar",
          next: "orcamento",
        },
        {
          label: "Não recebo leads e preciso de uma base pra prospectar",
          next: "extracao-ou-agente",
        },
        { label: "Recebo de 10 a 100 leads por mês", next: "orcamento" },
        { label: "Recebo de 100 a 500 leads por mês", next: "result:agendar" },
        { label: "Recebo mais de 500 leads por mês", next: "result:agendar" },
      ],
    },
    "extracao-ou-agente": {
      id: "extracao-ou-agente",
      question:
        "Você precisa do agente de IA completo, ou só de uma base de leads pra prospectar?",
      options: [
        { label: "Preciso do agente de IA completo", next: "orcamento" },
        {
          label: "Só preciso de uma base de leads pra prospectar",
          next: "result:ferramenta-extracao",
        },
      ],
    },
    orcamento: {
      id: "orcamento",
      question: "Quanto você está disposto a investir nessa solução?",
      options: [
        { label: "Até R$1.000", next: "result:outro-produto" },
        { label: "De R$1.000 a R$2.000", next: "result:outro-produto" },
        { label: "De R$2.000 a R$5.000", next: "result:agendar" },
        { label: "De R$5.000 a R$10.000", next: "result:agendar" },
        {
          label: "O necessário pra resolver meu problema e ter resultado",
          next: "result:agendar",
        },
      ],
    },
  },
  results: {
    agendar: {
      kind: "result",
      title: "Vamos agendar a apresentação do agente de IA.",
      description:
        "Seu cenário tem espaço real pra ganho com IA. Escolha o melhor horário abaixo e te mostramos como funciona na prática, aplicado ao seu negócio.",
      embed: { provider: "calendly", url: CALENDLY_AGENTE_LINK },
    },
    "outro-produto": {
      kind: "result",
      title: "Temos uma solução mais alinhada ao seu momento agora.",
      description:
        "Pra esse orçamento, faz mais sentido começar por uma oferta diferente da implementação completa. Vamos te mostrar qual.",
      cta: { label: "Conhecer a opção ideal", href: OUTRO_PRODUTO_LINK },
    },
    "ferramenta-extracao": {
      kind: "result",
      title: "O que você precisa é da nossa ferramenta de extração de leads.",
      description:
        "Pra quem só precisa montar uma base de contatos pra prospectar, sem o agente de IA completo, temos uma ferramenta específica pra isso.",
      cta: { label: "Conhecer a ferramenta", href: FERRAMENTA_EXTRACAO_LINK },
    },
  },
};

export const formacaoFlow: QualificationFlow = {
  id: "formacao",
  title: "Quero construir uma agência de IA",
  startStepId: "momento",
  steps: {
    momento: {
      id: "momento",
      question: "Qual o seu momento na operação hoje?",
      options: [
        { label: "Estou começando do zero, ainda não tenho agência", next: "faturamento" },
        { label: "Estou vindo de outra área ou operação", next: "faturamento" },
        { label: "Já tenho uma agência de IA rodando", next: "faturamento" },
      ],
    },
    faturamento: {
      id: "faturamento",
      question: "Qual o seu faturamento atual?",
      options: [
        { label: "Ainda não faturo", next: "investimento" },
        { label: "Até R$5.000/mês", next: "investimento" },
        { label: "De R$5.000 a R$15.000/mês", next: "investimento" },
        { label: "De R$15.000 a R$50.000/mês", next: "investimento" },
        { label: "Acima de R$50.000/mês", next: "investimento" },
      ],
    },
    investimento: {
      id: "investimento",
      question: "Quanto você tem disponível pra investir agora?",
      options: [
        { label: "Nada, não consigo investir agora", next: "result:gratuito" },
        { label: "Até R$500", next: "result:low-ticket" },
        { label: "De R$500 a R$3.000", next: "result:low-ticket" },
        { label: "Acima de R$3.000", next: "result:reuniao-vendas" },
      ],
    },
  },
  results: {
    gratuito: {
      kind: "result",
      title: "Comece por aqui, sem custo.",
      description:
        "Preparamos um material gratuito pra você dar o primeiro passo na construção da sua agência de IA, sem precisar investir agora.",
      cta: { label: "Acessar material gratuito", href: PRODUTO_GRATUITO_LINK },
    },
    "low-ticket": {
      kind: "result",
      title: "Temos uma oferta de entrada ideal pro seu momento.",
      description:
        "Pra esse investimento, o melhor caminho é começar por uma oferta mais enxuta, que já entrega resultado prático antes de qualquer coisa maior.",
      cta: { label: "Conhecer a oferta", href: PRODUTO_LOW_TICKET_LINK },
    },
    "reuniao-vendas": {
      kind: "result",
      title: "Vamos agendar uma reunião de vendas.",
      description:
        "Seu momento e investimento fazem sentido pra construir a agência com a gente. Escolha o melhor horário abaixo pra conversarmos.",
      embed: { provider: "calendly", url: CALENDLY_FORMACAO_LINK },
    },
  },
};

export const flows: Record<FlowId, QualificationFlow> = {
  agentes: agentesFlow,
  formacao: formacaoFlow,
};
