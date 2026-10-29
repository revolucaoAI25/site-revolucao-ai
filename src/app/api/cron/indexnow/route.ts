import { NextRequest, NextResponse } from "next/server";
import { blogPostUrls, submitToIndexNow } from "@/lib/indexnow";

/**
 * Roda uma vez por dia (Vercel Cron, ver vercel.json): avisa o Bing dos posts
 * do blog que entraram no ar nos últimos 2 dias (os posts são publicados por
 * data, sem deploy). Só manda o que é novo — o IndexNow pede pra não reenviar
 * páginas que não mudaram.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET não configurado" }, { status: 503 });
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await submitToIndexNow(blogPostUrls({ sinceDays: 2 }));
  if (!result.ok) console.error("[indexnow] Falha no envio diário:", result.status, result.detail);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
