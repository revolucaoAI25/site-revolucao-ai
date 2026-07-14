"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client do Supabase Auth pro navegador (chave anônima, pública) — usado
 * só na tela de login do admin. Nunca usar essa chave pra ler dados de
 * leads/checkouts direto do cliente; isso continua passando pelas rotas
 * server-side com a service role key.
 */
export function getSupabaseAuthBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
