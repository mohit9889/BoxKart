'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminRFQService } from '@/services/admin/rfq.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function AdminRFQDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const rfqId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [rfq, setRfq] = useState(null);

  useEffect(() => {
    async function fetchRFQ() {
      try {
        const data = await adminRFQService.getRFQById(rfqId);
        setRfq(data);

        // Auto-update status to IN_REVIEW if it was NEW
        if (data.status === 'NEW') {
          await adminRFQService.updateRFQStatus(rfqId, 'IN_REVIEW');
          setRfq((prev) => ({ ...prev, status: 'IN_REVIEW' }));
        }
      } catch (error) {
        console.error('Error fetching RFQ', error);
        router.push('/admin/rfqs');
      } finally {
        setIsLoading(false);
      }
    }
    fetchRFQ();
  }, [rfqId, router]);

  if (isLoading || !rfq) {
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
            href="/admin/rfqs"
            className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Icon name="ArrowLeft" size={20} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                RFQ #{rfq.id}
              </h1>
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
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Submitted on {rfq.date}
            </p>
          </div>
        </div>

        {rfq.status !== 'QUOTED' && rfq.status !== 'ACCEPTED' && (
          <Link
            href={`/admin/quotes/new?rfqId=${rfq.id}`}
            className="bg-[#1a1a1a] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Icon name="FileText" size={16} />
            Generate Quote
          </Link>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-6">
              Product Requirements
            </h2>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Product Type</p>
                <p className="font-medium text-gray-900">{rfq.product}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Quantity Requested</p>
                <p className="font-medium text-gray-900">
                  {rfq.quantity.toLocaleString()} pcs
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Material</p>
                <p className="font-medium text-gray-900">
                  {rfq.requirements?.material}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Thickness (Ply)</p>
                <p className="font-medium text-gray-900">
                  {rfq.requirements?.ply}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                <p className="font-medium text-gray-900">
                  {rfq.requirements?.dimensions}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Printing Required</p>
                <p className="font-medium text-gray-900">
                  {rfq.requirements?.printing}
                </p>
              </div>
            </div>

            {rfq.requirements?.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Additional Notes</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700">
                  {rfq.requirements.notes}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="Image" size={18} className="text-gray-500" />
              Attached Assets
            </h2>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded shadow-sm flex items-center justify-center text-blue-600">
                  <Icon name="FileText" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    logo_reference.pdf
                  </p>
                  <p className="text-xs text-gray-500">1.2 MB</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 p-2">
                Download
              </button>
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
                <p className="font-medium text-gray-900">{rfq.customer}</p>
              </div>
              <div>
                <p className="text-gray-500">Contact Person</p>
                <p className="font-medium text-gray-900">
                  {rfq.customerDetails?.name}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <a
                  href={`mailto:${rfq.customerDetails?.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {rfq.customerDetails?.email}
                </a>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {rfq.customerDetails?.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={18} className="text-gray-500" />
              Delivery Location
            </h2>
            <div className="space-y-1 text-sm text-gray-700">
              <p className="text-xl font-bold text-gray-900 mb-1">
                {rfq.delivery?.pincode}
              </p>
              <p>
                {rfq.delivery?.city}, {rfq.delivery?.state}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
