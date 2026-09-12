import { AlertTriangle } from "lucide-react";

export const metadata = { title: "Satıcı Koşulları — Sürdürülebilir Market" };

export default function SaticiKosullariPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Satıcı (Tedarikçi) Koşulları</h1>
      <p className="mt-2 text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Bu metin taslak niteliğindedir ve hukuk müşaviri incelemesini beklemektedir.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Katalog Bilgilerinin Doğruluğu</h2>
          <p className="mt-2">
            Tedarikçi olarak eklediğiniz her ürün için malzeme, sertifika, fiyat bandı, minimum
            sipariş miktarı ve teslim süresi bilgilerinin doğru ve güncel olmasından siz
            sorumlusunuz. Yanıltıcı veya doğrulanamayan sürdürülebilirlik iddiaları (örn. sahip
            olunmayan bir sertifikanın belirtilmesi) katalogdan kaldırılma sebebidir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Talep Yanıtlama</h2>
          <p className="mt-2">
            Gelen teklif ve numune taleplerine makul bir sürede yanıt vermeniz beklenir. Platform,
            yanıt sürelerini takip edebilir ve düzenli olarak yanıtsız kalan hesapları
            değerlendirebilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Sözleşme İlişkisi</h2>
          <p className="mt-2">
            Platform, alıcı ile tedarikçi arasında bir tanıtım/eşleştirme hizmeti sunar; nihai
            satış sözleşmesi, fiyatlandırma, ödeme ve teslimat şartları doğrudan taraflar arasında
            belirlenir ve yürütülür. Sürdürülebilir Market bu işlemlerin tarafı değildir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Hesabın Askıya Alınması</h2>
          <p className="mt-2">
            Yanıltıcı bilgi paylaşımı, tekrarlanan şikayetler veya bu koşulların ihlali durumunda
            tedarikçi hesabı askıya alınabilir veya kapatılabilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. İletişim</h2>
          <p className="mt-2">
            Sorularınız için{" "}
            <a href="/iletisim" className="text-primary underline underline-offset-2">
              iletişim sayfamızdan
            </a>{" "}
            bize ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
