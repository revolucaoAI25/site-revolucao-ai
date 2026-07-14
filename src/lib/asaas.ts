/**
 * Cliente mínimo pra API do Asaas (assinaturas do Lead Extractor). Usa
 * ASAAS_API_KEY/ASAAS_ENV do servidor — nunca expor essa chave ao navegador.
 */

export type Plano = "mensal" | "anual";
export const PLANOS: Plano[] = ["mensal", "anual"];

const MENSAL_VALUE = 497.9;
const ANUAL_VALUE_MES = 337;
const ANUAL_PARCELAS = 12;

function baseUrl() {
  return process.env.ASAAS_ENV === "sandbox"
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";
}

async function asaasFetch(path: string, init: RequestInit = {}) {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey,
      "User-Agent": "revolucao-ai-lead-extractor",
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

/** Reaproveita o cliente existente pelo CPF/CNPJ, ou cria um novo. */
export async function findOrCreateCustomer(input: {
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
}): Promise<string> {
  const existing = await asaasFetch(
    `/customers?cpfCnpj=${encodeURIComponent(input.cpfCnpj)}`
  );
  if (existing?.data?.length > 0) {
    return existing.data[0].id as string;
  }

  const created = await asaasFetch("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      cpfCnpj: input.cpfCnpj,
      mobilePhone: input.phone,
    }),
  });
  return created.id as string;
}

/**
 * Plano mensal: assinatura recorrente de verdade, sem fidelidade — cada
 * mês é uma cobrança independente (cartão, boleto ou Pix, à escolha de
 * quem assina) e cancela quando quiser.
 */
async function createMensalCheckout(customerId: string): Promise<string> {
  const subscription = await asaasFetch("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: customerId,
      billingType: "UNDEFINED",
      value: MENSAL_VALUE,
      cycle: "MONTHLY",
      nextDueDate: isoDatePlusDays(1),
      description: "Lead Extractor — Plano Mensal",
    }),
  });

  const payments = await asaasFetch(`/payments?subscription=${subscription.id}`);
  const invoiceUrl = payments?.data?.[0]?.invoiceUrl;
  if (!invoiceUrl) {
    throw new Error("Não foi possível gerar o link de pagamento da assinatura");
  }
  return invoiceUrl as string;
}

/**
 * Plano anual: NÃO é assinatura recorrente — é uma cobrança única do valor
 * cheio (R$4.044), parcelada em 12x no cartão de crédito. O parcelamento no
 * cartão é autorizado de uma vez só pela operadora (é a própria operadora
 * que divide as parcelas na fatura de quem assinou); diferente de uma
 * assinatura mês a mês, a pessoa não consegue simplesmente trocar de
 * cartão ou deixar de pagar uma parcela no meio do caminho pra escapar do
 * compromisso. Por isso o billingType é travado em CREDIT_CARD (sem
 * boleto/Pix parcelado, que aí sim teria esse risco).
 */
async function createAnualCheckout(customerId: string): Promise<string> {
  const totalValue = ANUAL_VALUE_MES * ANUAL_PARCELAS;

  const payment = await asaasFetch("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: customerId,
      billingType: "CREDIT_CARD",
      totalValue,
      installmentCount: ANUAL_PARCELAS,
      dueDate: isoDatePlusDays(1),
      description: `Lead Extractor — Plano Anual (${ANUAL_PARCELAS}x de ${ANUAL_VALUE_MES.toFixed(2)})`,
    }),
  });

  const invoiceUrl = payment?.invoiceUrl;
  if (!invoiceUrl) {
    throw new Error("Não foi possível gerar o link de pagamento parcelado");
  }
  return invoiceUrl as string;
}

/**
 * Cria a cobrança no Asaas e retorna a URL da fatura (invoiceUrl) — é pra
 * lá que o navegador é redirecionado, pra concluir o pagamento direto no
 * Asaas, sem a gente tocar em dado de cartão.
 */
export async function createCheckout(plano: Plano, customerId: string): Promise<string> {
  return plano === "anual"
    ? createAnualCheckout(customerId)
    : createMensalCheckout(customerId);
}
