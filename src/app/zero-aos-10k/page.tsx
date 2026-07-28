import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PillarCard } from "@/components/ui/PillarCard";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { Reveal } from "@/components/ui/Reveal";
import { EMAIL, ZERO_AOS_10K_CHECKOUT_LINK } from "@/lib/links";

const title = "Do Zero aos 10K com Agentes de IA";
const description =
  "Entenda como sair do 0 e chegar aos primeiros R$10k/mês em algumas semanas vendendo Agentes de IA — mesmo sem saber programar, mesmo começando do absoluto zero.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/zero-aos-10k" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/zero-aos-10k/lucas.jpg", width: 640, height: 640, alt: "Lucas Magalhães" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/zero-aos-10k/lucas.jpg"],
  },
};

const motivos = [
  {
    number: "1",
    title: "Usam ferramentas que complicam o que deveriam simplificar",
    description:
      "Todo mundo fala de n8n, né? Fluxos gigantes, VPS, API quebrando, instabilidade constante. Você passa semanas construindo infraestrutura... e o cliente nem entende o valor do que você fez. É como querer ser uma empresa de software e de serviços ao mesmo tempo — uma dupla preocupação que drena seu tempo e energia.",
  },
  {
    number: "2",
    title: "Não têm método para vender o que fazem",
    description:
      "Criar um agente de IA incrível não significa nada se você não conseguir vender. Ficar ligando pra empresas sem saber o que falar, mandar mensagens que ninguém responde, fazer reuniões que não convertem — o resultado é meses de trabalho sem ver a cor do dinheiro.",
  },
];

const aprendizado = [
  {
    title: "Estruturação",
    bullets: [
      "Como estruturar sua agência de IA do zero",
      "Como construir sua oferta",
      "Como definir seus preços",
      "Até sobre abertura de CNPJ eu falo",
    ],
  },
  {
    title: "Desenvolvimento",
    bullets: [
      "Como desenvolver seu agente de IA completo",
      "Como criar integrações",
      "Como usar a ferramenta certa da forma certa",
      "Como entregar qualidade com eficiência",
    ],
  },
  {
    title: "Vendas",
    bullets: [
      "Como atrair seus primeiros clientes",
      "Como fazer a qualificação correta",
      "Como montar suas reuniões de vendas",
      "Como converter potenciais clientes",
      "Como fazer follow-ups eficazes",
    ],
  },
  {
    title: "Pós-venda",
    bullets: [
      "Como fazer o onboarding",
      "Como coletar o que é essencial",
      "Como cuidar do suporte",
      "Como manter clientes e gerar recorrência",
    ],
  },
];

const depoimentos = [
  { src: "/zero-aos-10k/depoimento-1.jpg", width: 439, height: 640 },
  { src: "/zero-aos-10k/depoimento-2.jpg", width: 640, height: 339 },
  { src: "/zero-aos-10k/depoimento-3.jpg", width: 640, height: 492 },
  { src: "/zero-aos-10k/depoimento-4.jpg", width: 640, height: 603 },
  { src: "/zero-aos-10k/depoimento-5.jpg", width: 640, height: 350 },
  { src: "/zero-aos-10k/depoimento-6.jpg", width: 640, height: 309 },
];

const ofertaItens = [
  "Método completo de estruturação da agência",
  "Passo a passo de desenvolvimento de agentes",
  "Sistema de vendas validado na prática",
  "Processos de pós-venda e suporte",
  "Acesso vitalício ao conteúdo",
  "Atualizações futuras incluídas",
];

