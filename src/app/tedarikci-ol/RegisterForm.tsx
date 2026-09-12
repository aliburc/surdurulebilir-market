"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerSupplierAction, type RegisterState } from "./actions";

const initialState: RegisterState = { status: "idle" };

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerSupplierAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="companyName">Firma Adı</Label>
          <Input id="companyName" name="companyName" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Yetkili Adı</Label>
          <Input id="contactName" name="contactName" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">Şehir</Label>
          <Input id="city" name="city" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="region">Bölge</Label>
          <Input id="region" name="region" placeholder="ör. Marmara" required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Firma Açıklaması</Label>
        <Textarea id="description" name="description" rows={3} required minLength={10} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">E-posta</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Şifre</Label>
        <Input id="password" name="password" type="password" minLength={8} required />
      </div>

      {state.status === "error" && <p className="text-sm text-destructive">{state.message}</p>}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Kaydediliyor..." : "Kayıt Ol"}
      </Button>
    </form>
  );
}
