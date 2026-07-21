/**
 * Cliente da API de provisionamento de usuários do Lead Extractor (serviço
 * à parte, hospedado no Railway) — cria a conta do cliente automaticamente
 * assim que o pagamento é confirmado (ver /api/asaas-webhook). Nunca
 * chamar essa API do navegador: a chave (`LEAD_EXTRACTOR_API_KEY`) dá
 * poder de criar contas na plataforma.
 */

const API_URL = "https://optimistic-fulfillment-production-3cc2.up.railway.app";

/** Remove acentos, mantendo só letras ASCII e dígitos (ex.: "João" -> "joao"). */
function toAsciiSlug(value: string): string {
  return Array.from(value.normalize("NFD"))
    .filter((char) => /[a-zA-Z0-9]/.test(char))
    .join("")
    .toLowerCase();
}

/**
 * Senha padrão gerada automaticamente (o cliente não escolhe/informa
 * senha no checkout) — usa o primeiro nome pra ficar um pouco mais
 * personalizada, seguido de um sufixo numérico aleatório.
 */
export function generateLeadExtractorPassword(nome: string): string {
  const firstName = nome.trim().split(/\s+/)[0] ?? "";
  const slug = toAsciiSlug(firstName);
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `${slug || "cliente"}${suffix}`;
}

/**
 * Cria o usuário na plataforma Lead Extractor. `role` é sempre "user" —
 * nunca cria admin por aqui. Créditos de CNPJ vêm com saldo inicial e
 * renovação mensal fixos (3000/3000); Maps e Instagram sempre via chave de
 * API própria do usuário (sem sistema de créditos da Revolução AI) —
 * Instagram só fica visível pra quem assinou o plano anual.
 */
export async function createLeadExtractorUser(input: {
  email: string;
  password: string;
  instagramVisible: boolean;
}): Promise<{ userId: string } | null> {
  const apiKey = process.env.LEAD_EXTRACTOR_API_KEY;
  if (!apiKey) {
    console.error("[lead-extractor-api] LEAD_EXTRACTOR_API_KEY não configurada");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
        role: "user",
        cdd_credits: 3000,
        monthly_cdd_credits: 3000,
        maps_credits_enabled: false,
        instagram_visible: input.instagramVisible,
        instagram_credits_enabled: false,
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("[lead-extractor-api] Falha ao criar usuário:", data);
      return null;
    }
    return { userId: data.user_id as string };
  } catch (error) {
    console.error("[lead-extractor-api] Erro de rede ao criar usuário:", error);
    return null;
  }
}
