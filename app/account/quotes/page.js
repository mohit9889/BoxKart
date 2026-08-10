'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

const MOCK_QUOTES = [
  {
    id: 'Q-204',
    rfqId: 'RFQ-1001',
    date: '26 Jul 2026',
    description: 'Standard Shipping Box (10×8×4") - 10,000 pcs',
    amount: '₹1,05,000',
    validUntil: '10 Aug 2026',
    status: 'Pending Acceptance',
    statusBadge: 'badge-accent',
  },
  {
    id: 'Q-192',
    rfqId: 'RFQ-0985',
    date: '15 Jun 2026',
    description: 'Custom Printed Courier Bags - 5,000 pcs',
    amount: '₹45,000',
    validUntil: '30 Jun 2026',
    status: 'Accepted',
    statusBadge: 'badge-info',
  },
];

export default function QuotesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          My Quotes
        </h1>
      </div>

      <div className="card-bk overflow-hidden">
        <div className="divide-y divide-[#e8e4de]">
          {MOCK_QUOTES.map((quote) => (
            <div
              key={quote.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-white border border-[#e8e4de] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon
                    name="FileText"
                    size={20}
                    className="text-[var(--color-kraft)]"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/account/quotes/${quote.id}`}
                      className="font-bold text-lg text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                    >
                      Quote #{quote.id}
                    </Link>
                    <span className="text-xs text-[var(--color-text-tertiary)] bg-gray-100 px-2 py-0.5 rounded-full">
                      Ref: {quote.rfqId}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-0.5">
                    {quote.description}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                    Valid until {quote.validUntil}
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-[#e8e4de] pt-4 sm:pt-0 w-full sm:w-auto">
                <div className="text-left sm:text-right mb-2">
                  <p className="font-bold text-[var(--color-charcoal)] text-lg">
                    {quote.amount}
                  </p>
                  <span
                    className={`badge ${quote.statusBadge} mt-1 inline-block`}
                  >
                    {quote.status}
                  </span>
                </div>
                <Link
                  href={`/account/quotes/${quote.id}`}
                  className="btn-accent text-xs px-4 py-1.5 h-8"
                >
                  View & Action
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
