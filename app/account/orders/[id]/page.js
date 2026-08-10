'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/account/orders"
          className="w-10 h-10 bg-white border border-[#e8e4de] rounded-xl flex items-center justify-center hover:bg-[#faf8f5] transition-colors shadow-sm"
        >
          <Icon
            name="ArrowLeft"
            size={20}
            className="text-[var(--color-charcoal)]"
          />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
            Order #{orderId}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Placed on August 5, 2026
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Tracking Timeline */}
          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-6">
              Tracking Status
            </h2>
            <div className="relative">
              {/* Vertical line connecting nodes */}
              <div className="absolute top-2 bottom-6 left-3 w-0.5 bg-[#e8e4de] -z-10"></div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                  <div className="-mt-1.5">
                    <p className="font-semibold text-[var(--color-charcoal)]">
                      Order Placed
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Aug 5, 10:00 AM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                  <div className="-mt-1.5">
                    <p className="font-semibold text-[var(--color-charcoal)]">
                      Processing
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Aug 5, 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-info)] flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
                    <Icon name="Truck" size={12} className="text-white" />
                  </div>
                  <div className="-mt-1.5">
                    <p className="font-semibold text-[var(--color-info)]">
                      Shipped
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Aug 6, 09:00 AM - AWB: 1928374650
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-[#e8e4de] shrink-0 shadow-[0_0_0_4px_white]"></div>
                  <div className="-mt-1">
                    <p className="font-semibold text-[var(--color-charcoal)]">
                      Delivered
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Expected Aug 8
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4">
              Items
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 py-4 border-b border-[#e8e4de] last:border-0 last:pb-0">
                <div className="w-20 h-20 bg-[#faf8f5] rounded-xl border border-[#e8e4de] flex items-center justify-center shrink-0">
                  <Icon
                    name="Package"
                    size={32}
                    className="text-[var(--color-kraft)]"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)]">
                      Standard Shipping Box
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      10 × 8 × 4&quot; • 3 Ply corrugated
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium">Qty: 500</p>
                    <p className="font-bold">₹5,600</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="btn-accent w-full sm:w-auto">
                <Icon name="RefreshCw" size={16} /> Reorder All Items
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
              <Icon
                name="MapPin"
                size={20}
                className="text-[var(--color-kraft)]"
              />
              Delivery Address
            </h2>
            <div className="text-sm text-[var(--color-text-secondary)] space-y-1">
              <p className="font-medium text-[var(--color-charcoal)]">
                Mohit Rajput
              </p>
              <p>Acme Corp Logistics</p>
              <p>123 Industrial Area, Phase 1</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p className="pt-2 flex items-center gap-2">
                <Icon name="Phone" size={14} /> +91 98765 43210
              </p>
            </div>
          </div>

          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
              <Icon
                name="FileText"
                size={20}
                className="text-[var(--color-kraft)]"
              />
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">
                  Subtotal
                </span>
                <span className="font-medium">₹5,600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">
                  Shipping
                </span>
                <span className="font-medium">₹400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">
                  GST (18%)
                </span>
                <span className="font-medium">₹1,080</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#e8e4de] text-base">
                <span className="font-bold text-[var(--color-charcoal)]">
                  Total Paid
                </span>
                <span className="font-bold text-[var(--color-charcoal)]">
                  ₹7,080
                </span>
              </div>
              <div className="pt-4 flex flex-col gap-2">
                <button className="btn-outline w-full text-sm py-2">
                  <Icon name="Download" size={16} /> Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
