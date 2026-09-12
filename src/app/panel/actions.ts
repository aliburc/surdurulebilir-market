"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { destroySession, getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { requestStatusUpdateSchema } from "@/lib/validations";

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function updateRequestStatus(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "SUPPLIER") return;

  const parsed = requestStatusUpdateSchema.safeParse({
    requestId: formData.get("requestId"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;

  const supplier = await db.supplier.findUnique({ where: { userId: session.userId } });
  if (!supplier) return;

  const request = await db.quoteRequest.findUnique({
    where: { id: parsed.data.requestId },
    include: { catalogItem: true },
  });
  if (!request || request.catalogItem.supplierId !== supplier.id) return;

  await db.quoteRequest.update({
    where: { id: parsed.data.requestId },
    data: { status: parsed.data.status },
  });

  revalidatePath("/panel/tedarikci/talepler");
}
