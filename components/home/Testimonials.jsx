'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

/**
 * Early seller community CTA — replaces fake testimonials
 * with an honest call-to-action for the MVP phase.
 */
export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-bk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-kraft-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="Users" size={28} className="text-kraft" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Join our early seller community
          </h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            We&apos;re building BoxKart with direct input from sellers like you.
            Get early access to bulk pricing, priority support, and help shape
            the platform.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: 'Package',
                title: 'Low MOQ',
                desc: 'Start with just 100 boxes',
              },
              {
                icon: 'Sparkles',
                title: 'Transparent Pricing',
                desc: 'No hidden costs, ever',
              },
              {
                icon: 'Users',
                title: 'Priority Support',
                desc: 'Direct line to our team',
              },
            ].map((item) => (
              <div key={item.title} className="card-bk p-4 text-center">
                <Icon
                  name={item.icon}
                  size={24}
                  className="text-accent mx-auto mb-2"
                />
                <p className="font-semibold text-charcoal text-sm">
                  {item.title}
                </p>
                <p className="text-xs text-text-secondary mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <Link
            href="/custom-packaging"
            className="btn-accent inline-flex items-center gap-2"
          >
            Get Started
            <Icon name="ArrowRight" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
