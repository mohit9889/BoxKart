'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { products, getPriceForQuantity } from '@/data/products';
import Icon from '@/components/Icon';

const CATEGORIES = [
  { id: 'clothing', label: 'Clothing', icon: 'Shirt' },
  { id: 'cosmetics', label: 'Cosmetics', icon: 'Sparkles' },
  { id: 'electronics', label: 'Electronics', icon: 'Smartphone' },
  { id: 'books', label: 'Books', icon: 'BookOpen' },
  { id: 'shoes', label: 'Shoes', icon: 'Footprints' },
  { id: 'food', label: 'Food', icon: 'UtensilsCrossed' },
  { id: 'home', label: 'Home & Lifestyle', icon: 'Home' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal' },
];

const QUANTITIES = [100, 500, 1000, 5000, 10000];

/** Default product dimensions by category (inches) for pre-filling. */
const CATEGORY_DEFAULTS = {
  clothing: { l: 11, w: 9, h: 2 },
  cosmetics: { l: 6, w: 4, h: 3 },
  electronics: { l: 10, w: 8, h: 6 },
  books: { l: 9, w: 7, h: 1.5 },
  shoes: { l: 13, w: 8, h: 4 },
  food: { l: 8, w: 6, h: 3 },
  home: { l: 11, w: 9, h: 5 },
  other: { l: 8, w: 6, h: 3 },
};

/**
 * Finds the best-fit box from the product catalogue.
 * Adds 0.5" clearance on each dimension before matching.
 */
function findBestBox(reqL, reqW, reqH) {
  const reqDims = [reqL, reqW, reqH].sort((a, b) => b - a);

  const matchingBoxes = products.filter((p) => {
    if (!p.length || !p.width || !p.height) return false;
    if (p.category !== 'corrugated-boxes') return false;
    const boxDims = [p.length, p.width, p.height].sort((a, b) => b - a);
    return (
      boxDims[0] >= reqDims[0] &&
      boxDims[1] >= reqDims[1] &&
      boxDims[2] >= reqDims[2]
    );
  });

  if (matchingBoxes.length === 0) return null;

  // Best Fit = smallest volume that fits
  return matchingBoxes.reduce((best, current) => {
    const bestVol = best.length * best.width * best.height;
    const currentVol = current.length * current.width * current.height;
    return currentVol < bestVol ? current : best;
  });
}

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
  const [recommendation, setRecommendation] = useState(null);

  const handleCategorySelect = (id) => {
    setCategory(id);
    const defaults = CATEGORY_DEFAULTS[id];
    if (defaults) {
      if (unit === 'cm') {
        setDims({
          l: (defaults.l * 2.54).toFixed(1),
          w: (defaults.w * 2.54).toFixed(1),
          h: (defaults.h * 2.54).toFixed(1),
        });
      } else {
        setDims({ l: defaults.l, w: defaults.w, h: defaults.h });
      }
    }
    setStep(2);
  };

  const handleDimsNext = () => {
    setStep(3);
  };

  const handleQuantitySelect = (qty) => {
    setQuantity(qty);

    const lVal = parseFloat(dims.l) || 0;
    const wVal = parseFloat(dims.w) || 0;
    const hVal = parseFloat(dims.h) || 0;

    const factor = unit === 'cm' ? 0.393701 : 1;
    const clearance = 0.5;

    const reqL = lVal * factor + clearance;
    const reqW = wVal * factor + clearance;
    const reqH = hVal * factor + clearance;

    const bestBox = findBestBox(reqL, reqW, reqH);
    setRecommendation(bestBox);
    setShowResult(true);
  };

  const handleReset = () => {
    setStep(1);
    setCategory(null);
    setDims({ l: '', w: '', h: '' });
    setShowResult(false);
    setRecommendation(null);
    setQuantity(1000);
  };

  const recPrice = recommendation
    ? getPriceForQuantity(recommendation, quantity)
    : 0;
  const totalPrice = recommendation
    ? (recPrice * quantity).toLocaleString('en-IN')
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
                      <Icon name={cat.icon} size={28} className="text-kraft" />
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
                  <Icon name="Ruler" size={20} className="text-kraft" />
                  Enter your product size
                </h3>

                <div className="card-bk p-6 max-w-md mx-auto">
                  <div className="flex justify-center gap-2 mb-6">
                    {['cm', 'inch'].map((u) => (
                      <button
                        key={u}
                        onClick={() => {
                          if (unit !== u && dims.l && dims.w && dims.h) {
                            const f = u === 'cm' ? 2.54 : 0.393701;
                            setDims({
                              l: (parseFloat(dims.l) * f).toFixed(1),
                              w: (parseFloat(dims.w) * f).toFixed(1),
                              h: (parseFloat(dims.h) * f).toFixed(1),
                            });
                          }
                          setUnit(u);
                        }}
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
                      <Icon name="ArrowLeft" size={16} />
                      Back
                    </button>
                    <button
                      onClick={handleDimsNext}
                      disabled={!dims.l || !dims.w || !dims.h}
                      className="btn-accent flex-1 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      Next
                      <Icon name="ArrowRight" size={16} />
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
                      <Icon name="Hash" size={20} className="text-kraft" />
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
                        <Icon name="ArrowLeft" size={16} />
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
                    {!recommendation ? (
                      <div className="card-bk p-8 max-w-md mx-auto text-center">
                        <Icon
                          name="Package"
                          size={48}
                          className="text-text-tertiary mx-auto mb-4"
                        />
                        <h3 className="text-lg font-bold text-charcoal mb-2">
                          No matching box found
                        </h3>
                        <p className="text-text-secondary mb-6">
                          We couldn&apos;t find a standard box for those
                          dimensions. Try a custom quote instead.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => {
                              setShowResult(false);
                              setStep(2);
                            }}
                            className="btn-outline"
                          >
                            Try different dimensions
                          </button>
                          <Link href="/custom-packaging" className="btn-accent">
                            Custom Quote
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-charcoal text-center mb-6 flex items-center justify-center gap-2">
                          <Icon
                            name="Package"
                            size={20}
                            className="text-accent"
                          />
                          Recommended Packaging
                        </h3>

                        <div className="card-bk p-6 max-w-md mx-auto">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-kraft-muted rounded-xl flex items-center justify-center shrink-0">
                              <Icon
                                name="Package"
                                size={28}
                                className="text-kraft"
                              />
                            </div>
                            <div>
                              <p className="text-xs text-text-tertiary mb-0.5">
                                {recommendation.dimensions}
                              </p>
                              <p className="font-bold text-charcoal text-lg">
                                {recommendation.name}
                              </p>
                              <p className="text-sm text-text-secondary">
                                {recommendation.ply} Corrugated Box
                              </p>
                            </div>
                          </div>

                          <div className="bg-warm-gray rounded-xl p-4 mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-text-secondary">
                                Price per piece
                              </span>
                              <span className="font-semibold text-charcoal">
                                ₹{recPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-text-secondary">
                                Quantity
                              </span>
                              <span className="font-semibold text-charcoal">
                                {quantity.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-text-secondary">MOQ</span>
                              <span className="font-semibold text-charcoal">
                                {recommendation.moq}
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
                              href={`/products/${recommendation.slug}`}
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
                      </>
                    )}
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
