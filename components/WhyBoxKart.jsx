'use client';

import { motion } from 'motion/react';
import Icon from '@/components/Icon';

const FEATURES = [
  {
    icon: 'PackageMinus',
    title: 'Low MOQ',
    description: 'Start from 100 pieces. No massive minimum orders.',
  },
  {
    icon: 'BadgeIndianRupee',
    title: 'Transparent Pricing',
    description: 'Know your price before ordering. No hidden costs.',
  },
  {
    icon: 'Truck',
    title: 'Fast Regional Delivery',
    description: 'Reliable delivery without unnecessary complexity.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Consistent Quality',
    description: 'Packaging you can reorder confidently, every time.',
  },
  {
    icon: 'TrendingDown',
    title: 'Bulk Savings',
    description: 'Better pricing as your volume grows.',
  },
  {
    icon: 'RefreshCw',
    title: 'Easy Reordering',
    description: 'Repeat your previous order in seconds.',
  },
];

/**
 * "Why BoxKart" trust section with 6 feature cards.
 */
export default function WhyBoxKart() {
  return (
    <section className="section-padding bg-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Built for people who ship.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            BoxKart is designed for e-commerce sellers who need reliable
            packaging without the hassle.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <motion.div whileHover={{ y: -4 }} className="card-bk p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-kraft-muted flex items-center justify-center mb-4">
                  <Icon name={feature.icon} size={22} className="text-kraft" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
