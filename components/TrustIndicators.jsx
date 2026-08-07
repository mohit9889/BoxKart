'use client';

import { motion } from 'motion/react';
import Icon from '@/components/Icon';

const INDICATORS = [
  {
    icon: 'ShieldCheck',
    label: 'Transparent Pricing',
    detail: 'See exactly what you pay',
  },
  {
    icon: 'Truck',
    label: 'Fast Delivery',
    detail: 'Shipping across North India',
  },
  { icon: 'Zap', label: 'Low MOQ', detail: 'Order from just 100 pieces' },
  {
    icon: 'Award',
    label: 'Early Access',
    detail: 'Join our seller community',
  },
];

/**
 * Trust indicators bar below the hero section.
 */
export default function TrustIndicators() {
  return (
    <section className="bg-white border-y border-border">
      <div className="container-bk py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {INDICATORS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
        </div>
      </div>
    </section>
  );
}
