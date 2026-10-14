"use client";

import { useEffect, useState } from "react";

/**
 * Barra de progresso de leitura, só usada nesta LP (v2) — dá um feedback
 * visual contínuo de avanço na página, sem depender de nenhum componente
 * ou estilo compartilhado com o resto do site.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06]">
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
