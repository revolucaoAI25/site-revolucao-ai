import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { EMAIL, PRODUTO_LOW_TICKET_LINK } from "@/lib/links";

const title = "Kit Proposta + Contrato — complemento do Do Zero aos 10K";
const description =
  "Os mesmos modelos de proposta comercial e de contrato que a Revolução AI usa na operação com os clientes.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

const itens = [
  {
    title: "Modelo de proposta comercial",
    description:
      "O modelo que usamos pra apresentar escopo e investimento depois da reunião, pronto pra você adaptar e enviar.",
  },
  {
    title: "Modelo de contrato de prestação de serviços",
    description:
      "O contrato que usamos na operação pra formalizar a contratação, já estruturado pra você ajustar ao seu caso.",
  },
];

const passos = [
  {
    title: "Você adiciona no checkout",
    description: "É uma oferta opcional, mostrada na hora de comprar o Do Zero aos 10K.",
  },
  {
    title: "Recebe o link por e-mail",
    description: "Assim que o pagamento é aprovado, o e-mail da compra traz o link da pasta com os dois modelos.",
  },
  {
    title: "Adapta e usa com seus clientes",
    description: "Ajusta os campos pro seu cliente e manda a proposta e o contrato.",
  },
];

export default function KitPropostaContratoPage() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/10">
        <Container className="flex items-center justify-between h-16">
          <div className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Revolução AI"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full"
              priority
            />
            <span className="leading-tight">
              <span className="block font-black tracking-tight whitespace-nowrap text-[15px] sm:text-base text-text">
                Kit Proposta + Contrato
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </div>
        </Container>
      </header>

      <main>
        <Section
          decor={
            <>
              <div className="absolute inset-0 bg-grid" />
              <div className="glow h-[460px] w-[460px] -top-44 left-1/2 -translate-x-1/2" />
            </>
          }
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
            <Reveal>
              <Eyebrow>Complemento do Do Zero aos 10K</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance mb-5">
                Kit Proposta <span className="text-accent">+ Contrato</span>
              </h1>
              <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Os mesmos modelos de proposta comercial e de contrato que a Revolução AI usa na
                operação com os clientes. Você manda a proposta logo depois da reunião e formaliza o
                fechamento com um contrato já estruturado, sem começar do zero.
              </p>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <span className="text-4xl font-black tracking-tight text-accent">R$ 15,90</span>
                <span className="text-muted font-semibold">| pagamento único</span>
              </div>
              <p className="text-muted-2 text-sm mb-6">
                Oferta disponível no checkout do Do Zero aos 10K.
              </p>
              <CTAButton href={PRODUTO_LOW_TICKET_LINK} size="lg">
                Conhecer o Do Zero aos 10K
              </CTAButton>
            </Reveal>

            <Reveal delay={120}>
              <Image
                src="/kit/kit-proposta-contrato.webp"
                alt="Modelo de proposta comercial e modelo de contrato de prestação de serviços"
                width={900}
                height={900}
                priority
                className="w-full max-w-[520px] mx-auto rounded-3xl border border-white/10"
              />
            </Reveal>
          </div>
        </Section>

        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>O que vem no kit</Eyebrow>
            <SectionTitle>Dois modelos, os mesmos da nossa operação.</SectionTitle>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-accent/70" />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {itens.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="card-surface card-hover rounded-3xl p-5 sm:p-6 flex gap-4 items-start"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-sm font-black text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-black text-lg mb-1">{item.title}</h3>
                  <p className="text-muted text-[15px] leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>Como funciona</Eyebrow>
            <SectionTitle>Da compra até o primeiro cliente.</SectionTitle>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-accent/70" />
          </Reveal>
          <div className="max-w-2xl mx-auto relative pl-8 flex flex-col gap-9">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-accent/30 to-accent/10" />
            {passos.map((passo, i) => (
              <Reveal key={passo.title} delay={i * 120} className="relative">
                <span className="absolute -left-8 top-1.5 h-4 w-4 rounded-full bg-accent shadow-[0_0_16px_rgba(0,200,83,0.7)] ring-4 ring-bg" />
                <h3 className="font-black text-lg mb-1">{passo.title}</h3>
                <p className="text-muted leading-relaxed">{passo.description}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col gap-4 text-sm text-muted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Kit Proposta + Contrato by Revolução AI</p>
            <a href={`mailto:${EMAIL}`} className="hover:text-text transition-colors">
              {EMAIL}
            </a>
          </div>
          <p className="text-xs text-muted-2 text-center sm:text-left leading-relaxed">
            Os modelos são uma base de trabalho: ajuste ao seu caso e, se possível, valide o contrato
            com um advogado antes de usar.
          </p>
        </Container>
      </footer>
    </>
  );
}
