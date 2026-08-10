'use client';

import { useState, useEffect } from 'react';
import { adminProductService } from '@/services/admin/product.service';
import { adminRFQService } from '@/services/admin/rfq.service';
import { adminOrderService } from '@/services/admin/order.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    products: null,
    rfqs: null,
    orders: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [prodStats, rfqStats, ordStats] = await Promise.all([
          adminProductService.getStats(),
          adminRFQService.getStats(),
          adminOrderService.getStats(),
        ]);
        setStats({ products: prodStats, rfqs: rfqStats, orders: ordStats });
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="Loader2" size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Orders Stat */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Total Orders</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.orders?.total || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
            <span>{stats.orders?.processing || 0} processing</span>
            <Link
              href="/admin/orders"
              className="text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>
        </div>

        {/* RFQs Stat */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Pending RFQs</h3>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.rfqs?.new || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
            <span>{stats.rfqs?.total || 0} total requests</span>
            <Link href="/admin/rfqs" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
        </div>

        {/* Products Stat */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Catalog Size</h3>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.products?.total || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
            <span>{stats.products?.outOfStock || 0} out of stock</span>
            <Link
              href="/admin/products"
              className="text-blue-600 hover:underline"
            >
              Manage
            </Link>
          </div>
        </div>

        {/* Revenue Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Est. Revenue (MTD)</h3>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹2,14,500</p>
          <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <Icon name="ArrowUpRight" size={16} />
            <span>+12.5% from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              <Icon name="Plus" size={24} className="text-gray-500 mb-2" />
              <span className="font-medium text-gray-700">Add Product</span>
            </Link>
            <Link
              href="/admin/rfqs"
              className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              <Icon name="FileText" size={24} className="text-gray-500 mb-2" />
              <span className="font-medium text-gray-700">Review RFQs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
