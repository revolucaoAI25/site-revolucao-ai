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
import { QualificationModal } from "./QualificationModal";

type ModalState = {
  flowId: FlowId | null;
  stepId: string | null;
  history: string[];
  result: FlowResult | null;
};

type ModalContextValue = {
  open: (flowId: FlowId) => void;
  close: () => void;
  choose: (next: string) => void;
  goBack: () => void;
  state: ModalState;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const initialState: ModalState = {
  flowId: null,
  stepId: null,
  history: [],
  result: null,
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>(initialState);

  const open = useCallback((flowId: FlowId) => {
    const flow = flows[flowId];
    setState({
      flowId,
      stepId: flow.startStepId,
      history: [],
      result: null,
    });
  }, []);

  const close = useCallback(() => setState(initialState), []);

  const choose = useCallback((next: string) => {
    setState((prev) => {
      if (!prev.flowId) return prev;
      const flow = flows[prev.flowId];
      if (next.startsWith("result:")) {
        const resultKey = next.replace("result:", "");
        return {
          ...prev,
          result: flow.results[resultKey] ?? null,
        };
      }
      return {
        ...prev,
        history: prev.stepId ? [...prev.history, prev.stepId] : prev.history,
        stepId: next,
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.result) {
        return { ...prev, result: null };
      }
      if (prev.history.length === 0) return prev;
      const nextHistory = [...prev.history];
      const previousStep = nextHistory.pop()!;
      return { ...prev, history: nextHistory, stepId: previousStep };
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
    () => ({ open, close, choose, goBack, state }),
    [open, close, choose, goBack, state]
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
