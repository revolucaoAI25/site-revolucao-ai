import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  LEAD_EXTRACTOR_WHATSAPP_LINK,
  LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Assinatura recebida — Plataforma",
  robots: { index: false, follow: false },
};

const PLANO_LABEL: Record<string, string> = {
  start: "Start",
  growth: "Growth",
  scale: "Scale",
};

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string; agentePronto?: string; checkoutId?: string }>;
}) {
  const { plano, agentePronto, checkoutId } = await searchParams;
  const planoLabel = plano ? PLANO_LABEL[plano] : undefined;
  const isAgentePronto = agentePronto === "1";

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/10">
        <Container className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/plataforma" className="inline-flex items-center gap-2.5">
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
                Plataforma
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </Link>
        </Container>
      </header>

      <main>
        <Container className="max-w-lg py-16 sm:py-24 flex flex-col gap-6">
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
            <h1 className="text-2xl font-black tracking-tight mb-3">
              Recebemos seu pagamento!
            </h1>
            <p className="text-muted leading-relaxed mb-1">
              {planoLabel
                ? `Assinatura do plano ${planoLabel} confirmada.`
                : "Sua assinatura está confirmada."}
            </p>
            <p className="text-muted leading-relaxed">
              Em breve você recebe por e-mail o acesso à plataforma e o
              treinamento guiado — pra você usar a ferramenta com o
              máximo de qualidade.
            </p>
          </div>

          {isAgentePronto && checkoutId && (
            <div className="card-surface rounded-3xl p-8 sm:p-10 text-center">
              <h2 className="text-lg font-black tracking-tight mb-3">
                Falta pouco pra gente montar seu agente
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Preencha o formulário de onboarding com as informações do seu negócio —
                é a partir dele que nosso time monta a primeira versão do seu agente de IA.
              </p>
              <Link
                href={`/plataforma/onboarding?checkoutId=${checkoutId}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors"
              >
                Preencher formulário de onboarding
              </Link>
            </div>
          )}

          <p className="text-center text-sm text-muted">
            Alguma dúvida enquanto isso?{" "}
            <a
              href={LEAD_EXTRACTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Fala com a gente ({LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY})
            </a>
          </p>
        </Container>
      </main>
    </>
  );
}
