import { notFound } from "next/navigation";
import { getKnowledgeArticleBySlug } from "@/lib/queries";

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getKnowledgeArticleBySlug(slug);
  if (!article) notFound();

  const blocks = article.body.split(/\n\n+/).map((block) => block.trim()).filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <span className="text-xs font-medium tracking-wide text-primary uppercase">{article.category}</span>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{article.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{article.excerpt}</p>
      <div className="prose-content mt-8 space-y-4 text-[0.95rem] leading-relaxed text-foreground/90">
        {blocks.map((block, i) =>
          block.startsWith("## ") ? (
            <h2 key={i} className="pt-2 text-lg font-semibold text-foreground">
              {block.replace(/^##\s+/, "")}
            </h2>
          ) : (
            <p key={i}>{block}</p>
          )
        )}
      </div>
    </article>
  );
}
