import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { markScheduled } from "@/lib/agency-leads";
import {
  phonesFromInvitee,
  verifyCalendlySignature,
  type CalendlyPayload,
} from "@/lib/calendly-webhook";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Webhook do Calendly (eventos `invitee.created` e `invitee.canceled`).
 * É a fonte de verdade do agendamento: funciona mesmo se a pessoa fechar a
 * página antes do aviso do navegador chegar, ou agendar por outro caminho
 * (e-mail de confirmação, link direto).
 *
 * Acha o lead pelo `utm_content`, que o funil manda pro Calendly com o id
 * do lead; se não vier, tenta pelo WhatsApp informado no agendamento.
 * Agendamentos que não são do funil da agência (pop-up do site, por
 * exemplo) não casam com nenhum lead e são ignorados.
 */
export async function POST(req: NextRequest) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) {
    return NextResponse.json({ error: "webhook não configurado" }, { status: 503 });
  }

  const raw = await req.text();
  if (!verifyCalendlySignature(raw, req.headers.get("calendly-webhook-signature"), signingKey)) {
    return NextResponse.json({ error: "assinatura inválida" }, { status: 401 });
  }

  let data: CalendlyPayload;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "payload inválido" }, { status: 400 });
  }
  if (data.event !== "invitee.created" && data.event !== "invitee.canceled") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ ok: true, stored: false });

  const invitee = data.payload;
  let leadId: string | null = null;

  const utmContent = invitee?.tracking?.utm_content;
  if (utmContent && UUID.test(utmContent)) {
    const { data: row } = await supabase
      .from("agencia_leads")
      .select("id")
      .eq("id", utmContent)
      .maybeSingle();
    leadId = row?.id ?? null;
  }

  if (!leadId) {
    // Sem utm_content: procura pelo telefone (últimos 8 dígitos, que ignoram DDI e o 9 extra).
    for (const phone of phonesFromInvitee(invitee)) {
      const tail = phone.slice(-8);
      const { data: rows } = await supabase
        .from("agencia_leads")
        .select("id, whatsapp")
        .not("whatsapp", "is", null)
        .order("created_at", { ascending: false })
        .limit(500);
      const match = (rows ?? []).find((r) => (r.whatsapp ?? "").replace(/\D/g, "").endsWith(tail));
      if (match) {
        leadId = match.id;
        break;
      }
    }
  }

  if (!leadId) return NextResponse.json({ ok: true, matched: false });

  if (data.event === "invitee.created") {
    await markScheduled(leadId, { eventUri: invitee?.scheduled_event?.uri ?? null });
  } else {
    // Remarcação chega como cancelamento do horário antigo (rescheduled) —
    // não é desistência. E só vale cancelar o horário que está guardado.
    if (invitee?.rescheduled) return NextResponse.json({ ok: true, ignored: "rescheduled" });
    const { data: current } = await supabase
      .from("agencia_leads")
      .select("calendly_event_uri")
      .eq("id", leadId)
      .maybeSingle();
    const canceledUri = invitee?.scheduled_event?.uri;
    if (current?.calendly_event_uri && canceledUri && current.calendly_event_uri !== canceledUri) {
      return NextResponse.json({ ok: true, ignored: "outro horário" });
    }

    const now = new Date().toISOString();
    await supabase
      .from("agencia_leads")
      .update({
        status: "cancelou",
        stage: "nao-agendou",
        scheduled_at: null,
        canceled_at: now,
        updated_at: now,
      })
      .eq("id", leadId);
  }

  return NextResponse.json({ ok: true, matched: true });
}
