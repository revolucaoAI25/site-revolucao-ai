import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export type LeadRow = {
  id: string;
  created_at: string;
  flow_id: string;
  result_key: string;
  answers: { question: string; label: string }[];
  name: string | null;
  phone: string | null;
  email: string | null;
  scheduled_at: string | null;
};

export type AsaasCheckoutRow = {
  id: string;
  created_at: string;
  plano: string;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
  asaas_customer_id: string | null;
  status: string;
  confirmed_at: string | null;
};

export type Stage = "preencheu" | "agendou" | "iniciou-checkout" | "confirmado";

export type AdminRecord = {
  id: string;
  source: "popup" | "lead-extractor";
  createdAt: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  detail: string;
  stage: Stage;
  raw: LeadRow | AsaasCheckoutRow;
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

function leadStage(row: LeadRow): Stage {
  return row.scheduled_at ? "agendou" : "preencheu";
}

function checkoutStage(row: AsaasCheckoutRow): Stage {
  return row.status === "confirmado" ? "confirmado" : "iniciou-checkout";
}

/**
 * Busca leads do pop-up e checkouts do Lead Extractor, unificados num
 * formato só — é a base pro dashboard, kanban e tabela do admin. Usa a
 * service role (RLS já barra qualquer outro acesso); quem chega até aqui
 * já passou pela checagem de sessão do proxy.ts / layout do admin.
 */
export async function getAdminRecords(): Promise<AdminRecord[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const [leadsRes, checkoutsRes] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("asaas_checkouts")
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

  return [...leads, ...checkouts].sort(
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
  porResultado: { label: string; count: number }[];
};

export function summarize(records: AdminRecord[]): AdminSummary {
  const popup = records.filter((r): r is AdminRecord & { raw: LeadRow } => r.source === "popup");
  const checkouts = records.filter(
    (r): r is AdminRecord & { raw: AsaasCheckoutRow } => r.source === "lead-extractor"
  );

  const totalAgendados = popup.filter((r) => r.stage === "agendou").length;
  const totalCheckoutsConfirmados = checkouts.filter((r) => r.stage === "confirmado").length;
  const totalCheckoutsIniciados = checkouts.length;

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
    porResultado: Array.from(porResultadoMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
  };
}
