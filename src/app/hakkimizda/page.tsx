export const metadata = { title: "Hakkımızda — Sürdürülebilir Market" };

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Hakkımızda</h1>
      <p className="mt-4 text-muted-foreground">
        Sürdürülebilir Market, Türkiye&apos;deki markaları doğrulanmış sürdürülebilir ambalaj
        tedarikçileriyle buluşturmak amacıyla kurulmuş bir B2B pazar yeridir. Amacımız, tedarikçi
        araştırması için harcanan haftaları güne indirmek ve sürdürülebilir ambalaja geçişi
        markalar için kolaylaştırmaktır.
      </p>
      <p className="mt-4 text-muted-foreground">
        Bu platform şu anda erken/demo aşamasındadır; katalogdaki tedarikçi ve ürün verileri
        temsili örneklerden oluşmaktadır.
      </p>
    </div>
  );
}
