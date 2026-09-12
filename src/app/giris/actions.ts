"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { status: "error", message: "E-posta ve şifre gereklidir." };
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) {
    return { status: "error", message: "Bu bilgilerle bir hesap bulunamadı." };
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { status: "error", message: "Şifre hatalı." };
  }

  await createSession({ userId: user.id, role: user.role, email: user.email });

  const nextPath = formData.get("next")?.toString();
  redirect(nextPath && nextPath.startsWith("/") ? nextPath : user.role === "BUYER" ? "/panel/alici" : "/panel/tedarikci");
}
