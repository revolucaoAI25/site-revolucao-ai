"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { ZERO_AOS_10K_CHECKOUT_LINK } from "@/lib/links";
import { trackPixelEvent, trackPixelCustomEvent } from "@/lib/pixel";
import { submitLead } from "@/lib/leads";
import styles from "./quiz.module.css";

type StepId =
  | "intro"
  | "desejo"
  | "motivacao"
  | "breather"
  | "obstaculo"
  | "tempo"
  | "urgencia"
  | "name"
  | "phone"
  | "loading"
  | "result"
  | "autoridade"
  | "curriculo"
  | "social"
  | "offer";

const STEP_ORDER: StepId[] = [
  "intro",
  "desejo",
  "motivacao",
  "obstaculo",
  "breather",
  "tempo",
  "urgencia",
  "name",
  "phone",
  "loading",
  "result",
  "autoridade",
  "curriculo",
  "social",
  "offer",
];

const QUESTION_STEP_IDS: StepId[] = [
  "desejo",
  "motivacao",
  "obstaculo",
  "tempo",
  "urgencia",
  "name",
  "phone",
];
const TOTAL_QUESTIONS = QUESTION_STEP_IDS.length;

type Option = { id: string; label: string };
type Question = { id: StepId; question: string; options: Option[] };
type LeadAnswer = { question: string; label: string };

const DESEJO: Question = {
  id: "desejo",
  question: "Qual dessas frases mais parece com você hoje?",
  options: [
    { id: "zero", label: "🚀 Quero começar do zero e não sei por onde" },
    { id: "tecnico", label: "🛠️ Já sei mexer com automação, mas ainda não vendo" },
    { id: "cliente", label: "💼 Já tenho clientes, mas quero crescer mais rápido" },
    { id: "explorando", label: "🤔 Só estou explorando, quero entender se faz sentido" },
  ],
};

const MOTIVACAO: Question = {
  id: "motivacao",
  question: "O que mais te atrai em construir um negócio com Agentes de IA?",
  options: [
    { id: "dinheiro", label: "💰 Ganhar mais dinheiro, com uma renda própria" },
    { id: "liberdade", label: "🏠 Ter liberdade pra trabalhar de onde eu quiser" },
    { id: "negocio", label: "📈 Construir algo que cresça sem depender só de mim" },
    { id: "tecnologia", label: "🧠 Trabalhar com uma tecnologia que só cresce" },
  ],
};

const OBSTACULO: Question = {
  id: "obstaculo",
  question: "O que mais te trava hoje?",
  options: [
    { id: "ferramenta", label: "Não sei qual ferramenta usar" },
    { id: "vender", label: "Sei fazer, mas não sei vender" },
    { id: "tempo", label: "Não tenho tempo pra aprender sozinho" },
    { id: "medo", label: "Tenho medo de investir e não dar certo" },
  ],
};

const TEMPO: Question = {
  id: "tempo",
  question: "Quanto tempo por semana você consegue dedicar a isso?",
  options: [
    { id: "pouco", label: "Menos de 3h" },
    { id: "medio", label: "Entre 3h e 8h" },
    { id: "muito", label: "Mais de 8h" },
    { id: "indefinido", label: "Ainda não sei, quero entender o método primeiro" },
  ],
};

const URGENCIA: Question = {
  id: "urgencia",
  question:
    "Se você tivesse o passo a passo certo na mão, em quanto tempo acha que chegaria aos seus primeiros R$10 mil?",
  options: [
    { id: "30dias", label: "Em 30 dias" },
    { id: "2a3meses", label: "Em 2 a 3 meses" },
    { id: "nunca_tentei", label: "Não sei, nunca tentei" },
    { id: "so_entender", label: "Só quero entender o processo primeiro" },
  ],
};

const QUESTIONS: Record<string, Question> = {
  desejo: DESEJO,
  motivacao: MOTIVACAO,
  obstaculo: OBSTACULO,
  tempo: TEMPO,
  urgencia: URGENCIA,
};

