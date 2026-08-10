'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { EmptyState } from '@/components/ui';
import Icon from '@/components/common/Icon';

/**
 * Full cart page with detailed item list, pricing, and checkout CTA.
 */
export default function CartPage() {
  const {
    items,
    removeItem,
    updateCount,
    totalItems,
    subtotal,
    shipping,
    gst,
    totalPrice,
    clearCart,
  } = useCart();

  const formatPrice = (num) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  if (items.length === 0) {
    return (
      <EmptyState
        icon="ShoppingBag"
        title="Your cart is empty"
        description="Add packaging products to get started with your order."
        actions={[
          { label: 'Browse Products', href: '/products' },
          { label: 'Find My Box', href: '/#box-finder' },
        ]}
      />
    );
  }

  return (
    <div className="container-bk section-padding">
      <h1 className="heading-1 mb-8">Your Cart</h1>

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
                    <Icon name="Package" size={32} className="text-kraft" />
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
                        <Icon name="Trash2" size={16} />
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
                              <Icon name="Minus" size={14} />
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
                              <Icon name="Plus" size={14} />
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
                      <Icon name="Truck" size={12} />
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
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-accent font-medium">Free</span>
                ) : (
                  <span className="font-medium text-charcoal">
                    {formatPrice(shipping)}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">GST (18%)</span>
                <span className="font-medium text-charcoal">
                  {formatPrice(gst)}
                </span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-accent mb-4 flex items-center gap-1">
                <Icon name="Truck" size={12} />
                Free shipping on orders above ₹5,000
              </p>
            )}

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-charcoal">Total</span>
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
              <Icon name="ArrowRight" size={16} />
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
