import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { CaseCard } from "@/components/ui/CaseCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { WHATSAPP_LINK, WHATSAPP_NUMBER_DISPLAY, EMAIL } from "@/lib/links";
import { PLANO_INFO, TAXA_AGENTE_PRONTO, type Plano } from "@/lib/asaas-plataforma";

export const metadata: Metadata = {
  title: "Plataforma — Construa seu Agente de IA para Pré-Vendas",
  description:
    "Acesso completo à Chatflux, a plataforma por trás dos resultados do Revolução AI, com minicurso de 1h pra você construir seu próprio agente de IA para WhatsApp.",
};

const features: { title: string; description: string }[] = [
  {
    title: "Conversa natural e assertiva",
    description:
      "Seu agente segue o script de vendas com precisão — sempre, com todos os leads, sem as variações que acontecem em uma equipe humana. Entende texto, áudio e imagem, e conduz a conversa com naturalidade.",
  },
  {
    title: "Base de conhecimento (Perguntas e Respostas)",
    description:
      "Alimente seu agente com uma base específica do seu negócio — da mais simples à mais refinada, incluindo como quebrar objeções comuns. Quanto mais completa, mais preciso e natural o atendimento.",
  },
  {
    title: "Follow-up automático e inteligente",
    description:
      "Configure sequências de mensagens pra recuperar leads que pararam de responder — 30 minutos, 1 hora, 1 dia depois, no formato que fizer sentido pro seu funil. Para sozinho quando o objetivo já foi cumprido.",
  },
  {
    title: "Lembretes automáticos",
    description:
      "Configure lembretes que reforçam compromissos já agendados, reduzindo faltas e aumentando o comparecimento.",
  },
  {
    title: "Agendamento integrado",
    description:
      "Conecte seu agente à sua agenda (Google Agenda) e deixe que ele mesmo agende reuniões e consultas direto na conversa, sem intervenção manual.",
  },
  {
    title: "Horário de funcionamento configurável",
    description:
      "Defina exatamente quando seu agente deve atuar — dias e horários de atendimento — e ele respeita esse limite automaticamente.",
  },
  {
    title: "Pausa automática e controle da conversa",
    description:
      "O agente pausa sozinho quando um humano entra na conversa ou identifica frases que pedem atendimento manual. Você sempre pode assumir, pausar ou reativar a IA a qualquer momento.",
  },
  {
    title: "Kanban integrado com automações",
    description:
      "Acompanhe seus leads num painel estilo CRM, com automações nos dois sentidos: ações na conversa movimentam o lead entre etapas, e movimentações no Kanban disparam ações na própria IA.",
  },
  {
    title: "Multiagentes",
    description:
      "Crie mais de um agente na mesma conta — pra diferentes produtos, funis ou frentes do seu negócio, cada um com seu próprio comportamento e base de conhecimento.",
  },
  {
    title: "Envio de anexos e mídias",
    description:
      "Seu agente pode enviar imagens, PDFs, vídeos e outros materiais direto na conversa, no momento certo do funil — sem depender de alguém enviando manualmente.",
  },
  {
    title: "Dashboard de métricas",
    description:
      "Acompanhe conversas iniciadas, agendamentos realizados, taxa de resposta e o andamento de cada conversa em tempo real, com filtros por período.",
  },
  {
    title: "Integração com WhatsApp e Instagram",
    description:
      "Atenda seus leads onde eles já estão — com integração nativa aos canais mais usados no relacionamento comercial no Brasil.",
  },
  {
    title: "Instruções customizadas e alta precisão",
    description:
      "Configure exatamente como seu agente deve se comportar, com instruções detalhadas e específicas do seu negócio — não é um bot genérico com respostas padronizadas.",
  },
  {
    title: "IA de apoio para configuração e ajustes",
    description:
      "A plataforma conta com uma IA própria, com contexto completo sobre como ela funciona, que te ajuda a fazer ajustes no seu agente sempre que precisar — você não fica sozinho depois do curso.",
  },
];

