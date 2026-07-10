"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Calendly) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

/**
 * Agenda do Calendly embutida direto no pop-up (em vez de abrir uma nova
 * aba) — o visitante escolhe o horário sem sair do site.
 */
export function CalendlyEmbed({
  url,
  height = 650,
}: {
  url: string;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadCalendlyScript().then(() => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      style={{ minWidth: 280, height }}
      className="overflow-hidden rounded-2xl"
    />
  );
}
