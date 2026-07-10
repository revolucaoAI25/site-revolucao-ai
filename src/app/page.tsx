import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { StatGrid } from "@/components/ui/StatGrid";
import { PillarCard } from "@/components/ui/PillarCard";
import { Timeline } from "@/components/ui/Timeline";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { TechLogos } from "@/components/ui/TechLogos";
import { HeroChatMock } from "@/components/ui/HeroChatMock";
import { InstagramShowcase } from "@/components/ui/InstagramShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { INSTAGRAM_LINK, INSTAGRAM_HANDLE } from "@/lib/links";

export default function Home() {
  return (
    <>
      {/* 5.1 Hero */}
      <Section
        className="pt-16 sm:pt-24 pb-20"
        decor={
          <>
            <div className="absolute inset-0 bg-grid" />
            <div className="glow h-[460px] w-[460px] -top-48 left-1/2 -translate-x-1/2 sm:left-1/3" />
            <HeroChatMock />
          </>
        }
      >
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Desde 2023</Eyebrow>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance leading-[1.05]">
              Desde 2023, revolucionando negócios com Inteligência Artificial.
            </h1>
            <p className="text-base sm:text-lg text-muted mt-6 max-w-2xl leading-relaxed">
              Do conteúdo sobre IA generativa à implementação de agentes que
              vendem por você. Hoje ajudamos negócios a transformarem
              pré-vendas com IA — e ensinamos outras pessoas a construírem uma
              agência de IA de resultado.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <CTAButton flow="agentes" size="lg">
                Quero implementar IA no meu negócio
              </CTAButton>
              <CTAButton flow="formacao" variant="secondary" size="lg">
                Quero construir uma agência de IA
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Tecnologia por trás */}
      <Section divider className="py-14 sm:py-16">
        <Reveal>
          <p className="text-center text-sm text-muted-2 uppercase tracking-widest mb-8">
            Construído com as principais tecnologias de IA e mensageria do mercado
          </p>
          <TechLogos />
        </Reveal>
      </Section>

      {/* 5.2 Nossa trajetória */}
      <Section divider>
        <div className="grid lg:grid-cols-[1fr_300px] gap-x-12 gap-y-12 items-start mb-16">
          <div>
            <Reveal>
              <Eyebrow>Nossa trajetória</Eyebrow>
              <SectionTitle className="mb-6 max-w-2xl">
                De uma newsletter sobre IA generativa a uma operação real de
                pré-vendas.
              </SectionTitle>
            </Reveal>
            <Reveal delay={80} className="max-w-3xl text-muted leading-relaxed space-y-4 text-base">
              <p>
                Começamos em 2023 criando conteúdo sobre Inteligência Artificial
                generativa no Instagram e no TikTok — e lançamos a primeira
                newsletter de IA generativa do Brasil. Nessa fase, ajudamos o
                mercado brasileiro a entender um tema que ainda estava começando
                a se popularizar por aqui.
              </p>
              <p>
                De lá pra cá, passamos por consultorias, palestras e workshops,
                entrando cada vez mais em projetos de automação e entregas
                operacionais reais. Entre 2024 e 2025, esse caminho foi se
                afunilando até nos especializarmos em algo muito mais concreto:
                agentes de IA para pré-vendas.
              </p>
              <p>
                Foi ali, na prática, vendendo e entregando para clientes reais,
                que validamos tudo o que hoje aplicamos com nossos clientes e
                ensinamos para quem quer trilhar um caminho parecido.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120} className="flex flex-col items-center gap-5">
            <InstagramShowcase />
            <CTAButton href={INSTAGRAM_LINK} external variant="secondary" icon={false}>
              Seguir {INSTAGRAM_HANDLE}
            </CTAButton>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <Timeline
            items={[
              {
                period: "2023",
                title: "Conteúdo sobre IA generativa",
                description:
                  "Instagram, TikTok e a primeira newsletter de IA generativa do Brasil.",
              },
              {
                period: "2024–2025",
                title: "Especialização em agentes",
                description:
                  "Consultorias, palestras e workshops até o foco se afunilar em agentes de IA para pré-vendas.",
              },
              {
                period: "Hoje",
                title: "Implementação + formação",
                description:
                  "Agência de implementação de agentes de IA e formação para quem quer construir a própria agência.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* 5.3 O problema que resolvemos */}
      <Section divider>
        <Reveal className="max-w-3xl">
          <Eyebrow>O problema</Eyebrow>
          <SectionTitle className="mb-6">
            O gargalo não é tráfego. É pré-vendas.
          </SectionTitle>
          <p className="text-base text-muted leading-relaxed mb-4">
            A maioria dos negócios que investe em tráfego e geração de leads
            esbarra no mesmo gargalo: o lead chega, mas a resposta demora, é
            inconsistente ou depende de uma pessoa disponível no momento
            certo. Isso significa oportunidade perdida — não por falta de
            demanda, mas por falta de estrutura no pré-vendas.
          </p>
          <p className="text-base text-muted leading-relaxed">
            É exatamente nesse ponto que entramos: não vendemos mais tráfego,
            vendemos{" "}
            <span className="text-text font-semibold">
              mais aproveitamento do tráfego que você já tem
            </span>
            , transformando leads parados em reuniões agendadas.
          </p>
        </Reveal>
      </Section>

      {/* 5.4 O que fazemos hoje */}
      <Section divider className="bg-tint">
        <Reveal>
          <Eyebrow>O que fazemos hoje</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Duas frentes, um mesmo método validado na prática.
          </SectionTitle>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal delay={80} className="card-surface card-hover rounded-3xl p-8 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Agência de implementação
            </p>
            <h3 className="text-xl font-bold mb-4">
              Agentes de IA para Pré-Vendas
            </h3>
            <p className="text-muted leading-relaxed mb-8 flex-1">
              Implementamos agentes de IA no WhatsApp que recebem, qualificam
              e conduzem seus leads até o agendamento — com infraestrutura
              conectada à sua operação e inteligência comercial por trás.
              Preferência por escritórios de advocacia, mas atuamos em
              qualquer negócio que recebe leads e precisa de mais velocidade e
              consistência no pré-vendas.
            </p>
            <Link
              href="/agentes-de-ia"
              className="group inline-flex items-center gap-2 font-semibold text-accent"
            >
              Conhecer a solução
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>

          <Reveal delay={160} className="card-surface card-hover rounded-3xl p-8 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Formação
            </p>
            <h3 className="text-xl font-bold mb-4">
              Formação para Agências de IA
            </h3>
            <p className="text-muted leading-relaxed mb-8 flex-1">
              Ensinamos, a partir da experiência real de quem construiu e
              escalou uma agência de IA, como estruturar oferta, entrega e
              vendas para faturar com IA de forma previsível — seja você
              iniciante ou alguém que já tem operação e quer escalar.
            </p>
            <Link
              href="/formacao"
              className="group inline-flex items-center gap-2 font-semibold text-accent"
            >
              Conhecer a formação
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 5.5 Prova (números institucionais) */}
      <Section divider>
        <Reveal>
          <StatGrid
            stats={[
              { value: "2,5x", label: "de ROI nos 3 primeiros meses" },
              {
                value: "20–25%",
                label: "de conversão de agendamentos de leads qualificados",
              },
              {
                value: "20%",
                label: "de taxa média de resposta em follow-ups",
              },
              {
                value: "até 50%",
                label:
                  "a mais de faturamento comparado à qualificação por landing page",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* 5.6 Os 3 pilares */}
      <Section divider>
        <Reveal>
          <Eyebrow>Como funciona</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Os 3 pilares por trás de cada resultado.
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Reveal delay={80}>
            <PillarCard
              number="01"
              title="Agente de IA"
              description="O coração da operação, conduzindo cada conversa com velocidade, consistência e humanização."
            />
          </Reveal>
          <Reveal delay={140}>
            <PillarCard
              number="02"
              title="Infraestrutura"
              description="Conectando o agente à sua operação real: CRM, agenda, dashboard, mensageria."
            />
          </Reveal>
          <Reveal delay={200}>
            <PillarCard
              number="03"
              title="Inteligência Comercial"
              description="O script, o funil e a lógica de qualificação por trás de cada resultado."
            />
          </Reveal>
        </div>
        <p className="text-base text-muted leading-relaxed max-w-2xl">
          Não entregamos só tecnologia. Entregamos os três juntos — porque é
          a combinação deles que gera o resultado.
        </p>
      </Section>

      {/* 5.7 Por que confiar */}
      <Section divider className="bg-tint">
        <Reveal className="max-w-3xl">
          <Eyebrow>Por que confiar no Revolução AI</Eyebrow>
          <p className="text-base text-muted leading-relaxed">
            Não somos uma empresa nova testando um mercado quente. Construímos
            nossa própria operação com os mesmos princípios que aplicamos nos
            clientes, atravessamos a curva de aprendizado antes de vender a
            solução, e hoje trabalhamos com negócios de portes muito
            diferentes — de franquias com centenas de unidades a escritórios
            de advocacia e clínicas independentes — sempre com o mesmo
            racional:{" "}
            <span className="text-text font-semibold">
              diagnóstico do funil, implementação e acompanhamento de
              resultado
            </span>
            , não apenas ativação de uma ferramenta.
          </p>
        </Reveal>
      </Section>

      {/* Client logos */}
      <Section divider className="py-14 sm:py-16">
        <Reveal>
          <p className="text-center text-sm text-muted-2 uppercase tracking-widest mb-8">
            Empresas que já confiaram no Revolução AI
          </p>
          <ClientLogos />
        </Reveal>
      </Section>

      {/* 5.8 FAQ */}
      <Section divider>
        <Reveal>
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Antes de conversar com a gente
          </SectionTitle>
        </Reveal>
        <Reveal delay={100} className="max-w-3xl">
          <FAQAccordion
            items={[
              {
                question: "O Revolução AI é uma empresa de chatbot?",
                answer:
                  "Não. Chatbot responde perguntas soltas. Nós implementamos uma solução comercial completa — agente, infraestrutura e inteligência comercial juntos, desenhada para gerar agendamento e conversão.",
              },
              {
                question: "Vocês atendem qualquer tipo de negócio?",
                answer:
                  "Atendemos negócios que recebem leads via tráfego ou indicação e precisam de mais velocidade e consistência no pré-vendas. Hoje priorizamos escritórios de advocacia, mas seguimos atendendo outros nichos aderentes.",
              },
              {
                question:
                  "Além da implementação, vocês também ensinam a fazer isso?",
                answer:
                  "Sim. Além da agência, temos uma frente de formação para quem quer construir ou escalar uma agência de IA própria.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* 5.9 CTA final */}
      <Section divider>
        <Reveal
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center"
        >
          <div className="glow h-[320px] w-[320px] -top-24 left-1/2 -translate-x-1/2" />
          <h2 className="relative text-2xl sm:text-3xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-8">
            Quer implementar IA na sua operação ou aprender a construir a sua
            própria agência?
          </h2>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton flow="agentes" size="lg">
              Quero implementar IA no meu negócio
            </CTAButton>
            <CTAButton flow="formacao" variant="secondary" size="lg">
              Quero construir uma agência de IA
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
