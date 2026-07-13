import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { HeroChatMock } from "@/components/ui/HeroChatMock";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Formação para Agências de IA",
  description:
    "Aprenda a construir ou escalar uma agência de IA lucrativa e previsível, com o método validado na prática pelo Revolução AI.",
};

export default function Formacao() {
  return (
    <>
      {/* 7.1 Hero */}
      <Section
        className="pt-16 sm:pt-24 pb-16"
        decor={
          <>
            <div className="absolute inset-0 bg-grid" />
            <div className="glow h-[420px] w-[420px] -top-40 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-1/4" />
            <HeroChatMock
              badge="RA"
              title="Mentoria Revolução AI"
              subtitle="ativa agora"
              messages={[
                { from: "lead", text: "Acabei de fechar meu primeiro contrato: R$12 mil 🚀" },
                {
                  from: "agent",
                  text: "Mandou bem! Essa é exatamente a régua que ensinamos aqui 👏",
                },
                { from: "lead", text: "Como estruturo a entrega agora?" },
                {
                  from: "agent",
                  text: "Vou te passar o checklist certinho. Bora escalar isso.",
                },
              ]}
            />
          </>
        }
      >
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Formação</Eyebrow>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance leading-[1.05]">
              Aprenda a construir — ou escalar — uma agência de IA lucrativa e
              previsível.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <CTAButton flow="formacao" size="lg">
                Quero construir uma agência de IA
              </CTAButton>
              <CTAButton flow="formacao" variant="secondary" size="lg">
                Quero escalar minha agência
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7.2 A oportunidade */}
      <Section divider>
        <Reveal className="max-w-3xl">
          <Eyebrow>A oportunidade</Eyebrow>
          <SectionTitle className="mb-6">
            Geramos resultado. E ensinamos você a vender e entregar com o
            mesmo padrão.
          </SectionTitle>
          <p className="text-base text-muted leading-relaxed mb-6">
            O mercado de IA e automações está em plena expansão, e a
            oportunidade é grande — não só pra quem entende de tecnologia,
            mas pra quem sabe vender e entregar com qualidade. Seja você
            alguém migrando de outro mercado, como gestão de tráfego, pra
            começar a vender IA, alguém que já tem agência e quer mais
            resultado, ou alguém que já sabe construir agentes e automações
            mas ainda não sabe vender: o caminho que ensinamos já foi
            validado na prática, com clientes reais.
          </p>
          <ul className="space-y-4 mb-6">
            <li className="flex gap-3 text-base text-muted leading-relaxed">
              <span className="text-accent shrink-0">—</span>
              Vendemos diferente do resto do mercado: implementação
              high-ticket, não commodity de curso barato ou serviço batido
              por preço.
            </li>
            <li className="flex gap-3 text-base text-muted leading-relaxed">
              <span className="text-accent shrink-0">—</span>
              Processo de entrega validado com dezenas de clientes reais, do
              diagnóstico ao contrato fechado.
            </li>
            <li className="flex gap-3 text-base text-muted leading-relaxed">
              <span className="text-accent shrink-0">—</span>
              Pioneirismo: testamos e validamos esse modelo antes da maioria
              do mercado, na prática.
            </li>
          </ul>
          <p className="text-base text-muted leading-relaxed">
            É esse caminho — com{" "}
            <span className="text-text font-semibold">
              resultado real, não só teoria de processo
            </span>{" "}
            — que ensinamos pra quem está construindo ou escalando a própria
            agência de IA, aproveitando uma oportunidade que só cresce.
          </p>
        </Reveal>
      </Section>

      {/* 7.3 Quem está por trás */}
      <Section divider className="bg-tint">
        <Reveal>
          <Eyebrow>Quem está por trás disso</Eyebrow>
          <SectionTitle className="mb-6 max-w-2xl">
            João Vitor e Lucas, fundadores do Revolução AI.
          </SectionTitle>
        </Reveal>
        <Reveal delay={80} className="max-w-3xl text-muted leading-relaxed space-y-4 text-base mb-12">
          <p>
            Somos João Vitor e Lucas, fundadores do Revolução AI — uma das
            primeiras agências de IA do Brasil. Começamos em 2023 criando
            conteúdo sobre Inteligência Artificial generativa, e desde
            então estruturamos projetos reais em advocacia, saúde, estética,
            software, franquias, varejo e infoprodutos. Levamos nossa
            própria agência a{" "}
            <span className="text-accent font-semibold">
              R$100 mil de faturamento mensal com uma equipe enxuta
            </span>{" "}
            — e foi essa operação real, vendendo e entregando para clientes
            de verdade, que validou tudo o que ensinamos hoje.
          </p>
          <p>
            Não ensinamos teoria de curso gravado sem aplicação prática.
            Ensinamos o que fizemos — e continuamos fazendo — com clientes
            reais, todos os dias.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
            Já trabalhamos com nomes como
          </p>
          <ClientLogos />
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 mt-10 max-w-3xl text-muted leading-relaxed">
          <p>
            <span className="text-text font-semibold">Bubble Box</span> —
            franqueadora com mais de 250 unidades no Brasil
          </p>
          <p>
            <span className="text-text font-semibold">Casoca</span> —
            plataforma para arquitetos e designers, +300 mil profissionais
            cadastrados
          </p>
          <p>
            <span className="text-text font-semibold">
              Patrícia Davidson
            </span>{" "}
            — nutricionista influencer, +3 milhões de seguidores
          </p>
          <p>
            <span className="text-text font-semibold">
              Marcondes Madureira Advogados
            </span>{" "}
            — escritório de Direito de Família, +380 mil seguidores
          </p>
          <p>
            <span className="text-text font-semibold">
              Guedes & Cruz Advogados
            </span>{" "}
            — escritório de advocacia bancária, alto volume de leads
          </p>
          <p>
            <span className="text-text font-semibold">Guilherme Vazan</span>{" "}
            — infoprodutor de impressão 3D, +5 mil alunos
          </p>
        </div>

        <p className="text-base text-muted leading-relaxed mt-10 max-w-3xl">
          Contratos fechados com essa metodologia:{" "}
          <span className="text-accent font-semibold">
            R$10 mil, R$12 mil, R$15 mil, R$20 mil e R$25 mil
          </span>{" "}
          — com empresas reais, sem precisar ser o mais barato do mercado.
        </p>
      </Section>

      {/* 7.4 Direcionamento por estágio */}
      <Section divider>
        <Reveal>
          <Eyebrow>Escolha seu caminho</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Nossa forma de ensinar muda dependendo de onde você está.
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          <Reveal delay={80} className="card-surface card-hover rounded-3xl p-8 flex flex-col">
            <span className="mb-4 inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Estou começando agora
            </span>
            <p className="text-muted leading-relaxed mb-8 flex-1">
              Ainda não tenho uma agência ou operação no digital, quero
              aprender do zero — desde como estruturar uma oferta até como
              fechar meus primeiros contratos.
            </p>
            <CTAButton flow="formacao">
              Quero começar minha agência
            </CTAButton>
          </Reveal>

          <Reveal delay={160} className="card-surface card-hover rounded-3xl p-8 flex flex-col">
            <span className="mb-4 inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Já tenho operação
            </span>
            <p className="text-muted leading-relaxed mb-8 flex-1">
              Já tenho agência de IA/automações ou operação no digital, já
              vendo, mas preciso de mais estrutura, processo ou ticket para
              escalar.
            </p>
            <CTAButton flow="formacao" variant="secondary">
              Quero escalar minha agência
            </CTAButton>
          </Reveal>
        </div>
      </Section>

      {/* 7.5 O que você aprende */}
      <Section divider>
        <Reveal>
          <Eyebrow>O que você aprende</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Conteúdo direto ao ponto, para cada estágio.
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          <Reveal delay={80} className="card-surface card-hover rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-5">
              Se você está começando
            </h3>
            <ul className="space-y-3">
              {[
                "Como estruturar uma oferta que vende, mesmo começando do zero",
                "Como montar tecnicamente seu primeiro agente de IA",
                "Como prospectar e fechar seus primeiros clientes",
                "Como precificar seu serviço sem ser o mais barato do mercado",
                "Como estruturar sua operação para crescer com previsibilidade",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="card-surface card-hover rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-5">
              Se você já tem operação
            </h3>
            <ul className="space-y-3">
              {[
                "Como estruturar uma entrega validada, com padrão de qualidade e velocidade",
                "Como aumentar seu ticket médio e fechar contratos high ticket",
                "Como resolver seu principal gargalo atual — geração de leads, vendas ou entrega",
                "Acompanhamento próximo com quem já passou pelos mesmos desafios na prática",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 7.6 Por que aprender com o Revolução AI */}
      <Section divider className="bg-tint">
        <Reveal className="max-w-3xl">
          <Eyebrow>Por que aprender com o Revolução AI</Eyebrow>
          <p className="text-base text-muted leading-relaxed">
            Construímos um{" "}
            <span className="text-text font-semibold">negócio de verdade</span>
            , com processo, previsibilidade e clientes reais, em vez de ficar
            preso à lógica de freelancer que vive de projeto em projeto. Foi
            nesse caminho, com os acertos e os erros que cometemos no meio
            dele, que validamos o método que compartilhamos com quem está
            construindo a própria agência de IA.
          </p>
        </Reveal>
      </Section>

      {/* 7.7 FAQ */}
      <Section divider>
        <Reveal>
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Antes de escolher seu caminho
          </SectionTitle>
        </Reveal>
        <Reveal delay={100} className="max-w-3xl">
          <FAQAccordion
            items={[
              {
                question:
                  "Preciso saber programar para construir agentes de IA?",
                answer:
                  "Não. Ensinamos o processo de estruturação, venda e entrega — incluindo o uso de ferramentas que não exigem código.",
              },
              {
                question: "Como funciona o ensino de vocês?",
                answer:
                  "Temos formatos para cada momento: desde um ebook gratuito, passando por curso e mentoria, até uma implementação comercial completa dentro da sua própria agência. Dependendo do cenário em que você estiver, a gente te ajuda a entender qual faz mais sentido.",
              },
              {
                question: "Em quanto tempo consigo ver resultado?",
                answer:
                  "Depende do seu ponto de partida e da sua dedicação — costuma levar de algumas semanas a alguns meses para os primeiros resultados, seguindo o mesmo caminho que usamos para sair do zero a uma agência de seis dígitos.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* 7.8 CTA final */}
      <Section divider>
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
          <div className="glow h-[320px] w-[320px] -top-24 left-1/2 -translate-x-1/2" />
          <h2 className="relative text-2xl sm:text-3xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-8">
            Escolha o caminho que faz sentido pra você agora
          </h2>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton flow="formacao" size="lg">
              Quero construir uma agência de IA
            </CTAButton>
            <CTAButton flow="formacao" variant="secondary" size="lg">
              Quero escalar minha agência
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
