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
    <div className="card-surface card-hover rounded-3xl p-7 sm:p-8">
      <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-sm font-black text-accent">
        {number}
      </span>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted leading-relaxed text-[15px]">{description}</p>
    </div>
  );
}
