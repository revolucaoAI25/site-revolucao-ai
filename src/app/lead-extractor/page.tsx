import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { PillarCard } from "@/components/ui/PillarCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { PandaVideoEmbed } from "@/components/lead-extractor/PandaVideoEmbed";
import { ROICalculator } from "@/components/lead-extractor/ROICalculator";
import {
  LEAD_EXTRACTOR_WHATSAPP_LINK,
  LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY,
  EMAIL,
  LEAD_EXTRACTOR_CHECKOUT_MENSAL_LINK,
  LEAD_EXTRACTOR_CHECKOUT_ANUAL_LINK,
} from "@/lib/links";

const title = "Lead Extractor — Ferramenta de Prospecção Ativa";
const description =
  "Encontre centenas de leads qualificados com Google Maps e CNPJ, e mantenha uma prospecção automática rodando sozinha, direto pro Google Sheets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/lead-extractor" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "/lead-extractor/hero-dashboard.png",
        width: 1344,
        height: 556,
        alt: "Painel do Lead Extractor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/lead-extractor/hero-dashboard.png"],
  },
};

type ComparativoValor = true | false | string;

const comparativoColunas = ["Lead Extractor", "Apollo.io", "Ramper", "Speedio", "Econodata"];

const comparativo: { dimensao: string; valores: ComparativoValor[] }[] = [
  {
    dimensao: "Leads locais via Google Maps",
    valores: [true, false, false, false, false],
  },
  {
    dimensao: "Dados fiscais de CNPJ (Receita Federal)",
    valores: [true, false, false, true, true],
  },
  {
    dimensao: "Automação de busca agendada + Google Sheets",
    valores: [true, "Sequência de e-mail", "Sequência de e-mail", false, false],
  },
  {
    dimensao: "Enriquecimento Avançado 360°",
    valores: [true, false, false, false, "Parcial"],
  },
  {
    dimensao: "Preço de entrada",
    valores: [
      "R$337/mês",
      "US$49/usuário/mês",
      "A partir de R$500/mês",
      "A partir de R$500/mês",
      "A partir de R$300/mês",
    ],
  },
];

