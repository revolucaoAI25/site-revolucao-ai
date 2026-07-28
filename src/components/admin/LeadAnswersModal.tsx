import type { LeadRow } from "@/lib/admin-types";

export function LeadAnswersModal({
  record,
  onClose,
}: {
  record: LeadRow;
  onClose: () => void;
}) {
  const answers = record.answers ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">
            Respostas do pop-up{record.name ? ` — ${record.name}` : ""}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-text transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {answers.length === 0 ? (
          <p className="text-sm text-muted-2">
            Nenhuma resposta registrada pra esse lead (provavelmente um
            registro antigo, de antes de guardarmos as respostas).
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {answers.map((answer, index) => (
              <div
                key={`${answer.question}-${index}`}
                className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
                  {answer.question}
                </p>
                <p className="text-sm text-text leading-relaxed">{answer.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
