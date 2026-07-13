import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type LeadPayload = {
  flowId?: string;
  resultKey?: string;
  answers?: { question: string; label: string }[];
  contact?: { name: string; phone: string } | null;
};

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as LeadPayload | null;
  const { flowId, resultKey, answers, contact } = body ?? {};

  if (!flowId || !resultKey) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.warn(
      "[lead] Supabase não configurado (SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY ausentes) — lead não foi salvo.",
      { flowId, resultKey }
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("leads").insert({
    flow_id: flowId,
    result_key: resultKey,
    answers: answers ?? [],
    name: contact?.name ?? null,
    phone: contact?.phone ?? null,
  });

  if (error) {
    console.error("[lead] Falha ao salvar no Supabase:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
