import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { CURSO_LINK, AGENDAR_CONVERSA_LINK } from "@/lib/links";

export const metadata: Metadata = {
  title: "Formação para Agências de IA",
  description:
    "Aprenda a construir ou escalar uma agência de IA lucrativa e previsível, com o método validado na prática pelo Revolução AI.",
};

export default function Formacao() {
  return (
    <>
      {/* 7.1 Hero */}
      <Section className="pt-14 sm:pt-20 pb-16">
        <div className="max-w-3xl">
          <Eyebrow>Formação</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-balance leading-[1.05]">
            Aprenda a construir — ou escalar — uma agência de IA lucrativa e
            previsível.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href={CURSO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent text-[#04221a] font-semibold px-8 py-4 text-base sm:text-lg hover:bg-accent-dark transition-colors"
            >
              Conhecer o curso Do 0 aos 10K
            </Link>
            <Link
              href={AGENDAR_CONVERSA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base sm:text-lg font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Agendar conversa com a gente
            </Link>
          </div>
        </div>
      </Section>

      {/* 7.2 O problema */}
      <Section className="border-t border-white/10">
        <div className="max-w-3xl">
          <Eyebrow>O problema</Eyebrow>
          <SectionTitle className="mb-6">
            A maioria falha por processo, não por técnica.
          </SectionTitle>
          <p className="text-lg text-muted leading-relaxed mb-6">
            O mercado de IA e automações cresceu rápido — e a maioria de
            quem tenta empreender nele falha, não por falta de habilidade
            técnica, mas por erros que se repetem:
          </p>
          <ul className="space-y-4 mb-6">
            <li className="flex gap-3 text-lg text-muted leading-relaxed">
              <span className="text-accent shrink-0">—</span>
              Tentar fazer todo tipo de projeto, sem foco em uma oferta
              clara — cada cliente vira uma aventura nova, sem repetição e
              sem processo.
            </li>
            <li className="flex gap-3 text-lg text-muted leading-relaxed">
              <span className="text-accent shrink-0">—</span>
              Achar que o problema é falta de demanda, quando na verdade é
              falta de processo comercial — prospecção, proposta,
              precificação e fechamento.
            </li>
            <li className="flex gap-3 text-lg text-muted leading-relaxed">
              <span className="text-accent shrink-0">—</span>
              Aprender tecnologia antes de definir o que vender — o caminho
              mais longo e mais frustrante para começar.
            </li>
          </ul>
          <p className="text-lg text-muted leading-relaxed">
            Se você já esbarrou em algum desses pontos, o problema não é
            você —{" "}
            <span className="text-text font-semibold">
              é a falta de um caminho estruturado, validado na prática.
            </span>
          </p>
        </div>
      </Section>

      {/* 7.3 Quem está por trás */}
      <Section className="border-t border-white/10">
        <Eyebrow>Quem está por trás disso</Eyebrow>
        <SectionTitle className="mb-6 max-w-2xl">
          João Vitor e Lucas, fundadores do Revolução AI.
        </SectionTitle>
        <div className="max-w-3xl text-muted leading-relaxed space-y-4 text-lg mb-10">
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
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
          Já trabalhamos com nomes como
        </p>
        <ClientLogos />

        <div className="grid sm:grid-cols-2 gap-4 mt-8 max-w-3xl text-muted leading-relaxed">
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

        <p className="text-lg text-muted leading-relaxed mt-8 max-w-3xl">
          Contratos fechados com essa metodologia:{" "}
          <span className="text-accent font-semibold">
            R$10 mil, R$12 mil, R$15 mil, R$20 mil e R$25 mil
          </span>{" "}
          — com empresas reais, sem precisar ser o mais barato do mercado.
        </p>
      </Section>

      {/* 7.4 Direcionamento por estágio */}
      <Section className="border-t border-white/10">
        <Eyebrow>Escolha seu caminho</Eyebrow>
        <SectionTitle className="mb-10 max-w-2xl">
          Nossa forma de ensinar muda dependendo de onde você está.
        </SectionTitle>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-surface p-8 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Estou começando agora
            </p>
            <p className="text-muted leading-relaxed mb-8 flex-1">
              Ainda não tenho uma agência ou operação no digital, quero
              aprender do zero — desde como estruturar uma oferta até como
              fechar meus primeiros contratos.
            </p>
            <Link
              href={CURSO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent text-[#04221a] font-semibold px-6 py-3.5 hover:bg-accent-dark transition-colors"
            >
              Conhecer o curso Do 0 aos 10K
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-surface p-8 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Já tenho operação
            </p>
            <p className="text-muted leading-relaxed mb-8 flex-1">
              Já tenho agência de IA/automações ou operação no digital, já
              vendo, mas preciso de mais estrutura, processo ou ticket para
              escalar.
            </p>
            <Link
              href={AGENDAR_CONVERSA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Agendar conversa com a gente
            </Link>
          </div>
        </div>
      </Section>

      {/* 7.5 O que você aprende */}
      <Section className="border-t border-white/10">
        <Eyebrow>O que você aprende</Eyebrow>
        <SectionTitle className="mb-10 max-w-2xl">
          Conteúdo direto ao ponto, para cada estágio.
        </SectionTitle>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-surface p-8">
            <h3 className="text-xl font-bold mb-5">
              Se você está começando (curso Do 0 aos 10K)
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
          </div>

          <div className="rounded-3xl border border-white/10 bg-surface p-8">
            <h3 className="text-xl font-bold mb-5">
              Se você já tem operação (mentoria)
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
          </div>
        </div>
      </Section>

      {/* 7.6 Por que aprender com o Revolução AI */}
      <Section className="border-t border-white/10">
        <div className="max-w-3xl">
          <Eyebrow>Por que aprender com o Revolução AI</Eyebrow>
          <p className="text-lg text-muted leading-relaxed">
            Não somos os mais técnicos do mercado — e não é isso que faz a
            diferença. A diferença está em ter construído um{" "}
            <span className="text-text font-semibold">negócio de verdade</span>
            , com processo, previsibilidade e clientes reais, em vez de ficar
            preso à lógica de freelancer que vive de projeto em projeto. É
            esse caminho, com os acertos e os erros que cometemos no meio
            dele, que compartilhamos com quem está construindo a própria
            agência.
          </p>
        </div>
      </Section>

      {/* 7.7 FAQ */}
      <Section className="border-t border-white/10">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <SectionTitle className="mb-10 max-w-2xl">
          Antes de escolher seu caminho
        </SectionTitle>
        <div className="max-w-3xl">
          <FAQAccordion
            items={[
              {
                question:
                  "Preciso saber programar para construir agentes de IA?",
                answer:
                  "Não. Ensinamos o processo de estruturação, venda e entrega — incluindo o uso de ferramentas que não exigem código.",
              },
              {
                question: "Qual a diferença entre o curso e a mentoria?",
                answer:
                  "O curso é o caminho mais indicado para quem está começando do zero. A mentoria é mais avançada, personalizada e voltada para quem já tem operação e quer escalar com mais estrutura.",
              },
              {
                question: "Em quanto tempo consigo ver resultado?",
                answer:
                  "Depende do seu ponto de partida e da sua dedicação — mas o caminho ensinado é o mesmo que usamos para sair do zero a uma agência de seis dígitos.",
              },
            ]}
          />
        </div>
      </Section>

      {/* 7.8 CTA final */}
      <Section className="border-t border-white/10">
        <div className="rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-8">
            Escolha o caminho que faz sentido pra você agora
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={CURSO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent text-[#04221a] font-semibold px-8 py-4 text-base sm:text-lg hover:bg-accent-dark transition-colors"
            >
              Conhecer o curso Do 0 aos 10K
            </Link>
            <Link
              href={AGENDAR_CONVERSA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base sm:text-lg font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Agendar conversa com a gente
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
