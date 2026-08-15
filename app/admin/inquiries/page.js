'use client';

import { useState, useEffect, startTransition } from 'react';
import { adminInquiryService } from '@/services/admin/inquiry.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

const STATUS_COLORS = {
  NEW: 'bg-blue-50 text-blue-700 border-blue-200',
  CONTACTED: 'bg-amber-50 text-amber-700 border-amber-200',
  CLOSED: 'bg-gray-50 text-gray-500 border-gray-200',
};

const STATUS_OPTIONS = ['ALL', 'NEW', 'CONTACTED', 'CLOSED'];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    startTransition(() => setIsLoading(true));
    adminInquiryService
      .getInquiries({
        page,
        limit: 20,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
      })
      .then((result) => {
        if (cancelled) return;
        startTransition(() => {
          setInquiries(result.data);
          setMeta(result.meta);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.error('Failed to load inquiries:', err);
        if (!cancelled) startTransition(() => setIsLoading(false));
      });
    return () => {
      cancelled = true;
    };
  }, [page, statusFilter]);

  // Client-side search filter
  const filtered = search.trim()
    ? inquiries.filter((inq) =>
        `${inq.name} ${inq.email} ${inq.phone} ${inq.business ?? ''}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : inquiries;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Custom Packaging Inquiries
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Guest form submissions from the home page
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full">
            {meta.total} total
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Icon name="Search" size={16} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-gray-400"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'ALL' ? 'All Statuses' : s}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Icon
              name="Loader2"
              size={32}
              className="animate-spin text-gray-400"
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Icon name="Inbox" size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/30">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Business
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Product / Qty
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{inq.name}</p>
                      <p className="text-gray-400 text-xs">{inq.email}</p>
                      <p className="text-gray-400 text-xs">{inq.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {inq.business || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <p>{inq.productType || '—'}</p>
                      <p className="text-xs text-gray-400">
                        {inq.quantity?.toLocaleString('en-IN')} pcs ·{' '}
                        {inq.printing}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {inq.location || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[inq.status] ?? STATUS_COLORS.NEW}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Page {meta.page} of {meta.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
