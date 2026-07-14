"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LEAD_EXTRACTOR_WHATSAPP_LINK, LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY } from "@/lib/links";

const PLANOS = {
  mensal: { label: "Mensal", preco: "R$497,90/mês", nota: "Sem fidelidade." },
  anual: { label: "Anual", preco: "R$337/mês", nota: "R$4.044/ano, faturado em 12x." },
} as const;

type PlanoKey = keyof typeof PLANOS;

function formatDocument(digits: string) {
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  // CNPJ: 00.000.000/0000-00
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function formatPhone(digits: string) {
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

export function AssinarForm() {
  const searchParams = useSearchParams();
  const planoParam = searchParams.get("plano");
  const plano: PlanoKey | null =
    planoParam === "mensal" || planoParam === "anual" ? planoParam : null;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [docDigits, setDocDigits] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    !!plano &&
    nome.trim().length > 2 &&
    email.includes("@") &&
    (docDigits.length === 11 || docDigits.length === 14) &&
    phoneDigits.length >= 10 &&
    !loading;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || !plano) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/asaas-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plano,
          nome: nome.trim(),
          email: email.trim(),
          cpfCnpj: docDigits,
          // Asaas espera o telefone no formato nacional (DDD + número),
          // sem o código do país — diferente do link do WhatsApp, que
          // precisa do 55 na frente.
          telefone: phoneDigits,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data?.error ?? "Não foi possível iniciar o checkout.");
      }
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o checkout.");
      setLoading(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/10">
        <Container className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/lead-extractor" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Revolução AI"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full"
              priority
            />
            <span className="leading-tight">
              <span className="block font-black tracking-tight text-base sm:text-lg text-text">
                Lead Extractor
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </Link>
          <Link href="/lead-extractor#planos" className="text-sm font-medium text-muted hover:text-text transition-colors">
            Voltar pros planos
          </Link>
        </Container>
      </header>

      <main>
        <Container className="max-w-lg py-16 sm:py-24">
          {!plano ? (
            <div className="card-surface rounded-3xl p-8 text-center">
              <h1 className="text-xl font-black tracking-tight mb-3">Plano inválido</h1>
              <p className="text-muted mb-6">
                Não identificamos qual plano você quer assinar. Volta pra página de planos e clica em &quot;Quero assinar&quot;.
              </p>
              <Link href="/lead-extractor#planos" className="text-accent font-semibold hover:underline">
                Ver planos e preços
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                  Plano {PLANOS[plano].label}
                </p>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
                  {PLANOS[plano].preco}
                </h1>
                <p className="text-muted text-sm">{PLANOS[plano].nota}</p>
              </div>

              <form onSubmit={handleSubmit} className="card-surface rounded-3xl p-8 flex flex-col gap-4">
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome completo"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatDocument(docDigits)}
                  onChange={(e) => setDocDigits(e.target.value.replace(/\D/g, "").slice(0, 14))}
                  placeholder="CPF ou CNPJ"
                  className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
                />
                <div className="flex items-center rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 focus-within:border-accent/50">
                  <span className="font-medium text-muted shrink-0">+55</span>
                  <input
                    type="tel"
                    value={formatPhone(phoneDigits)}
                    onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    placeholder="(11) 91234-5678"
                    autoComplete="tel-national"
                    className="w-full min-w-0 bg-transparent pl-2 font-medium placeholder:text-muted focus:outline-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 leading-relaxed">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent mt-1 cursor-pointer"
                >
                  {loading ? "Processando..." : "Ir para pagamento"}
                </button>

                <p className="text-xs text-muted-2 leading-relaxed text-center">
                  {plano === "anual"
                    ? "Você será redirecionado pro ambiente seguro do Asaas pra concluir o pagamento parcelado em 12x no cartão de crédito."
                    : "Você será redirecionado pro ambiente seguro do Asaas pra concluir o pagamento (cartão, boleto ou Pix)."}
                </p>
              </form>

              <p className="text-center text-sm text-muted mt-6">
                Problema no pagamento?{" "}
                <a
                  href={LEAD_EXTRACTOR_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Fala com a gente ({LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY})
                </a>
              </p>
            </>
          )}
        </Container>
      </main>
    </>
  );
}
