import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Client do Supabase Auth pro lado do servidor (Server Components/rotas),
 * ligado aos cookies da requisição — é como a gente sabe se a pessoa
 * logada no `/admin` continua com sessão válida. Usa a chave anônima
 * (pública); os dados de leads/checkouts continuam só acessíveis via
 * `getSupabaseServerClient()` (service role), depois que o acesso já foi
 * confirmado por este client.
 */
export async function getSupabaseAuthServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Em Server Components isso lança (não dá pra escrever cookie
          // fora de Server Action/Route Handler/Proxy) — o próprio proxy.ts
          // já cuida de renovar a sessão a cada requisição, então aqui
          // basta ignorar a falha silenciosamente.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // no-op — ver comentário acima.
          }
        },
      },
    }
  );
}
