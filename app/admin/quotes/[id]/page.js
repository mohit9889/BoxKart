'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminQuoteService } from '@/services/admin/quote.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function AdminQuoteDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const quoteId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const data = await adminQuoteService.getQuoteById(quoteId);
        setQuote(data);
      } catch (error) {
        console.error('Error fetching Quote', error);
        router.push('/admin/quotes');
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuote();
  }, [quoteId, router]);

  if (isLoading || !quote) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="Loader2" size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotes"
            className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Icon name="ArrowLeft" size={20} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Quote #{quote.id}
              </h1>
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
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Generated on {quote.date} • Valid until {quote.expiry}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900">Quote Line Items</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium text-center">Qty</th>
                    <th className="pb-3 font-medium text-right">Unit Price</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quote.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <p className="font-medium text-gray-900">
                          {item.description}
                        </p>
                      </td>
                      <td className="py-4 text-center">{item.quantity}</td>
                      <td className="py-4 text-right">
                        ₹{item.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-medium text-gray-900">
                        ₹{item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ₹{quote.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">
                  ₹{quote.shipping.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (18%)</span>
                <span className="font-medium text-gray-900">
                  ₹{quote.tax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-4 mt-2 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{quote.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="User" size={18} className="text-gray-500" />
              Customer Details
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Company</p>
                <p className="font-medium text-gray-900">{quote.customer}</p>
              </div>
              <div>
                <p className="text-gray-500">RFQ Reference</p>
                <Link
                  href={`/admin/rfqs/${quote.rfqId}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {quote.rfqId}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-2">Internal Notes</h2>
            <p className="text-sm text-gray-600">{quote.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
