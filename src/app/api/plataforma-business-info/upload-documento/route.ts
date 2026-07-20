import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const BUCKET = "onboarding-documentos";
const MAX_SIZE = 10 * 1024 * 1024;

/**
 * Recebe o CNPJ/documento (foto ou PDF) enviado na etapa "Business Manager"
 * do formulário de onboarding e sobe pro bucket privado do Supabase Storage
 * — nunca fica exposto por URL pública (ver /api/admin/onboarding-documento-url).
 */
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const checkoutId = form?.get("checkoutId");

  if (!(file instanceof File) || typeof checkoutId !== "string" || !checkoutId) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Arquivo muito grande (máx. 10MB)" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }

  const { data: record, error: findError } = await supabase
    .from("plataforma_checkouts")
    .select("id, agente_pronto")
    .eq("id", checkoutId)
    .maybeSingle();

  if (findError || !record || !record.agente_pronto) {
    return NextResponse.json({ error: "Checkout não encontrado" }, { status: 404 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${checkoutId}/${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type || "application/octet-stream" });

  if (error) {
    console.error("[upload-documento] Falha ao enviar arquivo:", error);
    return NextResponse.json({ error: "Falha ao enviar arquivo" }, { status: 500 });
  }

  return NextResponse.json({ path });
}
