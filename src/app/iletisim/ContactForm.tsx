"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Ad Soyad</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="company">Firma (opsiyonel)</Label>
        <Input id="company" name="company" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Mesajınız</Label>
        <Textarea id="message" name="message" rows={4} required minLength={5} />
      </div>
      {state.status === "error" && <p className="text-sm text-destructive">{state.message}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "Gönderiliyor..." : "Mesajı Gönder"}
      </Button>
    </form>
  );
}
