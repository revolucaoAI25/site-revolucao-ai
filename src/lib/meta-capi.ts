import "server-only";
import { createHash } from "node:crypto";

/**
 * API de Conversões da Meta (eventos enviados pelo servidor) do funil da
 * agência. Complementa o Pixel do navegador: quando o navegador não manda o
 * evento (bloqueador, saiu da página, agendou por outro caminho), o servidor
 * manda. O `eventId` é o mesmo do navegador, então a Meta junta os dois e
 * conta uma vez só.
 *
 * Só roda se existirem NEXT_PUBLIC_META_PIXEL_ID_AGENCIA e
 * META_CAPI_TOKEN_AGENCIA (token gerado em Gerenciador de Eventos →
 * Configurações → API de Conversões). `META_CAPI_TEST_CODE` é opcional: com
 * ele os eventos aparecem em "Eventos de teste".
 */

const GRAPH_VERSION = "v23.0";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

/** Telefone só com dígitos e com o DDI (55) na frente, como a Meta pede antes do hash. */
function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return digits.length <= 11 ? `55${digits}` : digits;
}

export type MetaEventInput = {
  eventName: "Lead" | "Schedule";
  /** Mesmo id usado no navegador — é o que evita contar em dobro. */
  eventId: string;
  sourceUrl?: string;
  phone?: string | null;
  name?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  customData?: Record<string, unknown>;
};

export async function sendMetaEvent(input: MetaEventInput): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID_AGENCIA;
  const token = process.env.META_CAPI_TOKEN_AGENCIA;
  if (!pixelId || !token) return;

  const userData: Record<string, unknown> = {};
  const phone = input.phone ? normalizePhone(input.phone) : null;
  if (phone) userData.ph = [sha256(phone)];
  const nameParts = input.name?.trim().toLowerCase().split(/\s+/).filter(Boolean) ?? [];
  if (nameParts[0]) userData.fn = [sha256(nameParts[0])];
  // Sobrenome (a última palavra do nome) e país: ajudam a Meta a casar o
  // evento com a pessoa (qualidade de correspondência). O funil é 100%
  // Brasil, então o país é sempre "br".
  if (nameParts.length > 1) userData.ln = [sha256(nameParts[nameParts.length - 1])];
  userData.country = [sha256("br")];
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.sourceUrl,
        user_data: userData,
        custom_data: input.customData,
      },
    ],
  };
  if (process.env.META_CAPI_TEST_CODE) body.test_event_code = process.env.META_CAPI_TEST_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    if (!res.ok) {
      console.error("[meta-capi] Falha ao enviar", input.eventName, res.status, await res.text());
    }
  } catch (error) {
    console.error("[meta-capi] Erro de rede ao enviar", input.eventName, error);
  }
}
