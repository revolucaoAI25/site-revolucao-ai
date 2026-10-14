import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LeadExtractorCredentials } from "@/components/lead-extractor/LeadExtractorCredentials";
import { LEAD_EXTRACTOR_WHATSAPP_LINK, LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY } from "@/lib/links";

export const metadata: Metadata = {
  title: "Assinatura recebida — Lead Extractor",
  robots: { index: false, follow: false },
};

const PLANO_LABEL: Record<string, string> = {
  mensal: "Mensal",
  anual: "Anual",
};

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string; checkoutId?: string }>;
}) {
  const { plano, checkoutId } = await searchParams;
  const planoLabel = plano ? PLANO_LABEL[plano] : undefined;

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
        </Container>
      </header>

      <main>
        <Container className="max-w-lg py-16 sm:py-24">
          {checkoutId ? (
            <LeadExtractorCredentials checkoutId={checkoutId} />
          ) : (
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
                Recebemos seu pedido!
              </h1>
              <p className="text-muted leading-relaxed mb-1">
                {planoLabel
                  ? `Assinatura do plano ${planoLabel} em processamento.`
                  : "Sua assinatura está em processamento."}
              </p>
              <p className="text-muted leading-relaxed">
                Assim que o pagamento for confirmado, nosso time entra em
                contato nas próximas horas — pelo WhatsApp ou e-mail — com os
                acessos e o passo a passo pra você começar a usar o Lead
                Extractor.
              </p>
            </div>
          )}

          <p className="text-center text-sm text-muted mt-6">
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
