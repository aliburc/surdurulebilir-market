import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShieldCheck,
  Package,
  Ruler,
  Clock,
  Layers,
  Recycle,
  Leaf,
  CalendarCheck,
} from "lucide-react";
import { getCatalogItemBySlug, getRelatedItems } from "@/lib/queries";
import { getCategoryImage } from "@/lib/categoryImages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteRequestModal } from "@/components/catalog/QuoteRequestModal";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { ProductBOMGraph } from "@/components/catalog/ProductBOMGraph";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function CatalogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCatalogItemBySlug(slug);
  if (!item) notFound();

  const relatedItems = await getRelatedItems(item.supplierId, item.id);
  const tags = item.sustainabilityTags.split(",").filter(Boolean);

  const recordFields = [
    { icon: Layers, label: "Malzeme", value: item.material },
    { icon: Ruler, label: "Boyutlar", value: item.dimensions },
    { icon: Package, label: "Min. Sipariş", value: `${item.minOrderQuantity} adet` },
    { icon: Clock, label: "Teslim Süresi", value: `${item.leadTimeDays} gün` },
  ];
  if (item.recycledContentPercent != null) {
    recordFields.push({ icon: Recycle, label: "Geri Dönüşüm İçeriği", value: `%${item.recycledContentPercent}` });
  }
  if (item.weightGrams != null) {
    recordFields.push({ icon: Package, label: "Birim Ağırlık", value: `${item.weightGrams} g` });
  }

  const bomComponents = item.components.map((c) => ({
    id: c.materialComponent.id,
    name: c.materialComponent.name,
    spec: c.materialComponent.spec,
    recyclability: c.materialComponent.recyclability,
    sourceType: c.materialComponent.sourceType,
    role: c.role,
    sharedWith: c.materialComponent.catalogItems
      .filter((ci) => ci.catalogItem.id !== item.id)
      .map((ci) => ({ slug: ci.catalogItem.slug, name: ci.catalogItem.name })),
  }));

  const ppwrFieldsComplete = [
    item.material,
    item.weightGrams,
    item.recycledContentPercent,
    item.recyclabilityGrade,
    item.carbonFootprintGramsCO2e,
  ].filter((f) => f !== null && f !== undefined).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/pazar-yeri" className="hover:text-foreground">
          Pazar Yeri
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/pazar-yeri?category=${encodeURIComponent(item.category)}`}
          className="hover:text-foreground"
        >
          {item.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{item.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-2xl bg-muted sm:h-96">
          <Image
            src={getCategoryImage(item.category)}
            alt={item.category}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            priority
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
            {item.category}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{item.name}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            <Link
              href={`/tedarikciler/${item.supplier.slug}`}
              className="font-medium text-foreground hover:text-primary hover:underline"
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

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          {item.unitPriceMinTRY && item.unitPriceMaxTRY && (
            <p className="mt-5 text-2xl font-semibold text-primary">
              ₺{item.unitPriceMinTRY.toFixed(2)}
              <span className="text-base font-normal text-muted-foreground"> – ₺{item.unitPriceMaxTRY.toFixed(2)} / adet</span>
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <QuoteRequestModal
              catalogItemId={item.id}
              itemName={item.name}
              type="QUOTE"
              trigger={<Button size="lg">Fiyat Teklifi İste</Button>}
            />
            <QuoteRequestModal
              catalogItemId={item.id}
              itemName={item.name}
              type="SAMPLE"
              trigger={
                <Button size="lg" variant="outline">
                  Numune Talep Et
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="ozellikler">
          <TabsList variant="line" className="w-full justify-start border-b border-border">
            <TabsTrigger value="ozellikler">Özellikler</TabsTrigger>
            <TabsTrigger value="surdurulebilirlik">Sürdürülebilirlik</TabsTrigger>
            {bomComponents.length > 0 && <TabsTrigger value="malzeme-agi">Malzeme Ağı</TabsTrigger>}
            {item.certifications.length > 0 && (
              <TabsTrigger value="sertifikalar">Sertifikalar</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="ozellikler" className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recordFields.map((f) => (
                <div key={f.label} className="rounded-xl border border-border bg-card p-4">
                  <f.icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-xs text-muted-foreground">{f.label}</p>
                  <p className="mt-0.5 text-sm font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="surdurulebilirlik" className="pt-6">
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-5 py-3">
                <h2 className="text-sm font-semibold text-foreground">Ürün Kaydı</h2>
                <span className="text-xs text-muted-foreground">
                  {item.lastVerifiedAt
                    ? `Son doğrulama: ${new Date(item.lastVerifiedAt).toLocaleDateString("tr-TR")}`
                    : "Doğrulama bekleniyor"}
                </span>
              </div>
              <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {item.recyclabilityGrade && (
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Recycle className="h-4 w-4 text-primary" />
                      <p className="text-xs font-medium text-muted-foreground">Geri Dönüştürülebilirlik Notu</p>
                    </div>
                    <p className="mt-1.5 text-sm font-medium">{item.recyclabilityGrade}</p>
                  </div>
                )}
                {item.carbonFootprintGramsCO2e != null && (
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      <p className="text-xs font-medium text-muted-foreground">
                        Tahmini Karbon Ayak İzi (A1–A3)
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm font-medium">
                      {item.carbonFootprintGramsCO2e} g CO₂e / adet
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  PPWR raporlama alanları: {ppwrFieldsComplete}/5 dolu
                </span>
                <span>Karbon ve geri dönüştürülebilirlik değerleri malzeme türüne dayalı tahminidir; bağımsız LCA raporu değildir.</span>
              </div>
            </div>
          </TabsContent>

          {bomComponents.length > 0 && (
            <TabsContent value="malzeme-agi" className="pt-6">
              <p className="mb-6 text-sm text-muted-foreground">
                Bu ürünü oluşturan malzeme kayıtlarını ve tedarikçiyi keşfetmek için bir düğüme
                tıklayın.
              </p>
              <ProductBOMGraph
                itemName={item.name}
                components={bomComponents}
                supplier={{
                  slug: item.supplier.slug,
                  companyName: item.supplier.companyName,
                  city: item.supplier.city,
                  region: item.supplier.region,
                }}
              />
            </TabsContent>
          )}

          {item.certifications.length > 0 && (
            <TabsContent value="sertifikalar" className="pt-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {item.certifications.map((c) => (
                  <div
                    key={c.certificationId}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-xs"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{c.certification.name}</p>
                      <p className="mt-0.5 text-muted-foreground">{c.certification.issuingBody}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {relatedItems.length > 0 && (
        <div className="mt-14 border-t border-border pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {item.supplier.companyName} firmasından diğer ürünler
            </h2>
            <Link
              href={`/tedarikciler/${item.supplier.slug}`}
              className="text-sm text-primary hover:underline"
            >
              Tedarikçi profilini gör
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((related) => (
              <CatalogCard key={related.id} item={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
