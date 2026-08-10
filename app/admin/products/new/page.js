'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminProductService } from '@/services/admin/product.service';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Basic form state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Standard Boxes',
    price: '',
    moq: 100,
    status: 'Active',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Create product with mock service
      await adminProductService.createProduct(formData);
      router.push('/admin/products');
    } catch (error) {
      console.error('Error saving product', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="ArrowLeft" size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new item in the catalog.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="productName"
                className="text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="productName"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="e.g. Medium Shipping Box"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sku"
                className="text-sm font-medium text-gray-700"
              >
                SKU
              </label>
              <input
                id="sku"
                required
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                type="text"
                placeholder="e.g. BK-STD-05"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900 uppercase"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900 bg-white"
              >
                <option>Standard Boxes</option>
                <option>Mailer Bags</option>
                <option>Custom Boxes</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">Pricing & Inventory</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Unit Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 font-medium">
                  ₹
                </span>
                <input
                  id="price"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: `₹${e.target.value.replace(/[^0-9.]/g, '')}`,
                    })
                  }
                  type="text"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="moq"
                className="text-sm font-medium text-gray-700"
              >
                MOQ (Minimum Order Qty)
              </label>
              <input
                id="moq"
                required
                value={formData.moq}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    moq: parseInt(e.target.value) || 0,
                  })
                }
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-gray-900 bg-white"
              >
                <option>Active</option>
                <option>Out of Stock</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />{' '}
                Saving...
              </>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
