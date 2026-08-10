'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-24">
      <div className="container-bk max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2rem] border border-[#e8e4de] shadow-lg overflow-hidden"
        >
          {/* Header Area */}
          <div className="bg-[var(--color-charcoal)] text-white text-center py-16 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="w-24 h-24 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(22,163,74,0.3)] relative z-10"
            >
              <Icon name="Check" size={48} className="text-white" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
              Order Placed Successfully!
            </h1>
            <p className="text-white/70 text-lg relative z-10">
              Thank you for choosing BoxKart. We&apos;ll contact you shortly.
            </p>
          </div>

          {/* Details Area */}
          <div className="p-8 md:p-12 space-y-10">
            {/* Order Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#faf8f5] rounded-2xl border border-[#e8e4de]">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium uppercase tracking-wider mb-1">
                  Order Number
                </p>
                <p className="text-xl font-bold text-[var(--color-charcoal)]">
                  #BK-10021
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <p className="text-sm text-[var(--color-text-secondary)] font-medium uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-lg font-semibold text-[var(--color-charcoal)]">
                  August 10, 2026
                </p>
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
                  <Icon
                    name="User"
                    size={20}
                    className="text-[var(--color-kraft)]"
                  />
                  Delivery Details
                </h3>
                <div className="space-y-2 text-[var(--color-text-secondary)]">
                  <p className="font-semibold text-[var(--color-charcoal)]">
                    Mohit Rajput
                  </p>
                  <p>Acme Corp Logistics</p>
                  <p>123 Industrial Area, Phase 1</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p className="pt-2 flex items-center gap-2">
                    <Icon name="Phone" size={16} /> +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
                  <Icon
                    name="Package"
                    size={20}
                    className="text-[var(--color-kraft)]"
                  />
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-[#e8e4de]">
                    <div>
                      <p className="font-medium text-[var(--color-charcoal)]">
                        Medium Shipping Box
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        10 × 8 × 4&quot; • Qty: 100
                      </p>
                    </div>
                    <p className="font-semibold">₹1,400</p>
                  </div>
                  <div className="flex justify-between items-start pb-4 border-b border-[#e8e4de]">
                    <div>
                      <p className="font-medium text-[var(--color-charcoal)]">
                        Large Courier Bag
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        12 × 16&quot; • Qty: 500
                      </p>
                    </div>
                    <p className="font-semibold">₹2,500</p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <p className="font-bold text-[var(--color-charcoal)]">
                      Total Paid
                    </p>
                    <p className="text-xl font-bold text-[var(--color-charcoal)]">
                      ₹3,900
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Icon name="Info" size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">
                  What happens next?
                </h4>
                <p className="text-blue-800/80 text-sm leading-relaxed">
                  We have received your order and are currently processing it.
                  You will receive an email confirmation shortly. Once your
                  items are dispatched, we will send you tracking information
                  via SMS and email.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#e8e4de]">
              <Link
                href="/account"
                className="flex-1 py-4 bg-[var(--color-charcoal)] text-white text-center font-semibold rounded-xl hover:bg-black transition-colors"
              >
                View My Account
              </Link>
              <Link
                href="/products"
                className="flex-1 py-4 bg-white text-[var(--color-charcoal)] text-center font-semibold rounded-xl border border-[#e8e4de] hover:bg-[#faf8f5] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
