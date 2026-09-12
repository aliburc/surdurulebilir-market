import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance">
          Sürdürülebilir tedarik zincirinizi bugün kurun
        </h2>
        <p className="max-w-md text-primary-foreground/80">
          Katalogda gezinmeye başlayın veya ekibimizle demo görüşmesi planlayın.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/pazar-yeri" />}
          >
            Pazar Yerini Keşfet
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link href="/iletisim" />}
          >
            Demo Talep Et
          </Button>
        </div>
      </div>
    </section>
  );
}
