import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Giriş Yap — Sürdürülebilir Market" };

export default async function GirisPage() {
  const session = await getSession();
  if (session) {
    redirect(session.role === "BUYER" ? "/panel/alici" : "/panel/tedarikci");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Giriş Yap</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Bu bir demo platformdur. Aşağıdaki hazır hesaplarla hızlıca giriş yapabilirsiniz.
      </p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Tedarikçi misiniz?{" "}
        <Link href="/tedarikci-ol" className="text-primary underline underline-offset-4">
          Firmanızı kaydedin
        </Link>
      </p>
    </div>
  );
}
