import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function TedarikciPanelPage() {
  const session = await getSession();
  if (!session || session.role !== "SUPPLIER") redirect("/giris");

  const supplier = await db.supplier.findUnique({
    where: { userId: session.userId },
    include: { catalogItems: { include: { requests: true } } },
  });
  if (!supplier) redirect("/giris");

  const allRequests = supplier.catalogItems.flatMap((i) => i.requests);
  const pendingCount = allRequests.filter((r) => r.status === "PENDING").length;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Merhaba, {supplier.companyName}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {supplier.city} · Sürdürülebilirlik puanı {supplier.sustainabilityScore}/100
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">{supplier.catalogItems.length}</p>
          <p className="text-sm text-muted-foreground">Katalog ürünü</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">{allRequests.length}</p>
          <p className="text-sm text-muted-foreground">Toplam gelen talep</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-2xl font-semibold">{pendingCount}</p>
          <p className="text-sm text-muted-foreground">Yanıt bekleyen</p>
        </div>
      </div>
    </div>
  );
}
