'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';

/**
 * Hero section with headline, CTAs, and CSS-rendered box composition
 * with floating dimension labels.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-warm-white via-white to-kraft-muted/30">
      <div className="container-bk py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-kraft-muted rounded-full text-sm font-medium text-kraft mb-6"
            >
              <Icon name="Package" size={14} />
              Launching for e-commerce sellers in North India
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-charcoal mb-6">
              The right packaging
              <br />
              <span className="text-kraft">for every shipment.</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
              Find the right box, mailer or packaging supply for your business.
              Buy from as little as 100 pieces with transparent bulk pricing.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="#box-finder"
                  className="btn-accent text-base px-6 py-3.5"
                >
                  Find My Box
                  <Icon name="ArrowRight" size={18} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/products"
                  className="btn-outline text-base px-6 py-3.5"
                >
                  Browse All Boxes
                </Link>
              </motion.div>
            </div>

            {/* What are you shipping? */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <p className="text-sm font-medium text-text-secondary mb-3">
                What are you shipping?
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Clothing',
                  'Cosmetics',
                  'Electronics',
                  'Books',
                  'Shoes',
                  'Food',
                  'Other',
                ].map((cat) => (
                  <a
                    key={cat}
                    href="#box-finder"
                    className="px-3 py-1.5 bg-warm-gray hover:bg-kraft-muted rounded-full text-xs font-medium text-text-secondary hover:text-charcoal transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-border">
              {[
                { label: 'Products', value: '20+ SKUs' },
                { label: 'Min. Order', value: '100 pcs' },
                { label: 'Delivery', value: '3–5 days' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-2xl font-bold text-charcoal">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual: CSS Box Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background circle */}
              <div className="absolute inset-8 rounded-full bg-kraft-muted/40" />

              {/* Large Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-16 left-12 w-44 h-36"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#d4a855] to-[#b8860b] rounded-lg shadow-lg border border-[#c49530]/50 relative">
                  <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#e0bf78] to-transparent rounded-t-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-0.5 bg-[#8a6508]/30" />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-4 top-2 bg-white shadow-md rounded-lg px-2.5 py-1 text-xs font-semibold text-charcoal border border-border"
                >
                  12 × 10 × 6&quot;
                </motion.div>
              </motion.div>

              {/* Medium Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-28 right-16 w-32 h-28"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#c9993d] to-[#a37209] rounded-lg shadow-lg border border-[#b58a20]/50 relative">
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#dbb460] to-transparent rounded-t-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-[#8a6508]/30" />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -right-4 top-0 bg-white shadow-md rounded-lg px-2.5 py-1 text-xs font-semibold text-charcoal border border-border"
                >
                  8 × 6 × 4&quot;
                </motion.div>
              </motion.div>

              {/* Small Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-20 right-24 w-24 h-20"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#dbb460] to-[#b8860b] rounded-md shadow-md border border-[#c49530]/50 relative">
                  <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[#e8ca82] to-transparent rounded-t-md" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg px-2.5 py-1 text-xs font-semibold text-charcoal border border-border whitespace-nowrap"
                >
                  6 × 4 × 3&quot;
                </motion.div>
              </motion.div>

              {/* Mailer */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute top-32 left-8 w-28 h-8"
              >
                <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-md shadow-sm border border-gray-300/50 relative flex items-center justify-center">
                  <div className="text-[8px] font-bold text-gray-600 uppercase tracking-wider">
                    Courier Bag
                  </div>
                </div>
              </motion.div>

              {/* Tape */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute bottom-8 right-8 w-14 h-14"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#f5deb3] to-[#d4a843] shadow-md border-4 border-[#c49530] relative">
                  <div className="absolute inset-3 rounded-full bg-[#8B7355]" />
                </div>
              </motion.div>

              {/* Bubble Wrap */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute top-8 left-24"
              >
                <div className="grid grid-cols-4 gap-0.5 opacity-40">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-blue-200 border border-blue-300/50"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
