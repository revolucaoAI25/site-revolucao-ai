import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="divider absolute top-0 left-0 right-0" />
      <Container className="py-14 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
        <div>
          <Logo />
          <p className="text-muted text-sm mt-3 max-w-sm leading-relaxed">
            Agentes de IA para pré-vendas e formação para agências de IA.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
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
