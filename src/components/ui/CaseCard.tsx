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
    <div className="card-surface card-hover relative rounded-3xl p-7 sm:p-8 flex flex-col h-full overflow-hidden">
      <svg
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
        className="absolute top-6 right-7 text-white/[0.06]"
      >
        <path
          d="M0 32V19.2C0 8.6 6.9 1.8 17.3 0l2 4.6C12.4 6.6 8.6 11 8 17.3h9.3V32H0Zm22.7 0V19.2c0-10.6 6.9-17.4 17.3-19.2l2 4.6c-6.9 2-10.7 6.4-11.3 12.7H40V32H22.7Z"
          fill="currentColor"
        />
      </svg>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">
        {tag}
      </p>
      <h3 className="text-xl font-bold mb-3">{name}</h3>
      <p className="text-2xl font-black text-accent mb-4 leading-tight text-balance">
        {highlight}
      </p>
      <p className="text-muted leading-relaxed text-[15px]">{description}</p>
    </div>
  );
}
