export type LeadAnswer = { question: string; label: string };

/**
 * Envia o resultado final do pop-up pra API salvar no Supabase. Dispara e
 * esquece — falha de rede não deve travar a experiência do usuário no
 * pop-up. `keepalive` garante que o request completa mesmo se o pop-up
 * fechar logo em seguida.
 */
export function submitLead(payload: {
  flowId: string;
  resultKey: string;
  answers: LeadAnswer[];
  contact?: { name: string; phone: string } | null;
}) {
  if (typeof window === "undefined") return;
  fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
