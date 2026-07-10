import { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  divider = false,
  decor,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  divider?: boolean;
  /** Full-bleed decorative layer (glow, grid) rendered behind the container. */
  decor?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-24 ${className}`}
    >
      {divider && <div className="divider absolute top-0 left-0 right-0" />}
      {decor}
      <Container className={`relative ${containerClassName}`}>
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent mb-4">
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl sm:text-4xl font-black tracking-tight text-balance ${className}`}
    >
      {children}
    </h2>
  );
}
