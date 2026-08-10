'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

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

export default function OrdersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Order History
        </h1>
      </div>

      <div className="card-bk overflow-hidden">
        <div className="divide-y divide-[#e8e4de]">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-white border border-[#e8e4de] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon
                    name={order.statusIcon}
                    size={20}
                    className={order.statusColor}
                  />
                </div>
                <div>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="font-medium text-lg text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors"
                  >
                    Order #{order.id}
                  </Link>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                    {order.items}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                    Placed on {order.date}
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-[#e8e4de] pt-4 sm:pt-0 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <p className="font-bold text-[var(--color-charcoal)] text-lg">
                    {order.total}
                  </p>
                  <p className={`text-sm font-medium ${order.statusColor}`}>
                    {order.status}
                  </p>
                </div>
                <div className="flex gap-2 sm:mt-3">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="btn-outline text-xs px-3 py-1.5 h-8"
                  >
                    Details
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn-accent text-xs px-3 py-1.5 h-8 flex items-center"
                  >
                    <Icon name="RefreshCw" size={12} className="mr-1.5" />
                    Reorder
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
