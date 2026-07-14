import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Marca o lead como "agendou reunião" — chamado quando o Calendly embutido
 * no resultado do pop-up avisa (via postMessage) que a pessoa concluiu um
 * agendamento de verdade. Ver CalendlyEmbed.tsx.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from("leads")
    .update({ scheduled_at: new Date().toISOString(), stage: "agendou" })
    .eq("id", id);

  if (error) {
    console.error("[lead/schedule] Falha ao salvar no Supabase:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
