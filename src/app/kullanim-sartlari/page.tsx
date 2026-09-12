import { AlertTriangle } from "lucide-react";

export const metadata = { title: "Kullanım Şartları — Sürdürülebilir Market" };

export default function KullanimSartlariPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Kullanım Şartları</h1>
      <p className="mt-2 text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Bu metin taslak niteliğindedir ve hukuk müşaviri incelemesini beklemektedir. Bağlayıcı
          bir sözleşme olarak kullanılmadan önce bir avukat tarafından gözden geçirilmelidir.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Platformun Tanımı</h2>
          <p className="mt-2">
            Sürdürülebilir Market, alıcıları ve sürdürülebilir ambalaj tedarikçilerini bir araya
            getiren bir B2B pazar yeridir. Platform, alıcı ile tedarikçi arasında bir teklif/numune
            talebi eşleştirmesi sağlar; taraflar arasındaki nihai sözleşme, fiyatlandırma ve teslimat
            koşulları doğrudan alıcı ve tedarikçi arasında belirlenir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Hesap Sorumluluğu</h2>
          <p className="mt-2">
            Hesabınızla ilgili tüm etkinliklerden siz sorumlusunuz. Hesap bilgilerinizin
            gizliliğini korumakla ve yetkisiz erişim durumunda bizi bilgilendirmekle yükümlüsünüz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Platformun Sorumluluğu Dışında Kalanlar</h2>
          <p className="mt-2">
            Sürdürülebilir Market, katalogdaki ürün bilgilerinin ve tedarikçi beyanlarının
            (malzeme, sertifika, fiyat vb.) doğruluğunu garanti etmez; bu bilgiler ilgili
            tedarikçi tarafından sağlanır. Platform, alıcı ile tedarikçi arasındaki nihai
            sözleşmenin tarafı değildir ve bu sözleşmeden doğan uyuşmazlıklardan sorumlu tutulamaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Kabul Edilemez Kullanım</h2>
          <p className="mt-2">
            Platformu yanıltıcı bilgi paylaşmak, yasa dışı ürün/hizmet tanıtımı yapmak veya başka
            kullanıcıları rahatsız edecek şekilde kullanamazsınız.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Değişiklikler</h2>
          <p className="mt-2">
            Bu şartları zaman zaman güncelleyebiliriz; önemli değişikliklerde kayıtlı
            kullanıcılarımızı bilgilendirmeye çalışırız.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. İletişim</h2>
          <p className="mt-2">
            Bu şartlarla ilgili sorularınız için{" "}
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
