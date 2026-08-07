'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'orders', label: 'Orders', icon: 'Package' },
  { id: 'saved', label: 'Saved Products', icon: 'Heart' },
  { id: 'quotes', label: 'Quotes', icon: 'FileText' },
  { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
  { id: 'profile', label: 'Business Profile', icon: 'Building2' },
];

const MOCK_ORDERS = [
  {
    id: 'PK1023',
    date: '14 Jul 2026',
    items: '1,000 × Medium Shipping Box (8×6×4")',
    total: '₹9,200',
    status: 'Delivered',
    statusColor: 'text-accent',
    statusIcon: 'CheckCircle',
  },
  {
    id: 'PK1019',
    date: '28 Jun 2026',
    items: '500 × Courier Bag (Medium)',
    total: '₹2,000',
    status: 'Delivered',
    statusColor: 'text-accent',
    statusIcon: 'CheckCircle',
  },
  {
    id: 'PK1032',
    date: '5 Aug 2026',
    items: '500 × Standard Shipping Box (10×8×4")',
    total: '₹5,600',
    status: 'In Transit',
    statusColor: 'text-info',
    statusIcon: 'Truck',
  },
];

const MOCK_QUOTES = [
  {
    id: 'Q-204',
    date: '1 Aug 2026',
    description: 'Custom printed 10×8×4" boxes, 2-color, 2000 pcs',
    status: 'Pending',
  },
];

/**
 * Account dashboard with sidebar navigation and mock data.
 */
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container-bk section-padding">
      <h1 className="text-3xl font-bold text-charcoal mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-56 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-charcoal text-white'
                    : 'text-text-secondary hover:bg-warm-gray'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Quick Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bk p-5">
                  <p className="text-sm text-text-secondary mb-1">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-charcoal">3</p>
                </div>
                <div className="card-bk p-5">
                  <p className="text-sm text-text-secondary mb-1">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-charcoal">₹16,800</p>
                </div>
                <div className="card-bk p-5">
                  <p className="text-sm text-text-secondary mb-1">
                    Pending Quotes
                  </p>
                  <p className="text-2xl font-bold text-charcoal">1</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="card-bk p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-charcoal">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-kraft hover:text-kraft-light transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_ORDERS.slice(0, 2).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-kraft-muted rounded-xl flex items-center justify-center">
                          <Icon
                            name="Package"
                            size={18}
                            className="text-kraft"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            #{order.id}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {order.items}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-charcoal text-sm">
                          {order.total}
                        </p>
                        <p
                          className={`text-xs font-medium ${order.statusColor}`}
                        >
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
                  <Icon name="Clock" size={18} className="text-kraft" />
                  <h2 className="font-bold text-charcoal">
                    Recommended Reorders
                  </h2>
                </div>
                <div className="bg-warm-gray rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Package" size={20} className="text-kraft" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        Medium Shipping Box (8×6×4&quot;)
                      </p>
                      <p className="text-xs text-text-secondary">
                        1,000 pcs · Last ordered 24 days ago
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn-accent text-sm flex items-center gap-1.5"
                  >
                    <Icon name="RefreshCw" size={14} />
                    Reorder
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="card-bk overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-bold text-lg text-charcoal">
                    Order History
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 flex items-center justify-between hover:bg-warm-gray/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-kraft-muted rounded-xl flex items-center justify-center">
                          <Icon
                            name={order.statusIcon}
                            size={18}
                            className={order.statusColor}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {order.items}
                          </p>
                          <p className="text-xs text-text-tertiary mt-0.5">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-charcoal">
                            {order.total}
                          </p>
                          <p
                            className={`text-xs font-medium ${order.statusColor}`}
                          >
                            {order.status}
                          </p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="btn-outline text-xs px-3 py-1.5"
                        >
                          <Icon
                            name="RefreshCw"
                            size={12}
                            className="mr-1 inline"
                          />
                          Reorder
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'quotes' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="card-bk p-6">
                <h2 className="font-bold text-lg text-charcoal mb-4">
                  Pending Quotes
                </h2>
                {MOCK_QUOTES.map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-warm-gray rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-charcoal">
                        Quote #{quote.id}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {quote.description}
                      </p>
                      <p className="text-xs text-text-tertiary mt-1">
                        Submitted {quote.date}
                      </p>
                    </div>
                    <span className="badge badge-kraft">{quote.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {(activeTab === 'saved' ||
            activeTab === 'addresses' ||
            activeTab === 'profile') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-bk p-8 text-center"
            >
              <div className="w-16 h-16 bg-warm-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
                {activeTab === 'saved' && (
                  <Icon name="Heart" size={28} className="text-text-tertiary" />
                )}
                {activeTab === 'addresses' && (
                  <Icon
                    name="MapPin"
                    size={28}
                    className="text-text-tertiary"
                  />
                )}
                {activeTab === 'profile' && (
                  <Icon
                    name="Building2"
                    size={28}
                    className="text-text-tertiary"
                  />
                )}
              </div>
              <p className="font-medium text-charcoal mb-1">Coming Soon</p>
              <p className="text-sm text-text-secondary">
                This feature will be available in the next update.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
