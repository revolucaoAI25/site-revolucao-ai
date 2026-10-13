import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { FUNNEL_EVENTS, FUNNEL_PAGES } from "@/lib/funnel-tracking";

const PAGES = new Set<string>(FUNNEL_PAGES.map((p) => p.id));
const EVENTS = new Set<string>(FUNNEL_EVENTS);
const SESSION_ID = /^[A-Za-z0-9-]{8,64}$/;
// Robôs, pré-visualização de link e ferramentas de teste não contam como visita.
const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|facebot|whatsapp|telegram|curl|wget|python|go-http|axios|node-fetch/i;

const MAX_BODY_CHARS = 4000;
const MAX_DATA_CHARS = 1500;

/**
 * Recebe um evento de comportamento dos funis e grava em funnel_events.
 * Responde sempre rápido e sem detalhes — quem chama é o navegador do
 * visitante e não precisa (nem deve) saber o que deu errado.
 */
export async function POST(req: NextRequest) {
  const raw = await req.text().catch(() => "");
  if (raw.length === 0 || raw.length > MAX_BODY_CHARS) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { page, event, sessionId, step, data } = body;
  if (
    typeof page !== "string" || !PAGES.has(page) ||
    typeof event !== "string" || !EVENTS.has(event) ||
    typeof sessionId !== "string" || !SESSION_ID.test(sessionId) ||
    (step !== undefined && (typeof step !== "string" || step.length > 40)) ||
    (data !== undefined && (typeof data !== "object" || data === null || Array.isArray(data)))
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const dataJson = JSON.stringify(data ?? {});
  if (dataJson.length > MAX_DATA_CHARS) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (BOT_UA.test(req.headers.get("user-agent") ?? "")) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ ok: true, stored: false });

  const { error } = await supabase.from("funnel_events").insert({
    page,
    session_id: sessionId,
    event,
    step: step ?? null,
    data: data ?? {},
  });
  if (error) console.error("[track] Falha ao salvar evento:", error.message);

  return NextResponse.json({ ok: true });
}
