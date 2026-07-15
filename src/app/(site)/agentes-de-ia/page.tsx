import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { StatGrid } from "@/components/ui/StatGrid";
import { PillarCard } from "@/components/ui/PillarCard";
import { CaseCard } from "@/components/ui/CaseCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { TechLogos } from "@/components/ui/TechLogos";
import { HeroChatMock } from "@/components/ui/HeroChatMock";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: "Agentes de IA para Pré-Vendas",
  description:
    "Agentes de IA no WhatsApp que qualificam, atendem e agendam seus leads no automático, 24 horas por dia.",
};

const gains = [
  {
    title: "Consistência no atendimento",
    description:
      "Seu script de vendas é seguido perfeitamente, sempre, sem variações humanas.",
  },
  {
    title: "Aumento de conversão e vendas",
    description:
      "Respostas rápidas no momento em que o lead está mais quente aumentam o fechamento.",
  },
  {
    title: "Redução de custos operacionais",
    description:
      "Economia de até 80% em tempo e recursos, sem precisar contratar mais gente.",
  },
  {
    title: "Disponibilidade 24/7",
    description:
      "Atendimento ativo todos os dias, inclusive finais de semana e feriados.",
  },
  {
    title: "Operação escalável",
    description:
      "Atenda mais leads sem depender de motivação ou disponibilidade de equipe.",
  },
  {
    title: "Menos dependência humana",
    description:
      "Seu negócio funciona independente de variações de humor ou turnover de time.",
  },
];

const included = [
  "Desenvolvimento do agente personalizado para o seu negócio",
  "Integrações com as ferramentas que você já usa (CRM, agenda, WhatsApp, entre outras)",
  "Setup completo em 15 a 21 dias",
  "Acompanhamento com especialista em IA durante e após a implementação",
  "Otimizações contínuas com base em resultado real",
];

const steps = [
  {
    title: "Diagnóstico e onboarding",
    description:
      "Entendemos seu funil, seu script atual, seus canais e suas ferramentas.",
  },
  {
    title: "Desenvolvimento do agente",
    description:
      "Construção do agente com base no seu negócio, seu tom de voz e sua forma de vender — nunca um agente genérico.",
  },
  {
    title: "Integrações",
    description:
      "Conexão com CRM, agenda, WhatsApp e demais ferramentas que você já usa.",
  },
  {
    title: "Entrada em operação",
    description: "O agente passa a atender seus leads reais.",
  },
  {
    title: "Calibragem",
    description:
      "Ajustes finos com base nas primeiras conversas e resultados.",
  },
  {
    title: "Acompanhamento",
    description:
      "Acompanhamento contínuo de performance, com otimizações feitas pela nossa equipe.",
  },
];

const differentiators = [
  {
    title: "Treinado com dados do seu negócio",
    description: "Não com respostas genéricas de um bot padrão.",
  },
  {
    title: "Otimizado continuamente pela nossa equipe",
    description:
      "Com base em resultado real, não configurado uma vez e esquecido.",
  },
  {
    title: "Economia de até 80% em tempo operacional",
    description:
      "Liberando sua equipe para o que só humano resolve: fechamento, relacionamento e atendimento presencial.",
  },
];

