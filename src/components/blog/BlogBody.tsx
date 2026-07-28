import Link from "next/link";
import type { BlogBlock, InlineRun } from "@/lib/blog/types";
import { CTAButton } from "@/components/ui/CTAButton";

function Runs({ content }: { content: string | InlineRun[] }) {
  if (typeof content === "string") return <>{content}</>;
  return (
    <>
      {content.map((run, i) => {
        if (typeof run === "string") return <span key={i}>{run}</span>;
        if ("bold" in run) {
          return (
            <strong key={i} className="text-text font-semibold">
              {run.text}
            </strong>
          );
        }
        const linkClass =
          "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
        return run.external ? (
          <a key={i} href={run.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {run.text}
          </a>
        ) : (
          <Link key={i} href={run.href} className={linkClass}>
            {run.text}
          </Link>
        );
      })}
    </>
  );
}

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-5 text-[15px] sm:text-base leading-relaxed text-text/85">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-4 text-xl sm:text-2xl font-black tracking-tight text-text text-balance"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-lg font-bold text-text">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i}>
                <Runs content={block.content} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <Runs content={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <p
                key={i}
                className="border-l-2 border-accent/50 pl-4 py-1 text-text font-medium"
              >
                {block.text}
              </p>
            );
          case "cta":
            return (
              <div
                key={i}
                className="card-surface rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2"
              >
                <p className="text-text font-medium flex-1">{block.lead}</p>
                <CTAButton href={block.href} external={block.external} size="md" variant="secondary">
                  {block.label}
                </CTAButton>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
