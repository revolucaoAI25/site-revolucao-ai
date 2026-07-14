"use client";

import { useState, type FormEvent } from "react";
import { STAGES, type AdminRecord } from "@/lib/admin-types";

export type RecordUpdates = {
  name?: string;
  email?: string;
  phone?: string;
  stage?: AdminRecord["stage"];
};

export function EditRecordModal({
  record,
  onClose,
  onSaved,
}: {
  record: AdminRecord;
  onClose: () => void;
  onSaved: (updates: RecordUpdates) => void;
}) {
  const [name, setName] = useState(record.name ?? "");
  const [email, setEmail] = useState(record.email ?? "");
  const [phone, setPhone] = useState(record.phone ?? "");
  const [stage, setStage] = useState<AdminRecord["stage"]>(record.stage);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const updates: RecordUpdates = { name, email, phone, stage };
    try {
      const res = await fetch("/api/admin/records", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: record.source, id: record.id, updates }),
      });
      if (!res.ok) throw new Error();
      onSaved(updates);
      onClose();
    } catch {
      setError("Não foi possível salvar. Tenta de novo.");
    } finally {
      setSaving(false);
    }
  }

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
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-surface border border-white/10 rounded-3xl p-6 flex flex-col gap-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-lg font-black tracking-tight mb-1">Editar registro</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="w-full rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-accent/50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="w-full rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-accent/50"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone"
          className="w-full rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-accent/50"
        />
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as AdminRecord["stage"])}
          className="w-full rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-sm focus:outline-none focus:border-accent/50"
        >
          {STAGES.map((s) => (
            <option key={s.stage} value={s.stage}>
              {s.label}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-muted hover:text-text transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-full bg-accent text-[#07090a] px-4 py-2.5 text-sm font-semibold hover:bg-accent-dark transition-colors disabled:opacity-40 cursor-pointer"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
