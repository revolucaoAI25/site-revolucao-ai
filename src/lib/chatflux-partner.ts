/**
 * Cadastro de alunos do Do Zero aos 10K na ChatFlux (parceria de 200
 * créditos). A ChatFlux libera os créditos quando a compra informada aqui e o
 * formulário que o aluno preenche lá casam pelo e-mail, uma única vez, em
 * qualquer ordem. Mandar o mesmo e-mail de novo não duplica nada.
 *
 * Variáveis de ambiente:
 * - CHATFLUX_PARTNER_TOKEN (obrigatória): token "rai_..." enviado pela ChatFlux.
 * - CHATFLUX_PARTNER_URL (opcional): endpoint de alunos; o padrão é o atual.
 */

import { toInternationalPhone } from "@/lib/phone";

const DEFAULT_URL =
  "https://chatflux-revolucao-ia.marcus-80b.workers.dev/api/partners/revolucao-ia/students";

export type ChatfluxStudent = {
  email: string;
  name?: string | null;
  phone?: string | null;
};

export type ChatfluxResult =
  | { ok: true; status: number }
  | { ok: false; status: number | null; error: string };

export function chatfluxConfigured(): boolean {
  return Boolean(process.env.CHATFLUX_PARTNER_TOKEN);
}

export async function registerChatfluxStudent(student: ChatfluxStudent): Promise<ChatfluxResult> {
  const email = student.email.trim().toLowerCase();
  const name = student.name?.trim() || undefined;
  // A ChatFlux só aceita telefone internacional (+55...); a Kiwify às vezes manda sem DDI.
  const phone = toInternationalPhone(student.phone);
  const first = await post({ email, name, phone });
  // Telefone é opcional: se ele for o motivo da recusa, manda só e-mail e nome.
  if (!first.ok && first.status === 400 && phone) return post({ email, name });
  return first;
}

async function post(body: { email: string; name?: string; phone?: string }): Promise<ChatfluxResult> {
  const token = process.env.CHATFLUX_PARTNER_TOKEN;
  if (!token) return { ok: false, status: null, error: "CHATFLUX_PARTNER_TOKEN não configurado" };
  try {
    const res = await fetch(process.env.CHATFLUX_PARTNER_URL || DEFAULT_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { accepted?: boolean } | null;
    if (res.ok && data?.accepted) return { ok: true, status: res.status };
    return { ok: false, status: res.status, error: `resposta inesperada: ${JSON.stringify(data)}` };
  } catch (err) {
    return { ok: false, status: null, error: err instanceof Error ? err.message : String(err) };
  }
}
