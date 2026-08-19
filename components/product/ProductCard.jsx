'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import Icon from '@/components/common/Icon';
import { staggerChild, hoverTap, duration } from '@/lib/motion';

/* ── Product Image ── */
const ProductImage = ({ src, alt, className = '' }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`relative flex items-center justify-center ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
    />
  </motion.div>
);

/* ── Badges ── */
const Badges = ({ product, isBestValue, selectedQty }) => {
  const formattedPly =
    product.ply && product.ply !== 'N/A'
      ? String(product.ply).includes('Ply')
        ? product.ply
        : `${product.ply}-Ply`
      : null;

  return (
    <div className="absolute top-3 left-3 flex gap-1.5">
      {formattedPly && (
        <span className="badge badge-kraft">{formattedPly}</span>
      )}
      {isBestValue && selectedQty !== product.pricingTiers?.[0]?.qty && (
        <span className="badge badge-accent">Best Value</span>
      )}
    </div>
  );
};

/* ── Add to Cart button ── */
const AddToCartButton = ({
  fullWidth = true,
  size = 'md',
  added,
  handleAddToCart,
}) => {
  const sizeClasses = size === 'sm' ? 'py-2 text-xs' : 'py-2.5 text-sm';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      disabled={added}
      className={`${fullWidth ? 'w-full' : ''} ${sizeClasses} rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
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
            <Icon name="Check" size={14} />
            Added
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Icon name="ShoppingCart" size={14} />
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

/**
 * Reusable product card with multiple layout variants,
 * quantity-based pricing, and Add to Cart microinteraction.
 *
 * @param {'default'|'compact'|'featured'|'horizontal'} variant
 */
export default function ProductCard({
  product,
  index = 0,
  variant = 'default',
}) {
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

  /** Format quantity for display (1000 → 1K). */
  const fmtQty = (qty) => (qty >= 1000 ? `${(qty / 1000).toFixed(0)}K` : qty);

  /* ── HORIZONTAL variant ── */
  if (variant === 'horizontal') {
    return (
      <motion.div
        variants={staggerChild}
        className="card-bk overflow-hidden group flex"
      >
        {/* Image */}
        <div className="relative bg-gradient-to-br from-kraft-muted/40 to-kraft-muted/20 p-4 flex items-center justify-center w-36 shrink-0">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="w-24 h-20"
          />
          <Badges
            product={product}
            isBestValue={isBestValue}
            selectedQty={selectedQty}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="font-semibold text-charcoal text-sm leading-tight mb-1 hover:text-kraft transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-text-secondary mb-2">
              {product.dimensions} · {product.material}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="price-main text-base">
                ₹{currentPrice.toFixed(2)}
              </span>
              <span className="price-unit text-xs">/ pc</span>
            </div>
            <AddToCartButton
              fullWidth={false}
              size="sm"
              added={added}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── COMPACT variant ── */
  if (variant === 'compact') {
    return (
      <motion.div
        variants={staggerChild}
        className="card-bk overflow-hidden group"
      >
        <div className="relative bg-gradient-to-br from-kraft-muted/40 to-kraft-muted/20 p-4 flex items-center justify-center h-32">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="w-24 h-20"
          />
          <Badges
            product={product}
            isBestValue={isBestValue}
            selectedQty={selectedQty}
          />
        </div>
        <div className="p-3">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-semibold text-charcoal text-xs leading-tight mb-1 hover:text-kraft transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="price-main text-sm">
              ₹{currentPrice.toFixed(2)}
            </span>
            <span className="price-unit text-xs">/ pc</span>
          </div>
          <AddToCartButton
            size="sm"
            added={added}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </motion.div>
    );
  }

  /* ── FEATURED variant ── */
  if (variant === 'featured') {
    return (
      <motion.div
        variants={staggerChild}
        className="card-bk overflow-hidden group border-kraft/30 ring-1 ring-kraft/10"
      >
        <div className="relative bg-gradient-to-br from-kraft-muted/50 to-kraft-muted/30 p-8 flex items-center justify-center h-52">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="w-40 h-36"
          />
          <Badges
            product={product}
            isBestValue={isBestValue}
            selectedQty={selectedQty}
          />
          <div className="absolute top-3 right-3">
            <span className="badge badge-charcoal">Featured</span>
          </div>
        </div>
        <div className="p-5">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-bold text-charcoal text-base leading-tight mb-1.5 hover:text-kraft transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-text-secondary mb-4">
            {product.dimensions} · {product.material}
            {product.ply &&
              product.ply !== 'N/A' &&
              ` · ${String(product.ply).includes('Ply') ? product.ply : `${product.ply}-Ply`}`}
          </p>

          {/* Full price table */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.pricingTiers?.map((tier) => (
              <button
                key={tier.qty}
                onClick={() => setSelectedQty(tier.qty)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedQty === tier.qty
                    ? 'bg-charcoal text-white'
                    : 'bg-warm-gray text-text-secondary hover:bg-border'
                }`}
              >
                <span className="block">{fmtQty(tier.qty)}</span>
                <span className="block text-[10px] opacity-70">
                  ₹{tier.price}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.p
                key={currentPrice}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="price-main text-xl"
              >
                ₹{currentPrice.toFixed(2)}
                <span className="price-unit text-xs ml-1">/ piece</span>
              </motion.p>
              <p className="text-xs text-text-tertiary mt-0.5">
                Total: ₹{totalPrice.toLocaleString('en-IN')} · MOQ:{' '}
                {product.moq}
              </p>
            </div>
          </div>

          <AddToCartButton added={added} handleAddToCart={handleAddToCart} />
        </div>
      </motion.div>
    );
  }

  /* ── DEFAULT variant ── */
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
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-32 h-28"
        />
        <Badges
          product={product}
          isBestValue={isBestValue}
          selectedQty={selectedQty}
        />
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
              {fmtQty(tier.qty)}
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
        <AddToCartButton added={added} handleAddToCart={handleAddToCart} />
      </div>
    </motion.div>
  );
}
