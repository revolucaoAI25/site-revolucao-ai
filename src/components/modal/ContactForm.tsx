"use client";

import { useState, type FormEvent } from "react";

/** Formata os dígitos do número nacional (DDD + telefone) como (11) 91234-5678. */
function formatLocalNumber(digits: string): string {
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2, 11);

  let out = "";
  if (ddd) out += `(${ddd}`;
  if (ddd.length === 2) out += ") ";
  if (rest) {
    const splitAt = rest.length > 8 ? 5 : 4;
    const part1 = rest.slice(0, splitAt);
    const part2 = rest.slice(splitAt);
    out += part2 ? `${part1}-${part2}` : part1;
  }
  return out;
}

export function ContactForm({
  onSubmit,
}: {
  onSubmit: (name: string, phone: string) => void;
}) {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");

  const canSubmit = name.trim().length > 1 && phoneDigits.length >= 10;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhoneDigits(digits);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(name.trim(), `55${phoneDigits}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome"
        autoComplete="name"
        className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
      />
      <div className="flex items-center rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 focus-within:border-accent/50">
        <span className="font-medium text-muted shrink-0">+55</span>
        <input
          type="tel"
          value={formatLocalNumber(phoneDigits)}
          onChange={handlePhoneChange}
          placeholder="(11) 91234-5678"
          autoComplete="tel-national"
          className="w-full min-w-0 bg-transparent pl-2 font-medium placeholder:text-muted focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent mt-1 cursor-pointer"
      >
        Continuar
      </button>
    </form>
  );
}
