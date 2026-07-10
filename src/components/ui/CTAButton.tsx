"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useQualificationModal } from "@/components/modal/ModalProvider";
import type { FlowId } from "@/lib/qualification-flows";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#07090a] shadow-[0_0_0_1px_rgba(0,200,83,0.4),0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.55),0_14px_36px_-10px_rgba(0,200,83,0.65)]",
  secondary:
    "border border-white/15 bg-white/[0.03] text-text hover:border-accent/60 hover:text-accent hover:-translate-y-0.5 hover:bg-white/[0.05]",
  ghost: "text-text/80 hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-sm sm:text-base",
};

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
};

type FlowTrigger = CommonProps & {
  flow: FlowId;
  href?: never;
  external?: never;
};

type LinkTrigger = CommonProps & {
  href: string;
  flow?: never;
  /** Set true for links leaving the site (WhatsApp, checkout, etc). */
  external?: boolean;
};

export function CTAButton(props: FlowTrigger | LinkTrigger) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon = true,
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const { open } = useQualificationModal();

  if ("flow" in props && props.flow) {
    return (
      <button type="button" className={classes} onClick={() => open(props.flow!)}>
        {children}
        {icon && <Arrow />}
      </button>
    );
  }

  const { href, external } = props as LinkTrigger;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        {icon && <Arrow />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon && <Arrow />}
    </Link>
  );
}
