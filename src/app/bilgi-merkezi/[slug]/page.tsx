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

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <span className="text-xs font-medium tracking-wide text-primary uppercase">{article.category}</span>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{article.title}</h1>
      <p className="mt-4 text-muted-foreground">{article.body}</p>
    </article>
  );
}
