'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function AdminRFQsPage() {
  const [rfqs, setRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRFQs() {
      try {
        const data = await adminApi.getRfqs();
        const formattedRfqs = data.map((rfq) => ({
          id: rfq.rfqNumber || rfq.id,
          customer: rfq.user
            ? `${rfq.user.firstName || ''} ${rfq.user.lastName || ''}`.trim()
            : 'Guest',
          product: rfq.packagingType || 'Custom Box',
          quantity: rfq.requiredQuantity || 0,
          date: new Date(rfq.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          status: rfq.status || 'NEW',
          rawId: rfq.id,
        }));
        setRfqs(formattedRfqs);
      } catch (error) {
        console.error('Failed to load RFQs', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadRFQs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Incoming RFQs</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Icon name="Search" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by RFQ ID or Customer..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400"
            />
          </div>
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-gray-400">
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="QUOTED">Quoted</option>
            <option value="ACCEPTED">Accepted</option>
          </select>
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
                  <th className="px-6 py-4 font-medium">RFQ ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Product Requested</th>
                  <th className="px-6 py-4 font-medium">Qty</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rfqs.map((rfq) => (
                  <tr
                    key={rfq.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {rfq.id}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{rfq.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{rfq.product}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {rfq.quantity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{rfq.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          rfq.status === 'NEW'
                            ? 'bg-blue-100 text-blue-800'
                            : rfq.status === 'IN_REVIEW'
                              ? 'bg-amber-100 text-amber-800'
                              : rfq.status === 'QUOTED'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {rfq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/rfqs/${rfq.rawId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Review
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
