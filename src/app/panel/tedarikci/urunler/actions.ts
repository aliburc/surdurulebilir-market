"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { catalogItemCreateSchema } from "@/lib/validations";

export type CreateItemState = { status: "idle" | "error"; message?: string };

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCatalogItem(
  _prev: CreateItemState,
  formData: FormData
): Promise<CreateItemState> {
  const session = await getSession();
  if (!session || session.role !== "SUPPLIER") {
    return { status: "error", message: "Bu işlem için tedarikçi girişi gerekir." };
  }

  const parsed = catalogItemCreateSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    material: formData.get("material"),
    dimensions: formData.get("dimensions"),
    minOrderQuantity: formData.get("minOrderQuantity"),
    leadTimeDays: formData.get("leadTimeDays"),
    unitPriceMinTRY: formData.get("unitPriceMinTRY") || undefined,
    unitPriceMaxTRY: formData.get("unitPriceMaxTRY") || undefined,
    recycledContentPercent: formData.get("recycledContentPercent") || undefined,
    sustainabilityTags: formData.get("sustainabilityTags"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  const supplier = await db.supplier.findUnique({ where: { userId: session.userId } });
  if (!supplier) {
    return { status: "error", message: "Tedarikçi profili bulunamadı." };
  }

  const baseSlug = slugify(`${supplier.slug}-${parsed.data.name}`);
  let slug = baseSlug;
  const existing = await db.catalogItem.findUnique({ where: { slug } });
  if (existing) {
    slug = `${baseSlug}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }
  const sku = `SM-${slug.slice(0, 6).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const item = await db.catalogItem.create({
    data: {
      supplierId: supplier.id,
      name: parsed.data.name,
      sku,
      slug,
      category: parsed.data.category,
      material: parsed.data.material,
      dimensions: parsed.data.dimensions,
      minOrderQuantity: parsed.data.minOrderQuantity,
      leadTimeDays: parsed.data.leadTimeDays,
      unitPriceMinTRY: parsed.data.unitPriceMinTRY,
      unitPriceMaxTRY: parsed.data.unitPriceMaxTRY,
      recycledContentPercent: parsed.data.recycledContentPercent,
      sustainabilityTags: parsed.data.sustainabilityTags,
      description: parsed.data.description,
      imageColor: "#2f6b3a",
    },
  });

  revalidatePath("/panel/tedarikci/urunler");
  revalidatePath("/pazar-yeri");
  redirect(`/pazar-yeri/${item.slug}`);
}
