import { ShoppingBag, ClipboardCheck, RefreshCcw, LineChart } from "lucide-react";

export const metadata = { title: "Çözümler — Sürdürülebilir Market" };

const SOLUTIONS = [
  {
    icon: ShoppingBag,
    title: "Pazar Yeri",
    description:
      "Onlarca sürdürülebilir ambalaj tedarikçisini tek katalogdan gezin, filtreleyin ve karşılaştırın. Teklif ve numune taleplerinizi tek formla gönderin.",
  },
  {
    icon: ClipboardCheck,
    title: "Uyumluluk Raporlama",
    description:
      "Türkiye'nin ambalaj atığı mevzuatına genel bir bakış sunan, temsili örnek bir raporlama arayüzü ile başlangıç noktası oluşturun.",
  },
  {
    icon: RefreshCcw,
    title: "Stok & Yeniden Sipariş Takibi",
    description:
      "Düzenli sipariş verdiğiniz ürünler için otomatik hatırlatmalar — yol haritamızda yer alan yakında gelecek bir modül.",
  },
  {
    icon: LineChart,
    title: "Tedarik Analitiği",
    description:
      "Tedarikçi performansı, fiyat trendleri ve teslim süresi analizleri — yol haritamızda yer alan yakında gelecek bir modül.",
  },
];

export default function CozumlerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Çözümler</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Sürdürülebilir Market, markaların ve tedarikçilerin tek platformda buluştuğu uçtan uca
        bir tedarik deneyimi sunmayı hedefler.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SOLUTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <s.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
