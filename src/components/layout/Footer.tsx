import Link from "next/link";
import { Leaf } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "Ürün",
    links: [
      { href: "/pazar-yeri", label: "Pazar Yeri" },
      { href: "/cozumler", label: "Çözümler" },
      { href: "/surdurulebilirlik", label: "Sürdürülebilirlik Raporlama" },
    ],
  },
  {
    title: "Kaynaklar",
    links: [
      { href: "/bilgi-merkezi", label: "Bilgi Merkezi" },
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/iletisim", label: "İletişim" },
      { href: "/tedarikci-ol", label: "Tedarikçi Olarak Kayıt Ol" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
      { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
      { href: "/satici-kosullari", label: "Satıcı Koşulları" },
      { href: "/cerez-politikasi", label: "Çerez Politikası" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Ambalaj dünyasındaki gelişmeleri takip edin.</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Yeni kategoriler, mevzuat güncellemeleri ve rehberler için abone olun.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Leaf className="h-4 w-4" />
              </span>
              <span>Sürdürülebilir Market</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Türkiye&apos;deki markalar ve sürdürülebilir ambalaj tedarikçilerini tek platformda buluşturuyoruz.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Sürdürülebilir Market. Tüm hakları saklıdır.</p>
          <p>
            Bu bir demo platformdur. Tüm tedarikçi ve ürün verileri temsili örneklerdir. Kategori
            fotoğrafları{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Pexels
            </a>{" "}
            üzerinden ücretsiz lisansla temin edilmiştir.
          </p>
        </div>
      </div>
    </footer>
  );
}
