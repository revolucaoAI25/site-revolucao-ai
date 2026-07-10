/**
 * Marca placeholder — trocar por <Image src="/logo.svg" ... /> assim que a
 * logo oficial do Revolução AI for enviada. O ícone abaixo é só um selo
 * geométrico temporário para dar identidade ao cabeçalho/rodapé.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-dark shadow-[0_0_20px_rgba(0,200,83,0.35)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"
            fill="#07090a"
          />
        </svg>
      </span>
      <span className="font-black tracking-tight text-lg sm:text-xl text-text">
        Revolução<span className="text-accent">AI</span>
      </span>
    </span>
  );
}
