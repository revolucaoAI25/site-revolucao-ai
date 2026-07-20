import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase-auth-server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const BUCKET = "onboarding-documentos";

/**
 * proxy.ts já barra `/api/admin/*` sem sessão, mas repetimos a checagem
 * aqui também (rota de API, não passa pelo layout do admin), como nas
 * outras rotas de /api/admin.
 */
async function requireAdminUser() {
  const supabase = await getSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Gera um link assinado (temporário) pro admin visualizar um documento enviado no onboarding. */
export async function GET(req: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }

  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 600);

  if (error || !data) {
    return NextResponse.json({ error: "Falha ao gerar link" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
