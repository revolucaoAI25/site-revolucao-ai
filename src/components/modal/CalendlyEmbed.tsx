"use client";

import { useEffect, useRef, useState } from "react";
import { loadCalendlyScript } from "@/lib/calendly";

/**
 * Agenda do Calendly embutida direto no pop-up (em vez de abrir uma nova
 * aba) — o visitante escolhe o horário sem sair do site. O script já
 * começa a carregar assim que o pop-up abre (ver `ModalProvider`), então
 * na maioria das vezes o widget já está pronto quando o usuário chega
 * aqui; o spinner só cobre o tempo do próprio iframe do Calendly montar.
 */
export function CalendlyEmbed({
  url,
  height = 650,
}: {
  url: string;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState(url);

  if (url !== loadedUrl) {
    setLoadedUrl(url);
    setReady(false);
  }

  useEffect(() => {
    let cancelled = false;

    loadCalendlyScript().then(() => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";

      // Precisa observar ANTES de chamar `initInlineWidget`: o Calendly
      // insere o iframe de forma síncrona dentro dessa chamada, então
      // observar depois faria o MutationObserver perder a inserção e o
      // spinner nunca sumiria.
      const observer = new MutationObserver(() => {
        if (containerRef.current?.querySelector("iframe")) {
          setReady(true);
          observer.disconnect();
        }
      });
      observer.observe(containerRef.current, { childList: true, subtree: true });

      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });

      if (containerRef.current.querySelector("iframe")) {
        setReady(true);
        observer.disconnect();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="relative" style={{ minWidth: 280, height }}>
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
          <span className="h-8 w-8 rounded-full border-2 border-white/15 border-t-accent animate-spin" />
          <p className="text-sm">Carregando agenda...</p>
        </div>
      )}
      <div
        ref={containerRef}
        style={{ minWidth: 280, height }}
        className="overflow-hidden rounded-2xl"
      />
    </div>
  );
}
