declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento padrão do Meta Pixel (Lead, InitiateCheckout, etc).
 * No-op se o pixel não estiver carregado — seja porque
 * NEXT_PUBLIC_META_PIXEL_ID não está configurado (ver
 * src/components/MetaPixel.tsx), seja porque a chamada rodou antes do
 * script terminar de carregar.
 */
export function trackPixelEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/** Evento customizado (nome livre, fora da lista padrão de eventos do Meta). */
export function trackPixelCustomEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, params);
}
