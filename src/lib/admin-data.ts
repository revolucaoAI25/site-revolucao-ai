import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
  STAGES,
  type LeadRow,
  type AsaasCheckoutRow,
  type PlataformaCheckoutRow,
  type Stage,
  type AdminRecord,
} from "@/lib/admin-types";

export {
  STAGES,
  type LeadRow,
  type AsaasCheckoutRow,
  type PlataformaCheckoutRow,
  type Stage,
  type AdminRecord,
};

const RESULT_LABELS: Record<string, string> = {
  agendar: "Agentes de IA — Agendar apresentação",
  "outro-produto": "Agentes de IA — Outro produto",
  "ferramenta-extracao": "Agentes de IA — Ferramenta de extração",
  gratuito: "Formação — Material gratuito",
  "low-ticket": "Formação — Conteúdo baixo ticket",
  "reuniao-vendas": "Formação — Reunião de vendas",
};

function leadDetail(row: LeadRow) {
  return RESULT_LABELS[row.result_key] ?? `${row.flow_id} — ${row.result_key}`;
}

const VALID_STAGES = new Set(STAGES.map((s) => s.stage));

function isStage(value: string | null): value is Stage {
  return !!value && VALID_STAGES.has(value as Stage);
}

/** Estágio salvo (editável no kanban) — só deriva do sinal automático em
 * linhas antigas que ainda não passaram pela migration de backfill. */
function leadStage(row: LeadRow): Stage {
  if (isStage(row.stage)) return row.stage;
  return row.scheduled_at ? "agendou" : "preencheu";
}

function checkoutStage(row: AsaasCheckoutRow): Stage {
  if (isStage(row.stage)) return row.stage;
  return row.status === "confirmado" ? "confirmado" : "iniciou-checkout";
}

function plataformaStage(row: PlataformaCheckoutRow): Stage {
  if (isStage(row.stage)) return row.stage;
  return row.status === "confirmado" ? "confirmado" : "iniciou-checkout";
}

function plataformaDetail(row: PlataformaCheckoutRow) {
  const planoLabel = row.plano.charAt(0).toUpperCase() + row.plano.slice(1);
  return `Plataforma — Plano ${planoLabel}${row.agente_pronto ? " + Agente Pronto" : ""}`;
}

/**
 * Busca leads do pop-up, checkouts do Lead Extractor e checkouts da
 * Plataforma, unificados num formato só — é a base pro dashboard, kanban
 * e tabela do admin. Usa a service role (RLS já barra qualquer outro
 * acesso); quem chega até aqui já passou pela checagem de sessão do
 * proxy.ts / layout do admin.
 */
export async function getAdminRecords(): Promise<AdminRecord[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const [leadsRes, checkoutsRes, plataformaRes] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("asaas_checkouts")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("plataforma_checkouts")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const leads: AdminRecord[] = (leadsRes.data ?? []).map((row: LeadRow) => ({
    id: row.id,
    source: "popup",
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    detail: leadDetail(row),
    stage: leadStage(row),
    raw: row,
  }));

  const checkouts: AdminRecord[] = (checkoutsRes.data ?? []).map(
    (row: AsaasCheckoutRow) => ({
      id: row.id,
      source: "lead-extractor",
      createdAt: row.created_at,
      name: row.nome,
      email: row.email,
      phone: row.telefone,
      detail: `Lead Extractor — Plano ${row.plano}`,
      stage: checkoutStage(row),
      raw: row,
    })
  );

  const plataforma: AdminRecord[] = (plataformaRes.data ?? []).map(
    (row: PlataformaCheckoutRow) => ({
      id: row.id,
      source: "plataforma",
      createdAt: row.created_at,
      name: row.nome,
      email: row.email,
      phone: row.telefone,
      detail: plataformaDetail(row),
      stage: plataformaStage(row),
      raw: row,
    })
  );

  return [...leads, ...checkouts, ...plataforma].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export type AdminSummary = {
  totalLeads: number;
  totalAgentes: number;
  totalFormacao: number;
  totalAgendados: number;
  totalCheckoutsIniciados: number;
  totalCheckoutsConfirmados: number;
  taxaConfirmacaoCheckout: number | null;
  totalPlataformaIniciados: number;
  totalPlataformaConfirmados: number;
  taxaConfirmacaoPlataforma: number | null;
  porResultado: { label: string; count: number }[];
};

export function summarize(records: AdminRecord[]): AdminSummary {
  const popup = records.filter((r): r is AdminRecord & { raw: LeadRow } => r.source === "popup");
  const checkouts = records.filter(
    (r): r is AdminRecord & { raw: AsaasCheckoutRow } => r.source === "lead-extractor"
  );
  const plataforma = records.filter(
    (r): r is AdminRecord & { raw: PlataformaCheckoutRow } => r.source === "plataforma"
  );

  const totalAgendados = popup.filter((r) => r.stage === "agendou").length;
  const totalCheckoutsConfirmados = checkouts.filter((r) => r.stage === "confirmado").length;
  const totalCheckoutsIniciados = checkouts.length;
  const totalPlataformaConfirmados = plataforma.filter((r) => r.stage === "confirmado").length;
  const totalPlataformaIniciados = plataforma.length;

  const porResultadoMap = new Map<string, number>();
  for (const r of popup) {
    porResultadoMap.set(r.detail, (porResultadoMap.get(r.detail) ?? 0) + 1);
  }

  return {
    totalLeads: popup.length,
    totalAgentes: popup.filter((r) => r.raw.flow_id === "agentes").length,
    totalFormacao: popup.filter((r) => r.raw.flow_id === "formacao").length,
    totalAgendados,
    totalCheckoutsIniciados,
    totalCheckoutsConfirmados,
    taxaConfirmacaoCheckout:
      totalCheckoutsIniciados > 0
        ? (totalCheckoutsConfirmados / totalCheckoutsIniciados) * 100
        : null,
    totalPlataformaIniciados,
    totalPlataformaConfirmados,
    taxaConfirmacaoPlataforma:
      totalPlataformaIniciados > 0
        ? (totalPlataformaConfirmados / totalPlataformaIniciados) * 100
        : null,
    porResultado: Array.from(porResultadoMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
  };
}
