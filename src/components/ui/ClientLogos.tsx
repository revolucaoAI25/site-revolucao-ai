/**
 * Placeholder de logos de clientes — trocar cada chip por <Image> com a
 * logo real assim que forem enviadas.
 */
const clients = [
  "Bubble Box",
  "Casoca",
  "Patrícia Davidson",
  "Marcondes Madureira Advogados",
  "Guedes & Cruz Advogados",
  "Guilherme Vazan",
];

export function ClientLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {clients.map((client) => (
        <span
          key={client}
          className="rounded-full border border-white/10 bg-surface px-5 py-2.5 text-sm font-medium text-muted"
        >
          {client}
        </span>
      ))}
    </div>
  );
}
