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

/** Marca o cliente como confirmado/ativo no Supabase (asaas_checkouts). */
async function markCheckoutConfirmed(customerId: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("asaas_checkouts")
    .update({ status: "confirmado", confirmed_at: new Date().toISOString() })
    .eq("asaas_customer_id", customerId)
    .neq("status", "confirmado");

  if (error) {
    console.error("[asaas-webhook] Falha ao atualizar status no Supabase:", error);
  }
}

/**
 * Encaminha a confirmação de pagamento pro webhook do time (Make.com/etc),
 * já enriquecida com nome/e-mail/telefone do cliente, pra quem receber
 * conseguir liberar o acesso sem precisar abrir o painel do Asaas.
 */
async function forwardPaymentConfirmed(event: string, payment: Record<string, unknown>) {
  const forwardUrl = process.env.ASAAS_WEBHOOK_FORWARD_URL;
  if (!forwardUrl) return;

  const customer = payment.customer
    ? await fetchCustomer(payment.customer as string)
    : null;

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
        customer: customer
          ? {
              name: customer.name,
              email: customer.email,
              phone: customer.mobilePhone,
              cpfCnpj: customer.cpfCnpj,
            }
          : { id: payment.customer },
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

  if (event && RELEVANT_EVENTS.has(event) && payment) {
    if (payment.customer) {
      await markCheckoutConfirmed(payment.customer as string);
    }
    await forwardPaymentConfirmed(event, payment);
  }

  return NextResponse.json({ ok: true });
}
