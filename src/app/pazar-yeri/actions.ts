"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { quoteRequestSchema } from "@/lib/validations";

export type QuoteActionState = {
  status: "idle" | "success" | "error" | "unauthenticated";
  message?: string;
};

export async function submitQuoteRequest(
  _prev: QuoteActionState,
  formData: FormData
): Promise<QuoteActionState> {
  const session = await getSession();
  if (!session || session.role !== "BUYER") {
    return { status: "unauthenticated" };
  }

  const parsed = quoteRequestSchema.safeParse({
    catalogItemId: formData.get("catalogItemId"),
    type: formData.get("type"),
    quantity: formData.get("quantity"),
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { status: "error", message: "Lütfen formu kontrol edin." };
  }

  const buyer = await db.buyer.findUnique({ where: { userId: session.userId } });
  if (!buyer) {
    return { status: "error", message: "Alıcı profili bulunamadı." };
  }

  const item = await db.catalogItem.findUnique({ where: { id: parsed.data.catalogItemId } });
  if (!item) {
    return { status: "error", message: "Ürün bulunamadı." };
  }

  await db.quoteRequest.create({
    data: {
      buyerId: buyer.id,
      catalogItemId: parsed.data.catalogItemId,
      type: parsed.data.type,
      quantity: parsed.data.quantity,
      message: parsed.data.message,
    },
  });

  revalidatePath("/panel/alici/talepler");
  return { status: "success", message: "Talebiniz tedarikçiye iletildi." };
}
