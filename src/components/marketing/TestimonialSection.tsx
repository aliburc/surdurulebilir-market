import { Quote } from "lucide-react";

type Testimonial = {
  id: string;
  authorName: string;
  authorTitle: string;
  companyName: string;
  quote: string;
};

export function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-3xl font-semibold tracking-tight">Kullanıcılarımız ne diyor?</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-6">
            <Quote className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-foreground">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-sm font-medium">{t.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {t.authorTitle}, {t.companyName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
