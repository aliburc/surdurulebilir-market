import { notFound } from "next/navigation";
import { getSupplierBySlug } from "@/lib/queries";
import { SupplyNetworkGraph } from "@/components/supplier/SupplyNetworkGraph";

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) notFound();

  const items = supplier.catalogItems.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    category: item.category,
    material: item.material,
    minOrderQuantity: item.minOrderQuantity,
    leadTimeDays: item.leadTimeDays,
    unitPriceMinTRY: item.unitPriceMinTRY,
    unitPriceMaxTRY: item.unitPriceMaxTRY,
    certificationIds: item.certifications.map((c) => c.certificationId),
  }));

  const certMap = new Map<
    string,
    { id: string; name: string; issuingBody: string; description: string }
  >();
  for (const item of supplier.catalogItems) {
    for (const c of item.certifications) {
      certMap.set(c.certification.id, {
        id: c.certification.id,
        name: c.certification.name,
        issuingBody: c.certification.issuingBody,
        description: c.certification.description,
      });
    }
  }
  for (const c of supplier.certifications) {
    certMap.set(c.certification.id, {
      id: c.certification.id,
      name: c.certification.name,
      issuingBody: c.certification.issuingBody,
      description: c.certification.description,
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="max-w-2xl">
        <span className="text-xs font-medium tracking-wide text-primary uppercase">Tedarikçi Profili</span>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{supplier.companyName}</h1>
        <p className="mt-2 text-muted-foreground">
          {supplier.city}, {supplier.region} · Sürdürülebilirlik puanı {supplier.sustainabilityScore}/100
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Tedarik Ağı</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ürünleri ve sertifikaları keşfetmek için ağdaki bir düğüme tıklayın.
        </p>
        <div className="mt-6">
          <SupplyNetworkGraph
            supplier={{
              id: supplier.id,
              companyName: supplier.companyName,
              city: supplier.city,
              region: supplier.region,
              description: supplier.description,
              sustainabilityScore: supplier.sustainabilityScore,
              contactName: supplier.contactName,
              contactEmail: supplier.contactEmail,
            }}
            items={items}
            certs={Array.from(certMap.values())}
          />
        </div>
      </div>
    </div>
  );
}
