import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

export const metadata = { title: "Tedarikçi Olarak Kayıt Ol — Sürdürülebilir Market" };

export default async function TedarikciOlPage() {
  const session = await getSession();
  if (session) {
    redirect(session.role === "BUYER" ? "/panel/alici" : "/panel/tedarikci");
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Tedarikçi Olarak Kayıt Ol</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Firmanızı ekleyin, katalog ürünlerinizi yayınlayın ve gelen teklif/numune taleplerini
        tek panelden yönetin.
      </p>
      <RegisterForm />
    </div>
  );
}
