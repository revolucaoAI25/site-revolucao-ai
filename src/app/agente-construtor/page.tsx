import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { AGENTE_CONSTRUTOR_CHECKOUT_LINK, EMAIL } from "@/lib/links";
import { ClaudeIcon } from "./ClaudeMark";
import styles from "./bump.module.css";

const title = "Agente Construtor — complemento do Do Zero aos 10K";
const description =
  "Um agente do Claude que monta os agentes que você vende: prompt, stepper, perguntas e respostas e funções, tudo no padrão da Revolução AI.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

const entregaveis = [
  {
    title: "Prompt do sistema",
    description:
      "A personalidade, o tom e as regras do agente, escritos pro negócio do seu cliente.",
  },
  {
    title: "Stepper",
    description:
      "O fluxo de atendimento passo a passo, da primeira mensagem até o agendamento.",
  },
  {
    title: "Perguntas e respostas",
    description:
      "A base de conhecimento do negócio, incluindo as respostas pras objeções mais comuns.",
  },
  {
    title: "Funções e automações",
    description:
      "O que o agente aciona durante a conversa: agendamento, aviso de novo lead pra equipe, resumo da conversa.",
  },
];

const passos = [
  {
    title: "Você compra",
    description:
      "As instruções de instalação chegam no seu e-mail assim que o pagamento é aprovado.",
  },
  {
    title: "Instala no seu Claude",
    description: "É um passo a passo curto, e o e-mail leva você por cada etapa.",
  },
  {
    title: "Descreve o cliente",
    description:
      "Passa as informações do negócio (pode ser a transcrição da reunião de onboarding) e recebe o agente montado, componente por componente.",
  },
];

const beneficios = [
  {
    title: "Tempo de volta pra você",
    description:
      "O trabalho pesado de escrever e organizar cada componente já vem feito. Seu tempo vai pra vender e acompanhar seus clientes.",
  },
  {
    title: "Método que já está validado",
    description:
      "É o jeito que a Revolução AI constrói os agentes dos clientes dela, com os mesmos prompts e a mesma estrutura.",
  },
  {
    title: "Padrão em todo projeto",
    description:
      "Cada agente sai com os quatro componentes alinhados entre si, sem um contradizer o outro.",
  },
];

const ofertaItens = [
  "O Agente Construtor, pronto pra instalar no seu Claude",
  "Passo a passo de instalação enviado por e-mail",
  "Os mesmos prompts e o método que a Revolução AI usa nos projetos",
  "Prompt do sistema, stepper, perguntas e respostas e funções, tudo no mesmo padrão",
];

const perguntas = [
  {
    q: "Preciso ter feito o curso?",
    a: "O Agente Construtor foi pensado como complemento do Do Zero aos 10K. O curso ensina o método inteiro; o agente acelera a execução, então você aproveita muito mais com os dois juntos.",
  },
  {
    q: "Como eu recebo?",
    a: "Assim que o pagamento é aprovado, as instruções de instalação chegam no e-mail da compra.",
  },
  {
    q: "É difícil de instalar?",
    a: "Não. É um passo a passo curto, enviado por e-mail, que você segue dentro da sua própria conta do Claude.",
  },
  {
    q: "Serve pra qualquer tipo de negócio?",
    a: "Ele monta o agente a partir das informações do negócio que você passar, então cada agente sai personalizado pro cliente, e não um modelo genérico.",
  },
  {
    q: "Pra qual plataforma ele monta os agentes?",
    a: "Os agentes saem prontos pro Chatflux, a mesma ferramenta que você usa no curso.",
  },
];