export default function ZeroAosDezK() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/10">
        <Container className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="inline-flex items-center gap-2.5">
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
                Do Zero aos 10K
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </Link>
          <div className="hidden sm:block">
            <CTAButton href={ZERO_AOS_10K_CHECKOUT_LINK} external size="md">
              Quero começar agora
            </CTAButton>
          </div>
        </Container>
      </header>

      <main>
        {/* Hero */}
        <Section>
          <Reveal className="max-w-3xl mx-auto text-center">
            <Eyebrow>Do Zero aos 10K com Agentes de IA</Eyebrow>
            <p className="text-muted leading-relaxed text-base sm:text-lg mb-2">
              Entenda como você vai sair do 0 e chegar aos primeiros{" "}
              <span className="text-accent font-semibold">R$10k / mês</span> em
              algumas semanas vendendo Agentes de IA
            </p>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-balance mt-6 mb-8">
              Qualquer pessoa pode faturar seus primeiros{" "}
              <span className="text-accent">R$10 mil</span> por mês vendendo
              Agentes de IA. Mesmo sem saber programar. Mesmo começando do
              absoluto zero. Mesmo que você nunca tenha vendido nada na vida.
            </h1>
          </Reveal>

          <Reveal delay={80} className="max-w-2xl mx-auto flex flex-col gap-5 text-muted leading-relaxed text-base sm:text-[17px]">
            <p>
              Você sente que todo mundo já está ganhando dinheiro com
              Inteligência Artificial... menos você?
            </p>
            <p>
              O mercado está explodindo. Você vê gente faturando com
              automações, construindo agências, fechando clientes. Mas quando
              tenta entender como entrar, parece um labirinto — mil
              ferramentas, mil promessas e nenhuma direção clara.
            </p>
            <p>
              E é exatamente por isso que tanta gente boa trava. Ou começa do
              jeito errado e acaba desistindo no meio do caminho.
            </p>
            <div>
              <p className="text-text font-semibold mb-3">
                Se você se encaixa em uma dessas situações, esse conteúdo é
                pra você:
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">→</span>
                  Quer entrar no mercado de IA e automações, mas não sabe por
                  onde começar
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">→</span>
                  Já até começou, sabe usar o n8n ou outras ferramentas, mas
                  ainda não sabe vender e mal viu a cor da grana
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">→</span>
                  Está cansado de ver promessas milagrosas que não funcionam na
                  prática
                </li>
              </ul>
            </div>
            <p>
              A verdade é que ainda dá pra entrar agora. Dá pra construir um
              negócio de IA sólido. E dá pra estar faturando{" "}
              <span className="text-text font-semibold">R$10 mil por mês</span>{" "}
              de forma relativamente rápida — desde que você tenha um{" "}
              <span className="text-accent font-semibold">plano simples</span>{" "}
              que funciona.
            </p>
          </Reveal>

          <Reveal delay={120} className="flex justify-center mt-10">
            <CTAButton href={ZERO_AOS_10K_CHECKOUT_LINK} external size="lg">
              Quero começar agora
            </CTAButton>
          </Reveal>
        </Section>

        {/* Lucas Magalhães */}
        <Section divider className="bg-tint">
          <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-start">
            <Reveal>
              <Eyebrow>Prazer, meu nome é</Eyebrow>
              <SectionTitle className="mb-6">Lucas Magalhães</SectionTitle>
              <div className="flex flex-col gap-4 text-muted leading-relaxed text-base">
                <p>
                  Sou cofundador do{" "}
                  <span className="text-text font-semibold">Revolução AI</span>
                  , uma das maiores agências de IA e automações do Brasil.
                </p>
                <p>
                  Trabalho com isso desde{" "}
                  <span className="text-text font-semibold">2023</span>.
                  Atualmente tenho faturamento de{" "}
                  <span className="text-text font-semibold">6 dígitos</span> e
                  já atendi mais de{" "}
                  <span className="text-text font-semibold">90 clientes</span>{" "}
                  na minha agência.
                </p>
                <p>Mas eu já estive exatamente onde você está agora.</p>
                <p>
                  Queria entrar nesse mercado, via gente faturando, mas não
                  sabia por onde começar. Fiquei meses quebrando a cabeça com
                  ferramentas complexas, ligando pra empresas sem saber o que
                  falar, sem fechar um único cliente.
                </p>
                <p className="text-text font-semibold">
                  Levei 6 meses pra ter meus primeiros 2 clientes.
                </p>
                <p>
                  Até que descobri um caminho mais rápido, mais simples e mais
                  lucrativo. Foi aí que meu jogo mudou.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/zero-aos-10k/lucas.jpg"
                  alt="Lucas Magalhães"
                  width={640}
                  height={640}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-muted-2 text-sm mt-3">
                Lucas Magalhães — cofundador do Revolução AI
              </p>
            </Reveal>
          </div>
        </Section>

        {/* Por que tanta gente trava */}
        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>O obstáculo</Eyebrow>
            <SectionTitle>Por que tanta gente trava.</SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              A maioria das pessoas que quer faturar com IA trava por dois
              motivos:
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {motivos.map((motivo, index) => (
              <Reveal key={motivo.number} delay={index * 100}>
                <PillarCard
                  number={motivo.number}
                  title={motivo.title}
                  description={motivo.description}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* As 2 premissas */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>O caminho</Eyebrow>
            <SectionTitle>As 2 premissas.</SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Chegar aos R$10 mil por mês não é complicado quando você entende
              as duas premissas certas.
            </p>
          </Reveal>

          <Reveal className="max-w-3xl mx-auto mb-10">
            <h3 className="text-lg font-bold mb-3">
              Premissa 1: a ferramenta ideal
            </h3>
            <div className="flex flex-col gap-4 text-muted leading-relaxed">
              <p>
                Descobri que o segredo não é dominar 15 ferramentas
                diferentes. É usar a ferramenta certa que te faz entregar
                rápido e bem — no nosso caso, a ferramenta que escolhemos
                utilizar se chama ChatFlux.
              </p>
              <p>
                Enquanto no n8n você precisa construir tudo do zero — fluxo,
                hospedagem, API, infraestrutura —, essa ferramenta já vem com
                tudo isso pronto.
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  Você não precisa hospedar em VPS.
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  Não precisa configurar API de WhatsApp do zero.
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  Não precisa lidar com quedas e instabilidade.
                </li>
              </ul>
              <p>
                Tudo que você faz é fornecer as instruções pra IA — o script,
                o contexto, a base de dados — e criar as funções e
                integrações. Em algumas horas você tem um agente de IA de
                alta qualidade, conectado ao WhatsApp, funcionando e pronto
                pra atender.
              </p>
              <p>
                <span className="text-text font-semibold">
                  Mas atenção:
                </span>{" "}
                isso não é mágica. Não é escrever um prompt e apertar dois
                botões. Você ainda precisa se dedicar pra construir algo de
                valor real. A diferença é que você faz isso em menos tempo e
                com muito menos dor de cabeça.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-3">
              Premissa 2: saber vender
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Vender não é complicado quando você tem um método. Se baseia em
              3 etapas principais:
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="card-surface rounded-3xl p-6">
                <h4 className="font-bold mb-2">1) Aquisição</h4>
                <p className="text-muted text-sm leading-relaxed mb-3">
                  Atrair pessoas interessadas no seu produto.
                </p>
                <ul className="flex flex-col gap-1.5 text-muted text-sm">
                  <li>— Buscar indicações com pessoas próximas</li>
                  <li>— Prospectar clientes ativamente</li>
                  <li>— Produzir conteúdo nas redes sociais</li>
                </ul>
              </div>
              <div className="card-surface rounded-3xl p-6">
                <h4 className="font-bold mb-2">2) Qualificação</h4>
                <p className="text-muted text-sm leading-relaxed">
                  Entender se são o perfil de cliente ideal — muita gente pula
                  isso e perde tempo com quem nunca vai fechar.
                </p>
              </div>
              <div className="card-surface rounded-3xl p-6">
                <h4 className="font-bold mb-2">3) Conversão</h4>
                <p className="text-muted text-sm leading-relaxed mb-3">
                  Transformar interessados em clientes.
                </p>
                <ul className="flex flex-col gap-1.5 text-muted text-sm">
                  <li>— Entender a dor e o objetivo deles</li>
                  <li>— Mostrar como sua solução resolve</li>
                </ul>
              </div>
            </div>
            <p className="text-muted leading-relaxed mt-6">
              Uma vez que esse processo é entendido e aplicado com
              consistência, as vendas começam a vir.
            </p>
          </Reveal>
        </Section>

        {/* O que você vai aprender */}
        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>O treinamento</Eyebrow>
            <SectionTitle>O que você vai aprender.</SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              No treinamento <span className="text-text font-semibold">Do Zero aos 10K</span>, eu abro literalmente tudo.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {aprendizado.map((bloco, index) => (
              <Reveal
                key={bloco.title}
                delay={index * 80}
                className="card-surface rounded-3xl p-7"
              >
                <h3 className="font-black text-lg mb-4 text-accent">
                  {bloco.title}
                </h3>
                <ul className="flex flex-col gap-2 text-muted text-[15px] leading-relaxed">
                  {bloco.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="text-accent shrink-0">—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100} className="text-center mt-10">
            <p className="text-muted leading-relaxed">
              Tudo isso com um plano simples e validado que já funciona na
              prática.
            </p>
          </Reveal>
        </Section>

        {/* Clientes atendidos */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Clientes atendidos</Eyebrow>
            <SectionTitle>
              Empresas de praticamente qualquer setor que você imaginar.
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Clínicas, escritórios de advocacia, escolas, e-commerces,
              prestadores de serviço. É bem provável que você até conheça
              alguns deles.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ClientLogos />
          </Reveal>
        </Section>

        {/* Depoimentos de alunos */}
        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Depoimentos de alunos</Eyebrow>
            <SectionTitle>
              Já ensinamos muita gente a sair do zero.
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Além de atender esses e outras dezenas de clientes, já ensinamos
              muitas pessoas como você a montar sua Agência de IA e
              Automações.
            </p>
          </Reveal>
          <div className="columns-2 lg:columns-3 gap-4 max-w-4xl mx-auto [&>*]:mb-4 [&>*]:break-inside-avoid">
            {depoimentos.map((depoimento, index) => (
              <Reveal key={depoimento.src} delay={index * 60}>
                <Image
                  src={depoimento.src}
                  alt="Depoimento de aluno do treinamento Do Zero aos 10K"
                  width={depoimento.width}
                  height={depoimento.height}
                  className="w-full h-auto rounded-2xl border border-white/10"
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Duas opções */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>A decisão</Eyebrow>
            <SectionTitle>Agora você tem duas opções.</SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Reveal className="card-surface rounded-3xl p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-3">
                Opção 1
              </p>
              <p className="text-muted leading-relaxed">
                Fazer como eu fiz lá no início: entrar sozinho, tentar
                desenvolver seu primeiro agente e ficar meses quebrando a
                cabeça pra construir algo que funcione. Depois, ficar mais
                meses tentando fechar cliente sem ganhar um tostão.
              </p>
              <p className="text-muted leading-relaxed mt-4">
                No meu caso, levei 6 meses pra ter 2 clientes. E muita gente
                desiste antes mesmo de chegar lá.
              </p>
            </Reveal>
            <Reveal delay={100} className="rounded-3xl border border-accent/30 bg-accent-soft p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                Opção 2
              </p>
              <p className="text-muted leading-relaxed">
                Fazer igual a mim, só que atualmente: entender o método
                validado que uso hoje na minha operação de 6 dígitos. O mesmo
                caminho que me levou do zero até onde estou.
              </p>
              <p className="text-muted leading-relaxed mt-4">
                Sem firula. Sem enrolação. Apenas conhecimento prático e
                direto ao ponto.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* Oferta */}
        <Section id="oferta" divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Do Zero aos 10K com Agentes de IA</Eyebrow>
            <SectionTitle>O investimento.</SectionTitle>
          </Reveal>
          <Reveal delay={80} className="max-w-xl mx-auto rounded-3xl border border-accent/20 bg-accent-soft p-8 sm:p-10">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <span className="text-4xl font-black tracking-tight text-accent">
                R$ 37,90
              </span>
              <span className="text-muted font-semibold">
                | Acesso Vitalício
              </span>
            </div>
            <p className="text-muted-2 text-sm mb-6">
              É menos que uma promoção do McDonald&apos;s.
            </p>
            <p className="text-text font-semibold mb-3">O que você leva:</p>
            <ul className="flex flex-col gap-2 mb-8">
              {ofertaItens.map((item) => (
                <li key={item} className="flex gap-3 text-muted text-[15px] leading-relaxed">
                  <span className="text-accent shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-muted leading-relaxed mb-8">
              Se você seguir com dedicação e consistência real, os R$10 mil
              por mês são questão de tempo.
            </p>
            <CTAButton href={ZERO_AOS_10K_CHECKOUT_LINK} external size="lg" className="w-full">
              Garantir minha vaga por R$37,90
            </CTAButton>
            <p className="text-muted-2 text-xs text-center mt-4">
              🔒 Compra segura • acesso imediato
            </p>
          </Reveal>
        </Section>

        {/* Fechamento */}
        <Section divider>
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
            <div className="glow h-[320px] w-[320px] -top-24 left-1/2 -translate-x-1/2" />
            <p className="relative text-muted leading-relaxed max-w-2xl mx-auto mb-2">
              A revolução da IA já começou. Tem muita gente ganhando dinheiro
              de verdade — construindo negócios reais e ajudando empresas
              todos os dias.
            </p>
            <h2 className="relative text-2xl sm:text-3xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-3 mt-6">
              Você vai apenas assistir... ou vai fazer parte disso?
            </h2>
            <p className="relative text-muted leading-relaxed max-w-2xl mx-auto mb-8">
              Eu quero que você faça parte. E vou estar junto nesse processo.
              Vem revolucionar o futuro com a gente — começando do zero aos
              10K.
            </p>
            <div className="relative flex justify-center">
              <CTAButton href={ZERO_AOS_10K_CHECKOUT_LINK} external size="lg">
                Quero começar agora
              </CTAButton>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>Do Zero aos 10K by Revolução AI</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${EMAIL}`} className="hover:text-text transition-colors">
              {EMAIL}
            </a>
            <Link href="/" className="hover:text-text transition-colors">
              revolucao-ai.com
            </Link>
          </div>
        </Container>
      </footer>
    </>
  );
}
