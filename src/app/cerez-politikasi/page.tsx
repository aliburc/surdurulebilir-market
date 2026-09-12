import { AlertTriangle } from "lucide-react";

export const metadata = { title: "Çerez Politikası — Sürdürülebilir Market" };

export default function CerezPolitikasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Çerez Politikası</h1>
      <p className="mt-2 text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Bu metin taslak niteliğindedir ve hukuk müşaviri incelemesini beklemektedir.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Çerez Nedir?</h2>
          <p className="mt-2">
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınızda saklanan küçük metin
            dosyalarıdır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Kullandığımız Çerez Türleri</h2>
          <p className="mt-2">
            <strong>Zorunlu çerezler:</strong> Oturum açma durumunuzu (giriş yaptığınız hesap)
            hatırlamak için kullanılır; devre dışı bırakılamaz, platformun temel işlevleri (giriş,
            panel erişimi) bunlara bağlıdır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Üçüncü Taraf Hizmetler</h2>
          <p className="mt-2">
            İletişim ve bülten formlarımız, mesajınızı e-posta olarak iletmek için üçüncü taraf bir
            form işleme hizmeti kullanır. Bu hizmet, form gönderiminiz sırasında IP adresiniz gibi
            teknik verileri işleyebilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Tercihlerinizi Yönetme</h2>
          <p className="mt-2">
            Çoğu tarayıcı, çerezleri tarayıcı ayarlarından engellemenize veya silmenize olanak
            tanır; ancak zorunlu çerezleri engellemeniz durumunda platformun bazı bölümleri
            (örneğin oturum açma) düzgün çalışmayabilir.
          </p>
        </section>
      </div>
    </div>
  );
}
