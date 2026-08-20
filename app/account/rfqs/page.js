'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { rfqApi } from '@/lib/api/rfq';

export default function RFQsPage() {
  const [rfqs, setRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRfqs() {
      try {
        const data = await rfqApi.getRFQs();
        const formatted = data.map((rfq) => ({
          id: rfq.rfqNumber || rfq.id,
          rawId: rfq.id,
          date: new Date(rfq.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          product: rfq.packagingType || 'Custom Box',
          quantity: `${rfq.requiredQuantity?.toLocaleString() || 0} pcs`,
          status:
            rfq.status === 'NEW'
              ? 'Quote Pending'
              : rfq.status === 'IN_REVIEW'
                ? 'In Review'
                : rfq.status === 'QUOTED'
                  ? 'Quoted'
                  : rfq.status,
          statusBadge:
            rfq.status === 'NEW'
              ? 'badge-info'
              : rfq.status === 'QUOTED'
                ? 'badge-accent'
                : 'badge-neutral',
        }));
        setRfqs(formatted);
      } catch (error) {
        console.error('Failed to load RFQs', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadRfqs();
  }, []);

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
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Icon
                name="Loader2"
                size={32}
                className="animate-spin text-[var(--color-text-tertiary)]"
              />
            </div>
          ) : (
            rfqs.map((rfq) => (
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
                      href={`/account/rfqs/${rfq.rawId}`}
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
                    href={`/account/rfqs/${rfq.rawId}`}
                    className="btn-outline text-xs px-3 py-1.5 h-8"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}

          {!isLoading && rfqs.length === 0 && (
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
