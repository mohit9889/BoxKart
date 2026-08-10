'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import { staggerContainer, staggerChild, inViewConfig } from '@/lib/motion';

const INDICATORS = [
  {
    icon: 'ShieldCheck',
    label: 'Transparent Pricing',
    detail: 'See exactly what you pay — no hidden fees',
  },
  {
    icon: 'Truck',
    label: 'Fast Delivery',
    detail: 'Shipping across North India in 3–5 days',
  },
  {
    icon: 'Zap',
    label: 'Low MOQ',
    detail: 'Order from just 100 pieces',
  },
  {
    icon: 'Package',
    label: 'Right-Size Packaging',
    detail: 'Don\u2019t overpay for oversized boxes',
  },
];

/**
 * Trust indicators bar — uses truthful value propositions only.
 * No fake metrics, ratings, or unverifiable claims.
 */
export default function TrustIndicators() {
  return (
    <section className="bg-white border-y border-border">
      <div className="container-bk py-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {INDICATORS.map((item) => (
            <motion.div
              key={item.label}
              variants={staggerChild}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                <Icon name={item.icon} size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {item.label}
                </p>
                <p className="text-xs text-text-secondary">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
