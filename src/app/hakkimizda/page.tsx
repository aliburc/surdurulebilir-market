import { AlertTriangle, Target, Users, Compass } from "lucide-react";

export const metadata = {
  title: "Hakkımızda — Sürdürülebilir Market",
  description:
    "Sürdürülebilir Market'in misyonu, çözmeye çalıştığı problem ve platformun mevcut aşaması hakkında bilgi edinin.",
};

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Hakkımızda</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sürdürülebilir Market, Türkiye&apos;deki markaları doğrulanmış sürdürülebilir ambalaj
        tedarikçileriyle buluşturmak amacıyla kurulmuş bir B2B pazar yeridir.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="mt-3 text-sm font-semibold">Misyonumuz</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sürdürülebilir ambalajaya geçişi Türkiye&apos;deki her ölçekten marka için erişilebilir
            hale getirmek.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <Compass className="h-5 w-5 text-primary" />
          <h2 className="mt-3 text-sm font-semibold">Nasıl Çalışıyoruz</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Tedarikçi verisini standartlaştırarak, alıcıların karar sürecini haftalardan günlere
            indiriyoruz.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="mt-3 text-sm font-semibold">Kimin İçin</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Gıda, kozmetik ve e-ticaret markalarından, sürdürülebilir üretim yapan ambalaj
            tedarikçilerine kadar geniş bir ekosistem.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Çözmeye çalıştığımız problem</h2>
          <p className="mt-2">
            Türkiye&apos;de sürdürülebilir ambalaj tedarikçisi bulmak, dağınık bir süreçtir:
            markalar genellikle sosyal medya, fuarlar veya kişisel tavsiyelerle tedarikçilere
            ulaşır; malzeme özelliklerini, sertifikaları ve fiyat bantlarını karşılaştırmak
            için onlarca e-posta ve telefon görüşmesi gerekir. Bu süreç haftalar sürebilir ve
            genellikle markanın zaten bildiği birkaç tedarikçiyle sınırlı kalır — pazardaki
            daha uygun veya daha yeni bir alternatifi kaçırma riski yüksektir.
          </p>
          <p className="mt-3">
            Aynı zamanda, Türkiye&apos;nin resmi geri kazanım oranı 2024&apos;te %36,08&apos;e
            ulaşmış olsa da (Sıfır Atık Projesi verileri), 2025&apos;te devreye giren Depozito
            Yönetim Sistemi gibi yeni düzenlemeler markalardan ambalaj seçimlerini daha bilinçli
            yapmalarını talep ediyor. Bu bilgiye erişim, çoğu marka için hâlâ dağınık ve
            teknik bir engel.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Yaklaşımımız</h2>
          <p className="mt-2">
            Tedarikçi verisini (malzeme, sertifika, fiyat bandı, geri dönüştürülebilirlik notu,
            tahmini karbon ayak izi) standart bir formatta topluyor ve alıcıların bu verileri tek
            ekrandan karşılaştırmasını sağlıyoruz. Platform, alıcı ile tedarikçi arasında bir
            eşleştirme ve tanıtım hizmeti sunar; nihai fiyatlandırma ve sözleşme şartları
            doğrudan taraflar arasında belirlenir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Şu anki aşamamız</h2>
          <div className="mt-2 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-muted-foreground">
              Platform şu anda erken aşamadadır; katalogdaki tedarikçi ve ürün verileri temsili
              örneklerden oluşmaktadır. Gerçek tedarikçi kaydı ve ürün ekleme akışları tam
              işlevseldir — /tedarikci-ol sayfasından firmanızı kaydedebilirsiniz.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">İletişim</h2>
          <p className="mt-2">
            Sorularınız, iş birliği teklifleriniz veya geri bildirimleriniz için{" "}
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
