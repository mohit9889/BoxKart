'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RFQDetailsPage() {
  const params = useParams();
  const rfqId = params.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/account/rfqs"
            className="w-10 h-10 bg-white border border-[#e8e4de] rounded-xl flex items-center justify-center hover:bg-[#faf8f5] transition-colors shadow-sm"
          >
            <Icon
              name="ArrowLeft"
              size={20}
              className="text-[var(--color-charcoal)]"
            />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-charcoal)] flex items-center gap-2">
              Request #{rfqId}
              <span className="badge badge-info text-sm ml-2">
                Quote Pending
              </span>
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Submitted on August 10, 2026
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4">
              Product Requirements
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4 border-b border-[#e8e4de]">
                <div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Packaging Type
                  </p>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    Corrugated Box
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Dimensions (L×W×H)
                  </p>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    12 × 10 × 6 inch
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Quantity Required
                  </p>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    5,000 pcs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4 border-b border-[#e8e4de]">
                <div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Material
                  </p>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    Kraft Paper
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Thickness
                  </p>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    3 Ply
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Printing
                  </p>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    2 Colors (Outside)
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-tertiary)] mb-1">
                  Additional Notes
                </p>
                <div className="bg-[#faf8f5] p-3 rounded-lg text-sm text-[var(--color-text-secondary)] border border-[#e8e4de]">
                  Need a matte finish if possible. Artwork files will be shared
                  upon quote approval. Looking for delivery by end of August.
                </div>
              </div>
            </div>
          </div>

          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
              <Icon
                name="Image"
                size={18}
                className="text-[var(--color-kraft)]"
              />
              Attached Files
            </h2>
            <div className="flex items-center justify-between p-3 border border-[#e8e4de] rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded text-blue-600 flex items-center justify-center">
                  <Icon name="FileText" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-charcoal)]">
                    logo_reference.pdf
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    1.2 MB
                  </p>
                </div>
              </div>
              <button className="text-[var(--color-kraft)] hover:text-[var(--color-kraft-light)] p-2">
                <Icon name="Download" size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-bk p-6 bg-[#faf8f5] border-[var(--color-kraft-muted)]">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-2">
              What happens next?
            </h2>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-3 relative">
              <li className="flex gap-2">
                <Icon
                  name="CheckCircle"
                  size={16}
                  className="text-[var(--color-accent)] shrink-0 mt-0.5"
                />
                <span>Your request has been received.</span>
              </li>
              <li className="flex gap-2">
                <Icon
                  name="Clock"
                  size={16}
                  className="text-[var(--color-info)] shrink-0 mt-0.5"
                />
                <span>
                  Our team is reviewing the specifications (1-2 business days).
                </span>
              </li>
              <li className="flex gap-2 opacity-50">
                <Icon name="FileText" size={16} className="shrink-0 mt-0.5" />
                <span>
                  You will receive a detailed Quote with pricing and timelines
                  in the Quotes tab.
                </span>
              </li>
            </ul>
          </div>

          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
              <Icon
                name="MapPin"
                size={18}
                className="text-[var(--color-kraft)]"
              />
              Target Delivery Pincode
            </h2>
            <div className="text-sm text-[var(--color-text-secondary)]">
              <p className="text-2xl font-bold text-[var(--color-charcoal)] mb-1">
                400001
              </p>
              <p>Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
