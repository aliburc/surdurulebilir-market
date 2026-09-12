import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getKnowledgeArticles } from "@/lib/queries";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Bilgi Merkezi — Sürdürülebilir Market",
  description:
    "Sürdürülebilir ambalaj tedariki, geri dönüşüm mevzuatı, sertifikasyon standartları ve yaşam döngüsü değerlendirmesi üzerine derinlemesine rehberler.",
};

export default async function BilgiMerkeziPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allArticles = await getKnowledgeArticles();
  const categories = Array.from(new Set(allArticles.map((a) => a.category)));
  const articles = category ? allArticles.filter((a) => a.category === category) : allArticles;
  const [featured, ...rest] = articles;

  return (
    <div>
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            Bilgi Merkezi
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Sürdürülebilir ambalaj tedariki hakkında derinlemesine bilgi
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Malzeme seçiminden mevzuat takibine, sertifikasyon standartlarından yaşam döngüsü
            değerlendirmesine kadar; ambalaj kararlarınızı veriye dayalı vermeniz için hazırladığımız
            rehberler. İçerikler, Türkiye&apos;deki güncel mevzuat çerçevesi ve uluslararası
            standartlar referans alınarak hazırlanır.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap gap-2">
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

        {featured && (
          <Link
            href={`/bilgi-merkezi/${featured.slug}`}
            className="group mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <span className="text-xs font-medium tracking-wide text-primary uppercase">
                Öne Çıkan · {featured.category}
              </span>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-primary">
                {featured.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{featured.excerpt}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
              Oku
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((a) => (
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

        {articles.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            Bu kategoride henüz içerik bulunmuyor.
          </p>
        )}
      </div>
    </div>
  );
}
