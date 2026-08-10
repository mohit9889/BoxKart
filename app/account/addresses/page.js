'use client';

import { motion } from 'motion/react';
import Icon from '@/components/common/Icon';

const MOCK_ADDRESSES = [
  {
    id: 'addr_1',
    label: 'Primary Warehouse',
    name: 'Mohit Rajput',
    company: 'Acme Corp Logistics',
    street: '123 Industrial Area, Phase 1',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 'addr_2',
    label: 'Branch Office',
    name: 'Rahul Sharma',
    company: 'Acme Corp Logistics (Branch)',
    street: '45 Tech Park, Block C',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    phone: '+91 99887 76655',
    isDefault: false,
  },
];

export default function AddressesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
            Saved Addresses
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Manage your delivery locations for faster checkout.
          </p>
        </div>
        <button className="btn-primary shrink-0 w-full sm:w-auto">
          <Icon name="Plus" size={18} />
          Add New Address
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_ADDRESSES.map((addr) => (
          <div
            key={addr.id}
            className="card-bk p-6 relative group flex flex-col"
          >
            {addr.isDefault && (
              <span className="absolute top-6 right-6 badge badge-kraft">
                Default
              </span>
            )}
            <div className="mb-4">
              <h3 className="font-bold text-[var(--color-charcoal)] flex items-center gap-2">
                <Icon
                  name="MapPin"
                  size={18}
                  className="text-[var(--color-text-tertiary)]"
                />
                {addr.label}
              </h3>
            </div>
            <div className="flex-1 space-y-1 text-sm text-[var(--color-text-secondary)] mb-6">
              <p className="font-medium text-[var(--color-charcoal)]">
                {addr.name}
              </p>
              <p>{addr.company}</p>
              <p className="pt-2">{addr.street}</p>
              <p>
                {addr.city}, {addr.state} {addr.pincode}
              </p>
              <p className="pt-2 flex items-center gap-2">
                <Icon
                  name="Phone"
                  size={14}
                  className="text-[var(--color-text-tertiary)]"
                />
                {addr.phone}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#e8e4de]">
              <button className="text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-kraft)] transition-colors">
                Edit
              </button>
              <span className="text-[#e8e4de]">|</span>
              <button className="text-sm font-medium text-[var(--color-danger)] hover:text-[#b91c1c] transition-colors">
                Delete
              </button>
              {!addr.isDefault && (
                <>
                  <span className="text-[#e8e4de]">|</span>
                  <button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] transition-colors">
                    Set as Default
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        <button className="card-bk p-6 border-dashed border-2 hover:bg-[#faf8f5] transition-colors flex flex-col items-center justify-center min-h-[280px] text-[var(--color-text-tertiary)] hover:text-[var(--color-charcoal)] group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Icon name="Plus" size={24} />
          </div>
          <span className="font-medium">Add New Address</span>
        </button>
      </div>
    </motion.div>
  );
}
