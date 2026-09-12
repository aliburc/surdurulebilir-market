const BRANDS = [
  "ModaVista",
  "Kutu&Co",
  "Bahçe Bazaar",
  "Nefes Kozmetik",
  "Liman Gıda",
  "Kentsel Market",
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Türkiye&apos;nin markaları katalogda tedarikçi arıyor
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BRANDS.map((b) => (
            <span key={b} className="text-lg font-semibold text-muted-foreground/60">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
