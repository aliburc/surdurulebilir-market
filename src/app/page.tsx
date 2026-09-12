import { Hero } from "@/components/marketing/Hero";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { HomeNetworkGraph } from "@/components/marketing/HomeNetworkGraph";
import { TrustBar } from "@/components/marketing/TrustBar";
import { Metrics } from "@/components/marketing/Metrics";
import { TestimonialSection } from "@/components/marketing/TestimonialSection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ModuleCards } from "@/components/marketing/ModuleCards";
import { BenefitsSplit } from "@/components/marketing/BenefitsSplit";
import { ComplianceTeaser } from "@/components/marketing/ComplianceTeaser";
import { CaseStudySection } from "@/components/marketing/CaseStudySection";
import { KnowledgeHubPreview } from "@/components/marketing/KnowledgeHubPreview";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import {
  getHomeMetrics,
  getTestimonials,
  getCaseStudies,
  getKnowledgeArticles,
  getFaqs,
  getCategoryOverview,
} from "@/lib/queries";

export default async function Home() {
  const [metrics, testimonials, caseStudies, articles, faqs, categories] = await Promise.all([
    getHomeMetrics(),
    getTestimonials(),
    getCaseStudies(),
    getKnowledgeArticles(),
    getFaqs(),
    getCategoryOverview(),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />
      <FeatureShowcase />
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Kataloğu kategori bazında keşfedin</h2>
            <p className="mt-3 text-muted-foreground">
              Bir kategoriye tıklayın, o kategorideki ürün sayısını ve tedarikçileri görün.
            </p>
          </div>
          <div className="mt-10">
            <HomeNetworkGraph categories={categories} />
          </div>
        </div>
      </section>
      <Metrics supplierCount={metrics.supplierCount} itemCount={metrics.itemCount} />
      <HowItWorks />
      <ModuleCards />
      <BenefitsSplit />
      <ComplianceTeaser />
      <CaseStudySection caseStudies={caseStudies} />
      <TestimonialSection testimonials={testimonials} />
      <KnowledgeHubPreview articles={articles} />
      <FAQAccordion faqs={faqs} />
      <CTASection />
    </>
  );
}
