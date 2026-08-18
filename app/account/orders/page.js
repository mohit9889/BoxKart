'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { ordersApi } from '@/lib/api/orders';
import { Skeleton } from '@/components/ui';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getOrders({ limit: 50 }); // Fetch up to 50 for MVP
        setOrders(response.data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
          {loading ? (
            <div className="p-5 sm:p-6 space-y-4">
              <Skeleton variant="text" height="60px" />
              <Skeleton variant="text" height="60px" />
              <Skeleton variant="text" height="60px" />
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
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
                      Order #{order.orderNumber || order.id}
                    </Link>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                      {order.itemsSummary}
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
                    {['DELIVERED', 'SHIPPED'].includes(order.rawStatus) && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="btn-accent text-xs px-3 py-1.5 h-8 flex items-center"
                      >
                        <Icon name="RefreshCw" size={12} className="mr-1.5" />
                        Reorder
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-[var(--color-text-secondary)]">
              <p>No orders found.</p>
              <Link
                href="/products"
                className="text-[var(--color-kraft)] hover:underline mt-2 inline-block"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
