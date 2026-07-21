/**
 * Cliente mínimo pra API do Asaas (assinaturas do Lead Extractor). Usa
 * ASAAS_API_KEY/ASAAS_ENV do servidor — nunca expor essa chave ao navegador.
 */

export type Plano = "mensal" | "anual";
export const PLANOS: Plano[] = ["mensal", "anual"];

const MENSAL_VALUE = 497.9;
const ANUAL_VALUE_MES = 337;
const ANUAL_PARCELAS = 12;

function isSandbox() {
  return process.env.ASAAS_ENV === "sandbox";
}

function apiBaseUrl() {
  return isSandbox() ? "https://api-sandbox.asaas.com/v3" : "https://api.asaas.com/v3";
}

/** Domínio (não-API) onde a fatura/checkout hospedado do Asaas é exibido. */
function checkoutBaseUrl() {
  return isSandbox() ? "https://sandbox.asaas.com" : "https://asaas.com";
}

async function asaasFetch(path: string, init: RequestInit = {}) {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

  const res = await fetch(`${apiBaseUrl()}${path}`, {
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
 * Cria o checkout hospedado no Asaas (`/v3/checkouts`) e devolve a URL final
 * pra onde o navegador é redirecionado. Esse é o produto do Asaas que
 * suporta `callback.successUrl` — assim que a pessoa termina de fato a
 * cobrança, o próprio Asaas manda ela de volta pra uma página nossa, sem
 * a gente precisar ficar só no webhook assíncrono pra dar esse retorno.
 *
 * - **Mensal**: `chargeTypes: ["RECURRENT"]` — assinatura recorrente de
 *   verdade, sem data de fim, cancela quando quiser. Travada em
 *   `billingTypes: ["CREDIT_CARD"]` porque o Asaas só aceita cartão pra
 *   cobrança recorrente automática — boleto e Pix são cobranças avulsas,
 *   não haveria como recobrar sozinho no ciclo seguinte.
 * - **Anual**: `chargeTypes: ["INSTALLMENT"]` — cobrança única do valor
 *   cheio parcelada em até 12x, travada em `billingTypes: ["CREDIT_CARD"]`.
 *   O parcelamento no cartão é autorizado de uma vez só pela operadora, então
 *   quem assina não consegue escapar do compromisso trocando de cartão ou
 *   deixando de pagar uma parcela no meio do caminho (risco real de boleto/Pix
 *   "parcelado", que são cobranças independentes a cada mês).
 */
export async function createCheckout(
  checkoutId: string | null,
  plano: Plano,
  customerId: string,
  origin: string
): Promise<string> {
  const successUrl = checkoutId
    ? `${origin}/lead-extractor/assinar/obrigado?checkoutId=${checkoutId}&plano=${plano}`
    : `${origin}/lead-extractor/assinar/obrigado?plano=${plano}`;
  const callback = {
    successUrl,
    cancelUrl: `${origin}/lead-extractor/assinar?plano=${plano}`,
    expiredUrl: `${origin}/lead-extractor/assinar?plano=${plano}`,
  };

  const body =
    plano === "anual"
      ? {
          customer: customerId,
          billingTypes: ["CREDIT_CARD"],
          chargeTypes: ["INSTALLMENT"],
          minutesToExpire: 1440,
          installment: { maxInstallmentCount: ANUAL_PARCELAS },
          callback,
          items: [
            {
              name: "Lead Extractor — Plano Anual",
              description: `Parcelado em até ${ANUAL_PARCELAS}x de ${ANUAL_VALUE_MES.toFixed(2)}`,
              quantity: 1,
              value: ANUAL_VALUE_MES * ANUAL_PARCELAS,
            },
          ],
        }
      : {
          customer: customerId,
          billingTypes: ["CREDIT_CARD"],
          chargeTypes: ["RECURRENT"],
          minutesToExpire: 1440,
          callback,
          items: [
            {
              name: "Lead Extractor — Plano Mensal",
              quantity: 1,
              value: MENSAL_VALUE,
            },
          ],
          subscription: {
            cycle: "MONTHLY",
            nextDueDate: isoDatePlusDays(1),
          },
        };

  const checkout = await asaasFetch("/checkouts", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!checkout?.id) {
    throw new Error("Não foi possível gerar o link de pagamento");
  }
  return `${checkoutBaseUrl()}/checkoutSession/show?id=${checkout.id}`;
}
