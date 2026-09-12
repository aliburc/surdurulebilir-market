"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { submitQuoteRequest, type QuoteActionState } from "@/app/pazar-yeri/actions";

const initialState: QuoteActionState = { status: "idle" };

export function QuoteRequestModal({
  catalogItemId,
  itemName,
  type,
  trigger,
}: {
  catalogItemId: string;
  itemName: string;
  type: "QUOTE" | "SAMPLE";
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);

  useEffect(() => {
    if (state.status === "success") {
      const timer = setTimeout(() => setOpen(false), 1600);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "QUOTE" ? "Fiyat Teklifi İste" : "Numune Talep Et"}
          </DialogTitle>
          <DialogDescription>{itemName}</DialogDescription>
        </DialogHeader>

        {state.status === "unauthenticated" ? (
          <div className="space-y-3 py-2 text-sm">
            <p>Teklif/numune talebi gönderebilmek için alıcı hesabınızla giriş yapmalısınız.</p>
            <Button
              render={<Link href={`/giris?next=/pazar-yeri`} />}
              nativeButton={false}
              className="w-full"
            >
              Giriş Yap
            </Button>
          </div>
        ) : state.status === "success" ? (
          <p className="py-4 text-sm text-primary">{state.message}</p>
        ) : (
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="catalogItemId" value={catalogItemId} />
            <input type="hidden" name="type" value={type} />
            <div className="space-y-1.5">
              <Label htmlFor="quantity">Miktar</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={type === "QUOTE" ? 1000 : 5}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Mesaj (opsiyonel)</Label>
              <Textarea id="message" name="message" rows={3} placeholder="İhtiyacınızı kısaca açıklayın" />
            </div>
            {state.status === "error" && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Gönderiliyor..." : "Talebi Gönder"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
