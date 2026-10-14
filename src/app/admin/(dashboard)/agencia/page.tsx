import { getAgencyData } from "@/lib/agency-analytics";
import { AgencyControls, AgencyMetrics, AGENCY_PERIODS } from "@/components/admin/AgencyDashboard";
import { AgencyKanban } from "@/components/admin/AgencyKanban";

export const dynamic = "force-dynamic";

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface rounded-3xl p-6 sm:p-8">
      <h2 className="text-lg font-black tracking-tight mb-2">{title}</h2>
      <div className="text-muted text-sm leading-relaxed max-w-2xl">{children}</div>
    </div>
  );
}

export default async function AgenciaPage({
  searchParams,
}: {
  searchParams: Promise<{ aba?: string; dias?: string }>;
}) {
  const params = await searchParams;
  const aba = params.aba === "kanban" ? "kanban" : "metricas";
  const requestedDays = Number(params.dias);
  const days = AGENCY_PERIODS.includes(requestedDays) ? requestedDays : 30;

  const result = await getAgencyData(days, aba === "kanban");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Funil da agência</h1>
        <p className="text-muted text-sm">
          Conversa de qualificação (<code className="text-text">/apresentacao</code>): de onde o lead
          veio, até onde foi, se qualificou e se agendou.
        </p>
      </div>

      <AgencyControls aba={aba} days={days} />

      {result.status === "ok" &&
        (aba === "kanban" ? (
          <AgencyKanban leads={result.leads} />
        ) : (
          <AgencyMetrics leads={result.leads} visitors={result.visitors} days={days} />
        ))}
      {result.status === "not-configured" && (
        <Notice title="Supabase não configurado">
          Defina as variáveis de ambiente do Supabase pra o painel funcionar.
        </Notice>
      )}
      {result.status === "missing-sql" && (
        <Notice title="Falta rodar o SQL do funil da agência">
          Abra o SQL Editor do Supabase e rode o bloco{" "}
          <strong className="text-text">“Funil de conversa da agência”</strong> do arquivo{" "}
          <code className="text-text">supabase/schema.sql</code>. Depois é só recarregar esta página.
        </Notice>
      )}
      {result.status === "error" && <Notice title="Não consegui carregar os dados">{result.message}</Notice>}
    </div>
  );
}
