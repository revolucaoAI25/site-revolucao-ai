import { getAdminRecords, summarize } from "@/lib/admin-data";

function StatTile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="card-surface rounded-3xl p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">
        {label}
      </p>
      <p className={`text-3xl font-black tracking-tight ${accent ? "text-accent" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function BreakdownBar({
  label,
  count,
  maxCount,
}: {
  label: string;
  count: number;
  maxCount: number;
}) {
  const widthPercent = maxCount > 0 ? Math.max((count / maxCount) * 100, 4) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-text">{count}</span>
      </div>
      <div className="h-5 rounded-full bg-surface-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const records = await getAdminRecords();
  const summary = summarize(records);
  const maxResultado = Math.max(...summary.porResultado.map((r) => r.count), 1);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Dashboard</h1>
        <p className="text-muted text-sm">
          Visão geral do pop-up de qualificação e do checkout do Lead Extractor.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatTile label="Leads do pop-up" value={String(summary.totalLeads)} />
        <StatTile label="Agentes de IA" value={String(summary.totalAgentes)} />
        <StatTile label="Formação" value={String(summary.totalFormacao)} />
        <StatTile label="Agendaram reunião" value={String(summary.totalAgendados)} />
        <StatTile
          label="Taxa de confirmação (checkout)"
          value={
            summary.taxaConfirmacaoCheckout !== null
              ? `${summary.taxaConfirmacaoCheckout.toFixed(0)}%`
              : "—"
          }
          accent
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <StatTile
          label="Checkouts iniciados (Lead Extractor)"
          value={String(summary.totalCheckoutsIniciados)}
        />
        <StatTile
          label="Compras confirmadas (Lead Extractor)"
          value={String(summary.totalCheckoutsConfirmados)}
          accent
        />
      </div>

      <div className="card-surface rounded-3xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-5">
          Leads do pop-up por resultado
        </p>
        {summary.porResultado.length === 0 ? (
          <p className="text-muted text-sm">Nenhum lead registrado ainda.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {summary.porResultado.map((item) => (
              <BreakdownBar
                key={item.label}
                label={item.label}
                count={item.count}
                maxCount={maxResultado}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
