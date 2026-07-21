"use client";

import { useEffect, useRef, useState } from "react";
import { LEAD_EXTRACTOR_APP_LINK } from "@/lib/links";

const POLL_INTERVAL_MS = 3000;
const TIMEOUT_MS = 90_000;

type Status =
  | { kind: "loading" }
  | { kind: "ready"; email: string; password: string }
  | { kind: "timeout" };

export function LeadExtractorCredentials({ checkoutId }: { checkoutId: string }) {
  const [status, setStatus] = useState<Status>({ kind: "loading" });
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    startedAt.current = Date.now();

    async function poll() {
      try {
        const res = await fetch(
          `/api/lead-extractor-checkout-status?checkoutId=${encodeURIComponent(checkoutId)}`
        );
        const data = await res.json().catch(() => null);

        if (!cancelled && res.ok && data?.status === "confirmado" && data.email && data.password) {
          setStatus({ kind: "ready", email: data.email, password: data.password });
          return;
        }
      } catch {
        // Falha de rede pontual — só tenta de novo no próximo ciclo.
      }

      if (cancelled) return;
      if (Date.now() - (startedAt.current ?? Date.now()) > TIMEOUT_MS) {
        setStatus({ kind: "timeout" });
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [checkoutId]);

  if (status.kind === "loading") {
    return (
      <div className="card-surface rounded-3xl p-8 sm:p-10 text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4v3m0 10v3m8-8h-3M7 12H4m13.66-5.66-2.12 2.12M8.46 15.54l-2.12 2.12m0-11.32 2.12 2.12m9.08 9.08 2.12 2.12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <h1 className="text-2xl font-black tracking-tight mb-3">Confirmando seu pagamento...</h1>
        <p className="text-muted leading-relaxed">
          Assim que confirmar, a gente já cria sua conta na plataforma automaticamente e mostra
          seu login e senha aqui — geralmente leva só alguns segundos.
        </p>
      </div>
    );
  }

  if (status.kind === "timeout") {
    return (
      <div className="card-surface rounded-3xl p-8 sm:p-10 text-center">
        <h1 className="text-2xl font-black tracking-tight mb-3">Ainda processando</h1>
        <p className="text-muted leading-relaxed">
          Seu pagamento ainda está sendo confirmado — isso pode levar alguns minutos em casos
          raros. Atualize esta página daqui a pouco pra ver seu login e senha, ou fala com a
          gente pelo WhatsApp se preferir.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface rounded-3xl p-8 sm:p-10 text-center">
      <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h1 className="text-2xl font-black tracking-tight mb-3">Sua conta já está pronta!</h1>
      <p className="text-muted leading-relaxed mb-6">
        Use os dados abaixo pra entrar na plataforma agora mesmo.
      </p>

      <div className="flex flex-col gap-3 text-left mb-6">
        <div className="rounded-2xl border border-white/10 bg-surface-2 px-5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
            Login
          </p>
          <p className="font-medium break-all">{status.email}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface-2 px-5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
            Senha
          </p>
          <p className="font-medium break-all">{status.password}</p>
        </div>
      </div>

      <a
        href={LEAD_EXTRACTOR_APP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors mb-4"
      >
        Entrar na plataforma
      </a>

      <p className="text-muted leading-relaxed text-sm">
        Em breve a gente te manda um guia de como usar. Recomendamos trocar a senha assim que
        entrar pela primeira vez.
      </p>
    </div>
  );
}
