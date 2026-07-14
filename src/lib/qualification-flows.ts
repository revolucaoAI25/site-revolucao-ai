/**
 * Fluxo de qualificação do pop-up.
 *
 * `agentesFlow` e `formacaoFlow` refletem a lógica real de qualificação
 * combinada com o cliente.
 */

import {
  CALENDLY_AGENTE_LINK,
  CALENDLY_FORMACAO_LINK,
  LEAD_EXTRACTOR_LINK,
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
  /** "contact" pede nome, e-mail e telefone em vez de mostrar opções. */
  kind?: "options" | "contact";
  options: FlowOption[];
  /** Usado só quando `kind` é "contact": pra onde ir depois do envio. */
  next?: string;
};

export type QualificationFlow = {
  id: FlowId;
  title: string;
  startStepId: string;
  steps: Record<string, FlowStep>;
  results: Record<string, FlowResult>;
};

const CONTATO_HELPER = "Seu nome, e-mail e WhatsApp — só isso.";

export const agentesFlow: QualificationFlow = {
  id: "agentes",
  title: "Quero implementar IA no meu negócio",
  startStepId: "volume-leads",
  steps: {
    "volume-leads": {
      id: "volume-leads",
      question: "Você já recebe leads pelo WhatsApp atualmente?",
      options: [
        { label: "Recebo de 10 a 100 leads por mês", next: "orcamento" },
        { label: "Recebo de 100 a 500 leads por mês", next: "contato-agendar" },
        { label: "Recebo mais de 500 leads por mês", next: "contato-agendar" },
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
          next: "contato-extracao",
        },
      ],
    },
    orcamento: {
      id: "orcamento",
      question: "Quanto você está disposto a investir, no total, pra ter essa solução implementada?",
      helper: "Valor total da implementação — não é uma mensalidade.",
      options: [
        { label: "Até R$1.000", next: "contato-outro-produto" },
        { label: "De R$1.000 a R$2.000", next: "contato-outro-produto" },
        { label: "De R$2.000 a R$5.000", next: "contato-agendar" },
        { label: "De R$5.000 a R$10.000", next: "contato-agendar" },
        { label: "De R$10.000 a R$20.000", next: "contato-agendar" },
        {
          label: "O necessário pra resolver meu problema e ter resultado",
          next: "contato-agendar",
        },
      ],
    },
    "contato-agendar": {
      id: "contato-agendar",
      question: "Antes de continuar, só precisamos de algumas informações.",
      helper: CONTATO_HELPER,
      kind: "contact",
      options: [],
      next: "result:agendar",
    },
    "contato-outro-produto": {
      id: "contato-outro-produto",
      question: "Antes de continuar, só precisamos de algumas informações.",
      helper: CONTATO_HELPER,
      kind: "contact",
      options: [],
      next: "result:outro-produto",
    },
    "contato-extracao": {
      id: "contato-extracao",
      question: "Antes de continuar, só precisamos de algumas informações.",
      helper: CONTATO_HELPER,
      kind: "contact",
      options: [],
      next: "result:ferramenta-extracao",
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
      title: "Temos a solução perfeita pro seu momento agora.",
      description:
        "Você vai conhecer nossa ferramenta de construção de agentes de IA e como funciona nossa implementação completa — a gente te mostra qual desses caminhos faz mais sentido pra você.",
      cta: { label: "Conhecer as opções", href: OUTRO_PRODUTO_LINK },
    },
    "ferramenta-extracao": {
      kind: "result",
      title: "O que você precisa é da nossa ferramenta de extração de leads.",
      description:
        "Pra quem só precisa montar uma base de contatos pra prospectar, sem o agente de IA completo, temos uma ferramenta específica pra isso.",
      cta: { label: "Conhecer a ferramenta", href: LEAD_EXTRACTOR_LINK },
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
      question: "Quanto você tem disponível pra investir na sua formação agora?",
      options: [
        { label: "Nada, não consigo investir agora", next: "contato-gratuito" },
        { label: "Até R$500", next: "contato-low-ticket" },
        { label: "De R$500 a R$2.000", next: "contato-low-ticket" },
        { label: "De R$2.000 a R$5.000", next: "contato-reuniao" },
        { label: "De R$5.000 a R$10.000", next: "contato-reuniao" },
        { label: "De R$10.000 a R$20.000", next: "contato-reuniao" },
        {
          label: "O necessário pra resolver meu problema e ter resultado",
          next: "contato-reuniao",
        },
      ],
    },
    "contato-gratuito": {
      id: "contato-gratuito",
      question: "Antes de continuar, só precisamos de algumas informações.",
      helper: "Preparamos um material gratuito pra te enviar — só seu nome, e-mail e WhatsApp.",
      kind: "contact",
      options: [],
      next: "result:gratuito",
    },
    "contato-low-ticket": {
      id: "contato-low-ticket",
      question: "Antes de continuar, só precisamos de algumas informações.",
      helper: CONTATO_HELPER,
      kind: "contact",
      options: [],
      next: "result:low-ticket",
    },
    "contato-reuniao": {
      id: "contato-reuniao",
      question: "Antes de continuar, só precisamos de algumas informações.",
      helper: CONTATO_HELPER,
      kind: "contact",
      options: [],
      next: "result:reuniao-vendas",
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
      title: "Temos algo perfeito pro seu momento agora.",
      description:
        "Preparamos um conteúdo que já entrega resultado prático pro ponto em que você está hoje. Vamos te mostrar.",
      cta: { label: "Acessar conteúdo", href: PRODUTO_LOW_TICKET_LINK },
    },
    "reuniao-vendas": {
      kind: "result",
      title: "Vamos entender seu momento de perto.",
      description:
        "Pelo que você trouxe até aqui, o ideal é uma conversa direta com o Lucas — pra entender sua operação, seus objetivos, e já sair com um plano de ação pro seu próximo passo. Escolha o melhor horário abaixo.",
      embed: { provider: "calendly", url: CALENDLY_FORMACAO_LINK },
    },
  },
};

export const flows: Record<FlowId, QualificationFlow> = {
  agentes: agentesFlow,
  formacao: formacaoFlow,
};
