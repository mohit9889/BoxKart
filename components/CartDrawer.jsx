'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/lib/cart';
import Link from 'next/link';
import Icon from '@/components/Icon';

/**
 * Slide-in cart drawer with item list, pricing, and checkout CTA.
 */
export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateCount, totalItems, totalPrice, clearCart } =
    useCart();

  const formatPrice = (num) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[61] shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="ShoppingBag" size={20} className="text-charcoal" />
                <h2 className="font-bold text-lg">
                  Cart{' '}
                  {totalItems > 0 && (
                    <span className="text-text-secondary font-normal text-sm">
                      ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-warm-gray transition-colors"
                aria-label="Close cart"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Icon
                    name="ShoppingBag"
                    size={48}
                    className="text-border mb-4"
                  />
                  <p className="font-medium text-charcoal mb-1">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-text-secondary mb-6">
                    Add packaging products to get started
                  </p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="btn-primary text-sm"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-4">
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
                        exit={{ opacity: 0, x: 100 }}
                        className="card-bk p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-sm text-charcoal">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              {item.product.dimensions} · {item.product.ply}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-text-tertiary hover:text-danger transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-text-secondary">
                              {item.quantity.toLocaleString('en-IN')} pcs
                            </span>
                            <span className="text-xs text-text-tertiary">
                              ×
                            </span>
                            <div className="flex items-center gap-1 bg-warm-gray rounded-lg">
                              <button
                                onClick={() =>
                                  updateCount(
                                    item.id,
                                    Math.max(1, item.count - 1)
                                  )
                                }
                                className="p-1.5 hover:bg-border rounded-l-lg transition-colors"
                                aria-label="Decrease count"
                              >
                                <Icon name="Minus" size={12} />
                              </button>
                              <span className="text-sm font-medium px-2 min-w-[1.5rem] text-center">
                                {item.count}
                              </span>
                              <button
                                onClick={() =>
                                  updateCount(item.id, item.count + 1)
                                }
                                className="p-1.5 hover:bg-border rounded-r-lg transition-colors"
                                aria-label="Increase count"
                              >
                                <Icon name="Plus" size={12} />
                              </button>
                            </div>
                          </div>
                          <p className="font-bold text-charcoal">
                            {formatPrice(lineTotal)}
                          </p>
                        </div>

                        <p className="text-xs text-text-tertiary mt-2">
                          ₹{unitPrice}/pc · {item.product.deliveryEstimate}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Subtotal</span>
                  <span className="font-bold text-lg text-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-text-tertiary">
                  Delivery charges calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="btn-accent w-full text-center flex items-center justify-center gap-2"
                >
                  Continue to Checkout
                  <Icon name="ArrowRight" size={16} />
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-text-tertiary hover:text-danger transition-colors py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
