import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase-auth-server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { AGENCY_STAGE_SET } from "@/lib/agency-funnel";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Só quem está logado no admin mexe no kanban da agência. */
async function requireAdminUser() {
  const supabase = await getSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Move o card de estágio (kanban). */
export async function PATCH(req: NextRequest) {
  if (!(await requireAdminUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as { id?: string; stage?: string } | null;
  if (!body?.id || !UUID.test(body.id) || !body.stage || !AGENCY_STAGE_SET.has(body.stage)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });

  const { error } = await supabase
    .from("agencia_leads")
    .update({ stage: body.stage, updated_at: new Date().toISOString() })
    .eq("id", body.id);
  if (error) {
    console.error("[admin/agencia] Falha ao mover:", error.message);
    return NextResponse.json({ error: "Falha ao atualizar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdminUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id || !UUID.test(body.id)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });

  const { error } = await supabase.from("agencia_leads").delete().eq("id", body.id);
  if (error) {
    console.error("[admin/agencia] Falha ao excluir:", error.message);
    return NextResponse.json({ error: "Falha ao excluir" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
