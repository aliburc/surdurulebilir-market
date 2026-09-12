import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/70 to-background">
      <div
        className="absolute inset-0 opacity-[0.4]"
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

        <div className="relative">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-medium">Geri Dönüştürülmüş Oluklu Karton Kutu</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Aktif
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Malzeme</dt>
              <dd className="text-right font-medium">Geri dön. oluklu karton</dd>
              <dt className="text-muted-foreground">Geri Dönüşüm İçeriği</dt>
              <dd className="text-right font-medium">%90</dd>
              <dt className="text-muted-foreground">Min. Sipariş</dt>
              <dd className="text-right font-medium">500 adet</dd>
              <dt className="text-muted-foreground">Teslim Süresi</dt>
              <dd className="text-right font-medium">12 gün</dd>
              <dt className="text-muted-foreground">Fiyat Bandı</dt>
              <dd className="text-right font-medium">₺6,50 – ₺9,20</dd>
            </dl>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
              <span>YeşilPak Ambalaj A.Ş. · İstanbul</span>
              <span className="font-medium text-primary">Sürdürülebilirlik: 84/100</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm sm:block">
            <p className="text-xs text-muted-foreground">Ortalama teklif yanıt süresi</p>
            <p className="text-lg font-semibold text-primary">3 gün</p>
          </div>
        </div>
      </div>
    </section>
  );
}
