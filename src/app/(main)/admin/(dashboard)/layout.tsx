import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSupabaseAuthServerClient } from "@/lib/supabase-auth-server";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * O proxy.ts já barra quem não tem sessão antes de chegar aqui, mas
 * layouts não são reavaliados em toda navegação (client-side transitions),
 * então repetimos a checagem aqui também — perto dos dados, como recomenda
 * a documentação do Next.js.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
