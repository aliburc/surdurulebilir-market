"use server";

import { z } from "zod";

const FORM_TARGET_EMAIL = "aliburc1103@gmail.com";

const emailSchema = z.string().email();

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return { status: "error", message: "Geçerli bir e-posta girin." };
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORM_TARGET_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "Sürdürülebilir Market — Yeni Bülten Aboneliği",
        "E-posta": parsed.data,
      }),
    });
    if (!res.ok) return { status: "error", message: "Abonelik başarısız oldu." };
    return { status: "success", message: "Abone oldunuz, teşekkürler!" };
  } catch {
    return { status: "error", message: "Abonelik başarısız oldu." };
  }
}
