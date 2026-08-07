'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import Icon from '@/components/Icon';

/**
 * Reusable product card with quantity-based pricing,
 * quantity selector pills, and Add to Cart microinteraction.
 */
export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [selectedQty, setSelectedQty] = useState(
    product.pricingTiers?.[0]?.qty ?? 100
  );
  const [added, setAdded] = useState(false);

  const currentTier = product.pricingTiers?.find((t) => t.qty === selectedQty);
  const currentPrice =
    currentTier?.price ?? product.pricingTiers?.[0]?.price ?? 0;
  const totalPrice = currentPrice * selectedQty;

  const bestTier = product.pricingTiers?.reduce((best, t) =>
    t.price < best.price ? t : best
  );
  const isBestValue = selectedQty === bestTier?.qty;

  const handleAddToCart = () => {
    addItem(product, selectedQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="card-bk overflow-hidden group"
    >
      {/* Image Area */}
      <div className="relative bg-gradient-to-br from-kraft-muted/40 to-kraft-muted/20 p-6 flex items-center justify-center h-44">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-24 h-20 bg-gradient-to-br from-[#d4a855] to-[#b8860b] rounded-lg shadow-md relative"
        >
          <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[#e0bf78] to-transparent rounded-t-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-[#8a6508]/30" />
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {product.ply !== 'N/A' && (
            <span className="badge badge-kraft">{product.ply}</span>
          )}
          {isBestValue && selectedQty !== product.pricingTiers?.[0]?.qty && (
            <span className="badge badge-accent">Best Value</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block group/link">
          <h3 className="font-semibold text-charcoal group-hover/link:text-kraft transition-colors text-sm leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-text-secondary mb-3">
          {product.dimensions} · {product.material}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <motion.span
            key={currentPrice}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="price-main text-lg"
          >
            ₹{currentPrice.toFixed(2)}
          </motion.span>
          <span className="price-unit text-xs">/ piece</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.pricingTiers?.slice(0, 4).map((tier) => (
            <button
              key={tier.qty}
              onClick={() => setSelectedQty(tier.qty)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedQty === tier.qty
                  ? 'bg-charcoal text-white'
                  : 'bg-warm-gray text-text-secondary hover:bg-border'
              }`}
            >
              {tier.qty >= 1000 ? `${(tier.qty / 1000).toFixed(0)}K` : tier.qty}
            </button>
          ))}
        </div>

        {/* Total & MOQ */}
        <div className="flex items-center justify-between mb-3">
          <motion.p
            key={totalPrice}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-text-secondary"
          >
            Total:{' '}
            <span className="font-semibold text-charcoal">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </motion.p>
          <span className="text-xs text-text-tertiary">MOQ: {product.moq}</span>
        </div>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            added
              ? 'bg-accent text-white'
              : 'bg-charcoal text-white hover:bg-charcoal-light'
          }`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Icon name="Check" size={16} />
                Added ✓
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <Icon name="ShoppingCart" size={16} />
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
