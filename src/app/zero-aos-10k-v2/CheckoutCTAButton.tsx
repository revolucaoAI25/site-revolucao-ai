"use client";

import type { ReactNode } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { trackPixelEvent } from "@/lib/pixel";
import { ZERO_AOS_10K_CHECKOUT_LINK } from "@/lib/links";

/**
 * Envolve o CTAButton padrão só pra poder disparar o InitiateCheckout do
 * Meta Pixel no clique — precisa ser um Client Component porque page.tsx
 * é Server Component (exporta metadata) e Server Components não podem
 * passar funções (onClick) direto pra Client Components como o CTAButton.
 */
export function CheckoutCTAButton({
  children,
  size,
  className,
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <CTAButton
      href={ZERO_AOS_10K_CHECKOUT_LINK}
      external
      size={size}
      className={className}
      onClick={() =>
        trackPixelEvent("InitiateCheckout", {
          value: 37.9,
          currency: "BRL",
          content_name: "Do Zero aos 10K",
        })
      }
    >
      {children}
    </CTAButton>
  );
}
