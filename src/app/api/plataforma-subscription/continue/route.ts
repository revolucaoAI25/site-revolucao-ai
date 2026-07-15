import { NextRequest, NextResponse } from "next/server";
import { createSubscriptionCheckout, type Plano } from "@/lib/asaas-plataforma";
import { getSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Segunda etapa do checkout encadeado do Agente Pronto: o Asaas manda o
 * navegador pra cá assim que a taxa única de implementação é paga (ver
 * `callback.successUrl` em `createFeeCheckout`). Aqui a gente cria o
 * segundo checkout — agora sim a assinatura mensal recorrente — e
 * redireciona de novo pro Asaas.
 */
export async function GET(req: NextRequest) {
  const checkoutId = req.nextUrl.searchParams.get("checkoutId");
  if (!checkoutId) {
    return NextResponse.redirect(new URL("/plataforma", req.url));
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(new URL("/plataforma", req.url));
  }

  const { data: record, error } = await supabase
    .from("plataforma_checkouts")
    .select("id, plano, agente_pronto, asaas_customer_id, status")
    .eq("id", checkoutId)
    .maybeSingle();

  if (error || !record || !record.agente_pronto || !record.asaas_customer_id) {
    return NextResponse.redirect(new URL("/plataforma", req.url));
  }

  // Idempotência: se já passou por aqui antes, não marca de novo — só
  // segue pra gerar um novo checkout da assinatura (a pessoa pode ter
  // abandonado o checkout anterior antes de terminar).
  if (record.status === "iniciado") {
    await supabase
      .from("plataforma_checkouts")
      .update({ status: "taxa_confirmada" })
      .eq("id", checkoutId);
  }

  try {
    const checkoutUrl = await createSubscriptionCheckout(
      record.id,
      record.plano as Plano,
      true,
      record.asaas_customer_id,
      req.nextUrl.origin
    );
    return NextResponse.redirect(checkoutUrl);
  } catch (error) {
    console.error("[plataforma-subscription/continue] Falha ao criar checkout da assinatura:", error);
    return NextResponse.redirect(
      new URL(`/plataforma/assinar?plano=${record.plano}&agentePronto=1&erro=1`, req.url)
    );
  }
}
