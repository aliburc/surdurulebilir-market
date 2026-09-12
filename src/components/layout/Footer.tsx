import Link from "next/link";
import { Leaf } from "lucide-react";

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
    ],
  },
  {
    title: "Kategoriler",
    links: [
      { href: "/pazar-yeri?category=Karton%20Kutu", label: "Karton Kutu" },
      { href: "/pazar-yeri?category=Cam%20%C5%9Ei%C5%9Fe%20%2F%20Kavanoz", label: "Cam Ambalaj" },
      { href: "/pazar-yeri?category=Ka%C4%9F%C4%B1t%20Poşet", label: "Kağıt Poşet" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
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
