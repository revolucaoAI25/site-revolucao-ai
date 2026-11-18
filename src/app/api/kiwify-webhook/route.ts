import { NextRequest, NextResponse } from "next/server";
import {
  isApprovedOrder,
  isZeroAos10kProduct,
  parseKiwifyOrder,
  verifyKiwifySignature,
} from "@/lib/kiwify-webhook";
import { chatfluxConfigured, registerChatfluxStudent } from "@/lib/chatflux-partner";

/**
 * Webhook da Kiwify: quando uma compra do Do Zero aos 10K é aprovada, cadastra
 * o e-mail do aluno na ChatFlux pra liberar os 200 créditos da parceria.
 *
 * URL pra colar na Kiwify: https://www.revolucao-ai.com/api/kiwify-webhook
 * Evento: "Compra aprovada". A assinatura vem em `?signature=` e é conferida
 * com KIWIFY_WEBHOOK_TOKEN.
 *
 * Se a ChatFlux falhar, responde 502 pra Kiwify tentar de novo. Outros
 * eventos e outros produtos são aceitos (200) e ignorados.
 */
export async function POST(req: NextRequest) {
  const token = process.env.KIWIFY_WEBHOOK_TOKEN;
  if (!token || !chatfluxConfigured()) {
    return NextResponse.json({ error: "webhook não configurado" }, { status: 503 });
  }

  const raw = await req.text();
  if (!verifyKiwifySignature(raw, req.nextUrl.searchParams.get("signature"), token)) {
    console.warn("[kiwify-webhook] assinatura inválida");
    return NextResponse.json({ error: "assinatura inválida" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "payload inválido" }, { status: 400 });
  }

  const order = parseKiwifyOrder(payload);
  const summary = {
    order: order.orderId,
    event: order.event,
    status: order.status,
    product: order.productName,
    productId: order.productId,
  };

  if (!isApprovedOrder(order)) {
    console.info("[kiwify-webhook] ignorado (não é compra aprovada)", summary);
    return NextResponse.json({ ok: true, ignored: "evento" });
  }
  if (!isZeroAos10kProduct(order)) {
    console.info("[kiwify-webhook] ignorado (outro produto)", summary);
    return NextResponse.json({ ok: true, ignored: "produto" });
  }
  if (!order.email) {
    console.error("[kiwify-webhook] compra aprovada sem e-mail", summary);
    return NextResponse.json({ ok: true, ignored: "sem e-mail" });
  }

  const result = await registerChatfluxStudent({
    email: order.email,
    name: order.name,
    phone: order.phone,
  });
  if (!result.ok) {
    console.error("[kiwify-webhook] ChatFlux recusou", { ...summary, status: result.status, error: result.error });
    return NextResponse.json({ error: "falha ao cadastrar na ChatFlux" }, { status: 502 });
  }

  console.info("[kiwify-webhook] aluno cadastrado na ChatFlux", summary);
  return NextResponse.json({ ok: true, chatflux: "cadastrado" });
}
