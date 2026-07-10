/**
 * Wordmark placeholder — trocar por <Image src="/logo.svg" ... /> assim que
 * a logo oficial do Revolução AI for enviada.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-black tracking-tight text-lg sm:text-xl text-text ${className}`}
    >
      Revolução<span className="text-accent">AI</span>
    </span>
  );
}
