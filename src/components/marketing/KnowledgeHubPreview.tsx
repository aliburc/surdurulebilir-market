import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
};

export function KnowledgeHubPreview({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">Bilgi Merkezi</h2>
        <Link href="/bilgi-merkezi" className="text-sm font-medium text-primary">
          Tümünü gör
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {articles.slice(0, 3).map((a) => (
          <Link
            key={a.slug}
            href={`/bilgi-merkezi/${a.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="text-xs font-medium tracking-wide text-primary uppercase">{a.category}</span>
            <h3 className="mt-2 font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Oku
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
