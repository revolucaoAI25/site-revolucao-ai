export type LeadAnswer = { question: string; label: string };

/**
 * Envia o resultado final do pop-up pra API salvar no Supabase. Não trava
 * a experiência do usuário — a UI já mostra o resultado antes da resposta
 * chegar — mas devolve o id salvo (quando disponível) pra quem precisar
 * marcar esse mesmo lead como "agendou" depois (ver CalendlyEmbed.tsx).
 * `keepalive` garante que o request completa mesmo se o pop-up fechar logo
 * em seguida.
 */
export async function submitLead(payload: {
  flowId: string;
  resultKey: string;
  answers: LeadAnswer[];
  contact?: { name: string; phone: string; email: string } | null;
}): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    const data = await res.json().catch(() => null);
    return data?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Marca o lead como "agendou reunião", depois que o Calendly embutido
 * avisa que a pessoa concluiu um agendamento de verdade. Dispara e
 * esquece — não bloqueia a experiência no pop-up.
 */
export function markLeadScheduled(leadId: string) {
  if (typeof window === "undefined") return;
  fetch("/api/lead/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: leadId }),
    keepalive: true,
  }).catch(() => {});
}
