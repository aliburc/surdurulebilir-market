import { Mail, MapPin } from "lucide-react";

export const metadata = { title: "İletişim — Sürdürülebilir Market" };

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">İletişim</h1>
      <p className="mt-3 text-muted-foreground">
        Demo görüşmesi planlamak veya sorularınızı iletmek için bize ulaşın.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <Mail className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">E-posta</p>
            <p className="text-sm text-muted-foreground">merhaba@surdurulebilirmarket.com</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Konum</p>
            <p className="text-sm text-muted-foreground">İstanbul, Türkiye</p>
          </div>
        </div>
      </div>

      <p className="mt-8 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        Bu bir demo platformdur; iletişim formu gönderim işlevi bu sürümde aktif değildir.
        Katalog ve teklif akışını denemek için{" "}
        <a href="/giris" className="text-primary underline underline-offset-4">
          demo hesaplarıyla giriş yapabilirsiniz
        </a>
        .
      </p>
    </div>
  );
}
