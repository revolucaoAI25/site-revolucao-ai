import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

const title = "Blog — Revolução AI";
const description =
  "O que aprendemos implementando agentes de IA de verdade no WhatsApp: o que funciona, o que não funciona e o que vale saber antes de contratar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <Section
      decor={
        <>
          <div className="absolute inset-0 bg-grid" />
          <div className="glow h-[380px] w-[380px] -top-32 left-1/2 -translate-x-1/2" />
        </>
      }
    >
      <Reveal>
        <Eyebrow>Blog</Eyebrow>
        <SectionTitle className="mb-4 max-w-2xl">
          Sobre agente de IA, atendimento e vendas no WhatsApp
        </SectionTitle>
        <p className="text-muted max-w-2xl mb-12 leading-relaxed">
          Textos diretos sobre o que a gente aprendeu implementando agentes
          de IA de verdade — sem prometer milagre, sem enrolação.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="text-muted-2">Os primeiros artigos chegam em breve.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 40}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
