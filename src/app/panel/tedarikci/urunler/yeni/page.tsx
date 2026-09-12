import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CATALOG_CATEGORIES } from "@/lib/validations";
import { NewItemForm } from "./NewItemForm";

export default async function YeniUrunPage() {
  const session = await getSession();
  if (!session || session.role !== "SUPPLIER") redirect("/giris");

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">Yeni Ürün Ekle</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Katalogunuza yeni bir ambalaj ürünü ekleyin.
      </p>
      <NewItemForm categories={CATALOG_CATEGORIES} />
    </div>
  );
}
