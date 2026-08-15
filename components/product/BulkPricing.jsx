'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

/**
 * "Order more, pay less" section — powered by live pricing data from the BE.
 * Shows a product switcher so users can explore bulk discounts across products.
 *
 * @param {{ products: Array }} props - Normalized corrugated box products with pricingTiers
 */
export default function BulkPricing({ products = [] }) {
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [selectedTierIdx, setSelectedTierIdx] = useState(2);

  // If no live data yet, show nothing (SSR will always provide data)
  if (products.length === 0) return null;

  // Clamp to valid product
  const productIdx = Math.min(selectedProductIdx, products.length - 1);
  const product = products[productIdx];
  const tiers = product.pricingTiers ?? [];

  // Clamp tier selection when switching products
  const tierIdx = Math.min(selectedTierIdx, tiers.length - 1);
  const tier = tiers[tierIdx] ?? tiers[0];
  const baseTier = tiers[0];

  const savings =
    baseTier && tier ? (baseTier.price - tier.price) * tier.qty : 0;
  const totalPrice = tier ? tier.price * tier.qty : 0;
  const discount =
    baseTier && tier && baseTier.price > tier.price
      ? Math.round(((baseTier.price - tier.price) / baseTier.price) * 100)
      : 0;

  const handleProductChange = (idx) => {
    setSelectedProductIdx(idx);
    // Default to middle tier of new product
    const newProduct = products[idx];
    const midIdx = Math.floor((newProduct.pricingTiers?.length ?? 1) / 2);
    setSelectedTierIdx(midIdx);
  };

  return (
    <section className="section-padding">
      <div className="container-bk">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── Left: Label + Product Switcher + Tier Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-light rounded-full text-sm font-medium text-accent-dark mb-4">
              <Icon name="TrendingDown" size={14} />
              Bulk Savings
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
              Order more, pay less.
            </h2>
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              Our volume-based pricing means the more you order, the more you
              save. Pick any product and see how the pricing drops.
            </p>

            {/* Product Switcher */}
            <div className="flex flex-wrap gap-2 mb-6">
              {products.map((p, i) => (
                <motion.button
                  key={p.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleProductChange(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    i === productIdx
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white text-text-secondary border-border hover:border-charcoal hover:text-charcoal'
                  }`}
                >
                  {p.name.replace(' Corrugated Box', '').replace(' Box', '')}
                </motion.button>
              ))}
            </div>

            {/* Price Tier Table */}
            <AnimatePresence mode="wait">
              <motion.div
                key={productIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {tiers.map((t, i) => {
                  const isSelected = i === tierIdx;
                  const tierDiscount =
                    baseTier && baseTier.price > t.price
                      ? Math.round(
                          ((baseTier.price - t.price) / baseTier.price) * 100
                        )
                      : 0;

                  return (
                    <motion.button
                      key={t.qty}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedTierIdx(i)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-charcoal text-white shadow-lg'
                          : 'bg-white border border-border hover:border-border-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-medium ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}
                        >
                          {t.qty.toLocaleString('en-IN')} pcs
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-bold ${isSelected ? 'text-white' : 'text-charcoal'}`}
                        >
                          ₹{t.price.toFixed(2)}/pc
                        </span>
                        {tierDiscount > 0 && (
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-accent text-white'
                                : 'bg-accent-light text-accent-dark'
                            }`}
                          >
                            -{tierDiscount}%
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Live Savings Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="card-bk p-8">
              {/* Product header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-kraft-muted rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <Icon name="Package" size={24} className="text-kraft" />
                  )}
                </div>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={product.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-bold text-charcoal"
                    >
                      {product.name}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-sm text-text-secondary">
                    {product.ply} · {product.dimensions}
                  </p>
                </div>
              </div>

              {/* Numbers */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-text-secondary">Quantity</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${productIdx}-${tierIdx}-qty`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-2xl font-bold text-charcoal"
                    >
                      {tier?.qty.toLocaleString('en-IN')}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-text-secondary">Per piece</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${productIdx}-${tierIdx}-price`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xl font-bold text-charcoal"
                    >
                      ₹{tier?.price.toFixed(2)}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary font-medium">
                      Total
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${productIdx}-${tierIdx}-total`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-3xl font-bold text-charcoal"
                      >
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Savings pill */}
                <AnimatePresence>
                  {savings > 0 && (
                    <motion.div
                      key={`${productIdx}-${tierIdx}-savings`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-accent-light rounded-xl p-3 text-center"
                    >
                      <p className="text-sm font-semibold text-accent-dark">
                        🎉 You save ₹{savings.toLocaleString('en-IN')} vs{' '}
                        {baseTier?.qty}-piece pricing
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Discount progress bar */}
                {discount > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-text-secondary mb-1.5">
                      <span>Base price</span>
                      <span className="font-semibold text-accent-dark">
                        {discount}% saved
                      </span>
                    </div>
                    <div className="bg-warm-gray rounded-full h-1.5">
                      <motion.div
                        className="bg-accent h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(discount * 2, 100)}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href={`/products/${product.slug}?qty=${tier?.qty ?? ''}`}
                className="btn-accent w-full text-center mt-6 block"
              >
                Order {product.name}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
