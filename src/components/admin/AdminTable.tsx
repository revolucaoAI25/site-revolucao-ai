"use client";

import { useMemo, useState } from "react";
import type { AdminRecord, Stage } from "@/lib/admin-data";

const STAGE_LABELS: Record<Stage, string> = {
  preencheu: "Preencheu o pop-up",
  agendou: "Agendou reunião",
  "iniciou-checkout": "Iniciou checkout",
  confirmado: "Confirmado",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminTable({ records }: { records: AdminRecord[] }) {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<"todos" | AdminRecord["source"]>("todos");
  const [stage, setStage] = useState<"todos" | Stage>("todos");

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
          {Object.entries(STAGE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-muted-2">
        {filtered.length} de {records.length} registros
      </p>

      <div className="card-surface rounded-3xl overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {["Data", "Nome", "Contato", "Fonte", "Detalhe", "Estágio"].map((h) => (
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
              <tr key={`${r.source}-${r.id}`} className="border-b border-white/5">
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
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-2">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
