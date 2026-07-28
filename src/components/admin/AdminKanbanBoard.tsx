"use client";

import { useState } from "react";
import { STAGES, type AdminRecord, type Stage } from "@/lib/admin-types";
import { EditRecordModal, type RecordUpdates } from "./EditRecordModal";
import { RecordDetailModal } from "./RecordDetailModal";

const SOURCE_LABELS: Record<AdminRecord["source"], string> = {
  popup: "Pop-up",
  "lead-extractor": "Lead Extractor",
  plataforma: "Plataforma",
};

function recordKey(r: Pick<AdminRecord, "source" | "id">) {
  return `${r.source}-${r.id}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function patchStage(record: AdminRecord, stage: Stage) {
  const res = await fetch("/api/admin/records", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: record.source, id: record.id, updates: { stage } }),
  });
  if (!res.ok) throw new Error();
}

export function AdminKanbanBoard({ records: initialRecords }: { records: AdminRecord[] }) {
  const [records, setRecords] = useState(initialRecords);
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [viewingDetail, setViewingDetail] = useState<AdminRecord | null>(null);

  async function moveToStage(key: string, stage: Stage) {
    const record = records.find((r) => recordKey(r) === key);
    if (!record || record.stage === stage) return;

    const previousStage = record.stage;
    setRecords((prev) =>
      prev.map((r) => (recordKey(r) === key ? { ...r, stage } : r))
    );

    try {
      await patchStage(record, stage);
    } catch {
      setRecords((prev) =>
        prev.map((r) => (recordKey(r) === key ? { ...r, stage: previousStage } : r))
      );
      alert("Não foi possível mover o card. Tenta de novo.");
    }
  }

  async function handleDelete(record: AdminRecord) {
    if (!confirm(`Excluir "${record.name ?? "sem nome"}"? Essa ação não pode ser desfeita.`)) return;
    try {
      const res = await fetch("/api/admin/records", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ source: record.source, id: record.id }] }),
      });
      if (!res.ok) throw new Error();
      setRecords((prev) => prev.filter((r) => recordKey(r) !== recordKey(record)));
      setViewingDetail(null);
    } catch {
      alert("Não foi possível excluir. Tenta de novo.");
    }
  }

  function handleSaved(record: AdminRecord, updates: RecordUpdates) {
    setRecords((prev) =>
      prev.map((r) =>
        recordKey(r) === recordKey(record)
          ? {
              ...r,
              name: updates.name ?? r.name,
              email: updates.email ?? r.email,
              phone: updates.phone ?? r.phone,
              stage: updates.stage ?? r.stage,
            }
          : r
      )
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Kanban</h1>
        <p className="text-muted text-sm">
          Arraste um card entre as colunas pra mudar o estágio manualmente — o
          próprio site também move automaticamente quando confirma um agendamento
          ou um pagamento.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {STAGES.map((col) => {
          const items = records.filter((r) => r.stage === col.stage);
          return (
            <div
              key={col.stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const key = e.dataTransfer.getData("text/plain");
                if (key) moveToStage(key, col.stage);
                setDragKey(null);
              }}
              className="flex flex-col gap-3 rounded-3xl p-2 transition-colors"
            >
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
                  {col.label}
                </p>
                <span className="text-xs font-bold text-muted-2">{items.length}</span>
              </div>
              <div className="flex flex-col gap-3 min-h-[60px]">
                {items.length === 0 ? (
                  <p className="text-xs text-muted-2 px-1">Nada por aqui ainda.</p>
                ) : (
                  items.map((record) => {
                    const key = recordKey(record);
                    return (
                      <div
                        key={key}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", key);
                          setDragKey(key);
                        }}
                        onDragEnd={() => setDragKey(null)}
                        onClick={() => setViewingDetail(record)}
                        className={`card-surface card-hover rounded-2xl p-4 flex flex-col gap-1.5 cursor-grab active:cursor-grabbing transition-opacity ${
                          dragKey === key ? "opacity-40" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm truncate">
                            {record.name ?? "Sem nome"}
                          </span>
                          <span
                            className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              record.source !== "popup"
                                ? "bg-accent/15 text-accent"
                                : "bg-white/[0.06] text-muted"
                            }`}
                          >
                            {SOURCE_LABELS[record.source]}
                          </span>
                        </div>
                        <p className="text-xs text-muted truncate">{record.detail}</p>
                        {record.email && (
                          <p className="text-xs text-muted-2 truncate">{record.email}</p>
                        )}
                        {record.phone && <p className="text-xs text-muted-2">{record.phone}</p>}
                        <p className="text-[11px] text-muted-2 mt-1">
                          {formatDate(record.createdAt)}
                        </p>
                        <div className="flex gap-3 mt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditing(record);
                            }}
                            className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(record);
                            }}
                            className="text-xs font-semibold text-red-400 hover:underline cursor-pointer"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <EditRecordModal
          record={editing}
          onClose={() => setEditing(null)}
          onSaved={(updates) => handleSaved(editing, updates)}
        />
      )}

      {viewingDetail && (
        <RecordDetailModal
          record={viewingDetail}
          onClose={() => setViewingDetail(null)}
          onEdit={() => {
            setEditing(viewingDetail);
            setViewingDetail(null);
          }}
          onDelete={() => handleDelete(viewingDetail)}
        />
      )}
    </div>
  );
}
