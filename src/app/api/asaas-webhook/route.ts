import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { createLeadExtractorUser, generateLeadExtractorPassword } from "@/lib/lead-extractor-api";

/**
 * Eventos que indicam que o pagamento entrou de fato — é o gatilho pra
 * avisar o time liberar o acesso do cliente. Os demais eventos (fatura
 * criada, vencida, etc.) só recebem 200 sem encaminhar nada.
 */
const RELEVANT_EVENTS = new Set(["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"]);

function baseUrl() {
  return process.env.ASAAS_ENV === "sandbox"
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";
}

async function fetchCustomer(customerId: string) {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(`${baseUrl()}/customers/${customerId}`, {
      headers: { access_token: apiKey },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

type CheckoutRecord = {
  id: string;
  plano: string;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
  status: string;
  lead_extractor_user_id: string | null;
};

type PlataformaRecord = {
  id: string;
  plano: string;
  agente_pronto: boolean;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
  status: string;
};

/** Busca o registro salvo em /api/asaas-subscription no momento do checkout. */
async function findCheckoutRecord(customerId: string): Promise<CheckoutRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("asaas_checkouts")
    .select("id, plano, nome, email, cpf_cnpj, telefone, status, lead_extractor_user_id")
    .eq("asaas_customer_id", customerId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[asaas-webhook] Falha ao buscar registro no Supabase:", error);
    return null;
  }
  return data;
}

/** Mesma ideia acima, pro produto /plataforma (ver /api/plataforma-subscription). */
async function findPlataformaRecord(customerId: string): Promise<PlataformaRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("plataforma_checkouts")
    .select("id, plano, agente_pronto, nome, email, cpf_cnpj, telefone, status")
    .eq("asaas_customer_id", customerId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[asaas-webhook] Falha ao buscar registro (plataforma) no Supabase:", error);
    return null;
  }
  return data;
}

/** Marca o cliente como confirmado/ativo no Supabase (asaas_checkouts). */
async function markCheckoutConfirmed(recordId: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("asaas_checkouts")
    .update({
      status: "confirmado",
      confirmed_at: new Date().toISOString(),
      stage: "confirmado",
    })
    .eq("id", recordId);

  if (error) {
    console.error("[asaas-webhook] Falha ao atualizar status no Supabase:", error);
  }
}

/** Marca só a taxa de implementação (Agente Pronto) como paga — ainda não
 * é a assinatura confirmada, então o `stage` no kanban continua o mesmo. */
async function markPlataformaFeeConfirmed(recordId: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("plataforma_checkouts")
    .update({ status: "taxa_confirmada" })
    .eq("id", recordId);

  if (error) {
    console.error("[asaas-webhook] Falha ao atualizar taxa (plataforma) no Supabase:", error);
  }
}

/** Marca a assinatura da /plataforma como confirmada/ativa. */
async function markPlataformaConfirmed(recordId: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("plataforma_checkouts")
    .update({
      status: "confirmado",
      confirmed_at: new Date().toISOString(),
      stage: "confirmado",
    })
    .eq("id", recordId);

  if (error) {
    console.error("[asaas-webhook] Falha ao atualizar status (plataforma) no Supabase:", error);
  }
}

/**
 * Cria automaticamente a conta do cliente na plataforma Lead Extractor
 * (ver src/lib/lead-extractor-api.ts) assim que a assinatura é confirmada,
 * e salva o login gerado no Supabase pra página de obrigado exibir. Só
 * roda uma vez por checkout — se já tiver `lead_extractor_user_id`, o
 * provisionamento já aconteceu (proteção extra além da checagem de
 * `status !== "confirmado"` já feita antes de chamar esta função).
 */
async function provisionLeadExtractorAccount(record: CheckoutRecord) {
  if (record.lead_extractor_user_id) return;

  const password = generateLeadExtractorPassword(record.nome);
  const result = await createLeadExtractorUser({
    email: record.email,
    password,
    instagramVisible: record.plano === "anual",
  });
  if (!result) return;

  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("asaas_checkouts")
    .update({ lead_extractor_user_id: result.userId, lead_extractor_password: password })
    .eq("id", record.id);

  if (error) {
    console.error("[asaas-webhook] Falha ao salvar credenciais do Lead Extractor:", error);
  }
}

/**
 * Encaminha eventos da /plataforma pro webhook do time. `subscriptionPaid`
 * distingue a cobrança recorrente (assinatura, sinal de liberar acesso) da
 * cobrança única da taxa de implementação (só um aviso, não libera nada).
 */
async function forwardPlataformaPaymentConfirmed(
  payment: Record<string, unknown>,
  record: PlataformaRecord,
  subscriptionPaid: boolean
) {
  const forwardUrl = process.env.ASAAS_WEBHOOK_FORWARD_URL;
  if (!forwardUrl) return;

  try {
    await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: subscriptionPaid ? "PLATAFORMA_ASSINATURA_CONFIRMADA" : "PLATAFORMA_TAXA_CONFIRMADA",
        payment: {
          id: payment.id,
          value: payment.value,
          billingType: payment.billingType,
          subscription: payment.subscription,
        },
        lead: {
          plano: record.plano,
          agentePronto: record.agente_pronto,
          nome: record.nome,
          email: record.email,
          cpfCnpj: record.cpf_cnpj,
          telefone: record.telefone,
        },
      }),
    });
  } catch (error) {
    console.error("[asaas-webhook] Falha ao encaminhar webhook (plataforma):", error);
  }
}

