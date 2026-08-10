'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#faf8f5]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#e8e4de]/60 to-transparent blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="container-bk relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-[var(--color-kraft-light)] bg-white border border-[#e8e4de] rounded-full uppercase">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-charcoal)] mb-6">
              Packaging that powers your business.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
              BoxKart was built on a simple premise: businesses shouldn&apos;t
              have to struggle to find high-quality, reliable, and affordable
              packaging. We are streamlining the B2B packaging supply chain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="container-bk">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'PackageCheck',
                title: 'Uncompromising Quality',
                desc: 'Every box is rigorously tested for crush resistance and durability. We never compromise on raw materials.',
              },
              {
                icon: 'Zap',
                title: 'Lightning Fast',
                desc: 'In-stock items ship within 24 hours. We know that delays in packaging mean delays in your revenue.',
              },
              {
                icon: 'Leaf',
                title: 'Sustainable First',
                desc: 'Our corrugated boxes are made from highly recyclable materials, helping you minimize your carbon footprint.',
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#faf8f5] border border-[#e8e4de]"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Icon
                    name={value.icon}
                    size={28}
                    className="text-[var(--color-kraft)]"
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-charcoal)] mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-charcoal)] text-white text-center">
        <div className="container-bk max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to upgrade your packaging?
          </h2>
          <p className="text-[#a0a0a0] mb-10 text-lg">
            Join thousands of businesses that trust BoxKart for their shipping
            and packaging needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-[var(--color-charcoal)] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
