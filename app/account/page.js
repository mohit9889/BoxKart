'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Icon from '@/components/common/Icon';
import { ordersApi } from '@/lib/api/orders';
import { Skeleton } from '@/components/ui';

export default function AccountOverviewPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, totalSpent: '₹0' });
  const [recommendedReorder, setRecommendedReorder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getOrders({ limit: 10 }); // fetch more to calculate stats
        const fetchedOrders = response.data || [];
        setOrders(fetchedOrders);

        // Calculate basic stats
        const total = fetchedOrders.reduce(
          (sum, order) => sum + (order.totalMinor || 0),
          0
        );
        setStats({
          totalOrders: response.meta?.total || fetchedOrders.length,
          totalSpent: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
          }).format(total / 100),
        });

        if (
          fetchedOrders.length > 0 &&
          fetchedOrders[0].items &&
          fetchedOrders[0].items.length > 0
        ) {
          const firstOrder = fetchedOrders[0];
          const firstItem = firstOrder.items[0];

          const orderDate = firstOrder.createdAt
            ? new Date(firstOrder.createdAt)
            : new Date();
          const diffTime = Math.abs(new Date() - orderDate);
          const diffDays = Math.max(
            0,
            Math.floor(diffTime / (1000 * 60 * 60 * 24))
          );

          setRecommendedReorder({
            name: firstItem.nameSnapshot || 'Product',
            quantity: firstItem.quantity,
            daysAgo: diffDays,
            productId: firstItem.productId,
          });
        }
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
      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-bk p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-[var(--color-charcoal)]">
            {loading ? (
              <Skeleton variant="text" width="40px" />
            ) : (
              stats.totalOrders
            )}
          </p>
        </div>
        <div className="card-bk p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Total Spent
          </p>
          <p className="text-2xl font-bold text-[var(--color-charcoal)]">
            {loading ? (
              <Skeleton variant="text" width="80px" />
            ) : (
              stats.totalSpent
            )}
          </p>
        </div>
        <div className="card-bk p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Pending Quotes
          </p>
          <p className="text-2xl font-bold text-[var(--color-charcoal)]">0</p>
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
          {loading ? (
            <div className="space-y-4 py-2">
              <Skeleton variant="text" height="40px" />
              <Skeleton variant="text" height="40px" />
            </div>
          ) : orders.length > 0 ? (
            orders.slice(0, 2).map((order) => (
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
                      #{order.orderNumber || order.id}
                    </Link>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {order.itemsSummary}
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
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)] py-4 text-center">
              No orders yet.
            </p>
          )}
        </div>
      </div>

      {/* Recommended Reorder */}
      {!loading && recommendedReorder && (
        <div className="card-bk p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon
              name="Clock"
              size={18}
              className="text-[var(--color-kraft)]"
            />
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
                  {recommendedReorder.name}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {recommendedReorder.quantity} pcs · Last ordered{' '}
                  {recommendedReorder.daysAgo === 0
                    ? 'today'
                    : `${recommendedReorder.daysAgo} days ago`}
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
      )}
    </motion.div>
  );
}
