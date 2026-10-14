import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { AGENCY_PAGE, type AgencyLeadRow } from "@/lib/agency-funnel";
import { getFunnelDashboard, type FunnelDashboardResult } from "@/lib/funnel-analytics";

export type AgencyDataResult =
  | { status: "ok"; leads: AgencyLeadRow[]; visitors: FunnelDashboardResult }
  | { status: "not-configured" }
  | { status: "missing-sql" }
  | { status: "error"; message: string };

const MAX_LEADS = 3000;

/**
 * Leads do funil de conversa + os números anônimos de visita (funnel_events).
 * Traz os leads dos últimos `days` dias pro painel de métricas; o kanban usa
 * `allTime` pra mostrar também os cards mais antigos que ainda estão abertos.
 */
export async function getAgencyData(days: number, allTime = false): Promise<AgencyDataResult> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { status: "not-configured" };

  let query = supabase
    .from("agencia_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(MAX_LEADS);
  if (!allTime) {
    query = query.gte("created_at", new Date(Date.now() - days * 86_400_000).toISOString());
  }

  const [leadsRes, visitors] = await Promise.all([query, getFunnelDashboard(AGENCY_PAGE, days)]);

  if (leadsRes.error) {
    const missing = leadsRes.error.code === "42P01" || /does not exist|schema cache/i.test(leadsRes.error.message);
    return missing ? { status: "missing-sql" } : { status: "error", message: leadsRes.error.message };
  }
  return { status: "ok", leads: (leadsRes.data ?? []) as AgencyLeadRow[], visitors };
}
