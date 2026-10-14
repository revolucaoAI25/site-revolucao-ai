"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSupabaseAuthBrowserClient } from "@/lib/supabase-auth-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabaseAuthBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Revolução AI"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full"
          />
          <span className="font-black tracking-tight text-lg text-text">
            Revolução AI — Admin
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-surface rounded-3xl p-8 flex flex-col gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            autoComplete="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent mt-1 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
