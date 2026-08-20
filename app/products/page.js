import { Suspense } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';
import { normalizeCategories, normalizeProducts } from '@/lib/normalizeProduct';
import ProductsPageClient from '@/components/product/ProductsPageClient';
import { Skeleton } from '@/components/ui';

export const metadata = {
  title: 'Products | BoxKart',
  description:
    'Browse our complete catalog of corrugated boxes and packaging supplies.',
};

export default async function ProductsPage({ searchParams }) {
  // Await searchParams as required by Next.js 15+ (if applicable, harmless in Next.js 14)
  const sp = await searchParams;

  const selectedCategory = sp?.category || '';
  const searchQuery = sp?.search || '';
  const sizeFilter = sp?.size || '';
  const selectedPly = sp?.ply || '';
  const sortBy = sp?.sort || 'popular';

  const params = {};
  if (selectedCategory) params.category = selectedCategory;
  if (selectedPly) {
    const match = selectedPly.match(/\d+/);
    if (match) params.ply = parseInt(match[0], 10);
  }
  if (searchQuery) params.q = searchQuery;
  if (sizeFilter) params.size = sizeFilter;
  if (sortBy) params.sort = sortBy;
  params.limit = 50;

  const [rawCategories, rawProductsRes] = await Promise.all([
    fetchCategories(),
    fetchProducts(params),
  ]);

  const categories = normalizeCategories(rawCategories || []);
  const products = normalizeProducts(
    rawProductsRes && rawProductsRes.data ? rawProductsRes.data : []
  );

  return (
    <Suspense
      fallback={
        <div className="container-bk section-padding">
          <Skeleton
            variant="text"
            width="200px"
            height="36px"
            className="mb-2"
          />
          <Skeleton
            variant="text"
            width="120px"
            height="20px"
            className="mb-8"
          />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="card" height="320px" />
            ))}
          </div>
        </div>
      }
    >
      <ProductsPageClient
        initialProducts={products}
        categories={categories}
        searchParams={sp}
      />
    </Suspense>
  );
}
