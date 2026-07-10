export type Stat = {
  value: string;
  label: string;
};

export function StatGrid({
  stats,
  columns = 4,
}: {
  stats: Stat[];
  columns?: 3 | 4;
}) {
  const gridCols =
    columns === 3
      ? "sm:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 ${gridCols} gap-4 sm:gap-5`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-surface card-hover rounded-2xl p-5 sm:p-6"
        >
          <div className="h-0.5 w-8 rounded-full bg-accent mb-4" />
          <p className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            {stat.value}
          </p>
          <p className="text-sm sm:text-[15px] text-muted mt-2 leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
