import { ShoppingBag, ClipboardCheck, LineChart, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MODULES = [
  {
    icon: ShoppingBag,
    title: "Pazar Yeri",
    description: "Katalog gezme, filtreleme ve teklif/numune talebi.",
    status: "Kullanılabilir",
  },
  {
    icon: ClipboardCheck,
    title: "Uyumluluk Raporlama",
    description: "Türkiye'ye uyarlanmış, temsili ambalaj atığı raporlama çerçevesi.",
    status: "Örnek Sürüm",
  },
  {
    icon: RefreshCcw,
    title: "Stok & Yeniden Sipariş Takibi",
    description: "Düzenli siparişler için otomatik hatırlatmalar.",
    status: "Yakında",
  },
  {
    icon: LineChart,
    title: "Tedarik Analitiği",
    description: "Tedarikçi performansı ve maliyet trendleri üzerine içgörüler.",
    status: "Yakında",
  },
];

export function ModuleCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">Tek platform, dört modül</h2>
        <p className="mt-3 text-muted-foreground">
          Bugün pazar yeri ve uyumluluk modülleriyle başlayın, yol haritamızdaki yeni modüllerle büyüyün.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m) => (
          <div key={m.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <m.icon className="h-5 w-5" />
              </span>
              <Badge variant={m.status === "Yakında" ? "outline" : "secondary"}>{m.status}</Badge>
            </div>
            <h3 className="mt-4 font-semibold">{m.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
