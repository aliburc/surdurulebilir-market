const STEPS = [
  {
    step: "1",
    title: "Katalogda arayın",
    description: "Malzeme, kategori veya sürdürülebilirlik etiketine göre filtreleyin.",
  },
  {
    step: "2",
    title: "Teklif veya numune isteyin",
    description: "İhtiyacınızı ve miktarınızı belirterek tek formla talep gönderin.",
  },
  {
    step: "3",
    title: "Tedarikçiyle görüşün",
    description: "Talebiniz tedarikçi paneline düşer, doğrudan yanıt alırsınız.",
  },
  {
    step: "4",
    title: "Anlaşın ve sipariş verin",
    description: "Fiyat ve koşullarda mutabık kalın, siparişinizi kendi süreçlerinizle ilerletin.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Nasıl çalışır?</h2>
          <p className="mt-3 text-muted-foreground">
            Dört adımda, gerçek ödeme veya sözleşme sürecine girmeden doğru tedarikçiyle eşleşin.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.step}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {s.step}
              </span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
