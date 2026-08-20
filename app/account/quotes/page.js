'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { quotesApi } from '@/lib/api/quotes';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuotes() {
      try {
        const data = await quotesApi.getQuotes();
        const formatted = data.map((quote) => ({
          id: quote.quoteNumber || quote.id,
          rawId: quote.id,
          rfqId: quote.rfq?.rfqNumber || quote.rfqId,
          date: new Date(quote.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          description: quote.rfq?.packagingType || 'Custom Box',
          amount: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
          }).format(quote.totalAmount || 0),
          validUntil: new Date(
            quote.validUntil || quote.createdAt
          ).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          status:
            quote.status === 'PENDING' ? 'Pending Acceptance' : quote.status,
          statusBadge:
            quote.status === 'PENDING'
              ? 'badge-accent'
              : quote.status === 'ACCEPTED'
                ? 'badge-info'
                : 'badge-neutral',
        }));
        setQuotes(formatted);
      } catch (error) {
        console.error('Failed to load Quotes', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuotes();
  }, []);

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
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Icon
                name="Loader2"
                size={32}
                className="animate-spin text-[var(--color-text-tertiary)]"
              />
            </div>
          ) : (
            quotes.map((quote) => (
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
                        href={`/account/quotes/${quote.rawId}`}
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
                    href={`/account/quotes/${quote.rawId}`}
                    className="btn-accent text-xs px-4 py-1.5 h-8"
                  >
                    View & Action
                  </Link>
                </div>
              </div>
            ))
          )}

          {!isLoading && quotes.length === 0 && (
            <div className="p-12 text-center text-[var(--color-text-secondary)]">
              <Icon
                name="FileText"
                size={48}
                className="mx-auto text-[var(--color-text-tertiary)] mb-4"
              />
              <p className="text-lg font-medium text-[var(--color-charcoal)] mb-2">
                No Quotes found
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
