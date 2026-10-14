"use client";

import { useEffect } from "react";
import { track, trackPageView } from "@/lib/track";
import type { FunnelPage } from "@/lib/funnel-tracking";

/**
 * Métricas da LP (painel /admin/funis): visita, até onde a pessoa rolou
 * (25/50/75/100%) e quais seções chegou a ver. Não renderiza nada.
 */
export function PageTracker({ page, sections }: { page: FunnelPage; sections: string[] }) {
  // String estável: se o pai re-renderizar com um array novo de mesmo conteúdo,
  // o efeito não roda de novo (senão a visita seria registrada duas vezes).
  const sectionsKey = sections.join(",");

  useEffect(() => {
    trackPageView(page);

    const fired = new Set<number>();
    let ticking = false;
    function check() {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark);
          track(page, "scroll_depth", { data: { percent: mark } });
        }
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // Conta a seção como vista quando ela entra nos 60% de cima da tela
    // (funciona pra seção de qualquer altura, inclusive maior que a tela).
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          track(page, "section_view", { step: id, data: { section: id } });
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -40% 0px" }
    );
    for (const id of sectionsKey.split(",")) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [page, sectionsKey]);

  return null;
}
