export function ScreenshotPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-center px-6 ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-muted-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 16l4.5-4 3.5 3 3-2.5L21 16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
        Print em breve
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
