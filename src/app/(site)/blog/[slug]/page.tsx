import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { BlogBody } from "@/components/blog/BlogBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqPageJsonLd } from "@/lib/faq-jsonld";
import { articleJsonLd } from "@/lib/blog/article-jsonld";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.metaDescription, type: "article" },
    twitter: { card: "summary", title: post.title, description: post.metaDescription },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <Section
      decor={
        <>
          <div className="absolute inset-0 bg-grid" />
          <div className="glow h-[340px] w-[340px] -top-28 left-1/2 -translate-x-1/2" />
        </>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      {post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(post.faq)) }}
        />
      )}

      <Reveal>
        <Link href="/blog" className="text-sm text-muted hover:text-accent transition-colors">
          ← Voltar pro blog
        </Link>
      </Reveal>

      <Reveal delay={40} className="max-w-2xl mt-6 mb-8">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-balance mb-6">
          {post.title}
        </h1>
        <AuthorByline date={post.date} />
      </Reveal>

      <Reveal delay={80} className="max-w-2xl">
        <p className="text-lg text-text leading-relaxed mb-8 font-medium">{post.intro}</p>
        <BlogBody blocks={post.body} />
      </Reveal>

      {post.faq.length > 0 && (
        <Reveal delay={100} className="max-w-2xl mt-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-5">
            Perguntas frequentes
          </p>
          <FAQAccordion items={post.faq} />
        </Reveal>
      )}

      {related.length > 0 && (
        <Reveal delay={120} className="max-w-4xl mt-14">
          <RelatedPosts posts={related} />
        </Reveal>
      )}
    </Section>
  );
}
