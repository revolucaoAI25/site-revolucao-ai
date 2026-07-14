"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseAuthBrowserClient } from "@/lib/supabase-auth-browser";

const TABS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/kanban", label: "Kanban" },
  { href: "/admin/tabela", label: "Tabela" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = getSupabaseAuthBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 flex items-center justify-between h-16">
        <nav className="flex items-center gap-2">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-accent text-[#07090a]"
                    : "text-muted hover:text-text"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-muted hover:text-text transition-colors cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