const cases = [
  {
    tag: "Franquia",
    name: "Franqueadora de Lavanderias",
    highlight: "De 30 para 205 reuniões/mês",
    description:
      "Fazia 30 reuniões/mês com processo comercial tradicional. Em 30 dias, configurando o agente com o script certo, passou a gerar mais de 200 reuniões/mês — mesmo número de leads, mesmo investimento em tráfego.",
  },
  {
    tag: "Advocacia",
    name: "Escritório de Direito Bancário",
    highlight: "De 8% para 18% de conversão",
    description:
      "Conversão saltou de 8% para 18% depois de configurar qualificação e follow-up bem definidos no agente. Em um teste de 2 dias: 70 leads recebidos, 30 reuniões agendadas.",
  },
  {
    tag: "Saúde",
    name: "Consultório de Odontologia",
    highlight: "Quase 4x o faturamento",
    description:
      "De 5 para 30 consultas agendadas por mês, com o mesmo investimento em tráfego — retorno mensal saltou de R$12 mil para R$40 mil, com script, qualificação e follow-up bem configurados.",
  },
];

type ComparativoValor = true | false | string;
const comparativoColunas = ["Acesso à plataforma", "Agente Pronto"];
const comparativo: { dimensao: string; valores: ComparativoValor[] }[] = [
  { dimensao: "Acesso à Chatflux", valores: [true, true] },
  { dimensao: "Minicurso de 1h", valores: [true, true] },
  { dimensao: "Suporte via e-mail", valores: [true, true] },
  { dimensao: "Quem monta o agente", valores: ["Você", "Revolução AI monta a primeira versão"] },
  { dimensao: "Investimento", valores: ["Assinatura mensal", "Assinatura mensal + taxa única"] },
];

function ComparativoCell({ valor }: { valor: ComparativoValor }) {
  if (valor === true) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return <span className="text-muted">{valor}</span>;
}

const planosPagos: Plano[] = ["start", "growth", "scale"];

function checkoutHref(plano: Plano, agentePronto: boolean) {
  return `/plataforma/assinar?plano=${plano}${agentePronto ? "&agentePronto=1" : ""}`;
}

