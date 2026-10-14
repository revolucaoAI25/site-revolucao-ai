"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AGENCY_PAGE,
  CHAT_STEPS,
  DESTINATION_CTA,
  finalMessages,
  findVolumeOption,
  leadEventId,
  scheduleEventId,
  UTM_KEYS,
  validateAnswer,
  type AgencyDestination,
  type AnswerKind,
  type ChatStep,
} from "@/lib/agency-funnel";
import { getSessionId, isOptedOut, track, trackPageView } from "@/lib/track";
import { CalendlyDialog } from "./CalendlyDialog";
import avatar from "./avatar.webp";
import styles from "./chat.module.css";

type Message = { text: string; isUser: boolean };

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function parsePillar(text: string) {
  const match = text.match(/^([1-3])️⃣\s*([\s\S]+?):\s*([\s\S]+)$/);
  return match ? { number: Number(match[1]), title: match[2], description: match[3] } : null;
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** _fbp / _fbc do Pixel (ajudam a Meta a ligar o lead ao clique no anúncio). */
function metaBrowserIds() {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc") ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
  };
}

function firePixel(event: "Lead" | "Schedule", eventID: string) {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, {}, { eventID });
}

async function post(body: Record<string, unknown>): Promise<{ id?: string } | null> {
  try {
    const res = await fetch("/api/apresentacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

function inputKind(variable: ChatStep["variable"]): AnswerKind {
  if (variable === "nome") return "nome";
  if (variable === "whatsapp") return "whatsapp";
  if (variable === "instagram") return "instagram";
  return "obrigatorio";
}

function placeholderFor(variable: ChatStep["variable"]) {
  if (variable === "nome") return "Digite seu nome...";
  if (variable === "whatsapp") return "(11) 99999-9999";
  if (variable === "area_atuacao") return "Ex: clínica médica, advocacia...";
  return "Digite aqui...";
}

function Bubble({ message }: { message: Message }) {
  const pillar = message.isUser ? null : parsePillar(message.text);
  if (pillar) {
    return (
      <div className={styles.row}>
        <div className={styles.pillar}>
          <div className={styles.pillarInner}>
            <span className={`${styles.pillarNumber} ${styles[`pillar${pillar.number}` as "pillar1"]}`}>
              {pillar.number}
            </span>
            <div>
              <p className={styles.pillarTitle}>{pillar.title}</p>
              <p className={styles.pillarText}>{pillar.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.row} ${message.isUser ? styles.rowUser : ""}`}>
      <div className={`${styles.bubble} ${message.isUser ? styles.user : styles.bot}`}>{message.text}</div>
    </div>
  );
}

function TextInput({
  step,
  onSubmit,
}: {
  step: ChatStep;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const problem = validateAnswer(value, inputKind(step.variable));
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholderFor(step.variable)}
          autoFocus
          required
          aria-label={step.messages[0]}
        />
        <button type="button" className={styles.send} onClick={submit} aria-label="Enviar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="m21.854 2.147-10.94 10.939" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export function ChatFunnel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [inputReady, setInputReady] = useState(false);
  const [cta, setCta] = useState<{ destination: AgencyDestination; label: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const answersRef = useRef<Record<string, string>>({});
  const leadPromiseRef = useRef<Promise<string | null> | null>(null);
  const optedOutRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    const scroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
      el.parentElement?.scrollIntoView({ block: "end", behavior: "auto" });
    };
    requestAnimationFrame(scroll);
    [60, 250, 500].forEach((ms) => setTimeout(scroll, ms));
  }, []);

  const playMessages = useCallback(
    async (texts: string[]) => {
      setInputReady(false);
      for (const text of texts) {
        setTyping(true);
        scrollToBottom();
        await sleep(1600 + Math.random() * 1000);
        setTyping(false);
        setMessages((prev) => [...prev, { text, isUser: false }]);
        scrollToBottom();
        await sleep(700);
      }
    },
    [scrollToBottom]
  );

  /** Manda um evento do lead pro servidor, depois que o lead já existe. */
  const leadEvent = useCallback((event: "final" | "cta" | "calendly_open" | "scheduled") => {
    leadPromiseRef.current?.then((id) => {
      if (id) void post({ action: "event", id, event });
    });
  }, []);

  const finish = useCallback(async () => {
    const all = answersRef.current;
    const nome = all.nome || "Amigo";
    const option = findVolumeOption(all.volume_leads);
    const destination: AgencyDestination = option?.destination ?? "agendar";

    leadEvent("final");
    track(AGENCY_PAGE, "step_view", { step: "final", data: { step: "final", index: CHAT_STEPS.length } });
    await playMessages(finalMessages(nome, destination));
    setCta({ destination, label: DESTINATION_CTA[destination].label });
    scrollToBottom();
  }, [leadEvent, playMessages, scrollToBottom]);

  /** Roda a conversa a partir de um passo: mensagens de gancho seguem sozinhas, perguntas esperam a resposta. */
  const runStep = useCallback(
    async (start: number) => {
      let index = start;
      for (;;) {
        if (index >= CHAT_STEPS.length) {
          await finish();
          return;
        }
        const step = CHAT_STEPS[index];
        const nome = answersRef.current.nome ?? "";
        track(AGENCY_PAGE, "step_view", { step: step.id, data: { step: step.id, index } });
        await playMessages(step.messages.map((m) => m.replace(/\{nome\}/g, nome)));
        if (step.inputType !== "hook") {
          setInputReady(true);
          return;
        }
        index += 1;
        setStepIndex(index);
      }
    },
    [finish, playMessages]
  );

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    optedOutRef.current = isOptedOut();
    trackPageView(AGENCY_PAGE);
    void runStep(0);
  }, [runStep]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, typing, inputReady, cta, scrollToBottom]);

  async function handleAnswer(value: string) {
    const step = CHAT_STEPS[stepIndex];
    setMessages((prev) => [...prev, { text: value, isUser: true }]);
    setInputReady(false);
    scrollToBottom();

    const variable = step.variable;
    if (variable) {
      answersRef.current = { ...answersRef.current, [variable]: value };
      setAnswers(answersRef.current);

      // Só respostas de botão vão pras métricas anônimas; texto livre (nome,
      // WhatsApp, @) nunca sai daqui sem ser pelo lead.
      track(AGENCY_PAGE, "answer", {
        step: step.id,
        data: { question: step.id, label: step.inputType === "buttons" ? value : "respondeu" },
      });

      if (variable === "nome") {
        if (!optedOutRef.current) {
          const params = new URLSearchParams(window.location.search);
          const utm: Record<string, string> = {};
          for (const key of UTM_KEYS) {
            const v = params.get(key);
            if (v) utm[key] = v;
          }
          leadPromiseRef.current = post({
            action: "start",
            nome: value,
            utm,
            sessionId: getSessionId(),
            device: window.innerWidth < 768 ? "mobile" : "desktop",
            inApp: /Instagram/i.test(navigator.userAgent)
              ? "instagram"
              : /FBAN|FBAV|FB_IAB|FBIOS/i.test(navigator.userAgent)
                ? "facebook"
                : "nenhum",
            ...metaBrowserIds(),
          }).then((res) => {
            const id = res?.id ?? null;
            setLeadId(id);
            return id;
          });
        }
      } else {
        leadPromiseRef.current?.then((id) => {
          if (id) void post({ action: "answer", id, field: variable, value, step: step.id });
        });
      }

      if (variable === "whatsapp") {
        track(AGENCY_PAGE, "contact_submit", { data: { result: answersRef.current.volume_leads ?? "" } });
        // Evento Lead só pra quem passou do filtro (mais de 50 leads/mês).
        const option = findVolumeOption(answersRef.current.volume_leads);
        if (option?.qualified && !optedOutRef.current) {
          leadPromiseRef.current?.then((id) => {
            firePixel("Lead", leadEventId(id ?? `local-${Date.now()}`));
          });
        }
      }
    }

    const next = stepIndex + 1;
    setStepIndex(next);
    await runStep(next);
  }

  function handleCta() {
    if (!cta) return;
    track(AGENCY_PAGE, "checkout_click", { data: { location: cta.destination } });
    if (cta.destination === "agendar") {
      leadEvent("calendly_open");
      setDialogOpen(true);
      return;
    }
    leadEvent("cta");
    if (cta.destination === "whatsapp") {
      window.open(DESTINATION_CTA.whatsapp.href, "_blank");
      return;
    }
    // Plataforma: abre no mesmo site, levando as UTMs junto.
    window.location.assign(`${DESTINATION_CTA.plataforma.href}${window.location.search}`);
  }

  const handleScheduled = useCallback(() => {
    leadPromiseRef.current?.then((id) => {
      if (id) void post({ action: "event", id, event: "scheduled" });
      if (!optedOutRef.current) firePixel("Schedule", scheduleEventId(id ?? `local-${Date.now()}`));
    });
    setTimeout(() => {
      window.location.href = "/apresentacao/obrigado";
    }, 600);
  }, []);

  const step = CHAT_STEPS[stepIndex];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Image
          src={avatar}
          alt="Revolução AI"
          width={40}
          height={40}
          priority
          className={styles.avatar}
        />
        <div>
          <p className={styles.name}>Revolução AI</p>
          <p className={styles.online}>Online</p>
        </div>
      </div>

      <div ref={scrollRef} className={styles.messages} aria-live="polite">
        {messages.map((message, i) => (
          <Bubble key={i} message={message} />
        ))}
        {typing && (
          <div className={styles.typing} aria-label="Digitando">
            <div className={styles.typingBubble}>
              <div className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </div>
          </div>
        )}
        {cta && (
          <div className={styles.ctaWrap}>
            <button type="button" className={styles.cta} onClick={handleCta}>
              {cta.label}
            </button>
          </div>
        )}
      </div>

      {inputReady && step && step.inputType === "buttons" && step.options && (
        <div key={stepIndex} className={styles.options}>
          {step.options.map((option) => (
            <button key={option} type="button" className={styles.option} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      {inputReady && step && step.inputType === "text" && (
        <TextInput key={stepIndex} step={step} onSubmit={handleAnswer} />
      )}

      <CalendlyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onScheduled={handleScheduled}
        leadId={leadId}
        prefill={{ name: answers.nome, phone: answers.whatsapp }}
      />
    </div>
  );
}
