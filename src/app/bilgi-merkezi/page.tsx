import Link from "next/link";
import { getKnowledgeArticles } from "@/lib/queries";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Bilgi Merkezi — Sürdürülebilir Market" };

export default async function BilgiMerkeziPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allArticles = await getKnowledgeArticles();
  const categories = Array.from(new Set(allArticles.map((a) => a.category)));
  const articles = category ? allArticles.filter((a) => a.category === category) : allArticles;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Bilgi Merkezi</h1>
      <p className="mt-3 text-muted-foreground">
        Sürdürülebilir ambalaj tedariki üzerine rehberler ve genel bilgilendirme içerikleri.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/bilgi-merkezi">
          <Badge variant={!category ? "default" : "outline"} className="cursor-pointer">
            Tümü
          </Badge>
        </Link>
        {categories.map((c) => (
          <Link key={c} href={`/bilgi-merkezi?category=${encodeURIComponent(c)}`}>
            <Badge variant={category === c ? "default" : "outline"} className="cursor-pointer">
              {c}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/bilgi-merkezi/${a.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="text-xs font-medium tracking-wide text-primary uppercase">{a.category}</span>
            <h2 className="mt-2 font-semibold group-hover:text-primary">{a.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