export default function PlataformaPage() {
  return (
    <>
      {/* Header próprio, sem o menu do site institucional */}
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
                Plataforma
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-2">
                Revolução AI
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text/70">
            <a href="#funcionalidades" className="hover:text-text transition-colors">
              Funcionalidades
            </a>
            <a href="#caminhos" className="hover:text-text transition-colors">
              Como funciona
            </a>
            <a href="#planos" className="hover:text-text transition-colors">
              Planos
            </a>
            <a href="#faq" className="hover:text-text transition-colors">
              Dúvidas
            </a>
          </nav>
          <CTAButton href="#planos">Ver planos</CTAButton>
        </Container>
      </header>

      <main>
        {/* Hero */}
        <Section
          className="pt-16 sm:pt-24 pb-16"
          decor={
            <>
              <div className="absolute inset-0 bg-grid" />
              <div className="glow h-[460px] w-[460px] -top-48 left-1/2 -translate-x-1/2 sm:left-1/3" />
            </>
          }
        >
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <Eyebrow>Plataforma</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance leading-[1.05]">
                Construa seu próprio agente de IA para pré-vendas — com a
                mesma ferramenta que usamos nos nossos clientes.
              </h1>
              <p className="text-base sm:text-lg text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
                Acesso completo à Chatflux, a plataforma por trás dos
                resultados do Revolução AI, com tudo o que você precisa pra
                criar, treinar e colocar seu agente de IA pra atender e
                qualificar leads no WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                <CTAButton href="#planos" size="lg">
                  Quero acessar a plataforma
                </CTAButton>
                <CTAButton href="#caminhos" variant="secondary" size="lg">
                  Quero o Agente Pronto
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Para quem é */}
        <Section divider>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow>Pra quem é</Eyebrow>
              <SectionTitle className="mb-6">
                O caminho pra quem quer começar agora com IA no pré-vendas.
              </SectionTitle>
              <p className="text-muted leading-relaxed text-base">
                Você já entende o potencial de um agente de IA no
                pré-vendas, mas ainda não é o momento de contratar uma
                implementação completa — seja por orçamento, seja porque
                prefere colocar a mão na massa e construir você mesmo. Esse
                é o caminho pra quem quer começar agora, com a mesma
                tecnologia usada por negócios que já geram centenas de
                reuniões por mês com IA.
              </p>
            </Reveal>
            <Reveal delay={100} className="rounded-3xl border border-accent/20 bg-accent-soft p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                Importante
              </p>
              <p className="text-muted leading-relaxed text-[15px]">
                Aqui você compra <span className="text-text font-semibold">ferramenta + capacitação</span> —
                a mesma plataforma que usamos com nossos clientes, e um
                minicurso pra você aprender a usar. Na{" "}
                <Link href="/agentes-de-ia" className="text-accent hover:underline">
                  implementação completa
                </Link>
                , a gente entrega estratégia, execução e acompanhamento de
                resultado. São produtos diferentes, pra momentos diferentes
                — essa é a porta de entrada.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* Como funciona */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Como funciona</Eyebrow>
            <SectionTitle>
              Acesso à ferramenta, minicurso de 1h, e você constrói no seu
              ritmo.
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Você recebe acesso à plataforma Chatflux — a mesma que o
              Revolução AI usa pra implementar agentes nos seus clientes —
              com um minicurso de aproximadamente 1 hora te ensinando a
              construir seu agente do zero: configurar o comportamento
              dele, estruturar a base de conhecimento, definir follow-ups e
              colocá-lo pra atender de verdade. A partir daí, você constrói,
              testa e ajusta no seu próprio ritmo, com suporte via e-mail
              sempre que precisar.
            </p>
          </Reveal>
        </Section>

        {/* Funcionalidades */}
        <Section id="funcionalidades" divider>
          <Reveal className="max-w-2xl mb-12">
            <Eyebrow>Funcionalidades</Eyebrow>
            <SectionTitle>
              Tudo que você precisa pra montar um agente de verdade, não um
              bot genérico.
            </SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Reveal
                key={feature.title}
                delay={(index % 6) * 60}
                className="card-surface card-hover rounded-3xl p-7 flex flex-col h-full"
              >
                <h3 className="font-bold text-base mb-2">{feature.title}</h3>
                <p className="text-muted leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Resultados possíveis */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mb-6">
            <Eyebrow>Resultados possíveis</Eyebrow>
            <SectionTitle>
              O que negócios já alcançaram com essa mesma tecnologia.
            </SectionTitle>
          </Reveal>
          <Reveal delay={60} className="max-w-3xl mb-12">
            <p className="text-muted leading-relaxed text-base">
              Negócios que implementaram agentes de IA com essa mesma
              tecnologia já saíram de 30 para mais de 200 reuniões por mês,
              aumentaram sua taxa de conversão de 8% para 18%, e
              multiplicaram por até 4x o faturamento — mantendo o mesmo
              volume de leads e o mesmo investimento em tráfego. O resultado
              vem de uma boa configuração do agente: script certo,
              qualificação bem definida e follow-up consistente — tudo isso
              você pode construir com essa mesma ferramenta.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item, index) => (
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
        </Section>

        {/* Os dois caminhos */}
        <Section id="caminhos" divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>Os dois caminhos</Eyebrow>
            <SectionTitle>Escolha como você quer começar.</SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Reveal delay={80} className="card-surface rounded-3xl p-8 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-3">
                Caminho A
              </p>
              <h3 className="text-lg font-bold mb-3">Acesso à plataforma</h3>
              <p className="text-muted leading-relaxed text-[15px]">
                Você recebe acesso completo à Chatflux e ao minicurso de 1h,
                e constrói seu agente do zero, no seu ritmo. Ideal pra quem
                gosta de colocar a mão na massa e quer aprender a fundo como
                funciona.
              </p>
            </Reveal>
            <Reveal
              delay={140}
              className="relative card-surface rounded-3xl p-8 flex flex-col border-accent/30 shadow-[0_0_0_1px_rgba(0,200,83,0.3),0_20px_60px_-15px_rgba(0,200,83,0.25)]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Caminho B
              </p>
              <h3 className="text-lg font-bold mb-3">Agente Pronto</h3>
              <p className="text-muted leading-relaxed text-[15px]">
                Você preenche um formulário com informações do seu negócio,
                e o Revolução AI monta a primeira versão do seu agente —
                prompt e fluxo de conversa configurados e prontos pra
                rodar. Você recebe acesso à plataforma e ao mesmo minicurso
                de 1h, pra fazer os ajustes que quiser depois. Ideal pra
                quem quer começar já com uma base pronta, sem abrir mão de
                assumir os ajustes no dia a dia.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-muted-2 uppercase tracking-widest">
                    &nbsp;
                  </th>
                  {comparativoColunas.map((col, i) => (
                    <th
                      key={col}
                      className={`text-left py-4 pr-4 text-sm font-semibold uppercase tracking-widest ${
                        i === 1 ? "text-accent" : "text-muted-2"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.map((row) => (
                  <tr key={row.dimensao} className="border-b border-white/5">
                    <td className="py-4 pr-4 font-medium">{row.dimensao}</td>
                    {row.valores.map((valor, i) => (
                      <td key={i} className="py-4 pr-4">
                        <ComparativoCell valor={valor} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="text-sm text-muted-2 mt-6 max-w-3xl mx-auto">
            Nenhum dos dois caminhos inclui integrações externas específicas
            (CRM, agendas próprias fora do Google Agenda/Cal.com) — isso faz
            parte do escopo da implementação completa consultiva.
          </p>
        </Section>

        {/* Planos e preços */}
        <Section id="planos" divider className="bg-tint">
          <Reveal className="text-center mb-12">
            <Eyebrow>Planos</Eyebrow>
            <SectionTitle className="max-w-2xl mx-auto">
              Escolha o plano pelo seu volume de conversas — e se quer
              construir sozinho ou já começar com o agente pronto.
            </SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {planosPagos.map((plano) => {
              const info = PLANO_INFO[plano];
              return (
                <Reveal
                  key={plano}
                  delay={80}
                  className="card-surface rounded-3xl p-7 flex flex-col"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-3">
                    {info.label}
                  </p>
                  <p className="text-3xl font-black tracking-tight mb-1">
                    R${info.valorMensal}
                    <span className="text-base font-semibold text-muted">/mês</span>
                  </p>
                  <p className="text-muted text-sm mb-6">{info.conversas}</p>
                  <ul className="space-y-2.5 mb-7 flex-1 text-sm">
                    <li className="flex gap-2 text-muted leading-relaxed">
                      <span className="text-accent shrink-0">—</span>
                      Acesso completo à Chatflux
                    </li>
                    <li className="flex gap-2 text-muted leading-relaxed">
                      <span className="text-accent shrink-0">—</span>
                      Minicurso de 1h + suporte por e-mail
                    </li>
                    <li className="flex gap-2 text-muted leading-relaxed">
                      <span className="text-accent shrink-0">—</span>
                      IA de apoio pra ajustes
                    </li>
                  </ul>
                  <div className="flex flex-col gap-2.5">
                    <CTAButton href={checkoutHref(plano, false)} variant="secondary" icon={false}>
                      Acesso à plataforma
                    </CTAButton>
                    <CTAButton href={checkoutHref(plano, true)} icon={false}>
                      + Agente Pronto (+R${TAXA_AGENTE_PRONTO})
                    </CTAButton>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={80} className="card-surface rounded-3xl p-7 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-3">
                Enterprise
              </p>
              <p className="text-3xl font-black tracking-tight mb-1">Sob consulta</p>
              <p className="text-muted text-sm mb-6">Volume personalizado</p>
              <ul className="space-y-2.5 mb-7 flex-1 text-sm">
                <li className="flex gap-2 text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Tudo dos planos acima
                </li>
                <li className="flex gap-2 text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Volume de conversas sob medida
                </li>
              </ul>
              <CTAButton href={WHATSAPP_LINK} external variant="secondary" icon={false}>
                Falar com a gente
              </CTAButton>
            </Reveal>
          </div>
          <p className="text-center text-sm text-muted-2 mt-8 max-w-xl mx-auto">
            Conversa excedente ao limite do plano é cobrada à parte, em
            valor por conversa acima do custo do tier atual — fale com a
            gente se seu volume estiver sempre no limite, pra migrar de
            plano em vez de pagar avulso.
          </p>
        </Section>

        {/* Minicurso */}
        <Section divider>
          <Reveal className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent-soft p-8 sm:p-12">
            <Eyebrow>O minicurso de 1h</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-4 max-w-2xl">
              Direto ao ponto — sem enrolação.
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl">
              Junto com o seu acesso, você recebe um minicurso direto ao
              ponto — cerca de 1 hora de conteúdo — te ensinando a
              configurar seu agente de IA do zero: como estruturar o
              comportamento dele, montar a base de conhecimento, configurar
              follow-ups e colocar tudo pra rodar de verdade. Focado no que
              você precisa pra sair do zero e ter seu agente funcionando.
            </p>
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section id="faq" divider className="bg-tint">
          <Reveal>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <SectionTitle className="mb-10 max-w-2xl">
              Antes de assinar
            </SectionTitle>
          </Reveal>
          <Reveal delay={100} className="max-w-3xl">
            <FAQAccordion
              items={[
                {
                  question: "Isso é a mesma coisa que a implementação completa do Revolução AI?",
                  answer:
                    "Não. Aqui você tem acesso à mesma ferramenta e capacitação pra construir e ajustar seu agente sozinho. Na implementação completa, o Revolução AI cuida de todo o diagnóstico, estratégia, integrações e acompanhamento de resultado.",
                },
                {
                  question: "Consigo integrar com meu CRM ou sistema de agendamento próprio?",
                  answer:
                    "A gente não faz essa integração por você nesse produto, mas é totalmente possível fazer — a integração nativa pronta, sem esforço, é só com Google Agenda/Cal.com. Pra CRM externo ou agenda própria, você (ou quem cuida da parte técnica do seu negócio) configura por conta própria, com a ajuda da IA de apoio dentro da plataforma.",
                },
                {
                  question: "E se eu quiser migrar para a implementação completa depois?",
                  answer:
                    "Sim, é possível. Muitos clientes começam pela plataforma e, ao sentir a necessidade de mais suporte, estratégia ou integrações, avançam para a implementação completa.",
                },
                {
                  question: "Preciso saber programar para usar a plataforma?",
                  answer:
                    "Não. A construção do agente é feita por configuração — prompt, base de perguntas e respostas, follow-ups — sem necessidade de código.",
                },
                {
                  question: "O que acontece se eu não conseguir configurar sozinho?",
                  answer:
                    "Você tem suporte via e-mail e uma IA de apoio dentro da própria plataforma pra ajudar nos ajustes. Se preferir que o Revolução AI monte a primeira versão pra você, essa é a proposta do Agente Pronto.",
                },
              ]}
            />
          </Reveal>
        </Section>

        {/* CTA final */}
        <Section divider>
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
            <div className="glow h-[320px] w-[320px] -top-24 left-1/2 -translate-x-1/2" />
            <h2 className="relative text-2xl sm:text-3xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-8">
              Comece agora a construir seu próprio agente de IA para
              pré-vendas.
            </h2>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="#planos" size="lg">
                Quero acessar a plataforma
              </CTAButton>
              <CTAButton href="#planos" variant="secondary" size="lg">
                Quero o Agente Pronto
              </CTAButton>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>Plataforma by Revolução AI</p>
          <div className="flex items-center gap-6">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              {WHATSAPP_NUMBER_DISPLAY}
            </a>
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
