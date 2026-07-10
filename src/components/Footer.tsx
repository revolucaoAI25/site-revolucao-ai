import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import {
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_LINK,
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  ADDRESS,
  MAPS_LINK,
} from "@/lib/links";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 8.3c.2-.5.5-.5.8-.5h.6c.2 0 .5 0 .7.5.2.6.7 1.8.7 2 .1.2.1.4 0 .6-.2.3-.3.4-.5.6-.2.2-.4.4-.2.7.5.9 1.1 1.6 1.9 2.2.8.6 1.3.8 1.6.9.3.1.5 0 .6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.9.3.1.5.2.5.3.1.3.1 1-.2 1.5-.4.6-1.5 1.1-2.1 1.1-.6 0-1.2 0-3.9-1.6-3.2-1.9-5.2-4.9-5.4-5.2-.1-.2-1-1.4-1-2.6 0-1.2.7-1.8.9-2.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 6.5 12 13l8-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="divider absolute top-0 left-0 right-0" />
      <Container className="py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="text-muted text-sm mt-3 max-w-sm leading-relaxed">
            Agentes de IA para pré-vendas e formação para agências de IA.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-6">
            <Link href="/" className="text-text/70 hover:text-accent transition-colors">
              Home
            </Link>
            <Link
              href="/agentes-de-ia"
              className="text-text/70 hover:text-accent transition-colors"
            >
              Agentes de IA
            </Link>
            <Link
              href="/formacao"
              className="text-text/70 hover:text-accent transition-colors"
            >
              Formação
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-4">
            Contato
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text/80 hover:text-accent transition-colors"
              >
                <WhatsAppIcon />
                {WHATSAPP_NUMBER_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-text/80 hover:text-accent transition-colors"
              >
                <MailIcon />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text/80 hover:text-accent transition-colors"
              >
                <InstagramIcon />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-text/80 hover:text-accent transition-colors"
              >
                <span className="mt-0.5">
                  <PinIcon />
                </span>
                {ADDRESS}
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-4">
            Onde estamos
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10 [filter:invert(92%)_hue-rotate(180deg)_brightness(0.95)_contrast(0.9)]">
            <iframe
              title="Localização Revolução AI"
              src="https://www.google.com/maps?q=Rua+Sergipe,+1440+-+Savassi,+Belo+Horizonte+-+MG&output=embed"
              width="100%"
              height="160"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
      <Container className="pb-10">
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-muted-2">
            © {new Date().getFullYear()} Revolução AI. Todos os direitos
            reservados.
          </p>
          <p className="text-xs text-muted-2">Feito com IA. Vendido com resultado.</p>
        </div>
      </Container>
    </footer>
  );
}
