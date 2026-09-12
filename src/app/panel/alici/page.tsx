import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AliciPanelPage() {
  const session = await getSession();
  if (!session || session.role !== "BUYER") redirect("/giris");

  const buyer = await db.buyer.findUnique({
    where: { userId: session.userId },
    include: { requests: { include: { catalogItem: true } } },
  });
  if (!buyer) redirect("/giris");

  const counts = {
    total: buyer.requests.length,
    pending: buyer.requests.filter((r) => r.status === "PENDING").length,
    accepted: buyer.requests.filter((r) => r.status === "ACCEPTED").length,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Merhaba, {buyer.companyName}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{buyer.sector} · {buyer.city}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">{counts.total}</p>
          <p className="text-sm text-muted-foreground">Toplam talep</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">{counts.pending}</p>
          <p className="text-sm text-muted-foreground">Yanıt bekleyen</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">{counts.accepted}</p>
          <p className="text-sm text-muted-foreground">Kabul edilen</p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Son talepler</h2>
        <Link href="/panel/alici/talepler" className="text-sm text-primary">
          Tümünü gör
        </Link>
      </div>
      <div className="mt-4 divide-y divide-border rounded-xl border border-border">
        {buyer.requests.slice(0, 5).map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 text-sm">
            <div>
              <p className="font-medium">{r.catalogItem.name}</p>
              <p className="text-muted-foreground">
                {r.type === "QUOTE" ? "Fiyat teklifi" : "Numune"} · {r.quantity} adet
              </p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{r.status}</span>
          </div>
        ))}
        {buyer.requests.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">Henüz talep göndermediniz.</p>
        )}
      </div>
    </div>
  );
}
