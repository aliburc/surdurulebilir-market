"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter, type NewsletterState } from "./newsletter-actions";

const initialState: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  if (state.status === "success") {
    return <p className="text-sm font-medium text-primary">{state.message}</p>;
  }

  return (
    <form action={formAction} className="flex w-full max-w-sm gap-2">
      <Input type="email" name="email" placeholder="E-posta adresiniz" required className="bg-background" />
      <Button type="submit" disabled={pending} className="shrink-0">
        {pending ? "..." : "Abone Ol"}
      </Button>
      {state.status === "error" && (
        <p className="absolute mt-10 text-xs text-destructive">{state.message}</p>
      )}
    </form>
  );
}
