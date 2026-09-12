import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
};

export function CaseStudySection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null;

  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Vaka analizleri</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/vaka-analizi/${c.slug}`}
              className="group rounded-2xl border border-border bg-card p-8 outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <p className="text-3xl font-semibold text-primary">{c.metricValue}</p>
              <p className="text-sm text-muted-foreground">{c.metricLabel}</p>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Detayları oku
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
