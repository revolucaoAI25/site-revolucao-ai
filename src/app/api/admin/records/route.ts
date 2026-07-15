import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthServerClient } from "@/lib/supabase-auth-server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { STAGES } from "@/lib/admin-types";

type Source = "popup" | "lead-extractor" | "plataforma";

const VALID_STAGES = new Set(STAGES.map((s) => s.stage));
const TABLE_BY_SOURCE: Record<Source, string> = {
  popup: "leads",
  "lead-extractor": "asaas_checkouts",
  plataforma: "plataforma_checkouts",
};

/** Nomes de coluna variam entre as tabelas (leads x asaas_checkouts/plataforma_checkouts). */
function toColumns(source: Source, updates: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  if (typeof updates.stage === "string") {
    if (!VALID_STAGES.has(updates.stage as never)) return null;
    out.stage = updates.stage;
  }
  if (typeof updates.name === "string") {
    out[source === "popup" ? "name" : "nome"] = updates.name.trim();
  }
  if (typeof updates.email === "string") {
    out.email = updates.email.trim();
  }
  if (typeof updates.phone === "string") {
    out[source === "popup" ? "phone" : "telefone"] = updates.phone.trim();
  }
  return out;
}

/**
 * Toda mutação do painel admin passa por aqui — proxy.ts já barra
 * `/admin/*` sem sessão, mas repetimos a checagem aqui também (rota de
 * API, não passa pelo layout do admin), como recomenda a documentação do
 * Next.js pra Route Handlers.
 */
async function requireAdminUser() {
  const supabase = await getSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function PATCH(req: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    source?: Source;
    id?: string;
    updates?: Record<string, unknown>;
  } | null;

  const source = body?.source;
  const id = body?.id;
  const updates = body?.updates;

  if (!source || !TABLE_BY_SOURCE[source] || !id || !updates) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const columns = toColumns(source, updates);
  if (!columns || Object.keys(columns).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }

  const { error } = await supabase
    .from(TABLE_BY_SOURCE[source])
    .update(columns)
    .eq("id", id);

  if (error) {
    console.error("[admin/records] Falha ao atualizar:", error);
    return NextResponse.json({ error: "Falha ao atualizar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    items?: { source: Source; id: string }[];
  } | null;

  const items = body?.items;
  if (!items || items.length === 0) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }

  const idsBySource = new Map<Source, string[]>();
  for (const item of items) {
    if (!TABLE_BY_SOURCE[item.source]) continue;
    const list = idsBySource.get(item.source) ?? [];
    list.push(item.id);
    idsBySource.set(item.source, list);
  }

  let deleted = 0;
  for (const [source, ids] of idsBySource) {
    const { error, count } = await supabase
      .from(TABLE_BY_SOURCE[source])
      .delete({ count: "exact" })
      .in("id", ids);

    if (error) {
      console.error("[admin/records] Falha ao excluir:", error);
      return NextResponse.json({ error: "Falha ao excluir" }, { status: 500 });
    }
    deleted += count ?? 0;
  }

  return NextResponse.json({ ok: true, deleted });
}
