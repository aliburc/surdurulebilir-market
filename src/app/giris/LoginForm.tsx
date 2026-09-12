"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "./actions";

const DEMO_ACCOUNTS = [
  { label: "Demo Alıcı", email: "alici@surdurulebilirmarket.com" },
  { label: "Demo Tedarikçi", email: "tedarikci@surdurulebilirmarket.com" },
];

const initialState: LoginState = { status: "idle" };

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [email, setEmail] = useState("");

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-3">
        <p className="text-xs font-medium text-muted-foreground">Hızlı doldur:</p>
        <div className="flex gap-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.email}
              type="button"
              onClick={() => setEmail(a.email)}
              className="rounded-md border border-border bg-background px-3 py-2 text-xs hover:bg-muted"
            >
              {a.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Şifre: demo1234</p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <div className="space-y-1.5">
          <Label htmlFor="email">E-posta</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Şifre</Label>
          <Input id="password" name="password" type="password" required defaultValue="demo1234" />
        </div>
        {state.status === "error" && <p className="text-sm text-destructive">{state.message}</p>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
    </div>
  );
}
