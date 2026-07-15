import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type Payload = {
  checkoutId?: string;
  businessInfo?: Record<string, string>;
};

/**
 * Salva as informações do negócio preenchidas na página de obrigado do
 * Agente Pronto (depois do pagamento) — é o que o time usa pra montar a
 * primeira versão do agente do cliente.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Payload | null;
  const checkoutId = body?.checkoutId;
  const businessInfo = body?.businessInfo;

  if (!checkoutId || !businessInfo || typeof businessInfo !== "object") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }

  const { data: record, error: findError } = await supabase
    .from("plataforma_checkouts")
    .select("id, agente_pronto")
    .eq("id", checkoutId)
    .maybeSingle();

  if (findError || !record || !record.agente_pronto) {
    return NextResponse.json({ error: "Checkout não encontrado" }, { status: 404 });
  }

  const { error } = await supabase
    .from("plataforma_checkouts")
    .update({ business_info: businessInfo })
    .eq("id", checkoutId);

  if (error) {
    console.error("[plataforma-business-info] Falha ao salvar no Supabase:", error);
    return NextResponse.json({ error: "Falha ao salvar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
