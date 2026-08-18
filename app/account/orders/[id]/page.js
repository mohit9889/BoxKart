'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Icon from '@/components/common/Icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ordersApi, formatCurrency } from '@/lib/api/orders';
import { Skeleton } from '@/components/ui';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await ordersApi.getOrderById(orderId);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Could not load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" height="40px" width="300px" />
        <Skeleton variant="card" height="400px" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-20">
        <Icon
          name="AlertCircle"
          size={48}
          className="mx-auto text-[var(--color-danger)] mb-4"
        />
        <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">{error}</p>
        <Link href="/account/orders" className="btn-accent">
          Back to Orders
        </Link>
      </div>
    );
  }

  const getStepIndex = (status) => {
    if (['CANCELLED', 'FAILED'].includes(status)) return -1;
    switch (status) {
      case 'PENDING':
      case 'CONFIRMED':
        return 0;
      case 'PROCESSING':
      case 'READY_TO_SHIP':
        return 1;
      case 'SHIPPED':
        return 2;
      case 'DELIVERED':
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex(order.rawStatus);
  const isCancelled = currentStep === -1;

  const timelineSteps = [
    { label: 'Order Placed', icon: 'FileText' },
    { label: 'Processing', icon: 'Package' },
    { label: 'Shipped', icon: 'Truck' },
    { label: 'Delivered', icon: 'CheckCircle' },
  ];

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
            Order #{order.orderNumber || order.id}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Placed on {order.date}
          </p>
        </div>
      </div>

      {isCancelled && (
        <div className="bg-[#fff0f0] border border-[var(--color-danger)] text-[var(--color-danger)] p-4 rounded-xl flex items-center gap-3">
          <Icon name="XCircle" size={20} />
          <p className="font-semibold">
            This order has been cancelled or failed.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Tracking Timeline */}
          {!isCancelled && (
            <div className="card-bk p-6">
              <h2 className="font-bold text-[var(--color-charcoal)] mb-6">
                Tracking Status
              </h2>
              <div className="relative">
                {/* Vertical line connecting nodes */}
                <div className="absolute top-2 bottom-6 left-3 w-0.5 bg-[#e8e4de] -z-10"></div>

                <div className="space-y-8">
                  {timelineSteps.map((step, idx) => {
                    const isCompleted = currentStep >= idx;
                    const isCurrent = currentStep === idx;
                    const isPending = currentStep < idx;

                    let bgClass = 'bg-[#e8e4de]';
                    let iconColor = 'text-transparent'; // hide icon if pending
                    if (isCompleted) {
                      bgClass = 'bg-[var(--color-accent)]';
                      iconColor = 'text-white';
                    }
                    if (
                      idx === 2 &&
                      isCompleted &&
                      !isCurrent &&
                      currentStep < 3
                    ) {
                      bgClass = 'bg-[var(--color-info)]'; // Shipped color
                    } else if (idx === 2 && isCurrent) {
                      bgClass = 'bg-[var(--color-info)]';
                      iconColor = 'text-white';
                    }

                    return (
                      <div
                        key={step.label}
                        className={`flex gap-4 ${isPending ? 'opacity-50' : ''}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full ${bgClass} flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white] transition-colors`}
                        >
                          {isCompleted ? (
                            <Icon
                              name="Check"
                              size={12}
                              className={iconColor}
                            />
                          ) : null}
                        </div>
                        <div className="-mt-1.5">
                          <p
                            className={`font-semibold ${isCurrent ? (idx === 2 ? 'text-[var(--color-info)]' : 'text-[var(--color-accent)]') : 'text-[var(--color-charcoal)]'}`}
                          >
                            {step.label}
                          </p>
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            {isCompleted ? 'Completed' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="card-bk p-6">
            <h2 className="font-bold text-[var(--color-charcoal)] mb-4">
              Items
            </h2>
            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div
                    key={item.productId || item.skuSnapshot}
                    className="flex gap-4 py-4 border-b border-[#e8e4de] last:border-0 last:pb-0"
                  >
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
                          {item.nameSnapshot || 'Product'}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          SKU: {item.skuSnapshot}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-medium">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-bold">
                          {formatCurrency(item.totalMinor)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[var(--color-text-secondary)]">
                  No items found.
                </p>
              )}
            </div>
            {!isCancelled && (
              <div className="mt-6">
                <button className="btn-accent w-full sm:w-auto">
                  <Icon name="RefreshCw" size={16} /> Reorder All Items
                </button>
              </div>
            )}
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
            {order.shippingAddressSnapshot ? (
              <div className="text-sm text-[var(--color-text-secondary)] space-y-1">
                <p className="font-medium text-[var(--color-charcoal)]">
                  {order.shippingAddressSnapshot.fullName}
                </p>
                {order.shippingAddressSnapshot.company && (
                  <p>{order.shippingAddressSnapshot.company}</p>
                )}
                <p>{order.shippingAddressSnapshot.addressLine1}</p>
                {order.shippingAddressSnapshot.addressLine2 && (
                  <p>{order.shippingAddressSnapshot.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddressSnapshot.city},{' '}
                  {order.shippingAddressSnapshot.state}{' '}
                  {order.shippingAddressSnapshot.postalCode}
                </p>
                <p>{order.shippingAddressSnapshot.country}</p>
                <p className="pt-2 flex items-center gap-2">
                  <Icon name="Phone" size={14} />{' '}
                  {order.shippingAddressSnapshot.phone}
                </p>
              </div>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No delivery address provided.
              </p>
            )}
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
                <span className="font-medium">{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">
                  Shipping & Taxes
                </span>
                <span className="font-medium">
                  {order.totalMinor > order.subtotalMinor
                    ? formatCurrency(order.totalMinor - order.subtotalMinor)
                    : 'Included'}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#e8e4de] text-base">
                <span className="font-bold text-[var(--color-charcoal)]">
                  Total
                </span>
                <span className="font-bold text-[var(--color-charcoal)]">
                  {order.total}
                </span>
              </div>
              {!isCancelled && (
                <div className="pt-4 flex flex-col gap-2">
                  <button className="btn-outline w-full text-sm py-2">
                    <Icon name="Download" size={16} /> Download Invoice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
