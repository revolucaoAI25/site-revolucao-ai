"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useQualificationModal } from "@/components/modal/ModalProvider";
import type { FlowId } from "@/lib/qualification-flows";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-[#04221a] hover:bg-accent-dark",
  secondary:
    "border border-white/20 text-text hover:border-accent hover:text-accent",
  ghost: "text-text/80 hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type FlowTrigger = CommonProps & {
  flow: FlowId;
  href?: never;
};

type LinkTrigger = CommonProps & {
  href: string;
  flow?: never;
};

export function CTAButton(props: FlowTrigger | LinkTrigger) {
  const { children, variant = "primary", size = "md", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const { open } = useQualificationModal();

  if ("flow" in props && props.flow) {
    return (
      <button type="button" className={classes} onClick={() => open(props.flow!)}>
        {children}
      </button>
    );
  }

  return (
    <Link href={(props as LinkTrigger).href} className={classes}>
      {children}
    </Link>
  );
}
