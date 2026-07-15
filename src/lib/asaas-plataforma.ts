/**
 * Cliente Asaas pro produto de entrada "Plataforma" (/plataforma —
 * acesso self-service à Chatflux + add-on opcional Agente Pronto).
 *
 * Diferente do Lead Extractor (um único checkout por assinatura), o
 * caminho "Agente Pronto" precisa de duas cobranças de natureza diferente
 * — uma única (taxa de implementação) e uma recorrente (assinatura) — que
 * o Asaas não deixa combinar num só link de checkout. Por isso são dois
 * checkouts encadeados: paga a taxa primeiro (`createFeeCheckout`), e o
 * `successUrl` dela aponta pra /api/plataforma-subscription/continue, que
 * cria o segundo checkout (`createSubscriptionCheckout`) e redireciona.
 */

const API_BASE_SANDBOX = "https://api-sandbox.asaas.com/v3";
const API_BASE_PROD = "https://api.asaas.com/v3";
const CHECKOUT_BASE_SANDBOX = "https://sandbox.asaas.com";
const CHECKOUT_BASE_PROD = "https://asaas.com";

export type Plano = "start" | "growth" | "scale";
export const PLANOS: Plano[] = ["start", "growth", "scale"];

export const PLANO_INFO: Record<Plano, { label: string; conversas: string; valorMensal: number }> = {
  start: { label: "Start", conversas: "200 conversas/mês", valorMensal: 399 },
  growth: { label: "Growth", conversas: "500 conversas/mês", valorMensal: 699 },
  scale: { label: "Scale", conversas: "1.000 conversas/mês", valorMensal: 999 },
};

/** Taxa única de implementação do add-on Agente Pronto. */
export const TAXA_AGENTE_PRONTO = 1000;

function isSandbox() {
  return process.env.ASAAS_ENV === "sandbox";
}

function apiBaseUrl() {
  return isSandbox() ? API_BASE_SANDBOX : API_BASE_PROD;
}

function checkoutBaseUrl() {
  return isSandbox() ? CHECKOUT_BASE_SANDBOX : CHECKOUT_BASE_PROD;
}

async function asaasFetch(path: string, init: RequestInit = {}) {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

  const res = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey,
      "User-Agent": "revolucao-ai-plataforma",
      ...init.headers,
    },
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message: string =
      data?.errors?.[0]?.description ?? `Asaas respondeu ${res.status}`;
    throw new Error(message);
  }
  return data;
}

function isoDatePlusDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function createCheckoutSession(body: Record<string, unknown>): Promise<string> {
  const checkout = await asaasFetch("/checkouts", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!checkout?.id) {
    throw new Error("Não foi possível gerar o link de pagamento");
  }
  return `${checkoutBaseUrl()}/checkoutSession/show?id=${checkout.id}`;
}

/**
 * Checkout de cobrança única (`DETACHED`) da taxa de implementação do
 * Agente Pronto. `successUrl` aponta pra rota que cria o segundo checkout
 * (a assinatura mensal) — ver /api/plataforma-subscription/continue.
 */
export async function createFeeCheckout(
  checkoutId: string,
  plano: Plano,
  customerId: string,
  origin: string
): Promise<string> {
  return createCheckoutSession({
    customer: customerId,
    billingTypes: ["CREDIT_CARD", "BOLETO", "PIX"],
    chargeTypes: ["DETACHED"],
    minutesToExpire: 1440,
    callback: {
      successUrl: `${origin}/api/plataforma-subscription/continue?checkoutId=${checkoutId}`,
      cancelUrl: `${origin}/plataforma/assinar?plano=${plano}&agentePronto=1`,
      expiredUrl: `${origin}/plataforma/assinar?plano=${plano}&agentePronto=1`,
    },
    items: [
      {
        name: "Plataforma — Taxa de implementação (Agente Pronto)",
        description: "Cobrança única — montagem da primeira versão do seu agente.",
        quantity: 1,
        value: TAXA_AGENTE_PRONTO,
      },
    ],
  });
}

/**
 * Checkout recorrente (`RECURRENT`) da assinatura mensal, por plano.
 * Travado em `billingTypes: ["CREDIT_CARD"]` porque o Asaas só aceita
 * cartão pra cobrança recorrente automática — boleto e Pix são cobranças
 * avulsas, não haveria como recobrar sozinho no ciclo seguinte.
 */
export async function createSubscriptionCheckout(
  checkoutId: string,
  plano: Plano,
  agentePronto: boolean,
  customerId: string,
  origin: string
): Promise<string> {
  const info = PLANO_INFO[plano];
  return createCheckoutSession({
    customer: customerId,
    billingTypes: ["CREDIT_CARD"],
    chargeTypes: ["RECURRENT"],
    minutesToExpire: 1440,
    callback: {
      successUrl: `${origin}/plataforma/assinar/obrigado?checkoutId=${checkoutId}&plano=${plano}&agentePronto=${agentePronto ? "1" : "0"}`,
      cancelUrl: `${origin}/plataforma/assinar?plano=${plano}&agentePronto=${agentePronto ? "1" : "0"}`,
      expiredUrl: `${origin}/plataforma/assinar?plano=${plano}&agentePronto=${agentePronto ? "1" : "0"}`,
    },
    items: [
      {
        name: `Plataforma — Plano ${info.label}`,
        description: info.conversas,
        quantity: 1,
        value: info.valorMensal,
      },
    ],
    subscription: {
      cycle: "MONTHLY",
      nextDueDate: isoDatePlusDays(1),
    },
  });
}
