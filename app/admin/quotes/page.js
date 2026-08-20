'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuotes() {
      try {
        const data = await adminApi.getQuotes();
        const formattedQuotes = data.map((quote) => ({
          id: quote.quoteNumber || quote.id,
          rfqId: quote.rfq?.rfqNumber || quote.rfqId,
          customer: quote.rfq?.user
            ? `${quote.rfq.user.firstName || ''} ${quote.rfq.user.lastName || ''}`.trim()
            : 'Guest',
          amount: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
          }).format(quote.totalAmount || 0),
          date: new Date(quote.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          status: quote.status || 'PENDING',
          rawId: quote.id,
        }));
        setQuotes(formattedQuotes);
      } catch (error) {
        console.error('Failed to load quotes', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuotes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Generated Quotes</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Icon name="Search" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by Quote ID or Customer..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Icon
              name="Loader2"
              size={32}
              className="animate-spin text-gray-400"
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Quote ID</th>
                  <th className="px-6 py-4 font-medium">RFQ Ref</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {quote.id}
                    </td>
                    <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">
                      <Link href={`/admin/rfqs/${quote.rfqId}`}>
                        {quote.rfqId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {quote.customer}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {quote.amount}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{quote.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          quote.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800'
                            : quote.status === 'ACCEPTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/quotes/${quote.rawId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
