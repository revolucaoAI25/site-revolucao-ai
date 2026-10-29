import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase-auth-server";
import { agencyPageUrls, blogPostUrls, submitToIndexNow } from "@/lib/indexnow";

/**
 * Envio manual pro Bing (IndexNow), pra quem está logado no admin. Abrir no
 * navegador:
 *   /api/admin/indexnow          → páginas principais da agência
 *   /api/admin/indexnow?todos=1  → páginas da agência + todos os posts do blog
 * Use o "todos" uma vez depois de configurar o Bing, e de novo quando mudar
 * bastante coisa no site. No dia a dia o envio diário automático já basta.
 */
export async function GET(req: NextRequest) {
  const supabase = await getSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const all = req.nextUrl.searchParams.has("todos");
  const urls = all ? [...agencyPageUrls(), ...blogPostUrls()] : agencyPageUrls();
  const result = await submitToIndexNow(urls);
  return NextResponse.json({ ...result, urls }, { status: result.ok ? 200 : 502 });
}
