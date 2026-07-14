import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

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
};

/** Busca o registro salvo em /api/asaas-subscription no momento do checkout. */
async function findCheckoutRecord(customerId: string): Promise<CheckoutRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("asaas_checkouts")
    .select("id, plano, nome, email, cpf_cnpj, telefone, status")
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
    const record = await findCheckoutRecord(payment.customer as string);

    // Idempotência: se já processamos essa confirmação antes (o Asaas pode
    // reenviar o mesmo evento), não atualiza nem encaminha de novo.
    if (!record || record.status !== "confirmado") {
      if (record) await markCheckoutConfirmed(record.id);
      await forwardPaymentConfirmed(event, payment, record);
    }
  }

  return NextResponse.json({ ok: true });
}
