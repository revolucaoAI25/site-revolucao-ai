type Message = {
  from: "lead" | "agent";
  text: string;
};

const defaultMessages: Message[] = [
  { from: "lead", text: "Oi! Vi o anúncio de vocês, como funciona?" },
  {
    from: "agent",
    text: "Oi! Te explico rapidinho 👋 Hoje vocês já recebem leads todo dia ou o volume ainda é baixo?",
  },
  { from: "lead", text: "Recebemos bastante, mas perdemos muito no meio do caminho." },
  {
    from: "agent",
    text: "Entendi. E hoje quem responde esses leads — tem alguém dedicado a isso ou fica mais solto mesmo?",
  },
];

/**
 * Ilustração decorativa de uma conversa no WhatsApp — preenche o espaço
 * vazio ao lado do texto do hero e reforça visualmente o produto.
 * Escondida em telas menores (não atrapalha o layout mobile).
 */
export function HeroChatMock({
  messages = defaultMessages,
  title = "Agente Revolução AI",
  subtitle = "online agora",
  badge = "IA",
}: {
  messages?: Message[];
  title?: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="pointer-events-none absolute right-0 top-1/2 hidden w-[380px] -translate-y-1/2 lg:block xl:right-8">
      <div className="glow h-[340px] w-[340px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative rotate-[3deg] rounded-3xl border border-white/10 bg-surface/90 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-xs font-black text-[#07090a]">
            {badge}
          </span>
          <div>
            <p className="text-sm font-semibold text-text">{title}</p>
            <p className="text-xs text-accent flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-snug ${
                message.from === "agent"
                  ? "ml-auto rounded-br-sm bg-accent text-[#07090a] font-medium"
                  : "rounded-bl-sm bg-surface-2 text-muted"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
