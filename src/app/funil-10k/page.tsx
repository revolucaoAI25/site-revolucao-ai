import type { Metadata } from "next";
import { QuizFunnel } from "./QuizFunnel";

const title = "Descubra seu caminho pra faturar R$10 mil com Agentes de IA";
const description =
  "Responda algumas perguntas rápidas e descubra o plano certo pro seu momento agora — em menos de 2 minutos.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export default function Funil10kPage() {
  return <QuizFunnel />;
}
