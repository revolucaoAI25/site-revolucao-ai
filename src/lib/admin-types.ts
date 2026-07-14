/**
 * Tipos e constantes do painel admin que também são usados por
 * Client Components (AdminTable, AdminKanbanBoard, EditRecordModal) —
 * ficam separados de admin-data.ts porque esse tem `import "server-only"`
 * e não pode ser importado (nem só os tipos/consts) por código de cliente.
 */

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
  stage: string | null;
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
  stage: string | null;
};

export type Stage = "preencheu" | "agendou" | "iniciou-checkout" | "confirmado";
export const STAGES: { stage: Stage; label: string }[] = [
  { stage: "preencheu", label: "Preencheu o pop-up" },
  { stage: "agendou", label: "Agendou reunião" },
  { stage: "iniciou-checkout", label: "Iniciou checkout (Lead Extractor)" },
  { stage: "confirmado", label: "Cliente confirmado" },
];

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
