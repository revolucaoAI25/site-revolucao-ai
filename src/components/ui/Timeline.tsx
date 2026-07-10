export type TimelineItem = {
  period: string;
  title: string;
  description: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
      {items.map((item, index) => (
        <div key={item.period} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[#04221a] font-black text-sm">
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
