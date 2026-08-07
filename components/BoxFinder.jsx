'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shirt,
  Sparkles,
  Smartphone,
  BookOpen,
  Footprints,
  UtensilsCrossed,
  Home,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Hash,
  Package,
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'clothing', label: 'Clothing', icon: Shirt },
  { id: 'cosmetics', label: 'Cosmetics', icon: Sparkles },
  { id: 'electronics', label: 'Electronics', icon: Smartphone },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'home', label: 'Home & Lifestyle', icon: Home },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const QUANTITIES = [100, 500, 1000, 5000, 10000];

/** Size recommendations by category. */
const RECOMMENDATIONS = {
  clothing: {
    l: 12,
    w: 10,
    h: 3,
    name: 'Garment Box',
    dim: '12 × 10 × 3"',
    ply: '3-Ply',
    price: 11.0,
    slug: 'garment-box-12x10x3',
  },
  cosmetics: {
    l: 8,
    w: 6,
    h: 4,
    name: 'Medium Shipping Box',
    dim: '8 × 6 × 4"',
    ply: '3-Ply',
    price: 8.9,
    slug: 'medium-shipping-box-8x6x4',
  },
  electronics: {
    l: 12,
    w: 10,
    h: 8,
    name: 'Heavy Duty 5-Ply Box',
    dim: '12 × 10 × 8"',
    ply: '5-Ply',
    price: 20.5,
    slug: 'heavy-duty-5ply-box-12x10x8',
  },
  books: {
    l: 10,
    w: 8,
    h: 2,
    name: 'Book Mailer Box',
    dim: '10 × 8 × 2"',
    ply: '3-Ply',
    price: 7.9,
    slug: 'book-mailer-box-10x8x2',
  },
  shoes: {
    l: 14,
    w: 9,
    h: 5,
    name: 'Shoe Box',
    dim: '14 × 9 × 5"',
    ply: '3-Ply',
    price: 12.5,
    slug: 'shoe-box-14x9x5',
  },
  food: {
    l: 10,
    w: 8,
    h: 4,
    name: 'Standard Shipping Box',
    dim: '10 × 8 × 4"',
    ply: '3-Ply',
    price: 10.5,
    slug: 'standard-shipping-box-10x8x4',
  },
  home: {
    l: 12,
    w: 10,
    h: 6,
    name: 'Large Shipping Box',
    dim: '12 × 10 × 6"',
    ply: '3-Ply',
    price: 14.0,
    slug: 'large-shipping-box-12x10x6',
  },
  other: {
    l: 10,
    w: 8,
    h: 4,
    name: 'Standard Shipping Box',
    dim: '10 × 8 × 4"',
    ply: '3-Ply',
    price: 10.5,
    slug: 'standard-shipping-box-10x8x4',
  },
};

/**
 * 3-step interactive Box Finder.
 * Step 1: Category selection.
 * Step 2: Product dimensions.
 * Step 3: Quantity selection → recommendation.
 */
