"use client";

import { useMemo, useState } from "react";
import { STAGES, type AdminRecord, type Stage } from "@/lib/admin-types";
import { EditRecordModal, type RecordUpdates } from "./EditRecordModal";

const STAGE_LABELS: Record<Stage, string> = Object.fromEntries(
  STAGES.map((s) => [s.stage, s.label])
) as Record<Stage, string>;

function recordKey(r: Pick<AdminRecord, "source" | "id">) {
  return `${r.source}-${r.id}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminTable({ records: initialRecords }: { records: AdminRecord[] }) {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<"todos" | AdminRecord["source"]>("todos");
  const [stage, setStage] = useState<"todos" | Stage>("todos");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return records.filter((r) => {
      if (source !== "todos" && r.source !== source) return false;
      if (stage !== "todos" && r.stage !== stage) return false;
      if (!term) return true;
      return (
        r.name?.toLowerCase().includes(term) ||
        r.email?.toLowerCase().includes(term) ||
        r.phone?.toLowerCase().includes(term) ||
        r.detail.toLowerCase().includes(term)
      );
    });
  }, [records, search, source, stage]);

  function toggleSelected(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(recordKey)));
    }
  }

  async function deleteItems(items: Pick<AdminRecord, "source" | "id">[]) {
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/records", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error();
      const keys = new Set(items.map(recordKey));
      setRecords((prev) => prev.filter((r) => !keys.has(recordKey(r))));
      setSelected((prev) => {
        const next = new Set(prev);
        keys.forEach((k) => next.delete(k));
        return next;
      });
    } catch {
      alert("Não foi possível excluir. Tenta de novo.");
    } finally {
      setDeleting(false);
    }
  }

  function handleDeleteOne(record: AdminRecord) {
    if (!confirm(`Excluir "${record.name ?? "sem nome"}"? Essa ação não pode ser desfeita.`)) return;
    deleteItems([record]);
  }

  function handleDeleteSelected() {
    if (
      !confirm(
        `Excluir ${selected.size} registro(s) selecionado(s)? Essa ação não pode ser desfeita.`
      )
    )
      return;
    const items = filtered.filter((r) => selected.has(recordKey(r)));
    deleteItems(items);
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, e-mail, telefone..."
          className="flex-1 rounded-2xl border border-white/10 bg-surface-2 px-4 py-2.5 text-sm placeholder:text-muted focus:outline-none focus:border-accent/50"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value as typeof source)}
          className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
        >
          <option value="todos">Todas as fontes</option>
          <option value="popup">Pop-up</option>
          <option value="lead-extractor">Lead Extractor</option>
        </select>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as typeof stage)}
          className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
        >
          <option value="todos">Todos os estágios</option>
          {STAGES.map(({ stage: s, label }) => (
            <option key={s} value={s}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-2">
          {filtered.length} de {records.length} registros
          {selected.size > 0 && ` — ${selected.size} selecionado(s)`}
        </p>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={handleDeleteSelected}
            disabled={deleting}
            className="rounded-full bg-red-500/15 text-red-400 px-4 py-2 text-xs font-semibold hover:bg-red-500/25 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Excluir selecionados
          </button>
        )}
      </div>

      <div className="card-surface rounded-3xl overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>
              {["Data", "Nome", "Contato", "Fonte", "Detalhe", "Estágio", ""].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-widest text-muted-2"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={recordKey(r)} className="border-b border-white/5">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selected.has(recordKey(r))}
                    onChange={() => toggleSelected(recordKey(r))}
                    className="cursor-pointer"
                  />
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-muted-2">
                  {formatDate(r.createdAt)}
                </td>
                <td className="py-3 px-4 font-medium">{r.name ?? "—"}</td>
                <td className="py-3 px-4 text-muted">
                  <div>{r.email ?? "—"}</div>
                  <div className="text-xs text-muted-2">{r.phone ?? ""}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      r.source === "lead-extractor"
                        ? "bg-accent/15 text-accent"
                        : "bg-white/[0.06] text-muted"
                    }`}
                  >
                    {r.source === "lead-extractor" ? "Lead Extractor" : "Pop-up"}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted">{r.detail}</td>
                <td className="py-3 px-4 text-muted">{STAGE_LABELS[r.stage]}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setEditing(r)}
                    className="text-xs font-semibold text-accent hover:underline cursor-pointer mr-3"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteOne(r)}
                    className="text-xs font-semibold text-red-400 hover:underline cursor-pointer"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-2">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditRecordModal
          record={editing}
          onClose={() => setEditing(null)}
          onSaved={(updates) => handleSaved(editing, updates)}
        />
      )}
    </div>
  );
}
