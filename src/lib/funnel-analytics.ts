import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { FunnelPage } from "@/lib/funnel-tracking";

type Count = { key: string; sessions: number };

export type FunnelDashboardData = {
  sessions: number;
  leads: number;
  checkout_sessions: number;
  engaged: number;
  by_day: { day: string; sessions: number; leads: number; checkouts: number }[];
  by_step: { step: string; sessions: number }[];
  answers: { question: string; label: string; sessions: number }[];
  scroll: { percent: number; sessions: number }[];
  sections: { section: string; sessions: number }[];
  ctas: { location: string; clicks: number; sessions: number }[];
  devices: Count[];
  in_app: Count[];
  utm_source: Count[];
  utm_campaign: Count[];
};

export type RecentSession = {
  session_id: string;
  first_seen: string;
  last_seen: string;
  max_step_index: number | null;
  max_scroll: number | null;
  is_lead: boolean;
  clicked: boolean;
  pv: { device?: string; in_app?: string; utm_campaign?: string; utm_source?: string } | null;
  answers: { question: string | null; label: string | null }[];
};

export type FunnelDashboardResult =
  | { status: "ok"; data: FunnelDashboardData; recent: RecentSession[] }
  | { status: "not-configured" }
  | { status: "missing-sql" }
  | { status: "error"; message: string };

/** Erro do PostgREST quando a função/tabela ainda não existe (SQL não rodado). */
function isMissingSql(error: { code?: string; message?: string }) {
  return (
    error.code === "PGRST202" ||
    error.code === "42883" ||
    error.code === "42P01" ||
    /could not find the function|does not exist/i.test(error.message ?? "")
  );
}

export async function getFunnelDashboard(
  page: FunnelPage,
  days: number
): Promise<FunnelDashboardResult> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { status: "not-configured" };

  const [dash, recent] = await Promise.all([
    supabase.rpc("funnel_dashboard", { p_page: page, p_days: days }),
    supabase.rpc("funnel_recent_sessions", { p_page: page, p_days: days, p_limit: 60 }),
  ]);

  const error = dash.error ?? recent.error;
  if (error) {
    return isMissingSql(error)
      ? { status: "missing-sql" }
      : { status: "error", message: error.message };
  }

  return {
    status: "ok",
    data: dash.data as FunnelDashboardData,
    recent: (recent.data ?? []) as RecentSession[],
  };
}
