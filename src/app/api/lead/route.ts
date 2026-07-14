import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type LeadPayload = {
  flowId?: string;
  resultKey?: string;
  answers?: { question: string; label: string }[];
  contact?: { name: string; phone: string; email: string } | null;
};

/**
 * Encaminha o lead pro webhook próprio do cliente (Zapier/Make/n8n/CRM),
 * além do Supabase — só no resultado "gratuito" (quem vai receber o
 * ebook). Os outros resultados só ficam salvos no Supabase, sem
 * encaminhamento. Falha aqui não deve derrubar o resto do processamento.
 */
async function forwardToWebhook(payload: LeadPayload) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url || !payload.contact || payload.resultKey !== "gratuito") return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[lead] Falha ao encaminhar pro webhook:", error);
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as LeadPayload | null;
  const { flowId, resultKey, answers, contact } = body ?? {};

  if (!flowId || !resultKey) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  await forwardToWebhook({ flowId, resultKey, answers, contact });

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
    email: contact?.email ?? null,
  });

  if (error) {
    console.error("[lead] Falha ao salvar no Supabase:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
