'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Package,
  Truck,
} from 'lucide-react';
import { useCart } from '@/lib/cart';

/**
 * Full cart page with detailed item list, pricing, and checkout CTA.
 */
export default function CartPage() {
  const { items, removeItem, updateCount, totalItems, totalPrice, clearCart } =
    useCart();

  const formatPrice = (num) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  if (items.length === 0) {
    return (
      <div className="container-bk section-padding text-center">
        <ShoppingBag size={64} className="text-border mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          Your cart is empty
        </h1>
        <p className="text-text-secondary mb-6">
          Add packaging products to get started with your order.
        </p>
        <Link href="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-bk section-padding">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const tier = item.product.pricingTiers?.find(
              (t) => t.qty === item.quantity
            );
            const unitPrice =
              tier?.price ?? item.product.pricingTiers?.[0]?.price ?? 0;
            const lineTotal = unitPrice * item.quantity * item.count;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-bk p-5"
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-kraft-muted rounded-xl flex items-center justify-center shrink-0">
                    <Package size={32} className="text-kraft" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold text-charcoal hover:text-kraft transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-text-secondary mt-0.5">
                          {item.product.dimensions} · {item.product.ply}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-text-tertiary hover:text-danger transition-colors"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-text-tertiary">
                            Qty per order
                          </p>
                          <p className="text-sm font-medium text-charcoal">
                            {item.quantity.toLocaleString('en-IN')} pcs
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-text-tertiary">Orders</p>
                          <div className="flex items-center gap-1 bg-warm-gray rounded-lg mt-0.5">
                            <button
                              onClick={() =>
                                updateCount(
                                  item.id,
                                  Math.max(1, item.count - 1)
                                )
                              }
                              className="p-1.5 hover:bg-border rounded-l-lg"
                              aria-label="Decrease"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium px-3">
                              {item.count}
                            </span>
                            <button
                              onClick={() =>
                                updateCount(item.id, item.count + 1)
                              }
                              className="p-1.5 hover:bg-border rounded-r-lg"
                              aria-label="Increase"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-text-tertiary">
                          ₹{unitPrice.toFixed(2)}/pc
                        </p>
                        <p className="font-bold text-lg text-charcoal">
                          {formatPrice(lineTotal)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 text-xs text-text-tertiary">
                      <Truck size={12} />
                      {item.product.deliveryEstimate}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-sm text-text-tertiary hover:text-danger transition-colors"
          >
            Clear all items
          </button>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card-bk p-6 sticky top-24">
            <h2 className="font-bold text-lg text-charcoal mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  Items ({totalItems})
                </span>
                <span className="font-medium text-charcoal">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Delivery</span>
                <span className="text-text-tertiary">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-charcoal">Subtotal</span>
                <span className="text-xl font-bold text-charcoal">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn-accent w-full text-center flex items-center justify-center gap-2"
            >
              Continue to Checkout
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/products"
              className="block text-center text-sm text-kraft hover:text-kraft-light mt-3 transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
