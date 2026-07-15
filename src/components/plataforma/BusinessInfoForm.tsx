"use client";

import { useState, type FormEvent } from "react";

const FIELDS: { key: string; label: string; placeholder: string }[] = [
  {
    key: "negocio",
    label: "O que seu negócio vende ou oferece?",
    placeholder: "Ex: assessoria jurídica pra causas trabalhistas",
  },
  {
    key: "publico",
    label: "Quem é o seu público-alvo?",
    placeholder: "Ex: trabalhadores CLT demitidos nos últimos 2 anos",
  },
  {
    key: "objecoes",
    label: "Quais as principais objeções ou dúvidas dos seus leads?",
    placeholder: "Ex: preço, prazo do processo, se vale a pena entrar com ação",
  },
  {
    key: "atendimentoAtual",
    label: "Como funciona seu atendimento/pré-vendas hoje?",
    placeholder: "Ex: hoje um atendente responde manualmente pelo WhatsApp",
  },
  {
    key: "objetivo",
    label: "Qual o objetivo principal do agente?",
    placeholder: "Ex: qualificar o lead e agendar uma consulta",
  },
  {
    key: "linkSite",
    label: "Link do site ou Instagram (opcional)",
    placeholder: "https://...",
  },
];

export function BusinessInfoForm({ checkoutId }: { checkoutId: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    !loading &&
    FIELDS.slice(0, -1).every((f) => (values[f.key] ?? "").trim().length > 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/plataforma-business-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutId, businessInfo: values }),
      });
      if (!res.ok) throw new Error("Não foi possível enviar — tenta de novo.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card-surface rounded-3xl p-8 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="text-lg font-black tracking-tight mb-2">Informações recebidas!</h2>
        <p className="text-muted leading-relaxed text-sm">
          Nosso time já vai começar a montar a primeira versão do seu agente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface rounded-3xl p-8 flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-black tracking-tight mb-1">Conta um pouco sobre seu negócio</h2>
        <p className="text-muted text-sm leading-relaxed">
          Pra gente montar a primeira versão do seu agente (Agente Pronto).
        </p>
      </div>
      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-semibold mb-2">{field.label}</label>
          <textarea
            value={values[field.key] ?? ""}
            onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
            placeholder={field.placeholder}
            rows={field.key === "linkSite" ? 1 : 3}
            className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-3.5 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50 resize-none"
          />
        </div>
      ))}

      {error && <p className="text-sm text-red-400 leading-relaxed">{error}</p>}

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent mt-1 cursor-pointer"
      >
        {loading ? "Enviando..." : "Enviar informações"}
      </button>
    </form>
  );
}