export default function BoxFinder() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [dims, setDims] = useState({ l: '', w: '', h: '' });
  const [unit, setUnit] = useState('inch');
  const [quantity, setQuantity] = useState(1000);
  const [showResult, setShowResult] = useState(false);

  const recommendation = category ? RECOMMENDATIONS[category] : null;

  const handleCategorySelect = (id) => {
    setCategory(id);
    const rec = RECOMMENDATIONS[id];
    if (rec) setDims({ l: rec.l, w: rec.w, h: rec.h });
    setStep(2);
  };

  const handleDimsNext = () => {
    setStep(3);
  };

  const handleQuantitySelect = (qty) => {
    setQuantity(qty);
    setShowResult(true);
  };

  const handleReset = () => {
    setStep(1);
    setCategory(null);
    setDims({ l: '', w: '', h: '' });
    setShowResult(false);
    setQuantity(1000);
  };

  const totalPrice = recommendation
    ? (recommendation.price * quantity).toLocaleString('en-IN')
    : '0';

  return (
    <section id="box-finder" className="section-padding bg-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Not sure which box you need?
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Tell us what you&apos;re shipping. We&apos;ll help you find the
            right fit.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s
                    ? 'bg-accent text-white'
                    : 'bg-warm-gray text-text-tertiary'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 transition-colors ${
                    step > s ? 'bg-accent' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Category */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-charcoal text-center mb-6">
                  What are you shipping?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`card-bk p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                        category === cat.id
                          ? 'border-accent bg-accent-light/20'
                          : ''
                      }`}
                    >
                      <cat.icon size={28} className="text-kraft" />
                      <span className="text-sm font-medium text-charcoal">
                        {cat.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Dimensions */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-charcoal text-center mb-6 flex items-center justify-center gap-2">
                  <Ruler size={20} className="text-kraft" />
                  Enter your product size
                </h3>

                <div className="card-bk p-6 max-w-md mx-auto">
                  <div className="flex justify-center gap-2 mb-6">
                    {['cm', 'inch'].map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          unit === u
                            ? 'bg-charcoal text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { key: 'l', label: 'Length' },
                      { key: 'w', label: 'Width' },
                      { key: 'h', label: 'Height' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                          {label} ({unit})
                        </label>
                        <input
                          type="number"
                          value={dims[key]}
                          onChange={(e) =>
                            setDims((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="input-bk text-center"
                          placeholder="0"
                          min="1"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-outline flex-1 flex items-center justify-center gap-1"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      onClick={handleDimsNext}
                      className="btn-accent flex-1 flex items-center justify-center gap-1"
                    >
                      Next
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Quantity & Result */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {!showResult ? (
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal text-center mb-6 flex items-center justify-center gap-2">
                      <Hash size={20} className="text-kraft" />
                      How many do you need?
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {QUANTITIES.map((qty) => (
                        <motion.button
                          key={qty}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuantitySelect(qty)}
                          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all card-bk ${
                            quantity === qty
                              ? 'border-accent bg-accent-light/20 text-accent-dark'
                              : 'text-charcoal'
                          }`}
                        >
                          {qty === 10000
                            ? '10,000+'
                            : qty.toLocaleString('en-IN')}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => setStep(2)}
                        className="btn-outline flex items-center gap-1"
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Recommendation Result */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-charcoal text-center mb-6 flex items-center justify-center gap-2">
                      <Package size={20} className="text-accent" />
                      Recommended Packaging
                    </h3>

                    <div className="card-bk p-6 max-w-md mx-auto">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-kraft-muted rounded-xl flex items-center justify-center shrink-0">
                          <Package size={28} className="text-kraft" />
                        </div>
                        <div>
                          <p className="text-xs text-text-tertiary mb-0.5">
                            {recommendation?.dim}
                          </p>
                          <p className="font-bold text-charcoal text-lg">
                            {recommendation?.name}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {recommendation?.ply} Corrugated Box
                          </p>
                        </div>
                      </div>

                      <div className="bg-warm-gray rounded-xl p-4 mb-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">
                            Price per piece
                          </span>
                          <span className="font-semibold text-charcoal">
                            ₹{recommendation?.price?.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Quantity</span>
                          <span className="font-semibold text-charcoal">
                            {quantity.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">MOQ</span>
                          <span className="font-semibold text-charcoal">
                            100
                          </span>
                        </div>
                        <div className="border-t border-border pt-2 mt-2 flex justify-between">
                          <span className="text-text-secondary font-medium">
                            Estimated Total
                          </span>
                          <span className="font-bold text-lg text-charcoal">
                            ₹{totalPrice}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={`/products/${recommendation?.slug}`}
                          className="btn-accent flex-1 text-center"
                        >
                          Buy This Box
                        </Link>
                        <Link
                          href="/products?category=corrugated-boxes"
                          className="btn-outline flex-1 text-center"
                        >
                          See Similar
                        </Link>
                      </div>

                      <button
                        onClick={handleReset}
                        className="w-full text-center text-sm text-text-tertiary hover:text-charcoal transition-colors mt-4"
                      >
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
