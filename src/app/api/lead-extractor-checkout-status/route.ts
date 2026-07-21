import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Consultado pela página de obrigado do Lead Extractor (via
 * `?checkoutId=...`) enquanto aguarda o /api/asaas-webhook confirmar o
 * pagamento e criar a conta na plataforma — só devolve login/senha depois
 * que ambos existirem. Mesmo modelo de acesso do
 * /api/plataforma-business-info: o checkoutId (uuid não sequencial) já
 * funciona como uma espécie de token de acesso.
 */
export async function GET(req: NextRequest) {
  const checkoutId = req.nextUrl.searchParams.get("checkoutId");
  if (!checkoutId) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("asaas_checkouts")
    .select("status, email, lead_extractor_user_id, lead_extractor_password")
    .eq("id", checkoutId)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Checkout não encontrado" }, { status: 404 });
  }

  if (data.status !== "confirmado" || !data.lead_extractor_user_id) {
    return NextResponse.json({ status: data.status });
  }

  return NextResponse.json({
    status: "confirmado",
    email: data.email,
    password: data.lead_extractor_password,
  });
}
