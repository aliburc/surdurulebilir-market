"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Package, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ItemNode = {
  id: string;
  slug: string;
  name: string;
  category: string;
  material: string;
  minOrderQuantity: number;
  leadTimeDays: number;
  unitPriceMinTRY: number | null;
  unitPriceMaxTRY: number | null;
  certificationIds: string[];
};

type CertNode = {
  id: string;
  name: string;
  issuingBody: string;
  description: string;
};

type SupplierCenter = {
  id: string;
  companyName: string;
  city: string;
  region: string;
  description: string;
  sustainabilityScore: number;
  contactName: string;
  contactEmail: string;
};

type Selected =
  | { kind: "supplier" }
  | { kind: "item"; id: string }
  | { kind: "cert"; id: string }
  | null;

const SIZE = 640;
const CENTER = SIZE / 2;
const ITEM_RADIUS = 170;
const CERT_RADIUS = 280;

function polar(radius: number, angle: number) {
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

export function SupplyNetworkGraph({
  supplier,
  items,
  certs,
}: {
  supplier: SupplierCenter;
  items: ItemNode[];
  certs: CertNode[];
}) {
  const [selected, setSelected] = useState<Selected>({ kind: "supplier" });

  const itemPositions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    items.forEach((item, i) => {
      const angle = (i / Math.max(items.length, 1)) * Math.PI * 2 - Math.PI / 2;
      map.set(item.id, polar(ITEM_RADIUS, angle));
    });
    return map;
  }, [items]);

  const certPositions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    certs.forEach((cert, i) => {
      const angle = (i / Math.max(certs.length, 1)) * Math.PI * 2 - Math.PI / 2 + 0.35;
      map.set(cert.id, polar(CERT_RADIUS, angle));
    });
    return map;
  }, [certs]);

  const relatedCertIds = useMemo(() => {
    if (selected?.kind === "item") {
      const item = items.find((i) => i.id === selected.id);
      return new Set(item?.certificationIds ?? []);
    }
    if (selected?.kind === "supplier") return new Set(certs.map((c) => c.id));
    return new Set<string>();
  }, [selected, items, certs]);

  const relatedItemIds = useMemo(() => {
    if (selected?.kind === "cert") {
      return new Set(items.filter((i) => i.certificationIds.includes(selected.id)).map((i) => i.id));
    }
    if (selected?.kind === "supplier") return new Set(items.map((i) => i.id));
    return new Set<string>();
  }, [selected, items]);

  function isEdgeActive(itemId: string, certId?: string) {
    if (!selected) return false;
    if (selected.kind === "supplier") return true;
    if (selected.kind === "item") return selected.id === itemId;
    if (selected.kind === "cert" && certId) return selected.id === certId && relatedItemIds.has(itemId);
    return false;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="relative mx-auto aspect-square w-full max-w-[640px] select-none">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
          {items.map((item) => {
            const pos = itemPositions.get(item.id)!;
            const active = isEdgeActive(item.id);
            return (
              <line
                key={`s-${item.id}`}
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
          {items.flatMap((item) =>
            item.certificationIds
              .map((certId) => {
                const from = itemPositions.get(item.id);
                const to = certPositions.get(certId);
                if (!from || !to) return null;
                const active = isEdgeActive(item.id, certId);
                return (
                  <line
                    key={`${item.id}-${certId}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="currentColor"
                    strokeWidth={active ? 2 : 1}
                    className={active ? "text-accent" : "text-border"}
                    strokeDasharray={active ? undefined : "4 5"}
                  />
                );
              })
              .filter(Boolean)
          )}
        </svg>

        <button
          type="button"
          onClick={() => setSelected({ kind: "supplier" })}
          className={`absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 bg-card text-center shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
            selected?.kind === "supplier" ? "border-primary scale-105" : "border-border"
          }`}
          style={{ left: `${(CENTER / SIZE) * 100}%`, top: `${(CENTER / SIZE) * 100}%` }}
        >
          <Building2 className="h-5 w-5 text-primary" />
          <span className="mt-1 line-clamp-2 px-1.5 text-[0.65rem] font-semibold leading-tight">
            {supplier.companyName}
          </span>
        </button>

        {items.map((item) => {
          const pos = itemPositions.get(item.id)!;
          const active = selected?.kind === "item" && selected.id === item.id;
          const dimmed = !!selected && selected.kind !== "supplier" && !isEdgeActive(item.id) && !active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected({ kind: "item", id: item.id })}
              className={`absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border-2 bg-card text-center shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                active ? "border-primary scale-110" : "border-border"
              } ${dimmed ? "opacity-35" : "opacity-100"}`}
              style={{ left: `${(pos.x / SIZE) * 100}%`, top: `${(pos.y / SIZE) * 100}%` }}
            >
              <Package className="h-4 w-4 text-primary" />
            </button>
          );
        })}

        {certs.map((cert) => {
          const pos = certPositions.get(cert.id)!;
          const active = selected?.kind === "cert" && selected.id === cert.id;
          const dimmed = !!selected && selected.kind !== "supplier" && !relatedCertIds.has(cert.id) && !active;
          return (
            <button
              key={cert.id}
              type="button"
              onClick={() => setSelected({ kind: "cert", id: cert.id })}
              className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-accent/20 shadow-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                active ? "border-accent scale-110" : "border-border"
              } ${dimmed ? "opacity-35" : "opacity-100"}`}
              style={{ left: `${(pos.x / SIZE) * 100}%`, top: `${(pos.y / SIZE) * 100}%` }}
            >
              <ShieldCheck className="h-4 w-4 text-accent" style={{ color: "oklch(0.55 0.1 55)" }} />
            </button>
          );
        })}
      </div>

      <DetailPanel
        selected={selected}
        supplier={supplier}
        items={items}
        certs={certs}
        onClose={() => setSelected({ kind: "supplier" })}
      />
    </div>
  );
}

function DetailPanel({
  selected,
  supplier,
  items,
  certs,
  onClose,
}: {
  selected: Selected;
  supplier: SupplierCenter;
  items: ItemNode[];
  certs: CertNode[];
  onClose: () => void;
}) {
  if (!selected) return null;

  if (selected.kind === "supplier") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <span className="text-xs font-medium tracking-wide text-primary uppercase">Tedarikçi</span>
        <h3 className="mt-1 text-lg font-semibold">{supplier.companyName}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {supplier.city}, {supplier.region}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{supplier.description}</p>
        <div className="mt-4 rounded-xl bg-muted px-3 py-2 text-sm">
          Sürdürülebilirlik puanı: <span className="font-semibold text-primary">{supplier.sustainabilityScore}/100</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {items.length} ürün · {certs.length} sertifika
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Ağdaki bir ürün veya sertifikaya tıklayarak bağlantılarını keşfedin.
        </p>
      </div>
    );
  }

  if (selected.kind === "item") {
    const item = items.find((i) => i.id === selected.id);
    if (!item) return null;
    const itemCerts = certs.filter((c) => item.certificationIds.includes(c.id));
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium tracking-wide text-primary uppercase">{item.category}</span>
            <h3 className="mt-1 text-lg font-semibold">{item.name}</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Kapat">
            <X className="h-4 w-4" />
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Malzeme</dt>
          <dd className="text-right font-medium">{item.material}</dd>
          <dt className="text-muted-foreground">Min. Sipariş</dt>
          <dd className="text-right font-medium">{item.minOrderQuantity} adet</dd>
          <dt className="text-muted-foreground">Teslim Süresi</dt>
          <dd className="text-right font-medium">{item.leadTimeDays} gün</dd>
          {item.unitPriceMinTRY && item.unitPriceMaxTRY && (
            <>
              <dt className="text-muted-foreground">Fiyat Bandı</dt>
              <dd className="text-right font-medium">
                ₺{item.unitPriceMinTRY.toFixed(2)}–{item.unitPriceMaxTRY.toFixed(2)}
              </dd>
            </>
          )}
        </dl>
        {itemCerts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {itemCerts.map((c) => (
              <span key={c.id} className="rounded-full bg-accent/20 px-2 py-0.5 text-[0.7rem] text-foreground">
                {c.name}
              </span>
            ))}
          </div>
        )}
        <Button
          className="mt-4 w-full"
          size="sm"
          nativeButton={false}
          render={<Link href={`/pazar-yeri/${item.slug}`} />}
        >
          Ürünü Görüntüle
        </Button>
      </div>
    );
  }

  const cert = certs.find((c) => c.id === selected.id);
  if (!cert) return null;
  const certItems = items.filter((i) => i.certificationIds.includes(cert.id));
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium tracking-wide text-primary uppercase">Sertifika</span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Kapat">
          <X className="h-4 w-4" />
        </button>
      </div>
      <h3 className="mt-1 text-lg font-semibold">{cert.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{cert.issuingBody}</p>
      <p className="mt-3 text-sm text-muted-foreground">{cert.description}</p>
      {certItems.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground">Bu sertifikaya sahip ürünler</p>
          <ul className="mt-2 space-y-1">
            {certItems.map((i) => (
              <li key={i.id}>
                <Link href={`/pazar-yeri/${i.slug}`} className="text-sm text-primary underline underline-offset-2">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
