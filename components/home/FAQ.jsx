'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '@/components/common/Icon';

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Most of our corrugated boxes start from a minimum of 100 pieces. Some specialty items like bulk protection rolls start from 1 unit. Check individual product pages for exact MOQs.',
  },
  {
    q: 'How does bulk pricing work?',
    a: 'We offer tiered pricing — the more you order, the lower the per-piece cost. For example, a box priced at ₹10.50 for 100 pieces might cost ₹7.90 for 5,000 pieces. Pricing tiers are shown on every product card.',
  },
  {
    q: 'How quickly can I get my order?',
    a: 'Standard corrugated boxes and packaging supplies are delivered in 3–5 business days across India. Custom printed packaging takes 7–10 business days. Express delivery is available in select cities.',
  },
  {
    q: 'Can I get custom-sized or branded packaging?',
    a: 'Yes! We offer custom dimensions, printing (1-color to full-color), logo placement, inserts, and die-cut packaging. Use our Custom Quote form to get started.',
  },
  {
    q: 'Do you deliver across India?',
    a: 'Yes, we deliver to all major cities and most tier-2/3 towns. Delivery charges are calculated based on your location and order volume.',
  },
  {
    q: 'How do I reorder?',
    a: 'Once you have placed an order, you can reorder the same items from your Account Dashboard with a single click. We will even remind you when you might be running low.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We currently accept bank transfers and UPI for orders. Online payment integration (credit/debit cards, net banking) is coming soon.',
  },
];

/**
 * FAQ accordion section with AnimatePresence for smooth expand/collapse.
 */
export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section-padding">
      <div className="container-bk max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="heading-2 mb-3">Frequently Asked Questions</h2>
          <p className="text-body-lg">
            Everything you need to know about ordering packaging.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-bk overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIdx === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
              >
                <span className="font-medium text-charcoal pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className="text-text-tertiary"
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                  >
                    <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
