'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminOrderService } from '@/services/admin/order.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function AdminOrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [order, setOrder] = useState(null);

  const [updateData, setUpdateData] = useState({
    status: '',
    awb: '',
    courier: '',
  });

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await adminOrderService.getOrderById(orderId);
        setOrder(data);
        setUpdateData({
          status: data.status,
          awb: data.awb || '',
          courier: data.courier || '',
        });
      } catch (error) {
        console.error('Error fetching Order', error);
        router.push('/admin/orders');
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, [orderId, router]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updatedOrder = await adminOrderService.updateOrderStatus(
        orderId,
        updateData.status,
        {
          awb: updateData.awb,
          courier: updateData.courier,
        }
      );
      setOrder(updatedOrder);
      // Show success toast or message here
    } catch (error) {
      console.error('Error updating order', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !order) {
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
            href="/admin/orders"
            className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Icon name="ArrowLeft" size={20} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Order {order.id}
              </h1>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  order.status === 'PROCESSING'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === 'SHIPPED'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-6">Order Items</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium text-center">Qty</th>
                    <th className="pb-3 font-medium text-right">Unit Price</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.lineItems?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-4">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          SKU: {item.sku}
                        </p>
                      </td>
                      <td className="py-4 text-center">{item.quantity}</td>
                      <td className="py-4 text-right">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-medium text-gray-900">
                        ₹{item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {order.amount}
                  </span>
                </div>
                <div className="flex justify-between pt-4 mt-2 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    {order.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleStatusUpdate}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="Truck" size={18} className="text-gray-500" />
              Fulfillment Status
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900 bg-white"
                >
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Courier Partner
                </label>
                <input
                  type="text"
                  value={updateData.courier}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, courier: e.target.value })
                  }
                  placeholder="e.g. Delhivery"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Tracking Number (AWB)
                </label>
                <input
                  type="text"
                  value={updateData.awb}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, awb: e.target.value })
                  }
                  placeholder="Enter tracking number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />{' '}
                    Saving...
                  </>
                ) : (
                  'Update Status'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="User" size={18} className="text-gray-500" />
              Customer Details
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">
                  {order.customerDetails?.name}
                </p>
                <p className="text-gray-500">{order.customer}</p>
              </div>
              <div>
                <a
                  href={`mailto:${order.customerDetails?.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {order.customerDetails?.email}
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {order.customerDetails?.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={18} className="text-gray-500" />
              Shipping Address
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {order.shippingAddress}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="CreditCard" size={18} className="text-gray-500" />
              Payment Information
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Status</span>
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    order.payment === 'PAID'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.payment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
