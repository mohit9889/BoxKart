'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  hoverTap,
  duration,
} from '@/lib/motion';

const SHIPPING_CATEGORIES = [
  { label: 'Clothing', icon: 'Shirt' },
  { label: 'Cosmetics', icon: 'Droplets' },
  { label: 'Electronics', icon: 'Smartphone' },
  { label: 'Books', icon: 'BookOpen' },
  { label: 'Shoes', icon: 'Footprints' },
  { label: 'Food', icon: 'UtensilsCrossed' },
  { label: 'Other', icon: 'MoreHorizontal' },
];

const STATS = [
  { label: 'Products', value: '20+ SKUs' },
  { label: 'Min. Order', value: '100 pcs' },
  { label: 'Delivery', value: '3–5 days' },
];

/**
 * Hero section with headline, CTAs, use-case chips,
 * quick stats, and CSS-rendered box composition.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-warm-white via-white to-kraft-muted/30">
      <div className="container-bk py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={staggerChild}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-kraft-muted rounded-full text-sm font-medium text-kraft mb-6"
            >
              <Icon name="Package" size={14} />
              Launching for e-commerce sellers in North India
            </motion.div>

            <motion.h1
              variants={staggerChild}
              className="heading-1 md:heading-display mb-6"
            >
              The right packaging
              <br />
              <span className="text-kraft">for every shipment.</span>
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="text-body-lg max-w-lg mb-8"
            >
              Find the right box, mailer or packaging supply for your business.
              Buy from as little as 100 pieces with transparent bulk pricing.
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="flex flex-wrap gap-3"
            >
              <motion.div {...hoverTap}>
                <Link
                  href="#box-finder"
                  className="btn-accent text-base px-6 py-3.5"
                >
                  Find My Box
                  <Icon name="ArrowRight" size={18} />
                </Link>
              </motion.div>
              <motion.div {...hoverTap}>
                <Link
                  href="/products"
                  className="btn-outline text-base px-6 py-3.5"
                >
                  Browse All Boxes
                </Link>
              </motion.div>
            </motion.div>

            {/* What are you shipping? */}
            <motion.div variants={staggerChild} className="mt-8">
              <p className="text-label mb-3">What are you shipping?</p>
              <div className="flex flex-wrap gap-2">
                {SHIPPING_CATEGORIES.map((cat) => (
                  <a
                    key={cat.label}
                    href="#box-finder"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warm-gray hover:bg-kraft-muted rounded-full text-xs font-medium text-text-secondary hover:text-charcoal transition-colors"
                  >
                    <Icon name={cat.icon} size={12} />
                    {cat.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={staggerChild}
              className="flex gap-8 mt-10 pt-8 border-t border-border"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="heading-3">{stat.value}</p>
                  <p className="text-body-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
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
                transition={{ delay: 0.4, duration: duration.slow }}
                className="absolute bottom-14 left-10 w-48 h-40"
              >
                <img
                  src="/images/box-large.svg"
                  alt="Large Box"
                  className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply"
                />
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
                transition={{ delay: 0.5, duration: duration.slow }}
                className="absolute bottom-26 right-14 w-36 h-32"
              >
                <img
                  src="/images/box-medium.svg"
                  alt="Medium Box"
                  className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply"
                />
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
                transition={{ delay: 0.6, duration: duration.slow }}
                className="absolute top-18 right-22 w-28 h-24"
              >
                <img
                  src="/images/box-small.svg"
                  alt="Small Box"
                  className="w-full h-full object-contain drop-shadow-lg mix-blend-multiply"
                />
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
                transition={{ delay: 0.7, duration: duration.slow }}
                className="absolute top-30 left-6 w-28 h-28"
              >
                <img
                  src="/images/courier-bag-m.svg"
                  alt="Courier Bag"
                  className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
                />
              </motion.div>

              {/* Tape */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: duration.normal }}
                className="absolute bottom-6 right-6 w-24 h-24"
              >
                <img
                  src="/images/bopp-tape.svg"
                  alt="Packing Tape"
                  className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
                />
              </motion.div>

              {/* Bubble Wrap */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: duration.normal }}
                className="absolute top-6 left-22 w-28 h-28"
              >
                <img
                  src="/images/bubble-wrap.svg"
                  alt="Bubble Wrap"
                  className="w-full h-full object-contain opacity-60 mix-blend-multiply"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
