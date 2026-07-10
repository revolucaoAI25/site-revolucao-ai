import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { StatGrid } from "@/components/ui/StatGrid";
import { PillarCard } from "@/components/ui/PillarCard";
import { Timeline } from "@/components/ui/Timeline";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ClientLogos } from "@/components/ui/ClientLogos";

export default function Home() {
  return (
    <>
      {/* 5.1 Hero */}
      <Section className="pt-14 sm:pt-20 pb-20">
        <div className="max-w-3xl">
          <Eyebrow>Desde 2023</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-balance leading-[1.05]">
            Desde 2023, revolucionando negócios com Inteligência Artificial.
          </h1>
          <p className="text-lg sm:text-xl text-muted mt-6 max-w-2xl leading-relaxed">
            Do conteúdo sobre IA generativa à implementação de agentes que
            vendem por você. Hoje ajudamos negócios a transformarem
            pré-vendas com IA — e ensinamos outras pessoas a construírem uma
            agência de IA de resultado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <CTAButton flow="agentes" size="lg">
              Quero implementar IA no meu negócio
            </CTAButton>
            <CTAButton flow="formacao" variant="secondary" size="lg">
              Quero construir uma agência de IA
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* 5.2 Nossa trajetória */}
      <Section className="border-t border-white/10">
        <Eyebrow>Nossa trajetória</Eyebrow>
        <SectionTitle className="mb-6 max-w-2xl">
          De uma newsletter sobre IA generativa a uma operação real de
          pré-vendas.
        </SectionTitle>
        <div className="max-w-3xl text-muted leading-relaxed space-y-4 mb-12 text-lg">
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
            Levamos nossa própria agência a{" "}
            <span className="text-accent font-semibold">
              R$100 mil de faturamento mensal com uma equipe enxuta
            </span>{" "}
            — e foi ali, na prática, vendendo e entregando para clientes
            reais, que validamos tudo o que hoje aplicamos com nossos
            clientes e ensinamos para quem quer trilhar um caminho parecido.
          </p>
        </div>
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
      </Section>

      {/* 5.3 O problema que resolvemos */}
      <Section className="border-t border-white/10">
        <div className="max-w-3xl">
          <Eyebrow>O problema</Eyebrow>
          <SectionTitle className="mb-6">
            O gargalo não é tráfego. É pré-vendas.
          </SectionTitle>
          <p className="text-lg text-muted leading-relaxed mb-4">
            A maioria dos negócios que investe em tráfego e geração de leads
            esbarra no mesmo gargalo: o lead chega, mas a resposta demora, é
            inconsistente ou depende de uma pessoa disponível no momento
            certo. Isso significa oportunidade perdida — não por falta de
            demanda, mas por falta de estrutura no pré-vendas.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            É exatamente nesse ponto que entramos: não vendemos mais tráfego,
            vendemos{" "}
            <span className="text-text font-semibold">
              mais aproveitamento do tráfego que você já tem
            </span>
            , transformando leads parados em reuniões agendadas.
          </p>
        </div>
      </Section>

      {/* 5.4 O que fazemos hoje */}
      <Section className="border-t border-white/10">
        <Eyebrow>O que fazemos hoje</Eyebrow>
        <SectionTitle className="mb-10 max-w-2xl">
          Duas frentes, um mesmo método validado na prática.
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-surface p-8 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Agência de implementação
            </p>
            <h3 className="text-2xl font-bold mb-4">
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
              className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all"
            >
              Conhecer a solução →
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-surface p-8 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Formação
            </p>
            <h3 className="text-2xl font-bold mb-4">
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
              className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all"
            >
              Conhecer a formação →
            </Link>
          </div>
        </div>
      </Section>

      {/* 5.5 Prova (números institucionais) */}
      <Section className="border-t border-white/10">
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
      </Section>

      {/* 5.6 Os 3 pilares */}
      <Section className="border-t border-white/10">
        <Eyebrow>Como funciona</Eyebrow>
        <SectionTitle className="mb-10 max-w-2xl">
          Os 3 pilares por trás de cada resultado.
        </SectionTitle>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <PillarCard
            number="01"
            title="Agente de IA"
            description="O coração da operação, conduzindo cada conversa com velocidade, consistência e humanização."
          />
          <PillarCard
            number="02"
            title="Infraestrutura"
            description="Conectando o agente à sua operação real: CRM, agenda, dashboard, mensageria."
          />
          <PillarCard
            number="03"
            title="Inteligência Comercial"
            description="O script, o funil e a lógica de qualificação por trás de cada resultado."
          />
        </div>
        <p className="text-lg text-muted leading-relaxed max-w-2xl">
          Não entregamos só tecnologia. Entregamos os três juntos — porque é
          a combinação deles que gera o resultado.
        </p>
      </Section>

      {/* 5.7 Por que confiar */}
      <Section className="border-t border-white/10">
        <div className="max-w-3xl">
          <Eyebrow>Por que confiar no Revolução AI</Eyebrow>
          <p className="text-lg text-muted leading-relaxed">
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
        </div>
      </Section>

      {/* Client logos */}
      <Section className="border-t border-white/10 py-14 sm:py-16">
        <p className="text-center text-sm text-muted mb-8">
          Empresas que já confiaram no Revolução AI
        </p>
        <ClientLogos />
      </Section>

      {/* 5.8 FAQ */}
      <Section className="border-t border-white/10">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <SectionTitle className="mb-10 max-w-2xl">
          Antes de conversar com a gente
        </SectionTitle>
        <div className="max-w-3xl">
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
        </div>
      </Section>

      {/* 5.9 CTA final */}
      <Section className="border-t border-white/10">
        <div className="rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-8">
            Quer implementar IA na sua operação ou aprender a construir a sua
            própria agência?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton flow="agentes" size="lg">
              Quero implementar IA no meu negócio
            </CTAButton>
            <CTAButton flow="formacao" variant="secondary" size="lg">
              Quero construir uma agência de IA
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
