import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-4">
        Leia também
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-surface card-hover rounded-2xl p-5 flex flex-col gap-2"
          >
            <p className="font-semibold text-sm text-text leading-snug">{post.title}</p>
            <p className="text-xs text-muted-2 line-clamp-2">{post.metaDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
