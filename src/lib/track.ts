import type { FunnelEvent, FunnelPage } from "./funnel-tracking";

/**
 * Registro de métricas dos funis (client-side). Anônimo: só um id aleatório
 * de sessão no sessionStorage — sem cookie, sem IP, sem nome/telefone.
 * Manda pra /api/track, que grava no Supabase (tabela funnel_events).
 *
 * Pra não contar as próprias visitas de teste: abrir qualquer página com
 * `?notrack` desliga o registro naquele navegador; `?track` liga de novo.
 */

const SESSION_KEY = "rv_funnel_sid";
const OPTOUT_KEY = "rv_notrack";

let memorySessionId: string | null = null;

function isOptedOut(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("notrack")) localStorage.setItem(OPTOUT_KEY, "1");
    if (params.has("track")) localStorage.removeItem(OPTOUT_KEY);
    return localStorage.getItem(OPTOUT_KEY) === "1";
  } catch {
    return false;
  }
}

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    memorySessionId ??= randomId();
    return memorySessionId;
  }
}

export function track(
  page: FunnelPage,
  event: FunnelEvent,
  opts: { step?: string; data?: Record<string, unknown> } = {}
) {
  if (typeof window === "undefined" || isOptedOut()) return;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page,
      event,
      sessionId: getSessionId(),
      step: opts.step,
      data: opts.data,
    }),
    keepalive: true,
  }).catch(() => {});
}

function detectInApp(ua: string): string {
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB|FBIOS/i.test(ua)) return "facebook";
  if (/TikTok|musical_ly|BytedanceWebview/i.test(ua)) return "tiktok";
  return "nenhum";
}

/** page_view com origem (UTMs), tipo de aparelho e se abriu dentro do app do Instagram/Facebook. */
export function trackPageView(page: FunnelPage) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => (params.get(key) ?? "").slice(0, 100);
  let referrer = "";
  try {
    referrer = document.referrer ? new URL(document.referrer).host : "";
  } catch {}
  track(page, "page_view", {
    data: {
      utm_source: pick("utm_source"),
      utm_medium: pick("utm_medium"),
      utm_campaign: pick("utm_campaign"),
      utm_content: pick("utm_content"),
      referrer,
      device: window.innerWidth < 768 ? "mobile" : "desktop",
      in_app: detectInApp(navigator.userAgent),
    },
  });
}
