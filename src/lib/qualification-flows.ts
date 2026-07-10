/**
 * Fluxo de qualificação do pop-up.
 *
 * `agentesFlow` reflete a lógica real de qualificação combinada com o
 * cliente. `formacaoFlow` ainda é um placeholder funcional — mexer nele é a
 * próxima etapa.
 */

import {
  CALENDLY_AGENTE_LINK,
  CURSO_LINK,
  AGENDAR_CONVERSA_LINK,
  FERRAMENTA_EXTRACAO_LINK,
  OUTRO_PRODUTO_LINK,
} from "./links";

export type FlowId = "agentes" | "formacao";

export type FlowResult = {
  kind: "result";
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
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
        { label: "Recebo de 0 a 100 leads por mês", next: "orcamento" },
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
        "Seu cenário tem espaço real pra ganho com IA. Escolha o melhor horário e te mostramos como funciona na prática, aplicado ao seu negócio.",
      cta: { label: "Agendar apresentação", href: CALENDLY_AGENTE_LINK },
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
  startStepId: "estagio",
  steps: {
    estagio: {
      id: "estagio",
      question: "Onde você está hoje?",
      options: [
        {
          label: "Estou começando agora, não tenho agência",
          next: "result:comecando",
        },
        {
          label: "Já tenho uma agência ou operação rodando",
          next: "gargalo",
        },
      ],
    },
    gargalo: {
      id: "gargalo",
      question: "Qual o seu maior gargalo hoje?",
      options: [
        { label: "Geração de leads", next: "result:mentoria" },
        { label: "Vendas e fechamento", next: "result:mentoria" },
        { label: "Entrega e operação", next: "result:mentoria" },
      ],
    },
  },
  results: {
    comecando: {
      kind: "result",
      title: "O curso Do 0 aos 10K é o seu caminho.",
      description:
        "Estruturado para quem ainda não tem agência: da oferta ao primeiro contrato fechado, com o mesmo método usado na prática pelo Revolução AI.",
      cta: { label: "Conhecer o curso Do 0 aos 10K", href: CURSO_LINK },
    },
    mentoria: {
      kind: "result",
      title: "A mentoria é o caminho pra escalar com estrutura.",
      description:
        "Pra quem já vende, mas precisa de mais processo, ticket e previsibilidade. Vamos agendar uma conversa pra entender seu gargalo de perto.",
      cta: { label: "Agendar conversa com a gente", href: AGENDAR_CONVERSA_LINK },
    },
  },
};

export const flows: Record<FlowId, QualificationFlow> = {
  agentes: agentesFlow,
  formacao: formacaoFlow,
};