/**
 * Encaminha a confirmação de pagamento pro webhook do time (Make.com/etc),
 * com todos os dados do lead que a gente já tem — incluindo o plano
 * escolhido — pra quem receber conseguir liberar o acesso sem precisar
 * abrir o painel do Asaas.
 */
async function forwardPaymentConfirmed(
  event: string,
  payment: Record<string, unknown>,
  record: CheckoutRecord | null
) {
  const forwardUrl = process.env.ASAAS_WEBHOOK_FORWARD_URL;
  if (!forwardUrl) return;

  // Sem registro no Supabase (ou Supabase não configurado), cai pra buscar
  // nome/e-mail/telefone direto no Asaas — só não dá pra saber o plano
  // nesse caso, já que isso não fica salvo lá.
  const customer = record ?? (await fetchCustomer(payment.customer as string));

  try {
    await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        payment: {
          id: payment.id,
          value: payment.value,
          billingType: payment.billingType,
          subscription: payment.subscription,
        },
        lead: record
          ? {
              plano: record.plano,
              nome: record.nome,
              email: record.email,
              cpfCnpj: record.cpf_cnpj,
              telefone: record.telefone,
            }
          : customer
            ? {
                plano: null,
                nome: customer.name,
                email: customer.email,
                cpfCnpj: customer.cpfCnpj,
                telefone: customer.mobilePhone,
              }
            : { plano: null, asaasCustomerId: payment.customer },
      }),
    });
  } catch (error) {
    console.error("[asaas-webhook] Falha ao encaminhar webhook:", error);
  }
}

export async function POST(req: NextRequest) {
  const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;
  if (expectedToken) {
    const receivedToken = req.headers.get("asaas-access-token");
    if (receivedToken !== expectedToken) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const body = await req.json().catch(() => null);
  const event = body?.event as string | undefined;
  const payment = body?.payment as Record<string, unknown> | undefined;

  if (event && RELEVANT_EVENTS.has(event) && payment?.customer) {
    const plataformaRecord = await findPlataformaRecord(payment.customer as string);

    if (plataformaRecord && plataformaRecord.status !== "confirmado") {
      // Cobrança recorrente (assinatura) traz `subscription`; a taxa única
      // de implementação (DETACHED) não — é assim que distinguimos qual
      // das duas etapas do checkout encadeado esse evento confirma.
      const subscriptionPaid = !!payment.subscription;

      if (subscriptionPaid) {
        await markPlataformaConfirmed(plataformaRecord.id);
        await forwardPlataformaPaymentConfirmed(payment, plataformaRecord, true);
      } else if (plataformaRecord.status === "iniciado") {
        await markPlataformaFeeConfirmed(plataformaRecord.id);
        await forwardPlataformaPaymentConfirmed(payment, plataformaRecord, false);
      }
    } else if (!plataformaRecord) {
      const record = await findCheckoutRecord(payment.customer as string);

      // Idempotência: se já processamos essa confirmação antes (o Asaas
      // pode reenviar o mesmo evento), não atualiza nem encaminha de novo.
      if (!record || record.status !== "confirmado") {
        if (record) {
          await markCheckoutConfirmed(record.id);
          await provisionLeadExtractorAccount(record);
        }
        await forwardPaymentConfirmed(event, payment, record);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
