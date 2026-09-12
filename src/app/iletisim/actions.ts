"use server";

import { z } from "zod";

const FORM_TARGET_EMAIL = "aliburc1103@gmail.com";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(120).optional(),
  message: z.string().min(5).max(2000),
});

export type ContactState = { status: "idle" | "success" | "error"; message?: string };

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Lütfen formu kontrol edin." };
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORM_TARGET_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "Sürdürülebilir Market — Yeni İletişim Formu Mesajı",
        Ad: parsed.data.name,
        "E-posta": parsed.data.email,
        Firma: parsed.data.company ?? "-",
        Mesaj: parsed.data.message,
      }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message: "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.",
      };
    }

    return { status: "success", message: "Mesajınız iletildi, en kısa sürede dönüş yapacağız." };
  } catch {
    return {
      status: "error",
      message: "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.",
    };
  }
}
