"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { ContactForm } from "@/components/modal/ContactForm";
import { submitLead, type LeadAnswer } from "@/lib/leads";
import { ZERO_AOS_10K_CHECKOUT_LINK } from "@/lib/links";
import styles from "./quiz.module.css";

type StepId =
  | "intro"
  | "desejo"
  | "motivacao"
  | "breather"
  | "obstaculo"
  | "tempo"
  | "urgencia"
  | "contact"
  | "loading"
  | "result"
  | "social"
  | "offer";

const STEP_ORDER: StepId[] = [
  "intro",
  "desejo",
  "motivacao",
  "breather",
  "obstaculo",
  "tempo",
  "urgencia",
  "contact",
  "loading",
  "result",
  "social",
  "offer",
];

const QUESTION_STEP_IDS: StepId[] = [
  "desejo",
  "motivacao",
  "obstaculo",
  "tempo",
  "urgencia",
  "contact",
];
const TOTAL_QUESTIONS = QUESTION_STEP_IDS.length;

type Option = { id: string; label: string };
type Question = { id: StepId; question: string; options: Option[] };

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
    { id: "dinheiro", label: "💰 Ganhar dinheiro sem depender de patrão" },
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
  tecnico: "Técnico Sem Vendas",
  cliente: "Pronto Pra Escalar",
  explorando: "Em Fase de Decisão",
};

const OBSTACULO_TEXTO: Record<string, string> = {
  ferramenta:
    "Isso não é falta de capacidade — é falta de direção. Você não precisa aprender 10 ferramentas diferentes, só a certa. No Do Zero aos 10K a gente usa uma única ferramenta, o ChatFlux, do início ao fim, sem perder tempo testando o que não serve.",
  vender:
    "Saber construir um agente de IA bom não paga boleto sozinho — vender é o que faz a diferença. E vender não é sobre ter lábia, é sobre ter um roteiro. É exatamente isso que você recebe no módulo de Vendas: script de prospecção, critérios de qualificação e roteiro de reunião prontos.",
  tempo:
    "Você não precisa de mais tempo — precisa de um caminho mais curto. O Do Zero aos 10K é direto ao ponto: sem enrolação, sem curso de 40 horas. Só o que você precisa pra sair do zero, no seu ritmo.",
  medo: "Faz sentido ter esse receio — investir sem saber se vai dar certo dói. Por isso o Do Zero aos 10K custa R$37,90 e te dá acesso vitalício: o risco pra você experimentar é o menor possível.",
};

const MOTIVACAO_OBJETIVO: Record<string, string> = {
  dinheiro: "ganhar dinheiro sem depender de patrão",
  liberdade: "ter liberdade pra trabalhar de onde você quiser",
  negocio: "construir um negócio que cresça sem depender só de você",
  tecnologia: "trabalhar com uma tecnologia que só cresce",
};

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
  { src: "/zero-aos-10k/depoimento-3.jpg", width: 640, height: 492 },
];

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

function CheckItem({ text, delayMs }: { text: string; delayMs: number }) {
  return (
    <li className="flex items-center gap-3 text-muted">
      <span
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[#07090a] ${styles.checkPop}`}
        style={{ animationDelay: `${delayMs}ms`, animationFillMode: "backwards" }}
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
        style={{ animationDelay: `${delayMs}ms`, animationFillMode: "backwards" }}
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
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer bg-accent text-[#07090a] shadow-[0_0_0_1px_rgba(0,200,83,0.4),0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.55),0_14px_36px_-10px_rgba(0,200,83,0.65)] px-7 py-3.5 text-sm sm:text-base ${className}`}
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

function firstName(fullName: string) {
  return fullName.trim().split(" ")[0] || fullName;
}

export function QuizFunnel() {
  const [step, setStep] = useState<StepId>("intro");
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<Record<string, LeadAnswer>>({});
  const [perfilId, setPerfilId] = useState<string | null>(null);
  const [obstaculoId, setObstaculoId] = useState<string | null>(null);
  const [motivacaoId, setMotivacaoId] = useState<string | null>(null);
  const [contact, setContact] = useState<{ name: string; phone: string; email: string } | null>(
    null
  );

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
    goNext();
  }

  function handleContactSubmit(name: string, phone: string, email: string) {
    setContact({ name, phone, email });
    submitLead({
      flowId: "funil-quiz-10k",
      resultKey: obstaculoId ?? "quiz",
      answers: Object.values(answers),
      contact: { name, phone, email },
    });
    goNext();
  }

  useEffect(() => {
    if (step !== "breather") return;
    const t = setTimeout(() => goNext(), 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => goNext(), 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const answeredCount = Object.keys(answers).length + (contact ? 1 : 0);
  const progressPct = Math.min(100, (answeredCount / TOTAL_QUESTIONS) * 100);
  const showProgress = step !== "intro";
  const showBack =
    history.length > 0 && ["desejo", "motivacao", "obstaculo", "tempo", "urgencia", "contact"].includes(step);

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
            <p className="text-lg sm:text-xl font-bold text-text text-balance">
              Só mais 2 perguntas rápidas e eu te mostro o plano certo pro seu momento. 💪
            </p>
            <p className="text-muted-2 text-sm mt-3">Toque pra continuar →</p>
          </div>
        );

      case "contact":
        return (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Quase lá
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-balance">
              Perfeito! Já sei qual é o caminho certo pra você.
            </h2>
            <p className="text-muted mb-2">
              Pra onde eu te mando o seu diagnóstico personalizado?
            </p>
            <ContactForm onSubmit={handleContactSubmit} />
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
        return (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Seu diagnóstico
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1 text-balance">
              {nome ? `${nome}, seu` : "Seu"} perfil é:{" "}
              <span className="text-accent">{perfilTitulo}</span>
            </h2>
            <p className="text-muted leading-relaxed mt-4">{obstaculoTexto}</p>
            {objetivoTexto && (
              <p className="text-muted leading-relaxed mt-4">
                E o seu objetivo —{" "}
                <span className="text-text font-semibold">{objetivoTexto}</span> — é exatamente
                pra isso que o <span className="text-text font-semibold">Do Zero aos 10K</span>{" "}
                foi feito.
              </p>
            )}
            <div className="mt-8">
              <PrimaryButton onClick={goNext}>Quero ver o plano completo</PrimaryButton>
            </div>
          </div>
        );
      }

      case "social":
        return (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Quem já saiu do zero
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-6 text-balance">
              Se funcionou pra eles, funciona pra você.
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
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
            <PrimaryButton onClick={goNext}>Continuar</PrimaryButton>
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
                  <li
                    key={item}
                    className="flex gap-3 text-muted text-[15px] leading-relaxed"
                  >
                    <span className="text-accent shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={ZERO_AOS_10K_CHECKOUT_LINK}
                target="_blank"
                rel="noopener noreferrer"
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
      <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-xl mx-auto px-5 py-4 flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Revolução AI"
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-full"
            priority
          />
          <span className="text-sm font-bold tracking-tight">Do Zero aos 10K</span>
        </div>
        {showProgress && (
          <div className="h-1 bg-white/5">
            <div
              className="h-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div key={step} className={`w-full max-w-xl ${styles.stepIn}`}>
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
