import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getCategoryImage } from "@/lib/categoryImages";

type CatalogCardItem = {
  slug: string;
  name: string;
  category: string;
  material: string;
  minOrderQuantity: number;
  leadTimeDays: number;
  unitPriceMinTRY: number | null;
  unitPriceMaxTRY: number | null;
  imageColor: string;
  sustainabilityTags: string;
  supplier: { companyName: string; city: string };
};

export function CatalogCard({ item }: { item: CatalogCardItem }) {
  const tags = item.sustainabilityTags.split(",").filter(Boolean);

  return (
    <Link
      href={`/pazar-yeri/${item.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="relative h-32 overflow-hidden rounded-xl bg-muted">
        <Image
          src={getCategoryImage(item.category)}
          alt={item.category}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="mt-4 text-xs font-medium tracking-wide text-primary uppercase">
        {item.category}
      </span>
      <h3 className="mt-1 font-semibold group-hover:text-primary">{item.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {item.supplier.companyName} · {item.supplier.city}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.slice(0, 2).map((t) => (
          <Badge key={t} variant="secondary" className="text-[0.7rem]">
            {t}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-muted-foreground">Min. {item.minOrderQuantity} adet</span>
        {item.unitPriceMinTRY && item.unitPriceMaxTRY ? (
          <span className="font-medium">
            ₺{item.unitPriceMinTRY.toFixed(2)}–{item.unitPriceMaxTRY.toFixed(2)}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
