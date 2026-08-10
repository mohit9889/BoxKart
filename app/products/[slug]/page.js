'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products, getPriceForQuantity } from '@/data/products';
import { useCart } from '@/lib/cart';
import { getUpsellPrompt } from '@/lib/pricing';
import BoxBlueprint from '@/components/product/BoxBlueprint';
import PincodeChecker from '@/components/product/PincodeChecker';
import { ErrorState } from '@/components/ui';
import Icon from '@/components/common/Icon';

/**
 * Product detail page — shows full product info, pricing tiers,
 * quantity selector, and sticky mobile CTA.
 */
export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);
  const { addItem } = useCart();
  const [selectedQty, setSelectedQty] = useState(
    product?.pricingTiers?.[0]?.qty ?? 100
  );
  const [added, setAdded] = useState(false);
  const [showBulkQuote, setShowBulkQuote] = useState(false);

  if (!product) {
    return (
      <ErrorState
        title="Product not found"
        message="This packaging product doesn't exist or may have been removed."
        retry={{
          label: 'Browse Products',
          action: () => router.push('/products'),
        }}
      />
    );
  }

  const currentPrice = getPriceForQuantity(product, selectedQty);
  const totalPrice = currentPrice * selectedQty;

  const handleAddToCart = () => {
    addItem(product, selectedQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const specs = [
    { icon: 'Ruler', label: 'Dimensions', value: product.dimensions },
    { icon: 'Layers', label: 'Ply', value: product.ply },
    { icon: 'Package', label: 'Material', value: product.material },
    { icon: 'Weight', label: 'Weight Capacity', value: product.weightCapacity },
    { icon: 'Truck', label: 'Delivery', value: product.deliveryEstimate },
    { icon: 'Tag', label: 'MOQ', value: `${product.moq} pieces` },
  ];

  return (
    <>
      <div className="container-bk section-padding pb-32 md:pb-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-text-secondary mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <Icon name="ChevronRight" size={14} />
          <Link
            href="/products"
            className="hover:text-charcoal transition-colors"
          >
            Products
          </Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-charcoal font-medium" aria-current="page">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-kraft-muted/40 to-kraft-muted/20 rounded-2xl p-12 flex items-center justify-center aspect-square max-w-lg mx-auto lg:mx-0">
              <div className="w-48 h-40 bg-gradient-to-br from-[#d4a855] to-[#b8860b] rounded-xl shadow-lg relative">
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#e0bf78] to-transparent rounded-t-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-[#8a6508]/30" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#8a6508]/40 tracking-wider">
                  BOXKART
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-kraft">{product.ply}</span>
              <span className="badge badge-accent">{product.stockStatus}</span>
            </div>

            <h1 className="heading-2 mb-2">{product.name}</h1>
            <p className="text-text-secondary mb-1">{product.dimensions}</p>
            <p className="text-text-secondary text-sm mb-6">
              {product.color} · {product.material}
            </p>

            {/* Suitable For */}
            <div className="mb-6">
              <p className="text-sm font-medium text-text-secondary mb-2">
                Suitable for:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.useCases.map((uc) => (
                  <span
                    key={uc}
                    className="px-3 py-1 bg-warm-gray rounded-full text-xs font-medium text-text-secondary"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-6">
              <p className="text-sm font-medium text-text-secondary mb-3">
                Quantity pricing:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.pricingTiers.map((tier) => {
                  const isSelected = selectedQty === tier.qty;
                  const bestTier = product.pricingTiers.reduce((b, t) =>
                    t.price < b.price ? t : b
                  );
                  const isBest = tier.qty === bestTier.qty;

                  return (
                    <button
                      key={tier.qty}
                      onClick={() => setSelectedQty(tier.qty)}
                      className={`relative p-3 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-accent bg-accent-light/20'
                          : 'border-border hover:border-border-hover'
                      }`}
                    >
                      {isBest && (
                        <span className="absolute -top-2 right-2 text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">
                          BEST
                        </span>
                      )}
                      <p className="text-xs text-text-secondary">
                        {tier.qty.toLocaleString('en-IN')} pcs
                      </p>
                      <p className="font-bold text-charcoal">
                        ₹{tier.price.toFixed(2)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Savings Callout */}
            {selectedQty > product.pricingTiers[0].qty &&
              (() => {
                const basePrice = product.pricingTiers[0].price;
                const savings = (basePrice - currentPrice) * selectedQty;
                if (savings <= 0) return null;
                return (
                  <div className="bg-accent-light/30 border border-accent/20 rounded-xl p-3 mb-3 flex items-center gap-2 text-sm">
                    <Icon
                      name="TrendingDown"
                      size={16}
                      className="text-accent shrink-0"
                    />
                    <span className="text-accent-dark font-medium">
                      Save ₹{savings.toLocaleString('en-IN')} vs ordering{' '}
                      {product.pricingTiers[0].qty.toLocaleString('en-IN')} at a
                      time
                    </span>
                  </div>
                );
              })()}

            {/* Upsell Prompt */}
            {(() => {
              const upsell = getUpsellPrompt(product, selectedQty);
              if (!upsell) return null;
              return (
                <div className="bg-kraft-muted/30 border border-kraft/20 rounded-xl p-3 mb-3 text-sm text-kraft-dark">
                  💡 {upsell.message}
                </div>
              );
            })()}

            {/* Total */}
            <div className="bg-warm-gray rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total</p>
                <motion.p
                  key={totalPrice}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-charcoal"
                >
                  ₹{totalPrice.toLocaleString('en-IN')}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">
                  {selectedQty.toLocaleString('en-IN')} pieces
                </p>
                <p className="text-sm text-text-secondary">
                  ₹{currentPrice.toFixed(2)}/pc
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-accent text-white'
                    : 'bg-charcoal text-white hover:bg-charcoal-light'
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <Icon name="Check" size={18} />
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
                      <Icon name="ShoppingCart" size={18} />
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button
                onClick={() => setShowBulkQuote(true)}
                className="btn-outline flex items-center gap-2"
              >
                <Icon name="FileText" size={16} />
                Bulk Quote
              </button>
            </div>

            {/* Pincode Checker */}
            <PincodeChecker product={product} selectedQty={selectedQty} />

            {/* Specs */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-overline mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-2.5">
                    <Icon
                      name={spec.icon}
                      size={16}
                      className="text-kraft shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-xs text-text-tertiary">{spec.label}</p>
                      <p className="text-sm font-medium text-charcoal">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Ply vs 5-Ply Explainer */}
            {(product.ply === '3-Ply' || product.ply === '5-Ply') && (
              <div className="border-t border-border pt-6 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Info" size={16} className="text-info" />
                  <h3 className="text-overline">What is {product.ply}?</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product.ply === '3-Ply'
                    ? 'Three layers of paper — ideal for lightweight products up to 5 kg. Great for clothing, cosmetics, books, and small electronics. Cost-effective and recyclable.'
                    : 'Five layers of paper with double corrugated fluting — provides superior crush resistance for heavier products up to 15 kg. Recommended for electronics, appliances, and items needing extra protection during transit.'}
                </p>
              </div>
            )}

            {/* Not Recommended For */}
            {product.notRecommendedFor?.length > 0 && (
              <div className="border-t border-border pt-6 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    name="AlertTriangle"
                    size={16}
                    className="text-warning"
                  />
                  <h3 className="text-overline">Not Recommended For</h3>
                </div>
                <ul className="space-y-1.5">
                  {product.notRecommendedFor.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-text-secondary flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-overline mb-2">Description</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Die-Cut Blueprint Section */}
      <BoxBlueprint product={product} />

      {/* Bulk Quote Modal */}
      <AnimatePresence>
        {showBulkQuote && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[var(--z-overlay)]"
              onClick={() => setShowBulkQuote(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 z-[calc(var(--z-overlay)+1)] w-[90vw] max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-charcoal">
                  Request Bulk Quote
                </h2>
                <button
                  onClick={() => setShowBulkQuote(false)}
                  className="p-2 rounded-full hover:bg-warm-gray"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Need 5,000+ boxes? Fill in your details and we&apos;ll share a
                custom quote within 24 hours.
              </p>
              <div className="bg-kraft-muted/30 rounded-xl p-3 mb-4 text-sm">
                <span className="font-medium text-charcoal">
                  {product.name}
                </span>
                <span className="text-text-secondary">
                  {' '}
                  — {product.dimensions}
                </span>
              </div>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowBulkQuote(false);
                  alert(
                    'Quote request submitted! We will contact you within 24 hours.'
                  );
                }}
              >
                <input
                  className="input-bk text-sm"
                  placeholder="Your Name *"
                  required
                />
                <input
                  className="input-bk text-sm"
                  placeholder="Phone Number *"
                  type="tel"
                  required
                />
                <input
                  className="input-bk text-sm"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="input-bk text-sm"
                  placeholder="Quantity (e.g. 10,000)"
                  type="number"
                  min="5000"
                  required
                />
                <textarea
                  className="input-bk text-sm"
                  placeholder="Additional Notes (optional)"
                  rows={2}
                />
                <button type="submit" className="btn-accent w-full">
                  Submit Quote Request
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-[var(--z-sticky)] md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-secondary">
              {selectedQty.toLocaleString('en-IN')} pcs
            </p>
            <p className="font-bold text-charcoal">
              ₹{totalPrice.toLocaleString('en-IN')}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={added}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              added ? 'bg-accent text-white' : 'bg-charcoal text-white'
            }`}
          >
            {added ? (
              <>
                <Icon name="Check" size={16} />
                Added
              </>
            ) : (
              <>
                <Icon name="ShoppingCart" size={16} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}
