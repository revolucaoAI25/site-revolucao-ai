"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import Script from "next/script";
import { CTAButton } from "@/components/ui/CTAButton";
import { CONSTRUTOR_DE_AGENTES_CHECKOUT_LINK } from "@/lib/links";

/** Código do link de pagamento do Construtor na Kiwify (o final de pay.kiwify.com.br/<código>). */
const KIWIFY_LINK_ID = CONSTRUTOR_DE_AGENTES_CHECKOUT_LINK.split("/").pop() ?? "";

/**
 * A Kiwify manda o comprador pra esta página com um `token` na URL (é o que
 * deixa cobrar com 1 clique, sem digitar os dados de novo). Sem esse token
 * (quem abriu o link direto, por exemplo) a oferta cai no checkout normal.
 */
function subscribe() {
  return () => {};
}
function hasUpsellToken() {
  return new URLSearchParams(window.location.search).has("token");
}
function useIsUpsell() {
  return useSyncExternalStore(subscribe, hasUpsellToken, () => false);
}

/** Botão principal: aceita a oferta com 1 clique (Kiwify) ou abre o checkout. */
export function UpsellOffer({ children }: { children: ReactNode }) {
  const isUpsell = useIsUpsell();

  if (!isUpsell) {
    return (
      <CTAButton href={CONSTRUTOR_DE_AGENTES_CHECKOUT_LINK} external size="lg">
        {children}
      </CTAButton>
    );
  }

  return (
    <div
      id={`kiwify-upsell-${KIWIFY_LINK_ID}`}
      style={
        {
          "--kiwify-upsell-accept-bg": "#00c853",
          "--kiwify-upsell-accept-color": "#07090a",
          "--kiwify-upsell-decline-color": "#9ca3af",
          "--kiwify-upsell-width": "420px",
        } as React.CSSProperties
      }
    >
      <button id={`kiwify-upsell-trigger-${KIWIFY_LINK_ID}`} type="button">
        {children}
      </button>
      <div id={`kiwify-upsell-cancel-trigger-${KIWIFY_LINK_ID}`}>Não, obrigado</div>
      {/* O script da Kiwify estiliza o botão por conta própria; aqui só alinhamos com o visual do site. */}
      <style>{`#kiwify-upsell-trigger-${KIWIFY_LINK_ID}{border-radius:9999px!important;font-family:inherit!important;font-weight:600!important}#kiwify-upsell-cancel-trigger-${KIWIFY_LINK_ID}{font-family:inherit!important}`}</style>
      <Script src="https://snippets.kiwify.com/upsell-v2/upsell.min.js" strategy="afterInteractive" />
    </div>
  );
}

/**
 * Botões secundários (cabeçalho e fim da página). Quando a oferta é de 1 clique
 * só existe um botão de compra, então eles levam até ele; senão abrem o checkout.
 */
export function BuyLink({
  children,
  size,
  className,
  icon,
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
}) {
  const isUpsell = useIsUpsell();
  return isUpsell ? (
    <CTAButton href="#atalho" size={size} className={className} icon={icon}>
      {children}
    </CTAButton>
  ) : (
    <CTAButton
      href={CONSTRUTOR_DE_AGENTES_CHECKOUT_LINK}
      external
      size={size}
      className={className}
      icon={icon}
    >
      {children}
    </CTAButton>
  );
}
