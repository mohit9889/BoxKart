'use client';

import { motion } from 'motion/react';
import { RefreshCw, Clock, Package } from 'lucide-react';

/**
 * Reorder section — shows mock previous order with one-click reorder.
 */
export default function ReorderSection() {
  return (
    <section className="section-padding">
      <div className="container-bk">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-bk p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-kraft" />
              <h2 className="text-xl font-bold text-charcoal">Running low?</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
              You may be running low based on your previous order.
            </p>

            <div className="bg-warm-gray rounded-xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-kraft-muted rounded-xl flex items-center justify-center shrink-0">
                  <Package size={24} className="text-kraft" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-charcoal">
                    10 × 8 × 4&quot; Corrugated Box
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    1,000 pieces · 3-Ply · Brown Kraft
                  </p>
                  <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    Ordered 24 days ago
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-charcoal">₹9,200</p>
                  <p className="text-xs text-text-tertiary">₹9.20/pc</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-accent w-full flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Reorder 1,000 pieces
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
