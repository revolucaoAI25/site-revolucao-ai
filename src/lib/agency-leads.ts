import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { sendMetaEvent } from "@/lib/meta-capi";
import { scheduleEventId, type AgencyLeadRow } from "@/lib/agency-funnel";

const SITE_URL = "https://www.revolucao-ai.com";

/**
 * Marca o lead como "agendou". Chamado por dois caminhos (o aviso do
 * Calendly no navegador e o webhook do Calendly) — o que chegar primeiro
 * grava e manda o evento pra Meta; o outro só vê que já estava marcado.
 */
export async function markScheduled(
  leadId: string,
  opts: { eventUri?: string | null; scheduledAt?: string | null; clientIp?: string | null; userAgent?: string | null } = {}
): Promise<{ changed: boolean; stored: boolean }> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { changed: false, stored: false };

  const { data, error } = await supabase
    .from("agencia_leads")
    .update({
      status: "agendou",
      etapa_funil: "agendado",
      stage: "agendou",
      scheduled_at: opts.scheduledAt ?? new Date().toISOString(),
      canceled_at: null,
      calendly_event_uri: opts.eventUri ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId)
    .is("scheduled_at", null)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("[agencia] Falha ao marcar agendamento:", error.message);
    return { changed: false, stored: true };
  }
  if (!data) return { changed: false, stored: true };

  const lead = data as AgencyLeadRow & { fbp: string | null; fbc: string | null };
  await sendMetaEvent({
    eventName: "Schedule",
    eventId: scheduleEventId(lead.id),
    sourceUrl: `${SITE_URL}/apresentacao`,
    phone: lead.whatsapp,
    name: lead.nome,
    fbp: lead.fbp,
    fbc: lead.fbc,
    clientIp: opts.clientIp,
    userAgent: opts.userAgent,
  });
  return { changed: true, stored: true };
}
