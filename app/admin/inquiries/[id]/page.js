'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminInquiryService } from '@/services/admin/inquiry.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'CLOSED'];

const STATUS_COLORS = {
  NEW: 'bg-blue-50 text-blue-700 border-blue-200',
  CONTACTED: 'bg-amber-50 text-amber-700 border-amber-200',
  CLOSED: 'bg-gray-50 text-gray-500 border-gray-200',
};

export default function AdminInquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [inquiry, setInquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    adminInquiryService
      .getInquiry(id)
      .then(setInquiry)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === inquiry?.status) return;
    setIsUpdating(true);
    try {
      const updated = await adminInquiryService.updateStatus(id, newStatus);
      setInquiry((prev) => ({ ...prev, status: updated.status }));
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Icon name="Loader2" size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">{error || 'Inquiry not found.'}</p>
        <Link
          href="/admin/inquiries"
          className="text-blue-600 text-sm font-semibold"
        >
          ← Back to Inquiries
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <Link
        href="/admin/inquiries"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <Icon name="ArrowLeft" size={14} />
        Back to Inquiries
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{inquiry.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Submitted{' '}
            {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Status selector */}
        <div className="flex items-center gap-2">
          {isUpdating && (
            <Icon
              name="Loader2"
              size={16}
              className="animate-spin text-gray-400"
            />
          )}
          <select
            value={inquiry.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border outline-none cursor-pointer disabled:opacity-60 ${STATUS_COLORS[inquiry.status]}`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detail Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Contact
          </h2>
          <div className="space-y-3">
            <Row icon="User" label="Name" value={inquiry.name} />
            <Row icon="Building2" label="Business" value={inquiry.business} />
            <Row icon="Phone" label="Phone" value={inquiry.phone} />
            <Row icon="Mail" label="Email" value={inquiry.email} />
            <Row icon="MapPin" label="Location" value={inquiry.location} />
          </div>
        </div>

        {/* Packaging Specs */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Packaging Requirements
          </h2>
          <div className="space-y-3">
            <Row
              icon="Package"
              label="Product Type"
              value={inquiry.productType}
            />
            <Row
              icon="Ruler"
              label="Dimensions"
              value={
                inquiry.length && inquiry.width && inquiry.height
                  ? `${inquiry.length} × ${inquiry.width} × ${inquiry.height} ${inquiry.unit?.toLowerCase()}`
                  : null
              }
            />
            <Row
              icon="Hash"
              label="Quantity"
              value={
                inquiry.quantity
                  ? `${inquiry.quantity.toLocaleString('en-IN')} pcs`
                  : null
              }
            />
            <Row icon="Printer" label="Printing" value={inquiry.printing} />
          </div>
        </div>
      </div>

      {/* Notes */}
      {inquiry.notes && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Notes
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {inquiry.notes}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-3">
        <a
          href={`mailto:${inquiry.email}?subject=Re: Your Custom Packaging Inquiry - BoxKart`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Icon name="Mail" size={14} />
          Reply via Email
        </a>
        <a
          href={`tel:${inquiry.phone}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          <Icon name="Phone" size={14} />
          Call
        </a>
      </div>
    </div>
  );
}

/** Small row helper */
function Row({ icon, label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon name={icon} size={14} className="text-gray-400" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
