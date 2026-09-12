"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { supplierRegisterSchema } from "@/lib/validations";

export type RegisterState = { status: "idle" | "error"; message?: string };

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

export async function registerSupplierAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = supplierRegisterSchema.safeParse({
    companyName: formData.get("companyName"),
    city: formData.get("city"),
    region: formData.get("region"),
    description: formData.get("description"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Formu kontrol edin." };
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { status: "error", message: "Bu e-posta adresiyle zaten bir hesap var." };
  }

  let slug = slugify(parsed.data.companyName);
  const slugTaken = await db.supplier.findUnique({ where: { slug } });
  if (slugTaken) {
    slug = `${slug}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  const user = await db.user.create({
    data: { email: parsed.data.email, passwordHash, role: "SUPPLIER" },
  });

  await db.supplier.create({
    data: {
      userId: user.id,
      companyName: parsed.data.companyName,
      slug,
      city: parsed.data.city,
      region: parsed.data.region,
      description: parsed.data.description,
      logoInitials: parsed.data.companyName.slice(0, 2).toUpperCase(),
      logoColor: "#2f6b3a",
      sustainabilityScore: 50,
      contactName: parsed.data.contactName,
      contactEmail: parsed.data.email,
    },
  });

  await createSession({ userId: user.id, role: "SUPPLIER", email: user.email });
  redirect("/panel/tedarikci");
}
