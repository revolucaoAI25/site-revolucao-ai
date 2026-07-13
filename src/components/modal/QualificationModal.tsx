"use client";

import { useQualificationModal } from "./ModalProvider";
import { flows } from "@/lib/qualification-flows";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { ContactForm } from "./ContactForm";

export function QualificationModal() {
  const { state, choose, submitContact, close, goBack } = useQualificationModal();
  const { flowId, stepId, result, history } = state;

  if (!flowId) return null;

  const flow = flows[flowId];
  const step = stepId ? flow.steps[stepId] : null;
  const canGoBack = history.length > 0 || Boolean(result);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={flow.title}
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />
      <div
        className={`relative w-full ${
          result?.embed ? "sm:max-w-2xl" : "sm:max-w-lg"
        } bg-surface border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_-20px_rgba(0,0,0,0.6)] animate-fade-in-up max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {flow.title}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar pop-up"
            className="text-muted hover:text-text transition-colors p-1 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-4">
          {result ? (
            <div>
              <h3 className="text-xl font-black tracking-tight mb-3">
                {result.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {result.description}
              </p>
              {result.embed ? (
                <CalendlyEmbed url={result.embed.url} />
              ) : result.cta ? (
                <a
                  href={result.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors"
                >
                  {result.cta.label}
                </a>
              ) : null}
            </div>
          ) : step ? (
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight mb-2">
                {step.question}
              </h3>
              {step.helper && (
                <p className="text-muted text-sm mb-4">{step.helper}</p>
              )}
              {step.kind === "contact" ? (
                <ContactForm
                  onSubmit={(name, phone) => submitContact(name, phone, step.next!)}
                />
              ) : (
                <div className="flex flex-col gap-3 mt-5">
                  {step.options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => choose(option.next, step.question, option.label)}
                      className="group w-full flex items-center justify-between gap-3 text-left rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 font-medium transition-all duration-150 hover:border-accent/50 hover:text-accent hover:-translate-y-0.5 cursor-pointer"
                    >
                      {option.label}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="shrink-0 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {canGoBack && (
            <button
              type="button"
              onClick={goBack}
              className="mt-6 text-sm text-muted hover:text-text transition-colors cursor-pointer"
            >
              ← Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
