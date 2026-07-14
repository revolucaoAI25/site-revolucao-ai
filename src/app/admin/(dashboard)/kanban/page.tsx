import { getAdminRecords } from "@/lib/admin-data";
import { AdminKanbanBoard } from "@/components/admin/AdminKanbanBoard";

export default async function AdminKanbanPage() {
  const records = await getAdminRecords();
  return <AdminKanbanBoard records={records} />;
}
