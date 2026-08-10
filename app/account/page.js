'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

const MOCK_ORDERS = [
  {
    id: 'PK1023',
    date: '14 Jul 2026',
    items: '1,000 × Medium Shipping Box (8×6×4")',
    total: '₹9,200',
    status: 'Delivered',
    statusColor: 'text-[var(--color-accent)]',
    statusIcon: 'CheckCircle',
  },
  {
    id: 'PK1019',
    date: '28 Jun 2026',
    items: '500 × Courier Bag (Medium)',
    total: '₹2,000',
    status: 'Delivered',
    statusColor: 'text-[var(--color-accent)]',
    statusIcon: 'CheckCircle',
  },
  {
    id: 'PK1032',
    date: '5 Aug 2026',
    items: '500 × Standard Shipping Box (10×8×4")',
    total: '₹5,600',
    status: 'In Transit',
    statusColor: 'text-[var(--color-info)]',
    statusIcon: 'Truck',
  },
];

export default function AccountOverviewPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-bk p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-[var(--color-charcoal)]">3</p>
        </div>
        <div className="card-bk p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Total Spent
          </p>
          <p className="text-2xl font-bold text-[var(--color-charcoal)]">
            ₹16,800
          </p>
        </div>
        <div className="card-bk p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Pending Quotes
          </p>
          <p className="text-2xl font-bold text-[var(--color-charcoal)]">1</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card-bk p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[var(--color-charcoal)]">
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="text-sm text-[var(--color-kraft)] hover:text-[var(--color-kraft-light)] transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {MOCK_ORDERS.slice(0, 2).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b border-[#e8e4de] last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-kraft-muted)] rounded-xl flex items-center justify-center">
                  <Icon
                    name="Package"
                    size={18}
                    className="text-[var(--color-kraft)]"
                  />
                </div>
                <div>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                  >
                    #{order.id}
                  </Link>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {order.items}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[var(--color-charcoal)] text-sm">
                  {order.total}
                </p>
                <p className={`text-xs font-medium ${order.statusColor}`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Reorder */}
      <div className="card-bk p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Clock" size={18} className="text-[var(--color-kraft)]" />
          <h2 className="font-bold text-[var(--color-charcoal)]">
            Recommended Reorders
          </h2>
        </div>
        <div className="bg-[#faf8f5] border border-[#e8e4de] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg border border-[#e8e4de] flex items-center justify-center shrink-0">
              <Icon
                name="Package"
                size={24}
                className="text-[var(--color-text-secondary)]"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-charcoal)]">
                Medium Shipping Box (8×6×4&quot;)
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                1,000 pcs · Last ordered 24 days ago
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn-accent text-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 w-full sm:w-auto"
          >
            <Icon name="RefreshCw" size={14} />
            Reorder
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