export default function AgentesDeIA() {
  return (
    <>
      {/* 6.1 Hero */}
      <Section
        className="pt-16 sm:pt-24 pb-16"
        decor={
          <>
            <div className="absolute inset-0 bg-grid" />
            <div className="glow h-[460px] w-[460px] -top-48 left-1/2 -translate-x-1/2 sm:left-1/3" />
            <HeroChatMock
              messages={[
                { from: "lead", text: "Quero saber mais sobre o serviço de vocês" },
                {
                  from: "agent",
                  text: "Show! Me conta rapidinho: hoje você já recebe leads todo dia?",
                },
                { from: "lead", text: "Recebo, mas a resposta demora demais." },
                {
                  from: "agent",
                  text: "Entendi. E hoje é alguém do time que responde manualmente ou já tem algum tipo de automação rodando?",
                },
              ]}
            />
          </>
        }
      >
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Agentes de IA para pré-vendas</Eyebrow>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance leading-[1.05]">
              Transforme a forma como sua empresa{" "}
              <span className="underline decoration-accent decoration-[5px] underline-offset-8">
                qualifica, atende e converte
              </span>{" "}
              leads — com agentes de IA que trabalham por você, todos os dias.
            </h1>
            <p className="text-base sm:text-lg text-muted mt-6 max-w-2xl leading-relaxed">
              Agentes treinados para entender objeções, conduzir a conversa e
              agendar reuniões no automático, sem depender de equipe extra.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <CTAButton flow="agentes" size="lg">
                Quero um agente de IA trabalhando para mim
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

      {/* 6.2 O problema */}
      <Section divider>
        <Reveal className="max-w-3xl">
          <Eyebrow>O problema</Eyebrow>
          <SectionTitle className="mb-6">
            Cada minuto de demora é conversão que esfria.
          </SectionTitle>
          <p className="text-base text-muted leading-relaxed mb-4">
            Todo negócio que investe em tráfego já viveu essa cena: o lead
            chega quente, pergunta, demonstra interesse — e a resposta não
            vem na hora. Vem em uma hora, no dia seguinte, ou nunca. Cada
            minuto de demora é conversão que esfria. Cada atendimento
            inconsistente é um script que não é seguido como deveria. E cada
            lead sem follow-up é dinheiro de tráfego jogado fora.
          </p>
          <p className="text-base text-muted leading-relaxed">
            O problema quase nunca é falta de leads. É{" "}
            <span className="text-text font-semibold">
              falta de estrutura para atender todos eles, sempre, com o mesmo
              padrão de qualidade
            </span>{" "}
            — e é exatamente esse gargalo que resolvemos.
          </p>
        </Reveal>
      </Section>

      {/* 6.3 Barra de credibilidade */}
      <Section divider>
        <Reveal>
          <StatGrid
            stats={[
              { value: "+100", label: "empresas atendidas" },
              { value: "15–21 dias", label: "de setup" },
              { value: "7.500+", label: "leads atendidos por mês" },
              {
                value: "20–25%",
                label: "de conversão, em média, dos nossos clientes",
              },
            ]}
          />
          <p className="mt-8 text-center sm:text-left text-sm font-semibold text-muted">
            Sem mensalidade surpresa.
          </p>
        </Reveal>
      </Section>

      {/* 6.5 Prova social */}
      <Section divider className="bg-tint">
        <Reveal>
          <Eyebrow>Prova social</Eyebrow>
          <SectionTitle className="mb-6 max-w-2xl">
            Resultado real, com números reais.
          </SectionTitle>
          <p className="text-base text-muted leading-relaxed mb-10 max-w-2xl">
            A prova está nos números dos nossos clientes — negócios reais, de
            portes diferentes, que passaram a{" "}
            <span className="text-accent font-semibold">
              agendar e converter mais leads sem aumentar o investimento em
              tráfego
            </span>
            .
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              tag: "Franquia",
              name: "Franqueadora de Lavanderias",
              highlight: "6x mais reuniões em 30 dias",
              description:
                "Fazia 30 reuniões/mês com processo comercial tradicional, script estruturado mas aplicação inconsistente. Em 30 dias com o sistema plugado, substituiu 2 SDRs da operação e passou a gerar 205 reuniões/mês — mantendo o mesmo número de leads e o mesmo investimento em tráfego, apenas aplicando o script validado de forma consistente, 24h por dia.",
            },
            {
              tag: "Advocacia",
              name: "Escritório de Advocacia",
              highlight: "20% de conversão",
              description:
                "Recebia 423 leads/mês. Com o sistema, agendou 83 reuniões no automático, fechou 13 novos contratos e alcançou 20% de conversão.",
            },
            {
              tag: "Advocacia",
              name: "Escritório de Direito do Consumidor",
              highlight: "4x o faturamento",
              description:
                "Multiplicou por 4x o faturamento (de R$15 mil para R$60 mil/mês) apenas adicionando IA ao pré-vendas, sem aumentar investimento em tráfego nem volume de leads — foi de 10 para 50 reuniões/mês.",
            },
            {
              tag: "Advocacia",
              name: "Escritório de Direito Bancário",
              highlight: "De 8% para 18% de conversão",
              description:
                "Conversão saltou de 8% para 18%, com 1 funcionário + IA fazendo o trabalho que antes exigia 3. Em um teste de 2 dias: 70 leads recebidos, 30 reuniões agendadas — 45% de conversão.",
            },
            {
              tag: "Saúde",
              name: "Consultório de Odontologia",
              highlight: "Quase 4x o faturamento",
              description:
                "De 5 para 30 consultas agendadas por mês, com o mesmo investimento em tráfego — retorno mensal saltou de R$12 mil para R$40 mil.",
            },
          ].map((item, index) => (
            <Reveal key={item.name} delay={index * 60}>
              <CaseCard
                tag={item.tag}
                name={item.name}
                highlight={item.highlight}
                description={item.description}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={180} className="mt-14">
          <p className="text-center text-sm text-muted-2 uppercase tracking-widest mb-8">
            Empresas e profissionais que já confiaram no Revolução AI
          </p>
          <ClientLogos />
        </Reveal>

        <Reveal
          delay={220}
          className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-2xl border border-white/10 bg-surface px-6 py-6 sm:px-8"
        >
          <p className="text-base font-semibold text-balance">
            Quer um resultado parecido rodando no seu negócio?
          </p>
          <CTAButton flow="agentes">
            Quero um agente de IA trabalhando para mim
          </CTAButton>
        </Reveal>
      </Section>

      {/* 6.6 Como funciona a implementação */}
      <Section divider>
        <Reveal>
          <Eyebrow>Como funciona</Eyebrow>
          <SectionTitle className="mb-4 max-w-2xl">
            Em até 15 a 21 dias, sua operação sai do zero para uma solução
            completa rodando.
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <PillarCard
                number={String(index + 1).padStart(2, "0")}
                title={step.title}
                description={step.description}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6.7 Os 3 pilares */}
      <Section divider className="bg-tint">
        <Reveal>
          <Eyebrow>Os 3 pilares</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Três pilares trabalhando juntos — não só o agente de IA.
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Reveal delay={80}>
            <PillarCard
              number="01"
              title="Agente de IA"
              description="Recebe, qualifica, conduz a conversa, entende objeções, entende áudio e imagem, faz follow-up e agenda — 24 horas por dia, todos os dias, inclusive fins de semana e feriados."
            />
          </Reveal>
          <Reveal delay={140}>
            <PillarCard
              number="02"
              title="Infraestrutura"
              description="Integrado ao seu CRM, agenda, WhatsApp, Instagram e outras ferramentas que você já usa, sem código e sem equipe técnica."
            />
          </Reveal>
          <Reveal delay={200}>
            <PillarCard
              number="03"
              title="Inteligência Comercial"
              description="Script validado, lógica de qualificação e funil estruturado por trás de cada conversa, para que o agente não converse apenas — ele venda."
            />
          </Reveal>
        </div>
        <p className="text-base text-muted leading-relaxed max-w-2xl">
          Não entregamos só o agente. Entregamos os três juntos — porque é a
          combinação deles que gera o resultado.
        </p>
      </Section>

      {/* 6.8 Diferenciação */}
      <Section divider>
        <Reveal className="max-w-3xl mb-10">
          <Eyebrow>Diferenciação</Eyebrow>
          <SectionTitle>
            Enquanto o mercado vende chatbot, entregamos uma implementação
            comercial completa.
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 80}
              className="card-surface card-hover rounded-3xl p-7"
            >
              <p className="font-bold text-base mb-2">{item.title}</p>
              <p className="text-muted leading-relaxed text-[15px]">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6.9 O que você ganha na prática */}
      <Section divider>
        <Reveal>
          <Eyebrow>Na prática</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            O que você ganha na prática
          </SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gains.map((gain, index) => (
            <Reveal
              key={gain.title}
              delay={index * 50}
              className="card-surface card-hover rounded-3xl p-7"
            >
              <h3 className="font-bold text-base mb-2">{gain.title}</h3>
              <p className="text-muted leading-relaxed text-[15px]">
                {gain.description}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={220} className="mt-8 flex justify-center">
          <CTAButton flow="agentes" variant="secondary" size="lg">
            Quero esses ganhos no meu negócio
          </CTAButton>
        </Reveal>
      </Section>

      {/* 6.10 O que está incluso */}
      <Section divider>
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-8 sm:p-12">
          <div className="glow h-[280px] w-[280px] -top-20 -right-20" />
          <div className="relative">
            <Eyebrow>O que está incluso</Eyebrow>
            <SectionTitle className="mb-8 max-w-2xl">
              Tudo pronto para sua operação rodar
            </SectionTitle>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-accent shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <CTAButton flow="agentes">
                Quero meu agente de IA
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 6.11 FAQ */}
      <Section divider>
        <Reveal>
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <SectionTitle className="mb-10 max-w-2xl">
            Antes de agendar sua conversa
          </SectionTitle>
        </Reveal>
        <Reveal delay={100} className="max-w-3xl">
          <FAQAccordion
            items={[
              {
                question: "Funciona para o meu nicho?",
                answer:
                  "Já aplicamos essa solução com sucesso em escritórios de advocacia, clínicas, estética, odontologia, franquias e outros negócios que recebem leads via tráfego ou indicação.",
              },
              {
                question: "Preciso ter equipe técnica para tocar isso?",
                answer:
                  "Não. Toda a implementação, integração e configuração é feita pela nossa equipe. Você não precisa se envolver em nada técnico.",
              },
              {
                question: "E se a IA errar ou não souber responder algo?",
                answer:
                  "O agente é treinado com dados reais do seu negócio e passa por calibragem antes e depois de entrar em operação. Além disso, a otimização é contínua — não é um sistema que roda sozinho sem acompanhamento.",
              },
              {
                question: "Isso substitui minha equipe comercial?",
                answer:
                  "Não necessariamente — em muitos casos, o agente libera a equipe para focar em fechamento, atendimento presencial e relacionamento, enquanto cuida da triagem, qualificação e agendamento.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* 6.12 Fechamento */}
      <Section divider>
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
          <div className="glow h-[320px] w-[320px] -top-24 left-1/2 -translate-x-1/2" />
          <h2 className="relative text-2xl sm:text-3xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-6">
            Em 15 a 21 dias você recebe uma operação completa, personalizada
            para o seu negócio e integrada às suas ferramentas.
          </h2>
          <p className="relative text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Sem precisar se envolver em nada técnico — só diagnóstico,
            implementação e acompanhamento de perto em cada projeto.
          </p>
          <div className="relative">
            <CTAButton flow="agentes" size="lg">
              Quero meu agente de IA agora
            </CTAButton>
          </div>
        </Reveal>
      </Section>

      <WhatsAppFloatingButton />
    </>
  );
}
