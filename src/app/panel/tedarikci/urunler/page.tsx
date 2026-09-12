import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TedarikciUrunlerPage() {
  const session = await getSession();
  if (!session || session.role !== "SUPPLIER") redirect("/giris");

  const supplier = await db.supplier.findUnique({
    where: { userId: session.userId },
    include: { catalogItems: true },
  });
  if (!supplier) redirect("/giris");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Ürünlerim</h1>
        <Button size="sm" render={<Link href="/panel/tedarikci/urunler/yeni" />}>
          Yeni Ürün Ekle
        </Button>
      </div>
      {supplier.catalogItems.length === 0 ? (
        <p className="mt-6 rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
          Henüz katalogunuzda ürün yok.{" "}
          <Link href="/panel/tedarikci/urunler/yeni" className="text-primary underline underline-offset-4">
            İlk ürününüzü ekleyin
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Min. Sipariş</TableHead>
                <TableHead>Teslim Süresi</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplier.catalogItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.minOrderQuantity} adet</TableCell>
                  <TableCell>{item.leadTimeDays} gün</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.status === "active" ? "Aktif" : item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
