import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCustomer } from "@/lib/asaas";
import {
  PLANOS,
  createFeeCheckout,
  createSubscriptionCheckout,
  type Plano,
} from "@/lib/asaas-plataforma";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type Payload = {
  plano?: string;
  agentePronto?: boolean;
  nome?: string;
  email?: string;
  cpfCnpj?: string;
  telefone?: string;
};

type CheckoutLead = {
  plano: Plano;
  agentePronto: boolean;
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * Registra a tentativa de assinatura assim que a pessoa envia o
 * formulário — antes de saber se ela vai concluir o(s) pagamento(s) —
 * pra não perder o lead caso abandone o checkout (ou, no caso do Agente
 * Pronto, pague a taxa e abandone antes da assinatura).
 */
async function registerCheckoutStarted(lead: CheckoutLead): Promise<string | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("plataforma_checkouts")
    .insert({
      plano: lead.plano,
      agente_pronto: lead.agentePronto,
      nome: lead.nome,
      email: lead.email,
      cpf_cnpj: lead.cpfCnpj,
      telefone: lead.telefone,
      status: "iniciado",
      stage: "iniciou-checkout",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[plataforma-subscription] Falha ao salvar no Supabase:", error);
    return null;
  }
  return data.id as string;
}

/** Dispara e esquece — falha aqui não deve travar o checkout. */
async function forwardCheckoutStarted(lead: CheckoutLead) {
  const url = process.env.ASAAS_CHECKOUT_STARTED_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "PLATAFORMA_CHECKOUT_STARTED", ...lead }),
    });
  } catch (error) {
    console.error("[plataforma-subscription] Falha ao encaminhar webhook:", error);
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.ASAAS_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Checkout indisponível no momento — fala com a gente pelo WhatsApp pra assinar.",
      },
      { status: 503 }
    );
  }

  const body = (await req.json().catch(() => null)) as Payload | null;
  const plano = body?.plano as Plano | undefined;
  const agentePronto = body?.agentePronto === true;
  const nome = body?.nome?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const cpfCnpj = onlyDigits(body?.cpfCnpj ?? "");
  const telefone = onlyDigits(body?.telefone ?? "");

  if (!plano || !PLANOS.includes(plano)) {
    return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
  }
  if (
    nome.length < 3 ||
    !email.includes("@") ||
    ![11, 14].includes(cpfCnpj.length) ||
    telefone.length < 10
  ) {
    return NextResponse.json(
      { error: "Confira os dados preenchidos e tente de novo." },
      { status: 400 }
    );
  }

  const lead: CheckoutLead = { plano, agentePronto, nome, email, cpfCnpj, telefone };
  const checkoutRecordId = await registerCheckoutStarted(lead);
  await forwardCheckoutStarted(lead);

  try {
    const customerId = await findOrCreateCustomer({
      name: nome,
      email,
      cpfCnpj,
      phone: telefone,
    });

    const supabase = getSupabaseServerClient();
    if (supabase && checkoutRecordId) {
      await supabase
        .from("plataforma_checkouts")
        .update({ asaas_customer_id: customerId })
        .eq("id", checkoutRecordId);
    }

    if (!checkoutRecordId) {
      throw new Error("Não foi possível registrar o checkout — tenta de novo.");
    }

    const checkoutUrl = agentePronto
      ? await createFeeCheckout(checkoutRecordId, plano, customerId, req.nextUrl.origin)
      : await createSubscriptionCheckout(
          checkoutRecordId,
          plano,
          false,
          customerId,
          req.nextUrl.origin
        );

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("[plataforma-subscription] Falha ao criar checkout:", error);
    const message =
      error instanceof Error ? error.message : "Erro ao processar assinatura";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
