import { NextRequest, NextResponse } from "next/server";
import {
  ASAAS_PLANOS,
  createSubscriptionCheckout,
  findOrCreateCustomer,
  type Plano,
} from "@/lib/asaas";

type Payload = {
  plano?: string;
  nome?: string;
  email?: string;
  cpfCnpj?: string;
  telefone?: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  if (!process.env.ASAAS_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Checkout indisponível no momento — fala com a gente pelo WhatsApp pra assinar.",
      },
      { status: 503 }
    );
  }

  const body = (await req.json().catch(() => null)) as Payload | null;
  const plano = body?.plano as Plano | undefined;
  const nome = body?.nome?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const cpfCnpj = onlyDigits(body?.cpfCnpj ?? "");
  const telefone = onlyDigits(body?.telefone ?? "");

  if (!plano || !(plano in ASAAS_PLANOS)) {
    return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
  }
  if (
    nome.length < 3 ||
    !email.includes("@") ||
    ![11, 14].includes(cpfCnpj.length) ||
    telefone.length < 10
  ) {
    return NextResponse.json(
      { error: "Confira os dados preenchidos e tente de novo." },
      { status: 400 }
    );
  }

  try {
    const customerId = await findOrCreateCustomer({
      name: nome,
      email,
      cpfCnpj,
      phone: telefone,
    });
    const checkoutUrl = await createSubscriptionCheckout(plano, customerId);
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("[asaas-subscription] Falha ao criar assinatura:", error);
    const message =
      error instanceof Error ? error.message : "Erro ao processar assinatura";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
