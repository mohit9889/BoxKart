'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Icon from '@/components/Icon';

const EXAMPLE = {
  name: '10 × 8 × 4" Corrugated Box',
  tiers: [
    { qty: 100, price: 12.5 },
    { qty: 500, price: 11.2 },
    { qty: 1000, price: 10.5 },
    { qty: 5000, price: 9.5 },
  ],
};

/**
 * Visual explanation of bulk pricing benefits with animated numbers.
 */
export default function BulkPricing() {
  const [selectedIdx, setSelectedIdx] = useState(2);
  const tier = EXAMPLE.tiers[selectedIdx];
  const basePrice = EXAMPLE.tiers[0].price;
  const savings = (basePrice - tier.price) * tier.qty;
  const totalPrice = tier.price * tier.qty;

  return (
    <section className="section-padding">
      <div className="container-bk">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-light rounded-full text-sm font-medium text-accent-dark mb-4">
              <Icon name="TrendingDown" size={14} />
              Bulk Savings
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
              Order more, pay less.
            </h2>
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              Our volume-based pricing means the more you order, the more you
              save. See how pricing works for our most popular box.
            </p>

            {/* Price Table */}
            <div className="space-y-2">
              {EXAMPLE.tiers.map((t, i) => {
                const isSelected = i === selectedIdx;
                const discount = Math.round(
                  ((basePrice - t.price) / basePrice) * 100
                );
                return (
                  <motion.button
                    key={t.qty}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedIdx(i)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-charcoal text-white shadow-lg'
                        : 'bg-white border border-border hover:border-border-hover'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}
                      >
                        {t.qty.toLocaleString('en-IN')} pcs
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-bold ${isSelected ? 'text-white' : 'text-charcoal'}`}
                      >
                        ₹{t.price.toFixed(2)}/pc
                      </span>
                      {discount > 0 && (
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-accent text-white'
                              : 'bg-accent-light text-accent-dark'
                          }`}
                        >
                          -{discount}%
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-bk p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-kraft-muted rounded-xl flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-kraft" />
                </div>
                <div>
                  <p className="font-bold text-charcoal">{EXAMPLE.name}</p>
                  <p className="text-sm text-text-secondary">
                    3-Ply · Brown Kraft
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-text-secondary">Quantity</span>
                  <motion.span
                    key={tier.qty}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-charcoal"
                  >
                    {tier.qty.toLocaleString('en-IN')}
                  </motion.span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-text-secondary">Per piece</span>
                  <motion.span
                    key={tier.price}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold text-charcoal"
                  >
                    ₹{tier.price.toFixed(2)}
                  </motion.span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary font-medium">
                      Total
                    </span>
                    <motion.span
                      key={totalPrice}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-bold text-charcoal"
                    >
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                </div>

                {savings > 0 && (
                  <motion.div
                    key={savings}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-accent-light rounded-xl p-3 text-center"
                  >
                    <p className="text-sm font-semibold text-accent-dark">
                      You save ₹{savings.toLocaleString('en-IN')} vs 100-piece
                      pricing
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
