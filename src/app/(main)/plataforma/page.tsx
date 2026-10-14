import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { CaseCard } from "@/components/ui/CaseCard";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureIcon, type FeatureIconName } from "@/components/plataforma/FeatureIcon";
import { FeatureScreenshot } from "@/components/plataforma/FeatureScreenshot";
import { PlataformaDemoVideo } from "@/components/plataforma/PlataformaDemoVideo";
import { PlataformaROICalculator } from "@/components/plataforma/PlataformaROICalculator";
import { ScheduleCallLink } from "@/components/plataforma/ScheduleCallLink";
import {
  LEAD_EXTRACTOR_WHATSAPP_LINK,
  LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY,
  EMAIL,
} from "@/lib/links";
import { PLANO_INFO, TAXA_AGENTE_PRONTO, type Plano } from "@/lib/asaas-plataforma";
import { faqPageJsonLd } from "@/lib/faq-jsonld";

const faqItems = [
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
];

const title = "Plataforma — Construa seu Agente de IA para Pré-Vendas";
const description =
  "Acesso completo à Chatflux, a plataforma por trás dos resultados do Revolução AI, com treinamento guiado pra você construir seu próprio agente de IA para WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/plataforma" },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

const flowSteps: { icon: FeatureIconName; title: string; description: string }[] = [
  {
    icon: "chat",
    title: "Lead chega",
    description: "Pelo WhatsApp ou Instagram, a qualquer hora do dia.",
  },
  {
    icon: "sparkles",
    title: "Agente qualifica",
    description: "Com o script e a base de conhecimento que você configurou.",
  },
  {
    icon: "calendar",
    title: "Agenda, vende ou insiste",
    description:
      "Marca reunião, fecha a venda direto na conversa, ou faz follow-up no momento certo.",
  },
  {
    icon: "kanban",
    title: "Você acompanha",
    description:
      "No chat, no Kanban e no dashboard, assumindo a conversa quando quiser.",
  },
];

type FeatureItem = { icon: FeatureIconName; title: string; description: string };

type FeatureScreenshotItem = { src: string; alt: string; width: number; height: number };

const featureBlocks: {
  eyebrow: string;
  title: string;
  bullets: FeatureItem[];
  screenshots?: FeatureScreenshotItem[];
}[] = [
  {
    eyebrow: "Conversa que qualifica sozinha",
    title: "Seu agente conduz a conversa como o melhor vendedor da equipe.",
    bullets: [
      {
        icon: "chat",
        title: "Conversa natural e assertiva",
        description:
          "Segue o script de vendas com precisão — sempre, com todos os leads, sem as variações que acontecem numa equipe humana. Entende texto, áudio e imagem.",
      },
      {
        icon: "book",
        title: "Base de conhecimento (Perguntas e Respostas)",
        description:
          "Alimente com perguntas e respostas específicas do seu negócio, incluindo como quebrar as objeções mais comuns dos seus leads.",
      },
      {
        icon: "sliders",
        title: "Instruções customizadas e alta precisão",
        description:
          "Configure exatamente como ele deve se comportar, com instruções detalhadas — não é um bot genérico com respostas padronizadas.",
      },
    ],
    screenshots: [
      {
        src: "/plataforma/screenshots/whatsapp-chat.png",
        alt: "Conversa do agente no WhatsApp qualificando um lead",
        width: 1036,
        height: 672,
      },
    ],
  },
  {
    eyebrow: "Follow-up, lembretes e agendamento",
    title: "Ele não deixa o lead esfriar, e agenda sozinho.",
    bullets: [
      {
        icon: "repeat",
        title: "Follow-up automático e inteligente",
        description:
          "Sequências de mensagens pra recuperar quem parou de responder — 30 minutos, 1 hora, 1 dia depois. Para sozinho quando o objetivo já foi cumprido.",
      },
      {
        icon: "bell",
        title: "Lembretes automáticos",
        description: "Reforça compromissos já agendados, reduzindo faltas e aumentando o comparecimento.",
      },
      {
        icon: "calendar",
        title: "Agendamento integrado",
        description:
          "Conectado à sua agenda (Google Agenda), agenda reuniões e consultas direto na conversa, sem intervenção manual.",
      },
    ],
    screenshots: [
      {
        src: "/plataforma/screenshots/apps.png",
        alt: "Apps da plataforma com Follow-Ups e Agendamento ativados",
        width: 1365,
        height: 557,
      },
    ],
  },
  {
    eyebrow: "Central de atendimento",
    title: "Acompanhe e participe de cada conversa, em tempo real.",
    bullets: [
      {
        icon: "inbox",
        title: "Chat centralizado",
        description:
          "Veja todas as conversas em andamento, em tempo real, com o histórico completo de cada lead.",
      },
      {
        icon: "pause",
        title: "Pause a IA e assuma quando quiser",
        description:
          "Pausa manualmente a qualquer momento e envie mensagens você mesmo, direto pela plataforma — sem precisar abrir o WhatsApp.",
      },
      {
        icon: "channels",
        title: "Múltiplos canais numa só tela",
        description:
          "Se você usa mais de um canal (WhatsApp e Instagram), acompanha tudo no mesmo lugar.",
      },
      {
        icon: "users",
        title: "Atribua conversas a vendedores específicos",
        description:
          "Direcione o atendimento manual pra pessoa certa da sua equipe continuar a conversa.",
      },
    ],
    screenshots: [
      {
        src: "/plataforma/screenshots/chat-conversas.png",
        alt: "Central de atendimento com conversas em tempo real e ações rápidas",
        width: 1365,
        height: 600,
      },
    ],
  },
  {
    eyebrow: "Acompanhamento e organização",
    title: "Você enxerga tudo, organizado do seu jeito.",
    bullets: [
      {
        icon: "kanban",
        title: "Kanban integrado com automações",
        description:
          "Automações nos dois sentidos: ações na conversa movimentam o lead entre etapas, e movimentações no Kanban disparam ações na própria IA.",
      },
      {
        icon: "dashboard",
        title: "Dashboard de métricas",
        description:
          "Conversas iniciadas, agendamentos realizados, taxa de resposta — tudo em tempo real, com filtros por período.",
      },
      {
        icon: "clock",
        title: "Horário de funcionamento configurável",
        description: "Define exatamente quando ele deve atuar — dias e horários de atendimento.",
      },
    ],
    screenshots: [
      {
        src: "/plataforma/screenshots/kanban.png",
        alt: "Kanban do funil de leads, com etapas e oportunidades organizadas",
        width: 1346,
        height: 544,
      },
      {
        src: "/plataforma/screenshots/metricas.png",
        alt: "Dashboard de métricas: novas conversas, status e eventos em tempo real",
        width: 1004,
        height: 551,
      },
    ],
  },
];

