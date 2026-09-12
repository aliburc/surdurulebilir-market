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

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-3xl font-semibold text-primary">{caseStudy.metricValue}</p>
      <p className="text-sm text-muted-foreground">{caseStudy.metricLabel}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{caseStudy.title}</h1>
      <p className="mt-4 text-muted-foreground">{caseStudy.body}</p>
    </article>
  );
}
