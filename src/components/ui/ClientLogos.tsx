/**
 * Carrossel automático e infinito dos clientes — placeholder em texto.
 * Quando as logos chegarem, é só trocar o `<span>` de cada item por um
 * <Image src="..." /> mantendo a mesma lista/estrutura do array `clients`.
 */
const clients = [
  "Bubble Box",
  "Casoca",
  "Patrícia Davidson",
  "Marcondes Madureira Advogados",
  "Guedes & Cruz Advogados",
  "Guilherme Vazan",
];

// Duplicada para o loop do CSS ficar contínuo (anda -50% e reinicia sem corte).
const track = [...clients, ...clients];

export function ClientLogos() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex w-max items-center gap-4 animate-marquee">
        {track.map((client, index) => (
          <span
            key={`${client}-${index}`}
            className="shrink-0 rounded-full border border-white/10 bg-surface px-6 py-3 text-sm font-medium text-muted/80 opacity-80 blur-[0.2px] transition-opacity duration-200 hover:opacity-100"
          >
            {client}
          </span>
        ))}
      </div>
    </div>
  );
}