function Check({ delay }: { delay: number }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[#07090a] ${styles.pop}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function AgentChat() {
  const itens = ["Prompt do sistema", "Stepper do atendimento", "Perguntas e respostas", "Funções e automações"];
  return (
    <div className="relative">
      <div
        className={`glow absolute h-[320px] w-[320px] -top-10 left-1/2 -translate-x-1/2 ${styles.floatPulse}`}
      />
      <div className="relative rounded-3xl border border-white/10 bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-muted">
            <ClaudeIcon size={16} />
            Agente Construtor
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:p-6 text-[15px] leading-relaxed">
          <div
            className={`ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-accent-soft border border-accent/20 px-4 py-3 text-text ${styles.fadeUp}`}
            style={{ animationDelay: "300ms" }}
          >
            Cliente novo: escritório de advocacia. Atende os leads pelo WhatsApp e quer agendar
            consultas.
          </div>

          <div
            className={`max-w-[94%] rounded-2xl rounded-tl-md bg-surface-2 border border-white/10 px-4 py-3 text-muted ${styles.fadeUp}`}
            style={{ animationDelay: "1200ms" }}
          >
            <p className="text-text font-medium mb-3">
              Entendido. Montando o agente completo pro Chatflux:
            </p>
            <ul className="flex flex-col gap-2.5">
              {itens.map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <Check delay={1900 + i * 550} />
                  <span
                    className={styles.fadeUp}
                    style={{ animationDelay: `${1900 + i * 550}ms` }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-2 flex items-center gap-1.5">
            Exemplo ilustrativo
            <span className={`inline-block h-3 w-[2px] bg-muted-2 ${styles.caret}`} aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AgenteConstrutorPage() {
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
              <span className="block font-black tracking-tight text-[15px] sm:text-base text-text">
                Agente Construtor
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </div>
          <CTAButton href={AGENTE_CONSTRUTOR_CHECKOUT_LINK} external size="md">
            Comprar
          </CTAButton>
        </Container>
      </header>

      <main>
        {/* Hero */}
        <Section
          decor={
            <>
              <div className="absolute inset-0 bg-grid" />
              <div
                className={`glow h-[460px] w-[460px] -top-44 left-1/2 -translate-x-1/2 ${styles.floatPulse}`}
              />
            </>
          }
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
            <Reveal>
              <Eyebrow>Complemento do Do Zero aos 10K</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance mb-5">
                Um agente do Claude que monta os agentes que{" "}
                <span className="text-accent">você vende.</span>
              </h1>
              <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Você conta como é o negócio do seu cliente. Ele entrega o agente completo,
                pronto pro Chatflux, seguindo o mesmo método que a Revolução AI usa nos
                projetos dela.
              </p>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
                <span className="text-4xl font-black tracking-tight text-accent">R$ 21,90</span>
                <span className="text-muted font-semibold">| pagamento único</span>
              </div>
              <CTAButton href={AGENTE_CONSTRUTOR_CHECKOUT_LINK} external size="lg">
                Quero o Agente Construtor
              </CTAButton>
              <p className="text-muted-2 text-sm mt-4">
                ⚡ As instruções de instalação chegam no seu e-mail assim que o pagamento é
                aprovado
              </p>

              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold">
                    <ClaudeIcon size={16} />
                    Claude
                  </span>
                  <span className="text-accent" aria-hidden="true">
                    →
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold">
                    Chatflux
                  </span>
                </div>
                <p className="text-xs text-muted-2 mt-3">
                  Roda dentro da sua conta do Claude e entrega o agente pronto pro Chatflux.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <AgentChat />
            </Reveal>
          </div>
        </Section>

        {/* O que ele monta */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>O que vem pronto</Eyebrow>
            <SectionTitle>Tudo que um agente precisa, no mesmo padrão.</SectionTitle>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-accent/70" />
            <p className="text-muted leading-relaxed mt-4">
              Pra cada cliente, o Agente Construtor monta os quatro componentes que o agente
              precisa pra funcionar no Chatflux.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {entregaveis.map((item, i) => (
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

        {/* Como funciona */}
        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>Como funciona</Eyebrow>
            <SectionTitle>Do pagamento ao primeiro agente.</SectionTitle>
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

        {/* Por que vale */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>O resultado</Eyebrow>
            <SectionTitle>Mais velocidade, com o método que já funciona.</SectionTitle>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-accent/70" />
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {beneficios.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="card-surface card-hover rounded-3xl p-5 sm:p-6"
              >
                <h3 className="font-black text-lg mb-1.5">{item.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{item.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="max-w-3xl mx-auto mt-8">
            <div className="border-l-2 border-accent/50 pl-4 py-1 text-muted leading-relaxed">
              <span className="text-text font-semibold">O curso continua sendo a base.</span> O
              Do Zero aos 10K ensina o método inteiro. O Agente Construtor só acelera a
              execução, porque já vem com tudo montado.
            </div>
          </Reveal>
        </Section>

        {/* Oferta */}
        <Section
          id="oferta"
          divider
          decor={
            <div
              className={`glow h-[420px] w-[420px] top-6 left-1/2 -translate-x-1/2 ${styles.floatPulse}`}
            />
          }
        >
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Agente Construtor</Eyebrow>
            <SectionTitle>O investimento.</SectionTitle>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-accent/70" />
          </Reveal>
          <Reveal
            delay={80}
            className="max-w-xl mx-auto rounded-3xl border border-accent/20 bg-accent-soft p-7 sm:p-10"
          >
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <span className="text-4xl font-black tracking-tight text-accent">R$ 21,90</span>
              <span className="text-muted font-semibold">| pagamento único</span>
            </div>
            <p className="text-muted-2 text-sm mb-6">
              Acesso por e-mail assim que o pagamento for aprovado.
            </p>
            <p className="text-text font-semibold mb-3">O que você leva:</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {ofertaItens.map((item) => (
                <li key={item} className="flex gap-3 text-muted text-[15px] leading-relaxed">
                  <span className="text-accent shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <CTAButton
              href={AGENTE_CONSTRUTOR_CHECKOUT_LINK}
              external
              size="lg"
              className="w-full"
            >
              Quero o Agente Construtor
            </CTAButton>
            <p className="text-muted-2 text-xs text-center mt-4">
              🔒 Compra segura • feito pela equipe da Revolução AI, que já atendeu mais de 120
              clientes
            </p>
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Dúvidas</Eyebrow>
            <SectionTitle>Perguntas frequentes.</SectionTitle>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-accent/70" />
          </Reveal>
          <Reveal delay={80} className="max-w-2xl mx-auto flex flex-col gap-3">
            {perguntas.map((item) => (
              <details
                key={item.q}
                className="group card-surface rounded-2xl px-5 py-4 open:border-accent/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    className="shrink-0 text-accent text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-muted leading-relaxed mt-3 text-[15px]">{item.a}</p>
              </details>
            ))}
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col gap-4 text-sm text-muted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Agente Construtor by Revolução AI</p>
            <a href={`mailto:${EMAIL}`} className="hover:text-text transition-colors">
              {EMAIL}
            </a>
          </div>
          <p className="text-xs text-muted-2 text-center sm:text-left leading-relaxed">
            Claude é uma marca da Anthropic. Este produto é independente e não é afiliado nem
            endossado pela Anthropic.
          </p>
        </Container>
      </footer>
    </>
  );
}
