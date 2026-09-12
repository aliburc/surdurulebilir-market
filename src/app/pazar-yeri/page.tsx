import Link from "next/link";
import { getCatalogItems, getCatalogCategories } from "@/lib/queries";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Pazar Yeri — Sürdürülebilir Market" };

type SearchParams = Promise<{ category?: string; q?: string }>;

export default async function PazarYeriPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [items, categories] = await Promise.all([
    getCatalogItems({ category: params.category, q: params.q }),
    getCatalogCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Pazar Yeri</h1>
        <p className="mt-2 text-muted-foreground">
          {items.length} ürün arasından malzeme, kategori ve tedarikçiye göre karşılaştırın.
        </p>
      </div>

      <form className="mt-8 flex flex-wrap gap-2" action="/pazar-yeri">
        <input
          type="text"
          name="q"
          defaultValue={params.q}
          placeholder="Ürün, malzeme veya açıklamada ara..."
          className="h-9 min-w-64 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        {params.category && <input type="hidden" name="category" value={params.category} />}
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/pazar-yeri">
          <Badge variant={!params.category ? "default" : "outline"} className="cursor-pointer">
            Tümü
          </Badge>
        </Link>
        {categories.map((c) => (
          <Link key={c} href={`/pazar-yeri?category=${encodeURIComponent(c)}`}>
            <Badge variant={params.category === c ? "default" : "outline"} className="cursor-pointer">
              {c}
            </Badge>
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          Bu filtrelere uygun ürün bulunamadı.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
