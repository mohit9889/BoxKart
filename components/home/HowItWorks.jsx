'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';

const STEPS = [
  {
    num: '01',
    title: 'Choose your packaging',
    description:
      'Browse our catalogue or use the Box Finder to get recommendations.',
    icon: 'Search',
  },
  {
    num: '02',
    title: 'Select quantity',
    description: 'Pick the right quantity tier to get the best bulk pricing.',
    icon: 'MousePointerClick',
  },
  {
    num: '03',
    title: 'Place your order',
    description: 'Quick checkout with delivery to your warehouse or store.',
    icon: 'CreditCard',
  },
  {
    num: '04',
    title: 'Receive your packaging',
    description: 'Fast delivery across India. Reorder anytime with one click.',
    icon: 'Truck',
  },
];

/**
 * How It Works — 4-step process with horizontal timeline (desktop)
 * and vertical layout (mobile).
 */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            How It Works
          </h2>
          <p className="text-text-secondary text-lg">
            From search to delivery in 4 simple steps.
          </p>
        </motion.div>

        {/* Desktop: Horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-6 relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-[12%] right-[12%] h-0.5 bg-border" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-kraft-muted flex items-center justify-center mx-auto mb-4 relative z-10">
                <Icon name={step.icon} size={28} className="text-kraft" />
              </div>
              <span className="text-xs font-bold text-kraft uppercase tracking-wider">
                Step {step.num}
              </span>
              <h3 className="font-semibold text-charcoal mt-1 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical */}
        <div className="md:hidden space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-kraft-muted flex items-center justify-center shrink-0">
                  <Icon name={step.icon} size={20} className="text-kraft" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="pb-6">
                <span className="text-xs font-bold text-kraft uppercase tracking-wider">
                  Step {step.num}
                </span>
                <h3 className="font-semibold text-charcoal mt-0.5 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