const PERFIL_TITLES: Record<string, string> = {
  zero: "Iniciante Determinado",
  tecnico: "Técnico Pronto Pra Vender",
  cliente: "Pronto Pra Escalar",
  explorando: "Prestes a Dar o Primeiro Passo",
};

/** Combinado com o perfil no resultado, pra deixar o diagnóstico com
 * cara de que junta mais de uma resposta, não só a primeira pergunta. */
const URGENCIA_TAG: Record<string, string> = {
  "30dias": "que já está pronto pra agir rápido",
  "2a3meses": "que prefere ir no seu ritmo, mas sem perder tempo",
  nunca_tentei: "que está prestes a dar o primeiro passo de verdade",
  so_entender: "que ainda está entendendo se esse é o caminho certo",
};

const OBSTACULO_TEXTO: Record<string, string> = {
  ferramenta:
    "Isso não é falta de capacidade, é falta de direção. Você não precisa aprender dez ferramentas diferentes, só a certa. No Do Zero aos 10K a gente usa uma única ferramenta, o ChatFlux, do início ao fim, sem perder tempo testando o que não serve.",
  vender:
    "Construir um agente de IA bom é só metade do caminho — vender é o que faz a diferença. E vender bem não depende de carisma, depende de um roteiro certo. É isso que você recebe no módulo de Vendas: script de prospecção, critérios de qualificação e roteiro de reunião prontos.",
  tempo:
    "Você não precisa de mais tempo, precisa de um caminho mais curto. O Do Zero aos 10K é direto ao ponto: sem enrolação, sem curso de 40 horas. Só o que você precisa pra sair do zero, no seu ritmo.",
  medo: "Faz sentido ter esse receio — ninguém gosta de investir sem ter certeza do retorno. Por isso o Do Zero aos 10K custa R$37,90 e dá acesso vitalício: o risco pra você testar é o menor possível.",
};

const MOTIVACAO_OBJETIVO: Record<string, string> = {
  dinheiro: "ganhar mais dinheiro, com uma renda própria",
  liberdade: "ter liberdade pra trabalhar de onde você quiser",
  negocio: "construir um negócio que cresça sem depender só de você",
  tecnologia: "trabalhar com uma tecnologia que só cresce",
};

const curriculo = [
  {
    title: "Estruturação",
    bullet: "Posicionamento, oferta e preço definidos — sem gambiarra, sem chutar número.",
  },
  {
    title: "Desenvolvimento",
    bullet: "Seu primeiro agente de IA no ar, do zero ao WhatsApp funcionando de verdade.",
  },
  {
    title: "Vendas",
    bullet: "Script de prospecção, roteiro de reunião e follow-up prontos pra usar.",
  },
  {
    title: "Pós-venda",
    bullet: "Onboarding, suporte e retenção — sem virar refém do cliente.",
  },
];

const ofertaItens = [
  "Método completo de estruturação da agência",
  "Passo a passo de desenvolvimento de agentes",
  "Sistema de vendas validado na prática",
  "Processos de pós-venda e suporte",
  "Acesso vitalício ao conteúdo",
  "Atualizações futuras incluídas",
];

const depoimentosSocial = [
  { src: "/zero-aos-10k/depoimento-1.jpg", width: 439, height: 640 },
  { src: "/zero-aos-10k/depoimento-2.jpg", width: 640, height: 339 },
  { src: "/zero-aos-10k/depoimento-3.jpg", width: 640, height: 492 },
  { src: "/zero-aos-10k/depoimento-4.jpg", width: 640, height: 603 },
  { src: "/zero-aos-10k/depoimento-5.jpg", width: 640, height: 350 },
  { src: "/zero-aos-10k/depoimento-6.jpg", width: 640, height: 309 },
];

function formatLocalNumber(digits: string): string {
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2, 11);
  let out = "";
  if (ddd) out += `(${ddd}`;
  if (ddd.length === 2) out += ") ";
  if (rest) {
    const splitAt = rest.length > 8 ? 5 : 4;
    const part1 = rest.slice(0, splitAt);
    const part2 = rest.slice(splitAt);
    out += part2 ? `${part1}-${part2}` : part1;
  }
  return out;
}

