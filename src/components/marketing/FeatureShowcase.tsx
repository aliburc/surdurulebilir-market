import { Database, ShieldCheck, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Database,
    title: "Merkezi Katalog",
    description:
      "Onlarca tedarikçinin ürün, malzeme ve sertifika verisini tek bir yerden filtreleyerek karşılaştırın.",
  },
  {
    icon: ShieldCheck,
    title: "Doğrulanmış Tedarikçiler",
    description:
      "Her tedarikçi profili şehir, kuruluş yılı ve sürdürülebilirlik puanıyla birlikte şeffaf şekilde listelenir.",
  },
  {
    icon: Zap,
    title: "Hızlı Teklif Süreci",
    description:
      "Tek tıkla teklif veya numune talebi gönderin, süreci alıcı panelinizden uçtan uca takip edin.",
  },
];

export function FeatureShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="sr-only">Platform özellikleri</h2>
      <div className="grid gap-8 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
