import { Hero } from "@/components/marketing/Hero";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
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
} from "@/lib/queries";

export default async function Home() {
  const [metrics, testimonials, caseStudies, articles, faqs] = await Promise.all([
    getHomeMetrics(),
    getTestimonials(),
    getCaseStudies(),
    getKnowledgeArticles(),
    getFaqs(),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />
      <FeatureShowcase />
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
