'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

/** Proxy route — same origin, no CSRF/CORS issues */
const BOX_FINDER_PROXY = '/api/box-finder';

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

/** Default product dimensions per category (inches) for pre-filling. */
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
 * 3-step interactive Box Finder powered by the real box-engine API.
 * Step 1: What are you shipping? (category → pre-fills dimensions)
 * Step 2: Enter product dimensions
 * Step 3: Select quantity → calls POST /box-engine/recommend → shows result
 */
export default function BoxFinder() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [dims, setDims] = useState({ l: '', w: '', h: '' });
  const [unit, setUnit] = useState('inch');
  const [quantity, setQuantity] = useState(1000);

  // API state
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

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

  const handleDimsNext = () => setStep(3);

  /** Call the box-finder proxy (Next.js API route → BE server-to-server). */
  const handleQuantitySelect = useCallback(
    async (qty) => {
      setQuantity(qty);
      setIsLoading(true);
      setShowResult(true);
      setError(null);
      setRecommendations([]);

      const lVal = parseFloat(dims.l) || 0;
      const wVal = parseFloat(dims.w) || 0;
      const hVal = parseFloat(dims.h) || 0;

      // BE expects INCH or CM (uppercase)
      const apiUnit = unit === 'cm' ? 'CM' : 'INCH';

      try {
        const res = await fetch(BOX_FINDER_PROXY, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product: { length: lVal, width: wVal, height: hVal, unit: apiUnit },
            requirements: { quantity: qty },
            preferences: { priority: 'BALANCED' },
            limit: 3,
          }),
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error?.message || 'No recommendation found');
        }

        setRecommendations(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dims, unit]
  );

  const handleReset = () => {
    setStep(1);
    setCategory(null);
    setDims({ l: '', w: '', h: '' });
    setShowResult(false);
    setRecommendations([]);
    setError(null);
    setQuantity(1000);
  };

  // Top recommendation for the card display
  const topRec = recommendations[0] ?? null;

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
            Tell us what you&apos;re shipping. We&apos;ll find the perfect fit
            from our live catalogue.
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
                {step > s ? <Icon name="Check" size={14} /> : s}
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
            {/* ── Step 1: Category ── */}
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

            {/* ── Step 2: Dimensions ── */}
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
                  {/* Unit toggle */}
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

                  {/* Dimension inputs */}
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

            {/* ── Step 3: Quantity & Result ── */}
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
                  /* Result panel */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Loading */}
                    {isLoading && (
                      <div className="card-bk p-10 max-w-md mx-auto text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: 'linear',
                          }}
                          className="w-10 h-10 border-4 border-kraft border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-text-secondary font-medium">
                          Finding the best box for you…
                        </p>
                      </div>
                    )}

                    {/* Error */}
                    {!isLoading && error && (
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
                          <Link href="/bulk-orders" className="btn-accent">
                            Custom Quote
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Success: show top recommendation */}
                    {!isLoading && !error && topRec && (
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
                          {/* Product header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-kraft-muted rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                              {topRec.product.image ? (
                                <img
                                  src={topRec.product.image}
                                  alt={topRec.product.name}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              ) : (
                                <Icon
                                  name="Package"
                                  size={28}
                                  className="text-kraft"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-xs text-text-tertiary mb-0.5">
                                {topRec.product.dimensions}
                              </p>
                              <p className="font-bold text-charcoal text-lg leading-tight">
                                {topRec.product.name}
                              </p>
                              <p className="text-sm text-text-secondary">
                                {topRec.product.ply}-Ply ·{' '}
                                {topRec.product.material}
                              </p>
                            </div>
                          </div>

                          {/* Score badge */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex-1 bg-warm-gray rounded-full h-1.5">
                              <div
                                className="bg-accent h-1.5 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(topRec.score, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-accent">
                              {Math.round(topRec.score)}% match
                            </span>
                          </div>

                          {/* Fit info */}
                          <div className="flex gap-2 flex-wrap mb-4">
                            <span className="inline-flex items-center gap-1 text-xs bg-accent-light/30 text-accent-dark px-2.5 py-1 rounded-full font-medium">
                              <Icon name="CheckCircle" size={12} />
                              Best Fit
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs bg-warm-gray text-text-secondary px-2.5 py-1 rounded-full">
                              <Icon name="Maximize2" size={12} />
                              {Math.round(topRec.utilization * 100)}%
                              utilization
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${
                                topRec.inventory.status === 'AVAILABLE'
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              <Icon name="Warehouse" size={12} />
                              {topRec.inventory.status === 'AVAILABLE'
                                ? 'In Stock'
                                : 'Low Stock'}
                            </span>
                          </div>

                          {/* Pricing summary */}
                          <div className="bg-warm-gray rounded-xl p-4 mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-text-secondary">
                                Price per piece
                              </span>
                              <span className="font-semibold text-charcoal">
                                ₹
                                {(topRec.pricing.unitPriceMinor / 100).toFixed(
                                  2
                                )}
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
                                {topRec.product.ply >= 5 ? 50 : 100} pcs
                              </span>
                            </div>
                            <div className="border-t border-border pt-2 mt-2 flex justify-between">
                              <span className="text-text-secondary font-medium">
                                Estimated Total
                              </span>
                              <span className="font-bold text-lg text-charcoal">
                                ₹
                                {(
                                  (topRec.pricing.unitPriceMinor / 100) *
                                  quantity
                                ).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>

                          {/* Alternatives */}
                          {recommendations.length > 1 && (
                            <div className="mb-4">
                              <p className="text-xs font-medium text-text-secondary mb-2">
                                Also consider:
                              </p>
                              <div className="space-y-1.5">
                                {recommendations.slice(1).map((rec) => (
                                  <Link
                                    key={rec.product.id}
                                    href={`/products/${rec.product.slug}`}
                                    className="flex items-center justify-between p-2.5 rounded-lg bg-warm-gray hover:bg-border transition-colors text-sm"
                                  >
                                    <span className="font-medium text-charcoal">
                                      {rec.product.name}
                                    </span>
                                    <span className="text-text-secondary">
                                      ₹
                                      {(
                                        rec.pricing.unitPriceMinor / 100
                                      ).toFixed(2)}
                                      /pc
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTAs */}
                          <div className="flex gap-3">
                            <Link
                              href={`/products/${topRec.product.slug}`}
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
