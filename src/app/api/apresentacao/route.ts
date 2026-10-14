import { after, NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { findVolumeOption, leadEventId, stageForDestination, UTM_KEYS, type AgencyLeadRow } from "@/lib/agency-funnel";
import { markScheduled } from "@/lib/agency-leads";
import { sendMetaEvent } from "@/lib/meta-capi";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SESSION_ID = /^[A-Za-z0-9-]{8,64}$/;
const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|facebot|whatsapp|telegram|curl|wget|python|go-http|axios|node-fetch/i;
const MAX_BODY_CHARS = 4000;
const SITE_URL = "https://www.revolucao-ai.com";

/** Campos que a conversa pode gravar, e o limite de tamanho de cada um. */
const ANSWER_FIELDS = new Set(["area_atuacao", "problema", "volume_leads", "whatsapp", "instagram"]);

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().slice(0, max);
  return v || null;
}

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

const fail = (status = 400) => NextResponse.json({ ok: false }, { status });

/**
 * Grava o andamento de quem está no funil de conversa (/apresentacao).
 * Três ações: `start` (cria o lead quando responde o nome), `answer` (cada
 * resposta seguinte) e `event` (chegou no final, clicou, abriu a agenda,
 * agendou). A regra de qualificação (faixa de leads → destino) é calculada
 * aqui no servidor, nunca confiada ao navegador.
 */
export async function POST(req: NextRequest) {
  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY_CHARS) return fail();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail();
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  if (BOT_UA.test(userAgent)) return NextResponse.json({ ok: true, ignored: true });

  const supabase = getSupabaseServerClient();
  const action = body.action;

  if (action === "start") {
    const nome = text(body.nome, 100);
    if (!nome) return fail();
    if (!supabase) return NextResponse.json({ ok: true, stored: false });

    const utm = (typeof body.utm === "object" && body.utm !== null ? body.utm : {}) as Record<string, unknown>;
    const row: Record<string, unknown> = {
      nome,
      device: text(body.device, 20),
      in_app: text(body.inApp, 20),
      fbp: text(body.fbp, 200),
      fbc: text(body.fbc, 300),
      last_step: "nome",
      session_id:
        typeof body.sessionId === "string" && SESSION_ID.test(body.sessionId) ? body.sessionId : null,
    };
    for (const key of UTM_KEYS) row[key] = text(utm[key], 150);

    const { data, error } = await supabase.from("agencia_leads").insert(row).select("id").single();
    if (error || !data) {
      console.error("[apresentacao] Falha ao criar lead:", error?.message);
      return fail(500);
    }
    return NextResponse.json({ ok: true, id: data.id });
  }

  const id = typeof body.id === "string" && UUID.test(body.id) ? body.id : null;
  if (!id) return fail();
  if (!supabase) return NextResponse.json({ ok: true, stored: false });

  if (action === "answer") {
    const field = typeof body.field === "string" ? body.field : "";
    const value = text(body.value, 200);
    if (!ANSWER_FIELDS.has(field) || !value) return fail();

    const updates: Record<string, unknown> = {
      [field]: value,
      last_step: text(body.step, 40) ?? field,
      updated_at: new Date().toISOString(),
    };

    let destination: "plataforma" | "whatsapp" | "agendar" | null = null;
    if (field === "volume_leads") {
      const option = findVolumeOption(value);
      if (!option) return fail();
      destination = option.destination;
      Object.assign(updates, {
        volume_faixa: option.key,
        qualified: option.qualified,
        destination: option.destination,
        etapa_funil: "meio",
      });
    }

    const { data, error } = await supabase
      .from("agencia_leads")
      .update(updates)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.error("[apresentacao] Falha ao salvar resposta:", error.message);
      return fail(500);
    }
    if (!data) return fail(404);
    const lead = data as AgencyLeadRow & { fbp: string | null; fbc: string | null };

    // Só mexe no estágio do kanban se ninguém moveu o card à mão.
    if (destination) {
      await supabase
        .from("agencia_leads")
        .update({ stage: stageForDestination(destination) })
        .eq("id", id)
        .eq("stage", "iniciou");
    }

    // Lead qualificado com WhatsApp informado: manda o evento Lead pela API
    // de Conversões (o navegador manda o mesmo, com o mesmo id).
    if (field === "whatsapp" && lead.qualified) {
      const ip = clientIp(req);
      after(() =>
        sendMetaEvent({
          eventName: "Lead",
          eventId: leadEventId(lead.id),
          sourceUrl: `${SITE_URL}/apresentacao`,
          phone: lead.whatsapp,
          name: lead.nome,
          fbp: lead.fbp,
          fbc: lead.fbc,
          clientIp: ip,
          userAgent,
        })
      );
    }
    return NextResponse.json({ ok: true });
  }

  if (action === "event") {
    const event = body.event;
    const now = new Date().toISOString();

    if (event === "scheduled") {
      const ip = clientIp(req);
      const result = await markScheduled(id, { clientIp: ip, userAgent });
      return NextResponse.json({ ok: true, changed: result.changed });
    }

    const updates: Record<string, unknown> | null =
      event === "final"
        ? { final_at: now, etapa_funil: "pre_agendamento", status: "quase_agendou" }
        : event === "cta"
          ? { cta_clicked_at: now, status: "cta_clicado" }
          : event === "calendly_open"
            ? { calendly_opened_at: now, status: "agendamento_aberto", etapa_funil: "pre_agendamento" }
            : null;
    if (!updates) return fail();

    // Nunca "desfaz" um agendamento já confirmado.
    const { error } = await supabase
      .from("agencia_leads")
      .update({ ...updates, updated_at: now })
      .eq("id", id)
      .neq("status", "agendou");
    if (error) {
      console.error("[apresentacao] Falha ao salvar evento:", error.message);
      return fail(500);
    }
    return NextResponse.json({ ok: true });
  }

  return fail();
}
