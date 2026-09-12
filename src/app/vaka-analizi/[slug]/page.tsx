import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/queries";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const blocks = caseStudy.body.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-3xl font-semibold text-primary">{caseStudy.metricValue}</p>
      <p className="text-sm text-muted-foreground">{caseStudy.metricLabel}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{caseStudy.title}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/90">
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
