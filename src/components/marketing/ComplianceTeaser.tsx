import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplianceTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-primary uppercase">
              <ShieldAlert className="h-3.5 w-3.5" />
              Uyumluluk & Raporlama
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Türkiye&apos;nin ambalaj atığı mevzuatına genel bir bakış
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Bu modül, genişletilmiş üretici sorumluluğu çerçevesine temsili bir bakış sunar.
              Bağlayıcı hukuki danışmanlık yerine geçmez — güncel mevzuat için ilgili resmi
              kurumlara başvurunuz.
            </p>
          </div>
          <Button variant="outline" nativeButton={false} render={<Link href="/surdurulebilirlik" />}>
            Detayları İncele
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
