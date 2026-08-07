import Hero from '@/components/Hero';
import TrustIndicators from '@/components/TrustIndicators';
import BoxFinder from '@/components/BoxFinder';
import CategorySection from '@/components/CategorySection';
import PopularBoxes from '@/components/PopularBoxes';
import BulkPricing from '@/components/BulkPricing';
import WhyBoxKart from '@/components/WhyBoxKart';
import CustomPackaging from '@/components/CustomPackaging';
import PackagingBundles from '@/components/PackagingBundles';
import HowItWorks from '@/components/HowItWorks';
import ReorderSection from '@/components/ReorderSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

/**
 * BoxKart Homepage — assembles all 14 sections in order.
 * (Announcement bar + Header + Footer are in the layout.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <BoxFinder />
      <CategorySection />
      <PopularBoxes />
      <BulkPricing />
      <WhyBoxKart />
      <CustomPackaging />
      <PackagingBundles />
      <HowItWorks />
      <ReorderSection />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
