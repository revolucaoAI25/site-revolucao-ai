"use client";

import { useEffect, useRef } from "react";
import { CALENDLY_AGENTE_LINK } from "@/lib/links";
import { UTM_KEYS } from "@/lib/agency-funnel";
import { toInternationalPhone } from "@/lib/phone";
import styles from "./chat.module.css";

/**
 * Janela com a agenda do Calendly (iframe). O Calendly avisa a página via
 * postMessage quando o agendamento é concluído. O id do lead vai como
 * `utm_content` pro Calendly — é por ele que o webhook (/api/calendly-webhook)
 * sabe de qual lead é o agendamento.
 */
export function CalendlyDialog({
  open,
  onOpenChange,
  onScheduled,
  leadId,
  prefill,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduled: () => void;
  leadId: string | null;
  prefill: { name?: string; phone?: string };
}) {
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled" && !scheduledRef.current) {
        scheduledRef.current = true;
        onScheduled();
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange, onScheduled]);

  if (!open) return null;

  const params = new URLSearchParams({ embed: "true", hide_gdpr_banner: "1" });
  if (prefill.name) params.set("name", prefill.name);
  // No chat a pessoa digita só DDD + número; o Calendly precisa do +55.
  const phone = toInternationalPhone(prefill.phone);
  if (phone) params.set("a1", phone);
  // Origem da visita (campanha, fonte...) segue pro Calendly; o `utm_content`
  // carrega o id do lead, que é o que o webhook usa pra achar o lead.
  const visit = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = visit.get(key);
    if (value && key !== "utm_content") params.set(key, value);
  }
  if (leadId) params.set("utm_content", leadId);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Agendar reunião">
        <p className={styles.srOnly}>
          Escolha um horário disponível para sua reunião com a Revolução AI
        </p>
        <button type="button" className={styles.close} onClick={() => onOpenChange(false)} aria-label="Fechar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <iframe
          className={styles.frame}
          src={`${CALENDLY_AGENTE_LINK}?${params.toString()}`}
          title="Calendário de agendamento"
        />
      </div>
    </div>
  );
}
