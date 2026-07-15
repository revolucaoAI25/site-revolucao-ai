import { WhatsAppIcon } from "./WhatsAppIcon";
import { WHATSAPP_LINK } from "@/lib/links";

/**
 * Bolinha discreta de WhatsApp fixa no canto inferior direito — sem
 * badge/pulso chamativo, pra não competir com os CTAs que abrem o pop-up
 * de qualificação. É o mesmo WhatsApp que já roda o agente de IA, então
 * quem clicar aqui experimenta o produto na prática, não só fala com
 * suporte.
 */
export function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      title="Fale com nosso agente de IA no WhatsApp"
      aria-label="Fale com nosso agente de IA no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-white/10 text-muted shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,200,83,0.35)]"
    >
      <WhatsAppIcon size={22} />
    </a>
  );
}
