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
    <div className={`grid grid-cols-2 ${gridCols} gap-6 sm:gap-8`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <p className="text-3xl sm:text-4xl font-black text-accent tracking-tight">
            {stat.value}
          </p>
          <p className="text-sm sm:text-base text-muted mt-1.5 leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
