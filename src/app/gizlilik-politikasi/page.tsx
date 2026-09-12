import { AlertTriangle } from "lucide-react";

export const metadata = { title: "Gizlilik Politikası — Sürdürülebilir Market" };

export default function GizlilikPolitikasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Gizlilik Politikası</h1>
      <p className="mt-2 text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Bu metin taslak niteliğindedir ve hukuk müşaviri incelemesini beklemektedir. Yayına
          alınmadan önce 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında bir
          avukat tarafından gözden geçirilmelidir.
        </p>
      </div>

      <div className="prose-content mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Veri Sorumlusu</h2>
          <p className="mt-2">
            Sürdürülebilir Market ("Platform"), platform üzerinden topladığı kişisel verilerin
            veri sorumlusudur. Sorularınız için{" "}
            <a href="/iletisim" className="text-primary underline underline-offset-2">
              iletişim sayfamızdan
            </a>{" "}
            bize ulaşabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Toplanan Veriler</h2>
          <p className="mt-2">
            Hesap oluştururken (ad soyad, firma adı, e-posta, şehir), teklif/numune talebi
            gönderirken (miktar, mesaj içeriği) ve iletişim formunu kullandığınızda (ad, e-posta,
            mesaj) tarafımıza ilettiğiniz bilgileri işliyoruz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Verilerin Kullanım Amacı</h2>
          <p className="mt-2">
            Toplanan veriler; hesabınızı yönetmek, alıcı-tedarikçi eşleştirmesini sağlamak, teklif
            ve numune taleplerinizi ilgili tedarikçiye iletmek ve iletişim taleplerinize yanıt
            vermek amacıyla kullanılır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Verilerin Paylaşımı</h2>
          <p className="mt-2">
            Bir teklif/numune talebi gönderdiğinizde, talebe konu bilgiler ilgili tedarikçiyle
            paylaşılır. Verileriniz, yasal zorunluluklar dışında üçüncü taraflara satılmaz veya
            pazarlama amacıyla kiralanmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Haklarınız</h2>
          <p className="mt-2">
            KVKK madde 11 kapsamında; verilerinize erişme, düzeltilmesini isteme, silinmesini
            talep etme ve işlenmesine itiraz etme haklarına sahipsiniz. Bu talepleriniz için{" "}
            <a href="/iletisim" className="text-primary underline underline-offset-2">
              bize ulaşabilirsiniz
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Çerezler</h2>
          <p className="mt-2">
            Çerez kullanımımız hakkında detaylı bilgi için{" "}
            <a href="/cerez-politikasi" className="text-primary underline underline-offset-2">
              Çerez Politikamızı
            </a>{" "}
            inceleyebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
