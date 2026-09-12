"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/catalog/CategoryIcon";

type CategoryNode = {
  category: string;
  itemCount: number;
  suppliers: { slug: string; companyName: string }[];
};

const SIZE = 600;
const CENTER = SIZE / 2;
const RADIUS = 220;

function polar(radius: number, angle: number) {
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

export function HomeNetworkGraph({ categories }: { categories: CategoryNode[] }) {
  const [selected, setSelected] = useState<string | null>(categories[0]?.category ?? null);

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    categories.forEach((c, i) => {
      const angle = (i / Math.max(categories.length, 1)) * Math.PI * 2 - Math.PI / 2;
      map.set(c.category, polar(RADIUS, angle));
    });
    return map;
  }, [categories]);

  const active = categories.find((c) => c.category === selected) ?? categories[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[560px] select-none">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
          {categories.map((c) => {
            const pos = positions.get(c.category)!;
            const isActive = c.category === selected;
            return (
              <line
                key={c.category}
                x1={CENTER}
                y1={CENTER}
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth={isActive ? 2 : 1}
                className={isActive ? "text-primary" : "text-border"}
                strokeDasharray={isActive ? undefined : "4 5"}
              />
            );
          })}
        </svg>

        <div
          className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-primary bg-card text-center shadow-sm"
          style={{ left: `${(CENTER / SIZE) * 100}%`, top: `${(CENTER / SIZE) * 100}%` }}
        >
          <Layers className="h-5 w-5 text-primary" />
          <span className="mt-1 px-2 text-[0.7rem] font-semibold leading-tight">Pazar Yeri</span>
        </div>

        {categories.map((c) => {
          const pos = positions.get(c.category)!;
          const isActive = c.category === selected;
          return (
            <button
              key={c.category}
              type="button"
              onClick={() => setSelected(c.category)}
              className={`absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-card text-center shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                isActive ? "border-primary scale-110" : "border-border opacity-70 hover:opacity-100"
              }`}
              style={{ left: `${(pos.x / SIZE) * 100}%`, top: `${(pos.y / SIZE) * 100}%` }}
            >
              <CategoryIcon category={c.category} className="h-5 w-5 text-primary" />
              <span className="px-1 text-[0.6rem] font-medium leading-tight">{c.itemCount} ürün</span>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">Kategori</span>
          <h3 className="mt-1 text-lg font-semibold">{active.category}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{active.itemCount} ürün mevcut</p>

          {active.suppliers.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground">Bu kategoride tedarikçiler</p>
              <ul className="mt-2 space-y-1.5">
                {active.suppliers.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/tedarikciler/${s.slug}`}
                      className="text-sm text-foreground hover:text-primary hover:underline"
                    >
                      {s.companyName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            className="mt-5 w-full"
            nativeButton={false}
            render={<Link href={`/pazar-yeri?category=${encodeURIComponent(active.category)}`} />}
          >
            Kategoriyi Görüntüle
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
