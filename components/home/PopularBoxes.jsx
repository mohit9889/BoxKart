'use client';

import { motion } from 'motion/react';
import ProductCard from '@/components/product/ProductCard';
import { getPopularProducts } from '@/data/products';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

/**
 * Popular products grid section on the homepage.
 */
export default function PopularBoxes() {
  const products = getPopularProducts();

  return (
    <section className="section-padding bg-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
              Popular with growing sellers
            </h2>
            <p className="text-text-secondary text-lg">
              Our best-selling packaging, trusted by thousands.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-kraft hover:text-kraft-light transition-colors whitespace-nowrap"
          >
            View All Products
            <Icon name="ArrowRight" size={16} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
