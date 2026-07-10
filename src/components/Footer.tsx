import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <Container className="py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <Logo />
          <p className="text-muted text-sm mt-2 max-w-sm">
            Agentes de IA para pré-vendas e formação para agências de IA.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="text-text/80 hover:text-accent transition-colors">
            Home
          </Link>
          <Link
            href="/agentes-de-ia"
            className="text-text/80 hover:text-accent transition-colors"
          >
            Agentes de IA
          </Link>
          <Link
            href="/formacao"
            className="text-text/80 hover:text-accent transition-colors"
          >
            Formação
          </Link>
        </nav>
      </Container>
      <Container className="pb-10">
        <p className="text-xs text-muted border-t border-white/5 pt-6">
          © {new Date().getFullYear()} Revolução AI. Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
