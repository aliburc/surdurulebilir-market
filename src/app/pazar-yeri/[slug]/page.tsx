import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { getCatalogItemBySlug } from "@/lib/queries";
import { getCategoryImage } from "@/lib/categoryImages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteRequestModal } from "@/components/catalog/QuoteRequestModal";

export default async function CatalogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCatalogItemBySlug(slug);
  if (!item) notFound();

  const tags = item.sustainabilityTags.split(",").filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-2xl bg-muted">
          <Image
            src={getCategoryImage(item.category)}
            alt={item.category}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            {item.category}
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{item.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <Link
              href={`/tedarikciler/${item.supplier.slug}`}
              className="text-foreground hover:text-primary hover:underline"
            >
              {item.supplier.companyName}
            </Link>{" "}
            · {item.supplier.city}, {item.supplier.region}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{item.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-y-3 rounded-xl border border-border bg-card p-4 text-sm">
            <dt className="text-muted-foreground">Malzeme</dt>
            <dd className="text-right font-medium">{item.material}</dd>
            {item.recycledContentPercent != null && (
              <>
                <dt className="text-muted-foreground">Geri Dönüşüm İçeriği</dt>
                <dd className="text-right font-medium">%{item.recycledContentPercent}</dd>
              </>
            )}
            <dt className="text-muted-foreground">Boyutlar</dt>
            <dd className="text-right font-medium">{item.dimensions}</dd>
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

          {item.certifications.length > 0 && (
            <div className="mt-4 space-y-2">
              {item.certifications.map((c) => (
                <div
                  key={c.certificationId}
                  className="flex items-start gap-2 rounded-lg border border-border p-3 text-xs"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{c.certification.name}</p>
                    <p className="text-muted-foreground">{c.certification.issuingBody}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <QuoteRequestModal
              catalogItemId={item.id}
              itemName={item.name}
              type="QUOTE"
              trigger={<Button>Fiyat Teklifi İste</Button>}
            />
            <QuoteRequestModal
              catalogItemId={item.id}
              itemName={item.name}
              type="SAMPLE"
              trigger={<Button variant="outline">Numune Talep Et</Button>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
