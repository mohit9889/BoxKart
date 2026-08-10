'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

const MOCK_RFQS = [
  {
    id: 'RFQ-1002',
    date: '10 Aug 2026',
    product: 'Custom Printed Shipper',
    quantity: '5,000 pcs',
    status: 'Quote Pending',
    statusBadge: 'badge-info',
  },
  {
    id: 'RFQ-1001',
    date: '25 Jul 2026',
    product: 'Standard Shipping Box (10×8×4")',
    quantity: '10,000 pcs',
    status: 'Quoted',
    statusBadge: 'badge-accent',
  },
];

export default function RFQsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Custom Packaging RFQs
        </h1>
        <Link
          href="/custom-packaging"
          className="btn-primary shrink-0 w-full sm:w-auto"
        >
          <Icon name="Plus" size={18} />
          New Custom Request
        </Link>
      </div>

      <div className="card-bk overflow-hidden">
        <div className="divide-y divide-[#e8e4de]">
          {MOCK_RFQS.map((rfq) => (
            <div
              key={rfq.id}
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
                  <Link
                    href={`/account/rfqs/${rfq.id}`}
                    className="font-medium text-lg text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                  >
                    Request #{rfq.id}
                  </Link>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-0.5">
                    {rfq.product}{' '}
                    <span className="font-normal">— {rfq.quantity}</span>
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                    Submitted on {rfq.date}
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-[#e8e4de] pt-4 sm:pt-0 w-full sm:w-auto">
                <span className={`badge ${rfq.statusBadge} mb-2`}>
                  {rfq.status}
                </span>
                <Link
                  href={`/account/rfqs/${rfq.id}`}
                  className="btn-outline text-xs px-3 py-1.5 h-8"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

          {MOCK_RFQS.length === 0 && (
            <div className="p-12 text-center text-[var(--color-text-secondary)]">
              <Icon
                name="FileText"
                size={48}
                className="mx-auto text-[var(--color-text-tertiary)] mb-4"
              />
              <p className="text-lg font-medium text-[var(--color-charcoal)] mb-2">
                No active requests
              </p>
              <p>
                You haven&apos;t submitted any custom packaging requests yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
