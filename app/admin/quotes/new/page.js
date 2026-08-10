'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { adminQuoteService } from '@/services/admin/quote.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

function NewQuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rfqId = searchParams.get('rfqId') || '';

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    rfqId: rfqId,
    customer: 'Tech Store', // Hardcoded mock for now
    amount: '',
    expiry: '',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await adminQuoteService.createQuote(formData);
      router.push('/admin/quotes');
    } catch (error) {
      console.error('Error saving quote', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/rfqs/${rfqId}`}
          className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="ArrowLeft" size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Quote</h1>
          <p className="text-sm text-gray-500 mt-1">For RFQ: {rfqId}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">Quote Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="customer"
                className="text-sm font-medium text-gray-700"
              >
                Customer
              </label>
              <input
                id="customer"
                required
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-gray-700"
              >
                Total Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 font-medium">
                  ₹
                </span>
                <input
                  id="amount"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: `₹${e.target.value.replace(/[^0-9,.]/g, '')}`,
                    })
                  }
                  type="text"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expiry"
                className="text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                id="expiry"
                required
                value={formData.expiry}
                onChange={(e) =>
                  setFormData({ ...formData, expiry: e.target.value })
                }
                type="date"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Link
            href={`/admin/rfqs/${rfqId}`}
            className="px-6 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />{' '}
                Generating...
              </>
            ) : (
              'Send Quote to Customer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <Icon
            name="Loader2"
            size={32}
            className="animate-spin text-gray-400"
          />
        </div>
      }
    >
      <NewQuoteForm />
    </Suspense>
  );
}
