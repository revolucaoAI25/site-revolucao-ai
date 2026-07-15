export function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] text-center px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
        </svg>
      </span>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
        Vídeo em breve
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