function ComparativoCell({ valor, destaque }: { valor: ComparativoValor; destaque: boolean }) {
  if (valor === true) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          destaque ? "bg-accent-soft text-accent" : "bg-white/[0.06] text-muted"
        }`}
      >
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
  if (valor === false) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-muted-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  return <span className={destaque ? "text-text" : "text-muted"}>{valor}</span>;
}

const fluxoIcons = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  schedule: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </>
  ),
};

const fluxo: { icon: keyof typeof fluxoIcons; title: string; description: string }[] = [
  {
    icon: "search",
    title: "Escolha a fonte",
    description:
      "Google Maps pra leads locais, ou CNPJ da Receita Federal pra prospecção B2B estruturada.",
  },
  {
    icon: "filter",
    title: "Defina os filtros",
    description:
      "Nicho, localização, porte, CNAE — quanto mais específico, melhor a qualidade do resultado.",
  },
  {
    icon: "schedule",
    title: "Busque ou agende",
    description:
      "Rode a busca na hora, ou deixe uma automação rodando sozinha todos os dias.",
  },
  {
    icon: "download",
    title: "Receba os leads",
    description:
      "Direto no Google Sheets, ou baixe em Excel/CSV — prontos pra prospectar.",
  },
];

const planoFeatures = [
  "Busca ilimitada no Google Maps (telefone, site, avaliações)",
  "Busca ilimitada por CNPJ na base da Receita Federal",
  "Filtros avançados por nicho, localização, porte e CNAE",
  "Automações agendadas com deduplicação automática",
  "Exportação automática pro Google Sheets + Excel/CSV",
  "Enriquecimento Avançado 360° (CNPJ + Google Maps)",
  "Histórico completo de buscas",
];

const enriquecimento = [
  {
    title: "Sócios e responsável legal",
    description:
      "Direto da Receita Federal — fale com quem decide, não só com “a empresa”.",
  },
  {
    title: "Porte real do negócio",
    description:
      "Capital social declarado cruzado com o volume e a nota das avaliações no Google Maps.",
  },
  {
    title: "Segmento exato",
    description:
      "CNAE, natureza jurídica e regime tributário, pra prospecção ultra-segmentada por nicho.",
  },
  {
    title: "Mais de uma via de contato",
    description:
      "Site oficial e um segundo telefone, quando disponíveis — se um não responde, você tenta o outro.",
  },
  {
    title: "Confirmação de atividade real",
    description:
      "Cruza com o Google Maps pra confirmar que a empresa realmente aparece pro público, não só um CNPJ aberto no papel.",
  },
  {
    title: "Endereço físico real",
    description:
      "O endereço fiscal da Receita cruzado com a localização real no Google Maps — útil pra quem prospecta porta a porta.",
  },
];

const extras = [
  {
    title: "Histórico completo de buscas",
    description:
      "Toda busca fica salva — retome campanhas de onde parou e evite prospectar o mesmo contato duas vezes.",
  },
  {
    title: "Capacidade sob demanda",
    description:
      "A infraestrutura escala por trás das cenas conforme seu volume de busca cresce — você não fica travado num limite baixo.",
  },
  {
    title: "Busca em qualquer país",
    description:
      "O Google Maps busca negócios fora do Brasil também — a busca por CNPJ é exclusiva para empresas brasileiras.",
  },
  {
    title: "Guia completo + suporte por e-mail",
    description:
      "Todo assinante recebe um guia passo a passo de como usar a ferramenta, e pode contar com suporte por e-mail sempre que precisar.",
  },
];

export default function LeadExtractor() {
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
                Lead Extractor
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
              <Eyebrow>Lead Extractor</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-balance leading-[1.05]">
                Encontre centenas de leads qualificados em minutos — não em
                horas de busca manual.
              </h1>
              <p className="text-base sm:text-lg text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
                Dois motores de busca — Google Maps e CNPJ da Receita Federal
                — e um sistema de automação que roda sozinho, exportando os
                resultados direto pro Google Sheets.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                <CTAButton href="#planos" size="lg">
                  Ver planos e preços
                </CTAButton>
                <CTAButton href="#demonstracao" variant="secondary" size="lg">
                  Ver demonstração
                </CTAButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160} className="mt-14 max-w-5xl mx-auto">
            <Image
              src="/lead-extractor/hero-dashboard.png"
              alt="Painel do Lead Extractor com a busca por nicho e localização"
              width={1344}
              height={556}
              className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              priority
            />
          </Reveal>
        </Section>

        {/* Vídeo de demonstração */}
        <Section id="demonstracao" divider>
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <Eyebrow>Veja funcionando</Eyebrow>
            <SectionTitle>A ferramenta rodando, na prática.</SectionTitle>
          </Reveal>
          <Reveal delay={80} className="max-w-4xl mx-auto">
            <PandaVideoEmbed />
          </Reveal>
        </Section>

        {/* Fluxo de uso */}
        <Section divider>
          <Reveal>
            <Eyebrow>Do zero ao lead pronto</Eyebrow>
            <SectionTitle className="mb-14 max-w-2xl">
              Um resumo de como a ferramenta entrega valor, de ponta a ponta.
            </SectionTitle>
          </Reveal>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40" />
            {fluxo.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent shadow-[0_0_20px_rgba(0,200,83,0.25)] mb-5">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {fluxoIcons[step.icon]}
                  </svg>
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

        {/* Os 3 motores */}
        <Section id="funcionalidades" divider className="bg-tint">
          <Reveal>
            <Eyebrow>Como funciona</Eyebrow>
            <SectionTitle className="mb-10 max-w-2xl">
              Dois motores de busca. Um sistema de automação. Uma prospecção
              contínua.
            </SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Reveal delay={80}>
              <PillarCard
                number="01"
                title="Google Maps"
                description="Encontra estabelecimentos reais com telefone, site e avaliações — ideal pra prospecção local, por nicho e região."
              />
            </Reveal>
            <Reveal delay={140}>
              <PillarCard
                number="02"
                title="Busca por CNPJ"
                description="Consulta direta na Receita Federal: sócios, capital social, regime tributário e CNAE — ideal pra prospecção B2B estruturada."
              />
            </Reveal>
            <Reveal delay={200}>
              <PillarCard
                number="03"
                title="Automações"
                description="Buscas que rodam sozinhas, nos dias e horários que você definir, exportando os leads direto pro Google Sheets."
              />
            </Reveal>
          </div>
          <p className="text-base text-muted leading-relaxed max-w-2xl">
            Use os três recursos juntos para uma estratégia de prospecção
            completa e contínua.
          </p>
        </Section>

        {/* Google Maps em detalhe */}
        <Section divider>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow>Google Maps</Eyebrow>
              <SectionTitle className="mb-6">
                Prospecção local, com os dados de contato que você realmente
                usa.
              </SectionTitle>
              <ul className="space-y-4">
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Busque por nicho e localização — quanto mais específico o
                  termo (ex: &quot;advogado trabalhista&quot; em vez de
                  &quot;escritório&quot;), melhores os resultados.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Filtros de qualidade: apenas com telefone, apenas com site,
                  ou apenas leads novos — sem duplicar quem você já
                  prospectou.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Cada resultado traz nome, telefone, site, endereço,
                  avaliação no Google e link direto pro perfil.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <Image
                src="/lead-extractor/busca-maps.png"
                alt="Tela de busca do Google Maps no Lead Extractor, com filtros de nicho e localização"
                width={1109}
                height={558}
                className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              />
            </Reveal>
          </div>
        </Section>

        {/* CNPJ em detalhe */}
        <Section divider className="bg-tint">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="order-2 lg:order-1 flex flex-col gap-4">
              <Image
                src="/lead-extractor/busca-cnpj-tabs.png"
                alt="Aba de busca por CNPJ do Lead Extractor"
                width={1064}
                height={552}
                className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              />
              <Image
                src="/lead-extractor/busca-cnpj-filtros.png"
                alt="Filtros avançados da busca por CNPJ: estado, CNAE, Simples Nacional e enriquecimento"
                width={1075}
                height={555}
                className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              />
            </Reveal>
            <Reveal delay={100} className="order-1 lg:order-2">
              <Eyebrow>Busca por CNPJ</Eyebrow>
              <SectionTitle className="mb-6">
                Prospecção B2B com dados fiscais direto da Receita Federal.
              </SectionTitle>
              <ul className="space-y-4">
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Filtre por estado, município, CNAE, natureza jurídica,
                  Simples Nacional ou MEI.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  <span>
                    Buscas ilimitadas —{" "}
                    <span className="text-text font-semibold">
                      defina o volume que quiser
                    </span>
                    , de dezenas a milhares de empresas por consulta.
                  </span>
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Ative o enriquecimento com um toggle: cruza cada empresa
                  com o Google Maps pra completar telefone, site e
                  avaliações que não vieram da Receita, sem sobrescrever
                  nada.
                </li>
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* Automações em detalhe */}
        <Section divider>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow>Automações</Eyebrow>
              <SectionTitle className="mb-6">
                Prospecção que roda sozinha, todos os dias.
              </SectionTitle>
              <ul className="space-y-4">
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Configure uma vez: nicho, filtros, dias e horários de
                  execução.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Deduplicação automática — nunca exporta um contato que já
                  está no seu histórico, mesmo entre automações diferentes.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Múltiplos horários por dia, planilha de destino própria, e
                  pause ou retome quando quiser.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <Image
                src="/lead-extractor/automacoes.png"
                alt="Tela de automações do Lead Extractor com uma automação diária ativa"
                width={1365}
                height={538}
                className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              />
            </Reveal>
          </div>
        </Section>

        {/* Resultados e exportação */}
        <Section divider className="bg-tint">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="order-2 lg:order-1">
              <Image
                src="/lead-extractor/resultados.png"
                alt="Resultados de uma busca no Lead Extractor com estatísticas e prévia da tabela de leads"
                width={1072}
                height={546}
                className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              />
            </Reveal>
            <Reveal delay={100} className="order-1 lg:order-2">
              <Eyebrow>Resultados</Eyebrow>
              <SectionTitle className="mb-6">
                Seus leads, organizados e prontos pra prospectar.
              </SectionTitle>
              <ul className="space-y-4">
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Exportação automática pro Google Sheets a cada busca
                  concluída, sem nenhuma ação manual.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Ou baixe na hora em Excel ou CSV, com todos os campos e
                  links clicáveis.
                </li>
                <li className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-accent shrink-0">—</span>
                  Estatísticas rápidas de cada busca: total de leads,
                  quantos têm telefone, site e e-mail.
                </li>
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* E ainda tem */}
        <Section divider>
          <Reveal>
            <Eyebrow>E ainda tem</Eyebrow>
            <SectionTitle className="mb-10 max-w-2xl">
              Os detalhes que fazem diferença no dia a dia.
            </SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extras.map((extra, index) => (
              <Reveal
                key={extra.title}
                delay={index * 80}
                className="card-surface card-hover rounded-3xl p-7 flex flex-col"
              >
                <h3 className="font-bold text-base mb-2">{extra.title}</h3>
                <p className="text-muted leading-relaxed text-[15px]">
                  {extra.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Comparativo com o mercado */}
        <Section divider className="bg-tint">
          <Reveal className="max-w-2xl mb-10">
            <Eyebrow>Comparativo</Eyebrow>
            <SectionTitle>
              O que muda em relação a outras plataformas de prospecção.
            </SectionTitle>
          </Reveal>
          <Reveal delay={80} className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-muted-2 uppercase tracking-widest">
                    &nbsp;
                  </th>
                  {comparativoColunas.map((col, i) => (
                    <th
                      key={col}
                      className={`text-left py-4 pr-4 text-sm font-semibold uppercase tracking-widest ${
                        i === 0 ? "text-accent" : "text-muted-2"
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
                        <ComparativoCell valor={valor} destaque={i === 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="text-sm text-muted-2 mt-6">
            Comparativo com base em informações públicas de cada plataforma,
            sujeitas a mudança.
          </p>
        </Section>

        {/* Enriquecimento Avançado 360 */}
        <Section divider>
          <Reveal className="max-w-2xl mb-10">
            <Eyebrow>Diferencial</Eyebrow>
            <SectionTitle>
              Enriquecimento Avançado 360°: cada lead sai com mais do que um
              nome numa lista.
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Toda busca por CNPJ pode ser enriquecida com o perfil real da
              empresa no Google Maps — é só ativar o toggle. O resultado é
              um lead mais completo, com mais de uma forma de chegar até
              ele.
            </p>
          </Reveal>
          <div className="rounded-3xl border border-accent/30 bg-accent-soft p-8">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              {enriquecimento.map((item, index) => (
                <Reveal key={item.title} delay={index * 60} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
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
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* Calculadora de ROI */}
        <Section id="calculadora" divider className="bg-tint">
          <Reveal className="max-w-2xl mb-12">
            <Eyebrow>Calculadora de ROI</Eyebrow>
            <SectionTitle>
              Veja quanto o Lead Extractor pode gerar pro seu negócio.
            </SectionTitle>
            <p className="text-muted leading-relaxed mt-4">
              Preencha com os números do seu negócio e simule o retorno — do
              lead extraído até a venda fechada.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ROICalculator />
          </Reveal>
        </Section>

        {/* Planos e preços */}
        <Section id="planos" divider>
          <Reveal className="text-center mb-12">
            <Eyebrow>Planos</Eyebrow>
            <SectionTitle className="max-w-2xl mx-auto">
              Escolha o plano que faz sentido pro seu volume de prospecção.
            </SectionTitle>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Reveal delay={80} className="card-surface rounded-3xl p-8 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-3">
                Mensal
              </p>
              <p className="text-4xl font-black tracking-tight mb-1">
                R$497<span className="text-lg font-semibold text-muted">,90/mês</span>
              </p>
              <p className="text-muted text-sm mb-8">Sem fidelidade.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {planoFeatures.map((item) => (
                  <li key={item} className="flex gap-3 text-muted text-sm leading-relaxed">
                    <span className="text-accent shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <CTAButton
                href={LEAD_EXTRACTOR_CHECKOUT_MENSAL_LINK}
                variant="secondary"
              >
                Quero assinar
              </CTAButton>
            </Reveal>

            <Reveal
              delay={140}
              className="relative card-surface rounded-3xl p-8 flex flex-col border-accent/30 shadow-[0_0_0_1px_rgba(0,200,83,0.3),0_20px_60px_-15px_rgba(0,200,83,0.25)]"
            >
              <span className="absolute -top-3 right-8 rounded-full bg-accent text-[#07090a] text-xs font-bold uppercase tracking-widest px-3 py-1">
                Economize R$1.930/ano
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Anual
              </p>
              <p className="text-4xl font-black tracking-tight mb-1">
                R$337<span className="text-lg font-semibold text-muted">/mês</span>
              </p>
              <p className="text-muted text-sm mb-8">
                R$4.044/ano, faturado em 12x.
              </p>
              <ul className="space-y-3 mb-5 flex-1">
                {planoFeatures.map((item) => (
                  <li key={item} className="flex gap-3 text-muted text-sm leading-relaxed">
                    <span className="text-accent shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                  Bônus do plano anual
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Extração de leads também via Instagram — seguidores ou
                  comentaristas de perfis públicos, mais uma fonte de
                  prospecção além do Maps e do CNPJ.
                </p>
              </div>
              <CTAButton href={LEAD_EXTRACTOR_CHECKOUT_ANUAL_LINK}>
                Quero assinar
              </CTAButton>
            </Reveal>
          </div>
          <p className="text-center text-sm text-muted-2 mt-8 max-w-xl mx-auto">
            Limites de busca e créditos variam conforme o plano — fale com a
            gente pra entender o ideal pro seu volume de prospecção.
          </p>
        </Section>

        {/* Fale com a gente antes de comprar */}
        <Section divider>
          <Reveal
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-12 sm:px-16 sm:py-14 text-center"
          >
            <div className="glow h-[280px] w-[280px] -top-20 left-1/2 -translate-x-1/2" />
            <h2 className="relative text-xl sm:text-2xl font-black tracking-tight text-balance max-w-xl mx-auto mb-4">
              Ainda com dúvida se é isso que você precisa?
            </h2>
            <p className="relative text-muted max-w-xl mx-auto mb-8 leading-relaxed">
              Fala com a gente antes de assinar — a gente entende seu cenário
              e confirma se o Lead Extractor é o caminho certo pra você.
            </p>
            <div className="relative">
              <CTAButton href={LEAD_EXTRACTOR_WHATSAPP_LINK} external size="lg">
                Falar com a gente
              </CTAButton>
            </div>
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section id="faq" divider>
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
                  question: "Preciso saber programar ou configurar algo técnico?",
                  answer:
                    "Não. Depois de assinar, você só usa: escolhe o nicho, a região e os filtros — a ferramenta faz o resto.",
                },
                {
                  question: "Preciso ter minha própria chave de API do Google Maps?",
                  answer:
                    "Sim, a busca por Google Maps usa a API do Google e depende de uma chave sua (gratuita de criar). A ferramenta já vem com um sistema automático que rotaciona o uso entre suas chaves, mantendo tudo dentro do limite gratuito da API e evitando gastos extras.",
                },
                {
                  question: "Os planos têm fidelidade?",
                  answer:
                    "O mensal não tem fidelidade, cancele quando quiser. O anual é um compromisso de 12 meses, faturado em parcelas fixas.",
                },
                {
                  question: "Funciona pra qualquer nicho e região?",
                  answer:
                    "O Google Maps busca negócios no Brasil e em outros países. A busca por CNPJ é exclusiva para empresas brasileiras, com dados da Receita Federal.",
                },
                {
                  question: "Os leads exportados somem se eu cancelar?",
                  answer:
                    "Não. Tudo que já foi exportado pro seu Google Sheets ou baixado em Excel continua seu, independente da assinatura.",
                },
                {
                  question: "Posso usar no celular?",
                  answer:
                    "Sim, a plataforma é responsiva — mas a experiência é melhor no desktop, principalmente pra visualizar tabelas com muitas colunas.",
                },
              ]}
            />
          </Reveal>
        </Section>

        {/* Some com IA */}
        <Section divider className="bg-tint">
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <Eyebrow>Quer ir além da prospecção?</Eyebrow>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3 max-w-xl">
                O agente de IA já dispara a primeira mensagem pra esses leads
                por você.
              </h3>
              <p className="text-muted leading-relaxed max-w-xl">
                Se você contratar a implementação completa de agentes de IA,
                a planilha alimentada pelo Lead Extractor pode ser monitorada
                pra disparar mensagens automáticas assim que novos leads
                chegam.
              </p>
            </div>
            <Link
              href="/agentes-de-ia"
              className="group inline-flex items-center gap-2 font-semibold text-accent shrink-0"
            >
              Conhecer o agente de IA
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
        </Section>

        {/* CTA final */}
        <Section divider>
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-16 sm:py-16 text-center">
            <div className="glow h-[320px] w-[320px] -top-24 left-1/2 -translate-x-1/2" />
            <h2 className="relative text-2xl sm:text-3xl font-black tracking-tight text-balance max-w-2xl mx-auto mb-8">
              Pare de procurar leads manualmente.
            </h2>
            <div className="relative">
              <CTAButton href="#planos" size="lg">
                Ver planos e preços
              </CTAButton>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>Lead Extractor by Revolução AI</p>
          <div className="flex items-center gap-6">
            <a href={LEAD_EXTRACTOR_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
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
