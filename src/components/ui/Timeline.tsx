export type TimelineItem = {
  period: string;
  title: string;
  description: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-8">
      <div className="hidden sm:block absolute top-5 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {items.map((item, index) => (
        <div key={item.period} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent font-black text-sm shadow-[0_0_16px_rgba(0,200,83,0.25)]">
              {index + 1}
            </span>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {item.period}
            </p>
          </div>
          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
          <p className="text-muted leading-relaxed text-[15px]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
