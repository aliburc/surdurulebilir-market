"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Item = {
  slug: string;
  name: string;
  category: string;
  material: string;
  minOrderQuantity: number;
  leadTimeDays: number;
  unitPriceMinTRY: number | null;
  unitPriceMaxTRY: number | null;
  recycledContentPercent: number | null;
  supplier: { companyName: string; city: string; sustainabilityScore: number };
};

export function HeroPreviewCard({ items }: { items: Item[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = items[activeIndex];
  if (!item) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`max-w-[9rem] truncate rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              i === activeIndex
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
            title={it.name}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div className="relative mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-sm font-medium">{item.name}</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Aktif
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-muted-foreground">Malzeme</dt>
          <dd className="text-right font-medium">{item.material}</dd>
          {item.recycledContentPercent != null && (
            <>
              <dt className="text-muted-foreground">Geri Dönüşüm İçeriği</dt>
              <dd className="text-right font-medium">%{item.recycledContentPercent}</dd>
            </>
          )}
          <dt className="text-muted-foreground">Min. Sipariş</dt>
          <dd className="text-right font-medium">{item.minOrderQuantity} adet</dd>
          <dt className="text-muted-foreground">Teslim Süresi</dt>
          <dd className="text-right font-medium">{item.leadTimeDays} gün</dd>
          {item.unitPriceMinTRY && item.unitPriceMaxTRY && (
            <>
              <dt className="text-muted-foreground">Fiyat Bandı</dt>
              <dd className="text-right font-medium">
                ₺{item.unitPriceMinTRY.toFixed(2)} – ₺{item.unitPriceMaxTRY.toFixed(2)}
              </dd>
            </>
          )}
        </dl>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <span>
            {item.supplier.companyName} · {item.supplier.city}
          </span>
          <span className="font-medium text-primary">
            Sürdürülebilirlik: {item.supplier.sustainabilityScore}/100
          </span>
        </div>
        <Link
          href={`/pazar-yeri/${item.slug}`}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Ürün Kaydını İncele
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
