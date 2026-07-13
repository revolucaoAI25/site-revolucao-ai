"use client";

import { useState, type FormEvent } from "react";

export function ContactForm({
  onSubmit,
}: {
  onSubmit: (name: string, phone: string) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const canSubmit = name.trim().length > 1 && phone.trim().length > 7;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(name.trim(), phone.trim());
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
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Seu WhatsApp"
        autoComplete="tel"
        className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
      />
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
