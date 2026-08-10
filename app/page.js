import Hero from '@/components/home/Hero';
import TrustIndicators from '@/components/home/TrustIndicators';
import BoxFinder from '@/components/product/BoxFinder';
import CategorySection from '@/components/home/CategorySection';
import PopularBoxes from '@/components/home/PopularBoxes';
import ShopBySize from '@/components/product/ShopBySize';
import BulkPricing from '@/components/product/BulkPricing';
import WhyBoxKart from '@/components/home/WhyBoxKart';
import CustomPackaging from '@/components/custom-packaging/CustomPackaging';
import PackagingBundles from '@/components/product/PackagingBundles';
import HowItWorks from '@/components/home/HowItWorks';
import ReorderSection from '@/components/account/ReorderSection';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';

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
      <ShopBySize />
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
