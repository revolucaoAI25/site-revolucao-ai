import { FUNNEL_PAGES, type FunnelPage } from "@/lib/funnel-tracking";
import { getFunnelDashboard } from "@/lib/funnel-analytics";
import { FunnelControls, FunnelDashboard } from "@/components/admin/FunnelDashboard";

const PERIODS = [7, 14, 30, 90];

export const dynamic = "force-dynamic";

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface rounded-3xl p-6 sm:p-8">
      <h2 className="text-lg font-black tracking-tight mb-2">{title}</h2>
      <div className="text-muted text-sm leading-relaxed max-w-2xl">{children}</div>
    </div>
  );
}

export default async function FunisPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; dias?: string }>;
}) {
  const params = await searchParams;
  const page: FunnelPage =
    FUNNEL_PAGES.find((p) => p.id === params.pagina)?.id ?? FUNNEL_PAGES[0].id;
  const requestedDays = Number(params.dias);
  const days = PERIODS.includes(requestedDays) ? requestedDays : 7;

  const result = await getFunnelDashboard(page, days);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Funis</h1>
        <p className="text-muted text-sm">
          Métricas do funil de quiz e da LP do curso: visitas, até onde cada pessoa foi, cliques na compra.
          Tudo anônimo (sem nome, telefone ou IP).
        </p>
      </div>

      <FunnelControls page={page} days={days} />

      {result.status === "ok" && (
        <FunnelDashboard page={page} days={days} data={result.data} recent={result.recent} />
      )}
      {result.status === "not-configured" && (
        <Notice title="Supabase não configurado">
          Defina as variáveis de ambiente do Supabase pra o painel funcionar.
        </Notice>
      )}
      {result.status === "missing-sql" && (
        <Notice title="Falta rodar o SQL das métricas">
          Abra o SQL Editor do Supabase e rode o bloco <strong className="text-text">“Métricas dos funis”</strong>{" "}
          do arquivo <code className="text-text">supabase/schema.sql</code>. Depois é só recarregar esta página.
        </Notice>
      )}
      {result.status === "error" && (
        <Notice title="Não consegui carregar as métricas">{result.message}</Notice>
      )}
    </div>
  );
}