const compactFeatures: FeatureItem[] = [
  {
    icon: "users",
    title: "Multiagentes",
    description: "Crie mais de um agente na mesma conta, cada um com seu comportamento e base de conhecimento.",
  },
  {
    icon: "attachment",
    title: "Envio de anexos e mídias",
    description: "Imagens, PDFs e vídeos direto na conversa, no momento certo do funil.",
  },
  {
    icon: "link",
    title: "WhatsApp e Instagram",
    description: "Atenda seus leads onde eles já estão, com integração nativa aos dois canais.",
  },
  {
    icon: "sparkles",
    title: "IA de apoio pra ajustes",
    description:
      "Uma IA própria da plataforma te ajuda a escrever e ajustar o prompt, o script de atendimento e as configurações do seu agente — mesmo se você optou pelo Agente Pronto.",
  },
  {
    icon: "code",
    title: "Código customizado",
    description:
      "Configure ações específicas pro seu agente executar durante a conversa — funções, integrações e chamadas a aplicações externas, disparadas no momento certo do funil.",
  },
];

const allFeatureTitles = [
  ...featureBlocks.flatMap((block) => block.bullets.map((bullet) => bullet.title)),
  ...compactFeatures.map((feature) => feature.title),
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
  { dimensao: "Treinamento guiado", valores: [true, true] },
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

function FeatureIconBadge({ icon }: { icon: FeatureIconName }) {
  return (
    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent">
      <FeatureIcon name={icon} />
    </span>
  );
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
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-text/70">
            <a href="#resultados" className="hover:text-text transition-colors">
              Resultados
            </a>
            <a href="#funcionalidades" className="hover:text-text transition-colors">
              Funcionalidades
            </a>
            <a href="#calculadora" className="hover:text-text transition-colors">
              Calculadora
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
                <CTAButton href="#planos" variant="secondary" size="lg">
                  Quero o Agente Pronto
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Resultados possíveis */}
        <Section id="resultados" divider className="bg-tint">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
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
          <Reveal delay={120}>
            <p className="text-center text-sm text-muted-2 uppercase tracking-widest mb-8">
              Empresas e profissionais que já confiaram no Revolução AI
            </p>
            <ClientLogos />
          </Reveal>
        </Section>

        {/* Para quem é */}
        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center">
            <Eyebrow>Pra quem é</Eyebrow>
            <SectionTitle className="mb-6">
              Pra quem recebe leads, atende no WhatsApp ou Instagram, e
              quer automatizar isso com IA de verdade.
            </SectionTitle>
            <p className="text-muted leading-relaxed text-base">
              Você recebe leads (ou quer fazer disparos pra uma base) e
              faz atendimento comercial pelo WhatsApp ou Instagram — e
              quer automatizar esse atendimento com uma IA de alta
              qualidade, que performa de verdade e é fácil de construir e
              ajustar. Você tem controle total de tudo: CRM com Kanban
              integrado, dashboard de métricas, chat centralizado, e
              agendamento automático de reuniões, consultas ou vendas.
            </p>
          </Reveal>
        </Section>

        {/* Como funciona */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <Eyebrow>Como funciona</Eyebrow>
            <SectionTitle>
              Acesso à ferramenta, treinamento guiado, e você constrói no
              seu ritmo.
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Você recebe acesso à plataforma Chatflux — a mesma que o
              Revolução AI usa pra implementar agentes nos seus clientes —
              com um treinamento guiado de aproximadamente 1 hora te
              ensinando a construir seu agente do zero. A partir daí, você
              constrói,
              testa e ajusta no seu próprio ritmo, com suporte via e-mail
              sempre que precisar. Na prática, o dia a dia do seu agente
              funciona assim:
            </p>
          </Reveal>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40" />
            {flowSteps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 80}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent shadow-[0_0_20px_rgba(0,200,83,0.25)] mb-5">
                  <FeatureIcon name={step.icon} size={26} />
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[#07090a] text-xs font-black">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-muted leading-relaxed text-[15px]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Vídeo de demonstração */}
        <Section divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Veja funcionando</Eyebrow>
            <SectionTitle>A plataforma rodando, na prática.</SectionTitle>
          </Reveal>
          <Reveal delay={80} className="max-w-4xl mx-auto">
            <PlataformaDemoVideo />
          </Reveal>
        </Section>

        {/* Funcionalidades */}
        <Section id="funcionalidades" divider>
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>Funcionalidades</Eyebrow>
            <SectionTitle>
              Tudo que você precisa pra montar um agente de verdade, não um
              bot genérico.
            </SectionTitle>
          </Reveal>

          <div className="flex flex-col gap-16">
            {featureBlocks.map((block, blockIndex) =>
              block.screenshots && block.screenshots.length > 0 ? (
                <div
                  key={block.eyebrow}
                  className="grid lg:grid-cols-2 gap-10 items-center"
                >
                  <Reveal
                    className={blockIndex % 2 === 1 ? "order-2 lg:order-1" : "order-2"}
                  >
                    <div className="flex flex-col gap-4">
                      {block.screenshots.map((shot) => (
                        <FeatureScreenshot key={shot.src} {...shot} />
                      ))}
                    </div>
                  </Reveal>
                  <Reveal
                    delay={80}
                    className={blockIndex % 2 === 1 ? "order-1 lg:order-2" : "order-1"}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                      {block.eyebrow}
                    </p>
                    <h3 className="text-xl font-black tracking-tight mb-6 text-balance">
                      {block.title}
                    </h3>
                    <div className="flex flex-col gap-5">
                      {block.bullets.map((bullet) => (
                        <div key={bullet.title} className="flex gap-4">
                          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
                            <FeatureIcon name={bullet.icon} size={18} />
                          </span>
                          <div>
                            <h4 className="font-bold text-sm mb-1">{bullet.title}</h4>
                            <p className="text-muted text-sm leading-relaxed">
                              {bullet.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              ) : (
                <div key={block.eyebrow}>
                  <Reveal className="max-w-2xl mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                      {block.eyebrow}
                    </p>
                    <h3 className="text-xl font-black tracking-tight text-balance">
                      {block.title}
                    </h3>
                  </Reveal>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {block.bullets.map((bullet, bulletIndex) => (
                      <Reveal
                        key={bullet.title}
                        delay={bulletIndex * 60}
                        className="card-surface card-hover rounded-3xl p-7 flex flex-col h-full"
                      >
                        <FeatureIconBadge icon={bullet.icon} />
                        <h4 className="font-bold text-base mb-2">{bullet.title}</h4>
                        <p className="text-muted leading-relaxed text-[15px]">
                          {bullet.description}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {compactFeatures.map((feature, index) => (
              <Reveal
                key={feature.title}
                delay={index * 60}
                className="card-surface card-hover rounded-3xl p-7 flex flex-col h-full"
              >
                <FeatureIconBadge icon={feature.icon} />
                <h3 className="font-bold text-base mb-2">{feature.title}</h3>
                <p className="text-muted leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </Reveal>
            ))}
            <Reveal
              delay={compactFeatures.length * 60}
              className="rounded-3xl border border-dashed border-white/15 p-7 flex flex-col items-center justify-center text-center h-full"
            >
              <p className="text-lg font-black tracking-tight text-accent mb-2">E mais</p>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Confira a lista completa de tudo que vem com o seu acesso.
              </p>
              <a href="#resumo" className="text-sm font-semibold text-accent hover:underline">
                Ver resumo completo →
              </a>
            </Reveal>
          </div>
        </Section>

        {/* Os dois caminhos */}
        <Section id="caminhos" divider className="bg-tint">
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
                Você recebe acesso completo à Chatflux e ao treinamento
                guiado, e constrói seu agente do zero, no seu ritmo — contando
                com uma IA própria da plataforma que te ajuda a escrever o
                prompt, o script de atendimento e as demais configurações.
                Ideal pra quem gosta de colocar a mão na massa e quer aprender
                a fundo como funciona.
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
                rodar. Você recebe acesso à plataforma e ao mesmo
                treinamento guiado, pra fazer os ajustes que quiser depois —
                com a mesma IA de apoio do Caminho A à disposição, te
                ajudando a escrever e configurar o comportamento do seu
                agente. Ideal pra quem quer começar já com uma base pronta,
                sem abrir mão de assumir os ajustes no dia a dia.
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
        </Section>

        {/* Calculadora de ROI */}
        <Section id="calculadora" divider>
          <Reveal className="max-w-2xl mb-12">
            <Eyebrow>Calculadora</Eyebrow>
            <SectionTitle>
              Quanto a mais o seu agente pode gerar de faturamento por mês?
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Informe seu ticket médio, quantas conversas você recebe por mês
              e se sua venda acontece por agendamento ou direto na conversa
              — e veja o ganho estimado configurando bem o seu agente.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <PlataformaROICalculator />
          </Reveal>
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
                      Treinamento guiado + suporte por e-mail
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
              <CTAButton href={LEAD_EXTRACTOR_WHATSAPP_LINK} external variant="secondary" icon={false}>
                Falar com a gente
              </CTAButton>
            </Reveal>
          </div>
          <p className="text-center text-sm text-muted-2 mt-8 max-w-xl mx-auto">
            Conversa excedente ao limite do plano é cobrada à parte, R$2 por
            conversa acima do limite do tier atual — fale com a gente se seu
            volume estiver sempre no limite, pra migrar de plano em vez de
            pagar avulso.
          </p>
        </Section>

        {/* Treinamento guiado */}
        <Section divider>
          <Reveal className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent-soft p-8 sm:p-12">
            <Eyebrow>Treinamento guiado</Eyebrow>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-4 max-w-2xl">
              Aprenda a configurar seu agente numa sessão prática de 1h.
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl">
              Junto com o seu acesso, você recebe um treinamento guiado —
              cerca de 1 hora de conteúdo direto ao ponto — te ensinando a
              configurar seu agente de IA do zero: como estruturar o
              comportamento dele, montar a base de conhecimento, configurar
              follow-ups e colocar tudo pra rodar de verdade. O suficiente
              pra você sair do zero e ter seu agente funcionando com
              confiança.
            </p>
          </Reveal>
        </Section>

        {/* Fale com a gente */}
        <Section divider className="bg-tint">
          <Reveal
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-12 sm:px-16 sm:py-14 text-center"
          >
            <div className="glow h-[280px] w-[280px] -top-20 left-1/2 -translate-x-1/2" />
            <h2 className="relative text-xl sm:text-2xl font-black tracking-tight text-balance max-w-xl mx-auto mb-4">
              Ficou com alguma dúvida?
            </h2>
            <p className="relative text-muted max-w-xl mx-auto mb-8 leading-relaxed">
              Fala com a gente antes de assinar — a gente entende seu
              cenário e confirma se essa é a melhor opção pra você agora.
            </p>
            <div className="relative">
              <CTAButton href={LEAD_EXTRACTOR_WHATSAPP_LINK} external size="lg">
                Falar no WhatsApp
              </CTAButton>
            </div>
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section id="faq" divider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
          />
          <Reveal>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <SectionTitle className="mb-10 max-w-2xl">
              Antes de assinar
            </SectionTitle>
          </Reveal>
          <Reveal delay={100} className="max-w-3xl">
            <FAQAccordion items={faqItems} />
          </Reveal>
        </Section>

        {/* Resumo das funcionalidades */}
        <Section id="resumo" divider className="bg-tint">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>Resumo</Eyebrow>
            <SectionTitle>Tudo que vem com o seu acesso.</SectionTitle>
          </Reveal>
          <Reveal delay={80} className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {allFeatureTitles.map((title) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-muted">{title}</span>
                </div>
              ))}
            </div>
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
            <p className="relative mt-8 text-sm text-muted max-w-lg mx-auto">
              Quer uma implementação mais completa? A gente cuida da
              construção, dos ajustes e do suporte do seu agente, com toda a
              nossa expertise, pra você alcançar mais resultado, mais
              rápido.{" "}
              <ScheduleCallLink>Agendar uma conversa</ScheduleCallLink>
            </p>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>Plataforma by Revolução AI</p>
          <div className="flex items-center gap-6">
            <a
              href={LEAD_EXTRACTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              {LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY}
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
