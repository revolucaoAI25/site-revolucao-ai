import { getAdminRecords, type AdminRecord, type Stage } from "@/lib/admin-data";

const COLUMNS: { stage: Stage; label: string }[] = [
  { stage: "preencheu", label: "Preencheu o pop-up" },
  { stage: "agendou", label: "Agendou reunião" },
  { stage: "iniciou-checkout", label: "Iniciou checkout (Lead Extractor)" },
  { stage: "confirmado", label: "Cliente confirmado" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Card({ record }: { record: AdminRecord }) {
  return (
    <div className="card-surface rounded-2xl p-4 flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-sm truncate">
          {record.name ?? "Sem nome"}
        </span>
        <span
          className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
            record.source === "lead-extractor"
              ? "bg-accent/15 text-accent"
              : "bg-white/[0.06] text-muted"
          }`}
        >
          {record.source === "lead-extractor" ? "Lead Extractor" : "Pop-up"}
        </span>
      </div>
      <p className="text-xs text-muted truncate">{record.detail}</p>
      {record.email && <p className="text-xs text-muted-2 truncate">{record.email}</p>}
      {record.phone && <p className="text-xs text-muted-2">{record.phone}</p>}
      <p className="text-[11px] text-muted-2 mt-1">{formatDate(record.createdAt)}</p>
    </div>
  );
}

export default async function AdminKanbanPage() {
  const records = await getAdminRecords();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Kanban</h1>
        <p className="text-muted text-sm">
          Cada card é um registro independente (pop-up ou Lead Extractor) — o estágio é
          calculado automaticamente a partir do que já sabemos sobre ele, não é
          arrastável.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {COLUMNS.map((col) => {
          const items = records.filter((r) => r.stage === col.stage);
          return (
            <div key={col.stage} className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
                  {col.label}
                </p>
                <span className="text-xs font-bold text-muted-2">{items.length}</span>
              </div>
              <div className="flex flex-col gap-3">
                {items.length === 0 ? (
                  <p className="text-xs text-muted-2 px-1">Nada por aqui ainda.</p>
                ) : (
                  items.map((record) => <Card key={`${record.source}-${record.id}`} record={record} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