function firstName(fullName: string) {
  return fullName.trim().split(" ")[0] || fullName;
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** fillMode "both" é o que mantém o item visível depois que a animação termina — com
 * "backwards" ele volta pro opacity-0 da classe base assim que a animação acaba. */
function CheckItem({ text, delayMs }: { text: string; delayMs: number }) {
  return (
    <li className="flex items-center gap-3 text-muted">
      <span
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[#07090a] ${styles.checkPop}`}
        style={{ animationDelay: `${delayMs}ms`, animationFillMode: "both" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className="opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${delayMs}ms`, animationFillMode: "both" }}
      >
        {text}
      </span>
    </li>
  );
}

function PrimaryButton({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer bg-accent text-[#07090a] shadow-[0_0_0_1px_rgba(0,200,83,0.4),0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.55),0_14px_36px_-10px_rgba(0,200,83,0.65)] disabled:opacity-40 disabled:pointer-events-none px-7 py-3.5 text-sm sm:text-base ${className}`}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 text-sm text-muted hover:text-text transition-colors cursor-pointer"
    >
      ← Voltar
    </button>
  );
}

/** Campo único e grande, no estilo "uma pergunta por vez" — usado nas
 * telas de nome e telefone, em vez de um formulário com vários campos. */
function BigField({
  value,
  onChange,
  placeholder,
  onSubmit,
  canSubmit,
  inputMode,
  autoFocusKey,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onSubmit: () => void;
  canSubmit: boolean;
  inputMode?: "text" | "tel";
  autoFocusKey: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [autoFocusKey]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      <input
        ref={ref}
        type={inputMode === "tel" ? "tel" : "text"}
        inputMode={inputMode === "tel" ? "numeric" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b-2 border-white/15 focus:border-accent text-lg sm:text-xl font-semibold placeholder:text-muted-2 placeholder:font-normal py-3 text-center outline-none transition-colors"
      />
      <div className="mt-10 flex justify-center">
        <PrimaryButton type="submit" disabled={!canSubmit}>
          Continuar
        </PrimaryButton>
      </div>
    </form>
  );
}

export function QuizFunnel() {
  const [step, setStep] = useState<StepId>("intro");
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<Record<string, LeadAnswer>>({});
  const [perfilId, setPerfilId] = useState<string | null>(null);
  const [obstaculoId, setObstaculoId] = useState<string | null>(null);
  const [motivacaoId, setMotivacaoId] = useState<string | null>(null);
  const [urgenciaId, setUrgenciaId] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [contact, setContact] = useState<{ name: string; phone: string } | null>(null);

  function goTo(next: StepId) {
    setHistory((h) => [...h, step]);
    setStep(next);
  }

  function goNext() {
    const idx = STEP_ORDER.indexOf(step);
    goTo(STEP_ORDER[idx + 1]);
  }

  function goBack() {
    setHistory((h) => {
      if (h.length === 0) return h;
      const copy = [...h];
      const prev = copy.pop()!;
      setStep(prev);
      return copy;
    });
  }

  function selectOption(q: Question, opt: Option) {
    setAnswers((prev) => ({ ...prev, [q.id]: { question: q.question, label: opt.label } }));
    if (q.id === "desejo") setPerfilId(opt.id);
    if (q.id === "motivacao") setMotivacaoId(opt.id);
    if (q.id === "obstaculo") setObstaculoId(opt.id);
    if (q.id === "urgencia") setUrgenciaId(opt.id);
    goNext();
  }

  function handleNameSubmit() {
    if (nameDraft.trim().length < 2) return;
    goNext();
  }

  // Salva no mesmo Supabase/webhook que os pop-ups do site já usam — o
  // /api/lead aceita contato sem e-mail (a coluna já era nullable, e o
  // tipo em src/lib/leads.ts foi ajustado pra refletir isso).
  function handlePhoneSubmit() {
    if (phoneDigits.length < 10) return;
    const name = nameDraft.trim();
    const phone = `55${phoneDigits}`;
    setContact({ name, phone });
    submitLead({
      flowId: "funil-quiz-10k",
      resultKey: obstaculoId ?? "quiz",
      answers: Object.values(answers),
      contact: { name, phone },
    });
    trackPixelEvent("Lead", { content_name: "Funil Zero aos 10K" });
    goNext();
  }

  // Cada etapa começa do topo — sem isso, se a pessoa rolou a página pra
  // ler a etapa anterior, a próxima etapa entra no meio da rolagem.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  useEffect(() => {
    if (step !== "breather") return;
    const t = setTimeout(() => goNext(), 3400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => goNext(), 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Sinal de "viu a oferta" pro pixel — dispara ao chegar na última etapa,
  // independente de clicar ou não no checkout (útil pra retargeting de
  // quem chegou até aqui mas não comprou).
  useEffect(() => {
    if (step !== "offer") return;
    trackPixelCustomEvent("ChegouNaOferta", { content_name: "Funil Zero aos 10K" });
  }, [step]);

  const answeredCount =
    Object.keys(answers).length + (nameDraft.trim().length > 1 ? 1 : 0) + (contact ? 1 : 0);
  const progressPct = Math.min(100, (answeredCount / TOTAL_QUESTIONS) * 100);
  const showProgress = step !== "intro";
  const showBack =
    history.length > 0 &&
    ["desejo", "motivacao", "obstaculo", "tempo", "urgencia", "name", "phone"].includes(step);

  function renderQuestion(q: Question) {
    const qNumber = QUESTION_STEP_IDS.indexOf(q.id) + 1;
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Pergunta {qNumber} de {TOTAL_QUESTIONS}
        </p>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-6 text-balance">
          {q.question}
        </h2>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => selectOption(q, opt)}
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "backwards" }}
              className={`group w-full flex items-center justify-between gap-3 text-left rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium transition-all duration-150 hover:border-accent/50 hover:text-accent hover:-translate-y-0.5 cursor-pointer ${styles.optionIn}`}
            >
              <span>{opt.label}</span>
              <ArrowIcon />
            </button>
          ))}
        </div>
        {showBack && <BackButton onClick={goBack} />}
      </div>
    );
  }

  function renderStep() {
    switch (step) {
      case "intro":
        return (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Diagnóstico gratuito
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-balance mb-4">
              Descubra o caminho mais rápido pra você faturar seus primeiros{" "}
              <span className="text-accent">R$10 mil</span> com Agentes de IA
            </h1>
            <p className="text-muted leading-relaxed mb-8">
              Responda algumas perguntas rápidas (menos de 2 minutos) e eu te mostro exatamente
              qual é o seu próximo passo.
            </p>
            <PrimaryButton onClick={goNext}>Começar agora</PrimaryButton>
            <p className="text-muted-2 text-xs mt-4">🔒 Gratuito, sem compromisso</p>
          </div>
        );

      case "desejo":
      case "motivacao":
      case "obstaculo":
      case "tempo":
      case "urgencia":
        return renderQuestion(QUESTIONS[step]);

      case "breather":
        return (
          <div
            className="text-center cursor-pointer select-none"
            onClick={goNext}
            role="button"
            tabIndex={0}
          >
            <p className="text-2xl mb-3">💪</p>
            <p className="text-lg sm:text-xl font-bold text-text text-balance">
              Boa! Você já está na metade.
            </p>
            <p className="text-muted mt-2">
              Só mais 2 perguntas rápidas e eu te mostro o plano certo pro seu momento.
            </p>
            <p className="text-muted-2 text-sm mt-4">Toque pra continuar →</p>
          </div>
        );

      case "name":
        return (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Quase lá
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-8 text-balance">
              Antes de mais nada, qual é o seu nome?
            </h2>
            <BigField
              value={nameDraft}
              onChange={setNameDraft}
              placeholder="Digite seu nome"
              onSubmit={handleNameSubmit}
              canSubmit={nameDraft.trim().length > 1}
              autoFocusKey="name"
            />
            {showBack && <BackButton onClick={goBack} />}
          </div>
        );

      case "phone":
        return (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Quase lá
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-8 text-balance">
              Perfeito, {firstName(nameDraft) || "tudo bem"}! Qual é o seu WhatsApp?
            </h2>
            <BigField
              value={formatLocalNumber(phoneDigits)}
              onChange={(v) => setPhoneDigits(v.replace(/\D/g, "").slice(0, 11))}
              placeholder="(11) 91234-5678"
              onSubmit={handlePhoneSubmit}
              canSubmit={phoneDigits.length >= 10}
              inputMode="tel"
              autoFocusKey="phone"
            />
            {showBack && <BackButton onClick={goBack} />}
          </div>
        );

      case "loading":
        return (
          <div className="text-center">
            <div
              className={`mx-auto mb-6 h-10 w-10 rounded-full border-2 border-accent/30 border-t-accent ${styles.spin}`}
            />
            <h2 className="text-lg sm:text-xl font-black tracking-tight mb-6">
              Analisando suas respostas...
            </h2>
            <ul className="flex flex-col gap-4 text-left max-w-xs mx-auto">
              <CheckItem text="Perfil identificado" delayMs={300} />
              <CheckItem text="Cruzando com quem já teve resultado" delayMs={1300} />
              <CheckItem text="Montando seu plano personalizado" delayMs={2300} />
            </ul>
          </div>
        );

      case "result": {
        const nome = contact ? firstName(contact.name) : "";
        const perfilTitulo = perfilId ? PERFIL_TITLES[perfilId] : "Pronto Pra Começar";
        const obstaculoTexto = obstaculoId
          ? OBSTACULO_TEXTO[obstaculoId]
          : OBSTACULO_TEXTO.ferramenta;
        const objetivoTexto = motivacaoId ? MOTIVACAO_OBJETIVO[motivacaoId] : null;
        const urgenciaTag = urgenciaId ? URGENCIA_TAG[urgenciaId] : null;
        return (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
              Seu diagnóstico
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1 text-balance">
              {nome ? `${nome}, seu` : "Seu"} perfil é:{" "}
              <span className="text-accent">{perfilTitulo}</span>
            </h2>
            {urgenciaTag && (
              <p className="text-muted text-sm mb-4">Alguém {urgenciaTag}.</p>
            )}
            <span
              className={`inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-sm font-bold text-accent mb-5 ${styles.checkPop}`}
              style={{ animationFillMode: "both" }}
            >
              ✓ Alta compatibilidade com o método Zero aos 10K
            </span>
            <p className="text-muted leading-relaxed">{obstaculoTexto}</p>
            {objetivoTexto && (
              <p className="text-muted leading-relaxed mt-4">
                E o seu objetivo —{" "}
                <span className="text-text font-semibold">{objetivoTexto}</span> — é exatamente
                pra isso que o <span className="text-text font-semibold">Do Zero aos 10K</span>{" "}
                foi feito.
              </p>
            )}
            <ul className="flex flex-col gap-3 mt-6">
              <CheckItem
                text="Você já identificou o obstáculo — a maioria nunca chega nem nisso."
                delayMs={0}
              />
              <CheckItem
                text="Esse obstáculo tem solução direta, e é isso que eu vou te mostrar agora."
                delayMs={150}
              />
              <CheckItem text="Só falta um passo: ver como funciona na prática." delayMs={300} />
            </ul>
            <div className="mt-8">
              <PrimaryButton onClick={goNext}>Quero ver como funciona</PrimaryButton>
            </div>
          </div>
        );
      }

      case "autoridade":
        return (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Quem te acompanha nisso
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-6 text-balance">
              Antes de continuar, deixa eu me apresentar.
            </h2>
            <div className="flex gap-4 items-start mb-5">
              <Image
                src="/zero-aos-10k/lucas.jpg"
                alt="Lucas Magalhães"
                width={72}
                height={72}
                className="h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 rounded-2xl object-cover border border-white/10"
              />
              <div>
                <p className="font-bold">Lucas Magalhães</p>
                <p className="text-muted-2 text-sm">Cofundador do Revolução AI</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-muted leading-relaxed">
              <p>
                Sou cofundador do{" "}
                <span className="text-text font-semibold">Revolução AI</span>, uma das maiores
                agências de IA e automações do Brasil. Hoje já atendemos mais de{" "}
                <span className="text-text font-semibold">120 clientes</span>.
              </p>
              <p>Mas eu já estive exatamente onde você está agora.</p>
              <p>
                Não sabia por onde começar. Fiquei meses quebrando a cabeça com ferramentas
                complexas, ligando pra empresas sem saber o que falar, sem fechar um único
                cliente.
              </p>
              <blockquote className="border-l-2 border-accent/50 pl-4 py-1 text-text font-semibold">
                Levei 6 meses pra ter meus primeiros 2 clientes.
              </blockquote>
              <p>
                Até que descobri um caminho mais rápido e mais simples. Foi aí que meu jogo
                mudou — e é esse mesmo caminho que eu ensino no Do Zero aos 10K.
              </p>
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={goNext}>Quero aprender o método</PrimaryButton>
            </div>
          </div>
        );

      case "curriculo":
        return (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              O treinamento
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-balance">
              O que tem dentro do Do Zero aos 10K.
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Não é teoria — é o passo a passo completo, do zero até o primeiro cliente pagando.
            </p>
            <div className="flex flex-col gap-3">
              {curriculo.map((bloco, i) => (
                <div
                  key={bloco.title}
                  style={{ animationDelay: `${i * 90}ms`, animationFillMode: "backwards" }}
                  className={`flex gap-4 items-start rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 ${styles.optionIn}`}
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-xs font-black text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold">{bloco.title}</p>
                    <p className="text-muted text-sm leading-relaxed mt-1">{bloco.bullet}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={goNext}>Ver quem já teve resultado</PrimaryButton>
            </div>
          </div>
        );

      case "social":
        return (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Quem já saiu do zero
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-balance">
              Mais de 120 clientes atendidos com esse método.
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              E gente que começou exatamente de onde você está agora.
            </p>
            <div className="columns-2 gap-3 mb-8 [&>*]:mb-3 [&>*]:break-inside-avoid">
              {depoimentosSocial.map((d) => (
                <Image
                  key={d.src}
                  src={d.src}
                  alt="Depoimento de aluno do treinamento Do Zero aos 10K"
                  width={d.width}
                  height={d.height}
                  className="w-full h-auto rounded-2xl border border-white/10"
                />
              ))}
            </div>
            <PrimaryButton onClick={goNext}>Ver o investimento</PrimaryButton>
          </div>
        );

      case "offer":
        return (
          <div>
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Do Zero aos 10K com Agentes de IA
              </p>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-balance">
                Baseado em tudo que você respondeu, esse é o seu próximo passo.
              </h2>
            </div>
            <div className="relative rounded-3xl border border-accent/20 bg-accent-soft p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span className="text-4xl font-black tracking-tight text-accent">R$ 37,90</span>
                <span className="text-muted font-semibold">| Acesso Vitalício</span>
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
              <a
                href={ZERO_AOS_10K_CHECKOUT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackPixelEvent("InitiateCheckout", {
                    value: 37.9,
                    currency: "BRL",
                    content_name: "Do Zero aos 10K",
                  })
                }
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer bg-accent text-[#07090a] shadow-[0_0_0_1px_rgba(0,200,83,0.4),0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark hover:-translate-y-0.5 px-7 py-3.5 text-sm sm:text-base"
              >
                Garantir minha vaga por R$37,90
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <p className="text-muted-2 text-xs text-center mt-4">
                🔒 Compra segura • acesso imediato
              </p>
            </div>
            <div className="mt-10">
              <p className="text-center text-muted-2 text-xs uppercase tracking-widest font-semibold mb-4">
                Clientes atendidos com o mesmo método
              </p>
              <ClientLogos />
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-bg text-text">
      {showProgress && (
        <header className="sticky top-0 z-40">
          <div className="h-1 bg-white/5">
            <div
              className="h-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </header>
      )}

      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div key={step} className={`w-full max-w-xl ${styles.stepIn}`}>
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
