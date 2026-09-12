import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { updateRequestStatus } from "@/app/panel/actions";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Beklemede",
  RESPONDED: "Yanıtlandı",
  ACCEPTED: "Kabul Edildi",
  DECLINED: "Reddedildi",
};

const NEXT_STATUSES: Record<string, string[]> = {
  PENDING: ["RESPONDED", "ACCEPTED", "DECLINED"],
  RESPONDED: ["ACCEPTED", "DECLINED"],
  ACCEPTED: [],
  DECLINED: [],
};

export default async function TedarikciTaleplerPage() {
  const session = await getSession();
  if (!session || session.role !== "SUPPLIER") redirect("/giris");

  const supplier = await db.supplier.findUnique({ where: { userId: session.userId } });
  if (!supplier) redirect("/giris");

  const requests = await db.quoteRequest.findMany({
    where: { catalogItem: { supplierId: supplier.id } },
    include: { catalogItem: true, buyer: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Gelen Talepler</h1>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border">
        {requests.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
            <div>
              <p className="font-medium">{r.catalogItem.name}</p>
              <p className="text-muted-foreground">
                {r.buyer.companyName} · {r.type === "QUOTE" ? "Fiyat teklifi" : "Numune"} · {r.quantity} adet
              </p>
              {r.message && <p className="mt-1 text-xs text-muted-foreground">&ldquo;{r.message}&rdquo;</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{STATUS_LABEL[r.status]}</span>
              {NEXT_STATUSES[r.status]?.map((next) => (
                <form key={next} action={updateRequestStatus}>
                  <input type="hidden" name="requestId" value={r.id} />
                  <input type="hidden" name="status" value={next} />
                  <button
                    type="submit"
                    className="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    {STATUS_LABEL[next]} olarak işaretle
                  </button>
                </form>
              ))}
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">Henüz gelen talep yok.</p>
        )}
      </div>
    </div>
  );
}
