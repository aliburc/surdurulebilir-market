"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCatalogItem, type CreateItemState } from "../actions";

const initialState: CreateItemState = { status: "idle" };

export function NewItemForm({ categories }: { categories: readonly string[] }) {
  const [state, formAction, pending] = useActionState(createCatalogItem, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Ürün Adı</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="category">Kategori</Label>
          <Select name="category" defaultValue={categories[0]}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="material">Malzeme</Label>
          <Input id="material" name="material" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dimensions">Boyutlar</Label>
          <Input id="dimensions" name="dimensions" placeholder="ör. 30x20x15 cm" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="recycledContentPercent">Geri Dönüşüm İçeriği (%)</Label>
          <Input id="recycledContentPercent" name="recycledContentPercent" type="number" min={0} max={100} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="minOrderQuantity">Min. Sipariş Adedi</Label>
          <Input id="minOrderQuantity" name="minOrderQuantity" type="number" min={1} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="leadTimeDays">Teslim Süresi (gün)</Label>
          <Input id="leadTimeDays" name="leadTimeDays" type="number" min={1} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="unitPriceMinTRY">Min. Birim Fiyat (₺)</Label>
          <Input id="unitPriceMinTRY" name="unitPriceMinTRY" type="number" min={0} step="0.01" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="unitPriceMaxTRY">Maks. Birim Fiyat (₺)</Label>
          <Input id="unitPriceMaxTRY" name="unitPriceMaxTRY" type="number" min={0} step="0.01" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sustainabilityTags">Sürdürülebilirlik Etiketleri</Label>
        <Input
          id="sustainabilityTags"
          name="sustainabilityTags"
          placeholder="Geri Dönüştürülebilir,Kompostlanabilir"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Açıklama</Label>
        <Textarea id="description" name="description" rows={4} required minLength={10} />
      </div>

      {state.status === "error" && <p className="text-sm text-destructive">{state.message}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Kaydediliyor..." : "Ürünü Yayınla"}
      </Button>
    </form>
  );
}
