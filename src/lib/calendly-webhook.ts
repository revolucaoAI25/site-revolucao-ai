import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_SECONDS = 180;

/**
 * Confere a assinatura do webhook do Calendly: o cabeçalho
 * `Calendly-Webhook-Signature` vem como `t=<timestamp>,v1=<hmac>`, onde o
 * hmac é SHA-256 de `<timestamp>.<corpo>` com a chave de assinatura
 * definida ao criar o webhook. Rejeita também mensagens muito antigas.
 */
export function verifyCalendlySignature(
  rawBody: string,
  header: string | null,
  signingKey: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((part) => {
      const index = part.indexOf("=");
      return [part.slice(0, index).trim(), part.slice(index + 1).trim()];
    })
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", signingKey).update(`${timestamp}.${rawBody}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

type CalendlyPayload = {
  event?: string;
  payload?: {
    name?: string;
    rescheduled?: boolean;
    text_reminder_number?: string | null;
    tracking?: { utm_content?: string | null } | null;
    questions_and_answers?: { question?: string; answer?: string }[] | null;
    scheduled_event?: { uri?: string; start_time?: string } | null;
    event?: string;
  };
};

/** Telefones que aparecem no agendamento (respostas do formulário + lembrete por SMS), só dígitos. */
export function phonesFromInvitee(payload: CalendlyPayload["payload"]): string[] {
  const out = new Set<string>();
  const add = (value: string | null | undefined) => {
    const digits = (value ?? "").replace(/\D/g, "");
    if (digits.length >= 10) out.add(digits);
  };
  add(payload?.text_reminder_number);
  for (const qa of payload?.questions_and_answers ?? []) add(qa.answer);
  return [...out];
}

export type { CalendlyPayload };
