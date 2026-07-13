import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Client do Supabase pro lado do servidor (service role key, nunca exposta
 * ao navegador). Retorna `null` se as variáveis de ambiente ainda não
 * estiverem configuradas, pra o site funcionar normalmente antes do
 * Supabase estar pronto — só sem persistir os leads.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  client =
    url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}
