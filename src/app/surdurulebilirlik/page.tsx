import { AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Sürdürülebilirlik & Uyumluluk — Sürdürülebilir Market",
  description:
    "Türkiye'de ambalaj atığı mevzuatı, genişletilmiş üretici sorumluluğu, Depozito Yönetim Sistemi, AB PPWR düzenlemesi ve sertifikasyon standartları hakkında kapsamlı rehber.",
};

const SECTIONS = [
  {
    id: "epr",
    title: "Genişletilmiş Üretici Sorumluluğu (GÜS/EPR)",
    body: `Genişletilmiş Üretici Sorumluluğu, ambalajı piyasaya süren markaların, o ambalajın toplanması ve geri kazanılması sürecine mali ve/veya operasyonel olarak katkı sağlaması ilkesine dayanır. Türkiye'de bu çerçeve, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı'nın Ambalaj Atıklarının Kontrolü Yönetmeliği kapsamında yürütülür; markalar piyasaya sürdükleri ambalaj miktarını beyan eder ve yetkilendirilmiş kuruluşlar (örn. ÇEVKO benzeri yapılar) aracılığıyla geri kazanım hedeflerine katkı sağlar.

Sıfır Atık Projesi kapsamında açıklanan verilere göre, Türkiye'de belediye atığı geri kazanım oranı 2017'de %13 iken 2024'te %36,08'e yükseldi; resmi 2035 hedefi %60 olarak belirlenmiştir. Bu rakamlar "geri kazanım" (toplama ve sisteme dahil etme) oranını yansıtır — malzemenin fiilen yeniden ürüne dönüştürülme oranı olan "geri dönüşüm" oranı ayrı bir metriktir ve genellikle daha düşüktür.`,
  },
  {
    id: "dys",
    title: "Depozito Yönetim Sistemi (DYS)",
    body: `2025'te Türkiye genelinde devreye giren Depozito Yönetim Sistemi, 0,1-3 litre aralığındaki cam, plastik ve alüminyum içecek ambalajlarını kapsar ve yılda yaklaşık 25 milyar ambalajın geri kazanımını hedefler. Ürününüz bu kategoriye giriyorsa (örneğin şişelenmiş içecek satıyorsanız), ambalajınızın DYS'ye uygun tasarlanmış olması — doğru barkod yapısı, sistemin kabul ettiği malzeme türü — artık bir tercih değil, operasyonel bir gerekliliktir. Tedarikçi seçerken bu uyumluluğu doğrudan sormanızı öneririz.`,
  },
  {
    id: "ppwr",
    title: "AB PPWR ile Karşılaştırma",
    body: `Avrupa Birliği'nin Ambalaj ve Ambalaj Atığı Tüzüğü (PPWR), üye ülkelerde faaliyet gösteren markalardan artık yalnızca "geri dönüştürülebilir mi" beyanını değil; ambalajın ağırlığı, hacmi, malzeme kaynağı ve geri dönüştürülmüş içerik oranı gibi birden fazla veri noktasının raporlanmasını talep ediyor. Türkiye'nin GÜS çerçevesi henüz PPWR'nin tüm veri noktalarını zorunlu kılmasa da, AB pazarına satış yapan veya yapmayı planlayan markaların bu veri noktalarını şimdiden takip etmesi önerilir. Platformumuzdaki her ürün kaydında malzeme, ağırlık, geri dönüşüm içeriği, geri dönüştürülebilirlik notu ve tahmini karbon ayak izi alanlarını bu nedenle standart olarak tutuyoruz.`,
  },
  {
    id: "geri-donusturulmus-icerik",
    title: "Geri Dönüştürülmüş İçerik Beyanları Nasıl Doğrulanır?",
    body: `Bir tedarikçinin "%90 geri dönüştürülmüş içerik" beyanı tek başına bir garanti değildir. Alıcı olarak sorabileceğiniz sorular: Bu oran hangi test standardına göre ölçüldü? Bağımsız bir laboratuvar raporu mevcut mu, yoksa öz beyan mı? İçerik oranı kütle bazında mı yoksa hacim bazında mı hesaplandı? Platformumuz üzerinden bir tedarikçiyle eşleştiğinizde, ilgili test raporu ve dokümantasyonu doğrudan talep edebilirsiniz.`,
  },
  {
    id: "kompostlanabilirlik",
    title: "Kompostlanabilirlik ve Biyobozunurluk Standartları",
    body: `EN 13432 (Türkiye'de TS EN 13432), bir ambalajın endüstriyel kompost tesisinde gerçekten kompostlanabildiğini kanıtlamak için kullanılan Avrupa standardıdır. Bu standarda göre sertifikalanan bir malzeme, ~58°C'lik endüstriyel kompost ortamında 12 hafta içinde fiziksel olarak parçalanmalı ve 6 ay içinde en az %90'ı biyolojik olarak CO₂'ye dönüşmelidir. Önemli bir nokta: bu standart endüstriyel kompostlama için geçerlidir — "kompostlanabilir" yazan bir ambalajın ev bahçesindeki kompostta aynı hızda bozunacağının garantisi yoktur; ev tipi kompostlama için henüz ortak bir uluslararası standart bulunmamaktadır.`,
  },
  {
    id: "sertifikasyon",
    title: "Sertifikasyon: Öz Beyan ile Bağımsız Doğrulama Farkı",
    body: `Bir ambalajda gördüğünüz her çevre iddiası aynı güvenilirlik seviyesinde değildir. Öz beyan (self-declared claim), üreticinin kendi ifadesidir — ambalaj üzerinde "çevre dostu" yazması bağımsız bir denetimden geçtiği anlamına gelmez. Üçüncü taraf sertifikalı bir iddia (FSC, EN 13432 gibi) ise akredite bağımsız bir kuruluş tarafından düzenli denetimlerle doğrulanır. Kağıt/karton bazlı ürünlerde FSC etiketi görürseniz, tedarik zincirindeki her kuruluşun (matbaa, kutu üreticisi, dağıtıcı) ayrıca FSC CoC (Gözetim Zinciri) sertifikasına sahip olması gerektiğini unutmayın — sertifika tek bir noktada değil, zincirin tamamında izlenebilir olmalıdır.`,
  },
  {
    id: "metodoloji",
    title: "Platformumuzun Karbon ve Geri Dönüştürülebilirlik Verisi Metodolojisi",
    body: `Katalogdaki her üründe gördüğünüz "tahmini karbon ayak izi" (g CO₂e/adet) ve "geri dönüştürülebilirlik notu" alanları, ürünün malzeme türü, birim ağırlığı ve geri dönüştürülmüş içerik oranına dayalı basitleştirilmiş bir tahmindir; ISO 14040 uyumlu bağımsız bir yaşam döngüsü değerlendirmesinin (LCA) yerine geçmez. Bu değerler, alıcıların ürünleri hızlıca kıyaslayabilmesi için bir başlangıç noktası sunar. Bağlayıcı bir karar öncesinde, ilgili tedarikçiden ürüne özel, bağımsız doğrulanmış bir LCA raporu talep etmenizi öneririz.`,
  },
];

