import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { OnboardingForm } from "@/components/plataforma/OnboardingForm";

export const metadata: Metadata = {
  title: "Onboarding do seu agente — Plataforma",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ checkoutId?: string }>;
}) {
  const { checkoutId } = await searchParams;

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
                Onboarding
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </Link>
        </Container>
      </header>

      <main>
        <Container className="max-w-2xl py-16 sm:py-24">
          <OnboardingForm checkoutId={checkoutId ?? null} />
        </Container>
      </main>
    </>
  );
}
