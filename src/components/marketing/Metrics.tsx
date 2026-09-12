type MetricsProps = {
  supplierCount: number;
  itemCount: number;
};

export function Metrics({ supplierCount, itemCount }: MetricsProps) {
  const stats = [
    { value: `${supplierCount}+`, label: "Doğrulanmış Tedarikçi" },
    { value: `${itemCount}+`, label: "Katalog Ürünü" },
    { value: "3 gün", label: "Hedeflenen Ortalama Teklif Süresi" },
    { value: "%30'a varan", label: "Hedeflenen Maliyet Avantajı" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 gap-8 rounded-2xl border border-border bg-card p-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-semibold text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
