export function PillarCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface p-7 sm:p-8">
      <p className="text-sm font-black text-accent mb-4">{number}</p>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted leading-relaxed text-[15px]">{description}</p>
    </div>
  );
}
