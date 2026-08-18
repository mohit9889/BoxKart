'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { fadeUp, hoverTap, inViewConfig } from '@/lib/motion';
import { useAuth } from '@/components/auth/AuthContext';
import { useState, useEffect } from 'react';
import { ordersApi } from '@/lib/api/orders';

/**
 * Reorder section — explains the reorder workflow and its benefits.
 * Does NOT show fake personal order data to logged-out users.
 * When authenticated users exist, this section will surface real history.
 */
export default function ReorderSection() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [recommendedReorder, setRecommendedReorder] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => setLoadingOrders(false), 0);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getOrders({ limit: 1 });
        const fetchedOrders = response.data || [];
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
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  return (
    <section className="section-padding">
      <div className="container-bk">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
            className="card-bk p-6 md:p-8 text-center"
          >
            <div className="w-14 h-14 bg-[var(--color-kraft-muted)] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Icon
                name="RefreshCw"
                size={24}
                className="text-[var(--color-kraft)]"
              />
            </div>

            <h2 className="heading-3 mb-3">Reorder in one click</h2>

            {!authLoading && !loadingOrders && recommendedReorder ? (
              <div className="text-left mt-6">
                <p className="text-body mb-6 text-center max-w-md mx-auto">
                  Ready to restock? Quick-reorder from your recent history with
                  locked-in pricing.
                </p>
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
                <div className="mt-6 text-center">
                  <Link
                    href="/account/orders"
                    className="text-sm text-[var(--color-kraft)] hover:text-[var(--color-kraft-light)] transition-colors font-medium"
                  >
                    View All Past Orders
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="text-body mb-6 max-w-md mx-auto">
                  Running low? Your order history stays saved so you can repeat
                  any previous order instantly — same packaging, same quantity,
                  same price.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      icon: 'Clock',
                      title: 'Order History',
                      desc: 'All past orders saved',
                    },
                    {
                      icon: 'MousePointerClick',
                      title: 'One-Click Reorder',
                      desc: 'Repeat any past order',
                    },
                    {
                      icon: 'Zap',
                      title: 'Same Pricing',
                      desc: 'Locked-in bulk rates',
                    },
                  ].map((item) => (
                    <div key={item.title} className="p-4">
                      <Icon
                        name={item.icon}
                        size={22}
                        className="text-[var(--color-kraft)] mx-auto mb-2"
                      />
                      <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.div {...hoverTap}>
                  <Link href="/products" className="btn-accent">
                    Start Your First Order
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
