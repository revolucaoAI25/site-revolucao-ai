/**
 * Cliente mínimo pra API do Asaas (assinaturas do Lead Extractor). Usa
 * ASAAS_API_KEY/ASAAS_ENV do servidor — nunca expor essa chave ao navegador.
 */

export type Plano = "mensal" | "anual";

export const ASAAS_PLANOS: Record<
  Plano,
  { value: number; description: string; cicloMeses: number | null }
> = {
  mensal: {
    value: 497.9,
    description: "Lead Extractor — Plano Mensal",
    cicloMeses: null,
  },
  anual: {
    value: 337,
    description: "Lead Extractor — Plano Anual (fidelidade de 12 meses)",
    cicloMeses: 12,
  },
};

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

function isoDatePlusMonths(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
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
 * Cria a assinatura no Asaas e retorna a URL da fatura (invoiceUrl) da
 * primeira cobrança — é pra lá que o navegador é redirecionado, pra
 * concluir o pagamento (cartão, boleto ou Pix) direto no Asaas, sem a
 * gente tocar em dado de cartão.
 */
export async function createSubscriptionCheckout(
  plano: Plano,
  customerId: string
): Promise<string> {
  const config = ASAAS_PLANOS[plano];

  const subscription = await asaasFetch("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: customerId,
      billingType: "UNDEFINED",
      value: config.value,
      cycle: "MONTHLY",
      nextDueDate: isoDatePlusDays(1),
      description: config.description,
      ...(config.cicloMeses
        ? { endDate: isoDatePlusMonths(config.cicloMeses) }
        : {}),
    }),
  });

  const payments = await asaasFetch(`/payments?subscription=${subscription.id}`);
  const invoiceUrl = payments?.data?.[0]?.invoiceUrl;
  if (!invoiceUrl) {
    throw new Error("Não foi possível gerar o link de pagamento da assinatura");
  }
  return invoiceUrl as string;
}
