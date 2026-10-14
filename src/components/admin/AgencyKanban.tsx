"use client";

import { useState } from "react";
import {
  AGENCY_STAGES,
  VOLUME_OPTIONS,
  type AgencyLeadRow,
  type AgencyStage,
} from "@/lib/agency-funnel";

const VOLUME_LABELS: Record<string, string> = Object.fromEntries(
  VOLUME_OPTIONS.map((o) => [o.key, o.label])
);

const STATUS_LABELS: Record<string, string> = {
  iniciado: "Começou a conversa",
  quase_agendou: "Chegou no botão final",
  cta_clicado: "Clicou no botão final",
  agendamento_aberto: "Abriu a agenda",
  agendou: "Agendou",
  cancelou: "Cancelou o agendamento",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Link do WhatsApp da pessoa (assume Brasil quando vem sem DDI). */
function whatsappUrl(phone: string | null) {
  const digits = (phone ?? "").replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits.length <= 11 ? `55${digits}` : digits}`;
}

async function patchStage(id: string, stage: AgencyStage) {
  const res = await fetch("/api/admin/agencia", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, stage }),
  });
  if (!res.ok) throw new Error();
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between gap-4 text-sm py-1.5 border-b border-white/5 last:border-0">
      <dt className="text-muted-2 shrink-0">{label}</dt>
      <dd className="text-text text-right break-words min-w-0">{value || "—"}</dd>
    </div>
  );
}

function LeadModal({
  lead,
  onClose,
  onMove,
  onDelete,
}: {
  lead: AgencyLeadRow;
  onClose: () => void;
  onMove: (stage: AgencyStage) => void;
  onDelete: () => void;
}) {
  const wa = whatsappUrl(lead.whatsapp);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lead.nome ?? "Lead"}
        className="card-surface w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-black tracking-tight">{lead.nome ?? "Sem nome"}</h2>
            <p className="text-muted text-sm">{STATUS_LABELS[lead.status] ?? lead.status}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-text text-2xl leading-none cursor-pointer"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <label className="block text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1.5">
          Estágio no kanban
        </label>
        <select
          value={lead.stage}
          onChange={(e) => onMove(e.target.value as AgencyStage)}
          className="w-full rounded-xl border border-white/10 bg-surface-2 px-3 py-2.5 text-sm mb-5"
        >
          {AGENCY_STAGES.map((s) => (
            <option key={s.stage} value={s.stage}>
              {s.label}
            </option>
          ))}
        </select>

        <dl className="mb-5">
          <DetailRow label="Área de atuação" value={lead.area_atuacao} />
          <DetailRow label="O que mais trava" value={lead.problema} />
          <DetailRow label="Leads por mês" value={lead.volume_leads} />
          <DetailRow label="WhatsApp" value={lead.whatsapp} />
          <DetailRow label="Instagram" value={lead.instagram} />
          <DetailRow label="Campanha" value={lead.utm_campaign} />
          <DetailRow label="Conjunto" value={lead.utm_medium} />
          <DetailRow label="Anúncio" value={lead.utm_content} />
          <DetailRow label="Fonte" value={lead.utm_source} />
          <DetailRow label="Aparelho" value={lead.device} />
          <DetailRow label="Começou em" value={formatDate(lead.created_at)} />
          <DetailRow label="Chegou no botão final" value={formatDate(lead.final_at)} />
          <DetailRow label="Abriu a agenda" value={formatDate(lead.calendly_opened_at)} />
          <DetailRow label="Agendou em" value={formatDate(lead.scheduled_at)} />
        </dl>

        <div className="flex flex-wrap gap-3">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#07090a]"
            >
              Chamar no WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-400 cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export function AgencyKanban({ leads: initialLeads }: { leads: AgencyLeadRow[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [dragId, setDragId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const openLead = leads.find((l) => l.id === openId) ?? null;

  async function move(id: string, stage: AgencyStage) {
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.stage === stage) return;
    const previous = lead.stage;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
    try {
      await patchStage(id, stage);
    } catch {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: previous } : l)));
      alert("Não foi possível mover o card. Tenta de novo.");
    }
  }

  async function remove(lead: AgencyLeadRow) {
    if (!confirm(`Excluir "${lead.nome ?? "sem nome"}"? Essa ação não pode ser desfeita.`)) return;
    try {
      const res = await fetch("/api/admin/agencia", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id }),
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      setOpenId(null);
    } catch {
      alert("Não foi possível excluir. Tenta de novo.");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted text-sm">
        Arraste o card entre as colunas (ou abra o card e escolha o estágio). O site move sozinho:
        qualificou, agendou ou cancelou. Você ajusta o resto à mão, por exemplo marcando quem
        qualificou e não agendou como <strong className="text-text">Não agendou</strong>.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {AGENCY_STAGES.map((col) => {
          const items = leads.filter((l) => l.stage === col.stage);
          return (
            <div
              key={col.stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) void move(id, col.stage);
                setDragId(null);
              }}
              className="flex flex-col gap-3 rounded-3xl p-2"
            >
              <div className="px-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">{col.label}</p>
                  <span className="text-xs font-bold text-muted-2">{items.length}</span>
                </div>
                <p className="text-[11px] text-muted-2 mt-0.5">{col.hint}</p>
              </div>
              <div className="flex flex-col gap-3 min-h-[60px] max-h-[70vh] overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <p className="text-xs text-muted-2 px-1">Nada por aqui ainda.</p>
                ) : (
                  items.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", lead.id);
                        setDragId(lead.id);
                      }}
                      onDragEnd={() => setDragId(null)}
                      onClick={() => setOpenId(lead.id)}
                      className={`card-surface card-hover rounded-2xl p-4 flex flex-col gap-1 cursor-grab active:cursor-grabbing transition-opacity ${
                        dragId === lead.id ? "opacity-40" : ""
                      }`}
                    >
                      <span className="font-semibold text-sm truncate">{lead.nome ?? "Sem nome"}</span>
                      {lead.area_atuacao && (
                        <p className="text-xs text-muted truncate">{lead.area_atuacao}</p>
                      )}
                      <p className="text-xs text-muted-2">
                        {lead.volume_faixa === "nenhum"
                          ? "Não recebe leads"
                          : lead.volume_faixa
                            ? `${VOLUME_LABELS[lead.volume_faixa] ?? lead.volume_leads} por mês`
                            : "Ainda não informou os leads por mês"}
                      </p>
                      {lead.utm_campaign && (
                        <p className="text-[11px] text-muted-2 truncate">Campanha: {lead.utm_campaign}</p>
                      )}
                      <p className="text-[11px] text-muted-2 mt-1">
                        {formatDate(lead.created_at)} · {STATUS_LABELS[lead.status] ?? lead.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {openLead && (
        <LeadModal
          lead={openLead}
          onClose={() => setOpenId(null)}
          onMove={(stage) => void move(openLead.id, stage)}
          onDelete={() => void remove(openLead)}
        />
      )}
    </div>
  );
}
