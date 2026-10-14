import type { Metadata, Viewport } from "next";
import { AgencyPixel } from "./AgencyPixel";
import { ChatFunnel } from "./ChatFunnel";

const title = "Revolução AI - Agentes de IA para Empresas";
const description =
  "Automatize qualificação, atendimento e follow-ups com agentes de IA treinados para falar com seus leads, entender objeções e fechar mais vendas 24h por dia.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Agentes de IA para empresas", "automação com IA", "chatbot inteligente", "IA para vendas"],
  // Página de anúncio: fica fora do Google pra não competir com o site institucional.
  robots: { index: false, follow: false },
  openGraph: { type: "website", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#1c1d1c",
  maximumScale: 5,
};

export default function ApresentacaoPage() {
  return (
    <>
      <AgencyPixel />
      <ChatFunnel />
    </>
  );
}
