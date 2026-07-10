export function CaseCard({
  name,
  tag,
  highlight,
  description,
}: {
  name: string;
  tag: string;
  highlight: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface p-7 sm:p-8 flex flex-col h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
        {tag}
      </p>
      <h3 className="text-xl font-bold mb-3">{name}</h3>
      <p className="text-2xl font-black text-accent mb-4 leading-tight">
        {highlight}
      </p>
      <p className="text-muted leading-relaxed text-[15px]">{description}</p>
    </div>
  );
}
