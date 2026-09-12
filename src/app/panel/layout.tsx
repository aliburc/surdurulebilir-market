import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { logoutAction } from "./actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/giris?next=/panel");
  }

  const roleLabel = session.role === "BUYER" ? "Alıcı Paneli" : "Tedarikçi Paneli";
  const baseHref = session.role === "BUYER" ? "/panel/alici" : "/panel/tedarikci";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">{roleLabel}</p>
          <p className="text-sm text-muted-foreground">{session.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href={baseHref} className="text-sm text-muted-foreground hover:text-foreground">
            Genel Bakış
          </Link>
          <Link
            href={`${baseHref}/${session.role === "BUYER" ? "talepler" : "urunler"}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {session.role === "BUYER" ? "Taleplerim" : "Ürünlerim"}
          </Link>
          {session.role === "SUPPLIER" && (
            <Link href="/panel/tedarikci/talepler" className="text-sm text-muted-foreground hover:text-foreground">
              Gelen Talepler
            </Link>
          )}
          <form action={logoutAction}>
            <Button variant="outline" size="sm" type="submit">
              Çıkış Yap
            </Button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
