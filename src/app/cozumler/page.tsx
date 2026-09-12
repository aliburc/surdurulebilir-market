import { ShoppingBag, ClipboardCheck, RefreshCcw, LineChart, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Çözümler — Sürdürülebilir Market",
  description:
    "Sürdürülebilir Market'in pazar yeri, uyumluluk raporlama, stok takibi ve tedarik analitiği modüllerini detaylıca inceleyin.",
};

const SOLUTIONS = [
  {
    icon: ShoppingBag,
    title: "Pazar Yeri",
    status: "Kullanılabilir",
    description:
      "Onlarca sürdürülebilir ambalaj tedarikçisini tek katalogdan gezin, malzeme ve fiyat bandına göre filtreleyin, teklif ve numune taleplerinizi tek formla gönderin.",
    points: [
      "Kategori, malzeme ve sürdürülebilirlik etiketine göre filtreleme",
      "Her ürün için gerçek zamanlı geri dönüştürülebilirlik notu ve tahmini karbon ayak izi",
      "Tek tıkla teklif veya numune talebi, alıcı panelinden uçtan uca takip",
      "Aynı tedarikçinin diğer ürünlerini keşfetme",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Uyumluluk Raporlama",
    status: "Örnek Sürüm",
    description:
      "Türkiye'nin ambalaj atığı mevzuatına ve AB'nin PPWR düzenlemesiyle karşılaştırmasına genel bir bakış sunan, gerçek mevzuat referanslarıyla desteklenen bir bilgi merkezi.",
    points: [
      "Genişletilmiş Üretici Sorumluluğu (GÜS) çerçevesine genel bakış",
      "Depozito Yönetim Sistemi (DYS) kapsamı ve etkisi",
      "PPWR veri noktalarıyla karşılaştırma",
      "Sertifikasyon standartları (FSC, EN 13432) rehberi",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Stok & Yeniden Sipariş Takibi",
    status: "Yakında",
    description:
      "Düzenli sipariş verdiğiniz ürünler için otomatik hatırlatmalar ve yeniden sipariş akışı.",
    points: [
      "Geçmiş taleplerinize dayalı yeniden sipariş önerileri",
      "Stok seviyesi düşük ürünler için otomatik bildirim",
      "Tedarikçiyle tek tıkla tekrar teklif talebi",
    ],
  },
  {
    icon: LineChart,
    title: "Tedarik Analitiği",
    status: "Yakında",
    description: "Tedarikçi performansı, fiyat trendleri ve teslim süresi analizleri.",
    points: [
      "Tedarikçi bazında ortalama yanıt süresi ve kabul oranı",
      "Kategori bazında fiyat bandı trendleri",
      "Katalog genelinde sürdürülebilirlik puanı karşılaştırması",
    ],
  },
];

export default function CozumlerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Çözümler</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Sürdürülebilir Market, markaların ve tedarikçilerin tek platformda buluştuğu uçtan uca bir
        tedarik deneyimi sunmayı hedefler. Bugün pazar yeri ve uyumluluk modülleriyle başlıyoruz;
        yol haritamızdaki stok takibi ve tedarik analitiği modülleriyle büyüyeceğiz.
      </p>

      <div className="mt-10 space-y-6">
        {SOLUTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold">{s.title}</h2>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
              <Badge variant={s.status === "Yakında" ? "outline" : "secondary"}>{s.status}</Badge>
            </div>
            <ul className="mt-5 grid gap-2 pl-[3.75rem] sm:grid-cols-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/30 p-8 text-center">
        <h2 className="text-lg font-semibold">Hangi çözümün size uygun olduğundan emin değil misiniz?</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Pazar yerini keşfedin veya ihtiyacınızı bize doğrudan iletin.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/pazar-yeri" />}>
            Pazar Yerini Keşfet
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/iletisim" />}>
            Bize Ulaşın
          </Button>
        </div>
      </div>
    </div>
  );
}
