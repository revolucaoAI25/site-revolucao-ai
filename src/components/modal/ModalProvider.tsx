"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { flows, type FlowId, type FlowResult } from "@/lib/qualification-flows";
import { loadCalendlyScript } from "@/lib/calendly";
import { submitLead, type LeadAnswer } from "@/lib/leads";
import { QualificationModal } from "./QualificationModal";

type Contact = { name: string; phone: string };

type ModalState = {
  flowId: FlowId | null;
  stepId: string | null;
  history: string[];
  answers: LeadAnswer[];
  contact: Contact | null;
  result: FlowResult | null;
};

type ModalContextValue = {
  open: (flowId: FlowId) => void;
  close: () => void;
  choose: (next: string, question?: string, label?: string) => void;
  submitContact: (name: string, phone: string, next: string) => void;
  goBack: () => void;
  state: ModalState;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const initialState: ModalState = {
  flowId: null,
  stepId: null,
  history: [],
  answers: [],
  contact: null,
  result: null,
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>(initialState);

  const open = useCallback((flowId: FlowId) => {
    const flow = flows[flowId];
    // Começa a carregar o script do Calendly assim que o pop-up abre, bem
    // antes do usuário chegar num resultado com agenda — evita o delay
    // perceptível de só disparar o carregamento na última etapa.
    loadCalendlyScript();
    setState({
      flowId,
      stepId: flow.startStepId,
      history: [],
      answers: [],
      contact: null,
      result: null,
    });
  }, []);

  const close = useCallback(() => setState(initialState), []);

  // `choose`/`submitContact` disparam `submitLead` (efeito colateral) fora
  // do updater do `setState`: updaters devem ser puros, e o React invoca
  // essa função duas vezes em dev/Strict Mode — se o POST estivesse lá
  // dentro, cada resultado seria salvo em duplicidade.
  const choose = useCallback(
    (next: string, question?: string, label?: string) => {
      if (!state.flowId) return;
      const flow = flows[state.flowId];
      const answer = question && label ? { question, label } : null;

      if (next.startsWith("result:")) {
        const resultKey = next.replace("result:", "");
        submitLead({
          flowId: state.flowId,
          resultKey,
          answers: answer ? [...state.answers, answer] : state.answers,
          contact: state.contact,
        });
        setState((prev) => ({ ...prev, result: flow.results[resultKey] ?? null }));
        return;
      }

      setState((prev) => ({
        ...prev,
        history: prev.stepId ? [...prev.history, prev.stepId] : prev.history,
        stepId: next,
        answers: answer ? [...prev.answers, answer] : prev.answers,
      }));
    },
    [state]
  );

  const submitContact = useCallback(
    (name: string, phone: string, next: string) => {
      if (!state.flowId) return;
      const flow = flows[state.flowId];
      const contact = { name, phone };

      if (next.startsWith("result:")) {
        const resultKey = next.replace("result:", "");
        submitLead({
          flowId: state.flowId,
          resultKey,
          answers: state.answers,
          contact,
        });
        setState((prev) => ({
          ...prev,
          contact,
          result: flow.results[resultKey] ?? null,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        contact,
        history: prev.stepId ? [...prev.history, prev.stepId] : prev.history,
        stepId: next,
      }));
    },
    [state]
  );

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.result) {
        return { ...prev, result: null };
      }
      if (prev.history.length === 0) return prev;
      const nextHistory = [...prev.history];
      const previousStep = nextHistory.pop()!;
      return {
        ...prev,
        history: nextHistory,
        stepId: previousStep,
        answers: prev.answers.slice(0, -1),
      };
    });
  }, []);

  useEffect(() => {
    if (!state.flowId) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [state.flowId, close]);

  const value = useMemo(
    () => ({ open, close, choose, submitContact, goBack, state }),
    [open, close, choose, submitContact, goBack, state]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <QualificationModal />
    </ModalContext.Provider>
  );
}

export function useQualificationModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useQualificationModal must be used within ModalProvider");
  }
  return ctx;
}
