import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPreviewCard } from "./HeroPreviewCard";

type HeroItem = {
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

export function Hero({ items }: { items: HeroItem[] }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/70 to-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.4 0.08 195 / 0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <PackageCheck className="h-3.5 w-3.5 text-primary" />
            Türkiye&apos;nin B2B sürdürülebilir ambalaj pazarı
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Sürdürülebilir ambalaj tedarikini{" "}
            <span className="text-primary">tek platformda</span> basitleştirin
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
            Markaları doğrulanmış Türk tedarikçilerle buluşturan merkezi katalog: malzeme,
            sertifika ve fiyat bandını karşılaştırın, saniyeler içinde teklif veya numune talep edin.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/pazar-yeri" />}>
              Pazar Yerini Keşfet
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/iletisim" />}
            >
              Demo Talep Et
            </Button>
          </div>
        </div>

        <HeroPreviewCard items={items} />
      </div>
    </section>
  );
}
