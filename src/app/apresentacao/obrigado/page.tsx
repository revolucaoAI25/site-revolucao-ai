import type { Metadata } from "next";
import Link from "next/link";
import { AgencyPixel } from "../AgencyPixel";
import styles from "../chat.module.css";

export const metadata: Metadata = {
  title: "Agendamento confirmado — Revolução AI",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <>
      <AgencyPixel />
      <main className={styles.thanks}>
        <div className={styles.thanksInner}>
          <div className={styles.thanksIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className={styles.thanksTitle}>Agendamento Confirmado! 🎉</h1>
            <p className={styles.thanksLead}>
              Obrigado por agendar sua reunião. Você receberá um email de confirmação em instantes.
            </p>
            <p className={styles.thanksText}>
              Estamos ansiosos para mostrar como nossos agentes de IA podem revolucionar seu negócio!
            </p>
          </div>
          <div>
            <Link href="/" className={styles.thanksBtn}>
              Voltar para página inicial
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
