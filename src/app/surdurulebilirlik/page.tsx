import { AlertTriangle } from "lucide-react";

export const metadata = { title: "Sürdürülebilirlik — Sürdürülebilir Market" };

const TOPICS = [
  {
    title: "Genişletilmiş Üretici Sorumluluğu (temsili genel bakış)",
    body: "Ambalaj piyasaya süren işletmelerin, ambalajların toplanması ve geri kazanılması sürecine katkı sağlaması ilkesine dayanan genel bir çerçeve.",
  },
  {
    title: "Geri Dönüştürülmüş İçerik Beyanları",
    body: "Tedarikçilerin ürünlerindeki geri dönüştürülmüş malzeme oranını beyan etmesi ve bunun bağımsız test raporlarıyla desteklenmesi önerilir.",
  },
  {
    title: "Kompostlanabilirlik ve Biyobozunurluk",
    body: "Bu etiketler yerel atık altyapısına bağlı olarak farklı sonuçlar doğurabilir; iddiaların test raporlarıyla doğrulanması önemlidir.",
  },
];

export default function SurdurulebilirlikPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sürdürülebilirlik & Uyumluluk</h1>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Bu sayfadaki içerik, Türkiye&apos;deki ambalaj atığı mevzuatına genel ve temsili bir
          bakış sunmak amacıyla hazırlanmıştır. Bağlayıcı hukuki danışmanlık yerine geçmez;
          güncel ve resmi mevzuat için ilgili kurumlara ve hukuk danışmanlarına başvurunuz.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {TOPICS.map((t) => (
          <div key={t.title}>
            <h2 className="font-semibold">{t.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
