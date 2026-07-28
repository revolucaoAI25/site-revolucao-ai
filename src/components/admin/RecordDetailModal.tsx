"use client";

import { useState } from "react";
import { STAGES, type AdminRecord, type AsaasCheckoutRow, type LeadRow, type PlataformaCheckoutRow, type Stage } from "@/lib/admin-types";
import { OnboardingInfoModal } from "./OnboardingInfoModal";

const SOURCE_LABELS: Record<AdminRecord["source"], string> = {
  popup: "Pop-up",
  "lead-extractor": "Lead Extractor",
  plataforma: "Plataforma",
};

const STAGE_LABELS: Record<Stage, string> = Object.fromEntries(
  STAGES.map((s) => [s.stage, s.label])
) as Record<Stage, string>;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
        {label}
      </p>
      <p className="text-sm text-text">{value}</p>
    </div>
  );
}

export function RecordDetailModal({
  record,
  onClose,
  onEdit,
  onDelete,
}: {
  record: AdminRecord;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [viewingOnboarding, setViewingOnboarding] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  record.source !== "popup"
                    ? "bg-accent/15 text-accent"
                    : "bg-white/[0.06] text-muted"
                }`}
              >
                {SOURCE_LABELS[record.source]}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.06] text-muted">
                {STAGE_LABELS[record.stage]}
              </span>
            </div>
            <h2 className="text-lg font-black tracking-tight">
              {record.name ?? "Sem nome"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-text transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 border-t border-white/10 pt-5">
          <Field label="E-mail" value={record.email} />
          <Field label="Telefone" value={record.phone} />
          <Field label="Origem" value={record.detail} />
          <Field label="Criado em" value={formatDate(record.createdAt)} />
        </div>

        {record.source === "popup" && (
          <div className="border-t border-white/10 pt-5">
            <h3 className="text-sm font-black tracking-tight text-accent mb-4">
              Respostas do pop-up
            </h3>
            {(record.raw as LeadRow).answers?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {(record.raw as LeadRow).answers.map((answer, index) => (
                  <div key={`${answer.question}-${index}`}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
                      {answer.question}
                    </p>
                    <p className="text-sm text-text leading-relaxed">{answer.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-2">
                Nenhuma resposta registrada pra esse lead (provavelmente um
                registro antigo).
              </p>
            )}
          </div>
        )}

        {record.source === "lead-extractor" && (
          <div className="grid sm:grid-cols-2 gap-4 border-t border-white/10 pt-5">
            <Field label="Plano" value={(record.raw as AsaasCheckoutRow).plano} />
            <Field label="Status" value={(record.raw as AsaasCheckoutRow).status} />
            <Field
              label="Confirmado em"
              value={
                (record.raw as AsaasCheckoutRow).confirmed_at
                  ? formatDate((record.raw as AsaasCheckoutRow).confirmed_at!)
                  : null
              }
            />
          </div>
        )}

        {record.source === "plataforma" && (
          <div className="border-t border-white/10 pt-5 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Plano" value={(record.raw as PlataformaCheckoutRow).plano} />
              <Field
                label="Agente Pronto"
                value={(record.raw as PlataformaCheckoutRow).agente_pronto ? "Sim" : "Não"}
              />
              <Field label="Status" value={(record.raw as PlataformaCheckoutRow).status} />
              <Field
                label="Confirmado em"
                value={
                  (record.raw as PlataformaCheckoutRow).confirmed_at
                    ? formatDate((record.raw as PlataformaCheckoutRow).confirmed_at!)
                    : null
                }
              />
            </div>
            {(record.raw as PlataformaCheckoutRow).business_info && (
              <button
                type="button"
                onClick={() => setViewingOnboarding(true)}
                className="self-start text-sm font-semibold text-accent hover:underline cursor-pointer"
              >
                Ver onboarding completo
              </button>
            )}
          </div>
        )}

        <div className="flex gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-text hover:border-accent/50 hover:text-accent transition-colors cursor-pointer"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 rounded-full border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>

      {viewingOnboarding && (
        <OnboardingInfoModal
          data={(record.raw as PlataformaCheckoutRow).business_info ?? {}}
          onClose={() => setViewingOnboarding(false)}
        />
      )}
    </div>
  );
}
