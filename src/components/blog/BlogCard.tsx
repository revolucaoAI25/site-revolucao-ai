import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { CLUSTER_LABELS } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const formatted = new Date(`${post.date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-surface card-hover rounded-2xl p-6 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent-soft text-accent">
          {CLUSTER_LABELS[post.cluster]}
        </span>
        <span className="text-xs text-muted-2">{formatted}</span>
      </div>
      <h2 className="font-black text-lg text-text leading-snug text-balance">{post.title}</h2>
      <p className="text-sm text-muted leading-relaxed line-clamp-3">{post.intro}</p>
    </Link>
  );
}
