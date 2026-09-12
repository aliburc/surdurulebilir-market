import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Beklemede",
  RESPONDED: "Yanıtlandı",
  ACCEPTED: "Kabul Edildi",
  DECLINED: "Reddedildi",
};

export default async function AliciTaleplerPage() {
  const session = await getSession();
  if (!session || session.role !== "BUYER") redirect("/giris");

  const buyer = await db.buyer.findUnique({
    where: { userId: session.userId },
    include: {
      requests: {
        include: { catalogItem: { include: { supplier: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!buyer) redirect("/giris");

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Taleplerim</h1>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border">
        {buyer.requests.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
            <div>
              <p className="font-medium">{r.catalogItem.name}</p>
              <p className="text-muted-foreground">
                {r.catalogItem.supplier.companyName} · {r.type === "QUOTE" ? "Fiyat teklifi" : "Numune"} · {r.quantity} adet
              </p>
              {r.message && <p className="mt-1 text-xs text-muted-foreground">&ldquo;{r.message}&rdquo;</p>}
            </div>
            <Badge variant={r.status === "ACCEPTED" ? "default" : "outline"}>
              {STATUS_LABEL[r.status]}
            </Badge>
          </div>
        ))}
        {buyer.requests.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">Henüz talep göndermediniz.</p>
        )}
      </div>
    </div>
  );
}
