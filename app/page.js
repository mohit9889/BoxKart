import { Suspense } from 'react';
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
import {
  fetchCategories,
  fetchPopularProducts,
  fetchBulkPricingProducts,
  fetchBundles,
} from '@/lib/api';
import { normalizeCategories, normalizeProducts } from '@/lib/normalizeProduct';

/**
 * BoxKart Homepage — assembles all 14 sections in order.
 * Server Component: fetches categories and popular products at render time
 * for SEO-friendly SSR. Client-interactive sections remain CSR.
 */
export default async function HomePage() {
  const [rawCategories, rawProducts, rawBulkProducts, bundles] =
    await Promise.all([
      fetchCategories(),
      fetchPopularProducts(),
      fetchBulkPricingProducts(),
      fetchBundles(),
    ]);

  const categories = normalizeCategories(rawCategories);
  const popularProducts = normalizeProducts(rawProducts);
  const bulkPricingProducts = normalizeProducts(rawBulkProducts);

  return (
    <>
      <Hero />
      <TrustIndicators />
      <Suspense fallback={<div>Loading Box Finder...</div>}>
        <BoxFinder />
      </Suspense>
      <CategorySection categories={categories} />
      <ShopBySize />
      <PopularBoxes products={popularProducts} />
      <BulkPricing products={bulkPricingProducts} />
      <WhyBoxKart />
      <CustomPackaging />
      <PackagingBundles bundles={bundles} />
      <HowItWorks />
      <ReorderSection />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
