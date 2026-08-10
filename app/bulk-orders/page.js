'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import BulkOrderForm from '@/components/bulk-orders/RFQ/BulkOrderForm';
import BulkUploadForm from '@/components/bulk-orders/BulkUpload/BulkUploadForm';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  inViewConfig,
} from '@/lib/motion';

const VALUE_PROPS = [
  {
    icon: 'Users',
    title: 'Dedicated Account Manager',
    description: 'A packaging expert assigned to your business.',
  },
  {
    icon: 'Ruler',
    title: 'Custom Sizing',
    description: 'Boxes made to your exact dimensions.',
  },
  {
    icon: 'TrendingDown',
    title: 'Volume Pricing',
    description: 'Better rates as your order quantity grows.',
  },
  {
    icon: 'Zap',
    title: 'Flexible MOQ',
    description: 'Bulk starts at just 500 units.',
  },
];

const TABS = [
  { id: 'rfq', label: 'Request Quote', icon: 'FileText' },
  { id: 'upload', label: 'Bulk Upload', icon: 'Package' },
];

/**
 * Bulk Orders page — B2B RFQ flow with two tabs:
 * 1. Request Quote (multi-step form)
 * 2. Bulk Upload (CSV/Excel upload)
 */
export default function BulkOrdersPage() {
  const [activeTab, setActiveTab] = useState('rfq');

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-charcoal to-charcoal-light text-white">
        <div className="container-bk py-12 md:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link
                  href="/"
                  className="hover:text-white/80 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Icon name="ChevronRight" size={14} />
              </li>
              <li className="text-white/90 font-medium">Bulk Orders</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Bulk Packaging for Your Business
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Get volume pricing on custom and standard packaging. Share your
              requirements and our team will prepare a detailed quote within 24
              hours.
            </p>
          </motion.div>

          {/* Value Props */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8"
          >
            {VALUE_PROPS.map((vp) => (
              <motion.div
                key={vp.title}
                variants={staggerChild}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <Icon
                  name={vp.icon}
                  size={20}
                  className="text-kraft-light mb-2"
                />
                <p className="font-semibold text-white text-sm mb-0.5">
                  {vp.title}
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {vp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tabs + Form ── */}
      <section className="section-padding">
        <div className="container-bk max-w-3xl">
          {/* Tab Switcher */}
          <div
            className="flex items-center gap-1 bg-warm-gray rounded-xl p-1 mb-8"
            role="tablist"
            aria-label="Bulk order method"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-text-secondary hover:text-charcoal'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div
            id="panel-rfq"
            role="tabpanel"
            aria-labelledby="tab-rfq"
            hidden={activeTab !== 'rfq'}
          >
            {activeTab === 'rfq' && <BulkOrderForm />}
          </div>

          <div
            id="panel-upload"
            role="tabpanel"
            aria-labelledby="tab-upload"
            hidden={activeTab !== 'upload'}
          >
            {activeTab === 'upload' && <BulkUploadForm />}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-warm-gray">
        <div className="container-bk section-padding">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
            className="text-center mb-10"
          >
            <h2 className="heading-2 mb-3">How Bulk Orders Work</h2>
            <p className="text-body max-w-lg mx-auto">
              From request to delivery — a streamlined process designed for
              business buyers.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                step: '01',
                title: 'Share Requirements',
                desc: 'Fill out the quote form or upload your product list.',
                icon: 'FileText',
              },
              {
                step: '02',
                title: 'Get Your Quote',
                desc: 'Our team reviews and shares pricing within 24 hours.',
                icon: 'Clock',
              },
              {
                step: '03',
                title: 'Confirm Order',
                desc: 'Approve the quote and confirm payment terms.',
                icon: 'CheckCircle',
              },
              {
                step: '04',
                title: 'Receive Packaging',
                desc: 'We manufacture and deliver to your doorstep.',
                icon: 'Truck',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={staggerChild}
                className="text-center"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={24} className="text-kraft" />
                </div>
                <p className="text-xs font-bold text-kraft mb-1 tracking-wider">
                  STEP {item.step}
                </p>
                <h3 className="font-semibold text-charcoal mb-1 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="section-padding">
        <div className="container-bk text-center max-w-xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewConfig}
          >
            <h2 className="heading-3 mb-3">Need Help with Your Order?</h2>
            <p className="text-body mb-6">
              Our packaging experts are ready to help you find the right
              solution for your business.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/" className="btn-primary">
                <Icon name="Phone" size={16} className="mr-1" />
                Talk to Expert
              </Link>
              <Link href="/products" className="btn-outline">
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
