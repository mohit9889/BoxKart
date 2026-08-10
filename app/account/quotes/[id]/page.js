'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function QuoteDetailsPage() {
  const params = useParams();
  const quoteId = params.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/account/quotes"
          className="w-10 h-10 bg-white border border-[#e8e4de] rounded-xl flex items-center justify-center hover:bg-[#faf8f5] transition-colors shadow-sm"
        >
          <Icon
            name="ArrowLeft"
            size={20}
            className="text-[var(--color-charcoal)]"
          />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-charcoal)] flex items-center gap-2">
            Quote #{quoteId}
            <span className="badge badge-accent text-sm ml-2">
              Pending Acceptance
            </span>
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Ref: RFQ-1001 • Valid until Aug 10, 2026
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-bk p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[var(--color-charcoal)]">
                Quote Breakdown
              </h2>
              <button className="text-[var(--color-kraft)] hover:text-[var(--color-kraft-light)] text-sm font-medium flex items-center gap-1">
                <Icon name="Download" size={16} /> Download PDF
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[var(--color-text-secondary)] border-b border-[#e8e4de]">
                  <tr>
                    <th className="pb-3 font-medium">Item Description</th>
                    <th className="pb-3 font-medium text-center">Qty</th>
                    <th className="pb-3 font-medium text-right">Unit Price</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e4de]">
                  <tr>
                    <td className="py-4">
                      <p className="font-medium text-[var(--color-charcoal)]">
                        Standard Shipping Box
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        10 × 8 × 4&quot; • 3 Ply corrugated
                      </p>
                    </td>
                    <td className="py-4 text-center">10,000</td>
                    <td className="py-4 text-right">₹10.50</td>
                    <td className="py-4 text-right font-medium text-[var(--color-charcoal)]">
                      ₹1,05,000
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <p className="font-medium text-[var(--color-charcoal)]">
                        Custom Plate Charge (One-time)
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        2 colors
                      </p>
                    </td>
                    <td className="py-4 text-center">1</td>
                    <td className="py-4 text-right">₹2,500.00</td>
                    <td className="py-4 text-right font-medium text-[var(--color-charcoal)]">
                      ₹2,500
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-[#e8e4de] space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Subtotal
                </span>
                <span className="font-medium text-[var(--color-charcoal)]">
                  ₹1,07,500
                </span>
              </div>
              <div className="flex justify-between text-sm text-[var(--color-accent)]">
                <span>Volume Discount (5%)</span>
                <span className="font-medium">-₹5,375</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Estimated Shipping
                </span>
                <span className="font-medium text-[var(--color-charcoal)]">
                  ₹1,500
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  GST (18%)
                </span>
                <span className="font-medium text-[var(--color-charcoal)]">
                  ₹18,652.50
                </span>
              </div>
              <div className="flex justify-between pt-4 mt-2 border-t border-[#e8e4de]">
                <span className="text-lg font-bold text-[var(--color-charcoal)]">
                  Total Quote Amount
                </span>
                <span className="text-xl font-bold text-[var(--color-charcoal)]">
                  ₹1,22,277.50
                </span>
              </div>
            </div>
          </div>

          <div className="card-bk p-6 bg-[#faf8f5] border-[var(--color-kraft-muted)]">
            <h3 className="font-bold text-[var(--color-charcoal)] mb-2 flex items-center gap-2">
              <Icon
                name="Info"
                size={18}
                className="text-[var(--color-kraft)]"
              />
              Terms & Conditions
            </h3>
            <ul className="text-xs text-[var(--color-text-secondary)] space-y-2 list-disc pl-5">
              <li>Prices are valid until August 10, 2026.</li>
              <li>
                Production lead time is 7-10 business days from artwork
                approval.
              </li>
              <li>
                50% advance payment required to process the order, remaining 50%
                before dispatch.
              </li>
              <li>
                Actual shipping charges may vary slightly based on final
                volumetric weight.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4">
              Action Required
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Please review the quote details. If everything looks good, accept
              the quote to proceed with the order generation and payment.
            </p>
            <div className="space-y-3">
              <button className="btn-primary w-full py-3">
                <Icon name="Check" size={18} />
                Accept Quote
              </button>
              <button className="btn-outline w-full py-3 text-[var(--color-danger)] border-[#e8e4de] hover:bg-[var(--color-danger-light)] hover:border-[var(--color-danger-light)]">
                <Icon name="X" size={18} />
                Reject or Request Changes
              </button>
            </div>
          </div>

          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4">
              Contact Admin
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Have questions about this quote? Speak to your account manager.
            </p>
            <div className="flex items-center gap-3 p-3 bg-white border border-[#e8e4de] rounded-xl">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <Icon name="User" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-charcoal)]">
                  Sales Support
                </p>
                <a
                  href="mailto:sales@boxkart.in"
                  className="text-xs text-[var(--color-kraft)] hover:underline"
                >
                  sales@boxkart.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
