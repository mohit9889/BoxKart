'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '@/components/product/ProductCard';
import { EmptyState, Skeleton } from '@/components/ui';
import Icon from '@/components/common/Icon';

const PLY_OPTIONS = ['3-Ply', '5-Ply'];
const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Best Value', value: 'best-value' },
  { label: 'Lowest MOQ', value: 'moq-asc' },
  { label: 'Name', value: 'name' },
];

export default function ProductsPageClient({
  initialProducts,
  categories,
  searchParams,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams?.category || '';
  const searchQuery = searchParams?.search || '';
  const selectedPly = searchParams?.ply || '';
  const sortBy = searchParams?.sort || 'popular';

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'popular') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    params.delete('ply');
    params.delete('sort');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedPly ? 1 : 0);

  return (
    <div className="container-bk section-padding">
      <div className="mb-8">
        <h1 className="heading-1 mb-2">
          {selectedCategory
            ? categories.find((c) => c.slug === selectedCategory)?.name ||
              'All Products'
            : searchQuery
              ? `Search: "${searchQuery}"`
              : 'All Packaging Products'}
        </h1>
        <p className="text-body text-text-secondary">
          {`${initialProducts.length} product${initialProducts.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-overline mb-3">Category</h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => updateFilter('category', '')}
                  disabled={isPending}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory
                      ? 'bg-charcoal text-white font-medium'
                      : 'text-text-secondary hover:bg-warm-gray'
                  } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => updateFilter('category', cat.slug)}
                    disabled={isPending}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-charcoal text-white font-medium'
                        : 'text-text-secondary hover:bg-warm-gray'
                    } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-overline mb-3">Ply</h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => updateFilter('ply', '')}
                  disabled={isPending}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedPly
                      ? 'bg-charcoal text-white font-medium'
                      : 'text-text-secondary hover:bg-warm-gray'
                  } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
                >
                  All
                </button>
                {PLY_OPTIONS.map((ply) => (
                  <button
                    key={ply}
                    onClick={() => updateFilter('ply', ply)}
                    disabled={isPending}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPly === ply
                        ? 'bg-charcoal text-white font-medium'
                        : 'text-text-secondary hover:bg-warm-gray'
                    } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {ply}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                disabled={isPending}
                className="text-sm text-danger hover:underline disabled:opacity-50 disabled:cursor-wait"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Bar */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden btn-outline text-sm flex items-center gap-2"
            >
              <Icon name="SlidersHorizontal" size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                disabled={isPending}
                className="input-bk text-sm pr-8 py-2 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Icon
                name="ChevronDown"
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={`transition-opacity duration-200 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {initialProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {initialProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="Package"
                title="No products found"
                description="Try adjusting your filters or search."
                actions={[
                  { label: 'Clear Filters', onClick: clearFilters },
                  { label: 'Try Box Finder', href: '/#box-finder' },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[var(--z-overlay)]"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-[calc(var(--z-overlay)+1)] rounded-t-2xl max-h-[75vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-charcoal">Filters</h3>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="p-2 rounded-full hover:bg-warm-gray"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-charcoal mb-3">
                    Category
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        !selectedCategory
                          ? 'bg-charcoal text-white'
                          : 'bg-warm-gray text-text-secondary'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedCategory === cat.slug
                            ? 'bg-charcoal text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-charcoal mb-3">
                    Ply
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateFilter('ply', '')}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        !selectedPly
                          ? 'bg-charcoal text-white'
                          : 'bg-warm-gray text-text-secondary'
                      }`}
                    >
                      All
                    </button>
                    {PLY_OPTIONS.map((ply) => (
                      <button
                        key={ply}
                        onClick={() => updateFilter('ply', ply)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedPly === ply
                            ? 'bg-charcoal text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {ply}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      clearFilters();
                      setFiltersOpen(false);
                    }}
                    className="btn-outline flex-1"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="btn-accent flex-1"
                  >
                    Apply ({initialProducts.length})
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
