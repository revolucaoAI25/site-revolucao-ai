import { getAdminRecords } from "@/lib/admin-data";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminTabelaPage() {
  const records = await getAdminRecords();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Tabela</h1>
        <p className="text-muted text-sm">
          Todos os registros, detalhados e filtráveis.
        </p>
      </div>
      <AdminTable records={records} />
    </div>
  );
}
