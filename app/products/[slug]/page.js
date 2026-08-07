'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  ShoppingCart,
  Check,
  Package,
  Ruler,
  Layers,
  Weight,
  Truck,
  Tag,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { products, getPriceForQuantity } from '@/data/products';
import { useCart } from '@/lib/cart';
import BoxBlueprint from '@/components/BoxBlueprint';

/**
 * Product detail page — shows full product info, pricing tiers,
 * quantity selector, and sticky mobile CTA.
 */
export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);
  const { addItem } = useCart();
  const [selectedQty, setSelectedQty] = useState(
    product?.pricingTiers?.[0]?.qty ?? 100
  );
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container-bk section-padding text-center">
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          Product not found
        </h1>
        <Link href="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
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
    { icon: Ruler, label: 'Dimensions', value: product.dimensions },
    { icon: Layers, label: 'Ply', value: product.ply },
    { icon: Package, label: 'Material', value: product.material },
    { icon: Weight, label: 'Weight Capacity', value: product.weightCapacity },
    { icon: Truck, label: 'Delivery', value: product.deliveryEstimate },
    { icon: Tag, label: 'MOQ', value: `${product.moq} pieces` },
  ];

  return (
    <>
      <div className="container-bk section-padding pb-32 md:pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/products"
            className="hover:text-charcoal transition-colors"
          >
            Products
          </Link>
          <ChevronRight size={14} />
          <span className="text-charcoal font-medium">{product.name}</span>
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

            <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">
              {product.name}
            </h1>
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
                      <Check size={18} />
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
                      <ShoppingCart size={18} />
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <Link
                href="/#custom-packaging"
                className="btn-outline flex items-center gap-2"
              >
                <FileText size={16} />
                Bulk Quote
              </Link>
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-charcoal mb-4 uppercase tracking-wider">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-2.5">
                    <spec.icon
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

            {/* Description */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-sm font-semibold text-charcoal mb-2 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Die-Cut Blueprint Section */}
      <BoxBlueprint product={product} />

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-40 md:hidden">
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
                <Check size={16} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}
