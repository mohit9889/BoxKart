'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  User,
  MapPin,
  ShoppingBag,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Package,
  Truck,
  Loader2,
} from 'lucide-react';
import { useCart } from '@/lib/cart';

const STEPS = [
  { id: 1, label: 'Contact', icon: User },
  { id: 2, label: 'Delivery', icon: MapPin },
  { id: 3, label: 'Summary', icon: ShoppingBag },
  { id: 4, label: 'Payment', icon: CreditCard },
];

/**
 * 4-step checkout flow: Contact → Address → Summary → Payment placeholder.
 */
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    gst: '',
  });

  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const formatPrice = (num) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  const handlePlaceOrder = () => {
    setSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = `#BK${Math.floor(Math.random() * 9000 + 1000)}`;
      setOrderId(generatedOrderId);
      setSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container-bk section-padding text-center">
        <ShoppingBag size={64} className="text-border mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          No items to checkout
        </h1>
        <p className="text-text-secondary mb-6">
          Add products to your cart first.
        </p>
        <Link href="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container-bk section-padding text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-accent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-charcoal mb-3">
            Order Request Placed!
          </h1>
          <p className="text-text-secondary mb-2">
            Your order request <strong>{orderId}</strong> has been received.
          </p>
          <p className="text-text-secondary mb-8">
            Our team will confirm your order and share payment details within 24
            hours.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/account" className="btn-primary">
              View Orders
            </Link>
            <Link href="/" className="btn-outline">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-bk section-padding">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => s.id < step && setStep(s.id)}
              disabled={s.id > step}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                step === s.id
                  ? 'bg-charcoal text-white'
                  : step > s.id
                    ? 'bg-accent-light text-accent-dark cursor-pointer'
                    : 'bg-warm-gray text-text-tertiary'
              }`}
            >
              <s.icon size={16} />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  step > s.id ? 'bg-accent' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Contact */}
          {step === 1 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="co-name"
                    className="block text-sm font-medium text-text-secondary mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="co-name"
                    className="input-bk"
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="co-email"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="co-email"
                      type="email"
                      className="input-bk"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="co-phone"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Phone *
                    </label>
                    <input
                      id="co-phone"
                      type="tel"
                      className="input-bk"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="co-gst"
                    className="block text-sm font-medium text-text-secondary mb-1"
                  >
                    GST Number (optional)
                  </label>
                  <input
                    id="co-gst"
                    className="input-bk"
                    value={contact.gst}
                    onChange={(e) =>
                      setContact({ ...contact, gst: e.target.value })
                    }
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="btn-accent flex items-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="ad-line1"
                    className="block text-sm font-medium text-text-secondary mb-1"
                  >
                    Address Line 1 *
                  </label>
                  <input
                    id="ad-line1"
                    className="input-bk"
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    required
                    placeholder="Building, Street"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ad-line2"
                    className="block text-sm font-medium text-text-secondary mb-1"
                  >
                    Address Line 2
                  </label>
                  <input
                    id="ad-line2"
                    className="input-bk"
                    value={address.line2}
                    onChange={(e) =>
                      setAddress({ ...address, line2: e.target.value })
                    }
                    placeholder="Area, Landmark"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="ad-city"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      City *
                    </label>
                    <input
                      id="ad-city"
                      className="input-bk"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      required
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ad-state"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      State *
                    </label>
                    <input
                      id="ad-state"
                      className="input-bk"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      required
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ad-pin"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Pincode *
                    </label>
                    <input
                      id="ad-pin"
                      className="input-bk"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      required
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-accent flex items-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Summary */}
          {step === 3 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => {
                  const tier = item.product.pricingTiers?.find(
                    (t) => t.qty === item.quantity
                  );
                  const price = tier?.price ?? 0;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Package size={20} className="text-kraft" />
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {item.quantity.toLocaleString('en-IN')} pcs ×{' '}
                            {item.count}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-charcoal">
                        {formatPrice(price * item.quantity * item.count)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-warm-gray rounded-xl p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Delivery</span>
                  <span className="text-text-tertiary">To be confirmed</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-medium">Estimated Total</span>
                  <span className="font-bold text-xl text-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-tertiary mb-4">
                <Truck size={14} />
                Estimated delivery: 3–5 business days
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-accent flex items-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-bk p-6"
            >
              <h2 className="text-xl font-bold text-charcoal mb-4">Payment</h2>

              <div className="bg-info/10 border border-info/20 rounded-xl p-4 mb-6 text-center">
                <CreditCard size={32} className="text-info mx-auto mb-2" />
                <p className="text-sm font-medium text-charcoal mb-1">
                  Payment integration coming soon
                </p>
                <p className="text-xs text-text-secondary">
                  Place your order request and our team will share payment
                  details.
                </p>
              </div>

              <div className="bg-warm-gray rounded-xl p-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-charcoal">Order Total</span>
                  <span className="font-bold text-xl text-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn-outline flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="btn-accent flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    'Request Order'
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
