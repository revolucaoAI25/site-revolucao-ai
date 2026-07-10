"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/agentes-de-ia", label: "Agentes de IA" },
  { href: "/formacao", label: "Formação" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md">
      <div className="divider absolute bottom-0 left-0 right-0" />
      <Container className="flex items-center justify-between h-16 sm:h-20">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active ? "text-text" : "text-text/70 hover:text-text"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/agentes-de-ia"
          className="hidden md:inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:border-accent/60 hover:text-accent hover:-translate-y-0.5"
        >
          Falar com a gente
        </Link>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-text cursor-pointer"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-bg">
          <Container className="flex flex-col py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base font-medium ${
                  pathname === link.href ? "text-accent" : "text-text/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/agentes-de-ia"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent text-[#07090a] px-5 py-3 text-sm font-semibold"
            >
              Falar com a gente
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
