/**
 * PLACEHOLDER — fluxos de qualificação do pop-up.
 *
 * As perguntas, opções e caminhos abaixo são um placeholder funcional para o
 * site ir ao ar com o pop-up já operando. Assim que o Revolução AI enviar o
 * fluxo real (perguntas + para onde cada resposta deve levar — WhatsApp,
 * link de agendamento, checkout do curso, etc.), substituir os objetos
 * `agentesFlow` e `formacaoFlow` abaixo. A estrutura (steps/options/result)
 * não precisa mudar, só o conteúdo.
 */

import {
  WHATSAPP_LINK as PLACEHOLDER_WHATSAPP,
  CURSO_LINK,
  AGENDAR_CONVERSA_LINK,
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
  startStepId: "tipo-negocio",
  steps: {
    "tipo-negocio": {
      id: "tipo-negocio",
      question: "Qual desses descreve melhor o seu negócio hoje?",
      options: [
        { label: "Escritório de advocacia", next: "volume-leads" },
        { label: "Clínica, estética ou odontologia", next: "volume-leads" },
        { label: "Outro tipo de negócio", next: "volume-leads" },
      ],
    },
    "volume-leads": {
      id: "volume-leads",
      question: "Quantos leads sua operação recebe, em média, por mês?",
      options: [
        { label: "Menos de 100", next: "result:volume-baixo" },
        { label: "Entre 100 e 500", next: "result:volume-medio" },
        { label: "Mais de 500", next: "result:volume-alto" },
      ],
    },
  },
  results: {
    "volume-baixo": {
      kind: "result",
      title: "Ainda vale a pena falar com a gente.",
      description:
        "Com menos de 100 leads/mês, o primeiro passo costuma ser diagnosticar o funil antes de qualquer implementação. Vamos entender seu cenário em uma conversa rápida.",
      cta: { label: "Falar no WhatsApp", href: PLACEHOLDER_WHATSAPP },
    },
    "volume-medio": {
      kind: "result",
      title: "Seu volume tem espaço real de ganho com IA.",
      description:
        "Com esse volume de leads, é comum recuperar entre 20% e 25% em agendamentos que hoje ficam pelo caminho. Vamos falar sobre o seu funil.",
      cta: { label: "Falar no WhatsApp", href: PLACEHOLDER_WHATSAPP },
    },
    "volume-alto": {
      kind: "result",
      title: "Esse é exatamente o cenário onde o agente de IA mais entrega.",
      description:
        "Com mais de 500 leads/mês, cada minuto de demora custa caro. Vamos entender sua operação e desenhar a implementação.",
      cta: { label: "Falar no WhatsApp", href: PLACEHOLDER_WHATSAPP },
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
