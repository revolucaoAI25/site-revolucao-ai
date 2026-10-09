/**
 * Ícone "Claude" usado na LP: um asterisco genérico em tom coral. NÃO é o logo oficial da Anthropic — pra usar o logo de
 * verdade, baixar o SVG oficial do material de marca da Anthropic e trocar
 * o conteúdo de <ClaudeIcon /> abaixo (é o único lugar que precisa mudar).
 */
export function ClaudeIcon({ size = 20 }: { size?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {rays.map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2="2.5"
          stroke="#D97757"
          strokeWidth="2.6"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}
