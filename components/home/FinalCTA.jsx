'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

/**
 * Strong closing CTA section before the footer.
 */
export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-charcoal to-charcoal-light text-white">
      <div className="container-bk text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="Package" size={28} className="text-kraft-light" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to simplify your packaging?
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Tell us what you&apos;re shipping. We&apos;ll help you find the
            right packaging at the right price, delivered fast.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#box-finder"
                className="inline-flex items-center gap-2 bg-white text-charcoal font-semibold px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Find My Box
                <Icon name="ArrowRight" size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Browse Products
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
