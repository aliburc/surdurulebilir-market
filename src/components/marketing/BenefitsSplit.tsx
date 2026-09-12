import { Check } from "lucide-react";

const BUYER_BENEFITS = [
  "Onlarca tedarikçiyi tek ekrandan karşılaştırın",
  "Sertifika ve sürdürülebilirlik verisine hızlı erişim",
  "Tek formla teklif ve numune talebi",
];

const SUPPLIER_BENEFITS = [
  "Daha önce ulaşamadığınız markalara görünürlük",
  "Gelen talepleri tek panelden yönetin",
  "Ürün ve sertifika bilgilerinizi güncel tutun",
];

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BenefitsSplit() {
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <h2 className="sr-only">Alıcılar ve tedarikçiler için faydalar</h2>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">Alıcılar için</span>
          <h3 className="mt-2 text-xl font-semibold">Doğru tedarikçiyi hızla bulun</h3>
          <List items={BUYER_BENEFITS} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">Tedarikçiler için</span>
          <h3 className="mt-2 text-xl font-semibold">Yeni markalara ulaşın</h3>
          <List items={SUPPLIER_BENEFITS} />
        </div>
      </div>
    </section>
  );
}
