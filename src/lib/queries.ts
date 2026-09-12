import { db } from "@/lib/db";

export async function getTestimonials() {
  return db.testimonial.findMany();
}

export async function getCaseStudies() {
  return db.caseStudy.findMany();
}

export async function getCaseStudyBySlug(slug: string) {
  return db.caseStudy.findUnique({ where: { slug } });
}

export async function getKnowledgeArticles() {
  return db.knowledgeArticle.findMany({ orderBy: { publishedAt: "desc" } });
}

export async function getKnowledgeArticleBySlug(slug: string) {
  return db.knowledgeArticle.findUnique({ where: { slug } });
}

export async function getFaqs() {
  return db.faqItem.findMany({ orderBy: { order: "asc" } });
}

export async function getSuppliersSummary() {
  return db.supplier.findMany({
    select: { id: true, companyName: true, logoInitials: true, logoColor: true, city: true },
  });
}

export async function getSupplierBySlug(slug: string) {
  return db.supplier.findUnique({
    where: { slug },
    include: {
      catalogItems: {
        where: { status: "active" },
        include: { certifications: { include: { certification: true } } },
        orderBy: { name: "asc" },
      },
      certifications: { include: { certification: true } },
    },
  });
}

export type CatalogFilters = {
  category?: string;
  q?: string;
};

export async function getCatalogItems(filters: CatalogFilters = {}) {
  return db.catalogItem.findMany({
    where: {
      status: "active",
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.q
        ? {
            OR: [
              { name: { contains: filters.q } },
              { description: { contains: filters.q } },
              { material: { contains: filters.q } },
            ],
          }
        : {}),
    },
    include: { supplier: true },
    orderBy: { name: "asc" },
  });
}

export async function getCatalogCategories() {
  const items = await db.catalogItem.findMany({ select: { category: true }, distinct: ["category"] });
  return items.map((i) => i.category);
}

export async function getCatalogItemBySlug(slug: string) {
  return db.catalogItem.findUnique({
    where: { slug },
    include: { supplier: true, certifications: { include: { certification: true } } },
  });
}

export async function getRelatedItems(supplierId: string, excludeItemId: string) {
  return db.catalogItem.findMany({
    where: { supplierId, status: "active", id: { not: excludeItemId } },
    include: { supplier: true },
    take: 3,
  });
}

export async function getCategoryOverview() {
  const items = await db.catalogItem.findMany({
    where: { status: "active" },
    select: { category: true, supplier: { select: { companyName: true, slug: true } } },
  });

  const map = new Map<string, { count: number; suppliers: Map<string, string> }>();
  for (const item of items) {
    const entry = map.get(item.category) ?? { count: 0, suppliers: new Map() };
    entry.count += 1;
    entry.suppliers.set(item.supplier.slug, item.supplier.companyName);
    map.set(item.category, entry);
  }

  return Array.from(map.entries()).map(([category, { count, suppliers }]) => ({
    category,
    itemCount: count,
    suppliers: Array.from(suppliers.entries())
      .slice(0, 3)
      .map(([slug, companyName]) => ({ slug, companyName })),
  }));
}

export async function getHomeMetrics() {
  const [supplierCount, itemCount, buyerCount] = await Promise.all([
    db.supplier.count(),
    db.catalogItem.count(),
    db.buyer.count(),
  ]);
  return { supplierCount, itemCount, buyerCount };
}