export default function SurdurulebilirlikPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sürdürülebilirlik &amp; Uyumluluk</h1>
      <p className="mt-3 text-muted-foreground">
        Türkiye&apos;de ambalaj atığı mevzuatı, uluslararası sertifikasyon standartları ve
        platformumuzun sürdürülebilirlik verisi metodolojisi hakkında kapsamlı bir rehber.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Bu sayfadaki içerik genel bilgilendirme amaçlıdır ve bağlayıcı hukuki danışmanlık
          yerine geçmez; güncel ve resmi mevzuat için ilgili kurumlara ve hukuk danışmanlarına
          başvurunuz.
        </p>
      </div>

      <nav className="mt-8 rounded-xl border border-border bg-card p-4 text-sm">
        <p className="font-medium text-foreground">Bu sayfada</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted-foreground hover:text-primary hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
            <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-foreground/90">
              {s.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-xl border border-border bg-card p-5 text-sm">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Sertifikasyon standartlarını ve tedarikçi değerlendirme sorularını daha detaylı okumak
          için{" "}
          <Link href="/bilgi-merkezi/ambalaj-sertifikalarini-okuma-rehberi" className="text-primary underline underline-offset-2">
            Ambalaj Sertifikalarını Okuma Rehberi
          </Link>{" "}
          ve{" "}
          <Link href="/bilgi-merkezi/geri-donusumun-gercek-orani-nedir" className="text-primary underline underline-offset-2">
            Geri Dönüşümün Gerçek Oranı Nedir?
          </Link>{" "}
          makalelerimize göz atabilirsiniz.
        </p>
      </div>
    </div>
  );
}
