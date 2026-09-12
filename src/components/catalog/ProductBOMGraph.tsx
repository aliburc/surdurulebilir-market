"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Package, Layers, Building2, Share2 } from "lucide-react";

type ComponentNode = {
  id: string;
  name: string;
  spec: string;
  recyclability: string;
  sourceType: string;
  role: string;
  sharedWith: { slug: string; name: string }[];
};

type Selected = { kind: "item" } | { kind: "component"; id: string } | { kind: "supplier" };

const SIZE = 560;
const CENTER = SIZE / 2;
const RADIUS = 180;

function polar(radius: number, angle: number) {
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

export function ProductBOMGraph({
  itemName,
  components,
  supplier,
}: {
  itemName: string;
  components: ComponentNode[];
  supplier: { slug: string; companyName: string; city: string; region: string };
}) {
  const [selected, setSelected] = useState<Selected>({ kind: "item" });

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    const total = components.length + 1; // +1 for supplier node
    components.forEach((c, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      map.set(c.id, polar(RADIUS, angle));
    });
    const supplierAngle = (components.length / total) * Math.PI * 2 - Math.PI / 2;
    map.set("__supplier__", polar(RADIUS, supplierAngle));
    return map;
  }, [components]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[520px] select-none">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
          {components.map((c) => {
            const pos = positions.get(c.id)!;
            const active = selected.kind === "component" && selected.id === c.id;
            return (
              <line
                key={c.id}
                x1={CENTER}
                y1={CENTER}
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth={active ? 2 : 1}
                className={active ? "text-primary" : "text-border"}
                strokeDasharray={active ? undefined : "4 5"}
              />
            );
          })}
          {(() => {
            const pos = positions.get("__supplier__")!;
            const active = selected.kind === "supplier";
            return (
              <line
                x1={CENTER}
                y1={CENTER}
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth={active ? 2 : 1}
                className={active ? "text-accent-foreground" : "text-border"}
                strokeDasharray={active ? undefined : "4 5"}
              />
            );
          })()}
        </svg>

        <button
          type="button"
          onClick={() => setSelected({ kind: "item" })}
          className={`absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 bg-card text-center shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
            selected.kind === "item" ? "border-primary scale-105" : "border-border"
          }`}
          style={{ left: "50%", top: "50%" }}
        >
          <Package className="h-5 w-5 text-primary" />
          <span className="mt-1 line-clamp-2 px-2 text-[0.65rem] font-semibold leading-tight">
            {itemName}
          </span>
        </button>

        {components.map((c) => {
          const pos = positions.get(c.id)!;
          const active = selected.kind === "component" && selected.id === c.id;
          const dimmed = selected.kind !== "item" && !active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected({ kind: "component", id: c.id })}
              className={`absolute flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-card text-center shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                active ? "border-primary scale-110" : "border-border"
              } ${dimmed ? "opacity-40" : "opacity-100"}`}
              style={{ left: `${(pos.x / SIZE) * 100}%`, top: `${(pos.y / SIZE) * 100}%` }}
            >
              <Layers className="h-4 w-4 text-primary" />
              {c.sharedWith.length > 0 && <Share2 className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-accent p-0.5 text-accent-foreground" />}
            </button>
          );
        })}

        {(() => {
          const pos = positions.get("__supplier__")!;
          const active = selected.kind === "supplier";
          const dimmed = selected.kind !== "item" && !active;
          return (
            <button
              type="button"
              onClick={() => setSelected({ kind: "supplier" })}
              className={`absolute flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-accent/20 text-center shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                active ? "border-accent scale-110" : "border-border"
              } ${dimmed ? "opacity-40" : "opacity-100"}`}
              style={{ left: `${(pos.x / SIZE) * 100}%`, top: `${(pos.y / SIZE) * 100}%` }}
            >
              <Building2 className="h-4 w-4" style={{ color: "oklch(0.55 0.1 55)" }} />
            </button>
          );
        })()}
      </div>

      <DetailPanel selected={selected} components={components} supplier={supplier} />
    </div>
  );
}

function DetailPanel({
  selected,
  components,
  supplier,
}: {
  selected: Selected;
  components: ComponentNode[];
  supplier: { slug: string; companyName: string; city: string; region: string };
}) {
  if (selected.kind === "item") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-sm">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">Malzeme Ağı</p>
        <p className="mt-2 text-muted-foreground">
          Bu ürünün {components.length} malzeme bileşeni ve tedarikçisi ağda gösterilir. Paylaşılan
          bir malzeme bileşeninde <Share2 className="inline h-3 w-3" /> simgesi görünür — bu, aynı
          malzeme kaydının başka ürünlerde de kullanıldığı anlamına gelir.
        </p>
      </div>
    );
  }

  if (selected.kind === "supplier") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <span className="text-xs font-medium tracking-wide text-primary uppercase">Tedarikçi</span>
        <h3 className="mt-1 font-semibold">{supplier.companyName}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {supplier.city}, {supplier.region}
        </p>
        <Link
          href={`/tedarikciler/${supplier.slug}`}
          className="mt-3 inline-block text-sm text-primary underline underline-offset-2"
        >
          Tedarikçi profilini gör
        </Link>
      </div>
    );
  }

  const component = components.find((c) => c.id === selected.id);
  if (!component) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <span className="text-xs font-medium tracking-wide text-primary uppercase">
        Malzeme Bileşeni · {component.role}
      </span>
      <h3 className="mt-1 font-semibold">{component.name}</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Spesifikasyon</dt>
          <dd className="text-right font-medium">{component.spec}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Kaynak Türü</dt>
          <dd className="text-right font-medium">{component.sourceType}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Geri Dönüştürülebilirlik</dt>
          <dd className="text-right font-medium">{component.recyclability}</dd>
        </div>
      </dl>
      {component.sharedWith.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Share2 className="h-3.5 w-3.5" />
            Bu malzeme kaydı paylaşılıyor
          </p>
          <ul className="mt-2 space-y-1">
            {component.sharedWith.map((s) => (
              <li key={s.slug}>
                <Link href={`/pazar-yeri/${s.slug}`} className="text-sm text-primary underline underline-offset-2">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Bu malzeme kaydında yapılacak bir güncelleme, onu kullanan tüm ürünlere yansır.
          </p>
        </div>
      )}
    </div>
  );
}
